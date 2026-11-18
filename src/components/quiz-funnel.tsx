'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   QuizFunnel — componente reutilizável e autônomo
   Cole em qualquer página de vendas da mesma oferta (ou outra).
   Ele roda o diagnóstico e, no final, oferece os dois planos
   com os links de checkout que você passar.
   ═══════════════════════════════════════════════════════════ */

export interface QuizFunnelProps {
  /** Link de checkout do plano SÓ O GUIA (R$14,90) */
  checkoutBasicUrl: string;
  /** Link de checkout do PACOTE COMPLETO (R$24,90) */
  checkoutCompleteUrl: string;
  /** Preço exibido para o plano básico (default "14,90") */
  basicPrice?: string;
  /** Preço exibido para o plano completo (default "24,90") */
  completePrice?: string;
  /** Nome do produto (default "Código do Toque") */
  productName?: string;
  /** Classe extra no root (opcional) */
  className?: string;
}

type Phase = 'intro' | 'quiz' | 'diagnosis';

interface AnswerOption {
  icon: string;
  text: string;
  score: number;
}

interface Question {
  text: string;
  options: AnswerOption[];
}

const QUESTIONS: Question[] = [
  {
    text: 'Qual dessas frases mais combina com você hoje?',
    options: [
      { icon: '🔥', text: 'Quero melhorar minha presença nos momentos íntimos', score: 2 },
      { icon: '🤔', text: 'Nunca pensei muito sobre isso', score: 1 },
      { icon: '👌', text: 'Acho que já me viro bem', score: 0 },
    ],
  },
  {
    text: 'Quando o assunto é conexão, você acredita que o toque faz diferença?',
    options: [
      { icon: '✅', text: 'Sim, faz muita diferença', score: 2 },
      { icon: '🤔', text: 'Talvez, depende do momento', score: 1 },
      { icon: '❌', text: 'Não tenho certeza', score: 0 },
    ],
  },
  {
    text: 'Você já sentiu que estava apenas repetindo o básico, sem saber exatamente como conduzir o momento?',
    options: [
      { icon: '✅', text: 'Sim, isso já aconteceu', score: 2 },
      { icon: '🤔', text: 'Talvez, às vezes fico em dúvida', score: 1 },
      { icon: '❌', text: 'Não, nunca pensei nisso', score: 0 },
    ],
  },
  {
    text: 'Você já ficou na dúvida se ela estava realmente envolvida ou apenas seguindo o momento?',
    options: [
      { icon: '✅', text: 'Sim, já tive essa dúvida', score: 2 },
      { icon: '🤔', text: 'Talvez, nem sempre é claro', score: 1 },
      { icon: '❌', text: 'Não costumo perceber isso', score: 0 },
    ],
  },
  {
    text: 'Como você gostaria que ela se sentisse depois de uma experiência com você?',
    options: [
      { icon: '🔥', text: 'Marcada e querendo repetir', score: 2 },
      { icon: '✨', text: 'Mais conectada e entregue', score: 2 },
      { icon: '👌', text: 'Apenas satisfeita já está bom', score: 0 },
    ],
  },
  {
    text: 'Se você pudesse aprender movimentos simples para transmitir mais presença, segurança e intenção, você gostaria?',
    options: [
      { icon: '✅', text: 'Sim, com certeza', score: 2 },
      { icon: '🤔', text: 'Talvez, se fosse fácil de aplicar', score: 1 },
      { icon: '❌', text: 'Não sei se preciso disso', score: 0 },
    ],
  },
  {
    text: 'Se existisse um método direto com 23 movimentos guiados para criar uma experiência mais intensa e memorável, você gostaria de conhecer?',
    options: [
      { icon: '🔥', text: 'Sim, quero conhecer', score: 2 },
      { icon: '👀', text: 'Talvez, quero entender melhor', score: 1 },
      { icon: '👌', text: 'Só se for simples e rápido', score: 1 },
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
    title: 'Seu diagnóstico: você tem alto potencial de criar uma experiência memorável',
    text: 'Pelas suas respostas, você já entende que o toque não é apenas contato físico. Ele pode transmitir presença, desejo, segurança e intenção. O ponto é que a maioria dos homens tenta improvisar. E quando não existe direção, o momento pode cair no automático. Por isso o Código do Toque foi criado: para te mostrar 23 movimentos ilustrados, organizados em um guia digital que você estuda no seu tempo.',
  },
  medium: {
    title: 'Seu diagnóstico: você sente que existe algo a mais, mas talvez ainda não saiba como acessar',
    text: 'Suas respostas mostram que você percebe a importância da conexão, mas talvez ainda falte clareza sobre como conduzir isso na prática. E esse é exatamente o ponto: não basta querer criar um momento melhor. É preciso saber como preparar o ambiente, perceber a resposta dela e ajustar o ritmo. O Código do Toque organiza esse caminho e apresenta 23 movimentos ilustrados.',
  },
  low: {
    title: 'Seu diagnóstico: talvez você ainda não veja o toque como uma habilidade, mas ele pode mudar tudo',
    text: 'Muitos homens acreditam que conexão acontece naturalmente. Mas a verdade é que o toque certo pode mudar completamente a experiência. Antes de qualquer sequência, existe um detalhe que muitos ignoram: preparar o momento, observar a resposta e ajustar o ritmo. O Código do Toque organiza esse caminho em um guia digital ilustrado.',
  },
};

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

const fadeVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function QuizFunnel({
  checkoutBasicUrl,
  checkoutCompleteUrl,
  basicPrice = '14,90',
  completePrice = '24,90',
  productName = 'Código do Toque',
  className,
}: QuizFunnelProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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

  const openBasic = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: productName, content_category: 'Infoproduto', value: 14.9, currency: 'BRL' });
    window.open(checkoutBasicUrl, '_blank');
  }, [checkoutBasicUrl, productName]);

  const openComplete = useCallback(() => {
    trackFBStandard('InitiateCheckout', { content_name: productName, content_category: 'Infoproduto', value: 24.9, currency: 'BRL' });
    window.open(checkoutCompleteUrl, '_blank');
  }, [checkoutCompleteUrl, productName]);

  const progressPercent = ((currentQ + 1) / QUESTIONS.length) * 100;
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const overall = getOverallPercent(answers);

  return (
    <main className={`qz-container${className ? ' ' + className : ''}`}>
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
                    animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - overall / 100) }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="qz-chart-ring-label">
                  <motion.span className="qz-chart-ring-pct" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{overall}%</motion.span>
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
                  {overall >= 70
                    ? 'Você já percebe que o toque é uma ferramenta poderosa. Mas perceber não é o mesmo que dominar. A maioria dos homens para na teoria.'
                    : overall >= 40
                      ? 'Você está no caminho, mas ainda falta direção prática. A diferença entre perceber e aplicar é onde a maioria dos homens fica presa.'
                      : 'A maioria dos homens não sabe que o toque pode ser treinado. Esse é o primeiro passo para mudar sua conexão íntima.'}
                </p>
              </div>

              <p className="qz-diagnosis-text" style={{ marginTop: '24px' }}>
                {DIAGNOSIS[getDiagnosisLevel(totalScore)].text}
              </p>

              {/* Oferta — os dois planos com os links de checkout passados via props */}
              <div className="qz-offer" style={{ marginTop: '28px' }}>
                <h2 className="qz-offer-title">O guia está liberado</h2>
                <p className="qz-offer-text">
                  Agora você conhece o {productName}: um guia digital ilustrado com 23 movimentos, para estudar no seu tempo.
                </p>
                <div className="qz-quiz-offer-plans">
                  <button className="qz-cta qz-quiz-offer-basic" onClick={openBasic}>
                    SÓ O GUIA — R${basicPrice}
                  </button>
                  <button className="qz-cta qz-cta-lg qz-quiz-offer-complete" onClick={openComplete}>
                    PACOTE COMPLETO — R${completePrice}
                  </button>
                </div>
                <p className="qz-offer-footer">
                  Material digital em PDF. Acesso enviado por e-mail após a confirmação do pagamento.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default QuizFunnel;
