// Bảng thưởng video, tính sau 7 ngày. Mốc xếp từ thấp lên cao.
export const LOW_TIERS = [
  { min: 0, xu: 50, label: "Dưới 200 lượt xem" },
  { min: 200, xu: 100, label: "200 – 499 lượt xem" },
  { min: 500, xu: 500, label: "500 – 999 lượt xem" },
];

export const TIERS = {
  youtube: [
    { views: 1000, likes: 50, xu: 2500 },
    { views: 5000, likes: 150, xu: 7500 },
    { views: 10000, likes: 300, xu: 15000 },
    { views: 25000, likes: 600, xu: 30000 },
    { views: 50000, likes: 1000, xu: 50000 },
  ],
  tiktok: [
    { views: 1000, likes: 50, xu: 1500 },
    { views: 5000, likes: 200, xu: 5000 },
    { views: 10000, likes: 400, xu: 10000 },
    { views: 25000, likes: 800, xu: 25000 },
    { views: 50000, likes: 1500, xu: 50000 },
  ],
};

export const likeWord = (platform) => (platform === "youtube" ? "lượt thích" : "lượt tim");
export const vn = (n) => Number(n).toLocaleString("vi-VN");

// Trả về { xu, label, next } với next là mốc kế tiếp (hoặc null nếu đã tối đa)
export function estimateReward(platform, views, likes) {
  const table = TIERS[platform] || TIERS.tiktok;
  const v = Number(views) || 0;
  const l = Number(likes) || 0;

  // Mốc cao nhất đạt ĐỒNG THỜI cả lượt xem và lượt thích
  let idx = -1;
  table.forEach((t, i) => {
    if (v >= t.views && l >= t.likes) idx = i;
  });

  if (idx >= 0) {
    const t = table[idx];
    return {
      xu: t.xu,
      label: `Mốc ${vn(t.views)} xem + ${vn(t.likes)} ${likeWord(platform)}`,
      next: table[idx + 1] || null,
    };
  }

  // Chưa đạt mốc đầu tiên -> áp dụng bảng dưới 1.000 lượt xem
  let low = LOW_TIERS[0];
  for (const t of LOW_TIERS) if (v >= t.min) low = t;
  return { xu: low.xu, label: `Bảng dưới 1.000 lượt xem · ${low.label}`, next: table[0] };
}
