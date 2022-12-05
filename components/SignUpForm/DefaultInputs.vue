<template>
  <div>
    <div class="w-full max-w-xs">
      <label for="name">Name</label>
    </div>
    <div class="flex flex-wrap">
      <div class="w-1/2 p-2 pl-0 pr-1">
        <input
          type="text"
          id="name"
          placeholder="First Name"
          class="border rounded w-full"
          required
        />
      </div>
      <div class="w-1/2 p-2 pl-1 pr-0">
        <input
          type="text"
          id="name"
          placeholder="Last Name"
          class="border rounded w-full"
          required
        />
      </div>
    </div>
  </div>
  <div>
    <div class="w-full max-w-xs">
      <label for="email">Email</label>
    </div>
    <div class="w-full py-2">
      <input
        type="text"
        id="email"
        placeholder="Your Email"
        class="w-full border rounded"
        required
      />
    </div>
  </div>
  <div>
    <div class="w-full max-w-xs">
      <label for="password">Password</label>
    </div>
    <div class="w-full py-2">
      <input
        type="password"
        id="password"
        placeholder="Your Password"
        class="w-full border rounded"
        required
      />
    </div>
  </div>
</template>

<script setup></script>
