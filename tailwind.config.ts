import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      whiteComponentBackground: "#F7F7F7",
      whiteComponentOutline: "#E0E0E0",
      componentBackground: "#1C1C1C",
      componentOutline: "#212121",
      background: "#0D0D0D",
      foreground: "hsl(var(--foreground))",
      btn: {
        background: "#2E2E2E",
        outline: "#3E3E3E",
        "background-hover": "#3E3E3E",
        "outline-hover": "#232323",
      },
      inputField: {
        background: "#232323",
        outline: "#3E3E3E",
      },
      white: "#EDEDED",
      subTitle: "#A0A0A0",
      subtileText: "#3E3E3E",
      error: "#FF7272",
      success: "#72FFD5",
    },
  },
  plugins: [],
};
export default config;
