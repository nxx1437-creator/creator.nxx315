import React, { useCallback, useEffect, useState } from "react";
import { Wallet, History, AlertCircle, Trophy, Loader2 } from "lucide-react";
import { Eyebrow } from "../../components/creator/creatorUi.jsx";
import PayoutSheet from "../../components/creator/PayoutSheet.jsx";
import { supabase } from "../../lib/supabaseClient.js";

const METHOD_LABEL = { bank: "Ngân hàng", momo: "MoMo", zalopay: "ZaloPay" };

const STATUS = {
  awaiting_info: { text: "Chờ khai báo", cls: "bg-amber-100 text-amber-700" },
  submitted: { text: "Đang xử lý", cls: "bg-sky-100 text-sky-700" },
  rejected: { text: "Cần sửa thông tin", cls: "bg-red-100 text-red-600" },
  paid: { text: "Đã thanh toán", cls: "bg-emerald-100 text-emerald-700" },
};

const money = (n) => `${Number(n).toLocaleString("vi-VN")}đ`;

const monthLabel = (d) => {
  const [y, m] = String(d).split("-");
  return `Tháng ${Number(m)}/${y}`;
};

const mask = (s) =>
  s && s.length > 4 ? `••••${s.slice(-4)}` : s || "";

function Empty({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
      <Icon size={32} className="mb-3 text-slate-400" />
      <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
      {desc && (
        <p className="mt-1 max-w-[250px] text-[13px] text-slate-500">{desc}</p>
      )}
    </div>
  );
}

function Badge({ status }) {
  const s = STATUS[status] || STATUS.awaiting_info;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
      {s.text}
    </span>
  );
}

function PendingCard({ item, onOpen }) {
  const canFill = item.status === "awaiting_info" || item.status === "rejected";
  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Trophy size={18} />
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800">
              {monthLabel(item.period)}
            </p>
            {item.rank && (
              <p className="text-[12px] text-slate-500">Hạng #{item.rank}</p>
            )}
          </div>
        </div>
        <Badge status={item.status} />
      </div>

      <p className="mt-3 text-3xl font-extrabold text-emerald-700">
        {money(item.amount)}
      </p>

      {item.status === "rejected" && item.admin_note && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[12px] text-red-600">
          {item.admin_note}
        </p>
      )}

      {item.status === "submitted" && (
        <p className="mt-2 text-[12px] text-slate-500">
          {METHOD_LABEL[item.method]}
          {item.bank_name ? ` · ${item.bank_name}` : ""} ·{" "}
          {mask(item.account_number)} · {item.account_name}
        </p>
      )}

      <button
        onClick={() => onOpen(item)}
        className={`mt-4 w-full rounded-xl py-3 text-[14px] font-bold active:scale-[0.99] ${
          canFill
            ? "bg-emerald-600 text-white"
            : "border border-slate-200 bg-white text-slate-700"
        }`}
      >
        {canFill ? "Điền thông tin nhận thưởng" : "Sửa thông tin"}
      </button>
    </div>
  );
}

function HistoryRow({ item }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-[14px] font-bold text-slate-800">
          {monthLabel(item.period)}
        </p>
        <p className="mt-0.5 text-[12px] text-slate-500">
          {METHOD_LABEL[item.method]}
          {item.bank_name ? ` · ${item.bank_name}` : ""} ·{" "}
          {mask(item.account_number)}
        </p>
        {item.paid_at && (
          <p className="mt-0.5 text-[11px] text-slate-400">
            {new Date(item.paid_at).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>
      <div className="text-right">
        <p className="text-[15px] font-extrabold text-emerald-700">
          {money(item.amount)}
        </p>
        <Badge status="paid" />
      </div>
    </div>
  );
}

export default function Payout() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("creator_payouts")
      .select("*")
      .order("period", { ascending: false });
    setRows(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const pending = rows.filter((r) => r.status !== "paid");
  const history = rows.filter((r) => r.status === "paid");

  return (
    <div className="space-y-6 pb-10">
      <div className="mb-2 px-1">
        <Eyebrow className="text-slate-500">▸ PAYOUT</Eyebrow>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
          Khai báo nhận thưởng
        </h1>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
          Khi bạn lọt top tháng, phần thưởng tiền mặt sẽ hiện ở đây để khai báo tài khoản.
        </p>
      </div>

      <div>
        <h2 className="mb-3 px-1 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400">
          ▸ Phần thưởng chờ nhận
        </h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-slate-400" />
          </div>
        ) : pending.length === 0 ? (
          <Empty
            icon={Wallet}
            title="Không có phần thưởng tiền mặt chờ rút"
            desc="Phần thưởng tiền mặt được trao khi tháng kết thúc cho top creators."
          />
        ) : (
          <div className="space-y-3">
            {pending.map((p) => (
              <PendingCard key={p.id} item={p} onOpen={setEditing} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 px-1 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400">
          ▸ Lịch sử rút tiền
        </h2>
        {!loading && history.length === 0 ? (
          <Empty icon={History} title="Chưa có yêu cầu rút nào." />
        ) : (
          <div className="space-y-3">
            {history.map((h) => (
              <HistoryRow key={h.id} item={h} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-500" />
        <div>
          <h3 className="text-[13px] font-bold text-amber-800">Lưu ý quan trọng</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-amber-700">
            Nhập chính xác thông tin ngân hàng hoặc ví điện tử. Sau khi xác nhận, bên mình sẽ chuyển khoản và cập nhật trạng thái tại đây.
          </p>
        </div>
      </div>

      {editing && (
        <PayoutSheet
          item={editing}
          onClose={() => setEditing(null)}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
          }
