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
const ZapIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
  </svg>
);
const HandIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChartIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ClockIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
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
const ChevronIcon = () => (
  <svg className="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const CheckRedIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
  </svg>
);
const HeartVariantIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);

/* ═══ CODES DATA ═══ */
const codes = [
  { icon: <HeartIcon />, label: '01. O TOQUE SUTIL', desc: 'A arte de iniciar o toque sem parecer invasivo, criando antecipação imediata.' },
  { icon: <BoltIcon />, label: '02. PODER & CALOR', desc: 'Movimentos rítmicos que elevam a temperatura corporal em segundos.' },
  { icon: <HandIcon />, label: '03. A PRESSÃO CERTA', desc: 'A pressão exata para relaxar a mente e despertar o corpo.' },
  { icon: <ChartIcon />, label: '04. RESPIRAÇÃO DO DESEJO', desc: 'Como sincronizar sua respiração para dobrar a intensidade da conexão.' },
  { icon: <ClockIcon />, label: '05. LEITURA CORPORAL', desc: 'O código secreto para ler os sinais não-verbais dela instantaneamente.' },
  { icon: <HeartVariantIcon />, label: '06. ZONAS IGNORADAS', desc: 'Exploração de áreas sensoriais frequentemente esquecidas.' },
];

/* ═══ BONUSES DATA ═══ */
const bonuses = [
  { num: '01', title: 'Sexo Tântrico para Iniciantes', desc: 'Guia completo para prolongar o prazer e expandir a energia vital.' },
  { num: '02', title: 'Guia dos 7 Sussurros', desc: 'As palavras certas para serem ditas no momento de intimidade.' },
  { num: '03', title: 'Controle Absoluto', desc: 'Técnicas de respiração para controlar seu corpo totalmente.' },
];

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
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ═══ HEADER SCROLL ═══ */
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      {/* ═══════════════════════════════════════════════════════════
           1. FIXED HEADER
           ═══════════════════════════════════════════════════════════ */}
      <header className={`stitch-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="stitch-header-logo">CT</div>
        <nav className="stitch-header-nav">
          <a href="#sobre">Sobre</a>
          <a href="#codigos">Os 23 Códigos</a>
          <a href="#bonus">Bônus</a>
          <a href="#depoimentos">Depoimentos</a>
        </nav>
        <button className="stitch-header-cta" onClick={goCheckout}>Comprar Agora</button>
      </header>

      {/* ═══════════════════════════════════════════════════════════
           2. HERO SECTION — Full-screen
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

        <div className="stitch-hero-content">
          <p className="stitch-hero-tagline reveal">MASTERCLASS DE CONEXÃO E PRAZER PROFUNDO.</p>
          <h1 className="stitch-hero-title reveal">
            O CÓDIGO <span className="stitch-hero-title-red">DO TOQUE.</span>
          </h1>
          <p className="stitch-hero-desc reveal">
            Descubra os <span className="stitch-hero-desc-bold">23 movimentos hipnóticos</span> que criam uma conexão tão profunda que ela nunca vai esquecer — e entre para a comunidade exclusiva de homens que transformaram suas relações.
          </p>
          <div className="reveal">
            <button className="stitch-btn-hero" onClick={goCheckout}>
              QUERO ENTRAR NA COMUNIDADE — R$ 24,90
            </button>
          </div>
          <div className="stitch-hero-rating reveal">
            <div className="stitch-hero-stars">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="stitch-hero-rating-text">4.9/5 (488 AVALIAÇÕES)</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           3. PROBLEM SECTION
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-problem fade-section" id="sobre">
        <div className="stitch-problem-inner">
          <h2 className="stitch-problem-title reveal">
            O PROBLEMA DO TOQUE TRADICIONAL: <span className="stitch-problem-title-red">POR QUE ELE FALHA</span>
          </h2>
          <p className="reveal">
            Comum de tantas conexões íntimas que perdem sua essência inicial, o toque torna-se mecânico e previsível, resultando em distanciamento.
          </p>
          <p className="reveal">
            O Código dos <span className="stitch-problem-bold">23 movimentos hipnóticos</span> resgata os instintos que criam uma conexão tão profunda que ela nunca vai esquecer.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           4. CONNECTION SECTION — "A ARTE DA CONEXÃO"
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-connection fade-section">
        <div className="stitch-container">
          <div className="stitch-connection-grid">
            <div className="stitch-connection-text">
              <h2 className="stitch-connection-title reveal">A ARTE DA CONEXÃO</h2>
              <p className="stitch-connection-subtitle reveal">Reescreva a sua história de prazer.</p>
              <p className="stitch-connection-dropcap reveal">
                Código do Toque é a Masterclass de conexão definitiva que revela o que a ciência e a psicologia evolutiva esconderam por décadas. Imagine tocar sua parceira de forma que cada movimento envie descargas elétricas de desejo, criando uma conexão emocional que transcende o físico.
              </p>
              <p className="reveal">
                Não se trata apenas de técnica, mas de entender a linguagem silenciosa do corpo e como o toque pode ser a ferramenta mais poderosa para despertar uma intimidade sem precedentes.
              </p>
            </div>
            <div className="stitch-connection-image-wrap reveal">
              <div className="stitch-connection-deco" />
              <div className="stitch-connection-frame">
                <img
                  data-lazy
                  data-src="/lovable-uploads/mockup-hf.png"
                  alt="Código do Toque — A Arte da Conexão"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           5. CODES SECTION — 6 code items in grid
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-codes fade-section" id="codigos">
        <div className="stitch-container">
          <h2 className="stitch-codes-title reveal">
            OS <span className="stitch-codes-title-red">23 CÓDIGOS:</span> MAPA PARA O ÊXTASE
          </h2>
        </div>
        <div className="stitch-codes-grid">
          {codes.map((c, i) => (
            <div key={i} className="stitch-code-item reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="stitch-code-icon">{c.icon}</div>
              <div>
                <p className="stitch-code-label">{c.label}</p>
                <p className="stitch-code-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           6. BONUS SECTION — New design with watermark numbers
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-bonus fade-section" id="bonus">
        <div className="stitch-container">
          <p className="stitch-bonus-label reveal">EXCLUSIVOS DA COMUNIDADE</p>
          <h2 className="stitch-bonus-title reveal">
            MAIS 3 BÔNUS <span className="stitch-bonus-title-red">EXCLUSIVOS</span> PARA VOCÊ
          </h2>
        </div>
        <div className="stitch-bonus-grid">
          {bonuses.map((b, i) => (
            <div key={i} className="stitch-bonus-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="stitch-bonus-watermark">{b.num}</span>
              <p className="stitch-bonus-card-label">BÔNUS {b.num}</p>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
              <p className="stitch-bonus-free">GRÁTIS</p>
            </div>
          ))}
        </div>
        <div className="stitch-value-stack reveal">
          <p className="stitch-value-stack-label">AO ADQUIRIR A OFERTA, VOCÊ GANHA</p>
          <p className="stitch-value-stack-price">Acesso imediato à comunidade exclusiva + os 3 bônus incluídos</p>
          <p className="stitch-value-stack-note">Tudo isso por apenas R$ 24,90 — acesso vitalício</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           7. TESTIMONIALS — Auto-scrolling carousel
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-testimonials fade-section" id="depoimentos">
        <div className="stitch-container">
          <p className="stitch-testimonials-label reveal">NOSSOS ALUNOS</p>
          <h2 className="stitch-testimonials-title reveal">O Que Nossa Comunidade Está Dizendo</h2>

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
           8. GUARANTEE — Full-width RED BAR
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-guarantee fade-section">
        <div className="stitch-guarantee-icon reveal">
          <ShieldIcon />
        </div>
        <h3 className="reveal">Garantia Incondicional de 30 Dias</h3>
        <p className="stitch-guarantee-text reveal">
          Você tem 30 dias para testar todas as técnicas do Código do Toque. Se por qualquer motivo você não se sentir satisfeito, devolvemos 100% do seu dinheiro sem perguntas.
        </p>
        <p className="stitch-guarantee-italic reveal">O RISCO É TODO MEU, O PRAZER É TODO SEU.</p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           9. FAQ SECTION
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-faq fade-section">
        <p className="stitch-faq-label reveal">PERGUNTAS FREQUENTES</p>
        <h2 className="stitch-faq-title reveal">Perguntas Frequentes</h2>
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
      </section>

      {/* ═══════════════════════════════════════════════════════════
           10. OFFER SECTION — 2-column with product image
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-offer fade-section" id="oferta">
        <div className="stitch-container">
          <div className="stitch-offer-card reveal">
            <div className="stitch-offer-image-side">
              <span className="stitch-offer-bonus-badge">+ 3 BÔNUS</span>
              <img
                data-lazy
                data-src="/lovable-uploads/mockup-hf.png"
                alt="Código do Toque"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
            </div>
            <div className="stitch-offer-details">
              <span className="stitch-offer-pill">Acesso à comunidade exclusiva</span>
              <div className="stitch-offer-price-row">
                <span className="stitch-offer-currency">R$</span>
                <span className="stitch-offer-amount">24,90</span>
              </div>
              <p className="stitch-offer-per">acesso vitalício à comunidade + todo conteúdo</p>

              <ul className="stitch-offer-list">
                <li><CheckRedIcon /> Acesso vitalício à Comunidade Exclusiva</li>
                <li><CheckRedIcon /> Código do Toque — 23 movimentos completos</li>
                <li><CheckRedIcon /> Bônus: Sexo Tântrico para Iniciantes</li>
                <li><CheckRedIcon /> Bônus: Guia dos 7 Sussurros</li>
                <li><CheckRedIcon /> Bônus: Controle Absoluto</li>
                <li><CheckRedIcon /> Lives semanais e suporte da comunidade</li>
                <li><CheckRedIcon /> Garantia incondicional de 30 dias</li>
              </ul>

              <button className="stitch-offer-cta" onClick={goCheckout}>
                QUERO ENTRAR NA COMUNIDADE
              </button>

              <p className="stitch-offer-trust">Pagamento seguro • Acesso imediato • Suporte vitalício</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           11. FOOTER
           ═══════════════════════════════════════════════════════════ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-18">18+</div>
          <p className="stitch-footer-copy">© 2025 Código do Toque · Luna Amaral · Todos os direitos reservados.</p>
          <div className="stitch-footer-links">
            <a href="#termos">Termos de Uso</a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <a href="#privacidade">Privacidade</a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
    </>
  );
}