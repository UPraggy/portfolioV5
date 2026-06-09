// reveal-on-scroll helper for Stencil components
export function attachReveal(host: HTMLElement) {
  if (!host || typeof IntersectionObserver === 'undefined') return () => {};
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('in');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.1 }
  );
  io.observe(host);
  return () => io.disconnect();
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    resolve();
  });
}
