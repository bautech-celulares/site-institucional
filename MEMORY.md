# Memória do Projeto — Bautech Assistência Técnica

> **Histórico vivo de decisões, aprendizados e diretrizes técnicas do projeto.**  
> *Atualizado continuamente para garantir consistência e continuidade entre sessões.*  
> Última revisão: 13/11/2026 (pacote de melhorias, fases 0 a 6).

---

## 1. Decisões aprovadas

- **Dados Oficiais de Negócio (Invioláveis):**
  - **Endereço físico:** R. Cândido José da Silva, 161 - Centro, São Bento do Sapucaí - SP, CEP 12490-000.
  - **Telefone / WhatsApp:** (12) 99153-5658.
  - **Instagram:** `@bautech_celulares` (`https://www.instagram.com/bautech_celulares/`).
  - **Garantia:** 90 dias formal por escrito para troca de tela; 60 dias para troca de bateria; 30 dias para conector e demais serviços.
  - **Fonte única:** `data/content.ts` (contatos, serviços com `warrantyDays`, garantias, FAQs, depoimentos). Selos de garantia e JSON-LD derivam daí.

- **Hierarquia Visual e Fluxo Estrito na Versão Mobile (Desktop 100% Preservado):**
  - **Hero:** imagem do smartphone trincado **antes** do título (`order-1 lg:order-2`), com selo de 4,9 estrelas. Sem faixa de informações abaixo do Hero (removida por decisão do usuário).
  - **Cabeçalho mobile:** apenas logo e hambúrguer. O menu aberto tem somente os 4 links, **sem botões de WhatsApp** (decisão do usuário). O botão "Chamar no WhatsApp" existe só a partir de `sm`.
  - **Sessão Serviços:** carrossel avança 1 card a cada 3,8s até o fim, sem loop; só roda enquanto está visível na tela e cessa ao primeiro toque. Indicador de pontos no mobile.
  - **Sessão Do WhatsApp à retirada:** botão de CTA no final da seção, após os 4 passos.
  - **Sessão Por que consertar:** botão de CTA no final, após os 4 cards.
  - **Sessão de Garantia:** Imagem -> Título -> Subtítulo -> Cards (Bateria = 60 dias) -> Botão.
  - **Sessão Bautech (Sobre):** Título -> Imagem (selo 10+ anos) -> Texto (inclui bloco "Em resumo") -> Botão.
  - **Sessão Onde Estamos:** Título -> Imagem (fachada) -> Texto (Endereço e Telefone) -> Card (Horários) -> Botão.

- **Janela de Atendimento Interativo no WhatsApp (Estilo Joinchat):**
  - Botão flutuante alterna o balão (sempre montado, `data-open`, transição via `@starting-style`). Cabeçalho `#0B5A4B`, corpo `#ECE5DD`, CTA verde "Sim! Falar no WhatsApp.", badge pulsante "1".
  - Fecha ao clicar fora, com `Escape` ou no botão fechar. No mobile só aparece após rolar (`scrollY > 260px`) e **sobe acima do aviso de cookies** enquanto ele estiver aberto.
  - Texto do balão: "Técnico online".

- **Status de Atendimento em Tempo Real** (`lib/storeStatus.ts`, `lib/useStoreStatus.ts`, fuso `America/Sao_Paulo`, `useSyncExternalStore`):
  - Seg a Sex 9h às 18h; Sábado 9h30 às 12h; Domingo fechado.
  - Linha do Hero (`StoreStatusLine`): aberto = "Loja no Centro • Resposta em até 5min" (texto definido pelo usuário); fechado = "Loja fechada agora • <retorno real>".

- **Intenções Inteligentes de WhatsApp (`WHATSAPP_INTENTS` em `lib/whatsapp.ts`):** mensagem pré-formatada por seção (hero, painPoints, about, warranty, faq, location, footer, floating) e por serviço, com campos de modelo e defeito.

- **Design System & Acessibilidade:**
  - Tokens no Tailwind 4 (`app/globals.css`): Azul `#006CB3`, Ciano `#00B1E2`, Superfície `#EAF5FB`, Grafite `#302E2C`, Verde WhatsApp `#25D366`, mais `brand-on-dark` (`#CCD1D1`) e `brand-on-blue` (`#E0F0FA`). Evitar hex solto nos componentes.
  - Estrelas em âmbar (`text-amber-500`/`amber-300`) por contraste; textos de leitura com piso de 14px; alvos de toque de 44px; link "Pular para o conteúdo"; anel de foco branco em fundos escuros (`Button` variantes `cyan` e `white`).
  - Craft floor: proibidos kickers/eyebrows em caixa alta acima de `h1`/`h2`.
  - Ícones decorativos com `aria-hidden`; logotipo com `role="img"`.

- **Segurança (Cloudflare Pages, site estático):**
  - Headers em **`public/_headers`** (não em `next.config.ts`): `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ampliada, HSTS, COOP, CORP e `Content-Security-Policy-Report-Only`. Regra `X-Robots-Tag: noindex` para `*.pages.dev` (inclusive previews por commit).
  - **Consentimento LGPD real:** `lib/consent.ts` (store com `useSyncExternalStore`), `components/ui/Analytics.tsx` carrega o GTM **somente após "Permitir"**; "Preferências de cookies" no rodapé reabre a escolha (recarrega se já havia permitido).
  - JSON-LD serializado com `<` -> `<`; links externos com `rel="noopener noreferrer"`.

- **Desempenho (imagens, JS, fontes):**
  - Imagens próprias: originais em `scripts/image-sources/`, `node scripts/optimize-images.mjs` gera WebP em `public/img/` e `data/imageManifest.json`; `lib/imageLoader.ts` (loader custom do `next/image`) escolhe a largura. Hero: 525 KB PNG -> 29 KB WebP. As originais são pequenas (Hero 540x497; cards de serviço 282x142).
  - Ícones/PWA: `node scripts/generate-icons.mjs` gera `favicon.svg` vetorial e PNGs (iOS, 192, 512, maskable).
  - Partículas da garantia em **CSS puro** (`components/ui/sparkles.tsx`); removidos `tsparticles`, `framer-motion` e `lucide-react` (ícones inline em `components/ui/icons.tsx`). JS total ~700 KB (~189 KB brotli).
  - 4 fontes pré-carregadas (Mirano Bold, Metropolis Regular/Medium/Bold). Cache: `/_next/static` imutável, `/img` e `/fonts` 30 dias.
  - `ScrollReveal` é só marcação; um único `RevealController` (IntersectionObserver) esconde apenas blocos abaixo da dobra (conteúdo visível sem JS).

- **Animações (CSS nativo, `transform`/`opacity`, `prefers-reduced-motion` respeitado):**
  - Animações registradas em `@theme` (`--animate-*`), curva `cubic-bezier(0.16,1,0.3,1)`. **A imagem do Hero não é animada** (protege o LCP); texto e selo entram suavemente.
  - Balão do WhatsApp e menu mobile com entrada/saída; FAQ desliza (`::details-content`, `interpolate-size`); marquee com máscara e pausa em hover/foco/toque; mockup do iPhone pausa fora da tela e, com movimento reduzido, mostra a conversa completa.

- **SEO Local e GEO:**
  - Título "Conserto de Celular em São Bento do Sapucaí | Bautech". JSON-LD em `@graph` (`MobilePhoneStore`, `WebSite`, `WebPage`, `FAQPage`) em `components/seo/StructuredData.tsx`. **`ElectronicsRepairShop` não existe no schema.org** (não usar).
  - FAQ com 9 perguntas em `<details>` nativo (todas as respostas no HTML). `sitemap.ts` usa `CONTENT_UPDATED` (atualizar ao mudar conteúdo). `robots.ts` libera crawlers de IA; `public/llms.txt` com os fatos do negócio.
  - Depoimentos **somente reais** (Google), identificados por iniciais (`REVIEWS` em `data/content.ts`). Sem `review[]` no schema (avaliação própria é "self-serving" para o Google); só `aggregateRating` 4,9 / 16.
  - Open Graph: `metadataBase` via `SITE_URL`, `public/og-image.png` 1200x630 (37 KB), `twitter: summary_large_image`.
  - 404 personalizado (`app/not-found.tsx`) e `app/global-error.tsx`.

- **Minimalismo & Eficiência (Diretriz Ponytail):** escada de 7 degraus no `AGENTS.md`; evitar dependências, preferir recursos nativos.

---

## 2. Decisões rejeitadas

- Botões repetitivos e genéricos de WhatsApp soltos no carrossel de serviços.
- Endereço provisório da Rua Senador Rodolfo Miranda (o único correto é R. Cândido José da Silva, 161).
- Bibliotecas pesadas de animação/ícones (Framer Motion, Lottie, tsparticles, lucide): removidas de fato nesta revisão.
- Arquivos mortos de templates anteriores.
- Botão flutuante cobrindo a primeira dobra no mobile.
- **Faixa de confiança abaixo do Hero** e **botões de WhatsApp no menu mobile** (rejeitados pelo usuário em 13/11/2026).
- Depoimentos inventados ou com autoria trocada; `review[]` no JSON-LD.
- `content-visibility: auto` nas seções (desloca âncoras do menu) e unificar a imagem duplicada de Sobre/Onde estamos sem teste visual.
- Imagens hospedadas em CDN de terceiros (`cdn.builder.io/.../TEMP`).

---

## 3. Alterações realizadas

- Projeto consolidado na raiz `bautech/` (Next.js 16 App Router, `output: "export"`, Tailwind 4, React 19). Legados `meu-site/` e `_backup_antigravity_scaffold/` removidos após o deploy no Cloudflare Pages.
- Pacote de melhorias (branch `feat/pacote-melhorias`), em fases: 0 veracidade (depoimentos, garantia no schema, FAQ no HTML), 1 segurança, 2 desempenho, 3 animações, 4 design, 5 SEO/GEO, 6 documentação.
- Diretórios: `app/`, `components/{sections,ui,seo}/`, `data/`, `lib/`, `scripts/`, `public/` (`_headers`, `img/`, `fonts/`, `llms.txt`, `manifest.json`).

---

## 4. Problemas encontrados

- (Histórico) Hidratação quebrada por extensão que injeta atributo no `<body>`; race condition de workers do Next no Windows (`EPERM`); lint `set-state-in-effect`; sobreposição do botão flutuante no mobile; dados cadastrais divergentes.
- (Auditoria 13/11/2026) 4 de 6 depoimentos não existiam no Google; tipo de schema inválido (`ElectronicsRepairShop`); garantia da bateria como 90 dias no schema; respostas do FAQ ausentes do HTML; animação de entrada do Hero e do aviso de cookies nunca rodava (classes `motion-safe:animate-*` não geradas no Tailwind 4); GTM carregava antes do consentimento; 286 KB de JS só para partículas; imagens sem `srcset` e favicons de 105 KB; mockup travado em 1 mensagem com movimento reduzido (estado inicial calculado na hidratação); recarga ao revogar consentimento nunca disparava.
- Lições: `next dev` com Fast Refresh pode deixar aba antiga sem interatividade após mudar hooks (recarregar com Ctrl+Shift+R); verificar visualmente (captura de tela) mudanças de grid.

---

## 5. Soluções aplicadas

Ver as seções 1 e 3. Fluxo de verificação usado: `npx tsc --noEmit`, `npm run lint`, `npm run build`, inspeção de `out/` (JSON-LD, CSS, preloads) e testes em Chrome headless (menu, balão, mockup, reduced motion) com capturas de tela.

---

## 6. Pendências

- **CSP:** está em `Report-Only` com `cdn.builder.io` já removido. Validar em um preview `*.pages.dev` (sem violações no console, GTM só após consentimento) e trocar para `Content-Security-Policy`.
- **Cloudflare (manual):** Always Use HTTPS, TLS mínimo 1.2, HTTP/3, DNSSEC, Bot Fight Mode, redirecionar `www` para o domínio raiz, Rocket Loader desligado, **desligar "Block AI bots"** (anula a liberação do `robots`).
- **Variáveis no Cloudflare Pages:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (o `.env` local não as define).
- **Dados do cliente:** link direto do Perfil da Empresa no Google (substitui `mapsUrl`/`googleReviewsUrl`), conferir coordenadas do JSON-LD no pino do Maps, formas de pagamento, marcas atendidas e cidades vizinhas (para novas FAQs), domínio final.
- **Perfil e diretórios:** completar o Perfil da Empresa no Google, pedir novas avaliações (as 16 têm mais de um ano), Bing Places, Apple Business Connect, Search Console e Bing Webmaster.
- **Imagens:** fotos dos cards de serviço em resolução maior (originais de 282x142 ficam suaves no mobile).
- Selo azul de "verificado" no balão e no mockup imita selo oficial que a conta não possui; avaliar trocar por indicador neutro.
- Testar visualmente em Safari e Firefox; rodar Lighthouse mobile em um preview (metas: Performance >= 95, LCP < 2,0s, CLS < 0,05).
- Validação de conversão com usuários reais no mobile e tags analíticas (GA4/Meta Pixel) quando solicitado.

---

## 7. Próximos passos

1. Subir a branch `feat/pacote-melhorias` como preview no Cloudflare Pages e validar CSP, Lighthouse e o fluxo de consentimento.
2. Executar a rodada final de **/impeccable polish** (micro-espaçamentos e contrastes finos).
3. Resolver as pendências de dados do cliente e do painel Cloudflare; depois migrar a CSP para modo de aplicação.
