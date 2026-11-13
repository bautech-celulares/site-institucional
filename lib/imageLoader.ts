import manifest from "../data/imageManifest.json";

const widthsByImage = manifest as Record<string, number[]>;

/**
 * Loader do next/image para o export estático: usa o arquivo gerado por
 * scripts/optimize-images.mjs com a menor largura que atende o pedido
 * (ou a maior disponível, já que as originais são pequenas).
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const widths = widthsByImage[src];
  const best = widths ? (widths.find((w) => w >= width) ?? widths[widths.length - 1]) : width;
  return `/img/${src}-${best}.webp`;
}
