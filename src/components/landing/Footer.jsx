import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./theme.jsx";
import { MAIN_SITE } from "../../lib/supabaseClient.js";

const COLS = [
  ["Chương trình", [["Cách làm", "#cach-lam"], ["Quyền lợi", "#quyen-loi"], ["Xếp hạng", "#ranking"], ["Hỏi đáp", "#hoi-dap"]]],
  ["Tài khoản", [["Đăng nhập", "/login"], ["Tham gia", "/login"]]],
  ["Nxx315 Studio", [["Trang chính", MAIN_SITE]]],
];

/* Kết thúc bằng khối charcoal: một lời mời, cột liên kết kẻ mảnh, chữ ký chìm */
export default function Footer() {
  return (
    <footer className="bg-night text-[#f0f0ee]">
      <div className="frame pb-8 pt-[72px] md:pt-[115px]">
        <Link to="/login" className="inline-block text-[28px] leading-[1.15] tracking-head hover:opacity-80 md:text-[32px]">
          Tham gia ngay →
        </Link>

        <div className="mt-[72px] grid grid-cols-2 border-r border-nightrule md:mt-[115px] md:grid-cols-6">
          {COLS.map(([title, links]) => (
            <div key={title} className="border-l border-nightrule px-[10px] pb-10">
              <p className="t-cap text-[#656565]">{title}</p>
              <ul className="mt-3 space-y-1">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith("/") ? (
                      <Link to={href} className="block py-1 text-[14px] hover:opacity-70">{label}</Link>
                    ) : (
                      <a href={href} className="block py-1 text-[14px] hover:opacity-70">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="hidden border-l border-nightrule md:col-span-3 md:block" />
        </div>

        <p
          aria-hidden="true"
          className="mt-[48px] select-none overflow-hidden whitespace-nowrap text-center leading-[0.9] text-[#242424]"
          style={{ fontSize: "clamp(72px, 19vw, 236px)", letterSpacing: "-0.05em" }}
        >
          nxx315
        </p>

        <div className="mt-[40px] flex flex-col gap-3 md:mt-[66px] md:flex-row md:items-center md:justify-between">
          <Logo dark />
          <p className="t-cap text-[#656565]">
            © {new Date().getFullYear()} Nxx315 Creator. Một phần của hệ sinh thái Nxx315 Studio.
          </p>
        </div>
      </div>
    </footer>
  );
}
