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
    <div class="login mx-auto">
      <h1>Login</h1>
      <br>
      <form @submit.prevent="handleLogin">
        <label>
          Email
          <br>
          <input type="email" v-model="email" class="input" placeholder=" Your Email"/>
        </label>
        <br><br>
        <label>
          Password
          <br>
          <input type="password" v-model="password" class="input" placeholder=" Your Password"/>
        </label>
        <br><br>
        <!-- <button type="submit" class="button">Submit</button> -->
        <Button
        button-text="Submit"
        button-color="bg-white" />
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
</template>
  


  
<style>
  
  h1 {
    font-size: 30px;
    font-weight: 200px;
  }
  .error {
    color: red;
  }
  
  
  
  .login {
  text-align: center;
  background-color: rgb(255, 215, 0);
  width: 40%;
  height: 150%;
  padding-top: 10%;
  padding-bottom: 10%;
  border-radius: 25px;
  border: 1px solid rgb(168, 168, 168);
  }
  
  .input{
    border: 1px solid rgb(168, 168, 168);
    border-radius: 5px;
    height: 30px;
    width:50%
    
  }
  
  .button {
    padding-left: 35px;
    padding-block: 7px;
    padding-right: 35px;
    border: 1px solid rgb(168, 168, 168);
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,.3);
        
  }
</style>