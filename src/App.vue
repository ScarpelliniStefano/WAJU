<template>
  <v-app id="body">
  

    <v-main>
      <router-view/>
    </v-main>
   
  </v-app>
</template>

<script>
import {connect, isPreDone} from './components/index.vue';

export default {
  name: 'App',
 
  data: () => ({
    //
  }),
  
  created (){
    if(!isPreDone()){
      connect();
    }  
  }
};
</script>

<style scoped>
  #title{
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    color: white;
  }
  #settings{
    position: absolute;
    right: 0px;
    align-items:right;
    padding: 10px;
  }
  #body{
    background-color: white;
    min-width: 700px;
    min-height: 500px;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  #body .divheader{
    flex: 0 1 auto;
  }

  #body .divcontent{
    flex: 1 0 auto;
  }
  #third{
    position: relative;
  }
</style>