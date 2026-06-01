(() => {
  function request(method, url) {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    x.send(null);
    return { status: x.status, text: x.responseText };
  }
  const res = request('GET', 'https://truebaseholding.com/truebase-contact/?epc_purge_single=1');
  const doc = new DOMParser().parseFromString(res.text, 'text/html');
  const buttons = Array.from(doc.querySelectorAll('a.tb-btn')).map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href')
  })).filter(a => /Email Us|Partner Application/i.test(a.text));
  const form = doc.querySelector('.tb-server-form form');
  return JSON.stringify({
    status: res.status,
    title: doc.title,
    buttons,
    hasAnchorTarget: !!doc.querySelector('#tb-contact-form'),
    hasAjaxScript: /tb-server-form-submit|fetch\(cleanUrl\(form\.action\)/.test(res.text),
    hasGmailRecipient: /joeyzhou1976@gmail\.com/.test(res.text),
    mailtoForms: Array.from(doc.querySelectorAll('form')).filter(f => /^mailto:/i.test(f.action || '')).length,
    formAction: form && form.getAttribute('action'),
    formMethod: form && form.getAttribute('method')
  }, null, 2);
})();
