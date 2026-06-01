(() => {
  const base = 'https://truebaseholding.com';
  const targetEmail = 'partner@truebaseholding.com';
  const pages = {
    'truebase-contact': {
      label: 'Contact TrueBase',
      subject: 'TrueBase website contact request',
      intro: 'Send your message and the TrueBase team will follow up by email.',
      form: `[contact-form to="${targetEmail}" subject="TrueBase website contact request"]` +
        `[contact-field label="Name" type="name" required="1"/]` +
        `[contact-field label="Business email" type="email" required="1"/]` +
        `[contact-field label="Company name" type="text"/]` +
        `[contact-field label="Phone" type="text"/]` +
        `[contact-field label="Message" type="textarea" required="1"/]` +
        `[/contact-form]`
    },
    'truebase-request-samples-quote': {
      label: 'Sample / quote request',
      subject: 'TrueBase sample or quote request',
      intro: 'Use this form for sample kit requests, pricing inquiries, and custom project estimates.',
      form: `[contact-form to="${targetEmail}" subject="TrueBase sample or quote request"]` +
        `[contact-field label="Business email" type="email" required="1"/]` +
        `[contact-field label="Company name" type="text" required="1"/]` +
        `[contact-field label="Product interest" type="text" required="1"/]` +
        `[contact-field label="Estimated quantity" type="text"/]` +
        `[contact-field label="Shipping region" type="text"/]` +
        `[contact-field label="Target timeline" type="text"/]` +
        `[contact-field label="Project details" type="textarea" required="1"/]` +
        `[/contact-form]`
    },
    'truebase-request-catalog': {
      label: 'Catalog request',
      subject: 'TrueBase catalog request',
      intro: 'Tell us where to send the catalog and which memorial categories you want to review.',
      form: `[contact-form to="${targetEmail}" subject="TrueBase catalog request"]` +
        `[contact-field label="Business email" type="email" required="1"/]` +
        `[contact-field label="Company name" type="text" required="1"/]` +
        `[contact-field label="Role or channel" type="text"/]` +
        `[contact-field label="Region" type="text"/]` +
        `[contact-field label="Product categories of interest" type="textarea"/]` +
        `[contact-field label="Message" type="textarea"/]` +
        `[/contact-form]`
    },
    'truebase-become-a-partner': {
      label: 'Partner application',
      subject: 'TrueBase partner application',
      intro: 'Share your company details and partnership needs. TrueBase will review and follow up by email.',
      form: `[contact-form to="${targetEmail}" subject="TrueBase partner application"]` +
        `[contact-field label="Full name" type="name" required="1"/]` +
        `[contact-field label="Business email" type="email" required="1"/]` +
        `[contact-field label="Company name" type="text" required="1"/]` +
        `[contact-field label="Website" type="url"/]` +
        `[contact-field label="Country / region" type="text"/]` +
        `[contact-field label="Business type" type="text"/]` +
        `[contact-field label="Product interest" type="textarea" required="1"/]` +
        `[contact-field label="Estimated annual volume" type="text"/]` +
        `[contact-field label="Message" type="textarea"/]` +
        `[/contact-form]`
    }
  };
  const formAssets = `<style id="tb-server-form-styles">
.tb-server-form{background:#fff;border:1px solid #eadfd2;border-radius:8px;padding:30px}
.tb-server-form h2{font-size:30px;line-height:1.15;margin:0 0 8px;color:#24272d}
.tb-server-form>p{margin:0 0 22px;color:#656a72;line-height:1.65}
.tb-server-form .contact-form{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:0}
.tb-server-form .contact-form>div,.tb-server-form .contact-form>p{margin:0}
.tb-server-form .contact-form label{display:block;font-size:13px;font-weight:900;color:#393d43;margin:0 0 8px}
.tb-server-form .contact-form input:not([type=submit]),.tb-server-form .contact-form textarea,.tb-server-form .contact-form select{width:100%;min-height:48px;border:1px solid #d8cab8;border-radius:6px;background:#fff;padding:12px 13px;color:#24272d;font:inherit}
.tb-server-form .contact-form textarea{min-height:128px;resize:vertical}
.tb-server-form .contact-form input:focus,.tb-server-form .contact-form textarea:focus,.tb-server-form .contact-form select:focus{outline:2px solid rgba(198,167,124,.34);border-color:#c6a77c}
.tb-server-form .contact-form .grunion-field-wrap-textarea,.tb-server-form .contact-form .grunion-field-wrap-name,.tb-server-form .contact-form .grunion-field-wrap-email,.tb-server-form .contact-form .contact-submit{grid-column:1/-1}
.tb-server-form .contact-submit button,.tb-server-form .contact-submit input[type=submit],.tb-server-form button[type=submit],.tb-server-form input[type=submit]{appearance:none;-webkit-appearance:none;display:inline-flex!important;align-items:center;justify-content:center;min-height:48px;padding:0 26px!important;border-radius:6px!important;background:#c6a77c!important;color:#101010!important;text-decoration:none!important;font-weight:900!important;border:1px solid #c6a77c!important;white-space:nowrap;cursor:pointer;box-shadow:none!important;line-height:1!important}
.tb-server-form .contact-submit button:hover,.tb-server-form .contact-submit input[type=submit]:hover,.tb-server-form button[type=submit]:hover,.tb-server-form input[type=submit]:hover{background:#b99767!important;border-color:#b99767!important;color:#101010!important}
.tb-server-form .contact-submit{display:flex;justify-content:flex-start;align-items:center;margin-top:8px!important}
.tb-server-form .contact-form__error,.tb-server-form .form-error{grid-column:1/-1}
@media(max-width:720px){.tb-server-form .contact-form{grid-template-columns:1fr}.tb-server-form{padding:24px 20px}}
</style><script id="tb-server-form-submit">
(function(){
  function ready(fn){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn)}else{fn()}}
  function cleanUrl(url){try{var u=new URL(url,location.href);u.protocol='https:';u.search='';u.hash='';return u.toString()}catch(e){return location.href.split('#')[0].split('?')[0]}}
  ready(function(){
    document.querySelectorAll('.tb-server-form form').forEach(function(form){
      form.action=cleanUrl(form.action||location.href);
      form.method='post';
      if(form.dataset.tbAjaxReady==='1')return;
      form.dataset.tbAjaxReady='1';
      form.addEventListener('submit',function(event){
        event.preventDefault();
        if(form.reportValidity&&!form.reportValidity())return;
        var submit=form.querySelector('button[type="submit"],input[type="submit"]');
        var original=submit?(submit.tagName==='INPUT'?submit.value:submit.textContent):'';
        if(submit){submit.disabled=true;if(submit.tagName==='INPUT')submit.value='Sending...';else submit.textContent='Sending...'}
        var body=new URLSearchParams(new FormData(form));
        fetch(cleanUrl(form.action),{
          method:'POST',
          credentials:'same-origin',
          headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
          body:body.toString()
        }).then(function(res){return res.text().then(function(text){return{ok:res.ok,url:res.url,text:text}})})
        .then(function(result){
          var success=/contact-form-sent|Thank you for your response|thank you/i.test(result.url+' '+result.text);
          if(!result.ok||!success)throw new Error('Form submission did not return a success response.');
          form.closest('.tb-server-form').innerHTML='<h2>Thank you for your request.</h2><p>Your message has been sent to TrueBase. We will follow up by email as soon as possible.</p><p><a class="tb-btn" href="https://truebaseholding.com/truebase-products/">Back to Products</a></p>';
        }).catch(function(){
          var box=form.querySelector('.tb-form-error');
          if(!box){box=document.createElement('div');box.className='tb-form-error';box.style.gridColumn='1/-1';box.style.color='#9f2f24';box.style.fontWeight='800';form.prepend(box)}
          box.textContent='The form could not be sent. Please email partner@truebaseholding.com or try again.';
          if(submit){submit.disabled=false;if(submit.tagName==='INPUT')submit.value=original;else submit.textContent=original}
        });
      });
    });
  });
})();
</script>`;
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    let json = null;
    try { json = JSON.parse(x.responseText); } catch (_) {}
    return { ok: x.status >= 200 && x.status < 300, status: x.status, text: x.responseText, json };
  }
  function getNonce() {
    if (typeof wpApiSettings !== 'undefined' && wpApiSettings.nonce) return wpApiSettings.nonce;
    const admin = request('GET', base + '/wp-admin/post-new.php?post_type=page');
    const html = admin.text || '';
    for (const pattern of [/wpApiSettings[^<]+nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i, /"nonce":"([a-f0-9]+)"/i, /rest_nonce["']?\s*[:=]\s*["']([a-f0-9]+)["']/i]) {
      const match = html.match(pattern);
      if (match) return match[1];
    }
    throw new Error('Could not find WordPress REST nonce');
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[ch]);
  }
  function replacement(config) {
    return `<div class="tb-server-form"><h2>${esc(config.label)}</h2><p>${esc(config.intro)}</p>${config.form}</div>`;
  }
  const nonce = getNonce();
  const results = {};
  for (const [slug, config] of Object.entries(pages)) {
    const fetch = request('GET', base + '/wp-json/wp/v2/pages?slug=' + slug + '&context=edit', undefined, { 'X-WP-Nonce': nonce });
    const page = fetch.json && fetch.json[0];
    if (!page) {
      results[slug] = { ok: false, status: fetch.status, error: 'Page not found' };
      continue;
    }
    let content = page.content.raw || '';
    const before = content;
    content = content.replace(/<style id="tb-server-form-styles">[\s\S]*?<\/style>/g, '');
    content = content.replace(/<script id="tb-server-form-submit">[\s\S]*?<\/script>/g, '');
    content = formAssets + content;
    if (/<form\b[\s\S]*?mailto:partner@truebaseholding\.com[\s\S]*?<\/form>/i.test(content)) {
      content = content.replace(/<form\b[\s\S]*?mailto:partner@truebaseholding\.com[\s\S]*?<\/form>/i, replacement(config));
    } else if (!/\[contact-form/i.test(content)) {
      content = content.replace(/<\/main>/i, `<section class="tb-section tb-white"><div class="tb-wrap">${replacement(config)}</div></section></main>`);
    }
    const update = request('POST', base + '/wp-json/wp/v2/pages/' + page.id, JSON.stringify({
      content,
      excerpt: page.excerpt && page.excerpt.raw || ''
    }), {
      'X-WP-Nonce': nonce,
      'Content-Type': 'application/json'
    });
    request('GET', base + '/' + slug + '/?epc_purge_single=1');
    results[slug] = {
      ok: update.ok,
      status: update.status,
      id: page.id,
      changed: before !== content,
      hasMailtoAfter: /mailto:partner@truebaseholding\.com/i.test(content),
      hasContactForm: /\[contact-form/i.test(content),
      error: update.ok ? null : update.text.slice(0, 500)
    };
  }
  return JSON.stringify(results, null, 2);
})();
