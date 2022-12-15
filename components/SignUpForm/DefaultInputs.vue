<template>
  <div>
    <p class="mb-1">Name</p>
    <div class="grid grid-cols-2 gap-x-4">
      <input
        type="text"
        id="fname"
        placeholder="First Name"
        required
        class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat"
      />
      <input
        type="text"
        id="lname"
        placeholder="Last Name"
        required
        class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat"
      />
    </div>
    <p class="mb-1">Email</p>
    <input
      type="text"
      id="email"
      placeholder="Your Email"
      required
      class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat"
    />
    <p class="mb-1">Password</p>
    <input
      type="password"
      placeholder="Your Password"
      required
      class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat"
    />
    <p class="mb-1">Confirm Password</p>
    <input
      type="password"
      placeholder="Confirm Password"
      required
      class="p-1 pl-2.5 mb-2.5 border border-solid border-light-grey rounded-md w-full placeholder:heading-montserrat"
    />
  </div>
</template>

<style scoped></style>
