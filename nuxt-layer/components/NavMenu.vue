<script setup lang="ts">
import Logo from "~/assets/icons/Logo.vue";

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
        {
            slot: "theme-switch",
        },
    ],
]);

const colorMode = useColorMode();
if (!colorMode.preference || colorMode.preference === "unknown") {
    colorMode.preference = "system";
}
const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});
</script>
<template>
    <UNavigationMenu
        :ui="{
            linkLabelExternalIcon: 'text-white',
            link: 'text-white font-sans font-normal',
            linkLeadingIcon: 'text-white',
        }"
        :items="items"
        class="w-full justify-between">
        <template #logo>
            <Logo />
        </template>
        <template #theme-switch>
            <ClientOnly v-if="!colorMode?.forced">
                <USwitch
                    unchecked-icon="i-lucide-sun"
                    checked-icon="i-lucide-moon"
                    color="neutral"
                    size="xl"
                    v-model="isDark" />
                <template #fallback>
                    <div class="size-8" />
                </template>
            </ClientOnly>
        </template>
    </UNavigationMenu>
</template>
