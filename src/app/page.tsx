'use client';

import { useEffect, useState, useCallback } from 'react';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';

/* ═══ SVG ICONS ═══ */
const HeartIcon = () => (
  <svg className="flow-icon-svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="flow-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ClockIcon = () => (
  <svg className="flow-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChartIcon = () => (
  <svg className="flow-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const CheckGreen = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
  </svg>
);
const CheckWhite = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChevronIcon = () => (
  <svg className="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FACC15">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const ZapIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const ShieldFooterIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const RocketIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const HeadsetIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);

/* ═══ COMMUNITY MEMBERS DATA ═══ */
const communityMembers = [
  { name: 'Carlos M.', city: 'São Paulo, SP', avatar: 'C', quote: 'Minha esposa disse que foi a melhor experiência que já tivemos em 8 anos de casamento. Os movimentos são simples mas fazem TODA a diferença. Valeu cada centavo. Hoje sou membro ativo da comunidade e aprendo coisas novas todo dia.', stars: 5, daysIn: 'há 45 dias na comunidade' },
  { name: 'Rafael T.', city: 'Curitiba, PR', avatar: 'R', quote: 'Eu sempre achei que sabia o que estava fazendo, mas percebi que estava completamente errado. Depois de aplicar os 23 códigos, a conexão com minha namorada está em outro nível. A comunidade é sensacional, sempre tem alguém pra ajudar.', stars: 5, daysIn: 'há 32 dias na comunidade' },
  { name: 'Diego S.', city: 'Rio de Janeiro, RJ', avatar: 'D', quote: 'Material sério e profissional. Nada de "truque mágico", são técnicas reais baseadas em tantra que realmente funcionam. Meu relacionamento mudou completamente. Os bônus exclusivos da comunidade valem muito mais que o investimento.', stars: 5, daysIn: 'há 28 dias na comunidade' },
  { name: 'Marcos P.', city: 'Belo Horizonte, MG', avatar: 'M', quote: 'Entrei cético e saí transformado. Os módulos são claros e as Lives semanais na comunidade me deram suporte real. Minha parceira percebeu a diferença na primeira semana.', stars: 5, daysIn: 'há 60 dias na comunidade' },
  { name: 'Lucas C.', city: 'Porto Alegre, RS', avatar: 'L', quote: 'O suporte dentro da comunidade é incrível. Sempre que tenho dúvida, alguém responde em minutos. Os bônus de controle absoluto e guia dos sussurros foram o divisor de águas pra mim.', stars: 5, daysIn: 'há 15 dias na comunidade' },
  { name: 'Felipe R.', city: 'Campinas, SP', avatar: 'F', quote: 'Já tinha comprado outros cursos, mas nenhum entrega como esse. Os mapas visuais são perfeitos e o grupo exclusivo no Telegram é muito ativo. Melhor investimento que fiz.', stars: 5, daysIn: 'há 90 dias na comunidade' },
];

/* ═══ FAQ DATA ═══ */
const faqs = [
  { q: 'Como recebo o acesso à comunidade?', a: 'Imediatamente após a confirmação do pagamento, você receberá um email com seus dados de acesso à comunidade exclusiva e todos os bônus. Leva menos de 2 minutos.' },
  { q: 'Funciona para relacionamentos de longo prazo?', a: 'Sim! A comunidade do Código do Toque é perfeita tanto para quem está começando quanto para casais que querem reacender a chama e aprofundar a conexão.' },
  { q: 'Preciso de experiência prévia?', a: 'Não! O método foi desenvolvido para qualquer pessoa, mesmo sem nenhuma experiência em tantra ou técnicas similares. Dentro da comunidade, tudo é explicado passo a passo com suporte.' },
  { q: 'E se eu não gostar?', a: 'Você tem 30 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, basta pedir o reembolso completo — sem perguntas, sem burocracia.' },
  { q: 'O acesso à comunidade é vitalício?', a: 'Sim! Você paga apenas uma vez e tem acesso vitalício à comunidade, incluindo todas as atualizações futuras, lives exclusivas e bônus extras.' },
];



/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ═══ SCROLL REVEAL + FADE IN/OUT ═══ */
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    revealEls.forEach((el) => revealObs.observe(el));

    const fadeSections = document.querySelectorAll('.fade-section');
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('in-view');
          } else {
            el.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    fadeSections.forEach((el) => fadeObs.observe(el));

    return () => { revealObs.disconnect(); fadeObs.disconnect(); };
  }, []);

  /* ═══ LAZY LOAD IMAGES ═══ */
  useEffect(() => {
    const images = document.querySelectorAll('img[data-lazy]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });
    images.forEach((img) => imgObserver.observe(img));
    return () => imgObserver.disconnect();
  }, []);

  /* ═══ SOCIAL PROOF TOAST ═══ */
  useEffect(() => {
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.', 'Thiago N.', 'Pedro H.', 'Gabriel S.', 'Bruno A.'];
    const cities = ['São Paulo, SP', 'Campinas, SP', 'Uberlândia, MG', 'Curitiba, PR', 'Joinville, SC', 'Sorocaba, SP', 'Governador Valadares, MG', 'Vila Velha, ES', 'São José do Rio Preto, SP', 'Maringá, PR', 'Rio de Janeiro, RJ', 'Porto Alegre, RS'];
    const actions = ['entrou na comunidade', 'acessou os bônus exclusivos', 'completou o módulo 1', 'participou da live semanal', 'enviou mensagem no grupo', 'compartilhou resultado'];
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
  }, []);

  const goCheckout = useCallback(() => {
    window.open(CHECKOUT, '_blank');
  }, []);

  return (
    <>
      {/* ═══ TOAST ═══ */}
      <div className={`stitch-toast ${toastVisible ? 'show' : ''}`}>
        <div className="stitch-toast-dot" />
        <p className="stitch-toast-text">{toastText}</p>
      </div>

      {/* ═══ TOP BANNER ═══ */}
      <div className="stitch-top-banner">
        <p>OFERTA ESPECIAL · LANÇAMENTO — Apenas <strong>R$ 24,90</strong> (81% OFF)</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           HERO
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-hero">
        <div className="stitch-hero-bg">
          <img
            data-lazy
            data-src="/lovable-uploads/hero-hf.png"
            alt=""
            className="stitch-hero-bg-img"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          <div className="stitch-hero-overlay" />
        </div>

        <div className="stitch-container">
          <div className="stitch-hero-content">
            <h1 className="stitch-hero-title reveal">
              O Toque Que Faz Ela<br />Pensar em Você
            </h1>
            <p className="stitch-hero-sub reveal">
              Descubra os 23 movimentos tântricos que criam uma conexão tão profunda que ela nunca vai esquecer — e entre para a comunidade exclusiva de homens que transformaram suas relações.
            </p>
            <p className="stitch-hero-author reveal">
              Método desenvolvido por terapeuta tântrica com 6 anos de prática clínica
            </p>
            <div className="stitch-hero-btn-wrap reveal">
              <button className="stitch-btn-primary" onClick={goCheckout}>
                QUERO ENTRAR NA COMUNIDADE — R$ 24,90
              </button>
            </div>
            <p className="stitch-hero-trust-inline reveal">
              <span><CheckIcon /> Acesso imediato após o pagamento</span>
              <span><CheckIcon /> Garantia incondicional de 30 dias</span>
            </p>
            <div className="stitch-hero-rating reveal">
              <div className="stitch-hero-stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p>488 avaliações · Nota 4.9/5.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           BENEFITS FLOW
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-benefits fade-section">
        <div className="stitch-container">
          <h2 className="stitch-section-title reveal">
            O Que Você Vai Ter Acesso Na Comunidade
          </h2>
          <p className="stitch-section-subtitle reveal">
            Aprenda, Conecte-se e Evolua Com Homens Que Querem O Melhor
          </p>
          <p className="stitch-section-intro reveal">
            A maioria dos homens não percebe, mas o toque é a linguagem mais poderosa da intimidade. Dentro da nossa comunidade, você vai aprender técnicas que criam uma conexão emocional profunda que vai muito além do físico.
          </p>
          <p className="stitch-section-intro reveal">
            Ao entrar, você ganha acesso aos 23 movimentos tântricos, lives exclusivas, suporte direto com a terapeuta e uma comunidade de homens comprometidos com a evolução. Tudo isso por menos do que uma refeição.
          </p>

          <div className="stitch-flow-grid">
            <div className="stitch-flow-line" />
            <div className="stitch-flow-step vibe-card reveal">
              <div className="stitch-flow-icon"><HeartIcon /></div>
              <h3>Conexão Emocional Profunda</h3>
              <p>Cada movimento foi desenvolvido para criar intimidade verdadeira e confiança absoluta</p>
            </div>
            <div className="stitch-flow-step vibe-card vibe-card-delay-1 reveal">
              <div className="stitch-flow-icon"><BoltIcon /></div>
              <h3>Técnica Comprovada</h3>
              <p>Baseado em 6 anos de prática clínica em terapia tântrica com centenas de casos de sucesso</p>
            </div>
            <div className="stitch-flow-step vibe-card vibe-card-delay-2 reveal">
              <div className="stitch-flow-icon"><ClockIcon /></div>
              <h3>Fácil de Aplicar</h3>
              <p>Instruções passo a passo que qualquer pessoa pode seguir, mesmo sem experiência prévia</p>
            </div>
            <div className="stitch-flow-step vibe-card vibe-card-delay-3 reveal">
              <div className="stitch-flow-icon"><ChartIcon /></div>
              <h3>Resultados Imediatos</h3>
              <p>Você vai perceber a diferença já na primeira vez que aplicar os movimentos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           CONTENT BREAKDOWN
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-codes-section fade-section">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="stitch-section-title-dark reveal">
            Conteúdo Completo<br />Os 23 Códigos Que Vão Transformar a Experiência Dela
          </h2>

          <div className="stitch-codes-list">
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 7 Movimentos de Preparação</h4>
                  <p>Como criar o ambiente perfeito e preparar o corpo dela para receber toques profundos e relaxar completamente</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 12 Pontos de Ativação</h4>
                  <p>Descubra exatamente onde, como e quando tocar para ativar as zonas de prazer profundo que a maioria dos homens desconhece</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 4 Movimentos de Finalização</h4>
                  <p>A sequência exata para criar o clímax perfeito e deixar ela em um estado de relaxamento e conexão total</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Mapas Visuais Ilustrados</h4>
                  <p>Guias visuais detalhados mostrando cada movimento, pressão e ritmo — impossível errar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           BONUSES
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-bonus-section fade-section">
        <div className="stitch-container">
          <p className="stitch-bonus-section-label reveal">Bônus Exclusivos</p>
          <h2 className="stitch-section-title-dark reveal">
            3 Bônus Que Você Ganha Ao Entrar Na Comunidade
          </h2>

          <div className="stitch-bonus-grid">
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">01</div>
              <h4>Sexo Tântrico para Iniciantes</h4>
              <p>Guia completo para transformar a experiência íntima usando os princípios do tantra — mesmo se você nunca estudou sobre o assunto.</p>
              <p className="stitch-bonus-value">Valor: R$ 59,90 · Grátis Hoje</p>
            </div>
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">02</div>
              <h4>Guia dos 7 Sussurros</h4>
              <p>As palavras exatas para usar durante os toques que amplificam a conexão e o prazer em até 300%.</p>
              <p className="stitch-bonus-value">Valor: R$ 14,90 · Grátis Hoje</p>
            </div>
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">03</div>
              <h4>Controle Absoluto</h4>
              <p>Técnicas comprovadas de respiração e foco mental para você durar quanto tempo quiser e ter total controle.</p>
              <p className="stitch-bonus-value">Valor: R$ 34,90 · Grátis Hoje</p>
            </div>
          </div>

          <div className="stitch-value-stack reveal">
            <p className="stitch-value-stack-label">Valor Total dos Bônus:</p>
            <p className="stitch-value-stack-price">R$ 109,70</p>
            <p className="stitch-value-stack-note">Seu investimento hoje: <strong>R$ 24,90</strong></p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           TESTIMONIALS — Auto-scrolling carousel
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-testimonials-section fade-section">
        <div className="stitch-container">
          <p className="stitch-testimonials-label reveal">Relatos Reais</p>
          <h2 className="stitch-section-title-dark reveal">
            O Que a Nossa Comunidade Está Dizendo
          </h2>

          <div className="stitch-carousel-wrapper">
            <div className="stitch-carousel-track">
              {[...communityMembers, ...communityMembers, ...communityMembers].map((t, i) => (
                <div key={i} className="stitch-carousel-card">
                  <div className="stitch-carousel-stars">
                    {[...Array(t.stars)].map((_, j) => <StarIcon key={j} />)}
                  </div>
                  <p className="stitch-carousel-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="stitch-carousel-author">
                    <div className="stitch-carousel-initials">{t.avatar}</div>
                    <div>
                      <p className="stitch-carousel-name">{t.name}</p>
                      <p className="stitch-carousel-city">{t.city}</p>
                      <p className="stitch-carousel-days">{t.daysIn}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           GUARANTEE
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-guarantee-section fade-section">
        <div className="stitch-container">
          <div className="stitch-guarantee-card reveal">
            <div className="stitch-guarantee-icon"><ShieldIcon /></div>
            <h3>Garantia Incondicional de 30 Dias</h3>
            <p>
              Você tem 30 dias completos para testar os 23 movimentos do Código do Toque.
              Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro — sem perguntas, sem burocracia.
            </p>
            <p className="stitch-guarantee-risk">O risco é todo nosso. Você só tem a ganhar.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           PRICING — Centered card layout
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-pricing-section fade-section">
        <div className="stitch-container">
          <h2 className="stitch-pricing-header reveal">Seu Acesso à Comunidade Está Aqui</h2>

          <div className="stitch-pricing-card reveal">
            {/* Product Mockup */}
            <div className="stitch-pricing-card-mockup">
              <img
                data-lazy
                data-src="/lovable-uploads/mockup-hf.png"
                alt="Código do Toque"
                className="stitch-pricing-card-mockup-img"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
            </div>

            {/* Card Body */}
            <div className="stitch-pricing-card-body">
              <p className="stitch-pricing-card-subtitle">
                Entre Hoje e Ganhe Acesso<br />à Comunidade Exclusiva
              </p>
              <div className="stitch-pricing-card-product">
                <span className="stitch-pricing-card-name">Comunidade Código do Toque</span>
              </div>

              <div className="stitch-pricing-card-access">
                <span className="stitch-pricing-card-access-icon"><ZapIcon /></span>
                <span>ACESSO IMEDIATO</span>
              </div>

              {/* Sold count */}
              <div className="stitch-pricing-card-sold">
                <span className="stitch-pricing-card-sold-count">+488</span>
                <span className="stitch-pricing-card-sold-label">vendidos</span>
              </div>

              {/* Price block */}
              <div className="stitch-pricing-card-priceblock">
                <div className="stitch-pricing-card-original">
                  De <span>R$ 134,60</span>
                  <small className="stitch-pricing-card-original-note">produto + 3 bônus</small>
                </div>
                <div className="stitch-pricing-card-badge">Oferta Especial de Lançamento</div>
                <div className="stitch-pricing-card-current">
                  <span className="stitch-pricing-card-currency">R$</span>
                  <span className="stitch-pricing-card-amount">24,90</span>
                </div>
                <p className="stitch-pricing-card-tags">Pagamento único · Acesso vitalício · 81% OFF</p>
              </div>

              {/* Checklist */}
              <ul className="stitch-pricing-card-list">
                <li><CheckWhite /> Código do Toque — 23 movimentos completos</li>
                <li><CheckWhite /> Acesso vitalício à comunidade exclusiva</li>
                <li><CheckWhite /> Lives semanais com a terapeuta</li>
                <li><CheckWhite /> Bônus: Sexo Tântrico para Iniciantes (R$ 59,90)</li>
                <li><CheckWhite /> Bônus: Guia dos 7 Sussurros (R$ 14,90)</li>
                <li><CheckWhite /> Bônus: Controle Absoluto (R$ 34,90)</li>
                <li><CheckWhite /> Grupo exclusivo no Telegram</li>
                <li><CheckWhite /> Suporte direto + Garantia 30 dias</li>
              </ul>

              {/* CTA */}
              <button className="stitch-btn-pricing-card" onClick={goCheckout}>
                QUERO ENTRAR NA COMUNIDADE
              </button>

              {/* Trust */}
              <div className="stitch-pricing-card-trust">
                <span><LockIcon /> Pagamento seguro via Cakto</span>
                <span><ZapIcon /> Acesso em menos de 2 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-faq-section fade-section">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="stitch-section-title-dark reveal">Perguntas Frequentes</h2>
          <div className="stitch-faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`stitch-faq-item reveal ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="stitch-faq-question">
                  <span>{faq.q}</span>
                  <ChevronIcon />
                </div>
                <div className="stitch-faq-answer"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-final-cta fade-section">
        <div className="stitch-container">
          <h2 className="reveal">Está na Hora de Fazer Parte Da Comunidade</h2>
          <p className="stitch-final-cta-sub reveal">
            Junte-se a mais de 488 homens que já transformaram suas relações. Ao entrar, você ganha acesso imediato aos 23 códigos, lives exclusivas, bônus e uma comunidade que vai te apoiar em cada passo.
          </p>
          <button className="stitch-btn-white reveal" onClick={goCheckout}>
            SIM, QUERO ENTRAR NA COMUNIDADE — R$ 24,90
          </button>
          <div className="stitch-final-cta-badges reveal">
            <div className="stitch-final-cta-badge">
              <RocketIcon />
              <span>Acesso Imediato</span>
            </div>
            <div className="stitch-final-cta-badge">
              <ShieldFooterIcon />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="stitch-final-cta-badge">
              <LockIcon />
              <span>Pagamento 100% Seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-trust">
            <span><ShieldFooterIcon /> Pagamento 100% seguro</span>
            <span><RocketIcon /> Acesso imediato</span>
            <span><ShieldFooterIcon /> Garantia de 30 dias</span>
            <span><HeadsetIcon /> Suporte após compra</span>
          </div>
          <p className="stitch-footer-copy">&copy; 2025 Código do Toque &middot; Luna Amaral &middot; Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
