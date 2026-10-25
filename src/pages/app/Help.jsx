import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, MessageSquare, Settings, ChevronDown, ExternalLink, 
  ShieldCheck, AlertTriangle, HelpCircle 
} from "lucide-react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";

// Component cho từng câu hỏi (Accordion)
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-slate-50/50 px-3"
      >
        <span className="text-[14px] font-semibold text-slate-800 pr-4">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-cyan-600" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 px-3 text-[13px] leading-relaxed text-slate-600 bg-slate-50/30 rounded-b-xl animate-in fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div className="px-1 mb-2">
        <Eyebrow className="text-slate-500">▸ HELP CENTER</Eyebrow>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Trung tâm hỗ trợ</h1>
        <p className="mt-1 text-[13px] text-slate-500 leading-relaxed max-w-[300px]">
          Giải đáp thắc mắc và hướng dẫn tham gia chương trình Creator.
        </p>
      </div>

      {/* LIÊN KẾT NHANH (Dạng lưới 3 nút) */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => navigate("/app/rules")}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
            <BookOpen size={18} />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Thể lệ</span>
        </button>

        <a 
          href="https://discord.gg/your-invite-link" 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <MessageSquare size={18} />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Discord</span>
        </a>

        <button 
          onClick={() => navigate("/app/settings")}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/30"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Settings size={18} />
          </div>
          <span className="text-[11px] font-bold text-slate-700">Cài đặt</span>
        </button>
      </div>

      {/* CÂU HỎI THƯỜNG GẶP (Gom nhóm vào 1 khung lớn) */}
      <div className="rounded-[2rem] border border-white bg-white/90 p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <HelpCircle size={18} className="text-cyan-600" />
          <h2 className="text-[15px] font-bold text-slate-800">Câu hỏi thường gặp</h2>
        </div>
        
        <div className="space-y-5">
          {/* Nhóm 1 */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              ▸ Tài khoản & Kênh
            </h3>
            <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <FAQItem 
                question="Làm sao để liên kết kênh YouTube/TikTok?" 
                answer="Vào mục Cài đặt, chọn 'Kênh liên kết', dán link kênh TikTok hoặc YouTube của bạn vào ô tương ứng và bấm 'Liên kết kênh'."
              />
              <FAQItem 
                question="Tôi có thể đổi kênh đã liên kết không?" 
                answer="Có. Bạn vào Cài đặt, bấm 'Huỷ liên kết' ở kênh cũ, sau đó tiến hành liên kết với kênh mới. Lưu ý: Bạn chỉ có thể huỷ nếu kênh đó không có video nào đang chờ duyệt."
              />
              <FAQItem 
                question="Tôi quên mật khẩu, làm sao reset?" 
                answer="Hệ thống đăng nhập bằng Google nên bạn không cần nhớ mật khẩu. Nếu bị đăng xuất, chỉ cần bấm 'Đăng nhập bằng Google' và chọn lại tài khoản cũ."
              />
            </div>
          </div>

          {/* Nhóm 2 */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              ▸ Video & Thưởng
            </h3>
            <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <FAQItem 
                question="Video có những trạng thái nào?" 
                answer="Video sau khi gửi sẽ ở trạng thái 'Đang chờ'. Admin duyệt xong sẽ chuyển thành 'Đã duyệt' (có code xu) hoặc 'Bị từ chối' (kèm lý do)."
              />
              <FAQItem 
                question="Mỗi video duyệt được thưởng bao nhiêu?" 
                answer="Mỗi video được duyệt sẽ nhận 1 code xu. Số lượng xu cụ thể phụ thuộc vào lượt xem/like sau 7 ngày (theo bảng thưởng trong mục Thể lệ)."
              />
              <FAQItem 
                question="Hashtag yêu cầu là gì?" 
                answer="Hashtag bắt buộc hiện tại là #Nxx315Studio. Bạn phải gắn hashtag này trong tiêu đề hoặc mô tả video."
              />
              <FAQItem 
                question="Khi nào tiền thưởng top tháng được trao?" 
                answer="Giải thưởng top tháng sẽ được trao trong vòng 7 ngày làm việc sau khi kết thúc tháng. Hãy khai báo thông tin nhận tiền ở mục Payout."
              />
            </div>
          </div>

          {/* Nhóm 3 */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              ▸ Payout & Rút tiền
            </h3>
            <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <FAQItem 
                question="Làm sao để rút tiền thưởng?" 
                answer="Vào mục 'Nhận tiền' (Payout), điền thông tin ngân hàng/Momo khi có thưởng chờ nhận. Admin sẽ duyệt và chuyển khoản cho bạn."
              />
              <FAQItem 
                question="Yêu cầu rút tiền có thể bị từ chối không?" 
                answer="Có. Nếu thông tin tài khoản sai lệch hoặc có dấu hiệu gian lận, yêu cầu sẽ bị từ chối và tài khoản có thể bị tạm khoá để xác minh."
              />
              <FAQItem 
                question="Tôi có thể đổi tài khoản nhận tiền sau khi đã submit?" 
                answer="Bạn có thể yêu cầu đổi thông tin trước khi lệnh chuyển khoản được thực hiện. Hãy liên hệ Admin qua Discord để được hỗ trợ."
              />
            </div>
          </div>

          {/* Nhóm 4 */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              ▸ Bảng xếp hạng & Thứ hạng
            </h3>
            <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <FAQItem 
                question="Điểm số (score) tính thế nào?" 
                answer="Mỗi video được duyệt hợp lệ = 100 điểm. Thứ hạng xếp theo tổng số video được duyệt trong tháng. Nếu bằng điểm, ai có video duyệt sớm hơn sẽ xếp trên."
              />
              <FAQItem 
                question="Tại sao video tôi đã đăng nhưng chưa thấy ở leaderboard?" 
                answer="Video cần thời gian Admin duyệt thủ công. Chỉ khi trạng thái video là 'Đã duyệt' thì điểm mới được cộng vào bảng xếp hạng tháng."
              />
            </div>
          </div>
          
          {/* Nhóm 5 */}
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">
              ▸ Cấm & Khoá tài khoản
            </h3>
            <div className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <FAQItem 
                question="Tài khoản bị suspend / ban vì sao?" 
                answer="Các trường hợp bị khoá bao gồm: dùng bot tăng tương tác, reup video người khác, tạo nhiều tài khoản để trục lợi, hoặc cung cấp thông tin giả mạo. Vui lòng liên hệ Discord để khiếu nại."
              />
            </div>
          </div>
        </div>
      </div>

      {/* LƯU Ý QUAN TRỌNG (Khối nổi bật) */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3 shadow-sm">
        <ShieldCheck size={20} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-[13px] font-bold text-amber-800">Lưu ý bảo mật</h3>
          <p className="text-[12px] text-amber-700 mt-1 leading-relaxed">
            Nxx315 Studio <strong>không bao giờ</strong> yêu cầu bạn cung cấp mật khẩu Google, mã xác minh OTP hay thông tin thẻ ngân hàng. Hãy cảnh giác với các tin nhắn giả mạo yêu cầu cung cấp thông tin cá nhân.
          </p>
        </div>
      </div>

      {/* HỖ TRỢ THÊM (Dưới cùng) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Vẫn cần hỗ trợ?</p>
        <p className="text-[13px] text-slate-600 mb-4">Đội ngũ Admin luôn sẵn sàng giải đáp thắc mắc của bạn.</p>
        <a 
          href="https://discord.gg/your-invite-link" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-sm"
        >
          <MessageSquare size={16} /> Nhắn tin cho Admin
        </a>
      </div>
    </div>
  );
      }
