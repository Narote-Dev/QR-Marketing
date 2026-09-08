using Microsoft.AspNetCore.Builder;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using QrMarketing.Api.Auth;
using QrMarketing.Api.Contracts;
using QrMarketing.Api.Controllers;
using QrMarketing.Api.Options;
using QrMarketing.Api.Services.Users;
using Xunit;

namespace QrMarketing.Api.Tests;

public class RequestProtectionTests
{
    [Theory]
    [InlineData(false, "10.0.0.1")]
    [InlineData(true, "203.0.113.7")]
    public async Task Forwarded_ip_requires_explicit_trusted_peer(bool trusted, string expected)
    {
        var options = new ForwardedHeadersOptions();
        RequestProtection.ConfigureForwarding(options, new RequestProtectionOptions
        {
            KnownProxies = trusted ? ["10.0.0.1"] : [],
        });
        var context = new DefaultHttpContext();
        context.Connection.RemoteIpAddress = IPAddress.Parse("10.0.0.1");
        context.Request.Headers["X-Forwarded-For"] = "203.0.113.7";
        var middleware = new ForwardedHeadersMiddleware(_ => Task.CompletedTask, NullLoggerFactory.Instance, Microsoft.Extensions.Options.Options.Create(options));
        await middleware.Invoke(context);
        Assert.Equal(expected, context.Connection.RemoteIpAddress?.ToString());
    }

    [Theory]
    [InlineData(false, "TH", null)]
    [InlineData(true, "th", "TH")]
    [InlineData(true, "TH,US", null)]
    [InlineData(true, "12", null)]
    public void Country_requires_trusted_transport_peer_and_valid_value(bool trusted, string value, string? expected)
    {
        var context = new DefaultHttpContext();
        context.Connection.RemoteIpAddress = IPAddress.Parse("10.0.0.1");
        context.Request.Headers["CF-IPCountry"] = value;
        var options = new RequestProtectionOptions
        {
            CountryHeaderName = "CF-IPCountry",
            CountryHeaderKnownProxies = trusted ? ["10.0.0.1"] : [],
        };
        RequestProtection.CaptureCountry(context, options, RequestProtection.ParseCountryHeaderKnownProxies(options));
        Assert.Equal(expected, RequestProtection.GetCountry(context));
    }

    [Fact]
    public void Invalid_country_proxy_is_rejected_at_startup()
    {
        var options = new RequestProtectionOptions { CountryHeaderKnownProxies = ["not-an-ip"] };

        var error = Assert.Throws<InvalidOperationException>(() => RequestProtection.ParseCountryHeaderKnownProxies(options));

        Assert.Contains("invalid IP address", error.Message);
    }

    [Fact]
    public void Write_partition_separates_users_and_anonymous_clients()
    {
        var context = new DefaultHttpContext();
        context.Connection.RemoteIpAddress = IPAddress.Parse("203.0.113.1");
        var anonymous = RequestProtection.WritePartition(context);
        context.Connection.RemoteIpAddress = IPAddress.Parse("203.0.113.2");
        Assert.NotEqual(anonymous, RequestProtection.WritePartition(context));
        context.Items[CurrentUserAccessor.UserIdItemKey] = Guid.NewGuid();
        var firstUser = RequestProtection.WritePartition(context);
        context.Items[CurrentUserAccessor.UserIdItemKey] = Guid.NewGuid();
        Assert.NotEqual(firstUser, RequestProtection.WritePartition(context));
    }

    [Fact]
    public void Both_write_actions_enable_same_rate_policy()
    {
        foreach (var action in new[] { "Create", "Update" })
        {
            var attribute = Assert.Single(typeof(DynamicQrController).GetMethod(action)!.GetCustomAttributes(typeof(EnableRateLimitingAttribute), true));
            Assert.Equal("api-write", ((EnableRateLimitingAttribute)attribute).PolicyName);
        }
    }

    [Theory]
    [InlineData("Production", true)]
    [InlineData("Staging", true)]
    [InlineData("Development", false)]
    public async Task Legacy_create_and_management_are_disabled_outside_opted_in_development(string environment, bool flag)
    {
        var context = new DefaultHttpContext();
        context.Request.Headers[DynamicQrController.OwnerTokenHeader] = "owner-token";
        var controller = new DynamicQrController(null!, new CurrentUserAccessor(new HttpContextAccessor { HttpContext = context }),
            Microsoft.Extensions.Options.Options.Create(new DynamicQrOptions { Enabled = true, AllowLegacyOwnerToken = flag }), new TestEnvironment(environment))
        {
            ControllerContext = new ControllerContext { HttpContext = context },
        };
        Assert.IsType<UnauthorizedObjectResult>((await controller.Create(new CreateDynamicQrRequest { DestinationUrl = "https://example.com" }, default)).Result);
        Assert.IsType<UnauthorizedResult>((await controller.Get("code", default)).Result);
        Assert.IsType<UnauthorizedResult>((await controller.Update("code", new UpdateDynamicQrRequest(), default)).Result);
        Assert.IsType<UnauthorizedResult>((await controller.Stats("code", default)).Result);
    }

    private sealed class TestEnvironment(string name) : IHostEnvironment
    {
        public string EnvironmentName { get; set; } = name;
        public string ApplicationName { get; set; } = "Tests";
        public string ContentRootPath { get; set; } = "";
        public IFileProvider ContentRootFileProvider { get; set; } = new NullFileProvider();
    }
}
