<template>
    <div class="flex justify-center">
        <NuxtLink
            to="/idkwhere"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            class="inline-block px-6 py-1 text-lg text-center text-black transition duration-300 ease-in-out bg-teal-300 shadow-md w-1/10 mt-7 rounded-3xl hover:bg-teal-400 hover:shadow-lg focus:bg-teal-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg"
            >{{ title }}</NuxtLink
        >
    </div>
</template>

<script>
    export default {
        name: 'StartButton',
        props: ['title'],
    };
</script>