// Gera as imagens responsivas do site (WebP) a partir de scripts/image-sources/*.png
// e grava o manifesto de larguras usado por lib/imageLoader.ts.
// Uso: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "scripts/image-sources";
const OUT = "public/img";
const QUALITY = 78;

// Larguras extras além da nativa (as originais são pequenas: não há ampliação)
const EXTRA_WIDTHS = {
  "tecnico-bautech-bancada": [96, 240], // avatar do balão/mockup + imagem da seção Sobre
  "celular-tela-trincada": [320],
  "cliente-preocupada-celular-com-defeito": [320],
  "garantia-conserto-celular": [320],
  "fachada-bautech-sao-bento-do-sapucai": [320],
};

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".png"))) {
  const name = path.basename(file, ".png");
  const { width } = await sharp(path.join(SRC, file)).metadata();
  const widths = [...new Set([...(EXTRA_WIDTHS[name] ?? []), width])].sort((a, b) => a - b);

  for (const w of widths) {
    const target = path.join(OUT, `${name}-${w}.webp`);
    await sharp(path.join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(target);
    console.log(`${target}  ${(fs.statSync(target).size / 1024).toFixed(1)} KB`);
  }
  manifest[name] = widths;
}

fs.writeFileSync("data/imageManifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("manifesto gravado em data/imageManifest.json");
