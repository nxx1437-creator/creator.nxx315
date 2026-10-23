import React from "react";
import { Link2, Video, ShieldCheck } from "lucide-react";
import { SectionTitle, GlassCard } from "./ui.jsx";

const STEPS = [
  {
    id: "OP 01",
    Icon: Link2,
    title: "Kết nối kênh mạng xã hội",
    text: "Dán link kênh TikTok hoặc YouTube của bạn. Hệ thống AI sẽ tự động nhận diện trong 30s, bạn giữ toàn quyền kiểm soát kênh của mình.",
  },
  {
    id: "OP 02",
    Icon: Video,
    title: "Sáng tạo Clip & Trải nghiệm",
    text: "Quay video review, đánh giá độ mượt mà của Nxx315 Studio. Đăng tải kèm các hashtag bắt buộc để hệ thống tự động theo dõi lượt xem.",
  },
  {
    id: "OP 03",
    Icon: ShieldCheck,
    title: "Duyệt nội dung & Nhận thưởng",
    text: "Đội ngũ Admin duyệt thủ công. Video đạt chuẩn sẽ được cộng ngay Gift Code. Đua top Bảng Xếp Hạng để nhận tiền mặt mỗi tháng.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cach-lam" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <SectionTitle
        eyebrow="Hành trình Creator"
        title="Ba bước để cày rank"
        sub="Quy trình tinh gọn, minh bạch và không giới hạn số lượng video."
      />
      <div className="mt-12 space-y-4">
        {STEPS.map(({ id, Icon, title, text }) => (
          <GlassCard key={id} className="group relative overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all hover:border-emerald-500/30">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Icon size={28} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70">{id}</span>
                <div className="h-px w-8 bg-emerald-500/30"></div>
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
