<template>
  <div id="BacktrackDiv"> 
    <v-tooltip bottom>
      <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" v-on:click="$emit('click-back-index');">
          <v-icon x-large>mdi-history</v-icon>
        </v-btn>
      </template>
      <span>BACKTRACK</span>
    </v-tooltip>
  </div>
</template>
<script>

    export default {
    name : 'configDiv',
    data(){
       
    },
    props : [ 'confV' ],
     created (){
    },
    filters: {
    
  }
}
</script>