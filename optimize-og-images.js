const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(
  __dirname,
  "public",
  "products",
);

async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name,
    );

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    if (
      entry.name.toLowerCase() !== "image.jpg"
    ) {
      continue;
    }

    try {
      const originalStats =
        fs.statSync(fullPath);

      const originalSize =
        originalStats.size;

      console.log(
        `\nProcessando: ${fullPath}`,
      );

      const buffer = await sharp(fullPath)
        .jpeg({
          quality: 82,
          mozjpeg: true,
        })
        .toBuffer();

      const tempPath = `${fullPath}.tmp`;

      fs.writeFileSync(tempPath, buffer);
      fs.renameSync(tempPath, fullPath);

      const newStats =
        fs.statSync(fullPath);

      const newSize = newStats.size;

      console.log(
        `✓ ${formatBytes(originalSize)} → ${formatBytes(newSize)}`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(
        `✗ Erro em ${fullPath}: ${message}`,
      );
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log(
    "Otimizando imagens OG...\n",
  );

  await processDirectory(ROOT);

  console.log(
    "\n✓ Otimização concluída.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});