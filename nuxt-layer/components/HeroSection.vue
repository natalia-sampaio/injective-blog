<script setup lang="ts">
import type { HERO_QUERYResult } from "../../studio-layer/sanity.types";

defineProps<{
    hero: HERO_QUERYResult;
}>();
</script>
<template>
    <section v-if="hero?.featuredPosts?.length" class="grid grid-cols-12 gap-5">
        <nuxt-link
            v-if="hero.featuredPosts[0]"
            class="col-span-8"
            :to="hero.featuredPosts[0]?.slug">
            <UCard
                :ui="{
                    root: 'group relative overflow-hidden h-full',
                    body: '!p-0 duration-300 group-hover:translate-y-[-20px] overflow-hidden ',
                    footer: 'absolute bottom-0 left-0 right-0 bg-[inherit] rounded-b-[inherit] flex justify-between',
                }"
                variant="outline">
                <img
                    class="rounded-t-[calc(var(--ui-radius)*2)]"
                    :src="hero.featuredPosts[0]?.imageUrl"
                    :alt="hero.featuredPosts[0]?.title" />
                <div class="p-6 w-2/3">
                    <h2 class="text-3xl tracking-tight line-clamp-2">
                        {{ hero.featuredPosts[0].title }}
                    </h2>
                    <p
                        class="line-clamp-3 opacity-0 group-hover:opacity-50 duration-300">
                        {{ hero.featuredPosts[0].body.children[0].text }}
                    </p>
                </div>
                <template #footer>
                    <span class="font-mono opacity-60 text-xs">
                        {{
                            new Date(
                                hero.featuredPosts[0].publishedAt
                            ).toLocaleDateString(undefined, options)
                        }}
                    </span>
                    <PostTag
                        v-for="category in hero.featuredPosts[0].tags"
                        :key="category"
                        :tag-name="category" />
                </template>
            </UCard>
        </nuxt-link>

        <div class="col-span-4 flex flex-col gap-5">
            <nuxt-link
                v-for="post in hero.featuredPosts.slice(0, 3)"
                :key="post._id"
                :to="`/${post.slug?.current}`"
                class="group">
                <UCard
                    :ui="{
                        root: 'group',

                        footer: ' flex gap-2',
                    }"
                    variant="solid">
                    <span class="font-mono text-xs opacity-50">
                        {{
                            new Date(post.publishedAt).toLocaleDateString(
                                undefined,
                                options
                            )
                        }}
                    </span>
                    <h3 class="text-2xl line-clamp-3">
                        {{ post.title }}
                    </h3>
                    <template #footer>
                        <PostTag
                            v-for="category in post.tags"
                            :key="category"
                            :tag-name="category" />
                    </template>
                </UCard>
            </nuxt-link>
        </div>
    </section>
</template>
