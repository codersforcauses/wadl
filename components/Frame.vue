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
        <p class="text-mid-grey font-montserrat">
          {{ subtitle.toUpperCase() }}
        </p>
      </div>
      <div
        :class="
          isHorizontalButtons
            ? 'flex justify-center items-center'
            : 'flex flex-col justify-center items-center'
        "
      >
        <Button
          v-for="(buttonText, index) in buttonTexts"
          :key="buttonText"
          :button-text="buttonTexts[index]"
          :button-color="buttonColors[index]"
          :text-color="textColors[index]"
          :size="buttonSize"
          class="my-2 mx-2"
          @click="emit('buttonClicked', buttonText, subtitle)"
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

const emit = defineEmits("buttonClicked");
</script>
