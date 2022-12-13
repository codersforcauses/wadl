<template>
  <div>
    <p>Name</p>
    <div class="grid grid-cols-2 gap-x-4">
      <input type="text" id="fname" placeholder="First Name" required />
      <input type="text" id="lname" placeholder="Last Name" required />
    </div>
    <p>Email</p>
    <input type="text" id="email" placeholder="Your Email" required />
    <p>Password</p>
    <input type="password" id="password" placeholder="Your Password" required />
    <p>Confirm Password</p>
    <input
      type="password"
      id="password"
      placeholder="Confirm Password"
      required
    />
  </div>
</template>

<style scoped>
p {
  margin-bottom: 4px;
}
input {
  padding: 4px;
  padding-left: 10px;
  border: solid 1px lightgray;
  border-radius: 6px;
  margin-bottom: 10px;
  width: 100%;
}
::placeholder {
  font-family: theme("fontFamily.brandon");
  letter-spacing: theme("letterSpacing.12");
}
</style>
