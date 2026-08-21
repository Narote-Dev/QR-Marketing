import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        // Change: Brand palette sampled from the supplied genmyQRCode.com artwork.
        brand: {
          cream: "#F7F3E8",
          teal: "#19847D",
          "teal-dark": "#146B67",
          "teal-light": "#65BFB0",
          coral: "#E76F61",
          yellow: "#F3C63D",
          ink: "#16363A"
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
