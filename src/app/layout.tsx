import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Código do Toque — Por Que Alguns Homens São Inesquecíveis",
  description:
    "Descubra os princípios que despertam conexão, criam impacto emocional e fazem sua presença ser lembrada. Método desenvolvido por terapeuta tântrica com 6 anos de experiência.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased intro-loading`}
        style={{ background: "#0a0a0a", color: "#fff" }}
        suppressHydrationWarning
      >
        {/* ═══ FACEBOOK PIXEL — 900080772936894 ═══ */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '900080772936894');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ═══ UTMIFY ═══ */}
        <Script
          id="utmify-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var s = document.createElement('script');
              s.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
              s.async = true;
              s.defer = true;
              s.setAttribute('data-utmify-prevent-xcod-sck', '');
              s.setAttribute('data-utmify-prevent-subids', '');
              document.head.appendChild(s);
            })();`,
          }}
        />

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=900080772936894&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
