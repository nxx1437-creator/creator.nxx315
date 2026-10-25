import React from "react";
import { Wallet, History, AlertCircle, Plus } from "lucide-react";
import { Card, Eyebrow } from "../../components/creator/creatorUi.jsx";

export default function Payout() {
  return (
    <div className="space-y-6 pb-10">
      {/* HEADER */}
      <div className="px-1 mb-2">
        <Eyebrow className="text-slate-500">▸ PAYOUT</Eyebrow>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Khai báo nhận thưởng</h1>
        <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
          Khi bạn lọt top tháng, phần thưởng tiền mặt sẽ hiện ở đây để khai báo tài khoản.
        </p>
      </div>

      {/* PHẦN THƯỞNG CHỜ NHẬN */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-3">
          ▸ Phần thưởng chờ nhận
        </h2>
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center flex flex-col items-center justify-center">
          <Wallet size={32} className="text-slate-400 mb-3" />
          <h3 className="text-[15px] font-bold text-slate-800">Không có phần thưởng tiền mặt chờ rút</h3>
          <p className="mt-1 text-[13px] text-slate-500 max-w-[250px]">
            Phần thưởng tiền mặt được trao khi tháng kết thúc cho top creators.
          </p>
        </div>
      </div>

      {/* LỊCH SỬ RÚT TIỀN */}
      <div>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-3">
          ▸ Lịch sử rút tiền
        </h2>
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center flex flex-col items-center justify-center">
          <History size={32} className="text-slate-400 mb-3" />
          <h3 className="text-[15px] font-bold text-slate-800">Chưa có yêu cầu rút nào.</h3>
        </div>
      </div>

      {/* HƯỚNG DẪN THÊM */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-[13px] font-bold text-amber-800">Lưu ý quan trọng</h3>
          <p className="text-[12px] text-amber-700 mt-1 leading-relaxed">
            Để nhận thưởng, bạn cần cập nhật chính xác thông tin tài khoản ngân hàng hoặc ví điện tử trong phần Cài đặt tài khoản.
          </p>
        </div>
      </div>
    </div>
  );
}
