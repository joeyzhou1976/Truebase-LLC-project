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
  const media = request('GET', '/wp-json/wp/v2/media?search=truebase-opening-dog&per_page=50', undefined, { 'X-WP-Nonce': nonce }).json || [];
  const ownCorgi = media.find(entry => ((entry.title && entry.title.rendered) || '').includes('dog-01'));
  if (!ownCorgi || !ownCorgi.source_url) throw new Error('Missing uploaded corgi image');
  const urls = {
    corgi: ownCorgi.source_url,
    catDogWindow: 'https://images.pexels.com/photos/16395150/pexels-photo-16395150/free-photo-of-dog-and-cat-sitting-together.jpeg?auto=compress&cs=tinysrgb&w=1920',
    blackCat: 'https://images.pexels.com/photos/9304589/pexels-photo-9304589.jpeg?auto=compress&cs=tinysrgb&w=1920',
    puppyCat: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&w=1920',
    catCorgi: 'https://images.pexels.com/photos/9952105/pexels-photo-9952105.jpeg?auto=compress&cs=tinysrgb&w=1920'
  };
  const pages = request('GET', '/wp-json/wp/v2/pages?slug=truebase-home&context=edit', undefined, { 'X-WP-Nonce': nonce });
  const page = pages.json && pages.json[0];
  if (!page) throw new Error('Could not find truebase-home page');
  let content = (page.content && page.content.raw) || '';
  content = content.replace(/<section class="tb-opening-film"[\s\S]*?<\/section>/g, '');
  const film = `<section class="tb-opening-film" aria-label="TrueBase memory opening film"><div class="tb-opening-film__scene tb-opening-film__scene--one"><img src="${urls.corgi}" alt="Corgi seated in a sunlit garden"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">TrueBase Memory Film</p><h1>Every shared day leaves a trace.</h1><span class="tb-opening-film__line" aria-hidden="true"></span></div></div><div class="tb-opening-film__scene tb-opening-film__scene--two tb-opening-film__scene--right"><img src="${urls.catDogWindow}" alt="Bengal cat and Yorkshire Terrier sitting together by a window"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Many companions</p><h2>Every bond has its own shape.</h2><p>Dogs and cats, bold and quiet, young and old. Each life changes the home it shares.</p><span class="tb-opening-film__line" aria-hidden="true"></span></div></div><div class="tb-opening-film__scene tb-opening-film__scene--three"><img src="${urls.blackCat}" alt="Black cat portrait with bright eyes"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Life together</p><h2>Growth, play, waiting, returning.</h2><p>TrueBase preserves the moments that made a life together.</p></div></div><div class="tb-opening-film__scene tb-opening-film__scene--four tb-opening-film__scene--right"><img src="${urls.puppyCat}" alt="Cat gently touching a puppy lying in the grass"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Memorial products</p><h2>Daily memories become lasting keepsakes.</h2><p>From portraits and engraved pieces to memorial boxes and remembrance gifts, love stays close.</p><div class="tb-opening-film__cues" aria-label="TrueBase product focus"><span>Keepsake objects</span><span>Memorial gifts</span><span>Custom remembrance</span></div></div></div><div class="tb-opening-film__scene tb-opening-film__scene--five"><img src="${urls.catCorgi}" alt="Cat and corgi interacting indoors"><div class="tb-opening-film__content tb-opening-film__content--center"><span class="tb-opening-film__symbol" aria-hidden="true"></span><h2>TrueBase</h2><p>Memory, made lasting.</p></div></div><div class="tb-opening-film__grain" aria-hidden="true"></div><div class="tb-opening-film__wash" aria-hidden="true"></div><button class="tb-opening-film__sound" type="button" aria-pressed="false"><span class="tb-opening-film__sound-play">Play sound</span><span class="tb-opening-film__sound-pause">Pause sound</span></button></section>`;
  content = content.includes('<main>') ? content.replace('<main>', '<main>' + film) : film + content;
  const update = request('POST', '/wp-json/wp/v2/pages/' + page.id, JSON.stringify({ content }), {
    'Content-Type': 'application/json',
    'X-WP-Nonce': nonce
  });
  return JSON.stringify({ ok: update.ok, status: update.status, id: page.id, link: update.json && update.json.link, error: update.ok ? null : update.text.slice(0, 500) });
})();
