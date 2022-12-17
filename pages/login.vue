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
  <div class="flex justify-center h-screen w-screen">
    <div class=" bg-gold border w-3/12 h-3/4 border-light-grey rounded-xl  my-auto p-10">
      <h1 class="text-5xl mt-9 mb-10 text-center">Login</h1>
      <br>
      <form @submit.prevent="handleLogin" class="flex-col">
        <!-- <input type="email" v-model="email" class="border border-light-grey rounded-md h-[50px] w-[450px] justify-self-center self-center" placeholder=" Your Email"/> -->
       <FormField label="Email" placeholder="Your Email"/>
       <FormField label="Password" placeholder="Your Password"/>
       <div class="mt-20 text-center">
        <Button class
        button-text="Submit"
        button-color="bg-white" 
        size = "large"/>
        <NuxtLink to="/"> <p class="underline mt-16">Forgot my password</p> </NuxtLink>
       </div>
       
      </form>
    </div>
    </div>
</template>
  