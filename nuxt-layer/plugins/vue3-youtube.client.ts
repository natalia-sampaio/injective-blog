import { defineNuxtPlugin } from "#app";
import Vue3YouTube from "vue3-youtube";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("YouTube", Vue3YouTube);
});
