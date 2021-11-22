<template>
  <v-app id="body">
    <v-app-bar 
    class="divheader" 
      color="#000080"
      dense
      >
        <p id="title" class="display-2 font-weight-bold mb-3 mt-4">JCOUIweb</p>
        <v-btn
          class="ma-2"
          text
          icon
          color="white"
          id="settings">
          <v-icon flex  class="mt-1" x-large color="white">mdi-cog-outline</v-icon>
        </v-btn>
      

      <v-spacer></v-spacer>

      
    </v-app-bar>

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
    background-color: navy;
  }
  #body{
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