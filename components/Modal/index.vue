<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-content">
        <slot />
        <button type="button" class="btn-close" @click="handleClose">X</button>
      </div>
    </div>
  </div>
</template>
