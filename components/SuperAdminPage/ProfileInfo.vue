<script setup>
        const {props} = defineProps({
        username: String,
        role: String,
    })
</script>

<template>
    <div class="w-2/3">
        <div class="text-6xl">{{username}}</div>
        <div class="mt-3 ml-6 text-xl">{{role}}</div>
        <hr class="w-full mt-5 mb-5 border-black border-solid">
    </div>
</template>