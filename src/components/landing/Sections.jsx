import React from "react";
import { Link } from "react-router-dom";
import { SectionHead } from "./theme.jsx";
import { fmtNum } from "./ui.jsx";
import { Scene, VideoCard, CodeCard, LinkCard } from "./Scenes.jsx";

/* Câu mở: câu đầu đậm màu, phần còn lại xám, cùng cỡ chữ */
export function Statement() {
  return (
    <section className="frame py-[72px] md:py-[115px]">
      <p className="mx-auto max-w-[549px] text-[17px] leading-[1.55] tracking-[-0.02em] text-mute md:text-[18px]">
        <span className="text-ink">Nxx315 Creator là chương trình dành cho người làm video.</span>{" "}
        Quay review Nxx315 Studio, đăng lên TikTok hoặc YouTube kèm hashtag. Video được duyệt nhận Gift Code VIP,
        người đứng đầu bảng xếp hạng cuối tháng nhận tiền mặt. Không giới hạn số video.
      </p>
    </section>
  );
}

function Metric({ caption, value, note, index }) {
  return (
    <div className="rule-l flex min-h-[200px] flex-col justify-between px-[10px] py-3 md:min-h-[300px]">
      <p className="t-cap text-mute">{caption}</p>
      <div>
        <p className="text-[28px] leading-[1.15] tracking-head tabular-nums md:text-[32px]">{value}</p>
        <p className="t-cap mt-1.5 max-w-[190px] text-mute">{note}</p>
      </div>
      <p className="t-idx text-mute">{index}</p>
    </div>
  );
}

export function Proof({ stats }) {
  const v = (n) => (stats ? fmtNum(n) : "—");
  return (
    <section className="frame">
      <div className="grid grid-cols-2 border-r border-rule md:grid-cols-4">
        <Metric caption="Người tham gia" value={v(stats?.creators)} note="creator đã vào chương trình" index="01" />
        <Metric caption="Video đã duyệt" value={v(stats?.videos)} note="duyệt thủ công bởi admin" index="02" />
        <Metric caption="Xu đã tặng" value={v(stats?.coins)} note="cộng vào ví qua Gift Code" index="03" />
        <Metric caption="Chốt thưởng" value="Hằng tháng" note="top xếp hạng nhận tiền mặt" index="04" />
      </div>
    </section>
  );
}

function StepRow({ index, title, text, items, tone, scene, cta }) {
  return (
    <div className="rule-t grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-14">
      <div className="md:col-span-3">
        <p className="t-idx text-mute">{index}</p>
        <h3 className="mt-3 text-[20px] leading-[1.25] tracking-head">{title}</h3>
        <p className="mt-2 max-w-[300px] text-[14px] leading-[1.6] text-mute">{text}</p>
      </div>
      <div className="md:col-span-6">
        <Scene tone={tone} className="mx-auto aspect-[4/3] w-full max-w-[324px] sm:aspect-[16/10] sm:max-w-[420px] md:aspect-square md:max-w-[324px]">
          {scene}
        </Scene>
      </div>
      <div className="md:col-span-3 md:text-right">
        <ul className="space-y-1 text-[17px] leading-[1.4] tracking-head">
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
        {cta && (
          <Link to="/login" className="mt-4 inline-block text-[14px] text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
            {cta} →
          </Link>
        )}
      </div>
    </div>
  );
}

export function Steps({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean).map((t) => (t.startsWith("#") ? t : `#${t}`));
  return (
    <section id="cach-lam" className="frame scroll-mt-20 py-[72px] md:py-[115px]">
      <SectionHead title="Ba bước để bắt đầu" sub="Quy trình gọn, công khai, không giới hạn số video." />
      <div className="mt-8">
        <StepRow
          index="01"
          title="Liên kết kênh"
          text="Dán link kênh TikTok hoặc YouTube. Hệ thống nhận diện kênh trong khoảng 30 giây, kênh vẫn do bạn quản lý."
          items={["Đăng nhập Google", "Kênh TikTok", "Kênh YouTube"]}
          tone="sky"
          scene={<LinkCard />}
          cta="Đăng nhập để bắt đầu"
        />
        <StepRow
          index="02"
          title="Quay và đăng video"
          text="Quay review trải nghiệm Nxx315 Studio, đăng công khai kèm hashtag bắt buộc để hệ thống theo dõi lượt xem."
          items={["Đăng công khai", ...(tags.length ? tags : ["#Nxx315Studio"]), "Không giới hạn video"]}
          tone="grass"
          scene={<VideoCard />}
        />
        <StepRow
          index="03"
          title="Được duyệt, nhận thưởng"
          text="Admin duyệt thủ công. Video đạt chuẩn được cấp Gift Code trong mục Video. Đua top bảng xếp hạng để nhận tiền mặt mỗi tháng."
          items={["Gift Code VIP", "Tiền mặt qua Bank, Momo", "Xếp hạng công khai"]}
          tone="rose"
          scene={<CodeCard />}
        />
      </div>
    </section>
  );
}

const PERKS = [
  ["Xu và tiền mặt", "Video đạt chuẩn nhận xu dùng trên hệ thống. Top creator nhận tiền mặt chuyển thẳng qua Bank hoặc Momo."],
  ["Duyệt có người thật", "Admin duyệt nội dung thủ công, kết hợp quét AI để chặn spam và giữ chất lượng."],
  ["Chống buff", "Kênh YouTube được quét tự động. Thuật toán lọc view ảo và bot like để sân chơi công bằng."],
  ["Xếp hạng công khai", "Điểm tính từ tương tác thực tế. Bảng xếp hạng làm mới mỗi ngày, ai cũng xem được."],
];

export function Perks() {
  return (
    <section id="quyen-loi" className="frame scroll-mt-20 pb-[72px] md:pb-[115px]">
      <SectionHead title="Vì sao tham gia" sub="Vừa làm điều mình thích, vừa có thu nhập thật." />
      <div className="mt-8 grid grid-cols-1 border-r border-rule sm:grid-cols-2 md:grid-cols-4">
        {PERKS.map(([t, d], i) => (
          <div key={t} className="rule-l flex min-h-[200px] flex-col justify-between px-[10px] py-3 md:min-h-[300px]">
            <h3 className="text-[17px] leading-[1.3] tracking-head">{t}</h3>
            <p className="max-w-[230px] text-[14px] leading-[1.6] text-mute">{d}</p>
            <p className="t-idx text-mute">{String(i + 1).padStart(2, "0")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
