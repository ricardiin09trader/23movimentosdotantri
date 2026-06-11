'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const CHECKOUT_URL = 'https://pay.cakto.com.br/3j7svgt_458559';

const ROULETTE_SEGMENTS = [
  'Desconto liberado',
  'Acesso especial',
  'Condição ativa',
  'Bônus liberado',
  'Preço promocional',
  'Oferta premium',
];

const ROULETTE_COLORS = ['#C9A96E', '#1a1018', '#C9A96E', '#1a1018', '#C9A96E', '#1a1018'];
const WINE_ACCENT = '#722F37';

// Draw from 210° so that CSS rotation of 1830° (5*360+30) lands on segment 0 center
const ROULETTE_START_ANGLE = (210 * Math.PI) / 180;
const ROULETTE_TARGET_ROTATION = 360 * 5 + 30; // degrees

type Phase = 'intro' | 'quiz' | 'diagnosis' | 'qualification' | 'roulette' | 'offer';

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
  positive: 'Boa. Isso já mostra que você percebe a importância da conexão. 🔥',
  neutral: 'Interessante... talvez falte apenas direção. 👀',
  negative: 'Tudo bem. Vamos entender melhor seu perfil. 👌',
};

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

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

function trackFBQ(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
    (window as unknown as { fbq: (e: string, n: string, p?: Record<string, unknown>) => void }).fbq('trackCustom', event, params);
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
   CHECK ICON SVG
   ═══════════════════════════════════════════════════════════ */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROULETTE DRAWING
   ═══════════════════════════════════════════════════════════ */

function drawRoulette(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const size = canvas.clientWidth;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;
  const segmentAngle = (2 * Math.PI) / ROULETTE_SEGMENTS.length;

  ctx.clearRect(0, 0, size, size);

  ROULETTE_SEGMENTS.forEach((label, i) => {
    const startAngle = ROULETTE_START_ANGLE + i * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    // Fill segment
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();

    // Alternate colors with wine accent on dark segments
    if (i % 2 === 0) {
      ctx.fillStyle = ROULETTE_COLORS[i];
    } else {
      // Dark segment with wine tint
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, WINE_ACCENT);
      grad.addColorStop(1, ROULETTE_COLORS[i]);
      ctx.fillStyle = grad;
    }
    ctx.fill();

    // Segment border
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(201,169,110,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text
    const midAngle = startAngle + segmentAngle / 2;
    const textRadius = radius * 0.62;
    const tx = cx + Math.cos(midAngle) * textRadius;
    const ty = cy + Math.sin(midAngle) * textRadius;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(midAngle + Math.PI / 2);

    const fontSize = size < 300 ? 9 : 11;
    ctx.font = `700 ${fontSize}px Poppins, sans-serif`;
    ctx.fillStyle = i % 2 === 0 ? '#1a1018' : '#C9A96E';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Split long labels into 2 lines
    const words = label.split(' ');
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, mid).join(' '), 0, -fontSize * 0.55);
      ctx.fillText(words.slice(mid).join(' '), 0, fontSize * 0.55);
    } else {
      ctx.fillText(label, 0, 0);
    }

    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0a0a';
  ctx.fill();
  ctx.strokeStyle = '#C9A96E';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner glow
  const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.08);
  innerGlow.addColorStop(0, 'rgba(201,169,110,0.15)');
  innerGlow.addColorStop(1, 'rgba(201,169,110,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = innerGlow;
  ctx.fill();
}

/* ═══════════════════════════════════════════════════════════
   MAIN QUIZ COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  /* Remove intro-loading class on mount */
  useEffect(() => {
    document.body.classList.remove('intro-loading');
  }, []);

  /* Draw roulette canvas on mount and resize */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = window.innerWidth < 768 ? 280 : 320;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    drawRoulette(canvas);

    const handleResize = () => {
      const newSize = window.innerWidth < 768 ? 280 : 320;
      canvas.style.width = `${newSize}px`;
      canvas.style.height = `${newSize}px`;
      drawRoulette(canvas);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Track diagnosis view */
  useEffect(() => {
    if (phase === 'diagnosis') {
      trackFBQ('DiagnosisViewed');
    }
  }, [phase]);

  /* ═══ HANDLERS ═══ */

  const handleStart = useCallback(() => {
    trackFBQ('QuizStarted');
    setPhase('quiz');
  }, []);

  const handleAnswer = useCallback(
    (option: AnswerOption) => {
      if (feedback) return; // prevent double-click during feedback

      trackFBQ('QuizQuestionAnswered');
      setScore((s) => s + option.score);
      setFeedback(MICROFEEDBACK[option.type]);

      setTimeout(() => {
        setFeedback(null);
        if (currentQ < QUESTIONS.length - 1) {
          setCurrentQ((q) => q + 1);
        } else {
          trackFBQ('QuizCompleted');
          setPhase('diagnosis');
        }
      }, 1000);
    },
    [feedback, currentQ],
  );

  const handleSpin = useCallback(() => {
    if (isSpinning || hasSpun) return;

    trackFBQ('RouletteStarted');
    setIsSpinning(true);

    const wrap = canvasWrapRef.current;
    if (wrap) {
      // Reset first, then spin
      wrap.style.transition = 'none';
      wrap.style.transform = 'rotate(0deg)';
      // Force reflow
      (wrap as HTMLDivElement).offsetHeight;

      // Now apply spin
      wrap.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      wrap.style.transform = `rotate(${ROULETTE_TARGET_ROTATION}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      trackFBQ('DiscountUnlocked');
      setTimeout(() => {
        setPhase('offer');
      }, 600);
    }, 3200);
  }, [isSpinning, hasSpun]);

  const handleCheckout = useCallback(() => {
    if (typeof window !== 'undefined' && typeof (window as unknown as Record<string, unknown>).fbq === 'function') {
      (window as unknown as { fbq: (e: string, n: string, p: Record<string, unknown>) => void }).fbq(
        'track',
        'InitiateCheckout',
        {
          content_name: 'Código do Toque',
          content_category: 'Infoproduto',
          value: 24.9,
          currency: 'BRL',
        },
      );
    }
    window.open(CHECKOUT_URL, '_blank');
  }, []);

  /* ═══ RENDER ═══ */

  const diagnosisLevel = getDiagnosisLevel(score);
  const diagnosis = DIAGNOSIS[diagnosisLevel];
  const progressPercent = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <main className="qz-container">
      <div className="qz-inner">
        <AnimatePresence mode="wait">
          {/* ═══ PHASE 1 — INTRO ═══ */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              className="qz-intro"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1 className="qz-intro-headline">
                🔥 Descubra seu nível de conexão pelo toque
              </h1>
              <p className="qz-intro-sub">
                Responda algumas perguntas rápidas e veja se você já sabe criar uma experiência que ela realmente lembra depois.
              </p>
              <p className="qz-intro-support">
                O toque certo pode mudar completamente a forma como ela sente sua presença. Mas poucos homens sabem conduzir isso com intenção.
              </p>
              <button className="qz-cta" onClick={handleStart}>
                COMEÇAR DIAGNÓSTICO 🔥
              </button>
            </motion.div>
          )}

          {/* ═══ PHASE 2 — QUIZ ═══ */}
          {phase === 'quiz' && (
            <motion.div
              key={`quiz-${currentQ}`}
              className="qz-quiz"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="qz-progress-wrap">
                <p className="qz-progress-label">Etapa {currentQ + 1} de {QUESTIONS.length}</p>
                <div className="qz-progress-bar">
                  <div
                    className="qz-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <h2 className="qz-question">{QUESTIONS[currentQ].text}</h2>

              <div className="qz-answers">
                {QUESTIONS[currentQ].options.map((option, i) => (
                  <motion.button
                    key={`${currentQ}-${i}`}
                    className="qz-answer-btn"
                    onClick={() => handleAnswer(option)}
                    disabled={!!feedback}
                    variants={staggerItem}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.1 + i * 0.08 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="qz-answer-icon">{option.icon}</span>
                    <span>{option.text}</span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.p
                    className="qz-microfeedback"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═══ PHASE 3 — DIAGNOSIS ═══ */}
          {phase === 'diagnosis' && (
            <motion.div
              key="diagnosis"
              className="qz-diagnosis"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="qz-diagnosis-title">{diagnosis.title}</h2>
              <p className="qz-diagnosis-text">{diagnosis.text}</p>
            </motion.div>
          )}

          {/* ═══ PHASE 3.5 — QUALIFICATION ═══ */}
          {phase === 'qualification' && (
            <motion.div
              key="qualification"
              className="qz-qualification"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="qz-qual-title">🎯 Com base nas suas respostas...</h2>

              <motion.div
                className="qz-qual-cards"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {QUAL_CARDS.map((text, i) => (
                  <motion.div
                    key={i}
                    className="qz-qual-card"
                    variants={staggerItem}
                  >
                    <span className="qz-qual-check">
                      <CheckIcon />
                    </span>
                    <p className="qz-qual-card-text">{text}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="qz-qual-bar">
                <span className="qz-qual-bar-icon">✅</span>
                <p className="qz-qual-bar-text">
                  Você está qualificado para desbloquear a condição especial de hoje
                </p>
              </div>

              <p className="qz-qual-desc">
                Como você completou o diagnóstico, agora pode girar a roleta para liberar sua condição promocional.
              </p>

              <button className="qz-cta" onClick={() => setPhase('roulette')}>
                AVANÇAR PARA ROLETA 🔥
              </button>
            </motion.div>
          )}

          {/* ═══ PHASE 4 — ROULETTE ═══ */}
          {phase === 'roulette' && (
            <motion.div
              key="roulette"
              className="qz-roulette"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="qz-roulette-title">🎡 Gire para desbloquear sua condição especial</h2>
              <p className="qz-roulette-subtitle">
                Você concluiu o diagnóstico. Agora falta só liberar seu acesso promocional ao Código do Toque.
              </p>

              <div className="qz-roulette-wrapper">
                <div className="qz-roulette-pointer" />
                <div className="qz-roulette-canvas-wrap" ref={canvasWrapRef}>
                  <canvas ref={canvasRef} className="qz-roulette-canvas" />
                </div>
              </div>

              <button
                className="qz-cta"
                onClick={handleSpin}
                disabled={isSpinning || hasSpun}
              >
                {isSpinning ? 'Girando...' : 'GIRAR ROLETA 🔥'}
              </button>
            </motion.div>
          )}

          {/* ═══ PHASE 5 — OFFER ═══ */}
          {phase === 'offer' && (
            <motion.div
              key="offer"
              className="qz-offer"
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="qz-offer-title">🔥 Desconto desbloqueado!</h2>
              <p className="qz-offer-text">
                Seu acesso promocional ao Código do Toque foi liberado. Você está a um passo de descobrir os 23 movimentos que ajudam a criar mais presença, desejo e conexão através do toque.
              </p>

              <div className="qz-price-card">
                <p className="qz-price-from">De R$ 97,00</p>
                <p className="qz-price-label">por apenas</p>
                <p className="qz-price-main">R$ 24,90</p>
                <p className="qz-urgency">
                  Essa condição especial pode sair do ar a qualquer momento.
                </p>
                <button className="qz-cta qz-cta-lg" onClick={handleCheckout}>
                  QUERO ACESSAR COM DESCONTO 🔥
                </button>
              </div>

              <p className="qz-offer-footer">
                O Código do Toque reúne 23 movimentos tântricos para transformar o momento em uma experiência mais intensa, conectada e memorável.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}