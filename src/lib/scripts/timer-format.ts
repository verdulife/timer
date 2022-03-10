function padTo(n: number, amount: number): string {
  return n.toString().padStart(amount, '0');
}

export function timerFormat(ms: number) {
  let cs = Math.floor(ms / 10);
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  let h = Math.floor(m / 60);

  cs = cs % 100;
  s = s % 60;
  m = m % 60;

  return `${padTo(h, 2)}:${padTo(m, 2)}:${padTo(s, 2)}:${padTo(cs, 2)}`;
}