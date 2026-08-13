// src/utils/data.ts  Rafael Moreira Ramos · portfolio content
// Single source of truth, typed and fully bilingual (pt/en).
// Comentarios em pt-BR sem acento por convencao do projeto.

export type Lang = 'pt' | 'en';

// Par bilingue. Strings "puras" (nomes proprios, termos tecnicos) ficam como string.
export interface L { pt: string; en: string; }
export type Str = string | L;

// Resolve um Str no idioma atual. Aceita string pura sem traducao.
export const tx = (s: Str | undefined, lang: Lang): string =>
  s == null ? '' : typeof s === 'string' ? s : s[lang];

export interface ProjectMetric { v: string; l: Str; }
export interface Project {
  id: string;
  featured?: boolean;
  year: string;
  name: Str;
  role: Str;
  pitch: L;
  bullets?: Str[];
  stack: string[];
  metrics?: ProjectMetric[];
  link?: string; // URL externa; quando presente o card vira clicavel (abre em nova aba)
}

export interface TimelineRow { y: string; t: Str; d: Str; }
export interface StackGroup  { group: Str; items: string[]; }
export interface Principle   { n: string; t: Str; d: Str; }
export interface RuleRow     { k: Str; v: Str; }

export interface CmdItem {
  k: Str;
  s: 'Section' | 'Link' | 'Action' | 'Theme';
  href?: string;
  action?: string;
}

export const RAFAEL = {
  name: 'Rafael Moreira Ramos de Rezende',
  shortName: 'Rafael MR',
  handle: '@RafaelMRDev',
  github: 'UPraggy',
  role: 'Full Stack Developer · Design · Infra · Comunicação',
  location: 'Belo Horizonte, MG · BR',
  timezone: 'GMT-3',
  status: { pt: 'Disponível p/ conversar', en: 'Available to chat' } as L,
  email: 'rafaelmoreira2001ofc@gmail.com',
  links: {
    site: 'rafaelmr.com.br',
    linkedin: 'linkedin.com/in/rafaelmrdev',
    youtube: 'youtube.com/@RafaelMRDev',
    github: 'github.com/UPraggy',
  },
  tagline: {
    pt: 'Construo o ambiente inteiro  código, servidor, rede e tudo entre os dois.',
    en: 'I build the whole environment  code, server, network, everything in between.',
  } as L,
  bio: {
    pt: 'Full Stack pleno na Babita desde Jul/2023, mantendo praticamente todo o ecossistema com uma equipe pequena: desenvolvimento, servidores, redes, segurança, suporte. Cursando Ciências da Computação na Estácio BH desde 2020. Nos últimos meses mergulhei em IA e, em vez de só estudar, construí: o LEDGB (agente de dev local-first) e o VisualInspector (242 ferramentas que dão olhos, mãos e memória a uma IA). Autodidata, aprendo fazendo, resolvo problemas reais, e invisto forte em comunicação como diferencial.',
    en: 'Mid-level Full Stack at Babita since Jul/2023, running practically the whole ecosystem with a small team: dev, servers, networks, security, support. Computer Science at Estácio BH since 2020. Over the last months I dove into AI and, instead of just studying it, I built: LEDGB (a local-first dev agent) and VisualInspector (242 tools that give an AI eyes, hands and memory). Self-taught, learn-by-doing, I solve real problems and invest heavily in communication as a differentiator.',
  } as L,
};

export const STACK: StackGroup[] = [
  { group: 'Frontend',                          items: ['React 18', 'Vite', 'JSX puro', 'Stencil.js', 'CSS custom props', 'Electron'] },
  { group: 'Backend',                           items: ['Node.js', 'Express', 'WebSockets', 'REST', 'JWT/HMAC', 'Multer'] },
  { group: 'Data',                              items: ['PostgreSQL', 'MongoDB (driver)', 'Redis', 'SQLite', 'ChromaDB', 'pg Pool'] },
  { group: 'AI / LLM',                          items: ['OpenAI SDK', 'OpenRouter', 'Ollama local', 'Groq', 'LangChain', 'RAG', 'Streaming SSE'] },
  { group: 'Infra',                             items: ['Linux servers', 'Nginx', 'SSH multi-host', 'Cron', 'PM2', 'Backups'] },
  { group: { pt: 'Ferramenta', en: 'Tooling' }, items: ['Git', 'MCP', 'Playwright', 'Obsidian', 'OBS', 'Figma', 'VS Code', 'Bash/PowerShell'] },
];

export const STACK_RULES: RuleRow[] = [
  { k: 'camelCase',  v: { pt: 'variáveis e funções', en: 'variables and functions' } },
  { k: 'kebab-case', v: { pt: 'classes CSS', en: 'CSS classes' } },
  { k: 'PascalCase', v: { pt: 'componentes React/Stencil', en: 'React/Stencil components' } },
  { k: 'ESM / CJS',  v: { pt: 'ESM no backend, CJS no Electron', en: 'ESM on the backend, CJS on Electron' } },
  { k: { pt: 'NUNCA', en: 'NEVER' },  v: 'Mongoose, Redux, Docker, Tailwind' },
  { k: { pt: 'SEMPRE', en: 'ALWAYS' }, v: 'express · ws · openai · highlight.js · anime.js' },
];

export const PROJECTS: Project[] = [
  {
    id: 'ledgb',
    featured: true,
    year: '2026—',
    name: 'LEDGB Orchestrator',
    role: { pt: 'Criador · solo dev', en: 'Creator · solo dev' },
    pitch: {
      pt: 'Agente de desenvolvimento autônomo. Local-first. Roda no seu PC. Usa IA grátis. Cai pra outra IA grátis quando bate o limite. Lembra do projeto entre sessões. Aceita comando do Telegram.',
      en: 'Autonomous dev agent. Local-first. Runs on your PC. Uses free AI. Falls back to other free AI on rate limit. Remembers projects across sessions. Telegram-controlled.',
    },
    bullets: [
      { pt: '5 free + paid + custom providers · auto-fallback em 429', en: '5 free + paid + custom providers · auto-fallback on 429' },
      { pt: 'Electron + dark/light + nível adaptativo (iniciante → sênior)', en: 'Electron + dark/light + adaptive level (beginner → senior)' },
      { pt: 'Memória estilo Obsidian + grafo navegável clicável (275 notas)', en: 'Obsidian-style memory + clickable navigable graph (275 notes)' },
      { pt: 'Bot Telegram multi-user com roles + senha AES', en: 'Multi-user Telegram bot with roles + AES password' },
      { pt: 'Streaming token-by-token + cancel real via AbortController', en: 'Token-by-token streaming + real cancel via AbortController' },
      { pt: 'Licenciamento offline HMAC-SHA256 · zero cloud check', en: 'Offline HMAC-SHA256 licensing · zero cloud check' },
    ],
    stack: ['Electron', 'React', 'Node', 'WebSocket', 'OpenAI SDK', 'Ollama'],
    metrics: [
      { v: '5',  l: { pt: 'providers free', en: 'free providers' } },
      { v: '27', l: { pt: 'skills templates', en: 'skill templates' } },
      { v: '13', l: { pt: 'comandos Ctrl+K', en: 'Ctrl+K commands' } },
      { v: '6',  l: { pt: 'estratégias auto-recovery', en: 'auto-recovery strategies' } },
    ],
  },
  {
    id: 'visualinspector',
    year: '2026—',
    name: 'VisualInspector',
    role: { pt: 'Criador · produto', en: 'Creator · product' },
    pitch: {
      pt: 'Uma camada de 242 ferramentas que dá a qualquer IA o que ela não tem sozinha: olhos pra ver design, mãos pra operar o computador e memória que não estoura o contexto. Uso pra auditar interfaces — inclusive este portfólio. Três interfaces sobre o mesmo motor: servidor MCP, API REST (POST /api/tool/:name) e app Electron.',
      en: 'A layer of 242 tools that gives any AI what it lacks on its own: eyes to read design, hands to operate the computer and memory that doesn\'t blow the context window. I use it to audit interfaces — including this portfolio. Three interfaces over one engine: an MCP server, a REST API (POST /api/tool/:name) and an Electron app.',
    },
    bullets: [
      { pt: 'VER: extrai cores, tipografia e tokens; audita a11y, SEO e performance', en: 'SEE: extract colors, typography and tokens; audit a11y, SEO and performance' },
      { pt: 'AGIR: lê e edita código, controla um navegador e opera o sistema', en: 'ACT: read and edit code, drive a browser and operate the system' },
      { pt: 'CRIAR: gera .pptx, PDF, imagens e gráficos de forma nativa, sem nuvem', en: 'CREATE: generate .pptx, PDF, images and charts natively, no cloud' },
      { pt: 'LEMBRAR: memória BM25 que devolve só o trecho certo, sob demanda', en: 'REMEMBER: BM25 memory that returns just the right chunk, on demand' },
    ],
    stack: ['Node', 'Electron', 'MCP', 'REST', 'Playwright'],
    metrics: [
      { v: '242', l: { pt: 'ferramentas', en: 'tools' } },
      { v: '14',  l: { pt: 'módulos de capacidade', en: 'capability modules' } },
      { v: '3',   l: { pt: 'interfaces (MCP·REST·app)', en: 'interfaces (MCP·REST·app)' } },
    ],
  },
  {
    id: 'queryboard',
    year: '2025—',
    name: 'QueryBoard',
    role: { pt: 'Criador · RAG local', en: 'Creator · local RAG' },
    pitch: {
      pt: 'Busca e perguntas sobre os seus próprios documentos, rodando local. RAG de ponta a ponta: embeddings no Ollama, vetores no ChromaDB, orquestração com LangChain e metadados no Postgres.',
      en: 'Search and ask questions over your own documents, running locally. End-to-end RAG: embeddings on Ollama, vectors in ChromaDB, orchestration with LangChain and metadata in Postgres.',
    },
    bullets: [
      { pt: 'Pipeline RAG completo: ingest → embed → buscar → responder', en: 'Full RAG pipeline: ingest → embed → retrieve → answer' },
      { pt: 'Ollama + ChromaDB local, sem nuvem  dados não saem do PC', en: 'Local Ollama + ChromaDB, no cloud  data never leaves the PC' },
      { pt: 'Orquestração LangChain + metadados no PostgreSQL', en: 'LangChain orchestration + metadata in PostgreSQL' },
    ],
    stack: ['LangChain', 'ChromaDB', 'Ollama', 'PostgreSQL', 'Node'],
  },
  {
    id: 'saibh',
    year: '2026—',
    name: 'SaiBH',
    role: { pt: 'Criador · produto (a dois)', en: 'Creator · product (built as a couple)' },
    pitch: {
      pt: 'Biblioteca de lugares pra sair em Belo Horizonte e região metropolitana. Lê o clima ao vivo e sugere o rolê certo pro tempo, com filtros pessoais — até "com bebê". Feito com a namorada, resolvendo uma dor real do casal, estudando Claude Code.',
      en: 'A library of places to go out in Belo Horizonte and its metro area. It reads live weather and suggests the right spot for it, with personal filters — even "baby-friendly". Built with my girlfriend, solving a real couple\'s problem, while learning Claude Code.',
    },
    bullets: [
      { pt: 'Sugestão pelo clima ao vivo + score de "match" com os seus filtros', en: 'Live weather-based suggestions + a "match" score against your filters' },
      { pt: 'Filtros: categoria (bares a parques, família & bebê), período, preço, comida, cidade e bairro', en: 'Filters: category (bars to parks, family & baby), time, price, food, city and neighborhood' },
      { pt: '"Me surpreenda" e aprendizado com os lugares marcados como "já fui"', en: '"Surprise me", and it learns from places you mark as "been there"' },
      { pt: 'Dado do local + nota do Google + "aberto agora" e rota no Maps', en: 'Place data + Google rating + "open now" and Maps routing' },
    ],
    stack: ['React', 'Node', 'REST', 'Weather API', 'Claude Code'],
    metrics: [
      { v: '3373', l: { pt: 'lugares na base', en: 'places in the base' } },
      { v: '12',   l: { pt: 'categorias', en: 'categories' } },
      { v: 'RMBH', l: { pt: 'BH + região metrop.', en: 'BH + metro area' } },
    ],
    link: 'https://saibh.rafaelmr.com.br',
  },
  {
    id: 'escritorio',
    year: '2026',
    name: { pt: 'Escritório Online', en: 'Escritório Online' },
    role: { pt: 'Criador · produto social', en: 'Creator · social product' },
    pitch: {
      pt: 'PWA de inclusão digital que nasceu pra ajudar meus pais — e quem está começando na tecnologia. O onboarding se adapta ao momento de vida e à idade, e a fonte aumenta com um toque. Aprender do zero, no seu ritmo. Construído estudando Claude Code.',
      en: 'A digital-inclusion PWA built to help my parents — and anyone starting out with technology. Onboarding adapts to life stage and age, and font size grows with one tap. Learn from zero, at your own pace. Built while learning Claude Code.',
    },
    bullets: [
      { pt: 'Onboarding que adapta a trilha ao momento de vida + fonte acessível', en: 'Onboarding that adapts the track to life stage + accessible font size' },
      { pt: '5 módulos: Computador, Celular, Mercado & Especialização (Excel), Segurança Digital e Inglês', en: '5 modules: Computer, Mobile, Market & Upskilling (Excel), Digital Security and English' },
      { pt: 'Gamificação: trilhas, missões, XP, níveis, caixa diária e troféus', en: 'Gamification: tracks, missions, XP, levels, a daily box and trophies' },
      { pt: 'Mentor integrado e agenda pra manter o ritmo de estudo', en: 'Built-in mentor and a schedule to keep the study pace' },
    ],
    stack: ['React', 'PWA', 'Node', 'Gamification', 'Claude Code'],
    metrics: [
      { v: '5',    l: { pt: 'módulos', en: 'modules' } },
      { v: '15',   l: { pt: 'trilhas / módulo', en: 'tracks / module' } },
      { v: 'A11y', l: { pt: 'fonte adaptável', en: 'adaptive font' } },
    ],
    link: 'https://lnoffice.rafaelmr.com.br',
  },
  {
    id: 'babita',
    year: 'Jul/2023—',
    name: { pt: 'Babita · ecossistema interno', en: 'Babita · internal ecosystem' },
    role: { pt: 'Full Stack Pleno', en: 'Full Stack (mid-level)' },
    pitch: {
      pt: 'Mantenho o ecossistema inteiro com equipe pequena: dev de novas features, servidores, redes, segurança, suporte. Não é um cargo, é um one-man-stack.',
      en: 'I keep the whole ecosystem running with a small team: building new features, servers, networks, security, support. Not a job title  a one-man stack.',
    },
    bullets: [
      { pt: 'Backend + frontend de features novas, direto em produção', en: 'Backend + frontend for new features, straight to production' },
      { pt: 'Servidores Linux, Nginx, deploy e uptime no meu colo', en: 'Linux servers, Nginx, deploy and uptime on me' },
      { pt: 'Rede, firewall, VPN e segurança  a stack inteira', en: 'Network, firewall, VPN and security  the whole stack' },
    ],
    stack: ['React', 'Node', 'PostgreSQL', 'Linux', 'Nginx'],
  },
  {
    id: 'igreja',
    year: 'Out/2023 · Jul/2024',
    name: 'Igreja São Pedro V1 & V2',
    role: { pt: 'Voluntário · solo', en: 'Volunteer · solo' },
    pitch: {
      pt: 'Site institucional refeito do zero, depois um V2 quando o V1 envelheceu. Trabalho voluntário  entregue, mantido, sem prazo de validade.',
      en: 'Institutional site rebuilt from scratch, then a V2 when V1 aged. Volunteer work  delivered, maintained, no expiry date.',
    },
    bullets: [
      { pt: 'V1 institucional escrito do zero (Out/2023)', en: 'Institutional V1 written from scratch (Oct/2023)' },
      { pt: 'V2 refeito quando o V1 envelheceu (Jul/2024)', en: 'V2 rebuilt when V1 aged (Jul/2024)' },
      { pt: 'Voluntário, solo, no ar e mantido sem prazo', en: 'Volunteer, solo, live and maintained with no deadline' },
    ],
    stack: ['React', 'Node', 'PostgreSQL'],
  },
  {
    id: 'portfolio-v5',
    year: '2026',
    name: { pt: 'Este portfólio · V5', en: 'This portfolio · V5' },
    role: { pt: 'Próprio · open source', en: 'Personal · open source' },
    pitch: {
      pt: 'O site que você está lendo. Stencil + Web Components em light DOM, bilíngue PT/EN, pré-renderizado e ajustado pra ser achado por buscadores e por IA. Sucessor do V4, fiel à mesma identidade visual.',
      en: 'The site you\'re reading. Stencil + Web Components in light DOM, bilingual PT/EN, prerendered and tuned to be found by search engines and AI. Successor to V4, faithful to the same visual identity.',
    },
    bullets: [
      { pt: 'Stencil + Web Components em light DOM, CSS sem framework', en: 'Stencil + Web Components in light DOM, no CSS framework' },
      { pt: 'Bilíngue PT/EN com i18n, hreflang e /en/ pré-renderizado', en: 'Bilingual PT/EN with i18n, hreflang and prerendered /en/' },
      { pt: 'JSON-LD + OG + sitemap pra ser achado por busca e por IA', en: 'JSON-LD + OG + sitemap to be found by search and AI' },
    ],
    stack: ['Stencil.js', 'Web Components', 'i18n', 'Prerender', 'JSON-LD'],
    metrics: [
      { v: '2', l: { pt: 'idiomas', en: 'languages' } },
      { v: '7', l: { pt: 'seções', en: 'sections' } },
      { v: '0', l: { pt: 'frameworks CSS', en: 'CSS frameworks' } },
    ],
  },
  {
    id: 'youtube',
    year: '2025—',
    name: { pt: 'Canal @RafaelMRDev', en: '@RafaelMRDev channel' },
    role: { pt: 'Criador · trilha Linux para Servidores', en: 'Creator · Linux for Servers track' },
    pitch: {
      pt: 'Investindo em comunicação como diferencial. Foco: trilha de Linux para servidores, do zero até produção.',
      en: 'Investing in communication as a differentiator. Focus: a Linux-for-servers track, from zero to production.',
    },
    bullets: [
      { pt: 'Trilha Linux Essencial p/ Servidores  do zero à produção', en: 'Essential Linux for Servers  from zero to production' },
      { pt: 'Processo real acontecendo em tempo real, não slide estático', en: 'Real process happening in real time, not static slides' },
      { pt: '+ 2 cursos avançados no roadmap (infra e automação)', en: '+ 2 advanced courses on the roadmap (infra and automation)' },
    ],
    stack: ['OBS', 'Linux', 'Roteiro', 'Edição'],
    metrics: [
      { v: '11', l: { pt: 'módulos na trilha', en: 'track modules' } },
    ],
  },
];

export const TIMELINE: TimelineRow[] = [
  { y: 'Fev/2020', t: { pt: 'Início  Estácio BH', en: 'Start  Estácio BH' }, d: { pt: 'Ciências da Computação.', en: 'Computer Science.' } },
  { y: 'Fev/2022', t: { pt: 'Estágio Rádio Inconfidência', en: 'Internship · Rádio Inconfidência' }, d: { pt: 'Primeiro contato com produção real.', en: 'First contact with real production.' } },
  { y: 'Jul/2022', t: 'Portfólio V1', d: { pt: 'Aprendendo na prática.', en: 'Learning by doing.' } },
  { y: 'Jun/2023', t: { pt: 'Portfólio V2 · Figma', en: 'Portfolio V2 · Figma' }, d: { pt: 'Primeira tentativa de pensar design antes do código.', en: 'First attempt at design-before-code.' } },
  { y: 'Jul/2023', t: { pt: 'Babita · Full Stack Pleno', en: 'Babita · Full Stack (mid-level)' }, d: { pt: 'Pleno desde o primeiro dia. Equipe pequena, escopo enorme.', en: 'Mid-level from day one. Small team, huge scope.' } },
  { y: 'Out/2023', t: 'Igreja São Pedro V1', d: { pt: 'Voluntário. Solo. Pro ar.', en: 'Volunteer. Solo. Live.' } },
  { y: 'Abr/2024', t: { pt: 'Portfólio V3 · React', en: 'Portfolio V3 · React' }, d: { pt: 'Refatorando a forma de me apresentar.', en: 'Refactoring how I present myself.' } },
  { y: 'Jul/2024', t: 'Igreja São Pedro V2', d: { pt: 'V1 estava velho. Refiz.', en: 'V1 had aged. Rebuilt it.' } },
  { y: '2025',     t: { pt: 'Portfólio V4 + Canal de YouTube', en: 'Portfolio V4 + YouTube channel' }, d: { pt: 'Stencil.js + Web Components. Início da trilha Linux Essencial para Servidores no YouTube.', en: 'Stencil.js + Web Components. Start of the Essential Linux for Servers track on YouTube.' } },
  { y: '2026',     t: { pt: 'Onda de IA: LEDGB, VisualInspector + apps com Claude Code', en: 'AI wave: LEDGB, VisualInspector + apps with Claude Code' }, d: { pt: 'Lanço o LEDGB — agente de dev autônomo, local-first — e o VisualInspector, 242 ferramentas que dão olhos, mãos e memória a uma IA. Publico o SaiBH e o Escritório Online, feitos estudando Claude Code, e o portfólio V5 que você está lendo.', en: 'Launching LEDGB — an autonomous, local-first dev agent — and VisualInspector, 242 tools that give an AI eyes, hands and memory. Shipping SaiBH and Escritório Online, built while learning Claude Code, and the V5 portfolio you\'re reading.' } },
];

export const PRINCIPLES: Principle[] = [
  {
    n: '01',
    t: { pt: 'Faço o ambiente inteiro funcionar.', en: 'I make the whole environment work.' },
    d: {
      pt: 'Não sou um dev que só codifica. Sou um dev que faz código rodar em servidor, em rede, com segurança, em produção. Pleno desde o dia um, na Babita, porque o escopo nunca foi só código.',
      en: 'I\'m not a dev who just codes. I\'m a dev who makes code run on a server, on a network, securely, in production. Mid-level from day one at Babita, because the scope was never just code.',
    },
  },
  {
    n: '02',
    t: { pt: 'Local-first. Free-by-default.', en: 'Local-first. Free-by-default.' },
    d: {
      pt: 'O LEDGB existe porque eu queria um agente AI que rodasse no MEU PC, usando IA grátis, sem mensalidade, sem trava de provider. Construí o que faltava no mercado.',
      en: 'LEDGB exists because I wanted an AI agent that ran on MY PC, using free AI, with no subscription, no provider lock-in. I built what the market was missing.',
    },
  },
  {
    n: '03',
    t: { pt: 'Autodidata, aprendo fazendo.', en: 'Self-taught, learn by doing.' },
    d: {
      pt: 'Cada portfólio (V1→V5) foi uma desculpa pra aprender uma stack nova. Cada projeto voluntário foi um campo de prova. Sem curso pago, sem bootcamp.',
      en: 'Every portfolio (V1→V5) was an excuse to learn a new stack. Every volunteer project was a proving ground. No paid course, no bootcamp.',
    },
  },
  {
    n: '04',
    t: { pt: 'Comunicação é o diferencial.', en: 'Communication is the differentiator.' },
    d: {
      pt: 'Por isso o canal no YouTube. Por isso esse portfólio. Código bom sem narrativa boa some no GitHub. Estou investindo forte nessa parte.',
      en: 'That\'s why the YouTube channel. That\'s why this portfolio. Good code without good narrative disappears on GitHub. I\'m investing heavily in this part.',
    },
  },
];

export const TRILHA: Str[] = [
  { pt: 'Montagem de laboratório virtual', en: 'Virtual lab setup' },
  { pt: 'Terminal e produtividade', en: 'Terminal and productivity' },
  { pt: 'Estrutura de arquivos e storage', en: 'File structure and storage' },
  { pt: 'Processos e logs', en: 'Processes and logs' },
  { pt: 'Usuários, grupos e permissões', en: 'Users, groups and permissions' },
  { pt: 'Gerenciamento de pacotes', en: 'Package management' },
  { pt: 'SSH e acesso remoto', en: 'SSH and remote access' },
  { pt: 'Segurança', en: 'Security' },
  { pt: 'Backups', en: 'Backups' },
  { pt: 'Preparação de ambiente backend', en: 'Backend environment prep' },
  { pt: 'Scripts e automações Linux', en: 'Linux scripts and automation' },
];

export const META_SKILLS: Str[] = [
  { pt: 'Organizar melhor ideias', en: 'Organize ideas better' },
  { pt: 'Estruturar roteiros', en: 'Structure scripts' },
  { pt: 'Simplificar assuntos complexos', en: 'Simplify complex topics' },
  { pt: 'Rever a própria comunicação', en: 'Review my own communication' },
  { pt: 'Melhorar edição e apresentação', en: 'Improve editing and presentation' },
  { pt: 'Clareza ao explicar conceitos técnicos', en: 'Clarity explaining technical concepts' },
];

export const COMMAND_PALETTE: CmdItem[] = [
  { k: { pt: 'Ir para LEDGB', en: 'Go to LEDGB' },           s: 'Section', href: '#ledgb' },
  { k: { pt: 'Ir para Projetos', en: 'Go to Projects' },     s: 'Section', href: '#projects' },
  { k: { pt: 'Ir para Stack', en: 'Go to Stack' },           s: 'Section', href: '#stack' },
  { k: { pt: 'Ir para Trajetória', en: 'Go to Trajectory' }, s: 'Section', href: '#trajectory' },
  { k: { pt: 'Ir para Contato', en: 'Go to Contact' },       s: 'Section', href: '#contact' },
  { k: { pt: 'Abrir YouTube', en: 'Open YouTube' },          s: 'Link',    href: 'https://youtube.com/@RafaelMRDev' },
  { k: { pt: 'Abrir LinkedIn', en: 'Open LinkedIn' },        s: 'Link',    href: 'https://linkedin.com/in/rafaelmrdev' },
  { k: { pt: 'Abrir GitHub', en: 'Open GitHub' },            s: 'Link',    href: 'https://github.com/UPraggy' },
  // { k: { pt: 'Ver código deste site', en: 'View this site source' }, s: 'Link', href: 'https://github.com/UPraggy/portfolioV5' },
  { k: { pt: 'Copiar email', en: 'Copy email' },             s: 'Action',  action: 'copyEmail' },
  { k: { pt: 'Trocar idioma', en: 'Toggle language' },       s: 'Action',  action: 'toggleLang' },
  { k: { pt: 'Cor: âmbar', en: 'Accent: amber' },            s: 'Theme',   action: 'accent:amber' },
  { k: { pt: 'Cor: lima', en: 'Accent: lime' },              s: 'Theme',   action: 'accent:lime' },
  { k: { pt: 'Cor: ciano', en: 'Accent: cyan' },             s: 'Theme',   action: 'accent:cyan' },
  { k: { pt: 'Cor: rosa', en: 'Accent: rose' },              s: 'Theme',   action: 'accent:rose' },
];

// ───────────────────────────────────────────────────────────────────────────
// T  dicionario de UI (chrome do site: navegacao, titulos de secao, labels).
// Tudo que NAO e conteudo-dado fica aqui, bilingue.
// ───────────────────────────────────────────────────────────────────────────
export const T = {
  nav: {
    ledgb:      'LEDGB' as Str,
    stack:      'Stack' as Str,
    projects:   { pt: 'Projetos', en: 'Projects' } as Str,
    trajectory: { pt: 'Trajetória', en: 'Trajectory' } as Str,
    contact:    { pt: 'Contato', en: 'Contact' } as Str,
  },
  hero: {
    roleLabel:    { pt: 'Função', en: 'Role' } as Str,
    roleVal:      'Full Stack · Sysadmin' as Str,
    companyLabel: { pt: 'Empresa atual', en: 'Current company' } as Str,
    companyVal:   { pt: 'Babita · Pleno', en: 'Babita · Mid-level' } as Str,
    projectLabel: { pt: 'Projeto principal', en: 'Main project' } as Str,
    sinceLabel:   { pt: 'Em campo desde', en: 'In the field since' } as Str,
    sinceVal:     'Fev/2020' as Str,
    scrollNote:   { pt: '5 SEÇÕES + 1 EASTER EGG', en: '5 SECTIONS + 1 EASTER EGG' } as Str,
  },
  manifesto: {
    num:   '01 / MANIFESTO' as Str,
    title: { pt: 'Não sou um dev que <em>só codifica</em>.', en: 'I\'m not a dev who <em>just writes code</em>.' } as Str,
    sub:   { pt: 'Quatro princípios que explicam por que essa carreira tomou esse formato e por que esse portfólio existe.', en: 'Four principles that explain why this career took this shape  and why this portfolio exists.' } as Str,
  },
  stack: {
    num:   '02 / STACK' as Str,
    title: { pt: 'Ferramentas que <em>resolvem</em>, regras que não <em>negocio</em>.', en: 'Tools that <em>get it done</em>, rules I don\'t <em>negotiate</em>.' } as Str,
    sub:   { pt: 'JSX puro, sem TypeScript salvo quando o framework obriga (oi Stencil). Express e ws. PostgreSQL via pg Pool. Sem Mongoose, sem Redux, sem Docker, sem Tailwind. Não é dogma  é o que se mantém com a mão pequena que eu tenho.', en: 'Plain JSX, no TypeScript unless the framework forces it (hi Stencil). Express and ws. PostgreSQL via pg Pool. No Mongoose, no Redux, no Docker, no Tailwind. Not dogma  just what stays maintainable with the small hands I have.' } as Str,
  },
  ledgb: {
    num:   { pt: '03 / PROJETO EM DESTAQUE', en: '03 / FEATURED PROJECT' } as Str,
    title: 'LEDGB <em>Orchestrator</em>.' as Str,
    sub:   { pt: 'Claude Code pra quem quer CLI premium. Codex pra quem quer OpenAI grátis. LEDGB pra quem quer GUI premium + IA grátis funcional + memória de projeto + controle do celular. Local-first.', en: 'Claude Code if you want premium CLI. Codex for free OpenAI. LEDGB if you want a premium GUI + working free AI + project memory + phone control. Local-first.' } as Str,
    badge: { pt: '2026  em produção', en: '2026  in production' } as Str,
    sublabel: 'Autonomous Development Agent · v5.0' as Str,
  },
  projects: {
    num:   { pt: '04 / PROJETOS', en: '04 / PROJECTS' } as Str,
    title: { pt: 'O que <em>eu</em> mantenho.', en: 'What <em>I</em> maintain.' } as Str,
    sub:   { pt: 'Produtos meus  LEDGB, VisualInspector, QueryBoard, SaiBH, Escritório Online  mais o ecossistema da Babita e o trabalho voluntário. Cada um resolve uma coisa diferente, e juntos cobrem dev, infra, design e comunicação.', en: 'My own products  LEDGB, VisualInspector, QueryBoard, SaiBH, Escritório Online  plus the Babita ecosystem and volunteer work. Each one solves something different, and together they cover dev, infra, design and communication.' } as Str,
  },
  trajectory: {
    num:   { pt: '05 / TRAJETÓRIA', en: '05 / TRAJECTORY' } as Str,
    title: { pt: 'De <em>2020</em> até <em>aqui</em>.', en: 'From <em>2020</em> to <em>here</em>.' } as Str,
    sub:   { pt: 'Cada portfólio foi uma desculpa pra aprender uma stack nova. Cada projeto voluntário foi um campo de prova. Seis anos de let-me-figure-it-out.', en: 'Each portfolio was an excuse to learn a new stack. Each volunteer project was a proving ground. Six years of let-me-figure-it-out.' } as Str,
  },
  comm: {
    num:   { pt: '06 / COMUNICAÇÃO', en: '06 / COMMUNICATION' } as Str,
    title: { pt: 'Comunicação como <em>diferencial</em>.', en: 'Communication as a <em>differentiator</em>.' } as Str,
    sub:   { pt: 'Tecnologia continua sendo a base. Mas transformar conhecimento em comunicação clara  isso tem se tornado a parte mais importante da jornada. Por isso o canal.', en: 'Technology is still the foundation. But turning knowledge into clear communication  that has become the most important part of the journey. Hence the channel.' } as Str,
    ytStat:   { pt: 'Canal · 18 vídeos · 156 inscritos', en: 'Channel · 18 videos · 156 subscribers' } as Str,
    ytTitle:  { pt: 'Trilha <em>Linux Essencial</em><br /> para Servidores.', en: '<em>Essential Linux</em><br /> for Servers track.' } as Str,
    ytLede:   { pt: 'Do fundamento ao cenário real. Demonstração prática, processo acontecendo em tempo real  não vídeo estático. A trilha inicial cobre 11 módulos:', en: 'From fundamentals to real-world scenarios. Hands-on, process happening in real time  not a static video. The initial track covers 11 modules:' } as Str,
    ytRoadmap:{ pt: 'Já no ar também a trilha de <em>Bash</em> (scripting do zero) — e dois cursos avançados no roadmap: infraestrutura, automação e desenvolvimento aplicado.', en: 'A <em>Bash</em> track (scripting from scratch) is already live too — plus two advanced courses on the roadmap: infrastructure, automation and applied development.' } as Str,
    ytCta:    { pt: 'ASSISTIR NO YOUTUBE →', en: 'WATCH ON YOUTUBE →' } as Str,
    metaEyebrow: { pt: 'O MAIOR APRENDIZADO NÃO FOI TÉCNICO', en: 'THE BIGGEST LESSON WASN\'T TECHNICAL' } as Str,
    metaLede: { pt: 'Gravar, assistir e revisar a própria comunicação é o exercício profissional mais rico que descobri esse ano.', en: 'Recording, watching and reviewing my own communication is the richest professional exercise I found this year.' } as Str,
    metaQuote:{ pt: 'Comecei a praticar algo que antes eu evitava: <em>aparecer em câmera</em>. Parece simples  mas é onde os vícios de linguagem, o excesso, a falta de objetividade ficam expostos. E é onde a postura, a presença e a clareza começam a melhorar.', en: 'I started practicing something I used to avoid: <em>being on camera</em>. Sounds simple  but it\'s where verbal tics, excess and lack of objectivity get exposed. And it\'s where posture, presence and clarity start to improve.' } as Str,
    diffAh:   { pt: 'Dev + Sysadmin no mesmo cargo.', en: 'Dev + Sysadmin in one role.' } as Str,
    diffAp:   { pt: 'Na Babita, o mesmo cara mantém o backend, o frontend, os servidores Linux, a rede e a segurança. Stack inteira por necessidade  e por gosto.', en: 'At Babita, the same person maintains the backend, the frontend, the Linux servers, the network and security. The whole stack out of necessity  and taste.' } as Str,
    diffBh:   { pt: 'Solo dev que envia.', en: 'Solo dev who ships.' } as Str,
    diffBp:   { pt: 'LEDGB Orchestrator não tem time. É um dev, um Electron, e a decisão de não esperar permissão pra construir o que estava faltando.', en: 'LEDGB Orchestrator has no team. It\'s one dev, one Electron app, and the decision not to wait for permission to build what was missing.' } as Str,
  },
  contact: {
    num:   { pt: '07 / CONTATO', en: '07 / CONTACT' } as Str,
    title: { pt: 'Vamos <em>conversar</em>?', en: 'Let\'s <em>talk</em>?' } as Str,
    footMade: 'BUILT WITH TOO MUCH COFFEE' as Str,
    footIn:   { pt: 'EM CAMPO · BRASIL', en: 'IN BRAZIL' } as Str,
  },
  cmdk: {
    placeholder: { pt: 'Digite um comando, seção ou link…', en: 'Type a command, section, or link…' } as Str,
    empty:       { pt: 'Sem resultados · tente "github" ou "ledgb"', en: 'No results · try "github" or "ledgb"' } as Str,
  },
  toast: {
    emailCopied: { pt: 'Email copiado · ', en: 'Email copied · ' } as Str,
    lang:        { pt: 'Idioma → ', en: 'Language → ' } as Str,
  },
};
