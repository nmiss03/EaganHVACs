import { getArticle } from "@/lib/articles";
import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} — Homeowner Guide`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOgImage({
    title: article?.title ?? "HVAC Guides for Minnesota Homeowners",
    category: "Homeowner Guide",
  });
}
