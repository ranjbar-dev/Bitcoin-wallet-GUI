<template>
    <slot />
</template>
<script setup>
useHead({
    bodyAttrs: {
        class: {
            "theme-dark": true,
        }
    }
})
</script>