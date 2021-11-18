<template>
    <div id="BacktrackDiv"> 
      <v-tooltip bottom>
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="$emit('click-back');">
         
         <v-icon x-large>mdi-history</v-icon>
        </v-btn>
        </template>
        <span>BACKTRACK</span>
        </v-tooltip>
    </div>
</template>
<script>

    export default {
    name : 'backComp',
    props : [ 'confV' ],
     created (){
    },
    filters: {
    
  }
}
</script>