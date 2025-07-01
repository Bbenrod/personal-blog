const fs = require("fs/promises");
const path = require("path");

const postsDir = path.join(__dirname, "..", "posts");

async function createPosts() {
  try {
    await fs.mkdir(postsDir, { recursive: true });

    for (let i = 1; i <= 10; i++) {
      const slug = `post-${i}`;
      const mdContent = `# Título del Post ${i}

Este es un contenido generado automáticamente para el post número ${i}.

## Lista de puntos

- Punto uno
- Punto dos
- Punto aleatorio: ${Math.floor(Math.random() * 100)}

\`\`\`js
console.log("Post número ${i}");
\`\`\`
`;

      const jsonContent = {
        title: `Título del Post ${i}`,
        slug,
        date: new Date(2025, 5, 30 - i).toISOString().split("T")[0], // fechas diferentes
        author: "Benjamin",
        tags: ["generado", "ejemplo", `tag${i}`],
        description: `Este es el resumen para el post número ${i}.`,
        thumbnail: `/images/${slug}-thumb.jpg`,
        published: true,
      };

      await fs.writeFile(path.join(postsDir, `${slug}.md`), mdContent, "utf8");
      await fs.writeFile(
        path.join(postsDir, `${slug}.json`),
        JSON.stringify(jsonContent, null, 2),
        "utf8"
      );
    }

    console.log("10 posts generados en carpeta 'posts'");
  } catch (error) {
    console.error("Error generando posts:", error);
  }
}

createPosts();
