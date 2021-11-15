<template>
  <v-app>
    <!--<v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="JCOUIweb logo"
          class="shrink mr-2"
          contain
          src="https://fakeimg.pl/900x900/?text=LOGO"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="JCOUIweb Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://fakeimg.pl/1000x400/?text=JCOUIweb"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      
    </v-app-bar>-->

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
