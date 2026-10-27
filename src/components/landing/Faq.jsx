import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionTitle, GLASS, INK } from "./theme.jsx";

const QA = [
  [
    "Điều kiện tham gia là gì?",
    "Bất kỳ ai sở hữu kênh TikTok hoặc YouTube công khai (trên 100 follow) và có tài khoản Google. Hoàn toàn miễn phí tham gia.",
  ],
  [
    "Video cần đáp ứng tiêu chuẩn nào?",
    "Video đăng công khai, giới thiệu chân thực về Nxx315 Studio, có gắn đầy đủ hashtag bắt buộc trong tiêu đề hoặc mô tả.",
  ],
  [
    "Làm sao để nhận được Gift Code?",
    "Sau khi Admin duyệt video thủ công, hệ thống sẽ cấp một Gift Code trong mục Lịch sử. Bạn copy code này và dán vào mục 'Ví' trên trang để nhận xu.",
  ],
  [
    "Hệ thống có tự động quét view không?",
    "Có. Kênh YouTube được AI quét tự động 24/7. Với TikTok, bạn chỉ cần dán link video, hệ thống sẽ tự động kiểm tra lượt view và tương tác.",
  ],
  [
    "Bao lâu thì tiền thưởng được chuyển về?",
    "Tiền mặt (từ giải thưởng Top BXH) sẽ được Admin chuyển khoản trực tiếp vào tài khoản ngân hàng hoặc Momo của bạn vào ngày chốt tháng.",
  ],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="hoi-dap" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
      <SectionTitle eyebrow="Hỗ trợ" title="Câu hỏi thường gặp" />
      <div className="mt-10 space-y-3">
        {QA.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div
              key={q}
              className={`overflow-hidden rounded-2xl transition-colors ${GLASS} ${isOpen ? "!border-emerald-400/60 !bg-white/90" : ""}`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className={`text-sm font-bold md:text-base ${INK}`}>{q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-600"
                  }`}
                >
                  <ChevronDown size={18} />
                </span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

