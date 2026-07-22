import { getServiceDetail } from "@/lib/content";
import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} — Service Guide`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  return renderOgImage({
    title: service?.h1 ?? "HVAC Services in Eagan, MN",
    category: "Service Guide",
  });
}
