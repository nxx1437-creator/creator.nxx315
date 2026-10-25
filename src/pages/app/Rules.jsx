import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, Video, Globe, Hash, Award, Gift, ShieldAlert, HelpCircle, 
  CheckCircle2, ArrowRight, MessageSquare
} from "lucide-react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";

// Component thẻ (Card) có icon vuông bo góc
function InfoCard({ icon: Icon, title, children, iconColor = "text-cyan-600", iconBg = "bg-cyan-50" }) {
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

// Component chèn chỗ cần điền (màu vàng)
function FillIn({ text }) {
  return <span className="inline-block bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium border border-amber-200 text-xs">{text}</span>;
}

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-10">
      {/* HEADER */}
      <div className="px-1 mb-5">
        <Eyebrow className="text-slate-500">▸ THỂ LỆ CHƯƠNG TRÌNH</Eyebrow>
        <h1 className="mt-1 text-[26px] font-extrabold text-slate-900 tracking-tight">Thể lệ Creator</h1>
        <p className="mt-1 text-[14px] text-slate-500 font-medium">
          Quay video giới thiệu – Nhận code xu – Đua top hàng tháng.
        </p>
      </div>

      {/* 1. YÊU CẦU VIDEO (Hiển thị dạng Grid cho gọn) */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Yêu cầu Video</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col items-center text-center">
            <Clock size={20} className="text-cyan-600 mb-1.5" />
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Thời lượng</p>
            <p className="text-[13px] font-bold text-slate-800 mt-0.5">Tối thiểu 1 phút</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm flex flex-col items-center text-center">
            <Video size={20} className="text-cyan-600 mb-1.5" />
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Nền tảng</p>
            <p className="text-[13px] font-bold text-slate-800 mt-0.5">TikTok / YouTube</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center"><Globe size={16} className="text-slate-600"/></div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Trạng thái</p>
              <p className="text-[13px] font-bold text-slate-800">Công khai · Không xóa</p>
            </div>
          </div>
          <CheckCircle2 size={20} className="text-emerald-500" />
        </div>

        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-cyan-100 flex items-center justify-center"><Hash size={16} className="text-cyan-700"/></div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-cyan-600 uppercase">Hashtag bắt buộc</p>
              <p className="text-[13px] font-bold text-cyan-800">Gắn trong tiêu đề/mô tả</p>
            </div>
          </div>
          <span className="inline-block rounded-full border border-cyan-300 bg-white px-4 py-1.5 text-[13px] font-extrabold tracking-widest text-cyan-700 shadow-sm">
            #NXX315STUDIO
          </span>
        </div>
      </div>

      {/* 2. ĐIỀU KIỆN & PHẦN THƯỞNG */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Điều kiện & Phần thưởng</h2>
        
        <InfoCard icon={Award} title="Mốc nhận thưởng top tháng" iconColor="text-amber-600" iconBg="bg-amber-50">
          <p className="mb-2">Đứng top bảng xếp hạng chưa đủ — bạn cần đạt các mốc dưới đây thì admin mới mở thưởng:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Tối thiểu <strong>5 video</strong> đã được duyệt trong campaign này.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">Mỗi campaign có thể đặt mốc riêng — đọc kỹ trang chi tiết campaign trước khi tham gia.</p>
        </InfoCard>

        <InfoCard icon={Gift} title="Giờ thưởng theo chất lượng video" iconColor="text-emerald-600" iconBg="bg-emerald-50">
          <p className="mb-2">Mỗi video được duyệt đều cộng giờ cloud phone. Số giờ tùy chất lượng video:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Video đạt chuẩn — nhận mức giờ tối đa của chiến dịch.</li>
            <li>Video vẫn được duyệt nhưng còn cần cải thiện — nhận một phần mức đó (vd 50% hoặc 25%).</li>
          </ul>
          <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <p className="text-[12px] text-emerald-700 font-medium">💡 <strong>Mẹo:</strong> Quay rõ nét, đủ thời lượng, đúng hashtag yêu cầu và nội dung tập trung quảng bá Nxx315 Studio.</p>
          </div>
        </InfoCard>
      </div>

      {/* 3. QUY TRÌNH THAM GIA (Dạng Timeline) */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Quy trình tham gia</h2>
        
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
            
            <div className="relative pl-6">
              <span className="absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-[13px] font-bold text-cyan-700 ring-4 ring-white">1</span>
              <p className="text-[14px] font-medium text-slate-800">Đăng nhập bằng Google tại trang Creator.</p>
              <p className="text-[13px] text-slate-500 mt-1">Lần đầu đăng nhập, hệ thống tự tạo tài khoản, dùng chung với Nxx315 Studio.</p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-[13px] font-bold text-cyan-700 ring-4 ring-white">2</span>
              <p className="text-[14px] font-medium text-slate-800">Liên kết kênh mạng xã hội.</p>
              <p className="text-[13px] text-slate-500 mt-1">Vào <strong>Cài đặt</strong>, dán link kênh TikTok/YouTube. Mỗi kênh chỉ liên kết được với một tài khoản.</p>
            </div>

            <div className="relative pl-6">
              <span className="absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-[13px] font-bold text-cyan-700 ring-4 ring-white">3</span>
              <p className="text-[14px] font-medium text-slate-800">Làm video & Gửi link.</p>
              <p className="text-[13px] text-slate-500 mt-1">Đăng video giới thiệu lên kênh. Hệ thống tự tìm video YouTube hoặc bạn dán link video TikTok/YouTube thủ công.</p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. KIỂM TRA & DUYỆT */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Kiểm tra và duyệt</h2>
        <InfoCard icon={ShieldAlert} title="Quy trình duyệt" iconColor="text-slate-600" iconBg="bg-slate-100">
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-slate-400">•</span> <span><strong>Hệ thống kiểm tra:</strong> Video phải đúng kênh đã liên kết và đủ hashtag. Sai sẽ bị từ chối kèm lý do.</span></li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> <span><strong>Admin duyệt:</strong> Video đạt sẽ chờ admin duyệt thủ công (từ chối nếu nội dung kém, sai lệch, gian lận).</span></li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> <span><strong>Thời gian:</strong> Dự kiến <FillIn text="[1-2 ngày]" />.</span></li>
            <li className="flex gap-2"><span className="text-slate-400">•</span> <span>Video bị từ chối có thể sửa tiêu đề/mô tả rồi gửi lại.</span></li>
          </ul>
        </InfoCard>
      </div>

      {/* 5. GIỚI HẠN GỬI */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Giới hạn gửi video</h2>
        <div className="rounded-2xl border-l-4 border-rose-400 bg-rose-50/50 p-4 shadow-sm">
          <p className="text-[13px] text-rose-700 leading-relaxed">
            Chỉ nhận tối đa <strong>3 video / 24 giờ</strong>.<br/>
            Tối đa <strong>5 video đang chờ duyệt</strong> cùng lúc.<br/>
            Hỗ trợ link TikTok đầy đủ hoặc link rút gọn (vt.tiktok.com).
          </p>
        </div>
      </div>

      {/* 6. CODE XU */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Phần thưởng Code Xu</h2>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <ul className="list-disc pl-4 space-y-2 text-[13px] text-emerald-800">
            <li>Mỗi video duyệt nhận <strong>01 code xu</strong> (số xu do admin quyết định).</li>
            <li>Code hiện trong <strong>Lịch sử video</strong> & tab <strong>Thưởng</strong>. Dùng 1 lần, không chuyển nhượng.</li>
            <li>Nhập tại web chính: <strong>Ví → Nhập Gift Code</strong>.</li>
            <li>Sai 5 lần / 10 phút sẽ bị khóa nhập 10 phút.</li>
          </ul>
        </div>
      </div>

      {/* 7. BẢNG XẾP HẠNG */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Bảng xếp hạng tháng</h2>
        <InfoCard icon={Award} title="Cách tính điểm" iconColor="text-amber-600" iconBg="bg-amber-50">
          <ul className="list-disc pl-4 space-y-1 mb-3 text-[13px]">
            <li>Mỗi video duyệt = <strong>100 điểm</strong>.</li>
            <li>Hạng tính theo số video duyệt trong tháng (bằng nhau xét ai duyệt sớm hơn).</li>
            <li>Chốt sổ lúc <strong>00:00 ngày 1 hàng tháng</strong> (giờ VN).</li>
          </ul>
          <div className="bg-amber-50 rounded-lg p-3 text-[13px] border border-amber-100 text-amber-800 space-y-1">
            <p><strong>Giải thưởng:</strong> <FillIn text="[Top 1: ..., Top 2: ..., Top 3: ...]" /></p>
            <p><strong>Điều kiện nhận:</strong> <FillIn text="[VD: Tối thiểu 5 video duyệt]" /></p>
            <p><strong>Trao giải:</strong> Trong vòng <FillIn text="[X]" /> ngày sau khi kết thúc tháng.</p>
          </div>
        </InfoCard>
      </div>

      {/* 8. CẤM & QUYỀN BTC */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Quy định & Xử phạt</h2>
        
        <div className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm mb-3">
          <h3 className="font-bold text-rose-600 text-sm mb-3 flex items-center gap-2"><ShieldAlert size={16}/> Hành vi bị cấm</h3>
          <ul className="list-disc pl-4 space-y-1 text-[13px] text-slate-700">
            <li>Mua hoặc dùng bot tăng view, like, bình luận.</li>
            <li>Reup video người khác, liên kết kênh không thuộc sở hữu.</li>
            <li>Tạo nhiều tài khoản để nhận thưởng nhiều lần.</li>
            <li>Đăng nội dung vi phạm pháp luật, bản quyền, xúc phạm, nhạy cảm, sai sự thật.</li>
            <li>Lợi dụng lỗi hệ thống hoặc tìm cách vượt qua kiểm tra.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-800 text-sm mb-2">Quyền của Ban Tổ Chức</h3>
          <ul className="list-disc pl-4 space-y-1.5 text-[13px] text-slate-600">
            <li>Có quyền <strong>từ chối video, thu hồi code/xu, hủy thành tích, khóa tài khoản</strong> nếu phát hiện vi phạm.</li>
            <li>Quyết định của BTC là cuối cùng. Khiếu nại gửi qua Zalo <strong>0865245988</strong> hoặc email <strong>nxx315hub@gmail.com</strong>.</li>
            <li>BTC có thể tạm dừng hoặc kết thúc chương trình, sẽ thông báo trước trên website.</li>
          </ul>
        </div>
      </div>

      {/* 9. DỮ LIỆU */}
      <div className="mb-6">
        <InfoCard icon={Globe} title="Dữ liệu và hiển thị" iconColor="text-slate-600" iconBg="bg-slate-100">
          <ul className="list-disc pl-4 space-y-1.5 text-[13px]">
            <li>Tên, avatar kênh, điểm số có thể hiển thị công khai trên BXH.</li>
            <li>Hệ thống chỉ dùng Google xác minh danh tính, không đọc email, không đăng bài thay bạn.</li>
            <li>Link kênh, video, số liệu tương tác lấy từ thông tin công khai của nền tảng.</li>
          </ul>
        </InfoCard>
        <p className="text-[12px] text-slate-500 italic px-2">
          * BTC có thể điều chỉnh thể lệ. Nội dung mới đăng tải trên website sẽ có hiệu lực ngay lập tức.
        </p>
      </div>

      {/* HỖ TRỢ */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm text-center">
        <HelpCircle size={32} className="text-cyan-500 mx-auto mb-2 opacity-80" />
        <h3 className="font-bold text-slate-800 text-base mb-1">Bạn cần hỗ trợ thêm?</h3>
        <p className="text-[13px] text-slate-500 mb-5">Nếu có bất kỳ thắc mắc nào về thể lệ hoặc quá trình duyệt video, hãy liên hệ ngay cho Admin.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://zalo.me/0865245988" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600 shadow-sm w-full sm:w-auto justify-center">
            <MessageSquare size={16} /> Chat Zalo
          </a>
          <a href="mailto:nxx315hub@gmail.com" className="flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-900 shadow-sm w-full sm:w-auto justify-center">
            Gửi Email
          </a>
        </div>
      </div>
    </div>
  );
      }
