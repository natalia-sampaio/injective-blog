<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
</script>

<template>
    <main class="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 class="text-4xl font-bold mb-8">Posts</h1>
        <ul class="flex flex-col gap-y-4">
            <li v-for="post in posts" :key="post._id" class="hover:underline">
                <nuxt-link :to="`/${post.slug.current}`">
                    <h2 class="text-xl font-semibold">{{ post.title }}</h2>
                    <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
                </nuxt-link>
            </li>
        </ul>
    </main>
</template>
