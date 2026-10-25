import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LayoutDashboard, Trophy, Film, Gift, Bell, BookOpen, HelpCircle, Settings, Coins, ArrowUpDown } from "lucide-react";

const SEARCH_MENU = [
  { label: "Tổng quan", path: "/app", icon: LayoutDashboard, sub: "/DASHBOARD" },
  { label: "Xếp hạng", path: "/app/ranking", icon: Trophy, sub: "/RANKING" },
  { label: "Video", path: "/app/videos", icon: Film, sub: "/VIDEOS" },
  { label: "Phần thưởng", path: "/app/rewards", icon: Gift, sub: "/REWARDS" },
  { label: "Nhận tiền", path: "/app/payout", icon: Coins, sub: "/PAYOUT" },
  { label: "Thông báo", path: "/app/notifications", icon: Bell, sub: "/NOTIFICATIONS" },
  { label: "Thể lệ", path: "/app/rules", icon: BookOpen, sub: "/RULES" },
  { label: "Trợ giúp", path: "/app/help", icon: HelpCircle, sub: "/HELP" },
  { label: "Cài đặt", path: "/app/settings", icon: Settings, sub: "/SETTINGS" },
];

export default function SearchModal({ onClose }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = SEARCH_MENU.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex justify-center bg-slate-900/40 backdrop-blur-sm px-4 pt-16 sm:pt-24 animate-in fade-in" onClick={onClose}>
      {/* Thêm stopPropagation để khi bấm vào trong khung không bị tắt modal */}
      <div 
        className="w-full max-w-lg flex flex-col rounded-2xl bg-[#e6f2f0] shadow-2xl border border-white/50 overflow-hidden" 
        style={{ maxHeight: 'calc(100vh - 120px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thanh nhập liệu */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-300/50 shrink-0">
          <Search size={22} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Đi tới... (thử: payout, ranking)"
            className="flex-1 bg-transparent text-slate-800 text-[16px] outline-none placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-200">
            ESC
          </button>
        </div>
        
        {/* Danh sách menu - Thêm flex-1 để nó tự lấp đầy khoảng trống */}
        <div className="overflow-y-auto py-2 flex-1">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => { onClose(); navigate(item.path); }}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/60 transition-colors text-slate-700"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className="text-slate-500" />
                  <span className="text-[15px] font-medium">{item.label}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">{item.sub}</span>
              </button>
            ))
          ) : (
            <div className="py-10 text-center text-slate-500 text-sm">
              Không tìm thấy kết quả cho "{searchQuery}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-200/60 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-t border-slate-300/50 shrink-0">
          <span className="flex items-center gap-1"><ArrowUpDown size={12}/> DI CHUYỂN</span>
          <span className="flex items-center gap-1">↵ MỞ</span>
          <span className="flex items-center gap-1">⌘K BẬT/TẮT</span>
        </div>
      </div>
    </div>
  );
}
