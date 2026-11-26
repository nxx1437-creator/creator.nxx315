import React from "react";

/* Token dùng chung cho trang giới thiệu */
export function Logo({ dark = false }) {
  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill={dark ? "#f0f0ee" : "#1a1a1a"} />
        <path d="M6.5 5l6 4-6 4z" fill={dark ? "#1a1a1a" : "#f8f8f7"} />
      </svg>
      <span className={`text-[15px] tracking-head ${dark ? "text-[#f0f0ee]" : "text-ink"}`} style={{ fontWeight: 450 }}>
        nxx315 <span className={dark ? "text-[#7c7c7c]" : "text-mute"}>creator</span>
      </span>
    </span>
  );
}

/* Tiêu đề khu vực: nhỏ, thường, nằm trên một đường kẻ mảnh */
export function SectionHead({ title, sub, children }) {
  return (
    <div className="rule-t pt-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[549px]">
          <h2 className="t-head text-ink">{title}</h2>
          {sub && <p className="mt-3 text-[15px] leading-[1.6] text-mute">{sub}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
