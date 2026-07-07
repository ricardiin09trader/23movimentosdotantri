'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const CHECKOUT_URL = 'https://pay.cakto.com.br/3j7svgt_458559';

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

const MICROFEEDBACK: Record<string, string> = {
  positive: '✓',
  neutral: '✓',
  negative: '✓',
};

const DIMENSIONS = [
  { label: 'Consciência do Toque', avg: 42 },
  { label: 'Habilidade de Condução', avg: 35 },
  { label: 'Leitura Corporal', avg: 28 },
  { label: 'Intenção & Presença', avg: 38 },
];

function getDimensionScores(answers: number[]): number[] {
  // Map 7 questions into 4 dimensions
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
    text: 'Pelas suas respostas, você já entende que o toque não é apenas contato físico. Ele pode transmitir presença, desejo, segurança e intenção. O ponto é que a maioria dos homens tenta improvisar. E quando não existe direção, o momento pode cair no automático. Por isso o Código do Toque foi criado: para te mostrar 23 movimentos tântricos simples, guiados e aplicáveis, pensados para criar uma conexão mais profunda e uma experiência que ela realmente lembra.',
  },
  medium: {
    title: '👀 Seu diagnóstico: você sente que existe algo a mais, mas talvez ainda não saiba como acessar',
    text: 'Suas respostas mostram que você percebe a importância da conexão, mas talvez ainda falte clareza sobre como conduzir isso na prática. E esse é exatamente o ponto: não basta querer criar um momento melhor. É preciso saber como tocar, quando diminuir o ritmo, como transmitir presença e como conduzir sem parecer forçado. O Código do Toque te mostra isso com 23 movimentos guiados e fáceis de aplicar.',
  },
  low: {
    title: '👌 Seu diagnóstico: talvez você ainda não veja o toque como uma habilidade, mas ele pode mudar tudo',
    text: 'Muitos homens acreditam que conexão acontece naturalmente. Mas a verdade é que o toque certo pode mudar completamente a experiência. Ele pode criar mais presença, desejo e intimidade sem precisar de palavras exageradas ou atitudes forçadas. Antes de sair, veja como o Código do Toque transforma esse processo em um método simples com 23 movimentos práticos.',
  },
};

const QUAL_CARDS = [
  'Você demonstrou interesse em melhorar sua conexão pelo toque.',
  'Você reconhece que o toque faz diferença na intimidade.',
  'Você está buscando mais direção para conduzir o momento.',
  'Você está qualificado para conhecer o Código do Toque.',
];

const TESTIMONIALS = [
  { quote: 'Depois que apliquei os movimentos, ela perguntou o que tinha mudado em mim. A diferença é absurda.', initials: 'RL', name: 'Rafael L.', city: 'São Paulo, SP' },
  { quote: 'Eu achava que já era bom. O método me mostrou que eu nem começava a tocar direito.', initials: 'MC', name: 'Marcos C.', city: 'Rio de Janeiro, RJ' },
  { quote: 'Minha esposa comentou espontaneamente que nossa intimidade mudou completamente. Valeu cada centavo.', initials: 'AS', name: 'André S.', city: 'Belo Horizonte, MG' },
  { quote: 'Simples de aplicar e o resultado é imediato. Recomendo para qualquer homem que queira se destacar.', initials: 'PF', name: 'Pedro F.', city: 'Curitiba, PR' },
  { quote: 'Os movimentos de ritmo e condução são sensacionais. Parece que eu estava no piloto automático antes.', initials: 'JN', name: 'João N.', city: 'Salvador, BA' },
  { quote: 'Em duas semanas de prática, a conexão com minha parceira atingiu outro nível.', initials: 'LM', name: 'Lucas M.', city: 'Fortaleza, CE' },
  { quote: 'O módulo de presença real mudou minha forma de encarar a intimidade. É profundo.', initials: 'DR', name: 'Diego R.', city: 'Brasília, DF' },
  { quote: 'Melhor investimento que fiz esse ano. A reação dela na primeira aplicação foi inesquecível.', initials: 'GA', name: 'Gabriel A.', city: 'Recife, PE' },
];

const FAQ_ITEMS = [
  { q: 'Preciso de experiência prévia?', a: 'Não. O método foi pensado para homens de todos os níveis, desde iniciantes até quem já tem mais vivência. Cada movimento é explicado passo a passo para que você consiga aplicar com confiança.' },
  { q: 'Como recebo o acesso?', a: 'Imediatamente após a confirmação do pagamento, você recebe o acesso completo por e-mail e pela plataforma. É possível começar a estudar nos próximos minutos.' },
  { q: 'Funciona para qualquer fase do relacionamento?', a: 'Sim. Os movimentos podem ser aplicados em qualquer contexto íntimo, independentemente do tempo de relacionamento. O método foca na técnica e na intenção, não na dinâmica do casal.' },
  { q: 'E se eu não gostar?', a: 'Você tem 7 dias de garantia incondicional. Se por qualquer motivo sentir que o método não é para você, basta solicitar reembolso e devolvemos 100% do valor, sem perguntas.' },
  { q: 'O acesso é vitalício?', a: 'Sim. Você paga uma vez e tem acesso para sempre, incluindo atualizações futuras. Não há cobranças recorrentes ou taxas extras.' },
  { q: 'É seguro comprar online?', a: 'Sim. Todo o processo é feito pela plataforma Cakto, que é uma das maiores e mais seguras do Brasil. Seus dados são protegidos com criptografia de ponta.' },
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
   CHECK ICON (kept as JSX, same as original)
   ═══════════════════════════════════════════════════════════ */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   SVG STRINGS (rendered via dangerouslySetInnerHTML to avoid SWC issues)
   ═══════════════════════════════════════════════════════════ */

const STAR_SVG = '<svg viewBox="0 0 24 24" fill="#C9A96E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
const RED_STAR_SVG = '<svg viewBox="0 0 24 24" fill="#DC2626"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
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
  const [screen, setScreen] = useState<'quiz' | 'sales'>('quiz');
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [showDownsell, setShowDownsell] = useState(false);

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

  useEffect(() => {
    if (screen !== 'sales') return;
    const show = () => { setToastVisible(true); setTimeout(() => setToastVisible(false), 4000); };
    const timer = setInterval(show, 15000);
    return () => clearInterval(timer);
  }, [screen]);

  const handleStart = useCallback(() => { trackFBQ('QuizStarted'); setPhase('quiz'); }, []);

  const handleAnswer = useCallback(
    (option: AnswerOption, idx: number) => {
      if (feedback) return;
      trackFBQ('QuizQuestionAnswered');
      setScore((s) => s + option.score);
      setAnswers((a) => [...a, option.score]);
      setSelectedIdx(idx);
      setTimeout(() => {
        setSelectedIdx(null);
        if (currentQ < QUESTIONS.length - 1) setCurrentQ((q) => q + 1);
        else { trackFBQ('QuizCompleted'); setPhase('diagnosis'); }
      }, 450);
    },
    [feedback, currentQ],
  );

  const handleGoToSales = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: 'Código do Toque', content_category: 'Infoproduto', value: 24.9, currency: 'BRL' });
    document.body.style.overflow = '';
    setScreen('sales');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCheckout = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: 'Código do Toque', content_category: 'Infoproduto', value: 24.9, currency: 'BRL' });
    window.open(CHECKOUT_URL, '_blank');
  }, []);

  const progressPercent = ((currentQ + 1) / QUESTIONS.length) * 100;

  /* ═══════════════════════════════════════════════════════════
     QUIZ SCREEN
     ═══════════════════════════════════════════════════════════ */
  if (screen === 'quiz') {
    return (
      <main className="qz-container">
        <div className="qz-inner">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div key="intro" className="qz-intro" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h1 className="qz-intro-headline">🔥 Descubra seu nível de conexão pelo toque</h1>
                <p className="qz-intro-sub">Responda algumas perguntas rápidas e veja se você já sabe criar uma experiência que ela realmente lembra depois.</p>
                <p className="qz-intro-support">O toque certo pode mudar completamente a forma como ela sente sua presença. Mas poucos homens sabem conduzir isso com intenção.</p>
                <button className="qz-cta" onClick={handleStart}>COMEÇAR DIAGNÓSTICO 🔥</button>
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
                      disabled={!!feedback}
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

                {/* Circular Score */}
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

                {/* Comparison Bars */}
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

                <button className="qz-cta" style={{ marginTop: '24px' }} onClick={() => setPhase('qualification')}>VER RESULTADO COMPLETO 🔥</button>
              </motion.div>
            )}

            {phase === 'qualification' && (
              <motion.div key="qualification" className="qz-qualification" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="qz-qual-title">🎯 Com base nas suas respostas...</h2>
                <motion.div className="qz-qual-cards" variants={staggerContainer} initial="initial" animate="animate">
                  {QUAL_CARDS.map((text, i) => (
                    <motion.div key={i} className="qz-qual-card" variants={staggerItem}>
                      <span className="qz-qual-check"><CheckIcon /></span>
                      <p className="qz-qual-card-text">{text}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="qz-qual-bar">
                  <span className="qz-qual-bar-icon">✅</span>
                  <p className="qz-qual-bar-text">Você está qualificado para desbloquear a condição especial de hoje</p>
                </div>
                <p className="qz-qual-desc">Como você completou o diagnóstico, uma condição exclusiva foi liberada para você acessar o Código do Toque com desconto.</p>
                <button className="qz-cta" onClick={() => setPhase('offer')}>VER MINHA CONDIÇÃO ESPECIAL 🔥</button>
              </motion.div>
            )}

            {phase === 'offer' && (
              <motion.div key="offer" className="qz-offer" variants={fadeVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="qz-offer-title">🔥 Sua condição especial foi liberada!</h2>
                <p className="qz-offer-text">Seu acesso promocional ao Código do Toque foi liberado. Você está a um passo de descobrir os 23 movimentos que ajudam a criar mais presença, desejo e conexão através do toque.</p>
                <div className="qz-price-card">
                  <p className="qz-price-from">De R$97,00</p>
                  <p className="qz-price-label">por apenas</p>
                  <p className="qz-price-main">R$24,90</p>
                  <p className="qz-urgency">Essa condição especial pode sair do ar a qualquer momento.</p>
                  <button className="qz-cta qz-cta-lg" onClick={handleGoToSales}>QUERO DESCONTO EXCLUSIVO 🔥</button>
                </div>
                <p className="qz-offer-footer">O Código do Toque reúne 23 movimentos tântricos para transformar o momento em uma experiência mais intensa, conectada e memorável.</p>
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
    <div ref={salesRef}>
      {/* Toast */}
      <div className={`stitch-toast${toastVisible ? ' show' : ''}`}>
        <span className="stitch-toast-dot" />
        <span className="stitch-toast-text">🔥 Alguém acabou de comprar — São Paulo</span>
      </div>

      {/* 1. HEADER */}
      <header className="stitch-header" ref={headerRef}>
        <span className="stitch-header-logo-text">CÓDIGO DO TOQUE</span>
        <nav className="stitch-header-nav">
          <a href="#metodo">Método</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#garantia">Garantia</a>
          <a href="#oferta">Oferta</a>
        </nav>
      </header>

      {/* 2. HERO */}
      <section className="stitch-hero fade-section">
        <div className="stitch-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="stitch-hero-bg-gif" src="/hero-intro.gif" alt="" />
          <div className="stitch-hero-overlay" />
        </div>
        <div className="stitch-hero-content">
          <p className="stitch-hero-eyebrow">MÉTODO CRIADO POR TERAPEUTA TÂNTRICA</p>
          <h1 className="stitch-hero-title">Por Que Alguns Homens São <span className="stitch-hero-title-red">Inesquecíveis</span> E Outros São Apenas Mais Um?</h1>
          <p className="stitch-hero-desc">Existe uma diferença invisível entre o homem que deixa uma marca e o que passa despercebido. Não é aparência. Não é dinheiro. É a forma como ele toca, conduz e faz ela sentir cada segundo.</p>
          <div className="stitch-hero-rating">
            <div className="stitch-hero-stars">
              <SvgInline html={STAR_SVG} /><SvgInline html={STAR_SVG} /><SvgInline html={STAR_SVG} /><SvgInline html={STAR_SVG} /><SvgInline html={STAR_SVG} />
            </div>
            <span className="stitch-hero-rating-text">2.847+ homens transformaram sua conexão</span>
          </div>
          <button className="stitch-btn-hero" onClick={handleCheckout}>QUERO CONHECER O MÉTODO</button>
          <div className="stitch-hero-trust">
            <span>Compra Segura</span>
            <span className="stitch-hero-trust-sep">|</span>
            <span>7 Dias de Garantia</span>
            <span className="stitch-hero-trust-sep">|</span>
            <span>Acesso Imediato</span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section className="stitch-problem fade-section">
        <div className="stitch-container">
          <h2 className="stitch-problem-title">A maioria dos homens nem percebe que está perdendo a maior oportunidade de conexão</h2>
          <p className="stitch-problem-text">A intimidade se tornou automática. Toque sem intenção. Movimentos repetitivos. Nenhuma condução real. E o resultado? Um momento que passa sem deixar marca.</p>
          <p className="stitch-problem-text stitch-problem-text-highlight">E o pior: ela percebe.</p>
          <ul className="stitch-pain-list">
            <li className="stitch-pain-item"><span className="stitch-pain-bullet">→</span><span>Falta de técnica — você repete os mesmos movimentos sem saber que existem formas mais impactantes de tocar</span></li>
            <li className="stitch-pain-item"><span className="stitch-pain-bullet">→</span><span>Insegurança — a dúvida se ela está realmente sentindo algo ou apenas acompanhando</span></li>
            <li className="stitch-pain-item"><span className="stitch-pain-bullet">→</span><span>Repetição — o momento vira rotina e perde a magia que poderia ter</span></li>
            <li className="stitch-pain-item"><span className="stitch-pain-bullet">→</span><span>Desconexão — a oportunidade de criar uma experiência memorável é perdida todas as vezes</span></li>
          </ul>
        </div>
      </section>

      {/* 4. TRANSITION */}
      <section className="stitch-transition fade-section">
        <p className="stitch-transition-quote">&ldquo;O toque não é apenas contato. É linguagem. E poucos homens sabem falar essa língua.&rdquo;</p>
        <p className="stitch-transition-author">— Especialista em Tantra</p>
      </section>

      {/* 5. SOLUTION */}
      <section className="stitch-solution fade-section" id="metodo">
        <div className="stitch-container">
          <p className="stitch-section-label">MÉTODO CRIADO POR TERAPEUTA TÂNTRICA</p>
          <h2 className="stitch-solution-title">Código do Toque — 23 movimentos que transformam qualquer momento em uma experiência memorável</h2>
          <p className="stitch-solution-text">Um método direto e aplicável, desenvolvido a partir de técnicas tântricas adaptadas para o contexto moderno. <span className="stitch-solution-highlight">Sem complicação. Sem teoria excessiva. Apenas movimentos que funcionam.</span></p>
          <div className="stitch-solution-grid">
            <div className="stitch-solution-card"><p className="stitch-solution-card-num">01</p><h3 className="stitch-solution-card-title">Presença Real</h3><p className="stitch-solution-card-desc">Movimentos que transmitem intenção sem precisar falar. Ela sente que você está ali, de verdade.</p></div>
            <div className="stitch-solution-card"><p className="stitch-solution-card-num">02</p><h3 className="stitch-solution-card-title">Ritmo Consciente</h3><p className="stitch-solution-card-desc">Saiba quando acelerar, diminuir e pausar. O ritmo certo transforma qualquer toque em uma experiência envolvente.</p></div>
            <div className="stitch-solution-card"><p className="stitch-solution-card-num">03</p><h3 className="stitch-solution-card-title">Condução Emocional</h3><p className="stitch-solution-card-desc">Crie uma jornada que ela queira repetir. Cada movimento conduz para o próximo de forma natural.</p></div>
            <div className="stitch-solution-card"><p className="stitch-solution-card-num">04</p><h3 className="stitch-solution-card-title">Conexão Profunda</h3><p className="stitch-solution-card-desc">Vá além do físico e crie impacto emocional. É a diferença entre um momento e uma memória.</p></div>
          </div>
        </div>
      </section>

      {/* 6. CONTENT / MODULES */}
      <section className="stitch-content fade-section">
        <div className="stitch-container">
          <h2 className="stitch-content-title">O que você vai descobrir</h2>
          <div className="stitch-modules-grid">
            <div className="stitch-module-card"><div className="stitch-module-num">01</div><h3 className="stitch-module-title">Módulo 1 — Fundamentos do Toque Consciente</h3><p className="stitch-module-desc">Entenda os princípios que transformam um toque comum em uma experiência com intenção e presença real.</p></div>
            <div className="stitch-module-card"><div className="stitch-module-num">02</div><h3 className="stitch-module-title">Módulo 2 — Os 23 Movimentos Tântricos</h3><p className="stitch-module-desc">Cada movimento explicado em detalhes, com foco em como e quando aplicar para máximo impacto.</p></div>
            <div className="stitch-module-card"><div className="stitch-module-num">03</div><h3 className="stitch-module-title">Módulo 3 — Condução e Ritmo</h3><p className="stitch-module-desc">Aprenda a criar uma sequência natural que conduz o momento sem parecer ensaiado ou forçado.</p></div>
            <div className="stitch-module-card"><div className="stitch-module-num">04</div><h3 className="stitch-module-title">Módulo 4 — Integração e Prática</h3><p className="stitch-module-desc">Como combinar os movimentos na prática e criar sua própria sequência personalizada.</p></div>
          </div>
        </div>
      </section>

      {/* 7. BONUS */}
      <section className="stitch-bonus fade-section">
        <div className="stitch-bonus-header">
          <p className="stitch-bonus-section-label">BÔNUS EXCLUSIVOS</p>
          <h2 className="stitch-bonus-title">Leve também esses bônus hoje</h2>
          <p className="stitch-bonus-subtitle">Disponíveis apenas para quem acessar agora</p>
        </div>
        <div className="stitch-bonus-grid">
          <div className="stitch-bonus-card">
            <p className="stitch-bonus-label">Bônus 1</p>
            <h3 className="stitch-bonus-card-title">Guia de Leitura Corporal</h3>
            <p className="stitch-bonus-card-desc">Como interpretar os sinais que ela emite durante o toque e ajustar sua abordagem em tempo real.</p>
            <div className="stitch-bonus-card-bottom"><span className="stitch-bonus-value">De R$47</span><span className="stitch-bonus-free">GRÁTIS</span></div>
          </div>
          <div className="stitch-bonus-card">
            <p className="stitch-bonus-label">Bônus 2</p>
            <h3 className="stitch-bonus-card-title">Playlist de Atmosfera</h3>
            <p className="stitch-bonus-card-desc">23 seleções musicais curadas para cada momento do método, criando o ambiente ideal.</p>
            <div className="stitch-bonus-card-bottom"><span className="stitch-bonus-value">De R$27</span><span className="stitch-bonus-free">GRÁTIS</span></div>
          </div>
          <div className="stitch-bonus-card">
            <p className="stitch-bonus-label">Bônus 3</p>
            <h3 className="stitch-bonus-card-title">Protocolo de Primeira Vez</h3>
            <p className="stitch-bonus-card-desc">Passo a passo para a primeira aplicação completa, do início ao fim, sem errar.</p>
            <div className="stitch-bonus-card-bottom"><span className="stitch-bonus-value">De R$37</span><span className="stitch-bonus-free">GRÁTIS</span></div>
          </div>
        </div>
        <p className="stitch-bonus-total">Valor total dos bônus: R$111,00 — Hoje totalmente grátis</p>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="stitch-testimonials fade-section" id="depoimentos">
        <div className="stitch-container">
          <h2 className="stitch-testimonials-title">O que dizem quem já aplicou</h2>
          <p className="stitch-testimonials-subtitle">Resultados reais de homens que transformaram sua conexão</p>
        </div>
        <div className="stitch-carousel-wrapper">
          <div className="stitch-carousel-track">
            {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div className="stitch-carousel-card" key={i}>
                <div className="stitch-carousel-stars"><SvgInline html={RED_STAR_SVG} /><SvgInline html={RED_STAR_SVG} /><SvgInline html={RED_STAR_SVG} /><SvgInline html={RED_STAR_SVG} /><SvgInline html={RED_STAR_SVG} /></div>
                <p className="stitch-carousel-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="stitch-carousel-author">
                  <span className="stitch-carousel-initials">{t.initials}</span>
                  <div><p className="stitch-carousel-name">{t.name}</p><p className="stitch-carousel-city">{t.city}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AUTHORITY */}
      <section className="stitch-authority fade-section">
        <p className="stitch-authority-text">O Código do Toque foi desenvolvido por uma terapeuta tântrica certificada com mais de 6 anos de experiência clínica. Cada movimento foi testado e refinado com casais reais antes de ser transformado em método. O resultado é um programa direto, sem enrolação, focado no que realmente funciona na prática.</p>
      </section>

      {/* 10. GUARANTEE */}
      <section className="stitch-guarantee fade-section" id="garantia">
        <div className="stitch-guarantee-inner">
          <div className="stitch-guarantee-icon"><SvgInline html={SHIELD_SVG} /></div>
          <h2 className="stitch-guarantee-heading">Garantia Incondicional de 7 Dias</h2>
          <p className="stitch-guarantee-text">Se por qualquer motivo você sentir que o método não é para você, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.</p>
          <p className="stitch-guarantee-italic">O risco é zero. A oportunidade é real.</p>
        </div>
      </section>

      {/* 10.5 COMMUNITY */}
      <section className="stitch-community fade-section">
        <div className="stitch-community-inner">
          <span className="stitch-community-tag">COMUNIDADE EXCLUSIVA</span>
          <h2 className="stitch-community-heading">Acesse a comunidade de homens que estão <span className="stitch-community-highlight">transformando sua conexão íntima</span></h2>
          <p className="stitch-community-text">Ao adquirir o Código do Toque, você também recebe acesso à comunidade exclusiva, onde pode trocar experiências e tirar dúvidas.</p>
          <p className="stitch-community-subtext">Um espaço privado para homens que querem evoluir sua presença e criar conexões mais reais e memoráveis.</p>
          <button className="stitch-community-cta" onClick={handleCheckout}>QUERO FAZER PARTE</button>
        </div>
      </section>

      {/* 11. OFFER — TWO PLANS */}
      <section className="stitch-offer fade-section" id="oferta">
        <div className="stitch-container">
          <div className="stitch-offer-section-header">
            <h2 className="stitch-offer-section-title">Escolha o seu caminho</h2>
            <p className="stitch-offer-section-sub">Dois planos. Um resultado. A diferença está no que você leva junto.</p>
          </div>
          <div className="stitch-plans-grid">
            {/* PLANO BÁSICO */}
            <div className="stitch-plan-card stitch-plan-basic">
              <p className="stitch-plan-label">PLANO BÁSICO</p>
              <h3 className="stitch-plan-name">Código do Toque</h3>
              <div className="stitch-plan-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lovable-uploads/mockup-hf.png" alt="Código do Toque" className="stitch-plan-img" />
              </div>
              <div className="stitch-plan-price-block">
                <p className="stitch-plan-from">De R$97,00</p>
                <div className="stitch-plan-price-row"><span className="stitch-plan-currency">R$ </span><span className="stitch-plan-amount">19,90</span></div>
                <p className="stitch-plan-tags">Pagamento único • Acesso vitalício</p>
              </div>
              <ul className="stitch-plan-list">
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> 23 movimentos guiados passo a passo</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> 4 módulos completos</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Acesso imediato</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Garantia de 7 dias</li>
              </ul>
              <button className="stitch-plan-cta stitch-plan-cta-basic" onClick={() => setShowDownsell(true)}>QUERO O BÁSICO</button>
              <p className="stitch-plan-trust">Compra 100% segura</p>
            </div>
            {/* PLANO COMPLETO */}
            <div className="stitch-plan-card stitch-plan-complete">
              <div className="stitch-plan-ribbon">MAIS ESCOLHIDO</div>
              <p className="stitch-plan-label">PLANO COMPLETO</p>
              <h3 className="stitch-plan-name">Código do Toque + Bônus</h3>
              <div className="stitch-plan-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lovable-uploads/mockup-hf.png" alt="Código do Toque Completo" className="stitch-plan-img" />
              </div>
              <div className="stitch-plan-price-block">
                <p className="stitch-plan-from">De R$197,00</p>
                <div className="stitch-plan-price-row"><span className="stitch-plan-currency">R$ </span><span className="stitch-plan-amount">24,90</span></div>
                <p className="stitch-plan-tags">Pagamento único • Acesso vitalício • Suporte</p>
              </div>
              <ul className="stitch-plan-list">
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> 23 movimentos guiados passo a passo</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> 4 módulos completos</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Guia de Leitura Corporal (R$47)</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Playlist de Atmosfera (R$27)</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Protocolo de Primeira Vez (R$37)</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Acesso à comunidade exclusiva</li>
                <li><span className="stitch-offer-check"><SvgInline html={CHECK_RED_SVG} /></span> Garantia de 7 dias</li>
              </ul>
              <button className="stitch-plan-cta stitch-plan-cta-complete" onClick={handleCheckout}>QUERO ACESSAR AGORA</button>
              <p className="stitch-plan-trust">Compra 100% segura • Acesso imediato</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNSELL POPUP */}
      <AnimatePresence>
        {showDownsell && (
          <motion.div
            className="stitch-downsell-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDownsell(false)}
          >
            <motion.div
              className="stitch-downsell-card"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="stitch-downsell-close" onClick={() => setShowDownsell(false)} aria-label="Fechar">✕</button>
              <p className="stitch-downsell-tag">OFERTA ESPECIAL — SÓ AGORA</p>
              <h3 className="stitch-downsell-title">Antes de continuar…</h3>
              <p className="stitch-downsell-text">Você está prestes a levar apenas o método. Mas por apenas <strong>R$5,00 a mais</strong>, você pode ter o <strong>plano completo</strong> com todos os bônus:</p>
              <ul className="stitch-downsell-list">
                <li><span className="stitch-downsell-check">✓</span> Guia de Leitura Corporal <span className="stitch-downsell-val">R$47</span></li>
                <li><span className="stitch-downsell-check">✓</span> Playlist de Atmosfera <span className="stitch-downsell-val">R$27</span></li>
                <li><span className="stitch-downsell-check">✓</span> Protocolo de Primeira Vez <span className="stitch-downsell-val">R$37</span></li>
                <li><span className="stitch-downsell-check">✓</span> Acesso à comunidade exclusiva</li>
              </ul>
              <div className="stitch-downsell-prices">
                <span className="stitch-downsell-old">Plano básico: R$19,90</span>
                <span className="stitch-downsell-arrow">→</span>
                <span className="stitch-downsell-new">Plano completo: <strong>R$24,90</strong></span>
              </div>
              <button className="stitch-downsell-cta" onClick={() => { setShowDownsell(false); handleCheckout(); }}>SIM, QUERO O COMPLETO POR R$24,90</button>
              <button className="stitch-downsell-continue" onClick={() => { setShowDownsell(false); handleCheckout(); }}>Não obrigado, quero o básico</button>
              <p className="stitch-downsell-note">Essa condição aparece apenas uma vez.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. FAQ */}
      <section className="stitch-faq fade-section">
        <div className="stitch-container">
          <h2 className="stitch-faq-title">Perguntas Frequentes</h2>
          <div className="stitch-faq-list">
            {FAQ_ITEMS.map((item, i) => <FAQAccordion key={i} question={item.q} answer={item.a} />)}
          </div>
        </div>
      </section>

      {/* 13. FOOTER CTA */}
      <section className="stitch-footer-cta fade-section">
        <div className="stitch-container">
          <h2 className="stitch-footer-cta-title">Não deixe para depois o que pode transformar sua conexão hoje</h2>
          <p className="stitch-footer-cta-text">A diferença entre ser inesquecível e ser mais um está nos detalhes. O Código do Toque te dá esses detalhes de forma simples e direta.</p>
          <button className="stitch-btn-hero" onClick={handleCheckout}>QUERO TRANSFORMAR MINHA CONEXÃO</button>
          <div className="stitch-footer-cta-badges">
            <span>Compra Segura</span>
            <span>7 Dias de Garantia</span>
            <span>Acesso Imediato</span>
          </div>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-trust"><span>Compra Segura</span><span>•</span><span>7 Dias de Garantia</span><span>•</span><span>Acesso Vitalício</span></div>
          <p className="stitch-footer-copy">© 2025 Código do Toque. Todos os direitos reservados.</p>
          <p className="stitch-footer-disclaimer">Este produto não substitui acompanhamento médico ou terapêutico. Os resultados podem variar de pessoa para pessoa.</p>
        </div>
      </footer>
    </div>
  );
}