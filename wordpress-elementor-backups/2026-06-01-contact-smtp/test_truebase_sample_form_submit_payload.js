(() => {
  const pageUrl = 'https://truebaseholding.com/truebase-request-samples-quote/';
  function request(method, url, body, headers = {}) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    for (const [k, v] of Object.entries(headers)) x.setRequestHeader(k, v);
    x.send(body === undefined ? null : body);
    return { status: x.status, url: x.responseURL, text: x.responseText };
  }
  const page = request('GET', pageUrl + '?epc_purge_single=1');
  const doc = new DOMParser().parseFromString(page.text, 'text/html');
  const form = Array.from(doc.querySelectorAll('form')).find(f => (f.querySelector('input[name="action"]') || {}).value === 'grunion-contact-form');
  if (!form) return JSON.stringify({ ok: false, error: 'No Jetpack contact form found', status: page.status }, null, 2);
  const params = new URLSearchParams();
  for (const el of Array.from(form.querySelectorAll('input,textarea,select'))) {
    if (!el.name) continue;
    params.set(el.name, el.value || '');
  }
  const values = {
    'businessemail': 'partner@truebaseholding.com',
    'companyname': 'Codex Test Company',
    'productinterest': 'Codex test - pet memorial products',
    'estimatedquantity': '10',
    'shippingregion': 'US',
    'targettimeline': 'Test submission on 2026-06-01',
    'projectdetails': 'Codex test submission to verify the TrueBase website server-side form sends correctly. Please ignore.'
  };
  for (const [suffix, value] of Object.entries(values)) {
    const field = Array.from(form.querySelectorAll('[name]')).find(el => el.name.toLowerCase().endsWith(suffix));
    if (field) params.set(field.name, value);
  }
  const submit = request('POST', form.action || pageUrl, params.toString(), {
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const submitted = /thank|sent|success|message has been sent|contact-form-success|form-submission/i.test(submit.text);
  const responseDoc = new DOMParser().parseFromString(submit.text, 'text/html');
  return JSON.stringify({
    ok: submit.status >= 200 && submit.status < 400,
    status: submit.status,
    responseUrl: submit.url,
    successSignal: submitted,
    title: responseDoc.title,
    h1: responseDoc.querySelector('h1') && responseDoc.querySelector('h1').textContent.trim(),
    notices: Array.from(responseDoc.querySelectorAll('.contact-form-submission, .contact-form-success, .form-error, .contact-form__error, .notice, .message'))
      .map(el => el.textContent.trim().replace(/\s+/g, ' '))
      .filter(Boolean)
      .slice(0, 20),
    textSample: responseDoc.body.textContent.replace(/\s+/g, ' ').slice(0, 1500)
  }, null, 2);
})();
