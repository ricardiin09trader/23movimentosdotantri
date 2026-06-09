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

  const heroVideoRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  /* ═══ INTRO SEQUENCE ═══ */
  useEffect(() => {
    const text = 'O Toque Que Faz Ela Pensar em Você';
    let chars = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i] === ' ' ? '\u00A0' : text[i];
      const delay = i * 60;
      chars += `<span class="letter" style="animation-delay:${delay}ms">${ch}</span>`;
    }
    const el = document.getElementById('intro-headline');
    if (el) el.innerHTML = chars;

    const totalDelay = text.length * 60 + 800;
    setTimeout(() => {
      const sub = document.getElementById('intro-subtitle');
      if (sub) sub.classList.add('show');
    }, totalDelay);

    setTimeout(() => {
      const overlay = document.getElementById('intro-overlay');
      if (overlay) overlay.classList.add('fade-out');
      document.body.classList.remove('intro-loading');
      if (heroVideoRef.current) heroVideoRef.current.classList.add('revealed');
      if (heroContentRef.current) heroContentRef.current.classList.add('show');
      setIntroDone(true);
    }, totalDelay + 1200);
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [introDone]);

  /* ═══ PARALLAX ═══ */
  useEffect(() => {
    const sections = document.querySelectorAll('[data-parallax]');
    let ticking = false;
    function updateParallax() {
      const scrollY = window.pageYOffset;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const speed = parseFloat(section.getAttribute('data-parallax') || '0');
        const offset = rect.top * speed * -1;
        const inner =
          section.querySelector('.offer-content') ||
          section.querySelector('.container-sm') ||
          section.querySelector('.container');
        if (inner && rect.top < window.innerHeight && rect.bottom > 0) {
          (inner as HTMLElement).style.transform = `translateY(${offset}px)`;
        }
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [introDone]);

  /* ═══ PARTICLES ═══ */
  useEffect(() => {
    if (!particlesRef.current) return;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 25;
    const container = particlesRef.current;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'gold-particle';
      const size = Math.random() * 3 + 1;
      p.style.setProperty('--size', size + 'px');
      p.style.setProperty('--x', Math.random() * 100 + '%');
      p.style.setProperty('--duration', (Math.random() * 20 + 12) + 's');
      p.style.setProperty('--delay', (Math.random() * 20) + 's');
      p.style.setProperty('--drift-x', (Math.random() * 60 - 30) + 'px');
      container.appendChild(p);
    }
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

  /* ═══ LAZY LOAD VIDEOS ═══ */
  useEffect(() => {
    const videos = document.querySelectorAll('video[data-lazy]');
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const v = entry.target as HTMLVideoElement;
          v.setAttribute('preload', 'auto');
          v.load();
          videoObserver.unobserve(v);
        }
      });
    }, { threshold: 0.25 });
    videos.forEach((v) => videoObserver.observe(v));
    return () => videoObserver.disconnect();
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

      {/* ═══ PARTICLES ═══ */}
      <div id="particles-container" ref={particlesRef} className="particles-container" />

      {/* ═══ TOAST ═══ */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        <div className="toast-dot" />
        <p className="toast-text">{toastText}</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 1 — HERO
           ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section" id="hero">
        <div className="hero-video-wrapper" ref={heroVideoRef}>
          <video autoPlay muted loop playsInline preload="auto" poster="/lovable-uploads/hero-bg.jpg">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <img src="/lovable-uploads/hero-bg.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="hero-overlay" />
        <div className="hero-vignette" />

        <div className="hero-content" ref={heroContentRef}>
          <div className="divider" style={{ justifyContent: 'center', marginBottom: 24 }}>
            <span>Experiência Exclusiva</span>
          </div>
          <h1 className="hero-headline">
            O Toque Que Faz Ela<br /><span className="gold">Pensar em Você</span>
          </h1>
          <p className="hero-sub">
            Descubra os <strong>23 movimentos tântricos</strong> que criam uma conexão tão profunda que ela <strong>nunca vai esquecer</strong> da experiência ao seu lado
          </p>
          <div className="hero-cta-wrap">
            <button className="btn-cta" onClick={goCheckout}>
              <span>QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90</span>
            </button>
            <p className="hero-trust">Acesso imediato · Garantia incondicional de 30 dias</p>
          </div>
          <div style={{ marginTop: 32 }}>
            <div className="hero-stars">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
              <strong style={{ color: 'var(--text-secondary)' }}>488 avaliações</strong> · Nota 4.9/5.0
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 2 — PROBLEM + CURIOSITY
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-lg">
        <div className="container-sm">
          <div className="divider reveal"><span>O Que Ninguém Te Contou</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,6.5vw,48px)', marginBottom: 20 }}>
            A Linguagem Secreta Que <span style={{ color: 'var(--gold)' }}>Poucos Dominam</span>
          </h2>
          <div className="reveal reveal-delay-1" style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, maxWidth: 640 }}>
              A maioria dos homens nunca desenvolve confiança, presença e atração de forma natural porque desconhece o poder oculto do toque consciente. Existe um conhecimento milenar, guardado por terapeutas e mestres, que transforma completamente a forma como uma mulher percebe e reage à sua presença.
            </p>
          </div>
          <div className="reveal reveal-delay-2" style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, maxWidth: 640 }}>
              O <strong style={{ color: 'var(--gold-light)', fontWeight: 500 }}>Código do Toque</strong> revela os <strong style={{ color: 'var(--gold-light)', fontWeight: 500 }}>23 movimentos tântricos</strong> que ativam pontos de prazer e relaxamento profundo — uma experiência que vai muito além do físico e cria uma conexão emocional inquebrável.
            </p>
          </div>

          <div className="curiosity-grid">
            <div className="glass curiosity-card reveal">
              <div className="curiosity-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <h3>Conexão Profunda</h3>
              <p>Cada movimento cria intimidade verdadeira e confiança absoluta — uma experiência que ela vai querer repetir</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-1">
              <div className="curiosity-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h3>6 Anos de Prática</h3>
              <p>Baseado em anos de terapia tântrica clínica com centenas de casos reais de transformação</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-2">
              <div className="curiosity-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3>Fácil de Aplicar</h3>
              <p>Instruções passo a passo que qualquer pessoa pode seguir — mesmo sem experiência prévia</p>
            </div>
            <div className="glass curiosity-card reveal reveal-delay-3">
              <div className="curiosity-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3>Resultados Imediatos</h3>
              <p>Você vai perceber a diferença na primeira vez que aplicar os movimentos — garantia de impacto</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 3 — TRANSFORMATION
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-dark section-pad-xl transform-section" data-parallax="0.2">
        <div className="container-sm">
          <div className="divider reveal"><span>A Transformação</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,6.5vw,48px)', marginBottom: 32, textAlign: 'center' }}>
            O Que Você Vai <span style={{ color: 'var(--gold)' }}>Despertar</span>
          </h2>

          <div className="glass-strong reveal" style={{ marginBottom: 48, borderRadius: 20, overflow: 'hidden' }}>
            <div className="transform-video-wrapper" style={{ borderRadius: 0, marginBottom: 0, boxShadow: 'none' }}>
              <video autoPlay muted loop playsInline data-lazy preload="none" poster="/lovable-uploads/hands-shoulder.jpg">
                <source src="/videos/transformation.mp4" type="video/mp4" />
              </video>
              <img src="/lovable-uploads/hands-shoulder.jpg" alt="Transformação" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="transform-video-overlay" />
            </div>
          </div>

          <div className="transform-attributes">
            <div className="glass transform-attr reveal">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h4>Confiança</h4>
              <p>Segurança interior que se manifesta em cada gesto e decisão</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-1">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              <h4>Presença</h4>
              <p>Aura magnética que faz todos notarem sua chegada</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-2">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <h4>Carisma</h4>
              <p>Atração natural e magnética que transcende o convencional</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-3">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h4>Autocontrole</h4>
              <p>Domínio emocional e mental que poucos possuem</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-4">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <h4>Poder Pessoal</h4>
              <p>Energia interior que transforma sua realidade e seus relacionamentos</p>
            </div>
            <div className="glass transform-attr reveal reveal-delay-4">
              <div className="transform-attr-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              </div>
              <h4>Energia Magnética</h4>
              <p>Campo energético que atrai e cativa naturalmente</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 4 — PRODUCT PRESENTATION
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-lg">
        <div className="container-sm">
          <div className="divider reveal"><span>O Que Você Recebe</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,6.5vw,48px)', marginBottom: 16, textAlign: 'center' }}>
            Os <span style={{ color: 'var(--gold)' }}>23 Códigos</span> Completo
          </h2>
          <p className="reveal" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 300, marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Tudo o que você precisa para transformar a experiência íntima e criar uma conexão inesquecível
          </p>

          <div className="product-grid">
            <div className="glass product-card reveal">
              <div className="product-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </div>
              <div className="product-card-number">01</div>
              <h3>7 Movimentos de Preparação</h3>
              <p>Crie o ambiente perfeito e prepare o corpo dela para receber toques profundos e relaxar completamente</p>
            </div>
            <div className="glass product-card reveal reveal-delay-1">
              <div className="product-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              </div>
              <div className="product-card-number">02</div>
              <h3>12 Pontos de Ativação</h3>
              <p>Descubra exatamente onde, como e quando tocar para ativar zonas de prazer profundo que a maioria desconhece</p>
            </div>
            <div className="glass product-card reveal reveal-delay-2">
              <div className="product-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div className="product-card-number">03</div>
              <h3>4 Movimentos de Finalização</h3>
              <p>A sequência exata para criar o clímax perfeito e deixar ela em estado de relaxamento e conexão total</p>
            </div>
            <div className="glass product-card reveal reveal-delay-3">
              <div className="product-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              </div>
              <div className="product-card-number">04</div>
              <h3>Mapas Visuais Ilustrados</h3>
              <p>Guias visuais detalhados mostrando cada movimento, pressão e ritmo — impossível errar</p>
            </div>
          </div>

          {/* Product mockup */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: 56 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ position: 'relative', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,.8))' }}>
                <img src="/lovable-uploads/book-cover.jpg" alt="Código do Toque" style={{ width: 200, borderRadius: 8, display: 'block', transform: 'perspective(800px) rotateY(-8deg)' }} />
                <div style={{ position: 'absolute', top: 0, left: -12, bottom: 0, width: 12, background: 'linear-gradient(90deg,#1a0800,#3d1010)', borderRadius: '4px 0 0 4px', transform: 'perspective(800px) rotateY(-8deg)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -16, right: -56, zIndex: 3, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,.8))' }}>
                <div style={{ width: 100, background: '#0F0F0F', borderRadius: 16, border: '1px solid rgba(212,175,55,.15)', padding: '6px 5px' }}>
                  <div style={{ width: 28, height: 4, background: '#1a1a1a', borderRadius: 6, margin: '0 auto 5px', border: '1px solid rgba(212,175,55,.1)' }} />
                  <div style={{ borderRadius: 8, overflow: 'hidden', aspectRatio: '9/16', background: '#050505', position: 'relative' }}>
                    <img src="/lovable-uploads/book-cover.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(5,5,5,.9),transparent)', padding: '6px 4px', textAlign: 'center' }}>
                      <p style={{ color: 'var(--gold)', fontSize: 5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>ACESSO IMEDIATO</p>
                    </div>
                  </div>
                  <div style={{ width: 18, height: 3, background: '#1a1a1a', borderRadius: 6, margin: '5px auto 0', border: '1px solid rgba(212,175,55,.1)' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', top: -6, right: -6, background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', color: '#050505', fontSize: 9, fontWeight: 700, padding: '4px 12px', borderRadius: 6, letterSpacing: '.1em', textTransform: 'uppercase', zIndex: 10, boxShadow: '0 4px 16px rgba(212,175,55,.4)' }}>+ Vendido</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 5 — BONUSES
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-dark section-pad-lg">
        <div className="container-sm">
          <div className="divider reveal"><span>Bônus Exclusivos</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,6.5vw,48px)', marginBottom: 40, textAlign: 'center' }}>
            3 Bônus <span style={{ color: 'var(--gold)' }}>Premium</span> Incluídos
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <div className="glass bonus-card reveal">
              <div className="bonus-number">01</div>
              <div style={{ flex: 1 }}>
                <h3>Sexo Tântrico para Iniciantes</h3>
                <p>Guia completo para transformar a experiência íntima usando os princípios do tantra — mesmo se você nunca estudou sobre o assunto</p>
                <div className="bonus-value">VALOR: R$ 59,90 · <span className="free">GRÁTIS HOJE</span></div>
              </div>
            </div>
            <div className="glass bonus-card reveal reveal-delay-1">
              <div className="bonus-number">02</div>
              <div style={{ flex: 1 }}>
                <h3>Guia dos 7 Sussurros</h3>
                <p>As palavras exatas para usar durante os toques que amplificam a conexão e o prazer em até 300%</p>
                <div className="bonus-value">VALOR: R$ 14,90 · <span className="free">GRÁTIS HOJE</span></div>
              </div>
            </div>
            <div className="glass bonus-card reveal reveal-delay-2">
              <div className="bonus-number">03</div>
              <div style={{ flex: 1 }}>
                <h3>Controle Absoluto</h3>
                <p>Técnicas comprovadas de respiração e foco mental para você durar quanto tempo quiser e ter total controle</p>
                <div className="bonus-value">VALOR: R$ 34,90 · <span className="free">GRÁTIS HOJE</span></div>
              </div>
            </div>
          </div>

          <div className="glass-accent value-stack reveal">
            <p className="value-stack-label">Valor Total dos Bônus:</p>
            <p className="value-stack-price">R$ 109,70</p>
            <p className="value-stack-note">Seu investimento hoje: <strong>R$ 24,90</strong></p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 6 — SOCIAL PROOF (WhatsApp Style)
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-lg">
        <div className="container-sm">
          <div className="divider reveal"><span>Resultados Reais</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,6.5vw,48px)', marginBottom: 40, textAlign: 'center' }}>
            O Que Nossos Alunos <span style={{ color: 'var(--gold)' }}>Estão Dizendo</span>
          </h2>

          <div className="whatsapp-container">
            <div className="wa-message right reveal">
              <div className="wa-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <p>&quot;Minha esposa disse que foi a melhor experiência que já tivemos em 8 anos de casamento. Os movimentos são simples mas fazem TODA a diferença. Valeu cada centavo.&quot;</p>
              <div className="wa-time">Carlos M. · São Paulo, SP · 14:32</div>
            </div>
            <div className="wa-message left reveal reveal-delay-1">
              <div className="wa-name">Rafael T.</div>
              <p>&quot;Eu sempre achei que sabia o que estava fazendo, mas percebi que estava completamente errado. Depois de aplicar os 23 códigos, a conexão com minha namorada está em outro nível.&quot;</p>
              <div className="wa-stars" style={{ marginTop: 6 }}>{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <div className="wa-time">Curitiba, PR · 16:45</div>
            </div>
            <div className="wa-message right reveal reveal-delay-2">
              <div className="wa-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <p>&quot;Material sério e profissional. Nada de truque mágico, são técnicas reais baseadas em tantra que funcionam. Meu relacionamento mudou completamente.&quot;</p>
              <div className="wa-time">Diego S. · Rio de Janeiro, RJ · 19:12</div>
            </div>
            <div className="wa-message left reveal reveal-delay-3">
              <div className="wa-name">Bruno A.</div>
              <p>&quot;Comprei cético e me surpreendi. A minha parceira notou a diferença na primeira semana. Recomendo demais para qualquer homem que quer se tornar memorável.&quot;</p>
              <div className="wa-stars" style={{ marginTop: 6 }}>{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <div className="wa-time">Belo Horizonte, MG · 21:08</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           SECTION 7 — OFFER
           ═══════════════════════════════════════════════════════════ */}
      <section className="offer-section section-pad-xl" data-parallax="0.15">
        <div className="offer-video-wrapper">
          <video autoPlay muted loop playsInline data-lazy preload="none" poster="">
            <source src="/videos/offer.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="offer-overlay" />

        <div className="offer-content container-sm">
          <div className="divider reveal"><span>Oferta Exclusiva</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(32px,7vw,56px)', marginBottom: 16, textAlign: 'center' }}>
            Comece Hoje Sua <span style={{ color: 'var(--gold)' }}>Transformação</span>
          </h2>
          <p className="reveal" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 300, marginBottom: 36 }}>
            Tudo o que você precisa. Nada além do necessário.
          </p>

          {/* Countdown Timer */}
          <div className="countdown-wrap reveal">
            <div className="glass countdown-unit">
              <div className="countdown-value">{hours}</div>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="glass countdown-unit">
              <div className="countdown-value">{minutes}</div>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="glass countdown-unit">
              <div className="countdown-value">{seconds}</div>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>

          {/* Price */}
          <div className="price-block reveal">
            <p className="price-original">De R$ 134,60 (produto + 3 bônus)</p>
            <p className="price-label">Oferta Especial de Lançamento</p>
            <p className="price-big">R$ 24,90</p>
            <p className="price-meta">Pagamento único · Acesso vitalício · 81% OFF</p>
          </div>

          {/* Checklist */}
          <div className="reveal" style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className="offer-checklist">
              <div className="offer-check-item highlight">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Código do Toque — 23 movimentos completos</span>
              </div>
              <div className="offer-check-item">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Bônus: Sexo Tântrico para Iniciantes (R$ 59,90)</span>
              </div>
              <div className="offer-check-item">
                <div className="offer-check-icon"><CheckIcon /></div>
                <span className="offer-check-text">Bônus: Guia dos 7 Sussurros (R$ 14,90)</span>
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
                <span className="offer-check-text">Garantia incondicional de 30 dias</span>
              </div>
            </div>

            <button className="btn-cta-offer" onClick={goCheckout} style={{ marginBottom: 16 }}>
              <span>QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90</span>
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '.04em' }}>
              Pagamento seguro via Cakto · Acesso em menos de 2 minutos
            </p>
          </div>

          {/* Guarantee */}
          <div className="glass-strong guarantee-wrap reveal">
            <div className="guarantee-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Garantia Incondicional de 30 Dias</h3>
            <p>Você tem <strong style={{ color: 'var(--gold-light)' }}>30 dias completos</strong> para testar os 23 movimentos. Se por qualquer motivo não ficar satisfeito, devolvemos <strong style={{ color: 'var(--gold-light)' }}>100% do seu dinheiro</strong> — sem perguntas, sem burocracia.</p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 12, fontWeight: 300 }}>O risco é todo nosso. Você só tem a ganhar.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="section-bg-mid section-pad-lg">
        <div className="container-sm">
          <div className="divider reveal"><span>Dúvidas Frequentes</span></div>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px,6vw,42px)', marginBottom: 32, textAlign: 'center' }}>
            Perguntas <span style={{ color: 'var(--gold)' }}>Frequentes</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="glass faq-item reveal">
              <div className="faq-q">Como recebo o acesso?</div>
              <div className="faq-a">Imediatamente após a confirmação do pagamento, você receberá um email com seus dados de acesso à plataforma exclusiva. Leva menos de 2 minutos.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-1">
              <div className="faq-q">Funciona para relacionamentos de longo prazo?</div>
              <div className="faq-a">Sim! O Código do Toque é perfeito tanto para quem está começando quanto para casais que querem reacender a chama e aprofundar a conexão.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-2">
              <div className="faq-q">Preciso de experiência prévia?</div>
              <div className="faq-a">Não! O método foi desenvolvido para qualquer pessoa, mesmo sem nenhuma experiência em tantra ou técnicas similares. Tudo é explicado passo a passo.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-3">
              <div className="faq-q">E se eu não gostar?</div>
              <div className="faq-a">Você tem 30 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, basta pedir o reembolso completo — sem perguntas.</div>
            </div>
            <div className="glass faq-item reveal reveal-delay-4">
              <div className="faq-q">O acesso é vitalício?</div>
              <div className="faq-a">Sim! Você paga apenas uma vez e tem acesso para sempre, incluindo todas as atualizações futuras do conteúdo.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
      <section className="final-cta-section section-pad-xl">
        <div className="container-sm">
          <h2 className="final-cta-headline reveal">
            Está Na Hora de Criar<br />Momentos <span style={{ color: 'var(--gold)' }}>Inesquecíveis</span>
          </h2>
          <p className="final-cta-sub reveal reveal-delay-1">
            O Código do Toque vai te dar as ferramentas exatas para transformar a experiência dela e criar uma conexão que ela nunca vai esquecer
          </p>
          <div className="reveal reveal-delay-2" style={{ maxWidth: 520, margin: '0 auto' }}>
            <button className="btn-cta" onClick={goCheckout}>
              <span>SIM, QUERO O CÓDIGO DO TOQUE — R$ 24,90</span>
            </button>
            <div className="final-cta-trust">
              <div className="final-cta-trust-item"><CheckSmall /> Acesso Imediato</div>
              <div className="final-cta-trust-item"><CheckSmall /> Garantia de 30 dias</div>
              <div className="final-cta-trust-item"><CheckSmall /> Pagamento 100% Seguro</div>
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
          <div className="footer-item"><CheckSmall /> Garantia de 30 dias</div>
          <div className="footer-item"><CheckSmall /> Suporte após compra</div>
        </div>
        <p className="footer-copy">&copy; 2025 Código do Toque &middot; Luna Amaral &middot; Todos os direitos reservados</p>
      </footer>
    </>
  );
}
