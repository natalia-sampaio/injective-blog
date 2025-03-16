<script setup lang="ts">
defineProps<{
    link: string | undefined;
    label: string | undefined;
}>();
</script>
<template>
    <ULink
        :to="link"
        target="_blank"
        raw
        class="inline-block hover:text-(--ui-text) hover:-translate-y-1 duration-200 transition-all">
        {{ label }}
    </ULink>
</template>
