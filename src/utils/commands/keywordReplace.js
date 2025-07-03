const path = require("path");
const fs = require("fs");

const keywordsPath = path.join(__dirname, "..", "keywordMap.json");

let keywordMap = {};

try {
  const raw = fs.readFileSync(keywordsPath, "utf-8");
  keywordMap = JSON.parse(raw);
} catch (err) {
  console.warn("Cannot load keywordMap.json:", err);
}

function keywordReplaceCommand(md) {
  return md.replace(/::(.*?)::/g, (match, keyWord) => {
    return keywordMap[keyWord] || match;
  });
}

module.exports = keywordReplaceCommand;
