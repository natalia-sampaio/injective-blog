<script setup lang="ts">
import Logo from "~/assets/icons/Logo.vue";
import type { FOOTER_QUERYResult } from "../../studio-layer/sanity.types";
import FooterLink from "./FooterLink.vue";

defineProps<{
    content: FOOTER_QUERYResult;
}>();
</script>
<template>
    <footer
        class="p-4 pt-10 md:pt-16 bg-sky-100 dark:bg-(--ui-bg) text-(--ui-text-dimmed)">
        <UContainer>
            <Logo class="text-(--ui-text)" />
            <div class="w-full flex gap-4 my-20">
                <div
                    v-for="group in content?.linkGroups"
                    :key="group._key"
                    class="flex flex-col gap-3">
                    <p class="font-sans text-(--ui-text)">
                        {{ group.title }}
                    </p>
                    <ul>
                        <li v-for="link in group.links" :key="link._key">
                            <FooterLink :link="link.url" :label="link.label" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex gap-8">
                <p>{{ content?.copyright }}</p>
                <FooterLink :link="content?.privacy" label="Privacy Policy" />
                <FooterLink :link="content?.terms" label="Terms of Use" />
            </div>
        </UContainer>
    </footer>
</template>
