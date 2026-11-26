import React, { useState } from "react";
import { SectionHead } from "./theme.jsx";

const QA = [
  ["Điều kiện tham gia là gì?", "Bất kỳ ai có kênh TikTok hoặc YouTube công khai (trên 100 follow) và có tài khoản Google. Tham gia hoàn toàn miễn phí."],
  ["Video cần đáp ứng tiêu chuẩn nào?", "Video đăng công khai, giới thiệu chân thực về Nxx315 Studio, có đủ hashtag bắt buộc trong tiêu đề hoặc mô tả."],
  ["Làm sao để nhận Gift Code?", "Sau khi admin duyệt video, hệ thống cấp một Gift Code trong mục Video. Bạn chép code và dán vào mục Ví trên web chính để nhận xu."],
  ["Hệ thống có tự quét lượt xem không?", "Có. Kênh YouTube được quét tự động. Với TikTok, bạn chỉ cần dán link video, hệ thống kiểm tra lượt xem và tương tác."],
  ["Bao lâu thì nhận được tiền thưởng?", "Tiền mặt từ giải top bảng xếp hạng được admin chuyển khoản vào ngân hàng hoặc Momo của bạn vào ngày chốt tháng."],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="hoi-dap" className="frame scroll-mt-20 pb-[72px] md:pb-[115px]">
      <SectionHead title="Câu hỏi thường gặp" />
      <div className="mt-6 max-w-[760px]">
        {QA.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="rule-b">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 py-3 text-left"
              >
                <span className="text-[16px] leading-[1.35] tracking-[-0.02em]">{q}</span>
                <span aria-hidden="true" className="w-4 shrink-0 text-center text-[18px] leading-none text-mute">{isOpen ? "−" : "+"}</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="max-w-[549px] pb-5 text-[14px] leading-[1.65] text-mute">{a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
