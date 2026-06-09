'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';

/* ═══ SVG ICONS ═══ */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#D4AF37">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CheckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [introDone, setIntroDone] = useState(false);
  const [hours, setHours] = useState('02');
  const [minutes, setMinutes] = useState('47');
  const [seconds, setSeconds] = useState('33');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  /* ═══ INTRO SEQUENCE ═══ */
  useEffect(() => {
    const text = 'Alguns homens permanecem na mente dela por dias.';
    let chars = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i] === ' ' ? '\u00A0' : text[i];
      const delay = i * 55;
      chars += `<span class="letter" style="animation-delay:${delay}ms">${ch}</span>`;
    }
    const el = document.getElementById('intro-headline');
    if (el) el.innerHTML = chars;

    const totalDelay = text.length * 55 + 600;
    setTimeout(() => {
      const sub = document.getElementById('intro-subtitle');
      if (sub) sub.classList.add('show');
    }, totalDelay);

    setTimeout(() => {
      const overlay = document.getElementById('intro-overlay');
      if (overlay) overlay.classList.add('fade-out');
      document.body.classList.remove('intro-loading');
      if (heroBgRef.current) heroBgRef.current.classList.add('revealed');
      if (heroContentRef.current) heroContentRef.current.classList.add('show');
      setIntroDone(true);
    }, totalDelay + 1000);
  }, []);

  /* ═══ SCROLL REVEAL ═══ */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [introDone]);

  /* ═══ LIGHT PARTICLES ═══ */
  useEffect(() => {
    if (!particlesRef.current) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 8 : 18;
    const container = particlesRef.current;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'light-particle';
      const size = Math.random() * 2 + 1;
      p.style.setProperty('--size', size + 'px');
      p.style.setProperty('--x', Math.random() * 100 + '%');
      p.style.setProperty('--duration', (Math.random() * 25 + 18) + 's');
      p.style.setProperty('--delay', (Math.random() * 25) + 's');
      p.style.setProperty('--drift-x', (Math.random() * 40 - 20) + 'px');
      container.appendChild(p);
    }
  }, []);

  /* ═══ SOFT PARALLAX ═══ */
  useEffect(() => {
    const bg = heroBgRef.current;
    if (!bg) return;
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.pageYOffset;
          (bg as HTMLElement).style.transform = `translateY(${y * 0.3}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ═══ COUNTDOWN TIMER ═══ */
  useEffect(() => {
    const STORAGE_KEY = 'os23movimentos_cd';
    let endTime = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const now = Date.now();
    if (!endTime || endTime < now) {
      endTime = now + 2 * 60 * 60 * 1000 + 47 * 60 * 1000 + 33 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }
    function update() {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        endTime = Date.now() + 2 * 60 * 60 * 1000 + 47 * 60 * 1000 + 33 * 1000;
        localStorage.setItem(STORAGE_KEY, endTime.toString());
      }
      const d = endTime - Date.now();
      const h = Math.floor(d / 3600000);
      const m = Math.floor((d % 3600000) / 60000);
      const s = Math.floor((d % 60000) / 1000);
      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
      setSeconds(s.toString().padStart(2, '0'));
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ═══ SOCIAL PROOF TOAST ═══ */
  useEffect(() => {
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Bruno A.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.', 'Thiago N.', 'Pedro H.', 'Gabriel S.', 'Matheus R.', 'Gustavo F.', 'Leonardo A.'];
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Curitiba, PR', 'Belo Horizonte, MG', 'Porto Alegre, RS', 'Salvador, BA', 'Brasília, DF', 'Fortaleza, CE', 'Recife, PE', 'Florianópolis, SC'];
    const actions = ['acabou de adquirir', 'acessou o conteúdo', 'completou o módulo 1', 'enviou uma mensagem de agradecimento'];
    let lastIdx = -1;
    function showToast() {
      let idx: number;
      do { idx = Math.floor(Math.random() * names.length); } while (idx === lastIdx);
      lastIdx = idx;
      const n = names[idx];
      const c = cities[Math.floor(Math.random() * cities.length)];
      const a = actions[Math.floor(Math.random() * actions.length)];
      const mins = Math.floor(Math.random() * 12) + 1;
      setToastText(`${n} de ${c} ${a} · ${mins} min atrás`);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 4000);
    }
    const t1 = setTimeout(showToast, 8000);
    const t2 = setInterval(showToast, 25000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  /* ═══ LAZY LOAD IMAGES ═══ */
  useEffect(() => {
    const images = document.querySelectorAll('img[data-lazy]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.25 });
    images.forEach((img) => imgObserver.observe(img));
    return () => imgObserver.disconnect();
  }, []);

  /* ═══ CHECKOUT HANDLER ═══ */
  const goCheckout = useCallback(() => {
    window.open(CHECKOUT, '_blank');
  }, []);

  return (
    <>
      {/* ═══ INTRO OVERLAY ═══ */}
      <div id="intro-overlay" className="intro-overlay">
        <div id="intro-headline" className="intro-headline" />
        <div id="intro-subtitle" className="intro-subtitle">Código do Toque</div>
      </div>

      {/* ═══ LIGHT PARTICLES (hero only) ═══ */}
      <div id="hero-particles" ref={particlesRef} className="hero-particles" />

      {/* ═══ TOAST ═══ */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        <div className="toast-dot" />
        <p className="toast-text">{toastText}</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 1 — HERO
           ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-wrapper" ref={heroBgRef}>
          <img src="/lovable-uploads/hero-bg.jpg" alt="" />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" ref={heroContentRef}>
          <p className="hero-eyebrow">Experiência Exclusiva</p>
          <h1 className="hero-headline">
            Alguns homens permanecem<br />na mente <span className="gold">dela por dias.</span>
          </h1>
          <p className="hero-sub">
            Descubra o que faz sua presença ser lembrada depois que o encontro termina.
          </p>
          <div className="hero-cta-wrap">
            <button className="btn-cta" onClick={goCheckout}>
              <span>Quero Acesso Imediato</span>
            </button>
            <p className="hero-trust">Garantia blindada de 30 dias</p>
          </div>
          <div className="hero-social-proof">
            <div className="hero-stars">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="hero-rating"><strong>488 avaliações</strong> · 4.9/5.0</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 2 — CURIOSITY
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-xl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">O que poucos sabem</div>
          <h2 className="section-title reveal">
            O conhecimento que <span className="gold">transforma</span>
          </h2>
          <p className="section-lead reveal">
            A maioria dos homens nunca descobre o que realmente cria conexão e desejo. Existe um caminho que poucos percorrem.
          </p>

          <div className="curiosity-grid">
            <div className="glass curiosity-card reveal">
              <div className="curiosity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <h3>Conexão Real</h3>
              <p>Intimidade verdadeira e confiança absoluta</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-1">
              <div className="curiosity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h3>6 Anos de Prática</h3>
              <p>Centinelas de casos reais de transformação</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-2">
              <div className="curiosity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3>Fácil de Aplicar</h3>
              <p>Passo a passo — sem experiência prévia</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-3">
              <div className="curiosity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3>Resultado Imediato</h3>
              <p>Impacto desde a primeira aplicação</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 3 — TRANSFORMATION
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-dark section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">A transformação</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            O que você vai <span className="gold">despertar</span>
          </h2>

          <div className="reveal" style={{ marginBottom: 56 }}>
            <div className="transform-image-wrapper">
              <img data-lazy data-src="/lovable-uploads/hands-shoulder.jpg" alt="Transformação" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" loading="lazy" />
              <div className="transform-image-overlay" />
            </div>
          </div>

          <div className="transform-attributes">
            <div className="glass transform-attr reveal">
              <h4>Confiança</h4>
              <p>Segurança em cada gesto</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-1">
              <h4>Presença</h4>
              <p>Aura magnética natural</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-2">
              <h4>Carisma</h4>
              <p>Atração que transcende</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-3">
              <h4>Autocontrole</h4>
              <p>Domínio emocional total</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-4">
              <h4>Poder Pessoal</h4>
              <p>Energia que transforma</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-4">
              <h4>Magnetismo</h4>
              <p>Atrai e cativa naturalmente</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 3.5 — WHY UNFORGETTABLE
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">O diferencial</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Por que alguns homens são<br /><span className="gold">inesquecíveis?</span>
          </h2>
          <p className="section-lead reveal" style={{ textAlign: 'center' }}>
            Três pilares separam o homem comum daquele que deixa marca.
          </p>

          <div className="unforgettable-grid">
            <div className="glass unforgettable-card reveal">
              <div className="unforgettable-card-number">01</div>
              <h3>Presença</h3>
              <p>Não tentam impressionar.<br />Chamam atenção naturalmente.</p>
            </div>
            <div className="glass unforgettable-card reveal reveal-delay-1">
              <div className="unforgettable-card-number">02</div>
              <h3>Conexão</h3>
              <p>Criam emoções que<br />permanecem na memória.</p>
            </div>
            <div className="glass unforgettable-card reveal reveal-delay-2">
              <div className="unforgettable-card-number">03</div>
              <h3>Confiança</h3>
              <p>Não buscam aprovação.<br />Sua energia fala por eles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 4 — PRODUCT
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-dark section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">O que você recebe</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Os <span className="gold">23 princípios</span> completos
          </h2>
          <p className="section-lead reveal" style={{ textAlign: 'center' }}>
            Tudo para se tornar inesquecível.
          </p>

          <div className="product-grid">
            <div className="glass product-card reveal">
              <div className="product-card-number">01</div>
              <h3>Preparação</h3>
              <p>Transforme o ambiente e crie a base para conexão profunda</p>
            </div>
            <div className="glass product-card reveal reveal-delay-1">
              <div className="product-card-number">02</div>
              <h3>Ativação</h3>
              <p>12 pontos que despertam desejo e confiança</p>
            </div>
            <div className="glass product-card reveal reveal-delay-2">
              <div className="product-card-number">03</div>
              <h3>Finalização</h3>
              <p>A sequência para criar um momento inesquecível</p>
            </div>
            <div className="glass product-card reveal reveal-delay-3">
              <div className="product-card-number">04</div>
              <h3>Mapas Visuais</h3>
              <p>Guias ilustrados — impossível errar</p>
            </div>
          </div>

          {/* Product mockup */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: 56 }}>
            <div className="product-mockup">
              <div className="product-mockup-book">
                <img data-lazy data-src="/lovable-uploads/book-cover.jpg" alt="Código do Toque" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" loading="lazy" />
                <div className="product-mockup-spine" />
              </div>
              <div className="product-mockup-phone">
                <div className="product-mockup-phone-inner">
                  <div style={{ width: 24, height: 3, background: '#1a1a1a', borderRadius: 6, margin: '0 auto 4px', border: '1px solid rgba(212,175,55,.1)' }} />
                  <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '9/16', background: '#050505', position: 'relative' }}>
                    <img data-lazy data-src="/lovable-uploads/book-cover.jpg" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(5,5,5,.9),transparent)', padding: '4px 3px', textAlign: 'center' }}>
                      <p style={{ color: 'var(--gold)', fontSize: 5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>ACESSO IMEDIATO</p>
                    </div>
                  </div>
                  <div style={{ width: 16, height: 2, background: '#1a1a1a', borderRadius: 6, margin: '4px auto 0', border: '1px solid rgba(212,175,55,.1)' }} />
                </div>
              </div>
              <div className="product-mockup-badge">+ Vendido</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 5 — BONUSES
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">Bônus exclusivos</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            3 recursos para acelerar<br />sua <span className="gold">transformação</span>
          </h2>

          <div className="bonus-list">
            <div className="glass bonus-card reveal">
              <div className="bonus-number">01</div>
              <div>
                <h3>Sexo Tântrico para Iniciantes</h3>
                <p>Transforme a intimidade usando princípios milenares. Confiança desde o primeiro contato.</p>
                <div className="bonus-value">R$ 59,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
            <div className="glass bonus-card reveal reveal-delay-1">
              <div className="bonus-number">02</div>
              <div>
                <h3>Guia dos 7 Sussurros</h3>
                <p>As palavras certas no momento certo. Conexão e impacto multiplicados.</p>
                <div className="bonus-value">R$ 14,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
            <div className="glass bonus-card reveal reveal-delay-2">
              <div className="bonus-number">03</div>
              <div>
                <h3>Controle Absoluto</h3>
                <p>Respiração e foco mental. Total domínio. Presença sem ansiedade.</p>
                <div className="bonus-value">R$ 34,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
          </div>

          <div className="glass-accent value-stack reveal">
            <p className="value-stack-label">Valor total dos bônus</p>
            <p className="value-stack-price">R$ 109,70</p>
            <p className="value-stack-note">Hoje: <strong>R$ 24,90</strong></p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 6 — TESTIMONIALS
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-dark section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal">Resultados reais</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            O que nossos alunos <span className="gold">dizem</span>
          </h2>

          <div className="whatsapp-container testimonials-large">
            <div className="wa-message wa-message-large right reveal">
              <div className="wa-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <p>&quot;Minha esposa disse que foi a melhor experiência em 8 anos de casamento. Eu mudei a forma como me aproximo, como olho. Valeu cada centavo.&quot;</p>
              <div className="wa-time">Carlos M. · São Paulo, SP</div>
            </div>
            <div className="wa-message wa-message-large left reveal reveal-delay-1">
              <div className="wa-name">Rafael T.</div>
              <p>&quot;Depois de aplicar o conteúdo, minha namorada disse que eu mudei de uma forma que ela não consegue explicar. Me sinto mais confiante.&quot;</p>
              <div className="wa-stars" style={{ marginTop: 6 }}>{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <div className="wa-time">Curitiba, PR</div>
            </div>
            <div className="wa-message wa-message-large right reveal reveal-delay-2">
              <div className="wa-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <p>&quot;Comprei cético. Na primeira semana ela disse que nunca se sentiu tão desejada. Isso é sobre presença. E presença muda tudo.&quot;</p>
              <div className="wa-time">Diego S. · Rio de Janeiro, RJ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 7 — OFFER
           ═══════════════════════════════════════════════════════════ */}
      <section className="offer-section section-pad-xxl">
        <div className="offer-content container-sm">
          <div className="section-eyebrow reveal" style={{ textAlign: 'center' }}>Oferta exclusiva</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Comece sua <span className="gold">transformação</span>
          </h2>
          <p className="section-lead reveal" style={{ textAlign: 'center' }}>
            Tudo o que você precisa. Nada além.
          </p>

          {/* Countdown */}
          <div className="countdown-wrap reveal">
            <div className="glass countdown-unit">
              <div className="countdown-value">{hours}</div>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="glass countdown-unit">
              <div className="countdown-value">{minutes}</div>
              <div className="countdown-label">Min</div>
            </div>
            <div className="glass countdown-unit">
              <div className="countdown-value">{seconds}</div>
              <div className="countdown-label">Seg</div>
            </div>
          </div>

          {/* Value Anchoring */}
          <div className="glass-strong value-anchor reveal">
            <p className="value-anchor-title">Valor individual</p>
            <div className="value-anchor-row">
              <span className="value-anchor-item">Conteúdo Principal</span>
              <span className="value-anchor-dots" />
              <span className="value-anchor-price">R$ 97</span>
            </div>
            <div className="value-anchor-row">
              <span className="value-anchor-item">Material Complementar</span>
              <span className="value-anchor-dots" />
              <span className="value-anchor-price">R$ 47</span>
            </div>
            <div className="value-anchor-row">
              <span className="value-anchor-item">Bônus Exclusivos</span>
              <span className="value-anchor-dots" />
              <span className="value-anchor-price">R$ 37</span>
            </div>
            <div className="value-anchor-divider" />
            <div className="value-anchor-row total">
              <span className="value-anchor-item" style={{ fontWeight: 600 }}>Total</span>
              <span className="value-anchor-dots" />
              <span className="value-anchor-price" style={{ fontWeight: 600 }}>R$ 181</span>
            </div>
            <div className="value-anchor-today">
              <span>Hoje:</span>
              <span className="value-anchor-final">R$ 24,90</span>
            </div>
          </div>

          {/* Price */}
          <div className="price-block reveal">
            <p className="price-big">R$ 24,90</p>
            <p className="price-meta">Pagamento único · Acesso vitalício · 86% OFF</p>
          </div>

          {/* Checklist */}
          <div className="reveal" style={{ maxWidth: 520, margin: '0 auto' }}>
            <div className="offer-checklist">
              <div className="offer-check-item highlight">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">23 princípios completos</span>
              </div>
              <div className="offer-check-item">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Bônus: Sexo Tântrico (R$ 59,90)</span>
              </div>
              <div className="offer-check-item">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Bônus: 7 Sussurros (R$ 14,90)</span>
              </div>
              <div className="offer-check-item">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Bônus: Controle Absoluto (R$ 34,90)</span>
              </div>
              <div className="offer-check-item highlight">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Acesso imediato e vitalício</span>
              </div>
              <div className="offer-check-item highlight">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Garantia blindada de 30 dias</span>
              </div>
            </div>

            <button className="btn-cta-offer" onClick={goCheckout}>
              <span>Quero Acesso Imediato — R$ 24,90</span>
            </button>
            <p className="offer-footer-note">Pagamento seguro via Cakto · Acesso em menos de 2 min</p>
          </div>

          {/* Guarantee */}
          <div className="glass-strong guarantee-wrap reveal">
            <div className="guarantee-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Garantia Blindada de 30 Dias</h3>
            <p>Acesse todo o conteúdo com tranquilidade. Se não entregar valor, reembolsamos 100%.</p>
            <div className="guarantee-pillars">
              <span>Sem burocracia.</span>
              <span>Sem complicação.</span>
              <span>Sem risco.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-xxl">
        <div className="container-sm">
          <div className="section-eyebrow reveal" style={{ textAlign: 'center' }}>Dúvidas</div>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Perguntas <span className="gold">frequentes</span>
          </h2>

          <div className="faq-list">
            <div className="glass faq-item reveal">
              <div className="faq-q">Como recebo o acesso?</div>
              <div className="faq-a">Após o pagamento, você recebe um email com acesso em menos de 2 minutos.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-1">
              <div className="faq-q">Funciona para relacionamentos de longo prazo?</div>
              <div className="faq-a">Sim. Perfeito para quem está começando ou quer reacender a conexão.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-2">
              <div className="faq-q">Preciso de experiência prévia?</div>
              <div className="faq-a">Não. Tudo explicado passo a passo, para qualquer pessoa.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-3">
              <div className="faq-q">E se eu não gostar?</div>
              <div className="faq-a">30 dias de garantia. Reembolso sem perguntas, sem burocracia.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-4">
              <div className="faq-q">Acesso é vitalício?</div>
              <div className="faq-a">Sim. Paga uma vez, acessa para sempre, incluindo atualizações.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
      <section className="final-cta-section section-pad-xxl">
        <div className="container-sm" style={{ textAlign: 'center' }}>
          <h2 className="final-cta-headline reveal">
            Está na hora de se tornar<br /><span className="gold">inesquecível.</span>
          </h2>
          <p className="final-cta-sub reveal">
            A decisão é sua. O próximo passo, também.
          </p>
          <div className="reveal" style={{ maxWidth: 480, margin: '0 auto' }}>
            <button className="btn-cta" onClick={goCheckout}>
              <span>Quero Começar Agora</span>
            </button>
            <div className="final-cta-trust">
              <div className="final-cta-trust-item"><CheckSmall /> Acesso imediato</div>
              <div className="final-cta-trust-item"><CheckSmall /> Garantia 30 dias</div>
              <div className="final-cta-trust-item"><CheckSmall /> Pagamento seguro</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════ */}
      <footer className="footer" style={{ marginTop: 'auto' }}>
        <div className="footer-grid">
          <div className="footer-item"><CheckSmall /> Pagamento seguro</div>
          <div className="footer-item"><CheckSmall /> Acesso imediato</div>
          <div className="footer-item"><CheckSmall /> Garantia 30 dias</div>
          <div className="footer-item"><CheckSmall /> Suporte</div>
        </div>
        <p className="footer-copy">&copy; 2025 Código do Toque &middot; Todos os direitos reservados</p>
      </footer>
    </>
  );
}
