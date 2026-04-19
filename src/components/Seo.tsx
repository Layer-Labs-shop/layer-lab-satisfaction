import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
}

export function Seo({ title, description, image }: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
