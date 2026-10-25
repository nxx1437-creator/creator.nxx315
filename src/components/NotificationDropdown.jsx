import React from "react";
import { Bell, X, ArrowRight } from "lucide-react";

export default function NotificationDropdown({ onClose }) {
  return (
    <div className="absolute right-[-60px] sm:right-0 mt-3 w-72 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">▸ THÔNG BÁO</span>
        <X size={16} className="text-slate-400 cursor-pointer hover:text-slate-600" onClick={onClose} />
      </div>
      
      <div className="flex flex-col items-center justify-center py-6 text-slate-400">
        <Bell size={32} className="mb-3 opacity-30" />
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
