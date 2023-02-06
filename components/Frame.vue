<template>
  <div class="bg-lighter-grey rounded-md py-6 px-2">
    <div
      :class="
        isHorizontalButtons
          ? 'flex flex-col justify-center items-center'
          : 'grid grid-cols-2 justify-center'
      "
    >
      <div
        :class="
          isHorizontalButtons ? '' : 'flex flex-col justify-center items-center'
        "
      >
        <h1
          :class="isHorizontalButtons ? 'text-2xl' : 'text-4xl'"
          class="text-center divide-y-4 font-montserrat font-semibold"
        >
          {{ title }}
        </h1>
        <p>{{ subtitle }}</p>
      </div>
      <div
        :class="
          isHorizontalButtons
            ? 'flex justify-center items-center'
            : 'flex flex-col justify-center items-center'
        "
      >
        <Button
          :button-text="buttonTexts[0]"
          :button-color="buttonColors[0]"
          :text-color="textColors[0]"
          :size="buttonSize"
          class="my-2 mx-2"
          @click="emit('button1Clicked')"
        />
        <Button
          v-if="buttonTexts.length > 1"
          :button-text="buttonTexts[1]"
          :button-color="buttonColors[1]"
          :text-color="textColors[1]"
          :size="buttonSize"
          class="my-2 mx-2"
          @click="emit('button2Clicked')"
        />
        <Button
          v-if="buttonTexts.length > 2"
          :button-text="buttonTexts[2]"
          :button-color="buttonColors[2]"
          :text-color="textColors[2]"
          :size="buttonSize"
          class="my-2 mx-2"
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
    default: () => ["Teams", "Division", "Draw"],
  },
  buttonColors: {
    type: Array,
    default: () => ["bg-gold", "bg-light-orange-gold", "bg-light-green"],
  },
  textColors: {
    type: Array,
    default: () => ["text-black", "text-black", "text-white"],
  },
  buttonSize: {
    type: String,
    default: "large",
  },
  isHorizontalButtons: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  "button1Clicked",
  "button2Clicked",
  "button3Clicked",
]);
</script>
