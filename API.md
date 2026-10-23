# Nxx315 Creator - Tài liệu backend

Web mới dùng chung Supabase với web chính (cùng tài khoản, cùng database).

## 1. Kết nối

- URL: `https://rwglwovohbyqmbbzdvdj.supabase.co`
- Anon key: lấy ở Supabase → Project Settings → API (giống web chính).
- Biến môi trường: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

```js
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
```

## 2. Đăng nhập Google

```js
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: `${window.location.origin}/` },
});
```

Việc phải làm khi có tên miền mới: Supabase → Authentication → URL Configuration → thêm
`https://TEN-MIEN-MOI/**` vào Redirect URLs. Google Cloud không cần đổi.

Lưu ý: hàm backend cần tài khoản đã có dòng trong bảng `profiles`. Người mới đăng nhập Google
trực tiếp ở web mới phải có dòng này (kiểm tra trigger tạo profile của web chính).

Lấy thông tin người dùng:
```js
const { data } = await supabase.from("profiles").select("username, is_admin").eq("id", userId).maybeSingle();
```

## 3. Hàm RPC (gọi bằng `supabase.rpc(tên, tham_số)`)

### get_creator_overview()
Một lần lấy hết dữ liệu trang Tổng quan.
```json
{
  "ok": true,
  "channels": [{ "platform": "youtube|tiktok", "url": "", "handle": "@ten", "name": "", "avatar": "", "followers": 9700 }],
  "total": 0, "pending": 0, "approved": 0, "rejected": 0,
  "month_approved": 0, "points_month": 0, "total_coins": 0, "rank": 1,
  "total_views": 0, "total_likes": 0, "total_comments": 0,
  "recent": [{ "id": "", "url": "", "platform": "", "status": "", "created_at": "", "title": "", "thumbnail_url": "", "views": 0, "likes": 0, "comments": 0 }],
  "settings": { "hashtags": "#Nxx315Studio", "event_prize_text": "", "link_guide_video": "", "scan_grace_hours": "24" }
}
```
- `rank` là `null` nếu tháng này chưa có video được duyệt.
- Điểm = 100 mỗi video được duyệt. Tháng tính theo giờ Việt Nam.
- `settings` là các dòng trong bảng `creator_settings` (sửa trực tiếp trong Supabase).

### get_creator_leaderboard()
```json
{ "ok": true,
  "items": [{ "rank": 1, "name": "username", "approved": 3, "points": 300, "is_me": false }],
  "me": { "rank": 1, "approved": 3, "points": 300 } }
```
`items` tối đa 50 người, `me` là `null` nếu chưa có hạng.

### unlink_creator_channel(p_platform)
`p_platform`: `"youtube"` hoặc `"tiktok"`. Trả `{ ok, message }`.
Không huỷ được nếu còn video đang chờ duyệt của nền tảng đó.

### admin_review_intro_video(p_id, p_approve, p_code, p_coins, p_note)  (chỉ admin)
- Duyệt: `p_approve: true`, `p_code` 6-64 ký tự, `p_coins` > 0. Tự tạo gift code dùng 1 lần, chỉ chủ video nhập được.
- Từ chối: `p_approve: false`, `p_note` là lý do.
- Trả `{ ok: true, status }` hoặc `{ ok: false, error, message }`.

## 4. Edge Function (gọi bằng `supabase.functions.invoke`)

```js
const { data, error } = await supabase.functions.invoke("creator-verify", { body: { action: "..." } });
```

### creator-verify
| action | body thêm | trả về |
|---|---|---|
| `link_channel` | `platform`, `url` (link kênh) | `{ ok, message }` |
| `submit_video` | `url` | `{ ok, status: "pending"\|"rejected", message }` |
| `refresh_stats` | không | `{ ok, updated, youtube_skipped }` |
| `refresh_channels` | không | `{ ok, updated, youtube_skipped }` |

- `link_channel`: kiểm tra kênh có thật, lấy ảnh, tên, số người theo dõi. Một kênh chỉ liên kết với 1 tài khoản.
  - YouTube: `https://youtube.com/@ten` hoặc `/channel/UC...`
  - TikTok: `https://tiktok.com/@ten`
- `submit_video`: cần liên kết kênh nền tảng đó trước. Hệ thống kiểm tra video đúng kênh đã liên kết và có đủ hashtag.
  Sai thì video vẫn được lưu với `status: "rejected"` kèm ghi chú trong `admin_note`
  (`ok` vẫn là `true`, hiện `message` cho người dùng).
  - Link nhận: `youtube.com/watch?v=`, `youtube.com/shorts/`, `youtu.be/`,
    `tiktok.com/@ten/video/...`, và link chia sẻ TikTok `vt.tiktok.com/...`, `vm.tiktok.com/...`
  - Giới hạn: 3 video / 24 giờ, tối đa 5 video đang chờ duyệt, không gửi trùng.
- `refresh_stats`: làm mới lượt xem, thích, bình luận (mỗi video tối đa 1 lần / 10 phút).
- `refresh_channels`: bổ sung ảnh/tên cho kênh liên kết thiếu thông tin.
- Mọi lời gọi giới hạn 30 lần / 10 phút / người dùng.

### creator-scan (quét video mới của kênh YouTube)
`{ action: "scan_me" }` → `{ ok, mode: "user", scanned, added }`
Hệ thống cũng tự quét mỗi 6 giờ. Mỗi kênh quét lại sau tối thiểu 10 phút.
Video tìm được vào danh sách chờ duyệt với `source = "auto"`.

## 5. Đọc bảng trực tiếp (có RLS, người dùng chỉ thấy dữ liệu của mình, admin thấy hết)

### intro_video_submissions
`id, user_id, url, platform, status (pending|approved|rejected), source (manual|auto), title, thumbnail_url,
views, likes, comments, shares, admin_note, gift_code, coins, created_at, reviewed_at, video_published_at`
```js
supabase.from("intro_video_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false });
```
Khi `status = approved` thì có `gift_code` và `coins`. Người dùng nhập code ở **Ví → Nhập Gift Code trên web chính**
(hoặc thêm trang nhập code vào web mới, gọi `supabase.rpc("redeem_gift_code", { p_code })`).

### creator_channels
`user_id, platform, handle, display_name, avatar_url, channel_id, followers, channel_url, last_scanned_at`

### creator_settings
`key, value` (đọc được, chỉ admin sửa). Khóa: `hashtags`, `event_prize_text`, `link_guide_video`, `scan_grace_hours`.

## 6. Ảnh đại diện
Lưu ở bucket công khai `creator-avatars` (đường dẫn trong `avatar_url`).

## 7. Việc cần làm sau (chưa có)
- Liên kết Discord (làm sau).
- Quét tự động TikTok (hiện TikTok chỉ dán link).
