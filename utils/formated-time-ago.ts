function declOfNum(n: number, titles: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return titles[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return titles[1];
  return titles[2];
}

export function formatTimeAgo(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffSec = Math.floor((now - then) / 1000);

  const units: {
    inSeconds: number;
    titles: [string, string, string];
  }[] = [
    { inSeconds: 31536000, titles: ['рік', 'роки', 'років'] },
    { inSeconds: 2592000,  titles: ['місяць', 'місяці', 'місяців'] },
    { inSeconds: 86400,    titles: ['день', 'дні', 'днів'] },
    { inSeconds: 3600,     titles: ['година', 'години', 'годин'] },
    { inSeconds: 60,       titles: ['хвилина', 'хвилини', 'хвилин'] },
    { inSeconds: 1,        titles: ['секунда', 'секунди', 'секунд'] },
  ];

  for (const unit of units) {
    if (diffSec >= unit.inSeconds) {
      const count = Math.floor(diffSec / unit.inSeconds);
      return `${count} ${declOfNum(count, unit.titles)}`;
    }
  }

  return 'щойно';
}

export function formatDateDDMMYYYY(iso: string): string {
  const d = new Date(iso)
  const day   = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year  = d.getFullYear()
  return `${day}.${month}.${year}`
}

export function formatTimeHHMM(iso: string): string {
  const d = new Date(iso)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}
