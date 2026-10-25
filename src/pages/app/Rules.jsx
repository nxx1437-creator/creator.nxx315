import React from "react";
import { Card, Eyebrow } from "../../components/creator/creatorUi.jsx";

// Component phụ để hiển thị các mục cho gọn code
function Section({ title, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h2 className="text-[15px] font-bold text-cyan-700 mb-2">{title}</h2>
      <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

// Component hiển thị các chỗ cần điền (dạng ngoặc vuông)
function FillIn({ text }) {
  return <span className="inline-block bg-amber-100 text-amber-800 px-1 rounded font-medium border border-amber-200">{text}</span>;
}

export default function Rules() {
  return (
    <div className="space-y-4 pb-10">
      {/* HEADER */}
      <div className="px-1">
        <Eyebrow>▸ THỂ LỆ</Eyebrow>
        <h1 className="mt-1 text-2xl font-extrabold text-cyan-600">Thể lệ chương trình</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Quay video giới thiệu – Nhận code xu – Đua top hàng tháng
        </p>
      </div>

      <Card className="relative overflow-hidden rounded-2xl border-white bg-white p-5 shadow-sm">
        
        <Section title="1. Đối tượng tham gia">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mọi cá nhân sở hữu kênh <strong>TikTok hoặc YouTube</strong> công khai và có tài khoản Google.</li>
            <li>Mỗi người chỉ được tham gia bằng <strong>một tài khoản</strong>.</li>
            <li>Tham gia hoàn toàn miễn phí.</li>
            <li><FillIn text="[Bạn điền nếu có giới hạn độ tuổi, ví dụ: từ đủ 13 tuổi...]" /></li>
          </ul>
        </Section>

        <Section title="2. Cách tham gia">
          <ol className="list-decimal pl-4 space-y-1.5">
            <li>Đăng nhập bằng Google tại trang Creator. Lần đầu đăng nhập, hệ thống tự tạo tài khoản, dùng chung với Nxx315 Studio.</li>
            <li>Vào <strong>Cài đặt</strong>, liên kết kênh TikTok và/hoặc YouTube của chính bạn bằng cách dán link kênh. Mỗi kênh chỉ liên kết được với <strong>một tài khoản</strong>.</li>
            <li>Làm video giới thiệu Nxx315 Studio, đăng lên kênh đã liên kết.</li>
            <li>Gửi video: với YouTube, hệ thống có thể tự tìm video mới của bạn; với TikTok, bạn dán link video. Bạn cũng có thể dán link YouTube thủ công.</li>
          </ol>
        </Section>

        <Section title="3. Điều kiện để video hợp lệ">
          <ul className="list-disc pl-4 space-y-1">
            <li>Đăng <strong>công khai</strong> trên kênh bạn đã liên kết.</li>
            <li><strong>Giới thiệu rõ ràng Nxx315 Studio</strong> (nxx315.top), nội dung do chính bạn thực hiện.</li>
            <li>Có đủ <strong>hashtag bắt buộc</strong> trong tiêu đề hoặc mô tả: <strong className="text-cyan-600">#Nxx315Studio</strong> (hashtag có thể được cập nhật và luôn hiển thị trên trang Tổng quan).</li>
            <li>Tiêu đề/mô tả có nội dung thật, không chỉ gắn mỗi hashtag.</li>
            <li>Video chưa từng được gửi trước đó.</li>
            <li>Nội dung tuân thủ pháp luật và quy định của nền tảng đăng tải.</li>
            <li><FillIn text="[Bạn điền nếu có yêu cầu thêm: thời lượng tối thiểu, ngôn ngữ...]" /></li>
          </ul>
        </Section>

        <Section title="4. Giới hạn gửi video">
          <ul className="list-disc pl-4 space-y-1">
            <li>Tối đa <strong>3 video trong 24 giờ</strong>.</li>
            <li>Tối đa <strong>5 video đang chờ duyệt</strong> cùng lúc.</li>
            <li>Link TikTok có thể là link đầy đủ hoặc link chia sẻ (`vt.tiktok.com`, `vm.tiktok.com`).</li>
          </ul>
        </Section>

        <Section title="5. Kiểm tra và duyệt video">
          <ul className="list-disc pl-4 space-y-1">
            <li>Hệ thống tự kiểm tra video có thuộc <strong>đúng kênh bạn đã liên kết</strong> và có <strong>đủ hashtag</strong> hay không. Video không đạt sẽ bị từ chối kèm ghi chú lý do.</li>
            <li>Video đạt kiểm tra sẽ vào trạng thái <strong>Đang chờ</strong> để <strong>admin duyệt thủ công</strong>.</li>
            <li>Admin có quyền từ chối video không giới thiệu đúng Nxx315 Studio, nội dung kém chất lượng, sao chép hoặc có dấu hiệu gian lận.</li>
            <li>Thời gian duyệt dự kiến: <FillIn text="[Điền thời gian, VD: 1-2 ngày]" />.</li>
            <li>Video bị từ chối có thể sửa tiêu đề/mô tả cho đủ điều kiện rồi gửi lại.</li>
          </ul>
        </Section>

        <Section title="6. Phần thưởng">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mỗi video được duyệt nhận <strong>01 code xu</strong>, số xu do admin quyết định.</li>
            <li>Code hiển thị trong <strong>Lịch sử video</strong> và tab <strong>Thưởng</strong>. Code chỉ <strong>dùng được 1 lần</strong> và <strong>chỉ tài khoản của bạn nhập được</strong>, không chuyển nhượng.</li>
            <li>Cách nhận xu: vào web chính Nxx315 Studio → <strong>Ví → Nhập Gift Code</strong>.</li>
            <li>Nhập sai code quá 5 lần trong 10 phút sẽ bị khóa 10 phút.</li>
            <li>Xu nhận được sử dụng theo quy định chung của Nxx315 Studio (đổi quà, các dịch vụ trong cửa hàng).</li>
          </ul>
        </Section>

        <Section title="7. Bảng xếp hạng và giải tháng">
          <ul className="list-disc pl-4 space-y-1">
            <li>Mỗi video được duyệt = <strong>100 điểm</strong>.</li>
            <li>Hạng tính theo <strong>số video được duyệt trong tháng</strong>. Bằng nhau thì ai có video được duyệt sớm hơn xếp trên.</li>
            <li>Bảng xếp hạng tính theo tháng dương lịch, <strong>giờ Việt Nam</strong>, làm mới vào 00:00 ngày 1 hàng tháng.</li>
            <li>Giải thưởng top tháng: <FillIn text="[Điền giải thưởng Top 1, 2, 3...]" />.</li>
            <li>Điều kiện nhận giải top: <FillIn text="[VD: tối thiểu 5 video được duyệt trong tháng]" />.</li>
            <li>Giải được công bố và trao trong vòng <FillIn text="[Điền số ngày]" /> ngày sau khi kết thúc tháng.</li>
          </ul>
        </Section>

        <Section title="8. Hành vi bị cấm">
          <ul className="list-disc pl-4 space-y-1 text-rose-600">
            <li>Mua hoặc dùng bot/dịch vụ tăng view, like, bình luận.</li>
            <li>Dùng video của người khác, hoặc liên kết kênh không thuộc quyền sở hữu của bạn.</li>
            <li>Tạo nhiều tài khoản để nhận thưởng nhiều lần.</li>
            <li>Đăng nội dung vi phạm pháp luật, bản quyền, xúc phạm, nhạy cảm; đưa thông tin sai sự thật về Nxx315 Studio.</li>
            <li>Lợi dụng lỗi hệ thống hoặc tìm cách vượt qua kiểm tra.</li>
          </ul>
        </Section>

        <Section title="9. Quyền của ban tổ chức">
          <ul className="list-disc pl-4 space-y-1">
            <li>Từ chối video, <strong>thu hồi code/xu, huỷ thành tích và khoá tài khoản</strong> nếu phát hiện vi phạm.</li>
            <li>Kết quả duyệt video và xếp hạng của ban tổ chức là quyết định cuối cùng. Thắc mắc, khiếu nại gửi qua: Zalo <strong>0865245988</strong>, email: <strong>nxx315hub@gmail.com</strong>.</li>
            <li>Tạm dừng hoặc kết thúc chương trình khi cần thiết, có thông báo trước trên website.</li>
          </ul>
        </Section>

        <Section title="10. Dữ liệu và hiển thị công khai">
          <ul className="list-disc pl-4 space-y-1">
            <li>Tên người dùng, ảnh đại diện kênh và điểm số của bạn có thể <strong>hiển thị công khai</strong> trên bảng xếp hạng và mục "Vừa được duyệt" (tên hiển thị dạng rút gọn).</li>
            <li>Hệ thống chỉ dùng Google để xác minh danh tính, <strong>không đọc email và không đăng bài thay bạn</strong>.</li>
            <li>Link kênh, video và số liệu (lượt xem, thích, bình luận) được lấy từ thông tin công khai của nền tảng để phục vụ việc xét duyệt.</li>
          </ul>
        </Section>

        <Section title="11. Thay đổi thể lệ">
          <p>Ban tổ chức có thể điều chỉnh thể lệ. Nội dung mới được đăng trên website và có hiệu lực từ thời điểm đăng.</p>
        </Section>

      </Card>
    </div>
  );
}
