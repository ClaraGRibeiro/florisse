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

    // Entra nas subpastas
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
      continue;
    }

    // Processa somente arquivos .jpg
    if (
      path.extname(entry.name).toLowerCase() !==
      ".jpg"
    ) {
      continue;
    }

    try {
      console.log(`Processando: ${fullPath}`);

      // O Sharp identifica o formato REAL do arquivo,
      // mesmo que a extensão esteja errada.
      const buffer = await sharp(fullPath)
        .jpeg({
          quality: 90,
          mozjpeg: true,
        })
        .toBuffer();

      // Salva primeiro em um arquivo temporário
      const tempPath = `${fullPath}.tmp`;

      fs.writeFileSync(tempPath, buffer);

      // Substitui o arquivo original
      fs.renameSync(tempPath, fullPath);

      // Confirma o formato final
      const metadata =
        await sharp(fullPath).metadata();

      console.log(
        `✓ Corrigido: ${entry.name} → ${metadata.format}`,
      );
    } catch (error) {
      console.error(
        `✗ Erro em ${fullPath}:`,
        error.message,
      );
    }
  }
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    console.error(
      `A pasta não foi encontrada: ${ROOT}`,
    );

    process.exit(1);
  }

  console.log(
    "Iniciando conversão dos arquivos .jpg...\n",
  );

  await processDirectory(ROOT);

  console.log(
    "\n✓ Conversão concluída.",
  );
}

main().catch((error) => {
  console.error(
    "\nErro inesperado:",
    error,
  );

  process.exit(1);
});