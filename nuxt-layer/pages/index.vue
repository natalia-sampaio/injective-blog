<script setup lang="ts">
import type {
    FOOTER_QUERYResult,
    HERO_QUERYResult,
    METADATA_QUERYResult,
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

const { data: metadata } = await useSanityQuery<METADATA_QUERYResult>(
    METADATA_QUERY
);

const today = computed(() => {
    return new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

const tabs = computed(() => [
    { label: "All Posts" },
    ...(tags.value?.map((tag) => ({ label: tag.title })) || []),
]);

const filteredPosts = (label: string | undefined) => {
    if (!posts.value) return [];
    if (label === "All Posts") return posts.value;
    return posts.value.filter((post) => post.tags?.includes(label)) || [];
};

const siteMetadata = {
    title: metadata?.value?.siteTitle,
    description: metadata.value?.siteDescription,
    image: metadata.value?.sitePreview,
    type: "website",
};

useSeo({ metadata: siteMetadata });
</script>

<template>
    <UApp>
        <div class="bg-[rgb(76,60,248)] dark:bg-[rgb(48,32,128)] text-white">
            <header>
                <NavMenu />
                <UContainer>
                    <div class="flex items-end justify-between pb-12 h-[512px]">
                        <h1
                            class="text-6xl md:text-[120px] mb-8 tracking-[-2px]">
                            {{ metadata?.siteTitle || "Injective blog" }}
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
                                    class="flex flex-col font-sans items-center justify-center text-gray-500 min-h-80">
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
