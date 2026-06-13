const fs = require('fs');
const path = require('path');

const root = '/Users/joeyzhou/Documents/New project';
const source = fs.readFileSync(path.join(root, 'truebase_site_media_registry_payload.js'), 'utf8');
const wrapped = `(() => {
  try {
    const result = eval(${JSON.stringify(source)});
    return result === undefined ? "__TRUEBASE_NO_RESULT__" : String(result);
  } catch (error) {
    return "TRUEBASE_PAYLOAD_ERROR: " + (error && (error.stack || error.message) || error);
  }
})();`;

const outFile = path.join(root, 'truebase_site_media_registry_eval_payload.js');
fs.writeFileSync(outFile, wrapped);
console.log(outFile);
