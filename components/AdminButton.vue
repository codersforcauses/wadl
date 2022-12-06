<script setup>
//     const props = defineProps({
//         title: {
//             type: String,
//             default: "You forgot",
//         },
//         link:{
//             type: String,
//             default: "/idkwhere",
//         }
// })

const {title} = defineProps(["title"])
</script>

<template>
    <div class="flex justify-center">
        <NuxtLink
            to="/"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="inline-block px-10 py-1 text-lg text-center text-black transition duration-300 ease-in-out bg-teal-300 shadow-md text-xlg w-1/10 mt-7 rounded-3xl hover:bg-teal-400 hover:shadow-lg focus:bg-teal-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg"
            >{{ title }}</NuxtLink
        >
    </div>
</template>

