import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, CheckCircle2, ShieldAlert, Award, Gift, HelpCircle, 
  Clock, Video, Hash, Flame, AlertTriangle, ArrowRight, MessageSquare
} from "lucide-react";
import { Card, Eyebrow } from "../../components/creator/creatorUi.jsx";

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-10">
      {/* HEADER */}
      <div className="px-1">
        <Eyebrow>▸ MISSION PROTOCOL</Eyebrow>
        <h1 className="mt-1 text-3xl font-extrabold text-cyan-600">Thể lệ & Cách làm video</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Làm theo hướng dẫn. Nhận thưởng.
        </p>
      </div>

      {/* YÊU CẦU CƠ BẢN (GRID) */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
            <Video size={18} />
          </span>
          <h2 className="text-lg font-bold text-slate-800">Yêu cầu video</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> Thời lượng</p>
            <p className="mt-1 text-sm font-bold text-slate-800">Tối thiểu 1 phút</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1"><Video size={12}/> Nền tảng</p>
            <p className="mt-1 text-sm font-bold text-slate-800">TikTok / YouTube</p>
          </div>
          <div className="col-span-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1"><Hash size={12}/> Trạng thái</p>
            <p className="mt-1 text-sm font-bold text-slate-800">Công khai · Không xoá</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-xs font-bold text-cyan-800 mb-2 flex items-center gap-1"><Hash size={14}/> Hashtag bắt buộc</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-cyan-600 shadow-sm border border-cyan-100">#xcloudphone</span>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-cyan-600 shadow-sm border border-cyan-100">#cloudphone</span>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-cyan-600 shadow-sm border border-cyan-100">#cloudgaming</span>
          </div>
        </div>
      </Card>

      {/* ĐIỀU KIỆN NHẬN THƯỞNG TOP THÁNG */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Award size={18} />
          </span>
          <h2 className="text-lg font-bold text-slate-800">Điều kiện nhận thưởng</h2>
        </div>
        <p className="text-sm text-slate-600 mb-3">Đứng top bảng xếp hạng chưa đủ — bạn cần đạt các mốc sau:</p>
        
        <ul className="space-y-2 mb-4">
          <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> Tối thiểu 5 video đã được duyệt trong campaign.
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-700 font-medium">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> Mỗi campaign có thể đặt mốc riêng (đọc kỹ trang chi tiết).
          </li>
        </ul>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1"><Gift size={14}/> Giờ thưởng theo chất lượng</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Video đạt chuẩn nhận mức giờ tối đa. Video cần cải thiện nhận 50% hoặc 25%. <strong>Mẹo:</strong> Quay rõ nét, đủ thời lượng, đúng hashtag và tập trung quảng bá.
          </p>
        </div>
      </Card>

      {/* QUY TRÌNH LÀM VIDEO */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <BookOpen size={18} />
          </span>
          <h2 className="text-lg font-bold text-slate-800">Quy trình thực hiện</h2>
        </div>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {[
            { step: "1", title: "Đăng nhập Creator Portal", desc: "Bằng tài khoản Google." },
            { step: "2", title: "Liên kết Discord", desc: "Vào Cài đặt bấm 'Liên kết Discord', vào server và điền đơn tham gia (bắt buộc)." },
            { step: "3", title: "Đăng video & Submit link", desc: "Đăng TikTok/YouTube kèm đủ hashtag, sau đó vào trang Videos để nộp link." },
            { step: "4", title: "Chờ duyệt", desc: "24–48h. Điểm sẽ cộng vào campaign tháng." },
            { step: "5", title: "Nhận thưởng", desc: "Cuối tháng top + đạt điều kiện → admin xác nhận → nhận thưởng." }
          ].map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 ring-4 ring-white">
                {item.step}
              </div>
              <div className="pt-1.5">
                <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-xs font-bold text-rose-600 mb-1 flex items-center gap-1"><AlertTriangle size={14}/> Lưu ý quan trọng từ 10/08/2026</p>
          <p className="text-xs text-rose-600/80 leading-relaxed">
            Chưa liên kết Discord và chưa ở trong server cộng đồng thì <strong>không nộp được video mới</strong>, và thưởng của video đã duyệt sẽ được giữ lại (hoàn tất 2 bước là hệ thống tự trả đủ). Mỗi tài khoản Discord chỉ gắn được với một tài khoản creator.
          </p>
        </div>
      </Card>

      {/* QUY ĐỊNH VIDEO BỊ TỪ CHỐI */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <ShieldAlert size={18} />
          </span>
          <h2 className="text-lg font-bold text-slate-800">Video thế nào thì KHÔNG được duyệt?</h2>
        </div>
        <p className="text-sm text-slate-600 mb-3">Bốn lỗi dưới đây bị từ chối và <strong>không sửa được</strong> bằng cách đổi caption:</p>
        
        <div className="space-y-2.5">
          {[
            "Không liên quan — nội dung không nói về XCloudPhone.",
            "Không nhắc tên — quay trên cloud phone nhưng không nhắc tới XCloudPhone.",
            "Chất lượng quá kém — quay màn hình thô, không dựng, không lời/chữ dẫn dắt.",
            "Reup — lấy lại video người khác, cắt ghép/lồng tiếng lại video có sẵn.",
            "Video về chính chương trình creator — hướng dẫn kiếm giờ, khoe thu nhập, rủ rê."
          ].map((text, idx) => (
            <div key={idx} className="flex items-start gap-2 rounded-lg bg-rose-50/50 p-3 border border-rose-100">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-500" />
              <p className="text-sm text-rose-700 font-medium">{text}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* CẤM & HỖ TRỢ */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2"><ShieldAlert size={16} className="text-rose-500"/> Hành vi bị cấm</h2>
          <ul className="space-y-2">
            <li className="text-xs text-slate-600 flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">•</span> Xoá video sau khi duyệt → huỷ điểm + khoá tài khoản.</li>
            <li className="text-xs text-slate-600 flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">•</span> View bot / fake engagement → khoá vĩnh viễn, thu hồi thưởng.</li>
            <li className="text-xs text-slate-600 flex items-start gap-2"><span className="text-rose-500 font-bold mt-0.5">•</span> Tài khoản private hoặc không khớp profile.</li>
          </ul>
        </Card>

        <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm flex flex-col items-center justify-center text-center">
          <HelpCircle size={28} className="text-cyan-500 mb-2" />
          <h2 className="text-sm font-bold text-slate-800">Cần hỗ trợ?</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">Tham gia Discord để được giải đáp thắc mắc và khiếu nại điểm.</p>
          <button 
            onClick={() => navigate("/app/settings")} 
            className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 shadow-sm"
          >
            <MessageSquare size={16} /> Vào Discord
          </button>
        </Card>
      </div>
    </div>
  );
}
