// Gera public/og.png (1200x630), a imagem Open Graph do site, sem dependências
// (só node:zlib e node:fs). Rode de novo se trocar a cor de destaque:
//   node scripts/gerar-og.mjs
//
// Por que um PNG estático: com output: "export", o opengraph-image.tsx do Next
// gera o arquivo sem extensão em out/ ("opengraph-image"), e o Cloudflare Pages
// não garante Content-Type image/png para ele. Ver docs/progresso.md (T18).
//
// As cores repetem os tokens de src/app/globals.css (o script não lê CSS).
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const LARGURA = 1200;
const ALTURA = 630;

const FUNDO = "#0a0a0a"; // --color-bg
const LINHA_GRADE = "#141414"; // branco a 4% sobre o fundo (grade do Hero)
const BORDA = "#262626"; // --color-border
const ACENTO = "#8b6cff"; // --color-accent (troque aqui junto com o globals.css)

function rgb(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const pixels = Buffer.alloc(LARGURA * ALTURA * 3);

function pintar(x0, y0, x1, y1, hex) {
  const [r, g, b] = rgb(hex);
  for (let y = Math.max(0, y0); y < Math.min(ALTURA, y1); y++) {
    for (let x = Math.max(0, x0); x < Math.min(LARGURA, x1); x++) {
      const i = (y * LARGURA + x) * 3;
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
    }
  }
}

function circulo(cx, cy, raio, hex) {
  const [r, g, b] = rgb(hex);
  for (let y = cy - raio; y <= cy + raio; y++) {
    for (let x = cx - raio; x <= cx + raio; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= raio ** 2) {
        const i = (y * LARGURA + x) * 3;
        pixels[i] = r;
        pixels[i + 1] = g;
        pixels[i + 2] = b;
      }
    }
  }
}

// Fundo e grade de 48 px (mesmo motivo visual do Hero).
pintar(0, 0, LARGURA, ALTURA, FUNDO);
for (let x = 48; x < LARGURA; x += 48) pintar(x, 0, x + 1, ALTURA, LINHA_GRADE);
for (let y = 48; y < ALTURA; y += 48) pintar(0, y, LARGURA, y + 1, LINHA_GRADE);

// Faixa de acento no topo, hairline e ponto de acento no rodapé.
pintar(0, 0, LARGURA, 12, ACENTO);
pintar(80, 520, LARGURA - 80, 522, BORDA);
circulo(88, 566, 8, ACENTO);
// Sem texto embutido (não depende de fonte). Para uma imagem com nome e cargo,
// substitua public/og.png por uma arte própria de 1200x630 (PNG ou JPG).

// Codificação PNG (RGB 8 bits, filtro 0 por linha).
const linhas = Buffer.alloc((LARGURA * 3 + 1) * ALTURA);
for (let y = 0; y < ALTURA; y++) {
  linhas[y * (LARGURA * 3 + 1)] = 0;
  pixels.copy(linhas, y * (LARGURA * 3 + 1) + 1, y * LARGURA * 3, (y + 1) * LARGURA * 3);
}

const TABELA_CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = TABELA_CRC[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function bloco(tipo, dados) {
  const tamanho = Buffer.alloc(4);
  tamanho.writeUInt32BE(dados.length);
  const corpo = Buffer.concat([Buffer.from(tipo, "ascii"), dados]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(corpo));
  return Buffer.concat([tamanho, corpo, crc]);
}

const cabecalho = Buffer.alloc(13);
cabecalho.writeUInt32BE(LARGURA, 0);
cabecalho.writeUInt32BE(ALTURA, 4);
cabecalho[8] = 8; // bits por canal
cabecalho[9] = 2; // RGB
cabecalho[10] = 0;
cabecalho[11] = 0;
cabecalho[12] = 0;

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  bloco("IHDR", cabecalho),
  bloco("IDAT", deflateSync(linhas, { level: 9 })),
  bloco("IEND", Buffer.alloc(0)),
]);

const destino = new URL("../public/og.png", import.meta.url);
writeFileSync(destino, png);
console.log(`public/og.png gerado (${LARGURA}x${ALTURA}, ${png.length} bytes)`);
