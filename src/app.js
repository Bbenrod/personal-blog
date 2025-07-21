require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const router = require("./routes");
const apiRoutes = require("./api");
const initPostSource = require("./posts/init");

const app = express();
const rootDir = path.resolve(__dirname, "..");

const PORT = process.env.PORT || 3000;
const BLOG_ROUTE = process.env.BLOG_ROUTE || "/blog";

app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "src", "views"));
app.use(express.static(path.join(rootDir, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: true,
  })
);

/*
  ⚠️ Este proyecto usa MemoryStore por simplicidad.
  ❗ Si vas a usarlo en producción, cambia el store por Redis, Mongo u otro.
  Ejemplo con Redis: https://github.com/tj/connect-redis
*/

initPostSource()
  .then(() => {
    app.use(`${BLOG_ROUTE}/api/`, apiRoutes);
    app.use(BLOG_ROUTE, router);

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize posts source:", err);
    process.exit(1);
  });
