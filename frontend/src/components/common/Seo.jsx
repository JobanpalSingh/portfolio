import { Helmet } from 'react-helmet-async';

export default function Seo({
  title = 'Daniel Gallego — Portfolio',
  description = 'Full-stack developer portfolio — projects, services, and contact.',
  path = '/',
}) {
  const site = 'https://danielgallego.dev';
  const url = `${site}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
