const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function createPng(width, height) {
  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 2; // Color type: 2 (RGB)
  ihdrData[10] = 0; // Compression method: 0
  ihdrData[11] = 0; // Filter method: 0
  ihdrData[12] = 0; // Interlace method: 0
  const ihdr = createChunk("IHDR", ihdrData);

  // Scanline data (filter byte 0 + RGB)
  // Criamos uma imagem elegante de preview com as cores institucionais da Bautech:
  // Gradiente suave de azul escuro (#003A61) -> Azul Bautech (#006CB3) -> Ciano (#00B1E2)
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    const ny = y / height;

    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const pixelOffset = rowOffset + 1 + x * 3;

      // Cálculo de gradiente diagonal sofisticado
      const diag = (nx * 0.7 + ny * 0.3);

      // Interpolação:
      // Início: Azul Profundo (0, 75, 125)
      // Meio: Azul Bautech Oficial (0, 108, 179)
      // Fim: Ciano Bautech (0, 177, 226)
      let r = 0;
      let g, b;

      if (diag < 0.6) {
        const t = diag / 0.6;
        g = Math.round(58 + t * (108 - 58));
        b = Math.round(98 + t * (179 - 98));
      } else {
        const t = (diag - 0.6) / 0.4;
        g = Math.round(108 + t * (177 - 108));
        b = Math.round(179 + t * (226 - 179));
      }

      // Moldura sutil nas bordas para acabamento de card social
      if (x < 12 || x >= width - 12 || y < 12 || y >= height - 12) {
        // Borda sutil em azul escuro
        g = Math.max(30, g - 40);
        b = Math.max(60, b - 40);
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
    }
  }

  // IDAT Chunk (Compressed scanlines)
  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idat = createChunk("IDAT", compressedData);

  // IEND Chunk
  const iend = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc >>> 0, 0);

  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// Tabela padrão CRC32 para conformidade estrita com a especificação PNG ISO/IEC 15948
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const outputPath = path.join(__dirname, "../public/og-image.png");
const pngBuffer = createPng(1200, 630);
fs.writeFileSync(outputPath, pngBuffer);
console.log(`Open Graph image generated successfully: ${outputPath} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
