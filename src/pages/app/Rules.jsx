import React from "react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";

export default function Rules() {
  return (
    <div className="space-y-4 pb-10">
      {/* HEADER - CĂN TRÁI SÁT LỀ */}
      <div className="px-1 mb-6 text-left">
        <Eyebrow className="text-slate-500">▸ THỂ LỆ CHƯƠNG TRÌNH</Eyebrow>
        <h1 className="mt-1 text-[26px] font-extrabold text-slate-900 leading-tight">
          NXX315 STUDIO
        </h1>
        <p className="mt-1 text-[14px] font-bold text-cyan-600">
          Sáng tạo nội dung – Nhận xu thưởng – Đua top hàng tháng
        </p>
        <p className="mt-3 text-[13px] text-slate-600 leading-relaxed text-left">
          Chương trình Creator của NXX315 Studio dành cho những người sáng tạo nội dung muốn giới thiệu nền tảng, nhận xu thưởng theo hiệu quả video và cạnh tranh trên bảng xếp hạng hàng tháng.
        </p>
        <p className="mt-1 text-[13px] text-slate-500 italic text-left">
          Khi tham gia chương trình, người tham gia đồng ý tuân thủ các quy định dưới đây.
        </p>
      </div>

      {/* NỘI DUNG CHÍNH */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-6 text-[14px] leading-relaxed text-slate-700">
          
          {/* 1 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">1. ĐIỀU KIỆN THAM GIA</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Có tài khoản Creator trên NXX315 Studio.</li>
              <li>Sở hữu hoặc có quyền quản lý hợp pháp kênh TikTok hoặc YouTube được liên kết.</li>
              <li>Video phải được đăng công khai và đáp ứng đầy đủ điều kiện của chương trình.</li>
              <li>Mỗi người chỉ được sử dụng một tài khoản Creator.</li>
              <li>Tham gia chương trình hoàn toàn miễn phí.</li>
              <li>Người tham gia phải cung cấp thông tin chính xác và chịu trách nhiệm về nội dung mình đăng tải.</li>
            </ul>
            <div className="mt-3 text-[13px] text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              <strong>Lưu ý:</strong> Nghiêm cấm tạo nhiều tài khoản nhằm nhận thưởng nhiều lần hoặc thao túng bảng xếp hạng.
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">2. CÁCH THAM GIA</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Bước 1:</strong> Truy cập website NXX315 Studio tại creator.nxx315.vercel.app và đăng nhập bằng Google.</li>
              <li><strong>Bước 2:</strong> Vào mục Creator → Cài đặt để liên kết kênh TikTok hoặc YouTube của bạn.</li>
              <li><strong>Bước 3:</strong> Tạo video giới thiệu NXX315 Studio, nội dung cần rõ ràng, dễ hiểu và trung thực.</li>
              <li><strong>Bước 4:</strong> Đăng video công khai trên kênh đã liên kết.</li>
              <li><strong>Bước 5:</strong> Gửi đường dẫn video để hệ thống kiểm tra và xét duyệt.</li>
            </ol>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[13px] text-slate-600">
              <li><strong>YouTube:</strong> Hệ thống có thể tự động tìm video trên kênh đã liên kết hoặc cho phép gửi link thủ công.</li>
              <li><strong>TikTok:</strong> Dán đường dẫn video vào mục gửi video trên trang Creator.</li>
            </ul>
            <p className="mt-2 text-[13px] italic text-slate-500">Video chỉ được tính thưởng sau khi đáp ứng các điều kiện và hoàn tất quy trình xét duyệt.</p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">3. ĐIỀU KIỆN VIDEO HỢP LỆ</h2>
            <p className="mb-2">Video phải đáp ứng tất cả điều kiện sau:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Được đăng công khai trên kênh đã liên kết.</li>
              <li>Có nội dung giới thiệu NXX315 Studio.</li>
              <li>Có hashtag <strong className="text-cyan-600">#Nxx315Studio</strong> trong tiêu đề hoặc mô tả.</li>
              <li>Có tiêu đề và mô tả phù hợp với nội dung video.</li>
              <li>Do người tham gia tự sáng tạo hoặc có quyền sử dụng hợp pháp.</li>
              <li>Chưa được gửi nhận thưởng trước đó.</li>
              <li>Tuân thủ quy định của nền tảng đăng tải và pháp luật hiện hành.</li>
            </ol>
            <div className="mt-3">
              <p className="font-semibold text-[13px] mb-1">Video có thể bị từ chối nếu:</p>
              <ul className="list-disc pl-5 space-y-1 text-[13px] text-rose-600">
                <li>Sao chép hoặc đăng lại nội dung không có quyền sử dụng.</li>
                <li>Nội dung không liên quan đến NXX315 Studio.</li>
                <li>Có thông tin sai sự thật hoặc gây hiểu lầm.</li>
                <li>Có dấu hiệu spam, gian lận hoặc cố tình trục lợi.</li>
                <li>Không đáp ứng các điều kiện bắt buộc của chương trình.</li>
              </ul>
            </div>
            <p className="mt-2 text-[13px] italic text-slate-500">Việc vượt qua kiểm tra tự động không đồng nghĩa video chắc chắn được duyệt.</p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">4. GIỚI HẠN GỬI VIDEO</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tối đa 3 video trong mỗi 24 giờ.</li>
              <li>Tối đa 5 video đang chờ duyệt cùng lúc.</li>
              <li>Chỉ gửi video được đăng trên kênh đã liên kết.</li>
              <li>Mỗi video chỉ được xét thưởng một lần.</li>
            </ul>
            <div className="mt-2 text-[13px] text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              Nghiêm cấm tạo nhiều tài khoản hoặc lợi dụng lỗi hệ thống để vượt qua giới hạn.
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">5. QUY TRÌNH XÉT DUYỆT</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Hệ thống kiểm tra đường dẫn, kênh đăng tải và hashtag.</li>
              <li>Video không đạt điều kiện sẽ bị từ chối.</li>
              <li>Video vượt qua kiểm tra tự động sẽ chuyển sang trạng thái chờ xét duyệt.</li>
              <li>Admin kiểm tra nội dung, tính hợp lệ và dấu hiệu gian lận.</li>
              <li>Video chỉ được công nhận sau khi có kết quả duyệt chính thức.</li>
            </ol>
            <p className="mt-2 font-semibold text-[13px]">Thời gian duyệt dự kiến: 1–3 ngày làm việc.</p>
            <p className="mt-1 text-[13px] text-slate-500">Ban tổ chức có thể kiểm tra lại video sau khi duyệt nếu phát hiện dấu hiệu gian lận hoặc sai sót.</p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">6. THỜI ĐIỂM CHỐT SỐ LIỆU</h2>
            <p className="mb-2">Số liệu lượt xem và lượt thích/tim được chốt sau <strong>7 ngày</strong> kể từ khi video được đăng công khai.</p>
            <p className="text-[13px] text-slate-500 italic mb-2">Ví dụ: Video đăng công khai lúc 10:00 ngày 1/11 sẽ được chốt số liệu vào khoảng 10:00 ngày 8/11.</p>
            <p className="font-semibold text-[13px] mb-1">Quy định:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sử dụng số liệu tại thời điểm chốt để xác định mức thưởng.</li>
              <li>Video phải đáp ứng đồng thời điều kiện lượt xem và lượt thích/tim của mốc thưởng tương ứng.</li>
              <li>Lượt xem và lượt thích/tim tăng sau thời điểm chốt không làm thay đổi mức thưởng đã xác định.</li>
              <li>Video phải được duyệt và xác minh hợp lệ trước khi nhận thưởng.</li>
              <li>Nếu số liệu không thể xác minh, ban tổ chức có thể yêu cầu bổ sung thông tin hoặc tạm hoãn xét thưởng.</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-500">Thời gian 7 ngày được tính từ lúc video đăng công khai, không phải từ lúc gửi xét duyệt.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">7. BẢNG THƯỞNG VIDEO</h2>
            <p className="mb-3">Mức thưởng phụ thuộc vào nền tảng, lượt xem và lượt thích/tim hợp lệ.</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">7.1. Thưởng video dưới 1.000 lượt xem</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr><th className="px-3 py-2 font-semibold text-slate-700">Lượt xem sau 7 ngày</th><th className="px-3 py-2 font-semibold text-slate-700 text-right">Phần thưởng</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="px-3 py-2">Dưới 200 lượt xem</td><td className="px-3 py-2 text-right font-bold text-cyan-600">50 xu</td></tr>
                      <tr><td className="px-3 py-2">Từ 200 đến 499 lượt xem</td><td className="px-3 py-2 text-right font-bold text-cyan-600">100 xu</td></tr>
                      <tr><td className="px-3 py-2">Từ 500 đến 999 lượt xem</td><td className="px-3 py-2 text-right font-bold text-cyan-600">500 xu</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">7.2. Bảng thưởng YouTube</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr><th className="px-3 py-2 font-semibold text-slate-700">Thành tích sau 7 ngày</th><th className="px-3 py-2 font-semibold text-slate-700 text-right">Phần thưởng</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="px-3 py-2">1.000 lượt xem + 50 lượt thích</td><td className="px-3 py-2 text-right font-bold text-cyan-600">2.500 xu</td></tr>
                      <tr><td className="px-3 py-2">5.000 lượt xem + 150 lượt thích</td><td className="px-3 py-2 text-right font-bold text-cyan-600">7.500 xu</td></tr>
                      <tr><td className="px-3 py-2">10.000 lượt xem + 300 lượt thích</td><td className="px-3 py-2 text-right font-bold text-cyan-600">15.000 xu</td></tr>
                      <tr><td className="px-3 py-2">25.000 lượt xem + 600 lượt thích</td><td className="px-3 py-2 text-right font-bold text-cyan-600">30.000 xu</td></tr>
                      <tr><td className="px-3 py-2">50.000 lượt xem + 1.000 lượt thích</td><td className="px-3 py-2 text-right font-bold text-cyan-600">50.000 xu</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">7.3. Bảng thưởng TikTok</h3>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr><th className="px-3 py-2 font-semibold text-slate-700">Thành tích sau 7 ngày</th><th className="px-3 py-2 font-semibold text-slate-700 text-right">Phần thưởng</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="px-3 py-2">1.000 lượt xem + 50 lượt tim</td><td className="px-3 py-2 text-right font-bold text-cyan-600">1.500 xu</td></tr>
                      <tr><td className="px-3 py-2">5.000 lượt xem + 200 lượt tim</td><td className="px-3 py-2 text-right font-bold text-cyan-600">5.000 xu</td></tr>
                      <tr><td className="px-3 py-2">10.000 lượt xem + 400 lượt tim</td><td className="px-3 py-2 text-right font-bold text-cyan-600">10.000 xu</td></tr>
                      <tr><td className="px-3 py-2">25.000 lượt xem + 800 lượt tim</td><td className="px-3 py-2 text-right font-bold text-cyan-600">25.000 xu</td></tr>
                      <tr><td className="px-3 py-2">50.000 lượt xem + 1.500 lượt tim</td><td className="px-3 py-2 text-right font-bold text-cyan-600">50.000 xu</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">7.4. Nguyên tắc tính thưởng</h3>
                <ul className="list-disc pl-5 space-y-1 text-[13px]">
                  <li>Video phải đạt đồng thời số lượt xem và lượt thích/tim của mốc tương ứng.</li>
                  <li>Mỗi video nhận mức thưởng cao nhất mà video đáp ứng đầy đủ điều kiện.</li>
                  <li>Các mốc thưởng không cộng dồn.</li>
                  <li>Video chỉ được nhận thưởng một lần.</li>
                  <li>Mức thưởng tối đa là 50.000 xu/video.</li>
                  <li>Video chưa đạt mốc đầu tiên được áp dụng bảng thưởng dưới 1.000 lượt xem.</li>
                  <li>Nếu video đạt nhiều mốc, chỉ áp dụng một mốc cao nhất hợp lệ.</li>
                </ul>
                <p className="mt-2 text-[13px] italic text-slate-500">Ví dụ: Video YouTube đạt 12.000 lượt xem và 350 lượt thích sau 7 ngày sẽ nhận 15.000 xu.</p>
              </div>
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">8. GIFT CODE VÀ CÁCH NHẬN XU</h2>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Gift Code được cấp sau khi video hoàn tất xét duyệt và xác minh điều kiện thưởng.</li>
              <li>Code hiển thị trong mục Lịch sử video hoặc tab Thưởng.</li>
              <li>Mỗi code chỉ sử dụng được một lần.</li>
              <li>Code chỉ được sử dụng theo điều kiện tài khoản và quy định của NXX315 Studio.</li>
            </ul>
            <p className="font-semibold text-[13px] mb-1">Cách nhập Gift Code:</p>
            <ol className="list-decimal pl-5 space-y-1 mb-2">
              <li>Truy cập NXX315 Studio.</li>
              <li>Mở mục Ví.</li>
              <li>Chọn Nhập Gift Code.</li>
              <li>Nhập code và xác nhận để nhận xu.</li>
            </ol>
            <p className="text-[13px] text-rose-600">Nếu nhập sai code quá 5 lần trong vòng 10 phút, chức năng nhập code sẽ bị khóa tạm thời trong 10 phút. Nghiêm cấm mua bán, trao đổi, sao chép hoặc sử dụng Gift Code trái phép.</p>
          </section>

                    {/* 9 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">9. BẢNG XẾP HẠNG CREATOR HÀNG THÁNG</h2>
             <div className="mb-4">
              <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">9.1. Cách tính điểm</h3>
              <div className="mb-3 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-[13px] font-semibold text-cyan-800">
                Điểm của một video = lượt xem + lượt thích/tim + bình luận.
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Điểm của tháng là tổng điểm của tất cả video được duyệt hợp lệ trong tháng đó.</li>
                <li>Chỉ video đã được duyệt mới có điểm. Video đang chờ duyệt hoặc bị từ chối không được tính.</li>
                <li>Video càng được nhiều lượt xem, lượt thích/tim và bình luận thì điểm càng cao.</li>
                <li>Số liệu video được cập nhật định kỳ nên điểm và thứ hạng có thể thay đổi trong tháng.</li>
                <li>Nếu bằng điểm, người có video được duyệt sớm hơn sẽ được xếp trên.</li>
                <li>Điểm xếp hạng chỉ dùng để xếp top tháng, khác với xu thưởng từng video ở mục 7.</li>
                <li>Điểm của video bị phát hiện gian lận hoặc vi phạm sẽ bị hủy và thứ hạng được tính lại.</li>
                <li>Bảng xếp hạng sử dụng giờ Việt Nam (UTC+7).</li>
                <li>Điểm của tháng mới được tính lại từ 00:00 ngày đầu tiên của tháng.</li>
              </ul>
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-[13px]">
                <p className="mb-1 font-semibold text-slate-800">Ví dụ:</p>
                <ul className="list-disc space-y-1 pl-5 text-slate-600">
                  <li>Video A: 1.200 xem + 80 thích + 10 bình luận = <strong>1.290 điểm</strong>.</li>
                  <li>Video B: 800 xem + 35 thích + 5 bình luận = <strong>840 điểm</strong>.</li>
                  <li>Tổng điểm tháng = 1.290 + 840 = <strong className="text-cyan-600">2.130 điểm</strong>.</li>
                </ul>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">9.2. Cơ cấu giải thưởng</h3>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr><th className="px-3 py-2 font-semibold text-slate-700">Thứ hạng</th><th className="px-3 py-2 font-semibold text-slate-700 text-right">Phần thưởng</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="px-3 py-2">🥇 Top 1</td><td className="px-3 py-2 text-right font-bold text-amber-600">20.000 xu</td></tr>
                    <tr><td className="px-3 py-2">🥈 Top 2</td><td className="px-3 py-2 text-right font-bold text-slate-500">10.000 xu</td></tr>
                    <tr><td className="px-3 py-2">🥉 Top 3</td><td className="px-3 py-2 text-right font-bold text-orange-600">5.000 xu</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[13px] font-semibold text-slate-700">Tổng ngân sách tối đa: 35.000 xu/tháng.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[14px] text-slate-800 mb-1.5">9.3. Điều kiện nhận giải</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Có ít nhất 3 video được duyệt trong tháng.</li>
                <li>Không gian lận hoặc vi phạm thể lệ.</li>
                <li>Thành tích phải được xác minh hợp lệ.</li>
                <li>Mỗi người chỉ nhận một giải thưởng top tháng.</li>
                <li>Giải thưởng dự kiến được trao trong vòng 7 ngày làm việc sau khi kết thúc tháng.</li>
              </ul>
              <p className="mt-2 text-[13px] italic text-slate-500">Nếu chỉ có một hoặc hai người đủ điều kiện, chỉ trao giải tương ứng cho những người đó. Nếu không có người đủ điều kiện, tháng đó không trao giải. Ban tổ chức có quyền kiểm tra lại thành tích và điều chỉnh thứ hạng nếu phát hiện gian lận.</p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">10. CÁC HÀNH VI BỊ NGHIÊM CẤM</h2>
            <p className="mb-2">Người tham gia không được:</p>
            <ul className="list-disc pl-5 space-y-1 text-rose-700">
              <li>Mua lượt xem, lượt thích, lượt tim hoặc bình luận để tăng thưởng.</li>
              <li>Sử dụng bot hoặc dịch vụ tạo tương tác giả.</li>
              <li>Sao chép video hoặc sử dụng nội dung trái phép.</li>
              <li>Tạo nhiều tài khoản Creator để nhận thưởng nhiều lần.</li>
              <li>Gửi video trùng lặp nhằm trục lợi.</li>
              <li>Giả mạo thông tin hoặc sử dụng kênh không thuộc quyền quản lý hợp pháp.</li>
              <li>Lợi dụng lỗi hệ thống để nhận thêm xu hoặc Gift Code.</li>
              <li>Cố tình cung cấp thông tin sai lệch về NXX315 Studio.</li>
              <li>Đe dọa, xúc phạm hoặc quấy rối admin và người tham gia khác.</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-600">Các hành vi có bản chất tương tự nhằm gian lận hoặc phá hoại chương trình cũng có thể bị xử lý.</p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">11. XỬ LÝ VI PHẠM</h2>
            <p className="mb-2">Tùy theo tính chất và mức độ vi phạm, ban tổ chức có thể áp dụng một hoặc nhiều biện pháp:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cảnh cáo hoặc từ chối video.</li>
              <li>Hủy kết quả duyệt và điểm số không hợp lệ.</li>
              <li>Tạm hoãn phần thưởng trong thời gian xác minh.</li>
              <li>Thu hồi Gift Code hoặc xu được xác định là nhận trái phép.</li>
              <li>Loại khỏi bảng xếp hạng hoặc hủy giải thưởng liên quan.</li>
              <li>Khóa quyền tham gia chương trình trong thời hạn nhất định hoặc vĩnh viễn đối với vi phạm nghiêm trọng.</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-600">Việc xử lý cần dựa trên căn cứ xác minh phù hợp. Người tham gia có quyền khiếu nại nếu cho rằng quyết định xử lý chưa chính xác.</p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">12. KÊNH HỖ TRỢ</h2>
            <p className="mb-2">Nếu gặp vấn đề về tài khoản, video, xét duyệt, Gift Code hoặc giải thưởng, người tham gia có thể liên hệ:</p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
              <li>Zalo: 0865245988</li>
              <li>Email: nxx315hub@gmail.com</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-500">Khi gửi yêu cầu hỗ trợ, vui lòng cung cấp đường dẫn video và thông tin cần thiết để quá trình xác minh được thuận tiện. Không cung cấp mật khẩu Google, mã xác minh hoặc thông tin bảo mật tài khoản cho người khác.</p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">13. QUYỀN RIÊNG TƯ VÀ DỮ LIỆU</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google được sử dụng để xác thực đăng nhập.</li>
              <li>NXX315 Studio không tự động đăng video thay người tham gia.</li>
              <li>Tên người dùng, ảnh đại diện kênh và điểm số có thể được hiển thị trên bảng xếp hạng hoặc mục Vừa được duyệt.</li>
              <li>Đường dẫn video và số liệu công khai có thể được sử dụng để kiểm tra điều kiện và xác minh phần thưởng.</li>
              <li>Dữ liệu cá nhân được xử lý theo chính sách quyền riêng tư và quy định pháp luật hiện hành.</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-600">Người tham gia không được sử dụng dữ liệu thu thập được để giả mạo, quấy rối hoặc xâm phạm quyền lợi của người khác.</p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">14. THAY ĐỔI VÀ TẠM DỪNG CHƯƠNG TRÌNH</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ban tổ chức có quyền cập nhật thể lệ để phù hợp với tình hình vận hành.</li>
              <li>Các thay đổi sẽ được thông báo trên website NXX315 Studio.</li>
              <li>Những thay đổi ảnh hưởng đáng kể đến quyền lợi người tham gia cần được thông báo rõ ràng.</li>
              <li>Ban tổ chức có thể tạm dừng hoặc kết thúc chương trình khi cần thiết và sẽ thông báo trước trong phạm vi có thể thực hiện.</li>
            </ul>
            <p className="mt-2 text-[13px] text-slate-600">Các thay đổi phải tuân thủ quy định pháp luật và không được tùy tiện tước bỏ phần thưởng đã được xác nhận hợp lệ.</p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="font-bold text-slate-900 mb-2 text-[15px]">15. CAM KẾT THAM GIA</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bằng việc tham gia chương trình Creator, người tham gia xác nhận đã đọc, hiểu và đồng ý tuân thủ thể lệ.</li>
              <li>Người tham gia có trách nhiệm đảm bảo tính hợp lệ của nội dung, số liệu và thông tin cung cấp; đồng thời không thực hiện hành vi gian lận hoặc trục lợi.</li>
              <li>NXX315 Studio có quyền từ chối trao thưởng đối với video không hợp lệ và xử lý hành vi vi phạm theo thể lệ đã công bố.</li>
            </ul>
          </section>
        </div>

        {/* FOOTER CAM KẾT */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="font-bold text-slate-800 text-sm">NXX315 STUDIO – CREATOR PROGRAM</p>
          <p className="text-[13px] text-slate-500 mt-1">Minh bạch trong xét duyệt – Công bằng trong xếp hạng – Nghiêm túc với mọi hành vi gian lận.</p>
        </div>
      </div>
    </div>
  );
}
          
