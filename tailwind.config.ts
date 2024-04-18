import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradient:
          "linear-gradient(127deg, #007acc 14.2%, rgba(0, 204, 153, 0.6) 83.22%)",
        hoverGradient:
          "linear-gradient(127deg, rgba(0, 204, 153, 0.6) 14.2%, #007acc 83.22%)",
      },
      fontSize: {
        h1: "5.61rem",
        h2: "4.209rem",
        h3: "3.157rem",
        h4: "2.369rem",
        h5: "1.777rem",
        h6: "1.333rem",
        p: "1rem",
        small: "0.75rem",
        smaller: "0.563rem",
      },
      colors: {
        main: "#007ACC",
        bg: "#f6fbff",
        secondary: "#00CC99",
        black: "#1F2B33",
        purple: "#9370DB",
        error: "#CC0200",
        black75: "rgba(31, 43, 51, 0.75)",
        black50: "rgba(31, 43, 51, 0.50)",
        black25: "rgba(31, 43, 51, 0.25)",
        black10: "rgba(31, 43, 51, 0.10)",
        black5: "rgba(31, 43, 51, 0.05)",
      },
      boxShadow: {
        card: "3px 3px 20px 2px rgba(0, 0, 0, 0.10);",
      },
    },
  },
  plugins: [],
};
export default config;
