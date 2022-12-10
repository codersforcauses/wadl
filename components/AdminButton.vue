<script setup>
    const {props} = defineProps({
        title: String,
        link: String,
    })
</script>

<template>
    <div class="flex items-center justify-center">
        <NuxtLink
            :to=link
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="px-2 py-1 m-6 text-center text-black transition duration-300 ease-in-out shadow-md w-80 rounded-xl bg-gold hover:bg-teal-400 hover:shadow-lg focus:bg-teal-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg"
            >{{ title }}</NuxtLink
        >
    </div>
</template>

