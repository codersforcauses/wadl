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
    <div class="text-center bg-gold w-[550px] h-[600px] pt-2.5 pb-2.5 mt-24 border border-light-grey rounded-xl flex flex-col content-center m-auto flex-shrink-1">
      <h1 class="text-5xl mt-9 mb-10">Login</h1>
      <br>
      <form @submit.prevent="handleLogin">
        <label >
          Email
          <br>
          <input type="email" v-model="email" class="border border-light-grey rounded-md h-[50px] w-[450px] justify-self-center self-center" placeholder=" Your Email"/>
        </label>
        <br><br>
        <label>
          Password
          <br>
          <input type="password" v-model="password" class="border border-light-grey rounded-md h-[50px] w-[450px]" placeholder=" Your Password"/>
        </label>
        <br><br>
        <!-- <button type="submit" class="button">Submit</button> -->
        <Button class="mt-[60px] h-[60px] w-[200px] rounded-xl"
        button-text="Submit"
        button-color="bg-white" />
        <p v-if="error" class="red">{{ error }}</p>
        
      </form>
    </div>
</template>
  