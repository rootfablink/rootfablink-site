import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px"
      },
      colors: {
        ink: "#0b0b0c",
        graphite: "#1f1f22",
        steel: "#5f6268",
        signal: "#f97316",
        copper: "#ea580c",
        cloud: "#fff8f1"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(11, 11, 12, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
