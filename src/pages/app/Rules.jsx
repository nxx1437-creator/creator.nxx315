import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, Video, Globe, Hash, Award, Gift, CheckCircle2, 
  AlertTriangle, ShieldAlert, BookOpen, MessageSquare
} from "lucide-react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";

// Component thẻ (Card) có icon vuông bo góc
function InfoCard({ icon: Icon, title, children, iconColor = "text-emerald-600", iconBg = "bg-emerald-50" }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm mb-3">
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor} border border-slate-100/50`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
          {title}
        </h3>
      </div>
      <div className="text-[14px] leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  );
}

// Component chèn chỗ cần điền
function FillIn({ text }) {
  return <span className="inline-block bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium border border-amber-200 text-xs">{text}</span>;
}

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-10">
      {/* HEADER */}
      <div className="px-1 mb-5">
        <Eyebrow className="text-slate-500">▸ MISSION PROTOCOL</Eyebrow>
        <h1 className="mt-1 text-[26px] font-extrabold text-slate-900 tracking-tight">Thể lệ & Cách làm video</h1>
        <p className="mt-1 text-[14px] text-slate-500 font-medium">
          Làm theo hướng dẫn. Nhận thưởng.
        </p>
      </div>

      {/* 1. YÊU CẦU CƠ BẢN */}
      <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Yêu cầu</h2>
      
      <InfoCard icon={Clock} title="Thời lượng">
        Tối thiểu 1 phút
      </InfoCard>
      
      <InfoCard icon={Video} title="Nền tảng">
        TikTok hoặc YouTube
      </InfoCard>
      
      <InfoCard icon={Globe} title="Trạng thái">
        Công khai · Không xóa
      </InfoCard>
      
      <InfoCard icon={Hash} title="Hashtag bắt buộc">
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-bold tracking-wider text-emerald-700">
            #NXX315STUDIO
          </span>
        </div>
      </InfoCard>

      {/* 2. ĐIỀU KIỆN NHẬN THƯỞNG */}
      <div className="mt-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Điều kiện nhận thưởng top tháng</h2>
        <InfoCard icon={Award} title="Mốc nhận thưởng" iconColor="text-amber-600" iconBg="bg-amber-50">
          <p className="mb-2">Đứng top bảng xếp hạng chưa đủ — bạn cần đạt các mốc dưới đây thì admin mới mở thưởng:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Tối thiểu 5 video đã được duyệt trong campaign này.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">Mỗi campaign có thể đặt mốc riêng — đọc kỹ trang chi tiết campaign trước khi tham gia.</p>
        </InfoCard>

        <InfoCard icon={Gift} title="Giờ thưởng theo chất lượng" iconColor="text-emerald-600" iconBg="bg-emerald-50">
          <p className="mb-2">Mỗi video được duyệt đều cộng giờ cloud phone. Số giờ tùy chất lượng video:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Video đạt chuẩn — nhận mức giờ tối đa của chiến dịch.</li>
            <li>Video vẫn được duyệt nhưng còn cần cải thiện — nhận một phần mức đó (vd 50% hoặc 25%).</li>
          </ul>
          <p className="text-xs text-slate-500 italic">Mẹo đạt tối đa: quay rõ nét, đủ thời lượng, đúng hashtag yêu cầu và nội dung tập trung quảng bá.</p>
        </InfoCard>
      </div>

      {/* 3. QUAY GÌ & CẤU TRÚC */}
      <div className="mt-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Hướng dẫn làm video</h2>
        
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm mb-3">
          <h3 className="text-lg font-bold text-emerald-600 mb-3">Nxx315 Creator — sân chơi của bạn</h3>
          <p className="text-[14px] text-slate-600 mb-4">Quay video về cloud phone, đăng TikTok/YouTube, đính hashtag bắt buộc. Bot scrape → admin duyệt → top tháng nhận thưởng.</p>
          
          <div className="border-t border-dashed border-slate-200 my-4"></div>
          
          <h4 className="text-base font-bold text-emerald-700 mb-2">Quay gì</h4>
          <ul className="list-disc pl-4 text-[14px] text-slate-600 space-y-1 mb-3">
            <li>Gameplay cloud phone (game nặng: Genshin, PUBG, Liên Quân…)</li>
            <li>So sánh XCloudPhone vs máy thật / emulator</li>
            <li>Hướng dẫn đăng ký, cấu hình, cài game</li>
            <li>Vlog trải nghiệm thật</li>
          </ul>
          <p className="text-[13px] text-slate-600"><strong>Tránh:</strong> re-upload, compilation, nội dung không liên quan, bot view.</p>

          <div className="border-t border-dashed border-slate-200 my-4"></div>

          <h4 className="text-base font-bold text-emerald-700 mb-2">Cấu trúc gợi ý</h4>
          <ul className="space-y-2 text-[14px] text-slate-700 font-medium">
            <li><strong>0:00–0:10</strong> — Hook mạnh.</li>
            <li><strong>Giữa video</strong> — Gameplay / demo rõ ràng.</li>
            <li><strong>Cuối</strong> — CTA + ghim hashtag.</li>
          </ul>
          <p className="text-xs text-slate-500 italic mt-3">Có voice-over (Việt hoặc Anh) sẽ lên top nhanh hơn.</p>
        </div>
      </div>

      {/* 4. QUY TRÌNH */}
      <div className="mt-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Quy trình</h2>
        <InfoCard icon={BookOpen} title="Các bước tham gia">
          <ol className="list-decimal pl-4 space-y-2 text-[13px]">
            <li>Login Creator portal (Google).</li>
            <li>Liên kết Discord + vào server cộng đồng (bắt buộc).</li>
            <li>Đăng video kèm đủ hashtag bắt buộc.</li>
            <li>Submit link ở trang Videos.</li>
            <li>Chờ duyệt 24–48h → điểm cộng vào campaign tháng.</li>
            <li>Cuối tháng top + đạt điều kiện → nhận thưởng.</li>
          </ol>
        </InfoCard>

        {/* Cảnh báo Discord */}
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4 mb-3">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong className="text-emerald-700 italic">Bắt buộc từ 10/08/2026.</strong> Chưa liên kết Discord và chưa ở trong server cộng đồng thì không nộp được video mới, và thưởng của video đã duyệt sẽ <strong>được giữ lại chứ không mất</strong> — hoàn tất hai bước là hệ thống tự trả đủ. Rời server sau khi liên kết thì tạm dừng nộp video cho tới khi quay lại. Mỗi tài khoản Discord chỉ gắn được với một tài khoản creator.
          </p>
        </div>

        {/* Giới hạn 5 video */}
        <div className="rounded-2xl border-l-4 border-cyan-500 bg-cyan-50/50 p-4">
          <h3 className="font-bold text-cyan-800 text-sm mb-1">Số video được duyệt mỗi ngày</h3>
          <p className="text-[13px] text-slate-700 leading-relaxed mb-2">
            <strong>Từ 25/10/2026:</strong> mỗi ngày tối đa 5 video của bạn được duyệt. Tính theo ngày bạn ĐĂNG video, không phải ngày admin duyệt.
          </p>
          <p className="text-[12px] text-slate-600 italic">
            Vì sao có giới hạn: thưởng là để trả cho video làm tử tế, không phải cho ai đăng được nhiều nhất. Làm ít bài mà đầu tư kỹ thì được chấm hạng chất lượng cao hơn.
          </p>
        </div>
      </div>

      {/* 5. VIDEO KHÔNG ĐƯỢC DUYỆT & CẤM */}
      <div className="mt-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Lưu ý & Cấm</h2>
        
        <InfoCard icon={AlertTriangle} title="Video KHÔNG được duyệt" iconColor="text-rose-600" iconBg="bg-rose-50">
          <ul className="list-disc pl-4 space-y-1 text-[13px] text-rose-700">
            <li>Không liên quan — nội dung không nói về web.</li>
            <li>Không nhắc tên — quay trên cloud phone nhưng không hề nhắc tới web.</li>
            <li>Chất lượng quá kém — quay thô, không dựng, không lời/chữ dẫn dắt.</li>
            <li>Reup — lấy lại video người khác, cắt ghép/lồng tiếng.</li>
            <li>Video về chính chương trình creator (hướng dẫn kiếm điểm, khoe số xu kiếm được...).</li>
          </ul>
        </InfoCard>

        <InfoCard icon={ShieldAlert} title="Hành vi bị cấm" iconColor="text-rose-600" iconBg="bg-rose-50">
          <ul className="list-disc pl-4 space-y-1 text-[13px] text-rose-700">
            <li>Xoá video sau khi duyệt → huỷ điểm + khoá tài khoản.</li>
            <li>View bot / fake engagement → khoá vĩnh viễn, thu hồi thưởng.</li>
            <li>Tài khoản private hoặc không khớp profile.</li>
          </ul>
        </InfoCard>
      </div>

      {/* HỖ TRỢ */}
      <div className="mt-6 text-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm mb-1">Cần hỗ trợ?</h3>
        <p className="text-[13px] text-slate-500 mb-4">Tham gia Discord để được giải đáp thắc mắc và khiếu nại điểm.</p>
        <button 
          onClick={() => navigate("/app/settings")} 
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 shadow-sm"
        >
          <MessageSquare size={16} /> Vào Discord
        </button>
      </div>
    </div>
  );
}
