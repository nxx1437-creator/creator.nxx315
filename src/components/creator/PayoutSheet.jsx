import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";

const METHODS = [
  { id: "bank", label: "Ngân hàng" },
  { id: "momo", label: "MoMo" },
  { id: "zalopay", label: "ZaloPay" },
];

const BANKS = [
  "Vietcombank", "VietinBank", "BIDV", "Agribank", "Techcombank",
  "MB Bank", "ACB", "VPBank", "TPBank", "Sacombank", "HDBank",
  "VIB", "SHB", "OCB", "MSB", "SeABank", "Eximbank", "LPBank",
  "Nam A Bank", "Cake", "Timo", "Ngân hàng khác",
];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-[14px] text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

export default function PayoutSheet({ item, onClose, onDone }) {
  const [method, setMethod] = useState(item.method || "bank");
  const [bank, setBank] = useState(item.bank_name || "");
  const [number, setNumber] = useState(item.account_number || "");
  const [name, setName] = useState(item.account_name || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const isBank = method === "bank";

  async function submit() {
    setErr("");
    setBusy(true);
    const { data, error } = await supabase.rpc("submit_payout_info", {
      p_id: item.id,
      p_method: method,
      p_bank_name: isBank ? bank : null,
      p_account_number: number,
      p_account_name: name,
    });
    setBusy(false);
    if (error) return setErr("Có lỗi xảy ra, thử lại nhé.");
    if (!data?.ok) return setErr(data?.error || "Không lưu được thông tin.");
    onDone();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Thông tin nhận thưởng
            </h3>
            <p className="mt-0.5 text-[13px] text-slate-500">
              Khoản thưởng:{" "}
              <b className="text-emerald-700">
                {Number(item.amount).toLocaleString("vi-VN")}đ
              </b>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`rounded-xl border px-2 py-2.5 text-[13px] font-bold transition ${
                method === m.id
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {isBank && (
            <div>
              <label className="mb-1 block text-[12px] font-bold text-slate-600">
                Ngân hàng
              </label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className={inputCls}
              >
                <option value="">Chọn ngân hàng</option>
                {BANKS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1 block text-[12px] font-bold text-slate-600">
              {isBank ? "Số tài khoản" : "Số điện thoại ví"}
            </label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/[^\d\s]/g, ""))}
              inputMode="numeric"
              placeholder={isBank ? "VD: 0123456789" : "VD: 0901234567"}
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-bold text-slate-600">
              Tên chủ tài khoản
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="NGUYEN VAN A"
              className={`${inputCls} uppercase`}
            />
          </div>
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-amber-700">
          Kiểm tra kỹ thông tin. Nhập sai có thể khiến khoản thưởng bị chuyển nhầm hoặc chậm trễ.
        </p>

        {err && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {err}
          </p>
        )}

        <button
          onClick={submit}
          disabled={busy}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-[15px] font-bold text-white active:scale-[0.99] disabled:opacity-60"
        >
          {busy && <Loader2 size={18} className="animate-spin" />}
          Xác nhận thông tin
        </button>
      </div>
    </div>
  );
}
