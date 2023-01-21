<template>
  <div class="bg-slate-200 rounded">
    <div class="flex flex-col justify-center items-center">
      <h1
        class="text-2xl text-center divide-y-4 font-montserrat font-semibold pt-6"
      >
        {{ title }}
      </h1>
      <p>{{ subtitle }}</p>
      <Button
        :button-text="buttonText"
        button-color="bg-gold"
        :size="buttonSize"
        class="m-6"
        @click="emit('buttonClicked')"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  buttonSize: {
    type: String,
    default: "large",
  },
});

const emit = defineEmits(["buttonClicked"]);
</script>
