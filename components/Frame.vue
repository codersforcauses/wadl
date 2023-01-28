<template>
  <div class="bg-slate-200 rounded">
    <div class="flex flex-col justify-center items-center">
      <h1
        class="text-2xl text-center divide-y-4 font-montserrat font-semibold pt-6"
      >
        {{ title }}
      </h1>
      <p>{{ subtitle }}</p>
      <div class="flex justify-center items-center">
        <Button
          :button-text="buttonTexts[0]"
          :button-color="buttonColors[0]"
          :size="buttonSize"
          class="my-6 mx-2"
          @click="emit('button1Clicked')"
        />
        <Button
          v-if="buttonTexts.length > 1"
          :button-text="buttonTexts[1]"
          :button-color="buttonColors[1]"
          :size="buttonSize"
          class="my-6 mx-2"
          @click="emit('button2Clicked')"
        />
        <Button
          v-if="buttonTexts.length > 2"
          :button-text="buttonTexts[2]"
          :button-color="buttonColors[2]"
          :size="buttonSize"
          class="my-6 mx-2"
          @click="emit('button3Clicked')"
        />
      </div>
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
  buttonTexts: {
    type: Array,
    default: () => ["test", "test2", "test3"],
  },
  buttonColors: {
    type: Array,
    default: () => ["bg-gold", "bg-light-orange-gold", "bg-light-green"],
  },
  buttonSize: {
    type: String,
    default: "large",
  },
});

const emit = defineEmits([
  "button1Clicked",
  "button2Clicked",
  "button3Clicked",
]);
</script>
