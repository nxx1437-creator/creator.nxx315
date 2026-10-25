import React, { useEffect, useRef } from "react";
import { Bell, X, ArrowRight } from "lucide-react";

export default function NotificationDropdown({ onClose }) {
  const ref = useRef(null);

  // Tự động đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    // Dùng fixed, top-16 (cách header) và right-4 (cách lề phải 16px) để không bao giờ bị tràn
    <div 
      ref={ref}
      className="fixed top-[64px] right-4 z-[100] w-[calc(100vw-32px)] max-w-[320px] rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl animate-in fade-in slide-in-from-top-2"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">▸ THÔNG BÁO</span>
        <X size={16} className="text-slate-400 cursor-pointer hover:text-slate-600 transition" onClick={onClose} />
      </div>
      
      <div className="flex flex-col items-center justify-center py-8">
        <Bell size={36} className="mb-3 text-slate-200" />
        <p className="text-sm font-medium text-slate-500">Chưa có thông báo.</p>
      </div>

      <div className="mt-2 border-t border-slate-100 pt-3">
        <button className="w-full flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-cyan-600 transition">
          Xem tất cả
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
