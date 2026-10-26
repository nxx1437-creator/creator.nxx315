import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Calendar, Film, Eye, Heart, Gift, MessageCircle, ExternalLink, Flame, Trophy,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Avatar, PLATFORMS, fmt } from "../../components/creator/creatorUi.jsx";

const nf = new Intl.NumberFormat("vi-VN");
const PAGE = 10;

const HONOR_STYLE = {
  1: "border-amber-300 bg-amber-50 text-amber-600",
  2: "border-slate-300 bg-slate-50 text-slate-500",
  3: "border-orange-300 bg-orange-50 text-orange-600",
};

const monthText = (mmyyyy) => {
  const [m, y] = mmyyyy.split("/");
  return `Tháng ${Number(m)} ${y}`;
};

const StatBox = memo(function StatBox({ label, value, Icon }) {
  return (
    <Card className="!p-4">
      <div className="mb-2 flex items-center justify-between text-slate-400">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{label}</span>
        <Icon size={16} />
      </div>
      <p className="truncate text-3xl font-black text-cyan-600">{value}</p>
    </Card>
  );
});

const VideoRow = memo(function VideoRow({ v, hot }) {
  return (
    <a
      href={v.url}
      target="_blank"
      rel="noreferrer"
      className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
    >
      {v.thumbnail_url ? (
        <img
          src={v.thumbnail_url}
          alt=""
          width={56}
          height={80}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-20 w-14 shrink-0 rounded-xl border border-slate-200 object-cover"
        />
      ) : (
        <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-300">
          <Film size={20} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className={`h-2 w-2 rounded-full ${PLATFORMS[v.platform]?.dot}`} />
          {PLATFORMS[v.platform]?.name}
          {hot && <Flame size={13} className="text-orange-500" />}
        </div>
        {v.title && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{v.title}</p>}
        <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1"><Eye size={12} className="text-cyan-500" /> {fmt(v.views)}</span>
          <span className="flex items-center gap-1"><Heart size={12} className="text-cyan-500" /> {fmt(v.likes)}</span>
          <span className="flex items-center gap-1"><MessageCircle size={12} className="text-cyan-500" /> {fmt(v.comments)}</span>
        </div>
      </div>
      <ExternalLink size={14} className="mt-1 shrink-0 text-slate-300" />
    </a>
  );
});

const SectionTitle = ({ icon: Icon, children, color = "text-amber-600" }) => (
  <p className={`mb-2 mt-2 flex items-center gap-2 px-1 font-mono text-[11px] font-bold uppercase tracking-widest ${color}`}>
    <Icon size={14} /> {children}
  </p>
);

export default function CreatorProfile() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [state, setState] = useState("loading");
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    let off = false;
    setState("loading");
    supabase.rpc("get_creator_profile", { p_uid: uid }).then(({ data }) => {
      if (off) return;
      if (data?.ok) {
        setP(data);
        setState("ok");
      } else {
        setState("missing");
      }
    });
    return () => {
      off = true;
    };
  }, [uid]);

  const back = (
    <button
      onClick={() => navigate(-1)}
      className="mb-2 flex items-center gap-2 px-1 font-mono text-xs font-bold uppercase tracking-widest text-slate-500"
    >
      <ArrowLeft size={16} /> Quay lại
    </button>
  );

  if (state === "loading") return <div className="h-screen" />;
  if (state === "missing") {
    return (
      <div>
        {back}
        <p className="mt-10 text-center text-slate-500">Không tìm thấy creator này.</p>
      </div>
    );
  }

  const joined = new Date(p.joined);
  const vn = new Date(Date.now() + 7 * 3600e3);
  const curMonth = `Tháng ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;
  const s = p.stats || {};

  return (
    <div className="space-y-4 pb-10">
      {back}

      <Card>
        <Avatar src={p.avatar} name={p.name} size={80} />
        <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400">
          HỒ SƠ CREATOR · VN
        </p>
        <h1 className="mt-1 break-words text-3xl font-black uppercase text-slate-900">{p.name}</h1>
        <p className="mt-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-500">
          <Calendar size={14} /> THAM GIA THÁNG {joined.getMonth() + 1} NĂM {joined.getFullYear()}
        </p>

        {p.rank ? (
          <>
            <span className="mt-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              HẠNG {p.rank} · {curMonth}
            </span>
            <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-3xl font-black text-white shadow-lg shadow-emerald-500/30">
              {String(p.rank).padStart(2, "0")}
            </div>
          </>
        ) : (
          <p className="mt-3 text-xs text-slate-400">Chưa có hạng trong tháng này.</p>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatBox label="VIDEO" value={nf.format(s.videos || 0)} Icon={Film} />
        <StatBox label="LƯỢT XEM" value={fmt(s.views || 0)} Icon={Eye} />
        <StatBox label="LƯỢT THÍCH" value={fmt(s.likes || 0)} Icon={Heart} />
        <StatBox label="XU THƯỞNG" value={`+${nf.format(s.coins || 0)}`} Icon={Gift} />
      </div>

      {p.honors?.length > 0 && (
        <div>
          <SectionTitle icon={Trophy}>VINH DANH</SectionTitle>
          <div className="space-y-2.5">
            {p.honors.map((h) => (
              <div
                key={h.month}
                className={`rounded-2xl border px-4 py-3 ${HONOR_STYLE[h.rank]}`}
              >
                <p className="text-xl font-black">Top {h.rank}</p>
                <p className="font-mono text-[11px] font-semibold opacity-80">
                  {monthText(h.month)} · {nf.format(h.points)} điểm
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.trending?.length > 0 && (
        <div>
          <SectionTitle icon={Flame} color="text-orange-600">VIDEO XU HƯỚNG</SectionTitle>
          <div className="space-y-2.5">
            {p.trending.map((v) => (
              <VideoRow key={v.id} v={v} hot />
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionTitle icon={Film} color="text-slate-600">VIDEO ĐÃ DUYỆT</SectionTitle>
        {p.videos?.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">Chưa có video nào được duyệt.</p>
        ) : (
          <div className="space-y-2.5">
            {p.videos.slice(0, limit).map((v) => (
              <VideoRow key={v.id} v={v} />
            ))}
            {p.videos.length > limit && (
              <button
                onClick={() => setLimit((n) => n + PAGE)}
                className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 shadow-sm"
              >
                Xem thêm ({p.videos.length - limit})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
