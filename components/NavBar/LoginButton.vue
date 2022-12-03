<template>
  <NuxtLink to="/">
    <button class="text-3xl"> {{ buttonText }} </button>
  </NuxtLink>
</template>

<script>

export default {
    props: {
        buttonText: {
            type: String,
            default: () => "LoginButton",
        },
    },
};
</script>
