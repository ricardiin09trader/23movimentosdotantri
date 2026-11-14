'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS — checkout links preserved exactly as configured
   ═══════════════════════════════════════════════════════════ */

const CHECKOUT_COMPLETE = 'https://pay.cakto.com.br/3j7svgt_458559';
const CHECKOUT_BASIC = 'https://pay.cakto.com.br/8taxcob';

type Phase = 'intro' | 'quiz' | 'diagnosis' | 'qualification' | 'offer';

interface AnswerOption {
  icon: string;
  text: string;
  score: number;
  type: 'positive' | 'neutral' | 'negative';
}

interface Question {
  text: string;
  options: AnswerOption[];
}

const QUESTIONS: Question[] = [
  {
    text: 'Qual dessas frases mais combina com você hoje?',
    options: [
      { icon: '🔥', text: 'Quero melhorar minha presença nos momentos íntimos', score: 2, type: 'positive' },
      { icon: '🤔', text: 'Nunca pensei muito sobre isso', score: 1, type: 'neutral' },
      { icon: '👌', text: 'Acho que já me viro bem', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Quando o assunto é conexão, você acredita que o toque faz diferença?',
    options: [
      { icon: '✅', text: 'Sim, faz muita diferença', score: 2, type: 'positive' },
      { icon: '🤔', text: 'Talvez, depende do momento', score: 1, type: 'neutral' },
      { icon: '❌', text: 'Não tenho certeza', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Você já sentiu que estava apenas repetindo o básico, sem saber exatamente como conduzir o momento?',
    options: [
      { icon: '✅', text: 'Sim, isso já aconteceu', score: 2, type: 'positive' },
      { icon: '🤔', text: 'Talvez, às vezes fico em dúvida', score: 1, type: 'neutral' },
      { icon: '❌', text: 'Não, nunca pensei nisso', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Você já ficou na dúvida se ela estava realmente envolvida ou apenas seguindo o momento?',
    options: [
      { icon: '✅', text: 'Sim, já tive essa dúvida', score: 2, type: 'positive' },
      { icon: '🤔', text: 'Talvez, nem sempre é claro', score: 1, type: 'neutral' },
      { icon: '❌', text: 'Não costumo perceber isso', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Como você gostaria que ela se sentisse depois de uma experiência com você?',
    options: [
      { icon: '🔥', text: 'Marcada e querendo repetir', score: 2, type: 'positive' },
      { icon: '✨', text: 'Mais conectada e entregue', score: 2, type: 'positive' },
      { icon: '👌', text: 'Apenas satisfeita já está bom', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Se você pudesse aprender movimentos simples para transmitir mais presença, segurança e intenção, você gostaria?',
    options: [
      { icon: '✅', text: 'Sim, com certeza', score: 2, type: 'positive' },
      { icon: '🤔', text: 'Talvez, se fosse fácil de aplicar', score: 1, type: 'neutral' },
      { icon: '❌', text: 'Não sei se preciso disso', score: 0, type: 'negative' },
    ],
  },
  {
    text: 'Se existisse um método direto com 23 movimentos guiados para criar uma experiência mais intensa e memorável, você gostaria de conhecer?',
    options: [
      { icon: '🔥', text: 'Sim, quero conhecer', score: 2, type: 'positive' },
      { icon: '👀', text: 'Talvez, quero entender melhor', score: 1, type: 'neutral' },
      { icon: '👌', text: 'Só se for simples e rápido', score: 1, type: 'neutral' },
    ],
  },
];

const DIMENSIONS = [
  { label: 'Consciência do Toque', avg: 42 },
  { label: 'Habilidade de Condução', avg: 35 },
  { label: 'Leitura Corporal', avg: 28 },
  { label: 'Intenção & Presença', avg: 38 },
];

function getDimensionScores(answers: number[]): number[] {
  const dim1 = Math.round(((answers[0] + answers[1]) / 4) * 100);
  const dim2 = Math.round(((answers[2] + answers[5]) / 4) * 100);
  const dim3 = Math.round(((answers[3] + answers[6]) / 4) * 100);
  const dim4 = Math.round(((answers[4] + answers[1]) / 4) * 100);
  return [dim1, dim2, dim3, dim4];
}

function getOverallPercent(answers: number[]): number {
  const total = answers.reduce((a, b) => a + b, 0);
  return Math.round((total / 14) * 100);
}

const DIAGNOSIS: Record<string, { title: string; text: string }> = {
  high: {
    title: '🔥 Seu diagnóstico: você tem alto potencial de criar uma experiência memorável',
    text: 'Pelas suas respostas, você já entende que o toque não é apenas contato físico. Ele pode transmitir presença, desejo, segurança e intenção. O ponto é que a maioria dos homens tenta improvisar. E quando não existe direção, o momento pode cair no automático. Por isso o Código do Toque foi criado: para te mostrar 23 movimentos ilustrados, organizados em um guia digital que você estuda no seu tempo.',
  },
  medium: {
    title: '👀 Seu diagnóstico: você sente que existe algo a mais, mas talvez ainda não saiba como acessar',
    text: 'Suas respostas mostram que você percebe a importância da conexão, mas talvez ainda falte clareza sobre como conduzir isso na prática. E esse é exatamente o ponto: não basta querer criar um momento melhor. É preciso saber como preparar o ambiente, perceber a resposta dela e ajustar o ritmo. O Código do Toque organiza esse caminho e apresenta 23 movimentos ilustrados.',
  },
  low: {
    title: '👌 Seu diagnóstico: talvez você ainda não veja o toque como uma habilidade, mas ele pode mudar tudo',
    text: 'Muitos homens acreditam que conexão acontece naturalmente. Mas a verdade é que o toque certo pode mudar completamente a experiência. Antes de qualquer sequência, existe um detalhe que muitos ignoram: preparar o momento, observar a resposta e ajustar o ritmo. O Código do Toque organiza esse caminho em um guia digital ilustrado.',
  },
};

const QUAL_CARDS = [
  'Você demonstrou interesse em melhorar sua conexão pelo toque.',
  'Você reconhece que o toque faz diferença na intimidade.',
  'Você está buscando mais direção para conduzir o momento.',
  'Você está qualificado para conhecer o Código do Toque.',
];

/* Three bonus materials that come with the Pacote Completo.
   Descriptions are kept objective and do not invent specific content. */
const BONUS_MATERIALS = [
  {
    name: 'Palavras que Aproximam',
    cover: '/covers/palavras-que-aproximam.png',
    phrase: 'Como usar a palavra certa no momento certo para criar aproximação.',
  },
  {
    name: 'Conexão a Dois',
    cover: '/covers/conexao-a-dois.png',
    phrase: 'Práticas e leituras para fortalecer a presença e a conexão a dois.',
  },
  {
    name: 'Tantra sem Complicação',
    cover: '/covers/tantra-sem-complicacao.png',
    phrase: 'Uma introdução direta aos princípios do tantra, sem teoria excessiva.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'O material é digital ou físico?',
    a: 'É 100% digital. Você recebe arquivos em PDF. Nada é enviado pelos Correios — não há entrega física.',
  },
  {
    q: 'Como recebo o acesso?',
    a: 'Após a confirmação do pagamento, o material é enviado por e-mail. Verifique também a pasta de spam ou promoções.',
  },
  {
    q: 'Qual a diferença entre os dois planos?',
    a: 'O plano de R$14,90 contém somente o Código do Toque (guia com 23 movimentos ilustrados). O Pacote Completo de R$24,90 contém quatro materiais digitais em PDF: Código do Toque + Palavras que Aproximam + Conexão a Dois + Tantra sem Complicação.',
  },
  {
    q: 'Como acesso os arquivos depois de comprar?',
    a: 'O acesso é enviado por e-mail após a confirmação do pagamento. Você baixa os PDFs no seu tempo e pode estudar no celular, tablet ou computador.',
  },
  {
    q: 'Preciso de experiência prévia?',
    a: 'Não. O guia foi pensado para homens de todos os níveis. Os 23 movimentos são apresentados de forma ilustrada, passo a passo.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você tem 7 dias de garantia. Se sentir que o material não é para você, basta solicitar reembolso nesse prazo.',
  },
  {
    q: 'É seguro comprar online?',
    a: 'Sim. O pagamento é processado pela plataforma Cakto, com criptografia. Seus dados ficam protegidos.',
  },
];

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

function trackFBQ(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    (window as unknown as { fbq: (e: string, n: string, p?: Record<string, unknown>) => void }).fbq('trackCustom', event, params);
  }
}

function trackFBStandard(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    (window as unknown as { fbq: (e: string, n: string, p?: Record<string, unknown>) => void }).fbq('track', event, params);
  }
}

function getDiagnosisLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 11) return 'high';
  if (score >= 7) return 'medium';
  return 'low';
}

function scrollToId(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════ */

const fadeVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/* ═══════════════════════════════════════════════════════════
   INLINE SVG ICONS
   ═══════════════════════════════════════════════════════════ */

const CHECK_RED_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';
const CHEVRON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
const SHIELD_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';

function SvgInline({ html, className }: { html: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ═══════════════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════════════ */

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((p) => !p), []);
  return (
    <div
      className={`stitch-faq-item${open ? ' open' : ''}`}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
    >
      <div className="stitch-faq-question">
        <span>{question}</span>
        <span className="faq-chevron"><SvgInline html={CHEVRON_SVG} /></span>
      </div>
      <div className="stitch-faq-answer"><p>{answer}</p></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  // Sales page is the direct landing — the interested person must
  // recognize the "detail before the 23 movements" idea immediately.
  const [screen, setScreen] = useState<'quiz' | 'sales'>('sales');
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const salesRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => { document.body.classList.remove('intro-loading'); }, []);

  useEffect(() => { if (phase === 'diagnosis') trackFBQ('DiagnosisViewed'); }, [phase]);

  useEffect(() => {
    if (screen !== 'sales') return;
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) headerRef.current.classList.add('scrolled');
        else headerRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'sales') return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }); },
      { threshold: 0.1 },
    );
    const sections = salesRef.current?.querySelectorAll('.fade-section');
    sections?.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [screen]);

  const handleStart = useCallback(() => { trackFBQ('QuizStarted'); setPhase('quiz'); }, []);

  const handleAnswer = useCallback(
    (option: AnswerOption, idx: number) => {
      trackFBQ('QuizQuestionAnswered');
      setAnswers((a) => [...a, option.score]);
      setSelectedIdx(idx);
      setTimeout(() => {
        setSelectedIdx(null);
        if (currentQ < QUESTIONS.length - 1) setCurrentQ((q) => q + 1);
        else { trackFBQ('QuizCompleted'); setPhase('diagnosis'); }
      }, 450);
    },
    [currentQ],
  );

  const handleGoToSales = useCallback((anchor?: string) => {
    trackFBStandard('InitiateCheckout', { content_name: 'Código do Toque', content_category: 'Infoproduto', value: 24.9, currency: 'BRL' });
    document.body.style.overflow = '';
    setScreen('sales');
    setTimeout(() => {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 100);
  }, []);

  const handleCheckoutComplete = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: 'Código do Toque', content_category: 'Infoproduto', value: 24.9, currency: 'BRL' });
    window.open(CHECKOUT_COMPLETE, '_blank');
  }, []);
  const handleCheckoutBasic = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: 'Código do Toque', content_category: 'Infoproduto', value: 14.9, currency: 'BRL' });
    window.open(CHECKOUT_BASIC, '_blank');
  }, []);

  const progressPercent = ((currentQ + 1) / QUESTIONS.length) * 100;

  /* ═══════════════════════════════════════════════════════════
     QUIZ SCREEN (kept intact for the funnel; not the default landing)
     ═══════════════════════════════════════════════════════════ */
  if (screen === 'quiz') {
    return (
      <main className="qz-container">
        <div className="qz-inner">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div key="intro" className="qz-intro" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h1 className="qz-intro-headline">Descubra seu nível de conexão pelo toque</h1>
                <p className="qz-intro-sub">Responda algumas perguntas rápidas e veja se você já sabe criar uma experiência que ela realmente lembra depois.</p>
                <p className="qz-intro-support">O toque certo pode mudar completamente a forma como ela sente sua presença. Mas poucos homens sabem conduzir isso com intenção.</p>
                <button className="qz-cta" onClick={handleStart}>COMEÇAR DIAGNÓSTICO</button>
              </motion.div>
            )}

            {phase === 'quiz' && (
              <motion.div key={`quiz-${currentQ}`} className="qz-quiz" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <div className="qz-progress-wrap">
                  <p className="qz-progress-label">Etapa {currentQ + 1} de {QUESTIONS.length}</p>
                  <div className="qz-progress-bar"><div className="qz-progress-fill" style={{ width: `${progressPercent}%` }} /></div>
                </div>
                <h2 className="qz-question">{QUESTIONS[currentQ].text}</h2>
                <div className="qz-answers">
                  {QUESTIONS[currentQ].options.map((option, i) => (
                    <motion.button
                      key={`${currentQ}-${i}`}
                      className={`qz-answer-btn${selectedIdx === i ? ' qz-answer-selected' : ''}`}
                      onClick={() => handleAnswer(option, i)}
                      variants={staggerItem}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.08 + i * 0.06 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="qz-answer-icon">{option.icon}</span>
                      <span>{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'diagnosis' && (
              <motion.div key="diagnosis" className="qz-diagnosis" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="qz-diagnosis-title">Seu perfil de conexão</h2>
                <p className="qz-diagnosis-subtitle">Veja como você se compara com a maioria dos homens</p>

                <div className="qz-chart-ring-wrap">
                  <svg className="qz-chart-ring" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
                    <motion.circle
                      cx="60" cy="60" r="52" fill="none" stroke="var(--red)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - getOverallPercent(answers) / 100) }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="qz-chart-ring-label">
                    <motion.span className="qz-chart-ring-pct" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{getOverallPercent(answers)}%</motion.span>
                    <span className="qz-chart-ring-text">seu nível</span>
                  </div>
                </div>

                <div className="qz-chart-bars">
                  {DIMENSIONS.map((dim, i) => {
                    const userVal = getDimensionScores(answers)[i];
                    return (
                      <div key={i} className="qz-chart-bar-row">
                        <p className="qz-chart-bar-label">{dim.label}</p>
                        <div className="qz-chart-bar-track">
                          <div className="qz-chart-bar-avg" style={{ width: `${dim.avg}%` }} />
                          <motion.div
                            className="qz-chart-bar-user"
                            initial={{ width: 0 }}
                            animate={{ width: `${userVal}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 + i * 0.15 }}
                          />
                        </div>
                        <div className="qz-chart-bar-legend">
                          <span className="qz-chart-legend-user">Você {userVal}%</span>
                          <span className="qz-chart-legend-avg">Média {dim.avg}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="qz-chart-insight">
                  <p className="qz-chart-insight-text">
                    {getOverallPercent(answers) >= 70
                      ? 'Você já percebe que o toque é uma ferramenta poderosa. Mas perceber não é o mesmo que dominar. A maioria dos homens para na teoria.'
                      : getOverallPercent(answers) >= 40
                        ? 'Você está no caminho, mas ainda falta direção prática. A diferença entre perceber e aplicar é onde a maioria dos homens fica presa.'
                        : 'A maioria dos homens não sabe que o toque pode ser treinado. Esse é o primeiro passo para mudar sua conexão íntima.'}
                  </p>
                </div>

                <p className="qz-diagnosis-text" style={{ marginTop: '24px' }}>
                  {DIAGNOSIS[getDiagnosisLevel(answers.reduce((a, b) => a + b, 0))].text}
                </p>

                <button className="qz-cta" style={{ marginTop: '24px' }} onClick={() => handleGoToSales('produto')}>VER O GUIA</button>
              </motion.div>
            )}

            {phase === 'qualification' && (
              <motion.div key="qualification" className="qz-qualification" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="qz-qual-title">Com base nas suas respostas...</h2>
                <motion.div className="qz-qual-cards" variants={staggerContainer} initial="initial" animate="animate">
                  {QUAL_CARDS.map((text, i) => (
                    <motion.div key={i} className="qz-qual-card" variants={staggerItem}>
                      <span className="qz-qual-check"><span dangerouslySetInnerHTML={{ __html: CHECK_RED_SVG }} /></span>
                      <p className="qz-qual-card-text">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="qz-qual-bar">
                  <span className="qz-qual-bar-icon">✓</span>
                  <p className="qz-qual-bar-text">Você está qualificado para conhecer o Código do Toque</p>
                </div>
                <p className="qz-qual-desc">Como você completou o diagnóstico, você pode acessar o guia digital ilustrado agora.</p>
                <button className="qz-cta" onClick={() => setPhase('offer')}>VER O GUIA</button>
              </motion.div>
            )}

            {phase === 'offer' && (
              <motion.div key="offer" className="qz-offer" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="qz-offer-title">O guia está liberado</h2>
                <p className="qz-offer-text">Agora você conhece o Código do Toque: um guia digital ilustrado com 23 movimentos, para estudar no seu tempo.</p>
                <div className="qz-price-card">
                  <p className="qz-price-label">a partir de</p>
                  <p className="qz-price-main">R$14,90</p>
                  <p className="qz-urgency">Material digital em PDF. Acesso enviado por e-mail após a confirmação do pagamento.</p>
                  <button className="qz-cta qz-cta-lg" onClick={() => handleGoToSales('planos')}>VER OS DOIS PLANOS</button>
                </div>
                <p className="qz-offer-footer">O Código do Toque organiza o caminho que vem antes dos movimentos e apresenta 23 movimentos ilustrados.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     SALES PAGE
     ═══════════════════════════════════════════════════════════ */
  return (
    <div ref={salesRef} className="stitch-root">
      {/* 1. HEADER */}
      <header className="stitch-header" ref={headerRef}>
        <span className="stitch-header-logo-text">CÓDIGO DO TOQUE</span>
        <nav className="stitch-header-nav">
          <a href="#mecanismo">Mecanismo</a>
          <a href="#produto">O Guia</a>
          <a href="#planos">Planos</a>
          <a href="#faq">Dúvidas</a>
        </nav>
      </header>

      {/* 2. HERO — first fold */}
      <section className="stitch-hero fade-section">
        <div className="stitch-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="stitch-hero-bg-gif" src="/hero-intro.gif" alt="" aria-hidden="true" />
          <div className="stitch-hero-overlay" />
        </div>
        <div className="stitch-hero-grid">
          <div className="stitch-hero-content">
            <p className="stitch-hero-eyebrow">GUIA DIGITAL ILUSTRADO</p>
            <h1 className="stitch-hero-title">
              Antes dos 23 movimentos, existe um detalhe que muitos homens ignoram.
            </h1>
            <p className="stitch-hero-desc">
              Aprenda a preparar o momento, perceber a resposta dela e ajustar ritmo, pausa e toque.
              O Código do Toque organiza esse caminho em um guia digital ilustrado, para você estudar no seu tempo.
            </p>
            <button className="stitch-btn-hero" onClick={() => scrollToId('produto')}>Ver o que há no guia</button>
            <p className="stitch-hero-line">Guia digital ilustrado &nbsp;•&nbsp; 23 movimentos &nbsp;•&nbsp; acesso por e-mail</p>
          </div>

          {/* Phone mockup with the current Código do Toque cover */}
          <div className="stitch-hero-mockup">
            <div className="stitch-phone">
              <div className="stitch-phone-notch" />
              <div className="stitch-phone-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/covers/codigo-do-toque.png" alt="Capa do Código do Toque no celular" className="stitch-phone-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MECHANISM — explain what comes before the movements */}
      <section className="stitch-mechanism fade-section" id="mecanismo">
        <div className="stitch-container">
          <h2 className="stitch-mechanism-title">O movimento é só uma parte da experiência.</h2>
          <p className="stitch-mechanism-text">
            Preparação, atenção e ritmo ajudam você a entender o momento antes de seguir qualquer sequência.
            O guia mostra como organizar esses elementos e apresenta 23 movimentos ilustrados.
          </p>
          <div className="stitch-mechanism-grid">
            <div className="stitch-mechanism-point">
              <span className="stitch-mechanism-num">01</span>
              <h3 className="stitch-mechanism-point-title">Prepare o ambiente e o momento</h3>
              <p className="stitch-mechanism-point-desc">O caminho começa antes do toque. O guia mostra como criar o momento certo.</p>
            </div>
            <div className="stitch-mechanism-point">
              <span className="stitch-mechanism-num">02</span>
              <h3 className="stitch-mechanism-point-title">Observe as respostas e ajuste o ritmo</h3>
              <p className="stitch-mechanism-point-desc">Perceber a resposta dela define o próximo passo: intensificar, sustentar ou pausar.</p>
            </div>
            <div className="stitch-mechanism-point">
              <span className="stitch-mechanism-num">03</span>
              <h3 className="stitch-mechanism-point-title">Explore os 23 movimentos ilustrados</h3>
              <p className="stitch-mechanism-point-desc">Depois de preparar e observar, você segue uma sequência ilustrada de 23 movimentos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSITION QUOTE */}
      <section className="stitch-transition fade-section">
        <p className="stitch-transition-quote">&ldquo;O toque não é apenas contato. É linguagem. E poucos homens sabem falar essa língua.&rdquo;</p>
        <p className="stitch-transition-author">— Código do Toque</p>
      </section>

      {/* 5. PRODUCT — Veja o que você recebe */}
      <section className="stitch-product fade-section" id="produto">
        <div className="stitch-container">
          <p className="stitch-section-label">O QUE VOCÊ RECEBE</p>
          <h2 className="stitch-product-title">Veja o que há no guia</h2>
          <p className="stitch-product-subtitle">Um material digital ilustrado, organizado para você estudar no seu tempo.</p>

          <div className="stitch-product-showcase">
            <div className="stitch-product-mockup">
              <div className="stitch-phone stitch-phone-lg">
                <div className="stitch-phone-notch" />
                <div className="stitch-phone-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/covers/codigo-do-toque.png" alt="Capa do Código do Toque" className="stitch-phone-img" />
                </div>
              </div>
            </div>
            <div className="stitch-product-points">
              <div className="stitch-product-point">
                <span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span>
                <p>Um guia digital em PDF, com a capa e o conteúdo organizados em sequência.</p>
              </div>
              <div className="stitch-product-point">
                <span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span>
                <p>23 movimentos apresentados de forma ilustrada, passo a passo.</p>
              </div>
              <div className="stitch-product-point">
                <span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span>
                <p>O caminho que vem antes dos movimentos: preparação, atenção e ritmo.</p>
              </div>
              <div className="stitch-product-point">
                <span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span>
                <p>Leitura no seu tempo, no celular, tablet ou computador.</p>
              </div>
            </div>
          </div>

          <p className="stitch-product-notice">
            Material digital em PDF. Acesso enviado por e-mail após a confirmação do pagamento.
          </p>
        </div>
      </section>

      {/* 6. BONUS — only the three real complementary materials */}
      <section className="stitch-bonus fade-section" id="bonus">
        <div className="stitch-bonus-header">
          <p className="stitch-bonus-section-label">PACOTE COMPLETO</p>
          <h2 className="stitch-bonus-title">Três materiais complementares</h2>
          <p className="stitch-bonus-subtitle">Disponíveis apenas no Pacote Completo</p>
        </div>
        <div className="stitch-bonus-grid">
          {BONUS_MATERIALS.map((m) => (
            <div className="stitch-bonus-card" key={m.name}>
              <div className="stitch-bonus-cover-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.cover} alt={`Capa de ${m.name}`} className="stitch-bonus-cover" loading="lazy" />
              </div>
              <h3 className="stitch-bonus-card-title">{m.name}</h3>
              <p className="stitch-bonus-card-desc">{m.phrase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GUARANTEE */}
      <section className="stitch-guarantee fade-section" id="garantia">
        <div className="stitch-guarantee-inner">
          <div className="stitch-guarantee-icon"><SvgInline html={SHIELD_SVG} /></div>
          <h2 className="stitch-guarantee-heading">Garantia de 7 dias</h2>
          <p className="stitch-guarantee-text">Se por qualquer motivo você sentir que o material não é para você, solicite reembolso em até 7 dias.</p>
          <p className="stitch-guarantee-italic">O risco é zero. O material é digital.</p>
        </div>
      </section>

      {/* 8. PLANS — two comparable plans */}
      <section className="stitch-offer fade-section" id="planos">
        <div className="stitch-container">
          <div className="stitch-offer-section-header">
            <h2 className="stitch-offer-section-title">Escolha o seu plano</h2>
            <p className="stitch-offer-section-sub">Dois planos. A diferença está em quantos materiais você leva.</p>
          </div>
          <div className="stitch-plans-grid">
            {/* PLANO BÁSICO — somente o guia */}
            <div className="stitch-plan-card stitch-plan-basic">
              <p className="stitch-plan-label">SÓ O GUIA</p>
              <h3 className="stitch-plan-name">Código do Toque</h3>
              <div className="stitch-plan-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/covers/codigo-do-toque.png" alt="Código do Toque" className="stitch-plan-img" loading="lazy" />
              </div>
              <div className="stitch-plan-price-block">
                <div className="stitch-plan-price-row"><span className="stitch-plan-currency">R$ </span><span className="stitch-plan-amount">14,90</span></div>
                <p className="stitch-plan-tags">Pagamento único • Material digital em PDF</p>
              </div>
              <ul className="stitch-plan-list">
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Código do Toque em PDF</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> 23 movimentos ilustrados</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Acesso enviado por e-mail</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Garantia de 7 dias</li>
              </ul>
              <button className="stitch-plan-cta stitch-plan-cta-basic" onClick={handleCheckoutBasic}>QUERO SÓ O GUIA</button>
              <p className="stitch-plan-trust">Este plano contém somente o guia</p>
            </div>

            {/* PLANO COMPLETO — quatro materiais */}
            <div className="stitch-plan-glow-wrap">
              <div className="stitch-plan-card stitch-plan-complete">
                <div className="stitch-plan-ribbon">MAIS ESCOLHIDO</div>
                <p className="stitch-plan-label">PACOTE COMPLETO</p>
                <h3 className="stitch-plan-name">Código do Toque + 3 materiais</h3>
                <div className="stitch-plan-image-wrap stitch-plan-image-wrap-complete">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/covers/codigo-do-toque.png" alt="Código do Toque Completo" className="stitch-plan-img" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/covers/palavras-que-aproximam.png" alt="Palavras que Aproximam" className="stitch-plan-img stitch-plan-img-mini" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/covers/conexao-a-dois.png" alt="Conexão a Dois" className="stitch-plan-img stitch-plan-img-mini" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/covers/tantra-sem-complicacao.png" alt="Tantra sem Complicação" className="stitch-plan-img stitch-plan-img-mini" loading="lazy" />
                </div>
                <div className="stitch-plan-price-block">
                  <div className="stitch-plan-price-row"><span className="stitch-plan-currency">R$ </span><span className="stitch-plan-amount">24,90</span></div>
                  <p className="stitch-plan-tags">Pagamento único • Quatro materiais digitais em PDF</p>
                </div>
                <ul className="stitch-plan-list">
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Código do Toque (23 movimentos ilustrados)</li>
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Palavras que Aproximam</li>
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Conexão a Dois</li>
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Tantra sem Complicação</li>
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Acesso enviado por e-mail</li>
                  <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Garantia de 7 dias</li>
                </ul>
                <button className="stitch-plan-cta stitch-plan-cta-complete" onClick={handleCheckoutComplete}>QUERO O PACOTE COMPLETO</button>
                <p className="stitch-plan-trust">Quatro materiais digitais em PDF</p>
              </div>
            </div>
          </div>
          <p className="stitch-plan-disclaimer">O plano de R$14,90 contém somente o Código do Toque. O Pacote Completo de R$24,90 contém os quatro materiais.</p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="stitch-faq fade-section" id="faq">
        <div className="stitch-container">
          <h2 className="stitch-faq-title">Perguntas Frequentes</h2>
          <div className="stitch-faq-list">
            {FAQ_ITEMS.map((item, i) => <FAQAccordion key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* 10. FOOTER CTA */}
      <section className="stitch-footer-cta fade-section">
        <div className="stitch-container">
          <h2 className="stitch-footer-cta-title">Estude o caminho antes dos movimentos</h2>
          <p className="stitch-footer-cta-text">O Código do Toque organiza preparação, atenção, ritmo e 23 movimentos ilustrados em um guia digital.</p>
          <button className="stitch-btn-hero" onClick={() => scrollToId('planos')}>VER OS DOIS PLANOS</button>
          <div className="stitch-footer-cta-badges">
            <span>Material Digital</span>
            <span>7 Dias de Garantia</span>
            <span>Acesso por E-mail</span>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-trust"><span>Material Digital</span><span>•</span><span>7 Dias de Garantia</span><span>•</span><span>Acesso por E-mail</span></div>
          <p className="stitch-footer-copy">© 2025 Código do Toque. Todos os direitos reservados.</p>
          <p className="stitch-footer-disclaimer">Material digital em PDF, enviado por e-mail após a confirmação do pagamento. Não há entrega física. Os resultados podem variar de pessoa para pessoa.</p>
        </div>
      </footer>
    </div>
  );
}
