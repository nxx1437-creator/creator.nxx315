import { useEffect, useState } from "react";

export default function useAppVersion() {
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
          // PHÁT HIỆN CODE MỚI -> TỰ ĐỘNG F5 LUÔN, KHÔNG THÔNG BÁO
          sessionStorage.setItem("app_version_hash", currentHash);
          window.location.reload();
        }
      } catch (err) {}
    };

    // Cứ 10 giây check 1 lần
    const interval = setInterval(checkVersion, 10000);
    return () => clearInterval(interval);
  }, []);
}
