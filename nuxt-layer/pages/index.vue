<script setup lang="ts">
import { POSTS_QUERY } from "@/utils/queries";
import Logo from "~/assets/icons/Logo.vue";
import type {
    HERO_QUERYResult,
    POSTS_QUERYResult,
    TAGS_QUERYResult,
} from "../../studio-layer/sanity.types";
import PostGridSection from "~/components/PostGridSection.vue";

const { data: posts } = await useSanityQuery<POSTS_QUERYResult>(POSTS_QUERY);

const { data: featuredPosts } = await useSanityQuery<HERO_QUERYResult>(
    HERO_QUERY
);

const { data: tags } = await useSanityQuery<TAGS_QUERYResult>(TAGS_QUERY);

const items = ref([
    [
        {
            slot: "logo",
            to: "https://injective.com/",
            target: "_blank",
        },
    ],
    [
        {
            label: "Build",
            icon: "i-lucide-wrench",
            to: "https://injective.com/build/",
            target: "_blank",
        },
        {
            label: "Use",
            icon: "i-lucide-sparkles",
            to: "https://injective.com/use/",
            target: "_blank",
        },
        {
            label: "Learn",
            icon: "i-lucide-library",
            to: "https://injective.com/learn/",
            target: "_blank",
        },
        {
            label: "Community",
            icon: "i-lucide-message-circle-more",
            to: "https://injective.com/community/",
            target: "_blank",
        },
    ],
]);

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

const today = new Date().toLocaleDateString(undefined, options);

const tabs = computed(() => [
    { label: "All Posts" },
    ...(tags.value?.map((tag) => ({ label: tag.title })) || []),
]);

const filteredPosts = (label: string | undefined) => {
    if (!posts.value) return []; // Prevent errors if posts are not yet loaded
    if (label === "All Posts") return posts.value; // Show all posts if "All Posts" is selected
    return posts.value.filter((post) => post.tags?.includes(label)) || []; // Ensure filtering works
};
</script>

<template>
    <UApp>
        <UContainer>
            <header>
                <UNavigationMenu :items="items" class="w-full justify-between">
                    <template #logo>
                        <Logo />
                    </template>
                </UNavigationMenu>
            </header>
            <main class="container mx-auto min-h-screen p-10">
                <section class="flex items-end justify-between pb-12">
                    <h1 class="text-6xl md:text-[120px] mb-8 tracking-[-2px]">
                        Injective Blog
                    </h1>
                    <span class="font-mono">{{ today }}</span>
                </section>
                <HeroSection :hero="featuredPosts" />
                <section>
                    <UTabs
                        :ui="{
                            label: 'font-sans text-sm font-normal',
                        }"
                        :items="tabs"
                        class="w-full pt-10 pb-7">
                        <template #content="{ item }">
                            <PostGridSection
                                v-if="filteredPosts(item.label).length"
                                :content="filteredPosts(item.label)" />
                            <p v-else class="text-gray-500 text-center">
                                No posts found for "{{ item.label }}"
                            </p>
                        </template>
                    </UTabs>
                </section>
            </main>
        </UContainer>
    </UApp>
</template>
