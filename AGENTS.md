# Bautech — Guia para agentes

Site institucional estático (landing page) da Bautech Assistência Técnica: Next.js 16 (App Router, `output: "export"`), React 19, Tailwind 4, hospedado no Cloudflare Pages. Sem backend, banco de dados, login nem agente para o usuário final (ver `DECISIONS.md`).

> **Legado que NÃO se aplica:** este repositório nasceu de um template Builder.io/Agent-Native. O que esse template descreve (pnpm, actions, SQL, agent rail, React Router, `pnpm agent-native:doctor`, `DEVELOPING.md`, `.agents/skills/`) não corresponde ao projeto. Ignore essas instruções.

## Leia antes de mexer

- `MEMORY.md`: decisões aprovadas e rejeitadas, dados inegociáveis, pendências.
- `PRODUCT.md` (público e princípios) e `DESIGN.md` (direção visual).

## Comandos e verificação

- `npm run dev`, `npm run build` (gera `out/`), `npm run lint`, `npx tsc --noEmit`.
- Imagens: coloque o PNG original em `scripts/image-sources/` e rode `node scripts/optimize-images.mjs`. Ícones: `node scripts/generate-icons.mjs`.
- Depois de editar: tipos, lint e build sem erros. Para mudanças visuais ou de interação, confira em navegador (captura de tela) em mobile (390px) e desktop (1280px); o `next dev` pode manter abas antigas, recarregue com Ctrl+Shift+R.

## Regras do projeto

- **Dados oficiais** (endereço, telefone, garantias, horários) só em `data/content.ts`; derive de lá (selos, JSON-LD, textos). Garantias: tela 90, bateria 60, conector e demais 30 dias.
- **Ordem mobile aprovada** por seção (ver `MEMORY.md`): desktop deve permanecer intacto. O menu mobile não tem botões de WhatsApp e o Hero não tem faixa de informações (decisões do usuário).
- **Depoimentos** apenas reais (Google), com iniciais. Não inventar avaliações, números ou prazos. Não usar `review[]` no JSON-LD.
- **JSON-LD** com tipos válidos do schema.org (`ElectronicsRepairShop` não existe; usamos `MobilePhoneStore`).
- **Imagens** sempre locais (`public/img`, via `next/image` e `lib/imageLoader.ts`); nunca hotlink de CDN de terceiros.
- **Terceiros e cookies:** nenhum script externo fora de `components/ui/Analytics.tsx`, e só após consentimento (`lib/consent.ts`). Toda nova origem precisa entrar na CSP em `public/_headers`.
- **Animações:** CSS nativo, apenas `transform`/`opacity`, tokens em `@theme` (`app/globals.css`), respeitando `prefers-reduced-motion`. Não animar a imagem do Hero (LCP).
- **Design:** usar tokens (`brand-*`) em vez de hex; textos de leitura >= 14px; alvos de toque >= 44px; sem kickers em caixa alta acima de `h1`/`h2`; contraste WCAG AA.
- **WhatsApp:** toda chamada usa `createWhatsAppUrl(WHATSAPP_INTENTS.*)` (`lib/whatsapp.ts`).

## Minimalismo & Eficiência (Diretriz Ponytail)

"O melhor código é o que não precisou ser escrito." Antes de criar código novo ou sugerir dependências externas, avalie cada tarefa contra a escada de 7 degraus:

1. **Precisa existir?** (YAGNI — elimine complexidade desnecessária e superdimensionamento).
2. **Já existe no projeto?** (Reutilize componentes, helpers, dados e tokens existentes antes de criar novos).
3. **A biblioteca padrão da linguagem/framework já resolve?**
4. **O navegador ou a plataforma tem recurso nativo?** (Prefira APIs nativas e CSS moderno a bibliotecas pesadas).
5. **Uma dependência já instalada atende à demanda?** (Evite instalar novos pacotes npm sem necessidade estrita).
6. **Dá para resolver em poucas linhas ou em uma função direta?**
7. **Apenas em último caso:** Escreva código novo, no menor volume sustentável e determinístico.

*Cláusula de salvaguarda inegociável:* Acessibilidade (WCAG AA), segurança, validação de erros e fidelidade visual ao design system da Bautech nunca devem ser sacrificadas para escrever menos código.
