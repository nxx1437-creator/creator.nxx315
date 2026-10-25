import { useEffect, useState } from "react";

export default function useAppVersion() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(null);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        // Gọi file version.json kèm timestamp để không bị lấy từ cache
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return; // Nếu không có file thì bỏ qua
        const data = await res.json();
        
        const newVersion = data.version;
        
        if (!currentVersion) {
          // Lần đầu vào web, lưu lại phiên bản hiện tại
          setCurrentVersion(newVersion);
        } else if (currentVersion !== newVersion) {
          // Nếu phiên bản mới khác phiên bản cũ -> Có cập nhật!
          setHasUpdate(true);
        }
      } catch (err) {
        // Lỗi mạng thì bỏ qua
      }
    };

    // Kiểm tra ngay lần đầu
    checkVersion();

    // Cứ 30 giây kiểm tra 1 lần (nhanh hơn cho dễ test)
    const interval = setInterval(checkVersion, 30000);

    return () => clearInterval(interval);
  }, [currentVersion]);

  return { hasUpdate };
}
