const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");
const { marked } = require("marked");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

function addCustomCommands(md) {
  return md.replace(/::\[(.*?)\]\((.*?)\)::/g, (match, alt, url) => {
    return `<img src="${url}" alt="${alt}" class="custom-image">`;
  });
}

function clearMarkdown(dirtyHtml) {
  const cleanedInput = dirtyHtml.replace(
    /^[\u200B\u200C\u200D\u200E\u200F\uFEFF]+/,
    ""
  );
  const customHtml = addCustomCommands(cleanedInput);
  const rawHtml = marked.parse(customHtml);
  const safeHtml = DOMPurify.sanitize(rawHtml);
  return safeHtml;
}

module.exports = clearMarkdown;
