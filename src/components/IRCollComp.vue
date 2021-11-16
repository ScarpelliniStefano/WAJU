<template>
    <div id="IRDiv"> 
         <v-tooltip bottom color="blue">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="irPressed=true; $emit('click-ir');">
         <v-icon x-large color="blue">mdi-file-find-outline</v-icon>
      </v-btn>
        </template>
        <span>INSPECT STATE</span>
         </v-tooltip>
         <v-tooltip bottom color="grey">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click="expand = !expand; $emit('click-tc');">
         <v-icon x-large color="grey">mdi-sitemap-outline</v-icon>
      </v-btn>
        </template>
        <span>SHOW TC</span>
         </v-tooltip>
         <template>
           <v-row>
             <v-col>
            <v-list dense width="300px">
              <v-subheader>IR LIST</v-subheader>
               <v-list-item-group
                v-model="selectedItem"
                color="primary"
                >
                  <v-list-item
                    v-for="item in irV"
                    :key="item"
                  >
                    <v-list-item-icon>
                        <v-icon>mdi-file-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  </v-list-item-group>
          </v-list>{{selectedItem}}
             </v-col><v-col>
                <v-tooltip bottom color="grey">
                  <template v-slot:activator="{on,attrs}">
                  <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click="expand = !expand; $emit('click-tc');">
                <v-icon x-large color="grey">mdi-sitemap-outline</v-icon>
                </v-btn>
                 </template>
                <span>SHOW SELECTED IR</span>
               </v-tooltip>
               
              </v-col>
           </v-row>
         </template>
         <template>
          <json-view :data="irTreeV"/>
         </template>
    </div>
</template>
<script>
import { JSONView } from "vue-json-component";

    export default {
    name : 'configDiv',
    components: { "json-view": JSONView },
    data: function (){
        return {
            expand: false,
            irPressed: false,
            selectedItem: -1,
        }
    },
     props : [ 'irV' , 'irTreeV'],
     created (){
    },
    filters: {
    
  }
}
</script>