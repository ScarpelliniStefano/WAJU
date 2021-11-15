<template>
    <div id="IRDiv"> 
         <v-tooltip bottom color="blue">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="$emit('click-ir');">
         <v-icon x-large color="blue">mdi-wrench-outline</v-icon>
      </v-btn>
        </template>
        <span>CONFIGURATION</span>
         </v-tooltip>
      <json-view v-show="expand" :data="irTempcolV"/>
     
        
    </div>
</template>
<script>

    export default {
    name : 'configDiv',
    data(){
        return {
            expand: false,

        }
    },
     props : [ 'irTempcolV' ],
     created (){
    },
    filters: {
    
  }
}
</script>