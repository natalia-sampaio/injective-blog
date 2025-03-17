<script setup lang="ts">
import { POST_QUERY } from "@/utils/queries";
import type { POST_QUERYResult } from "../../studio-layer/sanity.types";
import YouTube from "vue3-youtube";

const { params } = useRoute();

const { data: post } = await useSanityQuery<POST_QUERYResult>(
    POST_QUERY,
    params
);

const serializers = {
    types: {
        youTube: (props: any) => {
            const url = props?.url || "";
            if (!url) {
                console.warn("YouTube block is missing a URL:", props);
                return null;
            }
            return h(YouTube, { src: url });
        },
        image: (props: any) => {
            if (!props?.url) {
                console.warn("Image block is missing a URL:", props);
                return null;
            }
            return h("img", {
                src: props.url,
                alt: props?.alt || "Embedded image",
            });
        },
    },
};
</script>

<template>
    <main
        v-if="post"
        class="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
        <a href="/" class="hover:underline">&larr; Back to posts</a>
        <img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :alt="post?.title"
            class="aspect-video rounded-xl"
            width="550"
            height="310" />
        <h1 v-if="post.title" class="text-4xl font-bold mb-8">
            {{ post.title }}
        </h1>
        <div class="prose dark:prose-invert">
            <p v-if="post.publishedAt">
                Published: {{ new Date(post.publishedAt).toLocaleDateString() }}
            </p>

            <SanityContent
                v-if="post.body"
                :blocks="post.body"
                :serializers="serializers" />
        </div>
    </main>
</template>
