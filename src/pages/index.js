import React from 'react';
import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';

export default function Home() {
  const {i18n, siteConfig} = useDocusaurusContext();
  
  const isItalian = i18n.currentLocale === 'it';
  
  const redirectTarget = isItalian ? '/it/docs/featured/veil' : '/docs/featured/veil';

  const seoTitle = 'UX Engineer Log | Simone Amico';
  const seoDescription = isItalian 
    ? 'Esplora appunti di studio, concetti interattivi e progetti di transizione da operaio in fabbrica a UX Engineer (HTML, CSS, JavaScript, React).' 
    : 'Explore study notes, interactive concepts, and projects detailing the transition from food factory worker to UX Engineer (HTML, CSS, JavaScript, React).';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="noindex, follow" /> 
      </Head>

      <Redirect to={redirectTarget} />
    </>
  );
}