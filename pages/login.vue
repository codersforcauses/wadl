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
        <button type="submit" class="button">Submit</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
       tryLogin() {
        try {
          //idk
        } catch (err) {
          this.error = 'Incorrect username or password.'
        }
      }
    }
  }
  
  
  
</script>


  
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
  width: 60%;
  height:100%;
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
    margin-right: 100px;
    padding-left: 35px;
    padding-block: 7px;
    padding-right: 35px;
    border: 1px solid rgb(168, 168, 168);
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 3px 3px 1px rgba(0,0,0,.3);
        
  }
</style>