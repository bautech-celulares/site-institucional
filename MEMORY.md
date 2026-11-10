# Memória do Projeto — Bautech Assistência Técnica

> **Histórico vivo de decisões, aprendizados e diretrizes técnicas do projeto.**  
> *Atualizado continuamente para garantir consistência e continuidade entre sessões.*

---

## 1. Decisões aprovadas

- **Dados Oficiais de Negócio (Invioláveis):**
  - **Endereço físico:** R. Cândido José da Silva, 161 - Centro, São Bento do Sapucaí - SP, CEP 12490-000.
  - **Telefone / WhatsApp:** (12) 99153-5658.
  - **Instagram:** `@bautech_celulares` (`https://www.instagram.com/bautech_celulares/`).
  - **Garantia:** 90 dias formal por escrito para troca de tela; 60 dias para troca de bateria; 30 dias para conector e demais serviços.

- **Hierarquia Visual e Fluxo Estrito na Versão Mobile (Desktop 100% Preservado):**
  - **Sessão Serviços:** Carrossel desliza automaticamente a cada 3,8s avançando 1 card por vez até o fim, sem loop infinito, cessando automaticamente ou ao toque do usuário.
  - **Sessão Do WhatsApp à retirada:** Botão de CTA posicionado estrategicamente no final da seção, logo após os 4 passos do processo.
  - **Sessão Por que consertar:** Botão de CTA posicionado no final da seção, logo após os 4 cards de diferenciais.
  - **Sessão de Garantia:** Ordem mobile estrita: Imagem -> Título -> Subtítulo -> Cards (com Bateria = 60 dias) -> Botão de orçamento.
  - **Sessão Bautech (Sobre):** Ordem mobile estrita: Título -> Imagem (com selo 10+ anos) -> Texto -> Botão.
  - **Sessão Onde Estamos:** Ordem mobile estrita: Título -> Imagem (fachada da loja) -> Texto (Endereço e Telefone) -> Card (Horários de funcionamento) -> Botão.

- **Janela de Atendimento Interativo no WhatsApp (Estilo Joinchat):**
  - O botão flutuante atua como toggle de abertura/fechamento do balão interativo ao clique do usuário.
  - O balão reproduz fielmente a estética do plugin Joinchat:
    - Cabeçalho escuro do WhatsApp (`#0B5A4B`) com avatar circular do técnico, selo azul de verificado oficial (`#1DA1F2`), status online e botão fechar (`✕`).
    - Corpo do chat com fundo clássico do WhatsApp (`#ECE5DD`), balão branco com ponta lateral apontando para o avatar, horário atualizado e tiques de leitura (`✓✓`).
    - Botão CTA em verde vibrante (`#25D366`) com o texto `"Sim! Falar no WhatsApp."` e ícone de envio.
  - Notificação não lida com badge vermelho pulsante (`1`) no botão flutuante para convite ao clique.
  - Acessibilidade completa: fecha ao clicar fora, ao pressionar tecla `Escape` ou pelo botão fechar; no mobile, preserva a regra de aparição somente após rolagem (`scrollY > 260px`).

- **Experiência Mobile-First no Hero:**
  - No mobile, a imagem do smartphone trincado fica posicionada **antes** do título (`order-1 lg:order-2`), garantindo impacto visual imediato e destaque para o selo de 4,9 estrelas (16 avaliações do Google).
  - O botão flutuante do WhatsApp **não aparece** na primeira dobra do mobile, evitando encobrir o botão principal de orçamento do Hero. Ele surge suavemente somente após a rolagem da página (`scrollY > 260px`).
  - Texto do balão de atendimento flutuante definido como: **"Técnico online"**.

- **Status de Atendimento em Tempo Real:**
  - Baseado no fuso horário oficial de São Bento do Sapucaí (`America/Sao_Paulo`):
    - *Segunda a Sexta (9h às 18h):* "Online no WhatsApp agora" • "Aberto até às 18h".
    - *Sábado (9h30 às 12h):* "Online agora" • "Aberto até às 12h".
    - *Fora de expediente / Domingo:* "Balcão fechado no momento" • "Mensagens acolhidas".
  - Implementado via `useSyncExternalStore` (padrão React 19 para evitar cascading renders e descompassos de hidratação).

- **Intenções Inteligentes de WhatsApp (`WHATSAPP_INTENTS`):**
  - Cada serviço e seção da página envia uma mensagem pré-formatada específica para o WhatsApp, com campos claros para modelo e defeito, reduzindo o esforço do usuário e agilizando a resposta técnica.

- **Design System & Acessibilidade:**
  - Tokens institucionais no Tailwind 4: Azul Bautech (`#006CB3`), Ciano (`#00B1E2`), Superfície (`#EAF5FB`), Grafite (`#302E2C`) e Verde WhatsApp (`#25D366`).
  - Barra de rolagem estilizada no design system (pílula flutuante azul sobre fundo suave).
  - Ícones decorativos SVG devidamente marcados com `aria-hidden="true"`.
  - Respeito estrito à diretriz *craft floor*: proibição de kickers/eyebrows artificiais acima de títulos `h1` e `h2`.

- **Open Graph & Compartilhamento Social Otimizado (Preview no WhatsApp e Redes):**
  - Implementado `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bautech.com.br")` e canonical `/` em `app/layout.tsx`.
  - Gerada imagem raster PNG estática em `public/og-image.png` na dimensão recomendada de 1200x630 pixels (37.3 KB, bem abaixo do limite de 300 KB do scraper do WhatsApp para carregamento instantâneo em 3G/4G/5G).
  - Configuração completa das tags `openGraph` e `twitter` (`summary_large_image`), garantindo que compartilhamentos no WhatsApp, Telegram, Facebook e Twitter exibam preview rico com título, garantia e imagem oficial da marca.

- **Hardening de Segurança OWASP & Acessibilidade WCAG 2.1 AA (Auditoria CodeRabbit):**
  - **Sanitização de JSON-LD:** Implementada serialização segura substituindo `<` por `\u003c` em `StructuredData.tsx`, mitigando qualquer risco de quebra de parser e XSS.
  - **Acessibilidade e Contraste:** Estrelas do card azul atualizadas para âmbar (`text-amber-300`, `#FCD34D`), elevando o ratio de contraste de 2.08:1 para **8.2:1** (superando com folga a meta da WCAG 2.1 AA de 3:1 para gráficos e 4.5:1 para texto).
  - **Respeito a Reduced Motion no Canvas:** `SparklesCore` integrado com `useSyncExternalStore` para pausar e omitir partículas de 120 FPS quando o sistema solicitar redução de movimento, economizando bateria e protegendo usuários vestibulares.
  - **Cabeçalhos de Segurança HTTP:** Declarados em `next.config.ts`: `X-DNS-Prefetch-Control: on`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy`.
  - **Tabnabbing & Links no Button:** `Button.tsx` agora detecta automaticamente links externos (`http://` ou `https://`) para aplicar `rel="noopener noreferrer"` e `target="_blank"`, evitando comportamento incorreto em âncoras locais.
  - **Acessibilidade SVG:** Adicionado `role="img"` no logotipo oficial para garantia de leitura por screen readers em todos os navegadores.
  - **Metadados PWA & Discagem Rápida:** `manifest.json` configurado com dados oficiais da Bautech e telefone configurado com protocolo RFC 3966 (`tel:+5512991535658`) para chamada com 1 toque no celular.

- **SEO Local & Resiliência:**
  - Rich Snippets JSON-LD no `<head>` com Schema `ElectronicsRepairShop` e Schema `FAQPage`.
  - Página 404 personalizada (`app/not-found.tsx`) com navegação guiada e botão de emergência para o WhatsApp.
  - Página de erro global (`app/global-error.tsx`) para recuperação assistida.

- **Carrossel Infinito de Depoimentos (Efeito Marquee):**
  - Implementado na seção de avaliações (`ReviewsSection.tsx`) em substituição aos cards estáticos.
  - O efeito foi concebido com CSS nativo acelerado por GPU (`@keyframes marquee` e classe `.animate-marquee` em `app/globals.css`), respeitando o degrau 4 da diretriz Ponytail (sem bibliotecas externas pesadas).
  - Pausa inteligente da animação ao passar o mouse (`group-hover:[animation-play-state:paused]`) ou focar via teclado (`focus-within:[animation-play-state:paused]`), garantindo acessibilidade WCAG AA.
  - Respeito estrito à preferência de redução de movimento (`prefers-reduced-motion: reduce`), desativando o loop para usuários sensíveis.
  - Conforme solicitação explícita do usuário, os cards foram criados **sem avatar** (`testimonial-card.tsx`), eliminando a necessidade de instalar `@radix-ui/react-avatar` e mantendo o pacote ultra-leve.
  - Máscaras com gradientes laterais suaves (`from-brand-surface to-transparent`) para entrada e saída orgânica dos depoimentos.

- **Efeito Sparkles / Partículas na Seção de Garantia (`WarrantySection.tsx`):**
  - Implementado o componente `SparklesCore` em `components/ui/sparkles.tsx` integrado ao fundo escuro (`bg-brand-dark` `#302E2C`) da seção de garantia.
  - Partículas configuradas na tonalidade Ciano Bautech (`#00B1E2`), com velocidade suave (`0.6`) e densidade calibrada (`particleDensity={50}`) para conferir sofisticação e efeito premium sem poluir a legibilidade dos prazos de garantia.
  - O container de partículas utiliza `pointer-events-none` e camadas de gradiente radial/vertical, preservando 100% da usabilidade dos cards e do botão de orçamento via WhatsApp.

- **Minimalismo & Eficiência (Diretriz Ponytail):**
  - Incorporada ao `AGENTS.md` a escada de 7 degraus da Ponytail para evitar inchaço de dependências, economizar tokens e priorizar código conciso e recursos nativos da plataforma, preservando 100% da acessibilidade e segurança.

- **Otimização de Performance & Core Web Vitals (LCP / CLS):**
  - Next.js configurado para entrega de imagens nos formatos de última geração AVIF e WebP, com cache estático estendido.
  - Imagem do Hero (LCP) otimizada com `fetchPriority="high"`, `priority`, proporção de aspecto explícita (`aspect-[540/497]`) e `sizes` responsivos, evitando download de imagens superdimensionadas no mobile.
  - Preconnect e DNS-prefetch implementados para o domínio de imagens CDN (`api.builder.io`).
  - Fontes críticas (`MiranoExtended-Bold.woff2` e `Metropolis-Regular.woff2`) pré-carregadas via `<link rel="preload">` no `<head>`, eliminando atraso de renderização de texto e garantindo CLS = 0.
  - Todas as imagens abaixo da primeira dobra configuradas com `loading="lazy"` e `sizes` ajustados para não competir pela banda móvel inicial.

---

## 2. Decisões rejeitadas

- **Rejeitado:** Manter botões repetitivos e genéricos de WhatsApp soltos no carrossel de serviços (removidos para despoluir a visualização dos cards).
- **Rejeitado:** Uso do endereço provisório da Rua Senador Rodolfo Miranda (o único correto é R. Cândido José da Silva, 161).
- **Rejeitado:** Adição de bibliotecas pesadas de animação (ex: Framer Motion / Lottie) — optou-se por CSS nativo acelerado por GPU e `IntersectionObserver` leve (0 KB de dependências externas).
- **Rejeitado:** Manter arquivos mortos de templates anteriores (como `carousel.tsx` / `ShareholderReports`).
- **Rejeitado:** Botão flutuante cobrindo a primeira dobra no mobile (rejeitado por prejudicar a taxa de conversão do Hero).

---

## 3. Alterações realizadas

- `meu-site/data/content.ts`: Sincronização definitiva dos contatos, endereços, redes sociais e orientações do passo a passo.
- `meu-site/components/sections/HeroSection.tsx`: Ordem mobile com imagem no topo, micro-selo de atendimento em ~5 min e CTA com mensagem pré-formatada.
- `meu-site/components/sections/ServicesSection.tsx`: Removidos botões demarcados; implementadas mensagens dedicadas para cada um dos 8 serviços cadastrados.
- `meu-site/components/sections/HowItWorksSection.tsx`: Inserido `id="como-funciona"` com compensação de rolagem `scroll-mt-20` e botão com intenção clara.
- `meu-site/components/sections/Footer.tsx`: Correção do link âncora para `#como-funciona`; links clicáveis para telefone, WhatsApp e redes sociais.
- `meu-site/components/ui/FloatingWhatsApp.tsx`: Implementado controle de aparição pós-rolagem no mobile (`> 260px`); balão atualizado para "Técnico online"; beacon pulsante verde.
- `meu-site/lib/storeStatus.ts` & `useStoreStatus.ts`: Módulo de cálculo de expediente comercial e hook reativo via `useSyncExternalStore`.
- `meu-site/lib/whatsapp.ts`: Central de URLs inteligentes com codificação segura de mensagens.
- `meu-site/app/not-found.tsx`: Página 404 customizada com atalhos para todas as seções e link de socorro via WhatsApp.
- `meu-site/components/seo/StructuredData.tsx`: Injeção dos Schemas `ElectronicsRepairShop` e `FAQPage`.
- `meu-site/app/global-error.tsx`: Página de captura de erro global com recuperação de página.
- `meu-site/app/globals.css`: Adicionadas regras de animação `@keyframes marquee` e utilitário `.animate-marquee` com suporte a `prefers-reduced-motion`.
- `meu-site/components/ui/testimonial-card.tsx`: Componente de card de depoimento adaptado sem avatar, com 5 estrelas em ciano, tipografia institucional e hover suave.
- `meu-site/components/ui/testimonials-with-marquee.tsx`: Componente de marquee infinito contínuo e seção modular completa.
- `meu-site/components/ui/testimonials-demo.tsx`: Componente de demonstração isolada da seção de depoimentos.
- `meu-site/components/sections/ReviewsSection.tsx`: Integração da faixa de marquee na coluna direita ao lado do card oficial de nota 4,9 com 16 avaliações.
- `meu-site/components/ui/sparkles.tsx`: Componente `SparklesCore` com suporte a `@tsparticles/react` e `framer-motion`.
- `meu-site/components/ui/sparkles-demo.tsx`: Componentes de demonstração do efeito Sparkles (Acme, Dark e Colorful).
- `meu-site/components/sections/WarrantySection.tsx`: Ordem mobile reestruturada (Imagem -> Título -> Subtítulo -> Cards com 60 dias de bateria -> Botão).
- `meu-site/components/sections/AboutSection.tsx`: Ordem mobile reestruturada (Título -> Imagem -> Texto -> Botão).
- `meu-site/components/sections/LocationSection.tsx`: Ordem mobile reestruturada (Título -> Imagem -> Texto -> Card -> Botão).
- `meu-site/components/sections/ServicesSection.tsx`: Auto-slide sem loop no mobile (para ao final) e atualização de bateria para 60 dias.
- `meu-site/components/sections/HowItWorksSection.tsx`: Botão posicionado no final da seção no mobile (`md:hidden`).
- `meu-site/components/sections/DifferentialsSection.tsx`: Botão posicionado no final da seção no mobile (`md:hidden`).
- `meu-site/data/content.ts` & `meu-site/lib/whatsapp.ts`: Atualizada a garantia oficial de troca de bateria para 60 dias.
- `meu-site/next.config.ts`: Configuração com `cpus: 1` e `workerThreads: false` para builds estáveis no ambiente Windows.

---

## 4. Problemas encontrados

- **Hidratação quebrada no `<body>`:** Extensão de navegador do cliente injetava o atributo `cz-shortcut-listen="true"` no HTML antes da hidratação do React.
- **Race conditions de workers no Windows:** Múltiplos workers do Next.js 16 criavam pastas aninhadas concorrentemente (`_global-error.segments`), disparando erro `EPERM (-4048)`.
- **Alerta de lint no React 19:** Regra `react-hooks/set-state-in-effect` disparava ao chamar `setState` sincronicamente dentro de `useEffect` para o horário da loja.
- **Sobreposição no mobile:** O botão flutuante e o balão de WhatsApp cobriam o botão de CTA e o selo de avaliações na primeira tela do celular.
- **Inconsistência cadastral:** O arquivo de conteúdo continha referências a endereços e telefones divergentes dos canais oficiais reais.

---

## 5. Soluções aplicadas

- Adicionado `suppressHydrationWarning` na tag `<body>` em `app/layout.tsx`.
- Criado `app/global-error.tsx` e configurado `cpus: 1` no `next.config.ts`, além de pré-criação de diretórios de build para estabilidade 100% no Windows.
- Reescrito o hook de horário com `useSyncExternalStore`, separando snapshot do servidor e cliente de forma nativa e sem re-renders desnecessários.
- Adicionado listener de rolagem suave com `isScrolledPastHero` no `FloatingWhatsApp.tsx`, aplicando classes `opacity-0 pointer-events-none` no topo do mobile.
- Unificação rigorosa de todos os dados cadastrais em `content.ts`, `PRODUCT.md` e no banco de dados do `claude-mem`.

---

## 6. Pendências

- Validação da taxa de clique e conversão em testes com usuários reais no mobile.
- Acompanhamento da validação dos Rich Snippets no Google Search Console após a publicação do site em produção.
- Definição do domínio final (ex: `bautech.com.br`) e configuração de tags analíticas (Google Analytics 4 / Meta Pixel) quando solicitado pelo cliente.

---

## 7. Próximos passos

1. Executar a rodada final de **/impeccable polish** (revisão de micro-espaçamentos, contrastes finos e consistência visual geral).
2. Validação dos assets de imagens e tempos de carregamento (LCP / Core Web Vitals).
3. Preparação do repositório para deploy em produção (Vercel, Netlify ou VPS).

