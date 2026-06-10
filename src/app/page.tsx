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

/* ═══ FAQ DATA ═══ */
const faqs = [
  { q: 'Como recebo o acesso?', a: 'Imediatamente após a confirmação do pagamento, você recebe um email com acesso ao PDF completo — com imagens de modelos reais para melhor ensinamento.' },
  { q: 'Funciona para relacionamentos de longo prazo?', a: 'Sim. É perfeito tanto para quem está começando quanto para quem quer reacender a conexão em um relacionamento consolidado.' },
  { q: 'Preciso de experiência prévia?', a: 'Não. O conteúdo é 100% passo a passo, com imagens ilustradas, para qualquer pessoa aplicar.' },
  { q: 'E se eu não gostar?', a: 'Você tem 30 dias de garantia incondicional. Reembolso total, sem perguntas, sem burocracia.' },
  { q: 'O acesso é vitalício?', a: 'Sim. Paga uma vez e acessa para sempre, incluindo todas as atualizações futuras.' },
];

/* ═══ TESTIMONIALS DATA ═══ */
const testimonials = [
  { name: 'Camila R.', city: 'Florianópolis, SC', quote: 'Depois de aplicar com minha namorada, a conexão entre nós mudou completamente. Ela disse que nunca se sentiu tão vista e desejada. O conteúdo funciona para qualquer tipo de casal.', stars: 5 },
  { name: 'Carlos M.', city: 'Jundiaí, SP', quote: 'Minha esposa disse que foi a melhor experiência em 8 anos de casamento. Eu mudei a forma como me aproximo, como olho. Valeu cada centavo.', stars: 5 },
  { name: 'Rafael T.', city: 'Londrina, PR', quote: 'Depois de aplicar o conteúdo, minha namorada disse que eu mudei de uma forma que ela não consegue explicar. Me sinto mais confiante.', stars: 5 },
  { name: 'Diego S.', city: 'Uberlândia, MG', quote: 'Comprei cético. Na primeira semana ela disse que nunca se sentiu tão desejada. Isso é sobre presença. E presença muda tudo.', stars: 5 },
  { name: 'Bruno A.', city: 'Joinville, SC', quote: 'O segredo não é só técnica, é presença. Depois que comecei a aplicar os movimentos, minha parceira percebeu na primeira noite. Recomendo demais.', stars: 5 },
];

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ═══ SCROLL REVEAL + FADE IN/OUT ═══ */
  useEffect(() => {
    // Reveal on scroll-in
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

    // Fade sections in/out on scroll
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
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Bruno A.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.', 'Thiago N.', 'Pedro H.', 'Gabriel S.'];
    const cities = ['Jundiaí, SP', 'Campinas, SP', 'Uberlândia, MG', 'Londrina, PR', 'Joinville, SC', 'Sorocaba, SP', 'Governador Valadares, MG', 'Vila Velha, ES', 'São José do Rio Preto, SP', 'Maringá, PR', 'Passo Fundo, RS', 'Caxias do Sul, RS'];
    const actions = ['acabou de adquirir', 'acessou o conteúdo', 'completou o módulo 1', 'enviou mensagem de agradecimento'];
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
        <p>OFERTA ESPECIAL — Apenas <strong>R$ 24,90</strong> (86% OFF)</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           HERO — HF image with overlay
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
              O Toque Que Faz<br />Ela Pensar em Você
            </h1>
            <p className="stitch-hero-sub reveal">
              Descubra os 23 movimentos táticos que criam uma conexão tão profunda que ela nunca vai esquecer da experiência ao seu lado.
            </p>
            <div className="stitch-hero-btn-wrap reveal">
              <button className="stitch-btn-primary" onClick={goCheckout}>
                QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90
              </button>
            </div>
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
            Aprenda Como Conduzir a Melhor<br />Experiência da Vida Dela
          </h2>
          <p className="stitch-section-lead reveal">
            Passos e movimentos precisos que vão levar seu relacionamento a um nível de intimidade nunca visto antes.
          </p>

          <div className="stitch-flow-grid">
            <div className="stitch-flow-line" />
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon"><HeartIcon /></div>
              <h3>Conexão</h3>
              <p>Prepare o terreno criando intimidade verdadeira e confiança absoluta.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon"><BoltIcon /></div>
              <h3>Técnica</h3>
              <p>Os movimentos exatos para despertar desejo e confiança em cada toque.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon"><ClockIcon /></div>
              <h3>Prática</h3>
              <p>Fácil de aplicar — passo a passo completo, sem experiência prévia.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon"><ChartIcon /></div>
              <h3>Resultados</h3>
              <p>Impacto desde a primeira aplicação — transformação instantânea.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           CONTENT BREAKDOWN — Clean cards, no bg images
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-codes-section fade-section">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="stitch-section-title-dark reveal">
            Os 23 Códigos Que Vão Transformar<br />a Experiência Dela
          </h2>

          <div className="stitch-codes-list">
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 7 Movimentos de Preparação</h4>
                  <p>Crie o ambiente ideal para uma conexão profunda</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 12 Pontos de Ativação</h4>
                  <p>Desperte desejo e confiança em cada toque</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 4 Movimentos de Finalização</h4>
                  <p>Crie um momento inesquecível para ela</p>
                </div>
              </div>
            </div>
            <div className="stitch-code-item reveal">
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Mapas Visuais Ilustrados</h4>
                  <p>Guias com imagens de modelos reais — impossível errar</p>
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
          <h2 className="stitch-section-title-dark reveal">
            Mais 3 Bônus Exclusivos Para Você
          </h2>

          <div className="stitch-bonus-grid">
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">01</div>
              <h4>Sexo Tântrico para Iniciantes</h4>
              <p>Transforme a intimidade usando princípios milenares.</p>
              <p className="stitch-bonus-value">Valor real: <s>R$ 59,90</s></p>
            </div>
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">02</div>
              <h4>Guia dos 7 Sussurros</h4>
              <p>As palavras certas no momento certo para mais conexão.</p>
              <p className="stitch-bonus-value">Valor real: <s>R$ 14,90</s></p>
            </div>
            <div className="stitch-bonus-card reveal">
              <span className="stitch-bonus-badge">Grátis Hoje</span>
              <div className="stitch-bonus-num">03</div>
              <h4>Controle Absoluto</h4>
              <p>Respiração e foco mental para total domínio.</p>
              <p className="stitch-bonus-value">Valor real: <s>R$ 34,90</s></p>
            </div>
          </div>

          <div className="stitch-value-stack reveal">
            <p className="stitch-value-stack-label">Valor total dos bônus</p>
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
          <h2 className="stitch-section-title-dark reveal">
            O Que Nossos Alunos Estão Dizendo
          </h2>

          <div className="stitch-carousel-wrapper">
            <div className="stitch-carousel-track">
              {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="stitch-carousel-card">
                  <div className="stitch-carousel-stars">
                    {[...Array(t.stars)].map((_, j) => <StarIcon key={j} />)}
                  </div>
                  <p className="stitch-carousel-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="stitch-carousel-author">
                    <div className="stitch-carousel-initials">{t.name.charAt(0)}</div>
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
              Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro — sem perguntas, sem burocracia.
            </p>
            <p className="stitch-guarantee-risk">O risco é todo nosso. Você só tem a ganhar.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           PRICING — Centered card layout (old copy structure)
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-pricing-section fade-section">
        <div className="stitch-container">
          <h2 className="stitch-pricing-header reveal">Seu Acesso Está Aqui</h2>

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
                Comece Hoje e Transforme<br />a Experiência Dela
              </p>
              <div className="stitch-pricing-card-product">
                <span className="stitch-pricing-card-name">Código do Toque</span>
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
                <li><CheckWhite /> Bônus: Sexo Tântrico para Iniciantes</li>
                <li><CheckWhite /> Bônus: Guia dos 7 Sussurros</li>
                <li><CheckWhite /> Bônus: Controle Absoluto</li>
                <li><CheckWhite /> Acesso imediato e vitalício</li>
                <li><CheckWhite /> Garantia incondicional de 30 dias</li>
              </ul>

              {/* CTA */}
              <button className="stitch-btn-pricing-card" onClick={goCheckout}>
                QUERO DESPERTAR O PODER DO TOQUE
              </button>

              {/* Trust */}
              <div className="stitch-pricing-card-trust">
                <span><svg className="stitch-trust-lock" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> Pagamento seguro</span>
                <span><svg className="stitch-trust-bolt" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /></svg> Acesso em menos de 2 min</span>
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
          <h2 className="reveal">Está Na Hora de Criar Momentos Inesquecíveis</h2>
          <p className="stitch-final-cta-sub reveal">
            O Código do Toque vai te dar as ferramentas exatas para transformar a experiência dela e criar uma conexão que ela nunca vai esquecer.
          </p>
          <div className="stitch-final-cta-price reveal">
            <span className="stitch-final-cta-from">De R$ 134,60</span>
            <span className="stitch-final-cta-now">R$ 24,90</span>
          </div>
          <button className="stitch-btn-white reveal" onClick={goCheckout}>
            SIM, QUERO O CÓDIGO DO TOQUE — R$ 24,90
          </button>
          <p className="stitch-final-cta-safe reveal">Pagamento seguro · Acesso imediato · Garantia 30 dias</p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="stitch-footer">
        <div className="stitch-footer-inner">
          <div className="stitch-footer-links">
            <span>Termos de Uso</span>
            <span>Política de Privacidade</span>
            <span>Contato</span>
          </div>
          <p className="stitch-footer-copy">&copy; 2025 Código do Toque. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
