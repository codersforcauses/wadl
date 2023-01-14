<template>
<div>
    <NuxtPage />
</div>
</template>

<script>
// This just applies admin middleware to all admin pages
definePageMeta({
  middleware: ["admin"],
});
</script>