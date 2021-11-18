<template>
    <div id="ConfigDiv"> 
      <v-expand-transition>
        <div id="configGen" v-show="expand">
        <v-textarea
            filled
            name="input-7-4"
            rows="8"
            row-height="2"
            label="Config"
            v-model.lazy="confV"
            hint="Configurazione"
            id="ta_conf" placeholder="Configurazione" readonly>
        </v-textarea>
        
        <v-tooltip bottom>
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="$emit('add-conf');">
         
         <v-icon x-large>mdi-history</v-icon>
        </v-btn>
        </template>
        <span>INSERT CONFIGURATION</span>
        </v-tooltip>
        </div>
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
    data: function (){
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