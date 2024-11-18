import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        exampleTheme: {
          primary: "#1a73e8", // Blue for primary actions
          secondary: "#ff9800", // Orange for secondary
          accent: "#9c27b0", // Purple for accents
          neutral: "#333333", // Neutral background
          "base-100": "#f5f5f5", // Light background for components
          "base-content": "#333333", // Content text on light background
          info: "#2196f3", // Info notifications
          success: "#4caf50", // Success messages
          warning: "#ff9800", // Warning colors
          error: "#f44336", // Error states
        },
      },
      "light",
      "dark",
    ],
    darkTheme: "dark", // Automatically use 'dark' as the dark mode theme
  },
};
export default config;
