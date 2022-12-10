<script setup>
        const {props} = defineProps({
        username: String,
        role: String,
    })
</script>

<template>
    <div class="w-4/5">
        <div class="text-5xl">{{username}}</div>
        <div>{{role}}</div>
    </div>
</template>