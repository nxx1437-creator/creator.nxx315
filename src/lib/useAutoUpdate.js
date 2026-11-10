import { useEffect } from "react";

const KEY = "nx_update_target";
const MIN_GAP = 15000; // tối thiểu 15s giữa 2 lần kiểm tra

export default function useAutoUpdate() {
  useEffect(() => {
    let current = null; // bản đang chạy (lấy lúc mở trang)
    let last = 0;
    let busy = false;

    const getRemote = async () => {
      try {
        const r = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) return null;
        const j = await r.json();
        return j && j.version != null ? String(j.version) : null;
      } catch {
        return null; // mất mạng / file lỗi thì bỏ qua
      }
    };

    const check = async (force = false) => {
      if (busy) return;
      const now = Date.now();
      if (!force && now - last < MIN_GAP) return;
      busy = true;
      last = now;
      const remote = await getRemote();
      busy = false;

      if (remote === null) return;
      if (current === null) { current = remote; return; } // lần đầu: ghi nhớ bản hiện tại
      if (remote === current) return;

      // chống tải lại lặp: đã reload về bản này rồi thì không reload nữa
      if (sessionStorage.getItem(KEY) === remote) { current = remote; return; }
      try { sessionStorage.setItem(KEY, remote); } catch {}
      window.location.reload();
    };

    const onVisibility = () => check(false); // chuyển tab / thu nhỏ / quay lại
    const onPageShow = (e) => { if (e.persisted) check(true); };

    check(true);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);
}
