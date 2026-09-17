const sharp = require("sharp");
const path = require("path");

const input = path.join(
  __dirname,
  "public",
  "products",
  "tapetes",
  "tapete-janine",
  "cru-militar-alecrim-2.webp"
);

const output = path.join(
  __dirname,
  "public",
  "products",
  "tapetes",
  "tapete-janine",
  "cru-militar-alecrim-2.webp"
);

async function rotacionar() {
  try {
    await sharp(input)
      .rotate(90)
      .webp({
        quality: 90,
      })
      .toFile(output + ".tmp.webp");

    // Substitui o arquivo original
    const fs = require("fs");
    fs.renameSync(output + ".tmp.webp", output);

    console.log("Imagem rotacionada com sucesso!");
  } catch (error) {
    console.error("Erro ao rotacionar imagem:", error);
  }
}

rotacionar();
