(() => {
  const pass = document.querySelector("#wp-mail-smtp-setting-smtp-pass");
  const row = pass ? pass.closest("tr, .wp-mail-smtp-setting-row, .wp-mail-smtp-setting-field, .wp-mail-smtp-setting") || pass.parentElement : null;
  const scope = row || document;
  const items = Array.from(scope.querySelectorAll("input, button, a, label, span, p"))
    .map((el) => ({
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute("type") || "",
      name: el.getAttribute("name") || "",
      id: el.id || "",
      className: el.className || "",
      value: /password/i.test(el.getAttribute("type") || "") ? "[password]" : String(el.value || "").slice(0, 120),
      text: String(el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 200),
      href: el.href || "",
      checked: Boolean(el.checked),
      disabled: Boolean(el.disabled),
    }));
  return JSON.stringify({
    href: location.href,
    passExists: Boolean(pass),
    passOuter: pass ? pass.outerHTML.replace(/value="[^"]*"/g, 'value="[redacted]"') : null,
    scopeText: scope.innerText ? scope.innerText.replace(/\s+/g, " ").slice(0, 1200) : "",
    items,
  }, null, 2);
})();
