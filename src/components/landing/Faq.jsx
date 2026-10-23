import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "./ui.jsx";

const QA = [
  [
    "Ai có thể tham gia?",
    "Bất kỳ ai có kênh TikTok hoặc YouTube công khai và tài khoản Google. Tham gia miễn phí.",
  ],
  [
    "Video cần đáp ứng điều kiện gì?",
    "Đăng công khai trên kênh bạn đã liên kết, giới thiệu rõ Nxx315 Studio, nội dung tự làm và có đủ hashtag bắt buộc ở tiêu đề hoặc mô tả.",
  ],
  [
    "Bao lâu thì video được duyệt?",
    "Admin duyệt thủ công nên thời gian có thể khác nhau. Trạng thái video luôn hiện trong lịch sử của bạn, nếu bị từ chối sẽ có lý do.",
  ],
  [
    "Nhận thưởng như thế nào?",
    "Video được duyệt sẽ hiện một code xu kèm số xu. Bạn chép code, vào Ví trên Nxx315 Studio, chọn Nhập Gift Code là nhận xu. Code chỉ tài khoản của bạn dùng được.",
  ],
  [
    "TikTok có được quét tự động không?",
    "Hiện kênh YouTube được quét tự động. Với TikTok, bạn dán link video, hệ thống kiểm tra video có thuộc kênh của bạn không.",
  ],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="hoi-dap" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14">
      <SectionTitle eyebrow="Hỏi đáp" title="Câu hỏi thường gặp" />
      <div className="mt-8 space-y-3">
        {QA.map(([q, a], i) => (
          <div key={q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-white md:text-base">{q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-cyan-400 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
