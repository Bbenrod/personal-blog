# 🛤️ BlogItMD – Roadmap

BlogItMD is a minimalist blogging platform inspired by [Substack](https://substack.com/for-bloggers), designed so anyone can easily publish their blog. The roadmap is divided into backend and frontend to facilitate collaborative work.

---

## ✅ v0.1.0 – Personal MVP

### Backend

- [x] Reading posts in Markdown from the file system.
- [x] Uploading posts via form (`/blog/upload`).
- [x] Configurable routes (`BLOG_ROUTE`).
- [x] Basic session management (`express-session`, `MemoryStore`).
- [x] Sample posts generator.
- [x] Basic Markdown to HTML rendering.

### Frontend

- [x] Posts listing page.
- [x] Simple upload form.
- [x] Post preview before publishing.
- [ ] Minimal style improvements (optional).

---

## ✅ v0.2.0 – Commands + Multimedia

### Backend

- [x] Modular command system (`::command::`).
- [ ] Validation: prevent overwriting existing posts.
- [ ] Middleware to protect upload routes with minimal authentication.
- [ ] Define `/search` route (search by content or title).
- [x] Optional sync with external repository to store posts for client.

### Frontend

- [ ] Show errors when uploading already existing posts.
- [ ] Search page (`/search`).

---

## ⏳ v0.3.0 – Validation + Automation

### Backend

- [ ] Validate minimal post fields.
- [ ] First automated test suite.
- [ ] GitHub Actions for basic CI (tests, linting).
- [ ] Support for metadata (`posts.json` or YAML frontmatter).
- [ ] Basic SEO (tags, `title`, `description`).

### Frontend

- [ ] Improved error/validation messages.
- [ ] SEO-friendly structure (meta tags per post).

---

## 🔮 v0.4.0 – Community and Style

This version aims to open the project to the community, facilitate content consumption by third parties, and allow visual customization. An API will be added, style improvements inspired by professional personal blogs, and support for multiple content sources.

---

## 💬 v0.5.0 – Interaction

This version introduces social features: users, reactions, and comments. Basic authentication will be enabled, interaction within posts, and a minimal interface to manage content without coding.

---

## 🚀 v1.0.0 – Stable Production

### Backend

- [ ] Stable storage system.
- [ ] Support for persistent sessions (MongoDB, Redis).
- [ ] Clear production deployment guide.
- [ ] No-code content management from the browser.
- [ ] GitHub release tagged `v1.0.0`.

### Frontend

- [ ] Responsive, accessible, and clean theme.
- [ ] Minimum compatibility with mobile devices.
- [ ] Light/dark mode.

---

## 🎯 Future Ideas

- [ ] Interface internationalization (ES/EN).
- [ ] Support for customizable themes.
- [ ] Static site generator (serverless mode).
- [ ] CLI to create blogs (`npx create-blogitmd`).
