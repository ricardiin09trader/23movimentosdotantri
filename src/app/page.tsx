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
  { icon: <HeartIcon />, label: 'Toque Sutil', desc: 'Inicie sem parecer invasivo.' },
  { icon: <BoltIcon />, label: 'Poder & Calor', desc: 'Eleva a temperatura em segundos.' },
  { icon: <HandIcon />, label: 'A Pressão Certa', desc: 'Relaxe a mente, desperte o corpo.' },
  { icon: <ChartIcon />, label: 'Respiração Sincronizada', desc: 'Dobre a intensidade da conexão.' },
  { icon: <ClockIcon />, label: 'Leitura Corporal', desc: 'Leia os sinais não-verbais.' },
  { icon: <HeartVariantIcon />, label: 'Zonas Ignoradas', desc: 'Áreas sensoriais esquecidas.' },
];

/* ═══ BONUSES DATA ═══ */
const bonuses = [
  { num: '01', title: 'Sexo Tântrico', desc: 'Prolongue o prazer e expanda sua energia.' },
  { num: '02', title: 'Guia dos 7 Sussurros', desc: 'As palavras certas na intimidade.' },
  { num: '03', title: 'Controle Absoluto', desc: 'Domínio total sobre seu corpo.' },
];

/* ═══ COMMUNITY MEMBERS DATA ═══ */
const communityMembers = [
  { name: 'Carlos M.', city: 'São Paulo, SP', avatar: 'C', quote: 'Minha esposa disse que foi a melhor experiência em 8 anos de casamento. Movimentos simples que fazem toda diferença.', stars: 5, daysIn: 'há 45 dias na comunidade' },
  { name: 'Rafael T.', city: 'Curitiba, PR', avatar: 'R', quote: 'Depois dos 23 códigos, a conexão com minha namorada está em outro nível. A comunidade é sensacional.', stars: 5, daysIn: 'há 32 dias na comunidade' },
  { name: 'Diego S.', city: 'Rio de Janeiro, RJ', avatar: 'D', quote: 'São técnicas reais que funcionam. Meu relacionamento mudou completamente.', stars: 5, daysIn: 'há 28 dias na comunidade' },
  { name: 'Marcos P.', city: 'Belo Horizonte, MG', avatar: 'M', quote: 'Entrei cético e saí transformado. Minha parceira percebeu na primeira semana.', stars: 5, daysIn: 'há 60 dias na comunidade' },
  { name: 'Lucas C.', city: 'Porto Alegre, RS', avatar: 'L', quote: 'O suporte é incrível, alguém responde em minutos. Bônus que valem muito.', stars: 5, daysIn: 'há 15 dias na comunidade' },
  { name: 'Felipe R.', city: 'Campinas, SP', avatar: 'F', quote: 'Nenhum curso entrega como esse. O grupo é muito ativo. Melhor investimento.', stars: 5, daysIn: 'há 90 dias na comunidade' },
];

/* ═══ FAQ DATA ═══ */
const faqs = [
  { q: 'Como acesso a comunidade?', a: 'Após o pagamento, você recebe o acesso por email em menos de 2 minutos.' },
  { q: 'Funciona para casais?', a: 'Sim, tanto para quem está começando quanto para quem quer reacender a conexão.' },
  { q: 'Preciso de experiência?', a: 'Não. Tudo é explicado passo a passo dentro da comunidade.' },
  { q: 'E se eu não gostar?', a: '30 dias de garantia incondicional. Reembolso total sem perguntas.' },
  { q: 'Acesso vitalício?', a: 'Sim. Paga uma vez, acesso para sempre — incluindo atualizações e lives.' },
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
           1. HEADER
           ═══════════════════════════════════════════════════════════ */}
      <header className={`stitch-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="stitch-header-logo">CT</div>
        <nav className="stitch-header-nav">
          <a href="#codigos">Método</a>
          <a href="#bonus">Bônus</a>
          <a href="#depoimentos">Comunidade</a>
        </nav>
        <button className="stitch-header-cta" onClick={goCheckout}>Entrar</button>
      </header>

      {/* ═══════════════════════════════════════════════════════════
           2. HERO
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
          <h1 className="stitch-hero-title reveal">
            O CÓDIGO <span className="stitch-hero-title-red">DO TOQUE</span>
          </h1>
          <p className="stitch-hero-desc reveal">
            <span className="stitch-hero-desc-bold">23 movimentos</span> que criam uma conexão que ela nunca vai esquecer.
          </p>
          <div className="reveal">
            <button className="stitch-btn-hero" onClick={goCheckout}>
              QUERO ENTRAR — R$ 24,90
            </button>
          </div>
          <div className="stitch-hero-rating reveal">
            <div className="stitch-hero-stars">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="stitch-hero-rating-text">4.9/5 · 488 avaliações</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           3. PROBLEM — Short hook
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-problem fade-section">
        <div className="stitch-problem-inner">
          <p className="reveal">
            O toque tradicional se torna mecânico. <br />
            O <span className="stitch-problem-bold">Código do Toque</span> muda isso.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           4. METHOD PREVIEW — Image + tagline
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-connection fade-section">
        <div className="stitch-container">
          <div className="stitch-connection-grid">
            <div className="stitch-connection-image-wrap reveal">
              <div className="stitch-connection-deco" />
              <div className="stitch-connection-frame">
                <img
                  data-lazy
                  data-src="/lovable-uploads/mockup-hf.png"
                  alt="Código do Toque"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
              </div>
            </div>
            <div className="stitch-connection-text">
              <h2 className="stitch-connection-title reveal">Técnica comprovada.</h2>
              <p className="reveal">
                Cada movimento envia descargas de desejo e cria uma conexão que transcende o físico.
              </p>
              <p className="reveal">
                E você aprende dentro de uma comunidade ativa, com suporte e lives semanais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           5. CODES — Visual grid
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-codes fade-section" id="codigos">
        <div className="stitch-container">
          <h2 className="stitch-codes-title reveal">
            OS <span className="stitch-codes-title-red">23 CÓDIGOS</span>
          </h2>
          <p className="stitch-codes-subtitle reveal">
            Um mapa para o êxtase — veja alguns exemplos.
          </p>
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
           6. BONUSES
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-bonus fade-section" id="bonus">
        <div className="stitch-container">
          <h2 className="stitch-bonus-title reveal">
            3 BÔNUS <span className="stitch-bonus-title-red">EXCLUSIVOS</span>
          </h2>
        </div>
        <div className="stitch-bonus-grid">
          {bonuses.map((b, i) => (
            <div key={i} className="stitch-bonus-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="stitch-bonus-watermark">{b.num}</span>
              <p className="stitch-card-label">BÔNUS {b.num}</p>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           7. TESTIMONIALS — Carousel
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-testimonials fade-section" id="depoimentos">
        <div className="stitch-container">
          <h2 className="stitch-testimonials-title reveal">Relatos Reais</h2>

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           8. GUARANTEE
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-guarantee fade-section">
        <div className="stitch-guarantee-icon reveal">
          <ShieldIcon />
        </div>
        <h3 className="reveal">Garantia de 30 Dias</h3>
        <p className="stitch-guarantee-text reveal">
          Não gostou? Devolvemos 100%. Sem perguntas.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           9. FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-faq fade-section">
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
           10. OFFER
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-offer fade-section" id="oferta">
        <div className="stitch-container">
          <div className="stitch-offer-card reveal">
            <div className="stitch-offer-image-side">
              <span className="stitch-offer-bonus-badge">+3 BÔNUS</span>
              <img
                data-lazy
                data-src="/lovable-uploads/mockup-hf.png"
                alt="Código do Toque"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
            </div>
            <div className="stitch-offer-details">
              <p className="stitch-offer-access-label">Entrando na comunidade você recebe:</p>
              <div className="stitch-offer-price-row">
                <span className="stitch-offer-currency">R$</span>
                <span className="stitch-offer-amount">24,90</span>
              </div>
              <p className="stitch-offer-per">acesso vitalício</p>

              <ul className="stitch-offer-list">
                <li><CheckRedIcon /> Comunidade exclusiva + lives semanais</li>
                <li><CheckRedIcon /> 23 movimentos completos</li>
                <li><CheckRedIcon /> 3 bônus incluídos</li>
                <li><CheckRedIcon /> Garantia de 30 dias</li>
              </ul>

              <button className="stitch-offer-cta" onClick={goCheckout}>
                QUERO ENTRAR NA COMUNIDADE
              </button>

              <p className="stitch-offer-trust">Pagamento seguro · Acesso imediato</p>
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
            <a href="#termos">Termos</a>
            <a href="#privacidade">Privacidade</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
    </>
  );
}
