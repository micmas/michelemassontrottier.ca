// Small progressive enhancements applied to page content (also re-run after a members page is unlocked).
declare global { interface Window { __VIDEOS?: Record<string, string> } }

export function enhance(root: ParentNode) {
  const videos = window.__VIDEOS ?? {};
  // <div class="video-embed" data-video="capsule-intro"></div>  ->  YouTube iframe (IDs live in src/data/videos.json)
  root.querySelectorAll<HTMLElement>('.video-embed[data-video]').forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const id = videos[el.dataset.video!];
    if (id) {
      const f = document.createElement('iframe');
      f.src = `https://www.youtube-nocookie.com/embed/${id}`;
      f.title = 'Vidéo';
      f.loading = 'lazy';
      f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      el.append(f);
    } else {
      el.innerHTML = '<span class="soon">Vidéo bientôt disponible</span>';
    }
  });
  // links like href="#video-capsule-section1" -> YouTube link
  root.querySelectorAll<HTMLAnchorElement>('a[href^="#video-"]').forEach((a) => {
    const id = videos[a.getAttribute('href')!.slice(7)];
    if (id) { a.href = `https://youtu.be/${id}`; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.removeAttribute('href'); a.title = 'Vidéo bientôt disponible'; }
  });
  // contact form: come back to this site's thank-you page after sending
  root.querySelectorAll<HTMLInputElement>('input[data-auto-next]').forEach((i) => {
    i.value = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/') + 'merci/', location.origin).href;
  });
  // external links open in a new tab
  root.querySelectorAll<HTMLAnchorElement>('main a[href^="http"]').forEach((a) => {
    if (!a.href.startsWith(location.origin)) { a.target = '_blank'; a.rel = 'noopener'; }
  });
}
