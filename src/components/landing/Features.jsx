import React from "react";
import { Gift, ShieldCheck, RefreshCw, Trophy } from "lucide-react";
import { SectionTitle, GlassCard, INK } from "./theme.jsx";

const ITEMS = [
  {
    Icon: Gift,
    title: "Phần thưởng tiền mặt & Gift Code",
    text: "Top Creator có lượt view và tương tác cao nhất sẽ nhận tiền mặt chuyển thẳng qua Bank/Momo. Video đạt chuẩn nhận ngay code VIP dùng trên hệ thống.",
    hero: true,
  },
  {
    Icon: ShieldCheck,
    title: "Hệ thống AI & Admin kiểm duyệt",
    text: "Bot AI tự động quét view/tương tác 24/7. Đội ngũ Admin duyệt nội dung thủ công 100% để đảm bảo chất lượng, chặn đứng mọi hành vi spam.",
  },
  {
    Icon: RefreshCw,
    title: "Tracking minh bạch, chống buff",
    text: "Kênh YouTube được quét tự động. Hệ thống sử dụng thuật toán gắt gao để lọc view ảo, bot like, đảm bảo sân chơi công bằng cho creator chân chính.",
  },
  {
    Icon: Trophy,
    title: "Leaderboard cập nhật liên tục",
    text: "Điểm số được tính dựa trên lượng tương tác thực tế. Bảng xếp hạng làm mới mỗi ngày, minh bạch và công khai. Lên top bằng thực lực!",
    wide: true,
  },
];

export default function Features() {
  return (
    <section id="quyen-loi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionTitle
        eyebrow="Vì sao chọn Nxx315"
        title="Đặc quyền dành riêng cho Creator"
        sub="Hệ sinh thái hoàn chỉnh giúp bạn vừa thỏa mãn đam mê sáng tạo, vừa tạo ra thu nhập thực tế."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ITEMS.map(({ Icon, title, text, hero, wide }) =>
          hero ? (
            <div
              key={title}
              className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b2e27] via-[#0d4a3f] to-[#0f766e] p-7 text-white shadow-2xl shadow-emerald-900/30 md:col-span-2 md:p-10"
            >
              <Trophy className="absolute -bottom-8 -right-6 h-52 w-52 -rotate-12 text-white/[0.07]" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Icon size={26} />
              </span>
              <h3 className="mt-6 text-2xl font-black sm:text-3xl">{title}</h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-emerald-50/85">{text}</p>
            </div>
          ) : (
            <GlassCard
              key={title}
              className={`group p-6 transition duration-300 hover:-translate-y-1 md:p-7 ${wide ? "md:col-span-2" : ""}`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 text-white shadow-md shadow-emerald-500/30">
                <Icon size={22} />
              </span>
              <h3 className={`mt-4 text-lg font-extrabold ${INK}`}>{title}</h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">{text}</p>
            </GlassCard>
          )
        )}
      </div>
    </section>
  );
}


