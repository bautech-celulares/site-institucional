# Bautech — Site institucional

Landing page da **Bautech Assistência Técnica** (São Bento do Sapucaí - SP), pensada para levar o visitante ao WhatsApp com um toque.

- **Stack:** Next.js 16 (App Router, exportação estática `output: "export"`), React 19, Tailwind CSS 4, TypeScript.
- **Hospedagem:** Cloudflare Pages (arquivos estáticos da pasta `out/`).
- **Sem backend, banco de dados ou login.**

## Rodando localmente

```bash
npm install
cp .env.example .env   # opcional: variáveis de produção
npm run dev            # http://localhost:3000
```

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `out/` |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Checagem de tipos |
| `node scripts/optimize-images.mjs` | Gera as imagens WebP responsivas (`public/img/`) e `data/imageManifest.json` a partir de `scripts/image-sources/` |
| `node scripts/generate-icons.mjs` | Gera `favicon.svg` e os ícones PNG (iOS, PWA, maskable) |

## Variáveis de ambiente

Definidas no painel do Cloudflare Pages (prefixo `NEXT_PUBLIC_`, entram no build):

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (padrão: `https://bautech.com.br`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (carrega só após o visitante permitir cookies) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de verificação do Search Console |

## Deploy (Cloudflare Pages)

- **Comando de build:** `npm run build`
- **Diretório de saída:** `out`
- Headers de segurança, cache e `noindex` do `*.pages.dev` ficam em `public/_headers`.
- No painel: desligar o Rocket Loader e o "Block AI bots"; ver a lista completa em `MEMORY.md` (Pendências).

## Estrutura

```
app/                 layout, página, 404, robots.ts, sitemap.ts, globals.css (tokens e animações)
components/sections/ seções da página (Hero, Serviços, Garantia, FAQ...)
components/ui/       botões, balão do WhatsApp, aviso de cookies, mockup, ícones
components/seo/      JSON-LD (StructuredData)
data/content.ts      fonte única de contatos, serviços, garantias, FAQs e depoimentos
lib/                 WhatsApp (mensagens), status da loja, consentimento, loader de imagens
scripts/             geração de imagens e ícones
public/              fontes, imagens, _headers, llms.txt, manifest
```

## Documentação do projeto

- [`MEMORY.md`](MEMORY.md): decisões aprovadas e rejeitadas, dados inegociáveis, pendências.
- [`PRODUCT.md`](PRODUCT.md): público, posicionamento e princípios.
- [`DESIGN.md`](DESIGN.md): direção visual.
- [`AGENTS.md`](AGENTS.md): regras para agentes de código (inclui a Diretriz Ponytail).
