import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, Video, Globe, Hash, Award, Gift, ShieldAlert, HelpCircle 
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

      {/* MỤC 1: YÊU CẦU VIDEO */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Yêu cầu Video</h2>
        
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
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[12px] font-bold tracking-wider text-cyan-700">
              #NXX315STUDIO
            </span>
          </div>
        </InfoCard>
      </div>

      {/* MỤC 2: ĐIỀU KIỆN NHẬN THƯỞNG */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Điều kiện nhận thưởng</h2>
        
        <InfoCard icon={Award} title="Mốc nhận thưởng top tháng" iconColor="text-amber-600" iconBg="bg-amber-50">
          <p className="mb-2">Đứng top bảng xếp hạng chưa đủ — bạn cần đạt các mốc dưới đây thì admin mới mở thưởng:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Tối thiểu 5 video đã được duyệt trong campaign này.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">Mỗi campaign có thể đặt mốc riêng — đọc kỹ trang chi tiết campaign trước khi tham gia.</p>
        </InfoCard>

        <InfoCard icon={Gift} title="Giờ thưởng theo chất lượng video" iconColor="text-emerald-600" iconBg="bg-emerald-50">
          <p className="mb-2">Mỗi video được duyệt đều cộng giờ cloud phone. Số giờ tùy chất lượng video:</p>
          <ul className="list-disc pl-4 space-y-1 mb-2">
            <li>Video đạt chuẩn — nhận mức giờ tối đa của chiến dịch.</li>
            <li>Video vẫn được duyệt nhưng còn cần cải thiện — nhận một phần mức đó (vd 50% hoặc 25%).</li>
          </ul>
          <p className="text-xs text-slate-500 italic">Mẹo đạt tối đa: quay rõ nét, đủ thời lượng, đúng hashtag yêu cầu và nội dung tập trung quảng bá Nxx315 Studio.</p>
        </InfoCard>
      </div>

      {/* MỤC 3: QUY TRÌNH THAM GIA */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Quy trình tham gia</h2>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <ol className="list-decimal pl-4 space-y-3 text-[14px] text-slate-700">
            <li>Đăng nhập bằng Google tại trang Creator. Lần đầu đăng nhập, hệ thống tự tạo tài khoản, dùng chung với Nxx315 Studio.</li>
            <li>Vào <strong>Cài đặt</strong>, liên kết kênh TikTok và/hoặc YouTube của chính bạn bằng cách dán link kênh. Mỗi kênh chỉ liên kết được với <strong>một tài khoản</strong>.</li>
            <li>Làm video giới thiệu Nxx315 Studio, đăng lên kênh đã liên kết.</li>
            <li>Gửi video: với YouTube, hệ thống có thể tự tìm video mới của bạn; với TikTok, bạn dán link video. Bạn cũng có thể dán link YouTube thủ công.</li>
          </ol>
        </div>
      </div>

      {/* MỤC 4: GIỚI HẠN GỬI VIDEO */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Giới hạn gửi video</h2>
        <InfoCard icon={Clock} title="Quy định">
          <ul className="list-disc pl-4 space-y-1">
            <li>Tối đa <strong>3 video trong 24 giờ</strong>.</li>
            <li>Tối đa <strong>5 video đang chờ duyệt</strong> cùng lúc.</li>
            <li>Link TikTok có thể là link đầy đủ hoặc link chia sẻ (<code>vt.tiktok.com</code>, <code>vm.tiktok.com</code>).</li>
          </ul>
        </InfoCard>
      </div>

      {/* MỤC 5: KIỂM TRA & DUYỆT */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Kiểm tra và duyệt video</h2>
        <InfoCard icon={ShieldAlert} title="Quy trình duyệt">
          <ul className="list-disc pl-4 space-y-1">
            <li>Hệ thống tự kiểm tra video có thuộc <strong>đúng kênh bạn đã liên kết</strong> và có <strong>đủ hashtag</strong> hay không. Video không đạt sẽ bị từ chối kèm ghi chú lý do.</li>
            <li>Video đạt kiểm tra sẽ vào trạng thái <strong>Đang chờ</strong> để <strong>admin duyệt thủ công</strong>.</li>
            <li>Admin có quyền từ chối video không giới thiệu đúng Nxx315 Studio, nội dung kém chất lượng, sao chép hoặc có dấu hiệu gian lận.</li>
            <li>Thời gian duyệt dự kiến: <FillIn text="[Điền thời gian, VD: 1-2 ngày]" />.</li>
            <li>Video bị từ chối có thể sửa tiêu đề/mô tả cho đủ điều kiện rồi gửi lại.</li>
          </ul>
        </InfoCard>
      </div>

      {/* MỤC 6: PHẦN THƯỞNG */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Phần thưởng</h2>
        <InfoCard icon={Gift} title="Code xu" iconColor="text-emerald-600" iconBg="bg-emerald-50">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mỗi video được duyệt nhận <strong>01 code xu</strong>, số xu do admin quyết định.</li>
            <li>Code hiển thị trong <strong>Lịch sử video</strong> và tab <strong>Thưởng</strong>. Code chỉ <strong>dùng được 1 lần</strong> và <strong>chỉ tài khoản của bạn nhập được</strong>, không chuyển nhượng.</li>
            <li>Cách nhận xu: vào web chính Nxx315 Studio → <strong>Ví → Nhập Gift Code</strong>.</li>
            <li>Nhập sai code quá 5 lần trong 10 phút sẽ bị khóa 10 phút.</li>
            <li>Xu nhận được sử dụng theo quy định chung của Nxx315 Studio (đổi quà, các dịch vụ trong cửa hàng).</li>
          </ul>
        </InfoCard>
      </div>

      {/* MỤC 7: BẢNG XẾP HẠNG */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Bảng xếp hạng và giải tháng</h2>
        <InfoCard icon={Award} title="Cách tính điểm" iconColor="text-amber-600" iconBg="bg-amber-50">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mỗi video được duyệt = <strong>100 điểm</strong>.</li>
            <li>Hạng tính theo <strong>số video được duyệt trong tháng</strong>. Bằng nhau thì ai có video được duyệt sớm hơn xếp trên.</li>
            <li>Bảng xếp hạng tính theo tháng dương lịch, <strong>giờ Việt Nam</strong>, làm mới vào 00:00 ngày 1 hàng tháng.</li>
            <li>Giải thưởng top tháng: <FillIn text="[Điền giải thưởng Top 1, 2, 3...]" />.</li>
            <li>Điều kiện nhận giải top: <FillIn text="[VD: tối thiểu 5 video được duyệt trong tháng]" />.</li>
            <li>Giải được công bố và trao trong vòng <FillIn text="[Điền số ngày]" /> ngày sau khi kết thúc tháng.</li>
          </ul>
        </InfoCard>
      </div>

      {/* MỤC 8 & 9: CẤM & QUYỀN BTC */}
      <div className="mb-6">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">Quy định & Hành vi bị cấm</h2>
        <InfoCard icon={ShieldAlert} title="Hành vi bị cấm" iconColor="text-rose-600" iconBg="bg-rose-50">
          <ul className="list-disc pl-4 space-y-1 text-rose-700">
            <li>Mua hoặc dùng bot/dịch vụ tăng view, like, bình luận.</li>
            <li>Dùng video của người khác, hoặc liên kết kênh không thuộc quyền sở hữu của bạn.</li>
            <li>Tạo nhiều tài khoản để nhận thưởng nhiều lần.</li>
            <li>Đăng nội dung vi phạm pháp luật, bản quyền, xúc phạm, nhạy cảm; đưa thông tin sai sự thật về Nxx315 Studio.</li>
            <li>Lợi dụng lỗi hệ thống hoặc tìm cách vượt qua kiểm tra.</li>
          </ul>
        </InfoCard>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm mb-3">
          <h3 className="font-bold text-slate-800 text-sm mb-2">Quyền của ban tổ chức</h3>
          <ul className="list-disc pl-4 space-y-1 text-[13px] text-slate-600">
            <li>Từ chối video, <strong>thu hồi code/xu, huỷ thành tích và khoá tài khoản</strong> nếu phát hiện vi phạm.</li>
            <li>Kết quả duyệt video và xếp hạng của ban tổ chức là quyết định cuối cùng. Thắc mắc, khiếu nại gửi qua: Zalo <strong>0865245988</strong>, email: <strong>nxx315hub@gmail.com</strong>.</li>
            <li>Tạm dừng hoặc kết thúc chương trình khi cần thiết, có thông báo trước trên website.</li>
          </ul>
        </div>
      </div>

      {/* MỤC 10 & 11: DỮ LIỆU & THAY ĐỔI */}
      <div className="mb-6">
        <InfoCard icon={Globe} title="Dữ liệu và hiển thị công khai">
          <ul className="list-disc pl-4 space-y-1">
            <li>Tên người dùng, ảnh đại diện kênh và điểm số của bạn có thể <strong>hiển thị công khai</strong> trên bảng xếp hạng và mục "Vừa được duyệt" (tên hiển thị dạng rút gọn).</li>
            <li>Hệ thống chỉ dùng Google để xác minh danh tính, <strong>không đọc email và không đăng bài thay bạn</strong>.</li>
            <li>Link kênh, video và số liệu (lượt xem, thích, bình luận) được lấy từ thông tin công khai của nền tảng để phục vụ việc xét duyệt.</li>
          </ul>
        </InfoCard>
        
        <p className="text-[13px] text-slate-500 italic px-1">
          <strong>Thay đổi thể lệ:</strong> Ban tổ chức có thể điều chỉnh thể lệ. Nội dung mới được đăng trên website và có hiệu lực từ thời điểm đăng.
        </p>
      </div>

      {/* HỖ TRỢ */}
      <div className="mt-8 text-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <HelpCircle size={28} className="text-cyan-500 mx-auto mb-2" />
        <h3 className="font-bold text-slate-800 text-sm mb-1">Cần hỗ trợ?</h3>
        <p className="text-[13px] text-slate-500 mb-4">Liên hệ Zalo 0865245988 hoặc email nxx315hub@gmail.com.</p>
      </div>
    </div>
  );
      }
