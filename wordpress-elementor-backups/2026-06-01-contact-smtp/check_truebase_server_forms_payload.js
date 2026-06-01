(() => {
  const slugs = [
    'truebase-contact',
    'truebase-request-samples-quote',
    'truebase-request-catalog',
    'truebase-become-a-partner'
  ];
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    return { status: x.status, text: x.responseText };
  }
  const out = {};
  for (const slug of slugs) {
    const res = request('GET', 'https://truebaseholding.com/' + slug + '/?epc_purge_single=1');
    const doc = new DOMParser().parseFromString(res.text, 'text/html');
    const forms = Array.from(doc.querySelectorAll('form')).map(form => ({
      action: form.getAttribute('action') || '',
      method: form.getAttribute('method') || '',
      className: form.getAttribute('class') || '',
      hasMailto: /^mailto:/i.test(form.getAttribute('action') || ''),
      fields: Array.from(form.querySelectorAll('input,textarea,select,button')).map(el => ({
        tag: el.tagName,
        type: el.getAttribute('type') || el.tagName.toLowerCase(),
        name: el.getAttribute('name') || '',
        value: el.getAttribute('value') || '',
        text: el.textContent.trim().slice(0, 60)
      })).slice(0, 30)
    }));
    out[slug] = {
      status: res.status,
      title: doc.title,
      h1: doc.querySelector('h1') && doc.querySelector('h1').textContent.trim(),
      formCount: forms.length,
      mailtoForms: forms.filter(form => form.hasMailto).length,
      contactFormShortcodeVisible: /\[contact-form|\[contact-field/i.test(doc.body.textContent),
      serverFormWrappers: doc.querySelectorAll('.tb-server-form').length,
      forms
    };
  }
  return JSON.stringify(out, null, 2);
})();
