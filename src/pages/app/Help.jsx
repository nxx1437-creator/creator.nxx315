import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, MessageSquare, Settings, ChevronDown, ExternalLink } from "lucide-react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";

// Component cho từng câu hỏi (Accordion)
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-slate-50 px-2"
      >
        <span className="text-[14px] font-bold text-slate-800 pr-4">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 px-2 text-[13px] leading-relaxed text-slate-600 animate-in slide-in-from-top-1 fade-in duration-200">
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
      <div className="px-1 mb-4">
        <Eyebrow className="text-slate-500">▸ HELP CENTER</Eyebrow>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">FAQ & Hỗ trợ</h1>
        <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
          Câu hỏi thường gặp về cách tham gia chương trình creator.
        </p>
      </div>

      {/* MENU LIÊN KẾT NHANH */}
      <div className="space-y-3">
        <button 
          onClick={() => navigate("/app/rules")}
          className="flex w-full items-center gap-4 rounded-2xl border border-white bg-white/90 p-4 shadow-sm transition hover:bg-white text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Thể lệ</p>
            <p className="text-[13px] font-semibold text-slate-800 mt-0.5">Thể lệ chi tiết + cách làm video chất lượng.</p>
          </div>
        </button>

        <a 
          href="https://discord.gg/your-invite-link" 
          target="_blank" 
          rel="noreferrer"
          className="flex w-full items-center gap-4 rounded-2xl border border-white bg-white/90 p-4 shadow-sm transition hover:bg-white"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <MessageSquare size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Discord</p>
              <ExternalLink size={12} className="text-slate-400" />
            </div>
            <p className="text-[13px] font-semibold text-slate-800 mt-0.5">Hỏi đáp trực tiếp + cộng đồng creator.</p>
          </div>
        </a>

        <button 
          onClick={() => navigate("/app/settings")}
          className="flex w-full items-center gap-4 rounded-2xl border border-white bg-white/90 p-4 shadow-sm transition hover:bg-white text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Settings size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Cài đặt</p>
            <p className="text-[13px] font-semibold text-slate-800 mt-0.5">Quản lý hồ sơ, kênh đã liên kết và tài khoản.</p>
          </div>
        </button>
      </div>

      {/* DANH SÁCH CÂU HỎI */}
      
      {/* Nhóm 1 */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
          ▸ Tài khoản & Kênh
        </h2>
        <div className="rounded-2xl border border-white bg-white/90 shadow-sm overflow-hidden">
          <FAQItem 
            question="Làm sao để liên kết kênh YouTube/TikTok?" 
            answer="Vào mục Cài đặt trên thanh điều hướng, chọn 'Kênh liên kết', sau đó dán link kênh TikTok hoặc YouTube của bạn vào ô tương ứng và bấm 'Liên kết kênh'."
          />
          <FAQItem 
            question="Tôi có thể đổi kênh đã liên kết không?" 
            answer="Có. Bạn vào Cài đặt, bấm 'Huỷ liên kết' ở kênh cũ, sau đó tiến hành liên kết với kênh mới. Lưu ý: Bạn chỉ có thể huỷ nếu kênh đó không có video nào đang chờ duyệt."
          />
          <FAQItem 
            question="Tôi quên mật khẩu, làm sao reset?" 
            answer="Hiện tại web đăng nhập bằng Google nên không cần mật khẩu. Nếu bạn đăng xuất, chỉ cần bấm 'Đăng nhập bằng Google' và chọn lại tài khoản của mình là xong."
          />
        </div>
      </div>

      {/* Nhóm 2 */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
          ▸ Video & Thưởng
        </h2>
        <div className="rounded-2xl border border-white bg-white/90 shadow-sm overflow-hidden">
          <FAQItem 
            question="Video có những trạng thái nào?" 
            answer="Video sau khi gửi sẽ ở trạng thái 'Đang chờ'. Sau khi Admin duyệt sẽ là 'Đã duyệt' (có code xu) hoặc 'Bị từ chối' (kèm lý do). Nếu đủ điều kiện, video sẽ được cộng điểm vào bảng xếp hạng."
          />
          <FAQItem 
            question="Mỗi video duyệt được thưởng bao nhiêu?" 
            answer="Mỗi video được duyệt sẽ nhận 1 code xu. Số lượng xu cụ thể phụ thuộc vào số lượt xem và lượt thích/tim sau 7 ngày (theo bảng thưởng trong mục Thể lệ)."
          />
          <FAQItem 
            question="Hashtag yêu cầu là gì?" 
            answer="Hashtag bắt buộc hiện tại là #Nxx315Studio. Bạn phải gắn hashtag này trong tiêu đề hoặc mô tả của video."
          />
          <FAQItem 
            question="Khi nào tiền thưởng top tháng được trao?" 
            answer="Giải thưởng top tháng sẽ được trao trong vòng 7 ngày làm việc sau khi kết thúc tháng. Bạn cần khai báo thông tin nhận tiền ở mục 'Nhận tiền' (Payout) để được chi trả."
          />
        </div>
      </div>

      {/* Nhóm 3 */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
          ▸ Payout & Rút tiền
        </h2>
        <div className="rounded-2xl border border-white bg-white/90 shadow-sm overflow-hidden">
          <FAQItem 
            question="Làm sao để rút tiền thưởng?" 
            answer="Bạn vào mục 'Nhận tiền' (Payout), điền thông tin ngân hàng hoặc Momo khi có thưởng chờ nhận. Admin sẽ duyệt và chuyển khoản cho bạn."
          />
          <FAQItem 
            question="Yêu cầu rút tiền có thể bị từ chối không?" 
            answer="Có. Nếu thông tin tài khoản sai lệch, hoặc có dấu hiệu gian lận, yêu cầu rút tiền sẽ bị từ chối và tài khoản có thể bị tạm khoá để xác minh."
          />
          <FAQItem 
            question="Tôi có thể đổi tài khoản nhận tiền sau khi đã submit?" 
            answer="Bạn có thể yêu cầu đổi thông tin trước khi lệnh chuyển khoản được thực hiện. Hãy liên hệ Admin qua Discord để được hỗ trợ nhanh nhất."
          />
        </div>
      </div>

      {/* Nhóm 4 */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
          ▸ Bảng xếp hạng & Thứ hạng
        </h2>
        <div className="rounded-2xl border border-white bg-white/90 shadow-sm overflow-hidden">
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
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
          ▸ Cấm & Khoá tài khoản
        </h2>
        <div className="rounded-2xl border border-white bg-white/90 shadow-sm overflow-hidden">
          <FAQItem 
            question="Tài khoản bị suspend / ban vì sao?" 
            answer="Các trường hợp bị khoá bao gồm: dùng bot tăng tương tác, reup video người khác, tạo nhiều tài khoản để trục lợi, hoặc cung cấp thông tin giả mạo. Vui lòng liên hệ Discord để khiếu nại."
          />
        </div>
      </div>

      {/* HỖ TRỢ THÊM */}
      <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">Vẫn cần hỗ trợ?</p>
        <p className="text-[13px] text-slate-600 mb-4">Ping admin qua Discord — bọn mình reply trong vài giờ.</p>
        <a 
          href="https://discord.gg/your-invite-link" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 shadow-sm"
        >
          Tham gia Discord <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
