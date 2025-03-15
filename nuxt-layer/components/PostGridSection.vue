<script setup lang="ts">
import type { POSTS_QUERYResult } from "../../studio-layer/sanity.types";

defineProps<{
    content: POSTS_QUERYResult | null;
}>();

const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
};
</script>
<template>
    <div class="grid grid-cols-3 gap-5 w-full">
        <nuxt-link
            v-for="post in content"
            :key="post._id"
            :to="`/${post.slug?.current}`"
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
                    :src="post.imageUrl"
                    :alt="post.title" />
                <div class="h-fit p-6">
                    <span class="font-mono opacity-60 text-xs">
                        {{
                            new Date(post.publishedAt).toLocaleDateString(
                                undefined,
                                options
                            )
                        }}
                    </span>
                    <h2 class="text-3xl tracking-tight line-clamp-2">
                        {{ post.title }}
                    </h2>
                    <p class="text-gray-700 line-clamp-3">
                        {{ post.body.children[0].text }}
                    </p>
                </div>
                <template #footer>
                    <div
                        v-for="category in post.tags"
                        :key="category"
                        class="group-hover:bg-sky-100 border border-sky-200 px-2 py-1 rounded font-mono text-xs capitalize">
                        {{ category }}
                    </div>
                </template>
            </UCard>
        </nuxt-link>
    </div>
</template>
