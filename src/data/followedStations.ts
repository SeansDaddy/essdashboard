// 关注电站的 localStorage 工具

const STORAGE_KEY = 'ess_followed_stations';

export function getFollowedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFollow(stationId: string): boolean {
  const current = getFollowedIds();
  const isFollowed = current.includes(stationId);
  const next = isFollowed
    ? current.filter(id => id !== stationId)
    : [...current, stationId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return !isFollowed;
}

export function isFollowed(stationId: string): boolean {
  return getFollowedIds().includes(stationId);
}