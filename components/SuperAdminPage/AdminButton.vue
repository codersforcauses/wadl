<script setup>
    const {props} = defineProps({
        title: String,
        link: String,
    })
</script>

<template>
    <div class="flex items-center justify-self-center">
        <NuxtLink
            :to=link
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="w-64 px-2 py-2 m-5 text-center text-black transition duration-300 ease-in-out shadow-md rounded-xl bg-gold hover:bg-teal-400 hover:shadow-lg focus:bg-teal-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg"
            >{{ title }}</NuxtLink
        >
        <font-awesome-icon icon="fa-solid fa-trophy" />
    </div>
</template>

