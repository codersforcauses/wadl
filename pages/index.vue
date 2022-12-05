<template>
  
  <div id="logo">
    <img src="../assets/logos/TransparentLongLogo.png">
  </div>
  <div class="level">
    <LevelButtons />
  </div>
</template>

<script setup>
  import LevelButtons from '~~/components/HomePage/LevelButtons.vue';
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  input[type=button]{
    display: block;
    background-color: #000000;
    color: #FFFFFF;
    padding: 20px 26px;
    max-width: 320px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1%;
    font-family: 'Montserrat';
    justify-content: center;		
  }

  img {
  margin: auto;
  display: block;
  }

</style>