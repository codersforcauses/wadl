<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  icon: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <div class="flex items-center justify-self-center">
    <NuxtLink
      data-test="adminButton"
      :to="link"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      class="w-60 px-2 py-2 text-center text-black transition duration-200 ease-in-out shadow-md rounded-xl bg-gold hover:bg-light-gold hover:shadow-lg focus:bg-light-gold focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gold active:shadow-lg"
    >
      <div class="flex items-center justify-start">
        <component :is="icon" class="w-10 h-10 ml-2 mr-6" />
        {{ title }}
      </div>
    </NuxtLink>
  </div>
</template>
