<template>
    <client-only>
        <YouTube v-if="validUrl" :src="validUrl" :width="640" :height="360" />
        <p v-else>It was not possible to render the video.</p>
    </client-only>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
    url: string;
}>();

const validUrl = computed(() => {
    if (!props.url) return "";

    const match = props.url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    if (!match) {
        console.warn(
            "Computed: Unable to extract video ID from URL →",
            props.url
        );
        return "";
    }

    const videoId = match[1];

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return embedUrl;
});
</script>
