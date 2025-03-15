<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import { POSTS_QUERY } from "@/utils/queries";
import Logo from "~/assets/icons/Logo.vue";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
const { data: homePage } = await useSanityQuery<SanityDocument>(
    HOME_PAGE_QUERY
);

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

const tabs = ref([
    {
        label: "Account",
        icon: "i-lucide-user",
        content: "This is the account content.",
    },
    {
        label: "Password",
        icon: "i-lucide-lock",
        content: "This is the password content.",
    },
]);
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
                <section class="grid grid-cols-12 gap-5">
                    <nuxt-link
                        :to="`/${homePage?.featuredPosts[0].slug.current}`"
                        class="col-span-8">
                        <UCard
                            :ui="{
                                root: 'group relative overflow-hidden h-full',
                                body: '!p-0 duration-300 group-hover:translate-y-[-20px] overflow-hidden ',
                                footer: 'absolute bottom-0 left-0 right-0 bg-[inherit] rounded-b-[inherit] flex justify-between',
                            }"
                            variant="outline">
                            <img
                                class="rounded-t-[calc(var(--ui-radius)*2)]"
                                :src="
                                    urlFor(
                                        homePage?.featuredPosts[0].image
                                    )?.url()
                                "
                                :alt="homePage?.featuredPosts[0]?.title" />
                            <div class="p-6 w-2/3">
                                <h2
                                    class="text-3xl tracking-tight line-clamp-2">
                                    {{ homePage?.featuredPosts[0].title }}
                                </h2>
                                <p
                                    class="text-gray-700 line-clamp-3 opacity-0 group-hover:opacity-50 duration-300">
                                    {{
                                        homePage?.featuredPosts[0].body
                                            .children[0].text
                                    }}
                                </p>
                            </div>
                            <template #footer>
                                <span class="font-mono opacity-60 text-xs">
                                    {{
                                        new Date(
                                            homePage?.featuredPosts[0].publishedAt
                                        ).toLocaleDateString(undefined, options)
                                    }}
                                </span>
                                <div
                                    v-for="category in homePage
                                        ?.featuredPosts[0].categories"
                                    :key="category"
                                    class="group-hover:bg-sky-100 border border-sky-200 px-2 py-1 rounded font-mono text-xs capitalize ml-2">
                                    {{ category }}
                                </div>
                            </template>
                        </UCard>
                    </nuxt-link>
                    <div class="col-span-4 flex flex-col gap-5">
                        <nuxt-link
                            v-for="post in homePage.featuredPosts.slice(0, 3)"
                            :key="post._id"
                            :to="`/${post.slug.current}`"
                            class="group">
                            <UCard
                                :ui="{
                                    root: 'group bg-sky-100  hover:bg-orange-100 text-(--ui-bg-inverted) dark:text-(--ui-bg)',
                                    footer: ' flex gap-2',
                                }"
                                variant="solid">
                                <span
                                    class="font-mono text-xs group-hover:text-orange-950 opacity-50">
                                    {{
                                        new Date(
                                            post.publishedAt
                                        ).toLocaleDateString(undefined, options)
                                    }}
                                </span>
                                <h3
                                    class="text-2xl group-hover:text-orange-950 line-clamp-3">
                                    {{ post.title }}
                                </h3>
                                <template #footer>
                                    <div
                                        v-for="category in post.categories"
                                        :key="category"
                                        class="group-hover:bg-orange-950 group-hover:border-orange-950 group-hover:text-white border border-sky-200 px-2 py-1 rounded font-mono text-xs capitalize w-fit">
                                        {{ category }}
                                    </div>
                                </template>
                            </UCard>
                        </nuxt-link>
                    </div>
                </section>
                <section>
                    <UTabs :items="tabs" class="w-full px-9 pt-10 pb-7" />
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
                                variant="outline">
                                <img
                                    class="rounded-t-[calc(var(--ui-radius)*2)]"
                                    :src="urlFor(post.image)?.url()"
                                    :alt="post?.title" />
                                <div class="h-fit p-6">
                                    <span class="font-mono opacity-60 text-xs">
                                        {{
                                            new Date(
                                                post.publishedAt
                                            ).toLocaleDateString(
                                                undefined,
                                                options
                                            )
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
                </section>
            </main>
        </UContainer>
    </UApp>
</template>
