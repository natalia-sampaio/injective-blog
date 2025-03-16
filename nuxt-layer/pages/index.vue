<script setup lang="ts">
import Logo from "~/assets/icons/Logo.vue";
import type {
    FOOTER_QUERYResult,
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

const { data: footer } = await useSanityQuery<FOOTER_QUERYResult>(FOOTER_QUERY);

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
        {
            slot: "theme-switch",
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
    if (!posts.value) return [];
    if (label === "All Posts") return posts.value;
    return posts.value.filter((post) => post.tags?.includes(label)) || [];
};

const colorMode = useColorMode();
if (!colorMode.preference || colorMode.preference === "unknown") {
    colorMode.preference = "system";
}
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>

<template>
    <UApp>
        <div class="bg-[rgb(76,60,248)] dark:bg-[rgb(48,32,128)] text-white">
            <header>
                <UContainer>
                    <UNavigationMenu
                        :ui="{
                            linkLabelExternalIcon: 'text-white',
                            link: 'text-white font-sans font-normal',
                            linkLeadingIcon: 'text-white',
                        }"
                        :items="items"
                        class="w-full justify-between">
                        <template #logo>
                            <Logo />
                        </template>
                        <template #theme-switch>
                            <ClientOnly v-if="!colorMode?.forced">
                                <USwitch
                                    unchecked-icon="i-lucide-sun"
                                    checked-icon="i-lucide-moon"
                                    color="neutral"
                                    size="xl"
                                    v-model="isDark" />
                                <template #fallback>
                                    <div class="size-8" />
                                </template>
                            </ClientOnly>
                        </template>
                    </UNavigationMenu>
                    <div class="flex items-end justify-between pb-12 h-[512px]">
                        <h1
                            class="text-6xl md:text-[120px] mb-8 tracking-[-2px]">
                            Injective Blog
                        </h1>
                        <span class="font-mono">{{ today }}</span>
                    </div>
                </UContainer>
            </header>
            <main
                class="rounded-t-4xl pt-18 bg-(--ui-bg) text-(--ui-bg-inverted)">
                <UContainer>
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
                                <div
                                    v-else
                                    class="flex flex-col font-sans items-center text-gray-500">
                                    <span class="text-xl"
                                        >😕 No posts found for "{{
                                            item.label
                                        }}"</span
                                    >
                                    <p class="text-sm">
                                        Check back later or try a different
                                        category.
                                    </p>
                                </div>
                            </template>
                        </UTabs>
                    </section>
                </UContainer>
            </main>
            <Footer :content="footer" />
        </div>
    </UApp>
</template>
