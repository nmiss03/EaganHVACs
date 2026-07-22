import { getLocation } from "@/lib/content";
import { site } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.name} — City Guide`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  return renderOgImage({
    title: location ? `HVAC in ${location.name}, MN` : "HVAC in the South Metro",
    category: "City Guide",
  });
}
