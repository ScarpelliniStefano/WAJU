<template>
    <div id="ConfigDiv"> 
      <v-expand-transition>
        <v-textarea
            v-show="expand"
            filled
            name="input-7-4"
            rows="8"
            row-height="2"
            label="Config"
            v-model.lazy="confV"
            hint="Configurazione"
            id="ta_conf" placeholder="Configurazione" readonly>
        </v-textarea>
      </v-expand-transition>
         <v-tooltip bottom color="blue">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="expand = !expand">
         <v-icon x-large color="blue">mdi-wrench-outline</v-icon>
      </v-btn>
        </template>
        <span>CONFIGURATION</span>
         </v-tooltip>

     
        
    </div>
</template>
<script>

    export default {
    name : 'configDiv',
    data(){
        return {
            expand: false
        }
    },
    props : [ 'confV' ],
     created (){
    },
    filters: {
    
  }
}
</script>