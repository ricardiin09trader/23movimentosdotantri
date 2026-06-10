'use client';

import { useEffect, useState, useCallback } from 'react';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';

/* ═══ SVG ICONS ═══ */
const HeartIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const BoltIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const HandIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChartIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FACC15">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const ShieldIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const CheckRedIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);
const MapIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChevronIcon = () => (
  <svg className="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const FireIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const TargetIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} />
  </svg>
);
const LayersIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ZapBoldIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

/* ═══ FEATURES DATA ═══ */
const features = [
  { icon: <HeartIcon />, title: 'Conexão Emocional Profunda', desc: 'Cada movimento cria intimidade verdadeira e confiança absoluta.' },
  { icon: <ChartIcon />, title: 'Técnica Comprovada', desc: '6 anos de prática clínica com centenas de casos de sucesso.' },
  { icon: <LayersIcon />, title: 'Fácil de Aplicar', desc: 'Passo a passo que qualquer pessoa segue, sem experiência prévia.' },
  { icon: <ZapBoldIcon />, title: 'Resultados Imediatos', desc: 'Você percebe a diferença já na primeira aplicação.' },
];

/* ═══ CONTENT MODULES DATA ═══ */
const contentModules = [
  { num: '01', title: 'Os 7 Movimentos de Preparação', desc: 'Como criar o ambiente perfeito e preparar o corpo dela para receber toques profundos e relaxar completamente.', icon: <HandIcon /> },
  { num: '02', title: 'Os 12 Pontos de Ativação', desc: 'Onde, como e quando tocar para ativar as zonas de prazer profundo que a maioria desconhece.', icon: <TargetIcon /> },
  { num: '03', title: 'Os 4 Movimentos de Finalização', desc: 'A sequência exata para o clímax perfeito e um estado de relaxamento e conexão total.', icon: <FireIcon /> },
  { num: '04', title: 'Mapas Visuais Ilustrados', desc: 'Guias visuais detalhados de cada movimento, pressão e ritmo — impossível errar.', icon: <MapIcon /> },
];

/* ═══ BONUSES DATA ═══ */
const bonuses = [
  { num: '01', title: 'Sexo Tântrico para Iniciantes', desc: 'Guia completo para transformar a experiência íntima usando os princípios do tantra — mesmo se você nunca estudou sobre o assunto.', value: 'R$ 59,90' },
  { num: '02', title: 'Guia dos 7 Sussurros', desc: 'As palavras exatas para usar durante os toques que amplificam a conexão e o prazer.', value: 'R$ 14,90' },
  { num: '03', title: 'Controle Absoluto', desc: 'Técnicas comprovadas de respiração e foco mental para ter total controle sobre seu corpo.', value: 'R$ 34,90' },
];

/* ═══ COMMUNITY MEMBERS DATA ═══ */
const communityMembers = [
  { name: 'Carlos M.', city: 'São Paulo, SP', avatar: 'C', quote: 'Minha esposa disse que foi a melhor experiência que já tivemos em 8 anos de casamento. Os movimentos são simples mas fazem TODA a diferença. Valeu cada centavo.' },
  { name: 'Rafael T.', city: 'Curitiba, PR', avatar: 'R', quote: 'Eu sempre achei que sabia o que estava fazendo, mas percebi que estava completamente errado. Depois de aplicar os 23 códigos, a conexão com minha namorada está em outro nível.' },
  { name: 'Diego S.', city: 'Rio de Janeiro, RJ', avatar: 'D', quote: 'Material sério e profissional. Nada de "truque mágico", são técnicas reais baseadas em tantra que realmente funcionam. Meu relacionamento mudou completamente.' },
  { name: 'Marcos P.', city: 'Belo Horizonte, MG', avatar: 'M', quote: 'Entrei cético e saí transformado. Os módulos são claros e o suporte da comunidade me deu acompanhamento real. Minha parceira percebeu na primeira semana.' },
  { name: 'Lucas C.', city: 'Porto Alegre, RS', avatar: 'L', quote: 'O suporte é incrível, alguém responde em minutos. Os bônus foram o divisor de águas pra mim.' },
  { name: 'Felipe R.', city: 'Campinas, SP', avatar: 'F', quote: 'Nenhum curso entrega como esse. O grupo é muito ativo. Melhor investimento que fiz.' },
];

/* ═══ FAQ DATA ═══ */
const faqs = [
  { q: 'Como recebo o acesso?', a: 'Imediatamente após a confirmação do pagamento, você receberá um email com seus dados de acesso à plataforma exclusiva. Leva menos de 2 minutos.' },
  { q: 'Funciona para relacionamentos de longo prazo?', a: 'Sim! O Código do Toque é perfeito tanto para quem está começando quanto para casais que querem reacender a chama e aprofundar a conexão.' },
  { q: 'Preciso de experiência prévia?', a: 'Não! O método foi desenvolvido para qualquer pessoa, mesmo sem nenhuma experiência em tantra ou técnicas similares. Tudo é explicado passo a passo.' },
  { q: 'E se eu não gostar?', a: 'Você tem 30 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, basta pedir o reembolso completo — sem perguntas.' },
  { q: 'O acesso é vitalício?', a: 'Sim! Você paga apenas uma vez e tem acesso para sempre, incluindo todas as atualizações futuras do conteúdo.' },
];

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
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
          if (entry.isIntersecting) el.classList.add('in-view');
          else el.classList.remove('in-view');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    fadeSections.forEach((el) => fadeObs.observe(el));
    return () => { revealObs.disconnect(); fadeObs.disconnect(); };
  }, []);

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

  useEffect(() => {
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.', 'Thiago N.', 'Pedro H.', 'Gabriel S.', 'Bruno A.'];
    const cities = ['São Paulo, SP', 'Campinas, SP', 'Uberlândia, MG', 'Curitiba, PR', 'Joinville, SC', 'Sorocaba, SP', 'Gov. Valadares, MG', 'Vila Velha, ES', 'S.J. Rio Preto, SP', 'Maringá, PR', 'Rio de Janeiro, RJ', 'Porto Alegre, RS'];
    const actions = ['entrou na comunidade', 'acessou os bônus', 'completou módulo 1', 'participou da live', 'enviou mensagem no grupo'];
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

  const goCheckout = useCallback(() => { window.open(CHECKOUT, '_blank'); }, []);

  return (
    <>
      {/* TOAST */}
      <div className={`stitch-toast ${toastVisible ? 'show' : ''}`}>
        <div className="stitch-toast-dot" />
        <p className="stitch-toast-text">{toastText}</p>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`stitch-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="stitch-header-logo">CT</div>
        <nav className="stitch-header-nav">
          <a href="#metodo">Método</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#bonus">Bônus</a>
          <a href="#depoimentos">Comunidade</a>
        </nav>
        <button className="stitch-header-cta" onClick={goCheckout}>Entrar</button>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="stitch-hero">
        <div className="stitch-hero-bg">
          <img data-lazy data-src="/lovable-uploads/hero-hf.png" alt="" className="stitch-hero-bg-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
          <div className="stitch-hero-overlay" />
        </div>
        <div className="stitch-hero-content">
          <span className="stitch-hero-badge reveal">OFERTA ESPECIAL · LANÇAMENTO</span>
          <h1 className="stitch-hero-title reveal">
            O Toque Que Faz Ela<br />Pensar em <span className="stitch-hero-title-red">Você</span>
          </h1>
          <p className="stitch-hero-desc reveal">
            Descubra os <span className="stitch-hero-desc-bold">23 movimentos tântricos</span> que criam uma conexão tão profunda que ela nunca vai esquecer da experiência ao seu lado
          </p>
          <p className="stitch-hero-author reveal">Método desenvolvido por terapeuta tântrica com 6 anos de prática clínica</p>
          <div className="reveal">
            <button className="stitch-btn-hero" onClick={goCheckout}>
              QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90
            </button>
          </div>
          <div className="stitch-hero-trust reveal">
            <span>Acesso imediato após o pagamento</span>
            <span className="stitch-hero-trust-sep">·</span>
            <span>Garantia incondicional de 30 dias</span>
          </div>
          <div className="stitch-hero-rating reveal">
            <div className="stitch-hero-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
            <p className="stitch-hero-rating-text">488 avaliações · Nota 4.9/5.0</p>
          </div>
        </div>
      </section>

      {/* ═══ O QUE VOCÊ VAI DESCOBRIR ═══ */}
      <section className="stitch-discover fade-section" id="metodo">
        <div className="stitch-container">
          <div className="stitch-discover-header">
            <p className="stitch-section-label reveal">O Que Você Vai Descobrir</p>
            <h2 className="stitch-discover-title reveal">Aprenda Como Conduzir a Melhor Experiência da Vida Dela</h2>
            <p className="stitch-discover-text reveal">
              A maioria dos homens não percebe, mas o toque é a linguagem mais poderosa da intimidade. Um toque consciente e intencional pode criar uma conexão emocional profunda que vai muito além do físico.
            </p>
            <p className="stitch-discover-text reveal">
              O Código do Toque revela os <span className="stitch-text-red">23 movimentos tântricos</span> que ativam os pontos de prazer e relaxamento profundo, fazendo dela uma experiência inesquecível — e fazendo você se tornar alguém que ela nunca vai esquecer.
            </p>
          </div>
          <div className="stitch-features-grid">
            {features.map((f, i) => (
              <div key={i} className="stitch-feature-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="stitch-feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTEÚDO COMPLETO ═══ */}
      <section className="stitch-content fade-section" id="conteudo">
        <div className="stitch-container">
          <div className="stitch-content-header">
            <p className="stitch-section-label reveal">Conteúdo Completo</p>
            <h2 className="stitch-content-title reveal">
              Os <span className="stitch-text-red">23 Códigos</span> Que Vão Transformar a Experiência Dela
            </h2>
          </div>
          <div className="stitch-modules-list">
            {contentModules.map((m, i) => (
              <div key={i} className="stitch-module-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stitch-module-icon">{m.icon}</div>
                <div className="stitch-module-body">
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BÔNUS ═══ */}
      <section className="stitch-bonus fade-section" id="bonus">
        <div className="stitch-container">
          <div className="stitch-bonus-header">
            <p className="stitch-section-label reveal">Ganhe Hoje</p>
            <h2 className="stitch-bonus-title reveal">
              Mais 3 Bônus <span className="stitch-text-red">Exclusivos</span> Para Você
            </h2>
          </div>
        </div>
        <div className="stitch-bonus-grid">
          {bonuses.map((b, i) => (
            <div key={i} className="stitch-bonus-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="stitch-bonus-watermark">{b.num}</span>
              <div className="stitch-bonus-card-top">
                <p className="stitch-card-label">BÔNUS {b.num}</p>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
              <div className="stitch-bonus-card-bottom">
                <span className="stitch-bonus-value">VALOR: {b.value}</span>
                <span className="stitch-bonus-free">GRÁTIS HOJE</span>
              </div>
            </div>
          ))}
        </div>
        <div className="stitch-value-stack reveal">
          <div className="stitch-value-stack-row">
            <span>Valor total dos bônus:</span>
            <span className="stitch-value-stack-old">R$ 109,70</span>
          </div>
          <div className="stitch-value-stack-row highlight">
            <span>Seu investimento hoje:</span>
            <span className="stitch-value-stack-price">R$ 24,90</span>
          </div>
        </div>
      </section>

      {/* ═══ RELATOS REAIS ═══ */}
      <section className="stitch-testimonials fade-section" id="depoimentos">
        <div className="stitch-container">
          <div className="stitch-testimonials-header">
            <p className="stitch-section-label reveal">Resultados Reais</p>
            <h2 className="stitch-testimonials-title reveal">O Que Nossos Alunos Estão Dizendo</h2>
          </div>
          <div className="stitch-carousel-wrapper">
            <div className="stitch-carousel-track">
              {[...communityMembers, ...communityMembers, ...communityMembers].map((t, i) => (
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
        </div>
      </section>

      {/* ═══ GARANTIA ═══ */}
      <section className="stitch-guarantee fade-section">
        <div className="stitch-guarantee-inner">
          <div className="stitch-guarantee-icon reveal"><ShieldIcon /></div>
          <h3 className="reveal">Garantia Incondicional de 30 Dias</h3>
          <p className="stitch-guarantee-text reveal">
            Você tem 30 dias completos para testar os 23 movimentos do Código do Toque. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro — sem perguntas, sem burocracia.
          </p>
          <p className="stitch-guarantee-italic reveal">O risco é todo nosso. Você só tem a ganhar.</p>
        </div>
      </section>

      {/* ═══ OFERTA ═══ */}
      <section className="stitch-offer fade-section" id="oferta">
        <div className="stitch-container">
          <div className="stitch-offer-card reveal">
            <div className="stitch-offer-image-side">
              <span className="stitch-offer-bonus-badge">ACESSO IMEDIATO</span>
              <span className="stitch-offer-sold">+ Vendidos</span>
              <img data-lazy data-src="/lovable-uploads/mockup-hf.png" alt="Código do Toque" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            </div>
            <div className="stitch-offer-details">
              <p className="stitch-section-label">Seu Acesso Está Aqui</p>
              <h3 className="stitch-offer-heading">Comece Hoje e Transforme a Experiência Dela</h3>
              <p className="stitch-offer-subtitle">Código do Toque</p>

              <div className="stitch-offer-price-block">
                <p className="stitch-offer-from">De R$ 134,60 (produto + 3 bônus)</p>
                <p className="stitch-offer-offer-label">Oferta Especial de Lançamento</p>
                <div className="stitch-offer-price-row">
                  <span className="stitch-offer-currency">R$</span>
                  <span className="stitch-offer-amount">24,90</span>
                </div>
                <p className="stitch-offer-tags">Pagamento único · Acesso vitalício · 81% OFF</p>
              </div>

              <ul className="stitch-offer-list">
                <li><CheckRedIcon /> Código do Toque — 23 movimentos completos</li>
                <li><CheckRedIcon /> Bônus: Sexo Tântrico para Iniciantes (R$ 59,90)</li>
                <li><CheckRedIcon /> Bônus: Guia dos 7 Sussurros (R$ 14,90)</li>
                <li><CheckRedIcon /> Bônus: Controle Absoluto (R$ 34,90)</li>
                <li><CheckRedIcon /> Acesso imediato e vitalício</li>
                <li><CheckRedIcon /> Garantia incondicional de 30 dias</li>
              </ul>

              <button className="stitch-offer-cta" onClick={goCheckout}>
                QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90
              </button>

              <p className="stitch-offer-trust">Pagamento seguro via Cakto · Acesso em menos de 2 minutos</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="stitch-faq fade-section">
        <div className="stitch-faq-header">
          <p className="stitch-section-label reveal">Dúvidas Frequentes</p>
          <h2 className="stitch-faq-title reveal">Perguntas Frequentes</h2>
        </div>
        <div className="stitch-faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`stitch-faq-item reveal ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="stitch-faq-question">
                <span>{faq.q}</span>
                <ChevronIcon />
              </div>
              <div className="stitch-faq-answer"><p>{faq.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="stitch-final-cta fade-section">
        <div className="stitch-container">
          <h2 className="reveal">Está na Hora de Criar Momentos Inesquecíveis</h2>
          <p className="reveal">O Código do Toque vai te dar as ferramentas exatas para transformar a experiência dela e criar uma conexão que ela nunca vai esquecer</p>
          <div className="reveal">
            <button className="stitch-btn-hero" onClick={goCheckout}>
              SIM, QUERO O CÓDIGO DO TOQUE — R$ 24,90
            </button>
          </div>
          <div className="stitch-final-badges reveal">
            <span>Acesso Imediato</span>
            <span>Garantia de 30 dias</span>
            <span>Pagamento 100% Seguro</span>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-trust">
            <span>Pagamento 100% seguro</span>
            <span>Acesso imediato</span>
            <span>Garantia de 30 dias</span>
            <span>Suporte após compra</span>
          </div>
          <p className="stitch-footer-copy">© 2025 Código do Toque · Luna Amaral · Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
