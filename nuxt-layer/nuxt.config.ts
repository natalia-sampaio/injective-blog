// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    modules: ["@nuxtjs/sanity", "@nuxt/ui"],
    css: ["~/assets/css/main.css"],
    sanity: {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
        visualEditing: {
            token: process.env.SANITY_VIEWER_TOKEN,
            studioUrl: process.env.SANITY_STUDIO_URL,
            stega: true,
        },
    },
});
