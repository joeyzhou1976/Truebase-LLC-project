(() => {
  const get = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return {
      status: xhr.status,
      url: xhr.responseURL,
      text: xhr.responseText,
    };
  };

  const root = get("/wp-json/");
  let rootJson = null;
  try {
    rootJson = JSON.parse(root.text);
  } catch (error) {
    rootJson = null;
  }

  const routes = rootJson && rootJson.routes ? Object.keys(rootJson.routes) : [];
  const interestingRoutes = routes
    .filter((route) => /smtp|mail|wpforms|jetpack|contact|fluent|forminator|wpmail/i.test(route))
    .slice(0, 120);

  const plugins = get("/wp-admin/plugins.php");
  const tools = get("/wp-admin/tools.php");
  const pluginNames = Array.from(plugins.text.matchAll(/<strong>([^<]+)<\/strong>/g))
    .map((match) => match[1].replace(/&#8211;/g, "-").trim())
    .filter(Boolean)
    .slice(0, 160);
  const mailPluginHits = pluginNames.filter((name) => /smtp|mail|wpforms|jetpack|contact|fluent|forminator|newsletter/i.test(name));

  return JSON.stringify({
    currentUrl: location.href,
    wpJsonStatus: root.status,
    pluginsStatus: plugins.status,
    toolsStatus: tools.status,
    canAccessAdmin: plugins.status === 200 && /Plugins|plugin/i.test(plugins.text),
    interestingRoutes,
    mailPluginHits,
    allPluginNameSample: pluginNames.slice(0, 80),
  }, null, 2);
})();
