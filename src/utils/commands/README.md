# 📚 Custom Commands

This folder contains **custom commands** that are applied to Markdown content before converting it to HTML.

---

## 🚀 What is a Custom Command?

A custom command is a function that takes a Markdown string as input and returns a transformed Markdown string, applying specific modifications. For example:

- Replacing special patterns with HTML tags.
- Replacing keywords with their full meanings.
- Adding custom tags or formatting.

---

## 🛠️ How to Add a New Command?

1. Create a `.js` file inside this folder with the **same name as the command**, e.g., `customImage.js`.
2. Inside the file, export a function that **ends with `command`** in its name and receives the Markdown text (`md`), returning the modified text.

```js
function myCustomCommand(md) {
  // Your logic here
  return md.replace(/pattern/, "replacement");
}

module.exports = myCustomCommand;
```

3. Import and add your command to the list in `index.js` so it gets applied automatically.

---

## ⚙️ Internal Workflow

- In `index.js`, each command is imported and the function `applyCommands(md)` applies all commands sequentially.
- The `clearMarkdown.js` utility uses `applyCommands` to process Markdown before converting it to safe HTML.

---

## ✨ Existing Commands Examples

- `customImage.js`: Replaces the pattern `::[text](url)::` with a custom `<img>` tag.
- `keywordReplace.js`: Replaces keywords wrapped in `::KEYWORD::` with corresponding values defined in a JSON file.

---

## 📌 Best Practices

- Name your command file after the command’s purpose.
- Name your function ending with `command`, e.g., `keywordReplaceCommand`.
- Use clear and efficient regular expressions.
- Always return the text, even if no matches are found.
- Avoid modifying text outside your command’s scope to prevent conflicts.
- Document your command with comments and examples.

---

## 🤝 Want to Contribute?

Welcome! Just create your command following this guide and open a pull request.

---

**Thanks for keeping our command system clean and modular!** 🚀✨
