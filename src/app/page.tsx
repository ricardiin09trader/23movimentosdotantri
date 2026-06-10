'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';

/* ═══ SVG ICONS ═══ */
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FACC15">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth={3}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const CheckSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
  const [introDone, setIntroDone] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');

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
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
    }, { threshold: 0.25 });
    images.forEach((img) => imgObserver.observe(img));
    return () => imgObserver.disconnect();
  }, []);

  /* ═══ SOCIAL PROOF TOAST ═══ */
  useEffect(() => {
    const names = ['Carlos M.', 'Rafael T.', 'Diego S.', 'Bruno A.', 'Marcos P.', 'Eduardo L.', 'Felipe R.', 'André V.', 'Lucas C.', 'Thiago N.', 'Pedro H.', 'Gabriel S.'];
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Curitiba, PR', 'Belo Horizonte, MG', 'Porto Alegre, RS', 'Salvador, BA', 'Brasília, DF', 'Fortaleza, CE'];
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

  /* ═══ CHECKOUT HANDLER ═══ */
  const goCheckout = useCallback(() => {
    window.open(CHECKOUT, '_blank');
  }, []);

  return (
    <>
      {/* ═══ TOAST ═══ */}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>
        <div className="toast-dot" />
        <p className="toast-text">{toastText}</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           TOP BANNER
           ═══════════════════════════════════════════════════════════ */}
      <div className="top-banner">
        <p>OFERTA ESPECIAL — Apenas <strong>R$ 24,90</strong> (86% OFF)</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           HERO
           ═══════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-headline reveal">
            O Toque Que Faz Ela<br />Pensar em <span className="red">Você</span>
          </h1>
          <p className="hero-sub reveal">
            Descubra os 23 movimentos táticos que criam uma conexão tão profunda que ela nunca vai esquecer da experiência ao seu lado.
          </p>
          <div className="reveal" style={{ maxWidth: 480, margin: '0 auto' }}>
            <button className="btn-cta" onClick={goCheckout}>
              <span>QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90</span>
            </button>
            <p className="hero-trust">Garantia incondicional de 30 dias</p>
          </div>
          <div className="hero-stars reveal" style={{ marginTop: 32 }}>
            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            <p className="hero-rating"><strong>488 avaliações</strong> · 4.9/5.0</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FEATURES — 4 CARDS
           ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            Aprenda Como Conduzir a Melhor<br />Experiência da Vida <span className="red">Dela</span>
          </h2>
          <p className="section-lead reveal">
            O toque é a linguagem mais poderosa da intimidade. Um toque consciente e intencional cria uma conexão emocional profunda que vai muito além do físico.
          </p>

          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              </div>
              <h3>Conexão Emocional Profunda</h3>
              <p>Intimidade verdadeira e confiança absoluta entre vocês</p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <h3>Técnica Comprovada</h3>
              <p>6 anos de experiência com resultados reais</p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              </div>
              <h3>Fácil de Aplicar</h3>
              <p>Passo a passo completo — sem experiência prévia</p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3>Resultados Imediatos</h3>
              <p>Impacto desde a primeira aplicação</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           PRODUCT CODES — 4 BULLETS
           ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            Os 23 Códigos Que Vão Transformar<br />a Experiência <span className="red">Dela</span>
          </h2>

          <div className="codes-list">
            <div className="code-item reveal">
              <div className="code-dot" />
              <div>
                <h4>Os 7 Movimentos de Preparação</h4>
                <p>Crie o ambiente ideal para uma conexão profunda</p>
              </div>
            </div>
            <div className="code-item reveal reveal-delay-1">
              <div className="code-dot" />
              <div>
                <h4>Os 12 Pontos de Ativação</h4>
                <p>Desperte desejo e confiança em cada toque</p>
              </div>
            </div>
            <div className="code-item reveal reveal-delay-2">
              <div className="code-dot" />
              <div>
                <h4>Os 4 Movimentos de Finalização</h4>
                <p>Crie um momento inesquecível para ela</p>
              </div>
            </div>
            <div className="code-item reveal reveal-delay-3">
              <div className="code-dot" />
              <div>
                <h4>Mapas Visuais Ilustrados</h4>
                <p>Guias com imagens de modelos reais — impossível errar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           BONUSES — 3 CARDS
           ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">
            Mais 3 Bônus Exclusivos<br />Para <span className="red">Você</span>
          </h2>

          <div className="bonus-list">
            <div className="bonus-card reveal">
              <div className="bonus-num">01</div>
              <div>
                <h3>Sexo Tântrico para Iniciantes</h3>
                <p>Transforme a intimidade usando princípios milenares.</p>
                <div className="bonus-val">R$ 59,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
            <div className="bonus-card reveal reveal-delay-1">
              <div className="bonus-num">02</div>
              <div>
                <h3>Guia dos 7 Sussurros</h3>
                <p>As palavras certas no momento certo para mais conexão.</p>
                <div className="bonus-val">R$ 14,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
            <div className="bonus-card reveal reveal-delay-2">
              <div className="bonus-num">03</div>
              <div>
                <h3>Controle Absoluto</h3>
                <p>Respiração e foco mental para total domínio.</p>
                <div className="bonus-val">R$ 34,90 · <span className="free">Grátis hoje</span></div>
              </div>
            </div>
          </div>

          <div className="value-stack reveal">
            <p className="value-stack-label">Valor total dos bônus</p>
            <p className="value-stack-price">R$ 109,70</p>
            <p className="value-stack-note">Seu investimento hoje: <strong>R$ 24,90</strong></p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           TESTIMONIALS — 3 CARDS
           ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            O Que Nossos Alunos Estão <span className="red">Dizendo</span>
          </h2>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <blockquote>&ldquo;Minha esposa disse que foi a melhor experiência em 8 anos de casamento. Eu mudei a forma como me aproximo, como olho. Valeu cada centavo.&rdquo;</blockquote>
              <div className="testimonial-author">Carlos M. · São Paulo, SP</div>
            </div>
            <div className="testimonial-card reveal reveal-delay-1">
              <div className="testimonial-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <blockquote>&ldquo;Depois de aplicar o conteúdo, minha namorada disse que eu mudei de uma forma que ela não consegue explicar. Me sinto mais confiante.&rdquo;</blockquote>
              <div className="testimonial-author">Rafael T. · Curitiba, PR</div>
            </div>
            <div className="testimonial-card reveal reveal-delay-2">
              <div className="testimonial-stars">{[...Array(5)].map((_, i) => <StarIcon key={i} />)}</div>
              <blockquote>&ldquo;Comprei cético. Na primeira semana ela disse que nunca se sentiu tão desejada. Isso é sobre presença. E presença muda tudo.&rdquo;</blockquote>
              <div className="testimonial-author">Diego S. · Rio de Janeiro, RJ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           GUARANTEE — RED BAR
           ═══════════════════════════════════════════════════════════ */}
      <div className="guarantee-bar reveal">
        <h2>Garantia Incondicional de 30 Dias</h2>
        <p>
          Você tem 30 dias completos para testar os 23 movimentos do Código do Toque.
          Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro — sem perguntas, sem burocracia.
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           OFFER — MOCKUP LEFT + PRICE RIGHT
           ═══════════════════════════════════════════════════════════ */}
      <section className="offer-section">
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Comece Hoje e Transforme<br />a Experiência <span className="red">Dela</span>
          </h2>

          <div className="offer-layout reveal">
            {/* Mockup */}
            <div className="offer-mockup">
              <div className="offer-mockup-book">
                <img data-lazy data-src="/lovable-uploads/book-cover.jpg" alt="Código do Toque" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" loading="lazy" />
                <div className="offer-mockup-spine" />
              </div>
              <div className="offer-mockup-phone">
                <div className="offer-mockup-phone-inner">
                  <div style={{ width: 20, height: 2.5, background: '#222', borderRadius: 6, margin: '0 auto 3px' }} />
                  <div className="offer-mockup-phone-screen">
                    <img data-lazy data-src="/lovable-uploads/book-cover.jpg" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" loading="lazy" />
                  </div>
                  <div style={{ width: 14, height: 2, background: '#222', borderRadius: 6, margin: '3px auto 0' }} />
                </div>
              </div>
              <div className="offer-mockup-badge">+ Vendido</div>
            </div>

            {/* Price + Checklist */}
            <div className="offer-info">
              <p className="offer-label">Oferta Especial de Lançamento</p>
              <p className="offer-price">R$ 24,90</p>
              <p className="offer-price-meta">Pagamento único · Acesso vitalício</p>

              <div className="delivery-badge">
                <MailIcon />
                <span>Recebe tudo via email — PDF Guia com imagens de modelos reais para melhor ensinamento</span>
              </div>

              <div className="offer-checklist">
                <div className="offer-check-item">
                  <div className="offer-check-icon"><CheckIcon /></div>
                  <span className="offer-check-text">Código do Toque — 23 movimentos completos</span>
                </div>
                <div className="offer-check-item">
                  <div className="offer-check-icon"><CheckIcon /></div>
                  <span className="offer-check-text">Bônus: Sexo Tântrico (R$ 59,90)</span>
                </div>
                <div className="offer-check-item">
                  <div className="offer-check-icon"><CheckIcon /></div>
                  <span className="offer-check-text">Bônus: Guia dos 7 Sussurros (R$ 14,90)</span>
                </div>
                <div className="offer-check-item">
                  <div className="offer-check-icon"><CheckIcon /></div>
                  <span className="offer-check-text">Bônus: Controle Absoluto (R$ 34,90)</span>
                </div>
                <div className="offer-check-item">
                  <div className="offer-check-icon"><CheckIcon /></div>
                  <span className="offer-check-text">Garantia incondicional de 30 dias</span>
                </div>
              </div>

              <button className="btn-cta-sm" onClick={goCheckout}>
                <span>QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90</span>
              </button>
              <p className="offer-trust">Pagamento seguro · Acesso em menos de 2 min</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FAQ
           ═══════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
            Perguntas <span className="red">Frequentes</span>
          </h2>

          <div className="faq-list">
            <div className="faq-item reveal">
              <div className="faq-q">Como recebo o acesso?</div>
              <div className="faq-a">Imediatamente após a confirmação do pagamento, você recebe um email com acesso ao PDF completo — com imagens de modelos reais para melhor ensinamento.</div>
            </div>
            <div className="faq-item reveal reveal-delay-1">
              <div className="faq-q">Funciona para relacionamentos de longo prazo?</div>
              <div className="faq-a">Sim. É perfeito tanto para quem está começando quanto para quem quer reacender a conexão em um relacionamento consolidado.</div>
            </div>
            <div className="faq-item reveal reveal-delay-2">
              <div className="faq-q">Preciso de experiência prévia?</div>
              <div className="faq-a">Não. O conteúdo é 100% passo a passo, com imagens ilustradas, para qualquer pessoa aplicar.</div>
            </div>
            <div className="faq-item reveal reveal-delay-3">
              <div className="faq-q">E se eu não gostar?</div>
              <div className="faq-a">Você tem 30 dias de garantia incondicional. Reembolso total, sem perguntas, sem burocracia.</div>
            </div>
            <div className="faq-item reveal reveal-delay-3">
              <div className="faq-q">O acesso é vitalício?</div>
              <div className="faq-a">Sim. Paga uma vez e acessa para sempre, incluindo todas as atualizações futuras.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA — RED BAR
           ═══════════════════════════════════════════════════════════ */}
      <div className="final-cta-bar reveal">
        <h2>Está Na Hora de Criar<br />Momentos <span className="red" style={{ color: '#fff' }}>Inesquecíveis</span></h2>
        <p>
          O Código do Toque vai te dar as ferramentas exatas para transformar a experiência dela e criar uma conexão que ela nunca vai esquecer.
        </p>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <button className="btn-cta-white" onClick={goCheckout}>
            <span>SIM, QUERO O CÓDIGO DO TOQUE — R$ 24,90</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-item"><CheckSmall /> Pagamento 100% Seguro</div>
          <div className="footer-item"><CheckSmall /> Acesso Imediato</div>
          <div className="footer-item"><CheckSmall /> Garantia 30 Dias</div>
        </div>
        <p className="footer-copy">&copy; 2025 Código do Toque · Todos os direitos reservados</p>
      </footer>
    </>
  );
}
