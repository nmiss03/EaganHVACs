import Script from "next/script";

/**
 * Analytics loaders using next/script. Google Analytics 4 and Microsoft
 * Clarity are both active by default via the IDs below, and each can be
 * overridden per environment with NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID
 * (e.g. a separate staging property). Neither ID is a secret — both are
 * exposed in the browser by design — so hardcoding defaults is safe.
 */
const DEFAULT_GA_ID = "G-WBT4606L80";
const DEFAULT_CLARITY_ID = "xq6y1q9iec";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID ?? DEFAULT_CLARITY_ID;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
