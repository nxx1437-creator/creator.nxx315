/** @type {import('tailwindcss').Config} */
const neutral = {
  50: "#f8f8f7", 100: "#f0f0ee", 200: "#e3e3e2", 300: "#cfcfcc", 400: "#9a9a98",
  500: "#6a6a68", 600: "#515151", 700: "#3b3b3b", 800: "#262626", 900: "#1a1a1a", 950: "#141414",
};
// Thang màu "thương hiệu" cũ (emerald/teal/cyan/sky) đổi sang mực đen để mọi trang cũ tự đồng bộ
const brand = {
  50: "#f0f0ee", 100: "#e3e3e2", 200: "#cfcfcc", 300: "#9a9a98", 400: "#6a6a68",
  500: "#1a1a1a", 600: "#1a1a1a", 700: "#1a1a1a", 800: "#141414", 900: "#0d0d0d", 950: "#000000",
};

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "#f8f8f7",
        ink: "#1a1a1a",
        stone: "#f0f0ee",
        rule: "#e3e3e2",
        mute: "#6a6a68",
        navgray: "#515151",
        night: "#1a1a1a",
        nightrule: "#272727",
        glow: { cyan: "#00a2c7", blue: "#0052ff" },
        slate: neutral,
        emerald: brand,
        teal: brand,
        cyan: brand,
        sky: brand,
      },
      borderRadius: {
        md: "4px", lg: "4px", xl: "4px", "2xl": "4px", "3xl": "4px",
      },
      boxShadow: {
        sm: "none", DEFAULT: "none", md: "none", lg: "none", xl: "none", "2xl": "none",
      },
      letterSpacing: {
        display: "-0.04em",
        head: "-0.03em",
      },
    },
  },
  plugins: [],
};
