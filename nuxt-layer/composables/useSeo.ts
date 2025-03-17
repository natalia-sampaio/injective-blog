import type { MetaAttrs } from "@nuxtjs/i18n";

const baseUrl = "https://injective-blog.netlify.app";

const fallbacks = {
    title: "Injective Blog",
    description: "Stay updated with Injective.",
    image: `${baseUrl}/.netlify/functions/screenshots`,
    type: "website",
};

export function useSeo({
    metadata,
    url,
}: {
    metadata: MetaAttrs;
    url?: string;
}) {
    const title = metadata.title || fallbacks.title;

    const desc = metadata.description || fallbacks.description;

    const img =
        typeof metadata.image === "string" ? metadata.image : fallbacks.image;

    const type = metadata.type || fallbacks.type;

    const metaUrl = url ?? baseUrl;

    const imgType = img.endsWith(".png")
        ? "image/png"
        : img.endsWith(".gif")
        ? "image/gif"
        : "image/jpeg";

    useSeoMeta({
        title: title,
        description: desc,
        ogTitle: title,
        ogDescription: desc,
        ogImage: img,
        ogImageType: imgType,
        ogImageWidth: "1200",
        ogImageHeight: "630",
        ogUrl: metaUrl,
        ogType: type,
        twitterCard: "summary_large_image",
        twitterTitle: title,
        twitterDescription: desc,
        twitterImage: img,
        twitterImageAlt: title,
    });
}
