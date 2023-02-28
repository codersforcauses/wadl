<script setup>
import { XMarkIcon, PencilIcon } from "@heroicons/vue/24/solid";

defineProps({
  day: {
    type: String,
    default: "",
  },
  week: {
    type: Number,
    default: -1,
  },
  venues: {
    type: Array,
    default: () => [],
  },
  handleEdit: {
    type: Function,
    default: () => {},
  },
  handleDelete: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <div class="w-1/3">
    <div class="m-1 bg-lighter-grey rounded-md px-2">
      <!-- HEADER -->
      <div>
        <div class="flex align-center items-center">
          <div
            class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
          >
            <h2 class="text-lg font-montserrat font-medium">{{ week }}</h2>
            <h2 class="text-sm font-medium text-gray-500">WEEK</h2>
          </div>
          <div class="w-1/2 flex justify-center align-text-middle">
            <h1
              class="h-min font-montserrat font-medium text-3xl text-mid-grey"
            >
              {{ day }}
            </h1>
          </div>

          <div
            class="w-1/4 py-2 flex flex-col justify-center text-center items-center"
          >
            <button>
              <PencilIcon class="w-6 h-6" @click="handleEdit" />
            </button>
          </div>
        </div>
        <hr />
      </div>
      <!-- END HEADER -->

      <!-- content -->
      <div class="flex flex-col min-h-[200px]">
        <div
          v-for="venue in venues"
          :key="venue"
          class="grid grid-cols-4 items-center"
        >
          <p
            class="px-2 py-3 col-span-3 items-center align-middle justify-center"
          >
            {{ venue }}
          </p>
          <button class="flex justify-end items-center pr-5">
            <XMarkIcon class="w-5 h-5" @click="handleDelete(venue)" />
          </button>
        </div>
      </div>
      <!-- end content-->
    </div>
  </div>
</template>
