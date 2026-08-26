using System.Security.Cryptography;

namespace QrMarketing.Api.Services;

public static class ShortCodeGenerator
{
    // Ambiguous characters (0/O, 1/l/I) omitted for print-friendly codes.
    private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

    public static string Create(int length)
    {
        if (length is < 6 or > 10)
        {
            throw new ArgumentOutOfRangeException(nameof(length), "Short code length must be 6–10.");
        }

        Span<char> chars = stackalloc char[length];
        Span<byte> bytes = stackalloc byte[length];
        RandomNumberGenerator.Fill(bytes);
        for (var i = 0; i < length; i++)
        {
            chars[i] = Alphabet[bytes[i] % Alphabet.Length];
        }

        return new string(chars);
    }
}
