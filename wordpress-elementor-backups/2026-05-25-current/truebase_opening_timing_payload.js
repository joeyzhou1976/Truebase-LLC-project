(() => {
  const request = (method, url, body, headers = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
    xhr.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(xhr.responseText); } catch (_) {}
    return { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, json, text: xhr.responseText };
  };
  const getNonce = () => {
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request('GET', '/wp-admin/post-new.php?post_type=page');
    const html = admin.text || '';
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error('Could not find REST nonce');
  };
  const nonce = getNonce();
  const pages = request('GET', '/wp-json/wp/v2/pages?slug=truebase-home&context=edit', undefined, { 'X-WP-Nonce': nonce });
  const page = pages.json && pages.json[0];
  if (!page) throw new Error('Could not find truebase-home page');
  let content = (page.content && page.content.raw) || '';

  const replacements = [
    [/animation-duration:14s/g, 'animation-duration:20s'],
    [/tbOpeningLightSweep 14s/g, 'tbOpeningLightSweep 20s'],
    [/animation-delay:3\.14s/g, 'animation-delay:5.05s'],
    [/animation-delay:3\.42s/g, 'animation-delay:5.34s'],
    [/animation-delay:3\.78s/g, 'animation-delay:5.76s'],
    [/animation-delay:5\.8s/g, 'animation-delay:8.85s'],
    [/animation-delay:6\.08s/g, 'animation-delay:9.16s'],
    [/animation-delay:6\.48s/g, 'animation-delay:9.62s'],
    [/animation-delay:8\.68s/g, 'animation-delay:12.68s'],
    [/animation-delay:8\.96s/g, 'animation-delay:13s'],
    [/animation-delay:9\.34s/g, 'animation-delay:13.44s'],
    [/animation-delay:10\.08s/g, 'animation-delay:14.18s'],
    [/animation-delay:10\.22s/g, 'animation-delay:14.36s'],
    [/animation-delay:10\.36s/g, 'animation-delay:14.54s'],
    [/animation-delay:11\.58s/g, 'animation-delay:16.3s'],
    [/animation-delay:11\.86s/g, 'animation-delay:16.65s'],
    [/animation-delay:12\.26s/g, 'animation-delay:17.12s'],
    [/@keyframes tbOpeningScene1\{0%,20%\{opacity:1;filter:blur\(0\)\}24%,100%\{opacity:0;filter:blur\(18px\)\}\}/g, '@keyframes tbOpeningScene1{0%,27%{opacity:1;filter:blur(0)}33%,100%{opacity:0;filter:blur(18px)}}'],
    [/@keyframes tbOpeningScene2\{0%,18%\{opacity:0;filter:blur\(18px\)\}23%,39%\{opacity:1;filter:blur\(0\)\}43%,100%\{opacity:0;filter:blur\(18px\)\}\}/g, '@keyframes tbOpeningScene2{0%,25%{opacity:0;filter:blur(18px)}31%,46%{opacity:1;filter:blur(0)}52%,100%{opacity:0;filter:blur(18px)}}'],
    [/@keyframes tbOpeningScene3\{0%,38%\{opacity:0;filter:blur\(18px\)\}43%,60%\{opacity:1;filter:blur\(0\)\}64%,100%\{opacity:0;filter:blur\(18px\)\}\}/g, '@keyframes tbOpeningScene3{0%,44%{opacity:0;filter:blur(18px)}50%,65%{opacity:1;filter:blur(0)}71%,100%{opacity:0;filter:blur(18px)}}'],
    [/@keyframes tbOpeningScene4\{0%,58%\{opacity:0;filter:blur\(18px\)\}63%,79%\{opacity:1;filter:blur\(0\)\}83%,100%\{opacity:0;filter:blur\(18px\)\}\}/g, '@keyframes tbOpeningScene4{0%,63%{opacity:0;filter:blur(18px)}69%,81%{opacity:1;filter:blur(0)}87%,100%{opacity:0;filter:blur(18px)}}'],
    [/@keyframes tbOpeningScene5\{0%,78%\{opacity:0;filter:blur\(18px\)\}83%,100%\{opacity:1;filter:blur\(0\)\}\}/g, '@keyframes tbOpeningScene5{0%,81%{opacity:0;filter:blur(18px)}87%,100%{opacity:1;filter:blur(0)}}'],
    [/ctx\.currentTime\+14/g, 'ctx.currentTime+20'],
    [/ctx\.currentTime\+14\.1/g, 'ctx.currentTime+20.1'],
    [/setTimeout\(stop,14200\)/g, 'setTimeout(stop,20200)']
  ];

  for (const [pattern, value] of replacements) {
    content = content.replace(pattern, value);
  }

  const update = request('POST', '/wp-json/wp/v2/pages/' + page.id, JSON.stringify({ content }), {
    'Content-Type': 'application/json',
    'X-WP-Nonce': nonce
  });
  return JSON.stringify({ ok: update.ok, status: update.status, id: page.id, link: update.json && update.json.link, error: update.ok ? null : update.text.slice(0, 500) });
})();
