'use client';

import { useEffect, useState, useCallback } from 'react';

const CHECKOUT = 'https://pay.cakto.com.br/3j7svgt_458559';

/* ═══ SVG ICONS ═══ */
const HeartIcon = () => (
  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChartIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const CheckGreen = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />
  </svg>
);
const CheckWhite = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
);
const ChevronIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  {
    q: 'Como recebo o acesso?',
    a: 'Imediatamente após a confirmação do pagamento, você recebe um email com acesso ao PDF completo — com imagens de modelos reais para melhor ensinamento.',
  },
  {
    q: 'Funciona para relacionamentos de longo prazo?',
    a: 'Sim. É perfeito tanto para quem está começando quanto para quem quer reacender a conexão em um relacionamento consolidado.',
  },
  {
    q: 'Preciso de experiência prévia?',
    a: 'Não. O conteúdo é 100% passo a passo, com imagens ilustradas, para qualquer pessoa aplicar.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você tem 30 dias de garantia incondicional. Reembolso total, sem perguntas, sem burocracia.',
  },
  {
    q: 'O acesso é vitalício?',
    a: 'Sim. Paga uma vez e acessa para sempre, incluindo todas as atualizações futuras.',
  },
];

/* ═══ MAIN PAGE ═══ */
export default function HomePage() {
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
      <div className={`stitch-toast ${toastVisible ? 'show' : ''}`}>
        <div className="stitch-toast-dot" />
        <p className="stitch-toast-text">{toastText}</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           TOP BANNER
           ═══════════════════════════════════════════════════════════ */}
      <div className="stitch-top-banner">
        <p>OFERTA ESPECIAL — Apenas <strong>R$ 24,90</strong> (86% OFF)</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
           HERO — Full-width background image + overlay
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-hero">
        {/* Background Image with Overlay */}
        <div className="stitch-hero-bg">
          <img
            data-lazy
            data-src="/lovable-uploads/hero-stitch.jpg"
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
            <div className="reveal">
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
           BENEFITS FLOW — Light background, 4 steps
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-benefits">
        <div className="stitch-container">
          <h2 className="stitch-section-title reveal">
            Aprenda Como Conduzir a Melhor<br />Experiência da Vida Dela
          </h2>
          <p className="stitch-section-lead reveal">
            Passos e movimentos precisos que vão levar seu relacionamento a um nível de intimidade nunca visto antes.
          </p>

          {/* Flow Diagram */}
          <div className="stitch-flow-grid">
            {/* Connector Line (desktop only) */}
            <div className="stitch-flow-line" />

            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon">
                <HeartIcon />
              </div>
              <h3>Conexão</h3>
              <p>Prepare o terreno criando intimidade verdadeira e confiança absoluta.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon">
                <BoltIcon />
              </div>
              <h3>Técnica</h3>
              <p>Os movimentos exatos para despertar desejo e confiança em cada toque.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon">
                <ClockIcon />
              </div>
              <h3>Prática</h3>
              <p>Fácil de aplicar — passo a passo completo, sem experiência prévia.</p>
            </div>
            <div className="stitch-flow-step reveal">
              <div className="stitch-flow-icon">
                <ChartIcon />
              </div>
              <h3>Resultados</h3>
              <p>Impacto desde a primeira aplicação — transformação instantânea.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           CONTENT BREAKDOWN — 23 Codes with image backgrounds
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-codes-section">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="stitch-section-title-dark reveal">
            Os 23 Códigos Que Vão Transformar<br />a Experiência Dela
          </h2>

          <div className="stitch-codes-list">
            <div className="stitch-code-item reveal">
              <img
                data-lazy
                data-src="/lovable-uploads/content-bg-1.jpg"
                alt=""
                className="stitch-code-bg"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 7 Movimentos de Preparação</h4>
                  <p>Crie o ambiente ideal para uma conexão profunda</p>
                </div>
              </div>
            </div>

            <div className="stitch-code-item reveal">
              <img
                data-lazy
                data-src="/lovable-uploads/content-bg-2.jpg"
                alt=""
                className="stitch-code-bg"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 12 Pontos de Ativação</h4>
                  <p>Desperte desejo e confiança em cada toque</p>
                </div>
              </div>
            </div>

            <div className="stitch-code-item reveal">
              <img
                data-lazy
                data-src="/lovable-uploads/content-bg-3.jpg"
                alt=""
                className="stitch-code-bg"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
              <div className="stitch-code-inner">
                <div className="stitch-code-check"><CheckGreen /></div>
                <div>
                  <h4>Os 4 Movimentos de Finalização</h4>
                  <p>Crie um momento inesquecível para ela</p>
                </div>
              </div>
            </div>

            <div className="stitch-code-item reveal">
              <img
                data-lazy
                data-src="/lovable-uploads/content-bg-4.jpg"
                alt=""
                className="stitch-code-bg"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
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
           BONUSES — 3-column grid
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-bonus-section">
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
           TESTIMONIALS — 3-column grid with avatars
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-testimonials-section">
        <div className="stitch-container stitch-container-wide">
          <h2 className="stitch-section-title-dark reveal">
            O Que Nossos Alunos Estão Dizendo
          </h2>

          <div className="stitch-testimonials-grid">
            <div className="stitch-testimonial-card reveal">
              <div className="stitch-testimonial-stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="stitch-testimonial-quote">
                &ldquo;Minha esposa disse que foi a melhor experiência em 8 anos de casamento. Eu mudei a forma como me aproximo, como olho. Valeu cada centavo.&rdquo;
              </p>
              <div className="stitch-testimonial-author">
                <img
                  data-lazy
                  data-src="/lovable-uploads/avatar-carlos.jpg"
                  alt="Carlos M."
                  className="stitch-testimonial-avatar"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
                <div>
                  <p className="stitch-testimonial-name">Carlos M.</p>
                  <p className="stitch-testimonial-city">São Paulo, SP</p>
                </div>
              </div>
            </div>

            <div className="stitch-testimonial-card reveal">
              <div className="stitch-testimonial-stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="stitch-testimonial-quote">
                &ldquo;Depois de aplicar o conteúdo, minha namorada disse que eu mudei de uma forma que ela não consegue explicar. Me sinto mais confiante.&rdquo;
              </p>
              <div className="stitch-testimonial-author">
                <img
                  data-lazy
                  data-src="/lovable-uploads/avatar-rafael.jpg"
                  alt="Rafael T."
                  className="stitch-testimonial-avatar"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
                <div>
                  <p className="stitch-testimonial-name">Rafael T.</p>
                  <p className="stitch-testimonial-city">Curitiba, PR</p>
                </div>
              </div>
            </div>

            <div className="stitch-testimonial-card reveal">
              <div className="stitch-testimonial-stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="stitch-testimonial-quote">
                &ldquo;Comprei cético. Na primeira semana ela disse que nunca se sentiu tão desejada. Isso é sobre presença. E presença muda tudo.&rdquo;
              </p>
              <div className="stitch-testimonial-author">
                <img
                  data-lazy
                  data-src="/lovable-uploads/avatar-diego.jpg"
                  alt="Diego S."
                  className="stitch-testimonial-avatar"
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
                <div>
                  <p className="stitch-testimonial-name">Diego S.</p>
                  <p className="stitch-testimonial-city">Rio de Janeiro, RJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           GUARANTEE — Gradient card
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-guarantee-section">
        <div className="stitch-container stitch-container-narrow">
          <div className="stitch-guarantee-card reveal">
            <div className="stitch-guarantee-icon">
              <ShieldIcon />
            </div>
            <div className="stitch-guarantee-content">
              <h3>Garantia Incondicional de 30 Dias</h3>
              <p>
                Você tem 30 dias completos para testar os 23 movimentos do Código do Toque.
                Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu dinheiro — sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           PRICING — Mockup left + Info right
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-pricing-section">
        <div className="stitch-container">
          <div className="stitch-pricing-grid">
            {/* Product Mockup */}
            <div className="stitch-pricing-mockup reveal">
              <img
                data-lazy
                data-src="/lovable-uploads/book-cover.jpg"
                alt="Código do Toque"
                className="stitch-pricing-img"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              />
              <div className="stitch-pricing-badge">
                <span>Acesso<br />Imediato</span>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="stitch-pricing-info reveal">
              <h2 className="stitch-pricing-title">
                Comece Hoje e Transforme<br />a Experiência Dela
              </h2>

              <ul className="stitch-pricing-checklist">
                <li><CheckWhite /> Código do Toque — 23 movimentos completos</li>
                <li><CheckWhite /> Bônus: Sexo Tântrico para Iniciantes (R$ 59,90)</li>
                <li><CheckWhite /> Bônus: Guia dos 7 Sussurros (R$ 14,90)</li>
                <li><CheckWhite /> Bônus: Controle Absoluto (R$ 34,90)</li>
                <li className="stitch-pricing-checklist-muted"><CheckWhite /> Garantia incondicional de 30 dias</li>
              </ul>

              <div className="stitch-pricing-price-block">
                <p className="stitch-pricing-from">De R$ 181,00 por apenas:</p>
                <div className="stitch-pricing-amount">
                  <span className="stitch-pricing-value">R$ 24,90</span>
                  <span className="stitch-pricing-type">(Pagamento Único)</span>
                </div>
              </div>

              <button className="stitch-btn-pricing" onClick={goCheckout}>
                QUERO DESPERTAR O PODER DO TOQUE — R$ 24,90
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FAQ — Accordion
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-faq-section">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="stitch-section-title-dark reveal">Perguntas Frequentes</h2>

          <div className="stitch-faq-list">
            {faqs.map((faq, i) => (
              <details key={i} className="stitch-faq-item reveal">
                <summary>
                  {faq.q}
                  <ChevronIcon />
                </summary>
                <div className="stitch-faq-answer">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FINAL CTA
           ═══════════════════════════════════════════════════════════ */}
      <section className="stitch-final-cta">
        <div className="stitch-container stitch-container-narrow">
          <h2 className="reveal">Está Na Hora de Criar Momentos Inesquecíveis</h2>
          <p className="reveal">
            O Código do Toque vai te dar as ferramentas exatas para transformar a experiência dela e criar uma conexão que ela nunca vai esquecer.
          </p>
          <div className="reveal">
            <button className="stitch-btn-white" onClick={goCheckout}>
              SIM, QUERO O CÓDIGO DO TOQUE — R$ 24,90
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
           FOOTER
           ═══════════════════════════════════════════════════════════ */}
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
