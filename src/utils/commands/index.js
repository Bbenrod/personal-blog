const customImageCommand = require("./customImage");
const keywordReplaceCommand = require("./keywordReplace");

const commands = [keywordReplaceCommand, customImageCommand];

function applyCommands(md) {
  return commands.reduce((acc, commandFn) => commandFn(acc), md);
}

module.exports = applyCommands;
