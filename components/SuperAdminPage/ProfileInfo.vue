<script setup>
        const {props} = defineProps({
        username: String,
        role: String,
    })
</script>

<template>
    <div class="w-2/3">
        <div class="text-6xl">{{username}}</div>
        <div class="ml-8 text-xl">{{role}}</div>
        <hr class="w-full mt-8 mb-6 border-black border-solid">
    </div>

    <!-- <div class="flex justify-center"> -->
        
    <!-- </div> -->
</template>