import React from "react";
import { Gift, ShieldCheck, RefreshCw, Trophy } from "lucide-react";
import { SectionTitle, GlassCard } from "./ui.jsx";

const ITEMS = [
  {
    Icon: Gift,
    title: "Mỗi video một code xu",
    text: "Video được duyệt nhận ngay một code xu riêng, chỉ bạn nhập được. Dùng xu để đổi quà trong cửa hàng Nxx315 Studio.",
  },
  {
    Icon: ShieldCheck,
    title: "Duyệt tay, công bằng",
    text: "Admin xem từng video. Video không thuộc kênh bạn đã liên kết hoặc thiếu hashtag sẽ bị từ chối kèm lý do rõ ràng.",
  },
  {
    Icon: RefreshCw,
    title: "Tự quét kênh YouTube",
    text: "Video mới đúng hashtag tự vào danh sách chờ duyệt, kèm lượt xem, lượt thích và bình luận được cập nhật.",
  },
  {
    Icon: Trophy,
    title: "Đua top mỗi tháng",
    text: "Mỗi video được duyệt là 100 điểm. Bảng xếp hạng làm mới theo tháng, ai đứng đầu sẽ nhận giải thêm.",
  },
];

export default function Features() {
  return (
    <section id="quyen-loi" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
      <SectionTitle
        eyebrow="Quyền lợi"
        title="Vì sao nên tham gia"
        sub="Chương trình làm cho creator, minh bạch ở từng bước."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {ITEMS.map(({ Icon, title, text }) => (
          <GlassCard key={title} className="flex gap-4 p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              <Icon size={20} />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
