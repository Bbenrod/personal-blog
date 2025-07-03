function customImageCommand(md) {
  return md.replace(/::\[(.*?)\]\((.*?)\)::/g, (match, alt, url) => {
    return `<img src="${url}" alt="${alt}" class="custom-image">`;
  });
}

module.exports = customImageCommand;
