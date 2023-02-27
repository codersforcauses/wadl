<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

defineProps({
  dates: {
    type: Object,
    default: {},
  },
  handleEdit: {
    type: Function,
    default: () => {},
  },
});


</script>

<template>
  <div class="w-1/3">
    <div class="m-1 bg-lighter-grey rounded-md px-2">

      <!-- HEADER -->
      <div class="h-16 flex align-center items-center">
          <div
            class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
          > </div>
          <div class="w-1/2 flex justify-center align-text-middle">
            <h1
              class="h-min font-montserrat font-medium text-3xl text-mid-grey"
            >
              Round {{ dates.round }}
            </h1>
          </div>

          <div class="w-1/4 py-2 flex flex-col justify-center text-center items-center">
            <button>
              <PencilIcon class="w-6 h-6" @click="() => handleEdit()" />
            </button>
          </div>
      </div>
      <hr />
      <!-- END HEADER -->
      
      <div class="min-h-[200px]">
        <div>
          <div class="flex align-center items-center">
            <div
              class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
            >
              <h2 class="text-lg font-montserrat font-medium">{{ dates.weekOneTues }} </h2>
              <h2 class="text-sm font-medium text-gray-500">TUESDAY</h2>
            </div>
            <div class="w-1/2 flex justify-center align-text-middle">
              <h1
                class="h-min font-montserrat font-medium text-l text-gray-500"
              >
                WEEK 1
              </h1>
            </div>
            <div
              class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
            >
              <h2 class="text-lg font-montserrat font-medium">{{ dates.weekOneWed }} </h2>
              <h2 class="text-sm font-medium text-gray-500">WEDNESDAY</h2>
            </div>
          </div>
        </div>
        <div>
          <div class="flex align-center items-center">
            <div
              class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
            >
              <h2 class="text-lg font-montserrat font-medium"> {{ dates.weekTwoTues }} </h2>
              <h2 class="text-sm font-medium text-gray-500">TUESDAY</h2>
            </div>
            <div class="w-1/2 flex justify-center align-text-middle">
              <h1
                class="h-min font-montserrat font-medium text-l text-gray-500"
              >
                WEEK 2
              </h1>
            </div>
            <div
              class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
            >
              <h2 class="text-lg font-montserrat font-medium"> {{ dates.weekTwoWed }} </h2>
              <h2 class="text-sm font-medium text-gray-500">WEDNESDAY</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
