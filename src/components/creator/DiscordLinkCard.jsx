import { useState } from "react";
import { supabase } from "../lib/supabase"; // sửa đường dẫn cho đúng file supabase của bạn

export default function DiscordLinkCard() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleCreate() {
    setLoading(true);
    setErr("");
    setCopied(false);
    const { data, error } = await supabase.rpc("create_discord_link_code");
    setLoading(false);
    if (error) return setErr("Không tạo được mã, thử lại nhé.");
    setCode(data);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (_e) {}
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-base font-semibold text-white">Liên kết Discord</h3>
      <p className="mt-1 text-sm text-white/60">
        Tạo mã, rồi vào server Discord gõ <b>/lienket</b> và dán mã vào ô
        "ma". Mã có hiệu lực 10 phút.
      </p>

      {code ? (
        <div className="mt-4 flex items-center gap-3">
          <div className="rounded-xl bg-black/30 px-4 py-2 font-mono text-xl tracking-widest text-cyan-300">
            {code}
          </div>
          <button
            onClick={handleCopy}
            className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white"
          >
            {copied ? "Đã chép" : "Sao chép"}
          </button>
        </div>
      ) : null}

      {err ? <p className="mt-3 text-sm text-red-400">{err}</p> : null}

      <button
        onClick={handleCreate}
        disabled={loading}
        className="mt-4 w-full rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
      >
        {loading ? "Đang tạo..." : code ? "Tạo mã mới" : "Tạo mã liên kết"}
      </button>
    </div>
  );
            }
