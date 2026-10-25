import { useEffect, useState } from "react";
// Import trực tiếp file package.json để lấy version
import packageJson from "../../package.json";

export default function useAppVersion() {
  const [hasUpdate, setHasUpdate] = useState(false);
  // Lưu phiên bản lúc người dùng mới vào web
  const [currentVersion, setCurrentVersion] = useState(packageJson.version);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        // Gọi file index.html (chứa mã hash của build mới nhất)
        // Nếu Vercel deploy bản mới, mã hash sẽ thay đổi
        const res = await fetch(`/?t=${Date.now()}`, { cache: "no-store" });
        const text = await res.text();
        
        // Tìm thẻ script chính của Vite (chứa mã hash)
        const match = text.match(/src="\/assets\/index-[a-zA-Z0-9]+\.js"/);
        const currentScriptHash = match ? match[0] : "";

        // Lấy mã hash lúc mới vào web (lưu vào localStorage để so sánh)
        const savedHash = localStorage.getItem("app_build_hash");

        if (!savedHash) {
          // Lần đầu vào web, lưu mã hash lại
          localStorage.setItem("app_build_hash", currentScriptHash);
        } else if (savedHash !== currentScriptHash && currentScriptHash !== "") {
          // Phát hiện mã hash thay đổi -> Có bản cập nhật mới
          setHasUpdate(true);
        }
      } catch (err) {
        // Lỗi mạng thì bỏ qua
      }
    };

    // Cứ 30 giây kiểm tra 1 lần (để dễ test)
    const interval = setInterval(checkVersion, 30000);

    return () => clearInterval(interval);
  }, []);

  return { hasUpdate };
}
