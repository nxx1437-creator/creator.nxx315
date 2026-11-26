import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import { Logo } from "../components/landing/theme.jsx";
import { Scene, VideoCard, CodeCard, RankCard, LinkCard, CountdownCard, CoinCard } from "../components/landing/Scenes.jsx";
import { Statement, Proof, Steps, Perks } from "../components/landing/Sections.jsx";
import Ranking from "../components/landing/Ranking.jsx";
import Faq from "../components/landing/Faq.jsx";
import Footer from "../components/landing/Footer.jsx";

function usePublicStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let alive = true;
    supabase.rpc("get_creator_public_stats").then(({ data }) => {
      if (alive && data?.ok) setStats(data);
    });
    return () => { alive = false; };
  }, []);
  return stats;
}

const LINKS = [
  ["#cach-lam", "Cách làm"],
  ["#quyen-loi", "Quyền lợi"],
  ["#ranking", "Xếp hạng"],
  ["#hoi-dap", "Hỏi đáp"],
];

/* Thanh điều hướng nhỏ, không viền, nền mờ dần (blur theo lớp) phía sau chữ */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[84px]"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "linear-gradient(#000 45%, transparent)",
          WebkitMaskImage: "linear-gradient(#000 45%, transparent)",
        }}
      />
      <div className="frame relative flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Nxx315 Creator"><Logo /></Link>
          <nav className="hidden items-center gap-6 text-[13px] text-navgray md:flex">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} className="transition-colors hover:text-ink">{label}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn btn-quiet">Đăng nhập</Link>
          <Link to="/login" className="btn btn-primary hidden sm:inline-flex">Tham gia miễn phí</Link>
        </div>
      </div>
    </header>
  );
}

/* Tiêu đề khiêm tốn ở giữa, xung quanh là các mảnh giao diện thật nổi trong "thời tiết" */
function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean).map((t) => (t.startsWith("#") ? t : `#${t}`));
  const S = "absolute hidden xl:block";
  return (
    <section className="relative overflow-hidden">
      <div className="frame relative flex min-h-[100svh] flex-col items-center justify-center pb-10 pt-28 text-center xl:pb-0 xl:pt-0">
        <div className="relative z-10 mx-auto max-w-[620px]">
          <h1 className="t-display">Quay clip. Leo top. Nhận thưởng thật.</h1>
          <p className="t-lead mx-auto mt-5 max-w-[500px] text-mute">
            Review Nxx315 Studio trên TikTok hoặc YouTube. Video được duyệt nhận Gift Code VIP, top cuối tháng nhận tiền mặt.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
            <Link to="/login" className="btn btn-primary">Tham gia miễn phí</Link>
            <a href="#ranking" className="btn btn-quiet">Xem bảng xếp hạng</a>
          </div>
          <p className="t-cap mt-5 text-mute">
            Gắn hashtag {tags.length ? tags.join(" ") : "#Nxx315Studio"} khi đăng video.
          </p>
        </div>

        {/* Màn hình hẹp: ba mảnh xếp dưới tiêu đề */}
        <div className="mt-14 grid w-full max-w-[640px] grid-cols-2 gap-6 sm:grid-cols-3 xl:hidden">
          <Scene tone="grass" className="aspect-[4/5]" delay={150}><VideoCard /></Scene>
          <Scene tone="rose" className="aspect-[4/5]" delay={300}><CodeCard /></Scene>
          <Scene tone="sky" className="col-span-2 aspect-[2/1] sm:col-span-1 sm:aspect-[4/5]" delay={450}><RankCard /></Scene>
        </div>
      </div>

      {/* Màn hình rộng: sáu mảnh bay quanh vùng chữ trống */}
      <Scene tone="grass" className={`${S} left-[5%] top-[14%] h-[210px] w-[270px]`} delay={100}><VideoCard /></Scene>
      <Scene tone="sky" className={`${S} right-[5%] top-[11%] h-[210px] w-[270px]`} delay={220}><RankCard /></Scene>
      <Scene tone="blue" className={`${S} -left-[3%] top-[47%] h-[200px] w-[270px]`} delay={340}><LinkCard /></Scene>
      <Scene tone="rose" className={`${S} -right-[2%] top-[50%] h-[210px] w-[270px]`} delay={460}><CodeCard /></Scene>
      <Scene tone="sand" className={`${S} bottom-[5%] left-[21%] h-[170px] w-[260px]`} delay={580}><CountdownCard /></Scene>
      <Scene tone="grass" className={`${S} bottom-[4%] right-[22%] h-[170px] w-[260px]`} delay={700}><CoinCard /></Scene>
    </section>
  );
}

export default function Landing() {
  const stats = usePublicStats();
  const hashtags = stats?.settings?.hashtags || "#Nxx315Studio";
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Nav />
      <main>
        <Hero hashtags={hashtags} />
        <Statement />
        <Proof stats={stats} />
        <Steps hashtags={hashtags} />
        <Perks />
        <Ranking stats={stats} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
