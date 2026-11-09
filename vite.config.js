import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Hàm tạo thời gian build hiện tại
const buildTime = new Date().getTime().toString();

export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-build-time",
      transformIndexHtml(html) {
        // Chèn thẻ meta chứa thời gian build vào index.html
        return html.replace(
          "</head>",
          `<meta name="build-time" content="${buildTime}" />\n</head>`
        );
      },
    },
  ],
  // Cho phép code React đọc được biến môi trường này
  define: {
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(buildTime),
  },
});
