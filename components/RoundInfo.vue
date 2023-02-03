<template>
<div class="max-h-96 overflow-scroll overflow-x-hidden rounded-xl shadow-lg bg-slate-200 items-center">
    <div class="sticky top-0 grid grid-cols-3 bg-slate-200">
        <!-- head -->
        <div class="py-6">
            <div class="flex flex-col  items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    1
                </h1>
                <p class="font-montserrat">WEEK</p>
            </div>
        </div>
        <div class="py-6">
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    14/03
                </h1>
                <p class="font-montserrat">TUESDAY</p>
            </div>
        </div>
        <div class="py-6">
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    15/03
                </h1>
                <p class="font-montserrat">WEDNESDAY</p>
            </div>
        </div>
        <hr class="h-px mx-8 bg-mid-grey border-0 col-span-3">
        <!-- subhead -->
        <div class="ml-6 pt-5 pb-5 font-montserrat font-semibold text-mid-grey text-left text-lg">
            VENUES
        </div>

    </div>
    <!-- table -->
    <table class="w-11/12 m-auto">
        <tbody>
            <tr v-for="(row, index) in venue" :key="index"
                class="even:bg-slate-200 odd:bg-white hover:bg-light-yellow transition duration-150 ease-in-out font-montserrat">
                <td class="p-2" v-for="(object, ind) in headersVenues" :key="ind">
                    {{ row[object.key] }}
                </td>
                <td class="text-right p-2">
                    <button @click="() => {
                        print('Delete Row');
                    }">
                        <XMarkIcon class="w-4 h-4" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
defineProps({
    headersVenues: {
        type: Object,
        default: () => { },
    },
    venue: {
        type: Object,
        default: () => { },
    },
    
});
</script>