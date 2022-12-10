<script setup>
        const {props} = defineProps({
        username: String,
        role: String,
    })
</script>

<template>
    <div>
        <div>{{username}}</div>
        <div>{{role}}</div>
    </div>
</template>