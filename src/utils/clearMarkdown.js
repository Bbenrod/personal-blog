const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");
const { marked } = require("marked");
const applyCommands = require("./commands");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

function clearMarkdown(dirtyHtml) {
  const cleanedInput = dirtyHtml.replace(
    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]+/,
    ""
  );
  const customHtml = applyCommands(cleanedInput);
  const rawHtml = marked.parse(customHtml);
  const safeHtml = DOMPurify.sanitize(rawHtml);
  return safeHtml;
}

module.exports = clearMarkdown;
