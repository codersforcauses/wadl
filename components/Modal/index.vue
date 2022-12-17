<template>
    <div class="bg-slate-400 bg-opacity-30 flex justify-center items-center fixed top-0 z-50 left-0 w-full h-full">
        <div class="bg-white min-w-[50%] min-h-[50%] rounded-xl">
        <header class="flex justify-end items-center pt-2 pr-2 pb-2 bg-gold overflow-hidden">
            <XMarkIcon class="h-6 w-6 cursor-pointer" @click="closeModal" />
        </header>
        <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
            Add Institution
        </p>
        <form class="px-10">
            <FormField label="Institution Name" />
            <FormField label="Code" />
            <FormField label="Abbreviation" />
        </form>
        <div class="justify-center">
            <Button button-text="Submit" button-color="bg-gold" />
        </div>
        
        </div>
    </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
const closeModal = () => {
    this.$emit('Close');
};
</script>
 s