<template>
<div class="h-96 rounded-xl shadow-lg bg-slate-200 items-center">
    <!-- head -->
    <div class="grid grid-cols-4 rounded-xl p-5">
        <div class="m-auto">
            <div class="flex flex-col items-center"></div>
        </div>
        <div class="m-auto col-span-2">
            <h1 class="font-montserrat text-3xl font-semibold">ROUND 1</h1>
        </div>
        <div class="m-auto items-center">
            <button @click="
                () => {
                    console.log('Edit Round Date');
                }
            ">
                <PencilIcon class="w-10 h-10" />
            </button>
        </div>
        <hr class="h-px my-3 bg-mid-grey border-0 col-span-4" />
    </div>
    <!-- week table -->
    <div class="grid grid-cols-3 gap-4 px-10">
        <div>
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    15/03
                </h1>
                <p class="font-montserrat">TUESDAY</p>
            </div>
        </div>
        <div class="m-auto">
            <h1 class="font-montserrat">WEEK 1</h1>
        </div>
        <div>
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    17/03
                </h1>
                <p class="font-montserrat">WEDNESDAY</p>
            </div>
        </div>
        <div>
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    15/03
                </h1>
                <p class="font-montserrat">TUESDAY</p>
            </div>
        </div>
        <div class="m-auto">
            <h1 class="font-montserrat">WEEK 2</h1>
        </div>
        <div>
            <div class="flex flex-col items-center">
                <h1 class="text-center font-montserrat font-semibold text-3xl">
                    17/03
                </h1>
                <p class="font-montserrat">WEDNESDAY</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>

</script>