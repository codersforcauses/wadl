<!-- 
setup attribute added to script
states ahndled with ref from vue
dummy console log added to check login button functionality -->

<!-- 
Make the page responsive to resolution /screen size / window changes
NuxtLink
Decide on the logic of the login page -->

<!-- 
Work to be done in script 
Include the the login error into the compositon style API -->

<script setup>
  import { ref } from "vue"

    const email = ref('')
    const password = ref('')
    const errror = ref('')

    function handleLogin(){
      console.log("hELLO");
    }

  // export default {
  //   data() {
  //     return {
  //       email: '',
  //       password: '',
  //       error: ''
  //     }
  //   },
  //   methods: {
  //      tryLogin() {
  //       try {
  //         //idk
  //       } catch (err) {
  //         this.error = 'Incorrect username or password.'
  //       }
  //     }
  //   }
  // }
</script>


<template>
    <div class="text-center bg-gold w-2/5 h-96 pt-2.5 pb-2.5 border border-light-grey rounded-md flex flex-col justify-center content-center m-auto flex-auto justify-self-center">
      <h1 class="text-5xl">Login</h1>
      <br>
      <form @submit.prevent="handleLogin">
        <label>
          Email
          <br>
          <input type="email" v-model="email" class="border border-light-grey rounded-md h-8 w-1/2" placeholder=" Your Email"/>
        </label>
        <br><br>
        <label>
          Password
          <br>
          <input type="password" v-model="password" class="border border-light-grey rounded-md h-8 w-1/2" placeholder=" Your Password"/>
        </label>
        <br><br>
        <!-- <button type="submit" class="button">Submit</button> -->
        <Button
        button-text="Submit"
        button-color="bg-white" />
        <p v-if="error" class="red">{{ error }}</p>
      </form>
    </div>
</template>
  