<script setup lang="ts">
defineProps<{
    tagName: string;
}>();
</script>
<template>
    <UChip
        :ui="{
            base: 'px-2 py-3 font-mono rounded ring-0 group-hover:bg-(--ui-secondary)',
        }"
        :text="tagName"
        size="3xl"
        standalone
        inset />
</template>
