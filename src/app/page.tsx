'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';
const HERO_GIF = '/hero-intro.gif';

/* ═══ SVG ICONS ═══ */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FACC15">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const HeartIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const TargetIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
    <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
  </svg>
);
const RhythmIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const LayersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const FireIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const MapIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const HandIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const ShieldIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);
const ChevronIcon = () => (
  <svg className="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const DiamondIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 12l10 10 10-10L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

/* ═══ REUSABLE MOTION WRAPPER ═══ */
const MotionFade = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const MotionIconWrap = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200, damping: 15 }}
  >
    {children}
  </motion.div>
);

/* ═══ DATA ═══ */
const solutionCards = [
  { num: '01', title: 'Conexão antes do contato', desc: 'Como preparar o estado emocional dela antes de tocar — o que acontece na mente dela antes que qualquer toque comece.' },
  { num: '02', title: 'Os 12 pontos de ativação', desc: 'Zonas que a maioria desconhece completamente. Onde tocar, com que pressão, por quanto tempo — e em que ordem.' },
  { num: '03', title: 'Ritmo e intenção', desc: 'O que separa um toque qualquer de um toque que ela vai lembrar. Não é força — é presença e timing.' },
  { num: '04', title: 'A sequência de finalização', desc: 'Os 4 movimentos que criam o estado de conexão total — e fazem você ser a última coisa na cabeça dela antes de dormir.' },
];

const contentModules = [
  { num: 'I', title: 'Os 7 Movimentos de Preparação', desc: 'Como criar o estado físico e emocional certo antes de qualquer contato. Sem essa base, os outros 16 movimentos perdem 70% do efeito.' },
  { num: 'II', title: 'Os 12 Pontos de Ativação', desc: 'Mapeamento completo com guias visuais: onde tocar, a pressão exata, o ritmo ideal, e a janela de tempo certa para cada ponto.' },
  { num: 'III', title: 'Os 4 Movimentos de Finalização', desc: 'A sequência que fecha o ciclo e deixa ela num estado de relaxamento e conexão profunda — o que cria memória afetiva duradoura.' },
  { num: 'IV', title: 'Mapas Visuais Ilustrados', desc: 'Guias detalhados de cada movimento, pressão e ritmo. Feito para que você aplique com segurança desde a primeira vez, sem ter que adivinhar nada.' },
];

const bonuses = [
  { num: 'I', title: 'Sexo Tântrico para Iniciantes', desc: 'O contexto filosófico e prático do tantra — o que ele é, o que não é, e como os princípios mudam a qualidade da presença durante a intimidade. Mesmo quem nunca ouviu falar entende em 20 minutos.', value: 'R$ 59,90' },
  { num: 'II', title: 'Guia dos 7 Sussurros', desc: 'As palavras exatas que amplificam o efeito de cada toque. O que dizer, quando dizer, e como o tom de voz ativa ou desativa a entrega emocional dela.', value: 'R$ 14,90' },
  { num: 'III', title: 'Controle Absoluto', desc: 'Técnicas de respiração e foco para você manter presença total durante a experiência. Porque a entrega dela depende diretamente da sua presença.', value: 'R$ 34,90' },
];

const testimonials = [
  { name: 'Carlos M.', city: 'São Paulo, SP', avatar: 'C', quote: 'Minha esposa disse que foi a melhor experiência que já tivemos em 8 anos de casamento. Eu apliquei no sábado. No domingo ela trouxe o assunto sozinha — disse que não conseguia parar de pensar no que aconteceu. Os movimentos são simples, mas fazem toda a diferença.' },
  { name: 'Rafael T.', city: 'Curitiba, PR', avatar: 'R', quote: 'Entrei cético — sou engenheiro, não acredito em coisa sem base. Mas a lógica por trás dos movimentos faz sentido: são pontos de tensão real que a maioria ignora. Apliquei com minha namorada e a diferença foi imediata. Ela ficou olhando para mim de um jeito diferente. Continua assim.' },
  { name: 'Diego S.', city: 'Rio de Janeiro, RJ', avatar: 'D', quote: 'Material sério. Nada de "truque mágico" ou linguagem cafona. São técnicas com base real em tantra terapêutico, explicadas de forma direta. Meu relacionamento de 5 anos mudou nos últimos 3 meses. Ela fica procurando minha presença de formas que não aconteciam há anos.' },
  { name: 'Marcos P.', city: 'Belo Horizonte, MG', avatar: 'M', quote: 'Eu sempre achei que sabia o que estava fazendo. Percebi que estava completamente errado na abordagem — não por falta de esforço, mas por falta de direção. Os 23 códigos deram uma estrutura clara. Em duas semanas, a conexão com minha parceira está num patamar diferente.' },
];

const painPoints = [
  'Você sente que a intimidade virou rotina — presente, mas sem aquela faísca de antes.',
  'Ela parece distante durante os momentos íntimos, como se estivesse lá mas não completamente.',
  'Você não sabe exatamente o que falta — mas sente que poderia ser mais.',
  'Já tentou algumas coisas. Algumas funcionaram por um tempo. Nenhuma criou uma conexão que durou.',
];

const faqs = [
  { q: 'Funciona mesmo sem experiência com tantra?', a: 'Sim. O método foi traduzido para linguagem direta e passo a passo visual. Você não precisa saber nada sobre tantra antes de começar — o Bônus I cobre o contexto necessário em menos de 20 minutos.' },
  { q: 'Minha parceira precisa saber que aprendi com um curso?', a: 'Não. Os movimentos são naturais e fluem dentro de um momento íntimo normal. A diferença que ela vai sentir é no resultado — não na origem.' },
  { q: 'Funciona em relacionamentos longos onde a rotina já se instalou?', a: 'Especialmente nesses casos. A maioria dos relatos mais intensos vem de casamentos e relacionamentos de anos — justamente porque o contraste é maior e o impacto emocional da novidade é mais profundo.' },
  { q: 'Quando recebo o acesso?', a: 'Imediatamente após a confirmação do pagamento. Em menos de 2 minutos você já pode começar.' },
  { q: 'E se eu pedir reembolso?', a: 'Você tem 30 dias. Basta enviar um e-mail — sem formulário, sem justificativa obrigatória, sem espera longa. O valor é devolvido integralmente.' },
];

const offerChecklist = [
  'Código do Toque — 23 movimentos completos com mapas visuais',
  'Bônus I: Sexo Tântrico para Iniciantes',
  'Bônus II: Guia dos 7 Sussurros',
  'Bônus III: Controle Absoluto',
  'Acesso imediato e vitalício',
  'Garantia incondicional de 30 dias',
];

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [introDone, setIntroDone] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Intro timer */
  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  /* Enable scrolling after intro */
  useEffect(() => {
    if (introDone) {
      document.body.classList.remove('intro-loading');
    }
  }, [introDone]);

  /* Header scroll detection */
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Social proof toast */
  useEffect(() => {
    if (!introDone) return;
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.'];
    const cities = ['São Paulo, SP', 'Campinas, SP', 'Uberlândia, MG', 'Curitiba, PR', 'Joinville, SC', 'Sorocaba, SP', 'Rio de Janeiro, RJ', 'Porto Alegre, RS'];
    const actions = ['acessou o conteúdo', 'completou os módulos', 'enviou resultado', 'aplicou no final de semana'];
    let lastIdx = -1;
    function showToast() {
      let idx: number;
      do { idx = Math.floor(Math.random() * names.length); } while (idx === lastIdx);
      lastIdx = idx;
      const mins = Math.floor(Math.random() * 12) + 1;
      setToastText(`${names[idx]} de ${cities[Math.floor(Math.random() * cities.length)]} ${actions[Math.floor(Math.random() * actions.length)]} · ${mins} min atrás`);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    }
    const t1 = setTimeout(showToast, 8000);
    const t2 = setInterval(showToast, 25000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [introDone]);

  const goCheckout = useCallback(() => { window.open(CHECKOUT, '_blank'); }, []);

  return (
    <>
      {/* ═══ INTRO OVERLAY ═══ */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="stitch-intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src={HERO_GIF} alt="" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ TOAST ═══ */}
      <div className={`stitch-toast ${toastVisible ? 'show' : ''}`}>
        <div className="stitch-toast-dot" />
        <p className="stitch-toast-text">{toastText}</p>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`stitch-header ${headerScrolled ? 'scrolled' : ''}`}>
        <span className="stitch-header-logo-text">Código do Toque</span>
        <nav className="stitch-header-nav">
          <a href="#problema">Método</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#bonus">Bônus</a>
          <a href="#depoimentos">Depoimentos</a>
        </nav>
      </header>

      {/* ═══ HERO + BG EXTENSION ═══ */}
      <div className="stitch-hero-wrap">
        <div className="stitch-hero-bg">
          <img src={HERO_GIF} alt="" className="stitch-hero-bg-gif" />
          <div className="stitch-hero-overlay" />
        </div>
        <section className="stitch-hero">
          <div className="stitch-hero-content">
            <MotionFade>
              <span className="stitch-hero-eyebrow">Método Tântrico · Desenvolvido por Terapeuta Clínica</span>
            </MotionFade>
            <MotionFade delay={0.1}>
              <h1 className="stitch-hero-title">
                O toque que faz ela<br />não conseguir parar de pensar em <span className="stitch-hero-title-red">você</span>
              </h1>
            </MotionFade>
            <MotionFade delay={0.2}>
              <p className="stitch-hero-desc">
                23 movimentos tântricos que criam uma conexão física e emocional tão profunda que ela vai se lembrar da experiência ao seu lado pelo resto da vida.
              </p>
            </MotionFade>
            <MotionFade delay={0.3}>
              <div className="stitch-hero-rating">
                <div className="stitch-hero-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
                <span className="stitch-hero-rating-text">4.9 · 488 avaliações verificadas</span>
              </div>
            </MotionFade>
            <MotionFade delay={0.4}>
              <motion.button
                className="stitch-btn-hero"
                onClick={goCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quero o Código do Toque — R$ 24,90
              </motion.button>
            </MotionFade>
            <MotionFade delay={0.5}>
              <div className="stitch-hero-trust">
                <span>Acesso imediato</span>
                <span className="stitch-hero-trust-sep">·</span>
                <span>Garantia de 30 dias</span>
                <span className="stitch-hero-trust-sep">·</span>
                <span>Pagamento seguro via Cakto</span>
              </div>
            </MotionFade>
          </div>
        </section>
      </div>

      {/* ═══ SEÇÃO 1 — PROBLEMA ═══ */}
      <section className="stitch-problem fade-section" id="problema">
        <div className="stitch-container">
          <MotionFade>
            <p className="stitch-section-label">O problema que ninguém admite</p>
          </MotionFade>
          <MotionFade delay={0.1}>
            <h2 className="stitch-problem-title">Você sabe que a conexão pode ser muito mais profunda do que é.</h2>
          </MotionFade>
          <MotionFade delay={0.15}>
            <p className="stitch-problem-text">
              A maioria dos homens se esforça. Faz o que acha certo. Mas existe uma distância entre &ldquo;foi bom&rdquo; e &ldquo;foi inesquecível&rdquo; — e essa distância não tem nada a ver com duração ou técnica de cama.
            </p>
          </MotionFade>
          <MotionFade delay={0.2}>
            <p className="stitch-problem-text">
              Tem tudo a ver com toque. Com como você toca. Onde. Quando. Com que intenção.
            </p>
          </MotionFade>
          <MotionFade delay={0.25}>
            <ul className="stitch-pain-list">
              {painPoints.map((p, i) => (
                <motion.li
                  key={i}
                  className="stitch-pain-item"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="stitch-pain-bullet">—</span>
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
          </MotionFade>
          <MotionFade delay={0.3}>
            <p className="stitch-problem-text stitch-problem-text-highlight">
              Isso não é falta de amor. Não é problema do relacionamento. É falta de um mapa.
            </p>
          </MotionFade>
        </div>
      </section>

      {/* ═══ SEÇÃO 2 — TRANSIÇÃO / CITAÇÃO ═══ */}
      <section className="stitch-transition fade-section">
        <MotionFade>
          <blockquote className="stitch-transition-quote">
            &ldquo;O toque consciente é a linguagem que o corpo entende antes que a mente processe.&rdquo;
          </blockquote>
        </MotionFade>
        <MotionFade delay={0.15}>
          <cite className="stitch-transition-author">Luna Amaral · Terapeuta Tântrica · 6 anos de prática clínica</cite>
        </MotionFade>
      </section>

      {/* ═══ SEÇÃO 3 — SOLUÇÃO ═══ */}
      <section className="stitch-solution fade-section" id="solucao">
        <div className="stitch-container">
          <MotionFade>
            <span className="stitch-solution-badge">✦ Código do Toque</span>
          </MotionFade>
          <MotionFade delay={0.1}>
            <h2 className="stitch-solution-title">23 movimentos que ensinam o corpo dela a procurar o seu.</h2>
          </MotionFade>
          <MotionFade delay={0.15}>
            <p className="stitch-solution-text">
              O Código do Toque não é um guia de massagem. É um protocolo desenvolvido a partir de 6 anos de prática clínica com tantra terapêutico — traduzido em passo a passo visual que qualquer homem consegue aplicar hoje à noite, mesmo sem nenhuma experiência anterior.
            </p>
          </MotionFade>
          <MotionFade delay={0.2}>
            <p className="stitch-solution-text">
              O que muda: ela para de &ldquo;estar presente&rdquo; e começa a se entregar. A diferença é perceptível na primeira aplicação — e cumulativa em cada vez seguinte.
            </p>
          </MotionFade>
          <div className="stitch-solution-grid">
            {solutionCards.map((card, i) => (
              <motion.div
                key={i}
                className="stitch-solution-card"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="stitch-solution-card-num">{card.num}</div>
                <h4 className="stitch-solution-card-title">{card.title}</h4>
                <p className="stitch-solution-card-desc">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 4 — CONTEÚDO ═══ */}
      <section className="stitch-content fade-section" id="conteudo">
        <div className="stitch-container">
          <MotionFade>
            <p className="stitch-section-label">O que está dentro</p>
          </MotionFade>
          <MotionFade delay={0.1}>
            <h2 className="stitch-content-title">Cada módulo tem um propósito. Nenhum é filler.</h2>
          </MotionFade>
          <div className="stitch-modules-list">
            {contentModules.map((m, i) => (
              <motion.div
                key={i}
                className="stitch-module-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="stitch-module-num-wrap">
                  <MotionIconWrap delay={0.05 * i}>
                    <div className="stitch-module-icon">{m.num}</div>
                  </MotionIconWrap>
                </div>
                <div className="stitch-module-body">
                  <h4 className="stitch-module-title">{m.title}</h4>
                  <p className="stitch-module-desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 5 — BÔNUS ═══ */}
      <section className="stitch-bonus fade-section" id="bonus">
        <div className="stitch-container">
          <MotionFade>
            <p className="stitch-section-label">Incluído no acesso</p>
          </MotionFade>
          <MotionFade delay={0.1}>
            <h2 className="stitch-bonus-title">3 bônus que amplificam cada movimento</h2>
          </MotionFade>
          <MotionFade delay={0.15}>
            <p className="stitch-bonus-subtitle">Não são extras genéricos. Cada um resolve um obstáculo real.</p>
          </MotionFade>
        </div>
        <div className="stitch-bonus-grid">
          {bonuses.map((b, i) => (
            <motion.div
              key={i}
              className="stitch-bonus-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <p className="stitch-bonus-label">BÔNUS {b.num}</p>
              <h4 className="stitch-bonus-card-title">{b.title}</h4>
              <p className="stitch-bonus-card-desc">{b.desc}</p>
              <div className="stitch-bonus-card-bottom">
                <span className="stitch-bonus-value">{b.value}</span>
                <span className="stitch-bonus-free">Grátis</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="stitch-container">
          <MotionFade delay={0.2}>
            <p className="stitch-bonus-total">Valor total dos bônus: R$ 109,70 · Incluídos sem custo adicional</p>
          </MotionFade>
        </div>
      </section>

      {/* ═══ SEÇÃO 6 — DEPOIMENTOS ═══ */}
      <section className="stitch-testimonials fade-section" id="depoimentos">
        <div className="stitch-container">
          <MotionFade>
            <p className="stitch-section-label">Resultados reais</p>
          </MotionFade>
          <MotionFade delay={0.1}>
            <h2 className="stitch-testimonials-title">O que mudou para quem aplicou</h2>
          </MotionFade>
          <MotionFade delay={0.15}>
            <p className="stitch-testimonials-subtitle">488 avaliações · Nota 4.9/5.0</p>
          </MotionFade>
        </div>
        <div className="stitch-carousel-wrapper">
          <div className="stitch-carousel-track">
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="stitch-carousel-card">
                <div className="stitch-carousel-stars">{[...Array(5)].map((_, j) => <StarIcon key={j} />)}</div>
                <p className="stitch-carousel-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="stitch-carousel-author">
                  <div className="stitch-carousel-initials">{t.avatar}</div>
                  <div>
                    <p className="stitch-carousel-name">{t.name}</p>
                    <p className="stitch-carousel-city">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SEÇÃO 7 — AUTORIDADE ═══ */}
      <section className="stitch-authority fade-section">
        <div className="stitch-container">
          <MotionFade>
            <p className="stitch-section-label">Sobre o método</p>
          </MotionFade>
          <MotionFade delay={0.1}>
            <p className="stitch-authority-text">
              O Código do Toque foi desenvolvido com base em 6 anos de prática clínica em terapia tântrica com centenas de atendimentos. Não é teoria retirada de livro. É o que realmente funciona, extraído de sessão em sessão, refinado por resultado real.
            </p>
          </MotionFade>
        </div>
      </section>

      {/* ═══ SEÇÃO 8 — GARANTIA ═══ */}
      <section className="stitch-guarantee fade-section">
        <div className="stitch-guarantee-inner">
          <MotionIconWrap>
            <div className="stitch-guarantee-icon"><ShieldIcon /></div>
          </MotionIconWrap>
          <MotionFade>
            <h3 className="stitch-guarantee-heading">Garantia incondicional de 30 dias</h3>
          </MotionFade>
          <MotionFade delay={0.1}>
            <p className="stitch-guarantee-text">
              Você tem 30 dias para aplicar os 23 movimentos e avaliar por conta própria. Se por qualquer razão não ficar satisfeito, devolvemos 100% do valor pago — sem formulários, sem perguntas, sem burocracia.
            </p>
          </MotionFade>
          <MotionFade delay={0.15}>
            <p className="stitch-guarantee-italic">O risco é inteiramente nosso. O único risco real é não tentar.</p>
          </MotionFade>
        </div>
      </section>

      {/* ═══ SEÇÃO 9 — OFERTA ═══ */}
      <section className="stitch-offer fade-section" id="oferta">
        <div className="stitch-container">
          <motion.div
            className="stitch-offer-card"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stitch-offer-details">
              <p className="stitch-section-label">Oferta de Lançamento</p>
              <h3 className="stitch-offer-heading">Código do Toque</h3>

              <div className="stitch-offer-price-block">
                <p className="stitch-offer-from">De R$ 134,60</p>
                <div className="stitch-offer-price-row">
                  <span className="stitch-offer-currency">R$</span>
                  <span className="stitch-offer-amount">24,90</span>
                </div>
                <p className="stitch-offer-tags">Pagamento único · Acesso vitalício · 81% OFF</p>
              </div>

              <ul className="stitch-offer-list">
                {offerChecklist.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                  >
                    <span className="stitch-offer-check"><CheckIcon /></span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="stitch-offer-cta"
                onClick={goCheckout}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
              >
                Quero o Código do Toque — R$ 24,90
              </motion.button>

              <p className="stitch-offer-trust">Pagamento seguro via Cakto · Acesso em menos de 2 minutos</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SEÇÃO 10 — FAQ ═══ */}
      <section className="stitch-faq fade-section">
        <div className="stitch-container">
          <MotionFade>
            <h2 className="stitch-faq-title">Perguntas frequentes</h2>
          </MotionFade>
        </div>
        <div className="stitch-faq-list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`stitch-faq-item reveal ${openFaq === i ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <div className="stitch-faq-question">
                <span>{faq.q}</span>
                <ChevronIcon />
              </div>
              <div className="stitch-faq-answer"><p>{faq.a}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="stitch-footer-cta fade-section">
        <div className="stitch-container">
          <MotionFade>
            <h2 className="stitch-footer-cta-title">Ela ainda não sabe o que você vai fazer por ela.</h2>
          </MotionFade>
          <MotionFade delay={0.1}>
            <p className="stitch-footer-cta-text">
              Mas depois que você aplicar os 23 movimentos, ela vai querer que você faça de novo. E de novo.
            </p>
          </MotionFade>
          <MotionFade delay={0.2}>
            <motion.button
              className="stitch-btn-hero"
              onClick={goCheckout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar agora — R$ 24,90
            </motion.button>
          </MotionFade>
          <MotionFade delay={0.25}>
            <div className="stitch-footer-cta-badges">
              <span>Garantia de 30 dias</span>
              <span>Acesso imediato</span>
              <span>81% OFF</span>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-trust">
            <span>Pagamento seguro</span>
            <span>·</span>
            <span>Acesso imediato</span>
            <span>·</span>
            <span>Garantia de 30 dias</span>
          </div>
          <p className="stitch-footer-copy">© 2024 Código do Toque · Todos os direitos reservados · Pagamento processado via Cakto</p>
          <p className="stitch-footer-disclaimer">Este produto é para maiores de 18 anos. Os resultados individuais podem variar.</p>
        </div>
      </footer>
    </>
  );
}
