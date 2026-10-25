import { useEffect, useState } from "react";

export default function useAppVersion() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [initialHtml, setInitialHtml] = useState(null);

  useEffect(() => {
    // Lấy mã hash của file index.html hiện tại (Vite sẽ tự chèn hash vào các file js/css)
    const getCurrentHtml = async () => {
      try {
        // Thêm param để trình duyệt không lấy từ cache
        const res = await fetch(`/?t=${Date.now()}`, { cache: "no-store" });
        const text = await res.text();
        // Tìm thẻ script chính (thường chứa mã hash build)
        const match = text.match(/src="\/assets\/index-[a-zA-Z0-9]+\.js"/);
        return match ? match[0] : text;
      } catch (e) {
        return null;
      }
    };

    // Lần đầu vào web, lưu lại phiên bản hiện tại
    getCurrentHtml().then((html) => setInitialHtml(html));

    // Cứ 60 giây kiểm tra một lần (để không làm nặng server)
    const interval = setInterval(async () => {
      if (!initialHtml) return;
      const current = await getCurrentHtml();
      // Nếu mã hash thay đổi => Vercel vừa deploy bản mới
      if (current && current !== initialHtml) {
        setHasUpdate(true);
      }
    }, 60000); // 60000ms = 1 phút

    return () => clearInterval(interval);
  }, [initialHtml]);

  return { hasUpdate };
}
