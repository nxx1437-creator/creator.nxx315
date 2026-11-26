import React, { useState } from "react";
import { SectionHead } from "./theme.jsx";
import { fmtNum, timeAgo } from "./ui.jsx";
import { useMonthEnd } from "./Scenes.jsx";

function Avatar({ src, name }) {
  const [bad, setBad] = useState(false);
  return src && !bad ? (
    <img
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setBad(true)}
      className="h-9 w-9 shrink-0 rounded-full border border-rule object-cover"
    />
  ) : (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone text-[13px] text-ink">
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

function Fact({ label, children }) {
  return (
    <div className="rule-l px-[10px] py-3">
      <p className="t-cap text-mute">{label}</p>
      <p className="mt-2 text-[20px] leading-[1.25] tracking-head">{children}</p>
    </div>
  );
}

export default function Ranking({ stats }) {
  const left = useMonthEnd();
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthNum = vn.getUTCMonth() + 1;
  const prize = stats?.settings?.event_prize_text || "50,000 VNĐ + 20K xu";
  const top = stats?.top || [];
  const recent = stats?.recent || [];

  return (
    <section id="ranking" className="frame scroll-mt-20 pb-[72px] md:pb-[115px]">
      <SectionHead title={`Bảng xếp hạng tháng ${monthNum}`} sub="Cập nhật hằng ngày lúc 00:00 giờ Việt Nam." />

      <div className="mt-8 grid grid-cols-1 border-r border-rule sm:grid-cols-3">
        <Fact label="Chiến dịch">{stats?.settings?.event_title || `Tháng ${monthNum}, bứt phá giới hạn`}</Fact>
        <Fact label="Kết thúc sau">
          <span className="tabular-nums">{left ? `${left.d} ngày ${left.h} giờ` : "—"}</span>
        </Fact>
        <Fact label="Giải nhất">{prize}</Fact>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="rule-b pb-2 text-[14px]" style={{ fontWeight: 450 }}>Top creator</p>
          {top.length === 0 ? (
            <p className="py-10 text-[14px] text-mute">Bảng xếp hạng đang trống. Hãy là người đầu tiên.</p>
          ) : (
            <ol>
              {top.map((it) => (
                <li key={it.rank} className="rule-b flex items-center gap-3 py-3">
                  <span className="t-idx w-6 shrink-0 text-mute">{String(it.rank).padStart(2, "0")}</span>
                  <Avatar src={it.avatar} name={it.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px]" style={{ fontWeight: 450 }}>{it.name}</span>
                    <span className="t-cap text-mute">{it.approved} video được duyệt</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[17px] tracking-head tabular-nums">{fmtNum(it.points)}</span>
                    <span className="t-cap text-mute">điểm</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="lg:col-span-5">
          <p className="rule-b pb-2 text-[14px]" style={{ fontWeight: 450 }}>Vừa nhận thưởng</p>
          {recent.length === 0 ? (
            <p className="py-10 text-[14px] text-mute">Chưa có ai nhận thưởng tháng này.</p>
          ) : (
            <ul>
              {recent.slice(0, 6).map((r, i) => (
                <li key={i} className="rule-b flex items-center gap-3 py-3">
                  <Avatar src={r.avatar} name={r.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px]" style={{ fontWeight: 450 }}>{r.name}</span>
                    <span className="t-cap block truncate text-mute">{r.desc || "Video review Nxx315"}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[15px] tabular-nums">+{fmtNum(r.coins)} xu</span>
                    <span className="t-cap text-mute">{timeAgo(r.at)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
