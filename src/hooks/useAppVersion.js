import { useEffect } from "react";

export default function useAppVersion() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        // Lấy file index.html mới nhất từ Vercel
        const res = await fetch(`/?t=${Date.now()}`, { cache: "no-store" });
        const text = await res.text();
        
        // Tìm mã hash file JS
        const match = text.match(/src="\/assets\/index-[a-zA-Z0-9]+\.js"/);
        const currentHash = match ? match[0] : null;

        if (!currentHash) return;

        // Lấy mã hash của lần tải trang trước đó
        const savedHash = sessionStorage.getItem("app_version_hash");

        if (!savedHash) {
          // Lần đầu vào web -> Lưu hash hiện tại
          sessionStorage.setItem("app_version_hash", currentHash);
        } else if (savedHash !== currentHash) {
          // Nếu hash khác -> Có bản mới!
          // Cập nhật lại hash mới TRƯỚC KHI F5 để tránh lặp vô tận
          sessionStorage.setItem("app_version_hash", currentHash);
          // F5 ngầm không thông báo
          window.location.reload();
        }
      } catch (err) {}
    };

    // Chỉ chạy check 1 lần duy nhất khi vừa load trang
    checkVersion();
  }, []);

  // Trả về rỗng, không cần state hasUpdate nữa
  return {}; 
}
