const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const outFile = path.join(root, 'truebase_opening_payload.js');
const base = 'https://truebaseholding.com';

const assets = [
  ['dog1', 'truebase-opening-dog-01.jpg', 'image/jpeg', 'truebase-homepage/assets/opening/dog-01.jpg'],
  ['dog2', 'truebase-opening-dog-02.jpg', 'image/jpeg', 'truebase-homepage/assets/opening/dog-02.jpg'],
  ['dog3', 'truebase-opening-dog-03.jpg', 'image/jpeg', 'truebase-homepage/assets/opening/dog-03.jpg'],
  ['dog7', 'truebase-opening-dog-07.jpg', 'image/jpeg', 'truebase-homepage/assets/opening/dog-07.jpg'],
  ['dog10', 'truebase-opening-dog-10.jpg', 'image/jpeg', 'truebase-homepage/assets/opening/dog-10.jpg'],
  ['music', 'truebase-calm-memory.wav', 'audio/wav', 'truebase-homepage/assets/opening/truebase-calm-memory.wav'],
].map(([key, filename, mime, relPath]) => ({
  key,
  filename,
  title: filename.replace(/\.[^.]+$/, ''),
  mime,
  base64: fs.readFileSync(path.join(root, relPath)).toString('base64'),
}));

const css = `
<style id="tb-opening-film-css">
.tb-opening-film{position:relative;height:min(780px,calc(100vh - 74px));min-height:560px;overflow:hidden;color:#f7f1e7;background:#1e2a24;isolation:isolate}.tb-opening-film__scene{position:absolute;inset:0;opacity:0;filter:blur(18px);animation-duration:14s;animation-timing-function:linear;animation-fill-mode:both}.tb-opening-film__scene img{width:100%;height:100%;object-fit:cover;transform:scale(1.06);animation-duration:14s;animation-timing-function:ease-in-out;animation-fill-mode:both}.tb-opening-film__scene:after{position:absolute;inset:0;content:"";background:radial-gradient(circle at 72% 18%,rgba(217,185,143,.28),transparent 24%),linear-gradient(90deg,rgba(30,42,36,.66),rgba(30,42,36,.18) 48%,rgba(30,42,36,.7));mix-blend-mode:multiply}.tb-opening-film__content{position:absolute;inset:0;z-index:2;display:flex;width:100%;height:100%;flex-direction:column;justify-content:flex-end;gap:20px;padding:clamp(42px,6vw,110px)}.tb-opening-film__scene--right .tb-opening-film__content{align-items:flex-end;text-align:right}.tb-opening-film__content--center{align-items:center;justify-content:center;text-align:center}.tb-opening-film__kicker{max-width:740px;margin:0;color:#d9b98f;font-size:clamp(12px,1vw,18px);font-weight:800;letter-spacing:.16em;line-height:1.35;text-transform:uppercase;opacity:0;animation:tbOpeningTextIn 1.1s cubic-bezier(.2,.9,.2,1) both}.tb-opening-film h1,.tb-opening-film h2{max-width:960px;margin:0;color:#f7f1e7;font-family:Georgia,"Times New Roman",serif;font-size:clamp(42px,5.7vw,104px);font-weight:700;line-height:.98;letter-spacing:0;opacity:0;animation:tbOpeningTextIn 1.2s cubic-bezier(.2,.9,.2,1) both}.tb-opening-film p:not(.tb-opening-film__kicker){max-width:690px;margin:0;color:rgba(247,241,231,.86);font-size:clamp(18px,1.65vw,29px);line-height:1.38;opacity:0;animation:tbOpeningTextIn 1.1s cubic-bezier(.2,.9,.2,1) both}.tb-opening-film__line{display:block;width:min(480px,38vw);height:1px;background:linear-gradient(90deg,transparent,#d9b98f,transparent);transform:scaleX(0);transform-origin:left;animation:tbOpeningLineIn 1.2s ease both}.tb-opening-film__scene--right .tb-opening-film__line{transform-origin:right}.tb-opening-film__cues{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:12px;max-width:690px}.tb-opening-film__cues span{padding:10px 16px;border:1px solid rgba(247,241,231,.32);border-radius:999px;color:rgba(247,241,231,.88);background:rgba(30,42,36,.28);backdrop-filter:blur(12px);font-size:clamp(13px,.95vw,17px);opacity:0;animation:tbOpeningTextIn .8s cubic-bezier(.2,.9,.2,1) both}.tb-opening-film__symbol{position:relative;width:clamp(82px,7.6vw,138px);aspect-ratio:1;border:1px solid rgba(217,185,143,.72);border-radius:50%;opacity:0;animation:tbOpeningSymbolIn 1.2s ease both}.tb-opening-film__symbol:before,.tb-opening-film__symbol:after{position:absolute;inset:23%;border:1px solid rgba(247,241,231,.62);border-radius:50% 50% 46% 46%;content:""}.tb-opening-film__symbol:after{inset:34% 20% 26%;border-color:rgba(217,185,143,.68);transform:rotate(42deg)}.tb-opening-film__grain,.tb-opening-film__wash{pointer-events:none;position:absolute;inset:0;z-index:4}.tb-opening-film__grain{opacity:.18;background-image:linear-gradient(115deg,rgba(255,255,255,.05) 0 1px,transparent 1px 7px),radial-gradient(circle at 18% 22%,rgba(247,241,231,.12),transparent 18%),radial-gradient(circle at 78% 68%,rgba(140,106,61,.14),transparent 24%);mix-blend-mode:screen}.tb-opening-film__wash{opacity:0;background:linear-gradient(105deg,transparent 0%,rgba(217,185,143,.28) 42%,transparent 68%);transform:translateX(-70%);animation:tbOpeningLightSweep 14s linear both}.tb-opening-film__sound{position:absolute;right:clamp(18px,3vw,54px);bottom:clamp(18px,3vw,44px);z-index:6;min-height:44px;padding:0 18px;border:1px solid rgba(247,241,231,.38);border-radius:999px;color:#f7f1e7;background:rgba(30,42,36,.48);font-size:13px;font-weight:800;letter-spacing:.04em;cursor:pointer;backdrop-filter:blur(12px)}.tb-opening-film__sound-pause,.tb-opening-film.is-sound-on .tb-opening-film__sound-play{display:none}.tb-opening-film.is-sound-on .tb-opening-film__sound-pause{display:inline}.tb-opening-film__scene--one{animation-name:tbOpeningScene1}.tb-opening-film__scene--one img{animation-name:tbOpeningPan1}.tb-opening-film__scene--two{animation-name:tbOpeningScene2}.tb-opening-film__scene--two img{animation-name:tbOpeningPan2}.tb-opening-film__scene--three{animation-name:tbOpeningScene3}.tb-opening-film__scene--three img{animation-name:tbOpeningPan3}.tb-opening-film__scene--four{animation-name:tbOpeningScene4}.tb-opening-film__scene--four img{animation-name:tbOpeningPan4}.tb-opening-film__scene--five{animation-name:tbOpeningScene5}.tb-opening-film__scene--five img{animation-name:tbOpeningPan5}.tb-opening-film__scene--one .tb-opening-film__kicker{animation-delay:.42s}.tb-opening-film__scene--one h1{animation-delay:.72s}.tb-opening-film__scene--one .tb-opening-film__line{animation-delay:1.08s}.tb-opening-film__scene--two .tb-opening-film__kicker{animation-delay:3.14s}.tb-opening-film__scene--two h2{animation-delay:3.42s}.tb-opening-film__scene--two p:not(.tb-opening-film__kicker){animation-delay:3.78s}.tb-opening-film__scene--three .tb-opening-film__kicker{animation-delay:5.8s}.tb-opening-film__scene--three h2{animation-delay:6.08s}.tb-opening-film__scene--three p:not(.tb-opening-film__kicker){animation-delay:6.48s}.tb-opening-film__scene--four .tb-opening-film__kicker{animation-delay:8.68s}.tb-opening-film__scene--four h2{animation-delay:8.96s}.tb-opening-film__scene--four p:not(.tb-opening-film__kicker){animation-delay:9.34s}.tb-opening-film__scene--four .tb-opening-film__cues span:nth-child(1){animation-delay:10.08s}.tb-opening-film__scene--four .tb-opening-film__cues span:nth-child(2){animation-delay:10.22s}.tb-opening-film__scene--four .tb-opening-film__cues span:nth-child(3){animation-delay:10.36s}.tb-opening-film__scene--five .tb-opening-film__symbol{animation-delay:11.58s}.tb-opening-film__scene--five h2{animation-delay:11.86s}.tb-opening-film__scene--five p{animation-delay:12.26s}@keyframes tbOpeningTextIn{0%{opacity:0;filter:blur(10px);transform:translateY(28px)}100%{opacity:1;filter:blur(0);transform:translateY(0)}}@keyframes tbOpeningSymbolIn{0%{opacity:0;filter:blur(12px);transform:scale(.82)}100%{opacity:1;filter:blur(0);transform:scale(1)}}@keyframes tbOpeningLineIn{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}@keyframes tbOpeningScene1{0%,20%{opacity:1;filter:blur(0)}24%,100%{opacity:0;filter:blur(18px)}}@keyframes tbOpeningScene2{0%,18%{opacity:0;filter:blur(18px)}23%,39%{opacity:1;filter:blur(0)}43%,100%{opacity:0;filter:blur(18px)}}@keyframes tbOpeningScene3{0%,38%{opacity:0;filter:blur(18px)}43%,60%{opacity:1;filter:blur(0)}64%,100%{opacity:0;filter:blur(18px)}}@keyframes tbOpeningScene4{0%,58%{opacity:0;filter:blur(18px)}63%,79%{opacity:1;filter:blur(0)}83%,100%{opacity:0;filter:blur(18px)}}@keyframes tbOpeningScene5{0%,78%{opacity:0;filter:blur(18px)}83%,100%{opacity:1;filter:blur(0)}}@keyframes tbOpeningPan1{0%{transform:scale(1.08) translate3d(0,0,0)}100%{transform:scale(1.16) translate3d(-2.5%,-1.5%,0)}}@keyframes tbOpeningPan2{0%{transform:scale(1.1) translate3d(2%,0,0)}100%{transform:scale(1.18) translate3d(-1%,-2%,0)}}@keyframes tbOpeningPan3{0%{transform:scale(1.05) translate3d(-3%,1%,0)}100%{transform:scale(1.13) translate3d(2%,-1%,0)}}@keyframes tbOpeningPan4{0%{transform:scale(1.12) translate3d(0,0,0)}100%{transform:scale(1.2) translate3d(-2%,-2%,0)}}@keyframes tbOpeningPan5{0%{transform:scale(1.08) translate3d(0,0,0)}100%{transform:scale(1.15) translate3d(1%,-1%,0)}}@keyframes tbOpeningLightSweep{0%,9%{opacity:0;transform:translateX(-70%)}14%,18%{opacity:.42}25%{opacity:0;transform:translateX(70%)}39%{opacity:0;transform:translateX(-70%)}45%,49%{opacity:.34}56%{opacity:0;transform:translateX(70%)}78%{opacity:0;transform:translateX(-70%)}84%,88%{opacity:.32}94%{opacity:0;transform:translateX(70%)}100%{opacity:0}}@media(max-width:600px){.tb-opening-film{height:calc(100vh - 74px);min-height:560px}.tb-opening-film__content,.tb-opening-film__scene--right .tb-opening-film__content{align-items:flex-start;justify-content:flex-end;padding:44px 24px 86px;text-align:left}.tb-opening-film__content--center{align-items:center;justify-content:center;padding:44px 28px 86px;text-align:center}.tb-opening-film h1,.tb-opening-film h2{max-width:92vw;font-size:clamp(38px,13vw,58px)}.tb-opening-film p:not(.tb-opening-film__kicker){max-width:92vw;font-size:18px}.tb-opening-film__cues{justify-content:flex-start}.tb-opening-film__sound{left:24px;right:auto}}
</style>`;

function openingHtml(urls) {
  return `
<section class="tb-opening-film" aria-label="TrueBase memory opening film">
  <audio class="tb-opening-film__audio" preload="auto" src="${urls.music}"></audio>
  <div class="tb-opening-film__scene tb-opening-film__scene--one"><img src="${urls.dog1}" alt="Corgi seated in a sunlit garden"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">TrueBase Memory Film</p><h1>Every shared day leaves a trace.</h1><span class="tb-opening-film__line" aria-hidden="true"></span></div></div>
  <div class="tb-opening-film__scene tb-opening-film__scene--two tb-opening-film__scene--right"><img src="${urls.dog2}" alt="Corgi looking toward its owner"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Mutual care</p><h2>Side by side, we learn how to belong.</h2><p>A hand to lean on. A familiar heartbeat. Quiet comfort in ordinary days.</p><span class="tb-opening-film__line" aria-hidden="true"></span></div></div>
  <div class="tb-opening-film__scene tb-opening-film__scene--three"><img src="${urls.dog10}" alt="Corgi resting in grass and daylight"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Life together</p><h2>Growth, play, walks, waiting, returning.</h2><p>TrueBase preserves the moments that made a life together.</p></div></div>
  <div class="tb-opening-film__scene tb-opening-film__scene--four tb-opening-film__scene--right"><img src="${urls.dog3}" alt="Corgi profile in a peaceful garden"><div class="tb-opening-film__content"><p class="tb-opening-film__kicker">Memorial products</p><h2>Daily memories become lasting keepsakes.</h2><p>From portraits and engraved pieces to memorial boxes and remembrance gifts, love stays close.</p><div class="tb-opening-film__cues" aria-label="TrueBase product focus"><span>Keepsake objects</span><span>Memorial gifts</span><span>Custom remembrance</span></div></div></div>
  <div class="tb-opening-film__scene tb-opening-film__scene--five"><img src="${urls.dog7}" alt="Corgi standing calmly on wooden decking"><div class="tb-opening-film__content tb-opening-film__content--center"><span class="tb-opening-film__symbol" aria-hidden="true"></span><h2>TrueBase</h2><p>Memory, made lasting.</p></div></div>
  <div class="tb-opening-film__grain" aria-hidden="true"></div><div class="tb-opening-film__wash" aria-hidden="true"></div>
  <button class="tb-opening-film__sound" type="button" aria-pressed="false"><span class="tb-opening-film__sound-play">Play sound</span><span class="tb-opening-film__sound-pause">Pause sound</span></button>
</section>`;
}

const js = `
<script id="tb-opening-film-js">
(function(){var opening=document.querySelector(".tb-opening-film");var button=document.querySelector(".tb-opening-film__sound");var audio=document.querySelector(".tb-opening-film__audio");if(!opening||!button||!audio)return;button.addEventListener("click",function(){if(audio.paused){audio.currentTime=0;audio.volume=.42;audio.play().then(function(){opening.classList.add("is-sound-on");button.setAttribute("aria-pressed","true")}).catch(function(){opening.classList.remove("is-sound-on");button.setAttribute("aria-pressed","false")});return}audio.pause();opening.classList.remove("is-sound-on");button.setAttribute("aria-pressed","false")});audio.addEventListener("ended",function(){opening.classList.remove("is-sound-on");button.setAttribute("aria-pressed","false")})})();
</script>`;

const payload = `(() => {
  const base = ${JSON.stringify(base)};
  const assets = ${JSON.stringify(assets)};
  const css = ${JSON.stringify(css)};
  const js = ${JSON.stringify(js)};
  const openingHtml = ${openingHtml.toString()};
  function request(method, url, body, headers = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    for (const [key, value] of Object.entries(headers)) xhr.setRequestHeader(key, value);
    xhr.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(xhr.responseText); } catch (_) {}
    return { ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, json, text: xhr.responseText };
  }
  function getNonce() {
    if (typeof wpApiSettings !== "undefined" && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request("GET", base + "/wp-admin/post-new.php?post_type=page");
    const html = admin.text || "";
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\\\\s*[:=]\\\\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\\\\s*[:=]\\\\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error("Could not find WordPress REST nonce. Admin status " + admin.status);
  }
  function bytesFromBase64(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  const nonce = getNonce();
  const urls = {};
  for (const asset of assets) {
    const search = request("GET", base + "/wp-json/wp/v2/media?search=" + encodeURIComponent(asset.title) + "&per_page=20", undefined, {"X-WP-Nonce": nonce});
    const found = search.json && search.json.find(item => (item.title && item.title.rendered || "").includes(asset.title));
    if (found && found.source_url) {
      urls[asset.key] = found.source_url;
      continue;
    }
    const upload = request("POST", base + "/wp-json/wp/v2/media", bytesFromBase64(asset.base64), {
      "X-WP-Nonce": nonce,
      "Content-Disposition": "attachment; filename=\\"" + asset.filename + "\\"",
      "Content-Type": asset.mime
    });
    if (!upload.ok || !upload.json || !upload.json.source_url) {
      throw new Error("Upload failed for " + asset.filename + ": " + upload.status + " " + upload.text.slice(0, 300));
    }
    urls[asset.key] = upload.json.source_url;
  }
  const pages = request("GET", base + "/wp-json/wp/v2/pages?slug=truebase-home&context=edit", undefined, {"X-WP-Nonce": nonce});
  const page = pages.json && pages.json[0];
  if (!page) throw new Error("Could not find page slug truebase-home");
  let content = (page.content && page.content.raw) || "";
  content = content.replace(/<style id="tb-opening-film-css">[\\s\\S]*?<\\/style>/g, "");
  content = content.replace(/<script id="tb-opening-film-js">[\\s\\S]*?<\\/script>/g, "");
  content = content.replace(/<section class="tb-opening-film"[\\s\\S]*?<\\/section>/g, "");
  const film = openingHtml(urls);
  if (content.includes("<main>")) {
    content = content.replace("<main>", "<main>" + film);
  } else if (content.includes("<section class=\\"tb-hero")) {
    content = content.replace(/<section class="tb-hero/, film + '<section class="tb-hero');
  } else {
    content = film + content;
  }
  content = css + content + js;
  const update = request("POST", base + "/wp-json/wp/v2/pages/" + page.id, JSON.stringify({ content }), {
    "Content-Type": "application/json",
    "X-WP-Nonce": nonce
  });
  return JSON.stringify({
    ok: update.ok,
    status: update.status,
    id: page.id,
    link: update.json && update.json.link,
    assets: urls,
    error: update.ok ? null : update.text.slice(0, 500)
  }, null, 2);
})();`;

fs.writeFileSync(outFile, payload);
console.log(outFile);
