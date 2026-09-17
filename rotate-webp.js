const path = require("path");
const sharp = require("sharp");

const images = [
  "public/products/tapetes/tapete-hexagonos/cru-cinza-bege.webp",
];

async function rotateImages() {
  for (const imagePath of images) {
    const fullPath = path.join(__dirname, imagePath);

    try {
      const buffer = await sharp(fullPath)
        .rotate(90)
        .toBuffer();

      const tempPath = `${fullPath}.tmp`;

      require("fs").writeFileSync(
        tempPath,
        buffer,
      );

      require("fs").renameSync(
        tempPath,
        fullPath,
      );

      console.log(`✓ Corrigida: ${imagePath}`);
    } catch (error) {
      console.error(
        `✗ Erro em ${imagePath}:`,
        error.message,
      );
    }
  }
}

rotateImages();