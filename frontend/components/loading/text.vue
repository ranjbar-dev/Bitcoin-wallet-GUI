<template>
    <div class="loading-container">
        <LoadingSpinner />
        <span class="loading-text"> {{ props.text }} </span>
    </div>
</template>
<script setup>
const props = defineProps({
  text: String,
});
</script> 