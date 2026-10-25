import { useEffect, useState } from "react";

export default function useAppVersion() {
  const [hasUpdate, setHasUpdate] = useState(false);

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
          setHasUpdate(true);
        }
      } catch (err) {}
    };

    // Kiểm tra ngay lần đầu
    checkVersion();

    // Cứ 3 phút (180000ms) kiểm tra 1 lần -> Rất nhẹ cho web
    const interval = setInterval(checkVersion, 180000);
    return () => clearInterval(interval);
  }, []);

  return { hasUpdate };
}
