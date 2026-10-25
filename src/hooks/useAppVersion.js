import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useAppVersion() {
  const location = useLocation(); // Lắng nghe sự kiện đổi trang
  const [hasUpdate, setHasUpdate] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch(`/?t=${Date.now()}`, { cache: "no-store" });
        const text = await res.text();
        const match = text.match(/src="\/assets\/index-[a-zA-Z0-9]+\.js"/);
        const currentHash = match ? match[0] : null;

        if (!currentHash) return;

        const savedHash = sessionStorage.getItem("app_version_hash");

        if (!savedHash) {
          sessionStorage.setItem("app_version_hash", currentHash);
        } else if (savedHash !== currentHash) {
          // Phát hiện có code mới, bật cờ báo hiệu
          setPendingUpdate(true);
        }
      } catch (err) {}
    };

    // 15 giây check 1 lần
    const interval = setInterval(checkVersion, 15000);
    return () => clearInterval(interval);
  }, []);

  // Hiệu ứng: Khi phát hiện có code mới VÀ người dùng chuyển trang -> Kích hoạt cập nhật
  useEffect(() => {
    if (pendingUpdate && !hasUpdate) {
      // Đợi 1 nhịp (100ms) để trang mới bắt đầu render, sau đó kích hoạt update
      const timer = setTimeout(() => {
        setHasUpdate(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, pendingUpdate, hasUpdate]);

  return { hasUpdate };
}
