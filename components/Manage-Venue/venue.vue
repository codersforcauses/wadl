<template>
    {{venue.venue}}
</template>

<script setup>
    defineProps({
    venue: {
        type: Object,
        default: {},
    },
    });
</script>