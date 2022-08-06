import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="application-name" content="BeeReign" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BeeReign" />
        <meta
          name="description"
          content="Open source beekeeping inventory management App"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-167x167.png" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
