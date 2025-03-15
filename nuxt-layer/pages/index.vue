<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import { POSTS_QUERY } from "@/utils/queries";
import Logo from "~/assets/icons/Logo.vue";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();

const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

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
                <div class="grid grid-cols-3 gap-5 w-full">
                    <nuxt-link
                        v-for="post in posts"
                        :key="post._id"
                        :to="`/${post.slug.current}`"
                        target="_blank">
                        <UCard
                            :ui="{
                                root: 'group h-[434px] relative overflow-hidden ',
                                body: '!p-0 duration-300 group-hover:translate-y-[-40px] overflow-hidden',
                                footer: 'absolute bottom-0 left-0 right-0 bg-[inherit] rounded-b-[inherit] flex gap-2',
                            }"
                            variant="solid">
                            <img
                                class="rounded-t-[calc(var(--ui-radius)*2)]"
                                :src="urlFor(post.image)?.url()"
                                :alt="post?.title" />
                            <div class="h-fit p-6">
                                <span class="font-mono opacity-60 text-xs">
                                    {{
                                        new Date(
                                            post.publishedAt
                                        ).toLocaleDateString(undefined, options)
                                    }}
                                </span>
                                <h2
                                    class="text-3xl tracking-tight line-clamp-2">
                                    {{ post.title }}
                                </h2>
                                <p class="text-gray-700 line-clamp-3">
                                    {{ post.body.children[0].text }}
                                </p>
                            </div>
                            <template #footer>
                                <div
                                    v-for="category in post.categories"
                                    :key="category"
                                    class="group-hover:bg-sky-100 border border-sky-200 px-2 py-1 rounded font-mono text-xs capitalize">
                                    {{ category }}
                                </div>
                            </template>
                        </UCard>
                    </nuxt-link>
                </div>
            </main>
        </UContainer>
    </UApp>
</template>
