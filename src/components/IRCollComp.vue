<template>
    <div id="IRDiv"> 
      <div id="btnIRState">
         <v-tooltip bottom color="blue">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab v-bind="attrs" v-on="on" @click="irPressed=true; $emit('click-ir');">
         <v-icon x-large color="blue">mdi-file-find-outline</v-icon>
      </v-btn>
        </template>
        <span>INSPECT STATE</span>
         </v-tooltip>
      </div>
      
         <template>
           
           <v-row dense>
             <div id="List">
             <v-col>
            <v-list dense width="210px">
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
          </v-list>
             </v-col></div><div id="btnGeneral"><v-col>
         <v-tooltip bottom color="grey">
        <template v-slot:activator="{on,attrs}">
        <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click="expand = !expand; $emit('click-tc');">
         <v-icon x-large color="grey">mdi-sitemap-outline</v-icon>
        </v-btn>
        </template>
        <span>SHOW TC</span>
         </v-tooltip>
                <v-tooltip bottom color="grey">
                  <template v-slot:activator="{on,attrs}">
                  <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click="expand = !expand; $emit('click-irc',selectedItem);">
                <v-icon x-large color="grey">mdi-sitemap-outline</v-icon>
                </v-btn>
                 </template>
                <span>SHOW SELECTED IR</span>
               </v-tooltip>
               
              </v-col>
              </div>
           </v-row>
         </template>
         <template v-if="isDisable">
           <div id="treeView">
             <v-row><v-col>
            <json-view rootKey="documents" align="left" :key="numDepth" :max-depth=numDepth :data="irTreeV"/>
             </v-col><v-col>
             <div id="treeViewBtn" align="left">
             <v-tooltip bottom color="grey">
                  <template v-slot:activator="{on,attrs}">
                  <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click="download('TreeColl',irTreeV);">
                <v-icon x-large color="grey">mdi-content-save-outline</v-icon>
                </v-btn>
                 </template>
                <span>SAVE</span>
               </v-tooltip>
               <v-tooltip bottom color="grey">
                  <template v-slot:activator="{on,attrs}">
                  <v-btn fab :disabled=(!irPressed) v-bind="attrs" v-on="on" @click=setDepth()>
                <v-icon x-large color="grey">mdi-circle-expand</v-icon>
                </v-btn>
                 </template>
                <span>EXPAND</span>
               </v-tooltip>
               </div>
               </v-col>
               </v-row>
           </div>
         </template>
    </div>
</template>
<script>
import { JSONView } from "vue-json-component";

    export default {
    name : 'IRComp',
    components: { "json-view": JSONView },
    data: function (){
        return {
            expand: false,
            irPressed: false,
            selectedItem: -1,
            numDepth: 1
        }
    },
     props : [ 'irV' , 'irTreeV'],
     created (){
    },
    computed: {
        isDisable() {
            return this.irTreeV.length> 0;
        },
    },
    watch:{
        
    },
    methods:{
        setDepth() {
            this.numDepth=this.numDepth<2 ? 10 : 1;
        },
        download(filename) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:application/json,' + encodeURIComponent('{ \n "documents" : \n ' + JSON.stringify( this.irTreeV , null, '\t') + '\n}'));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } 
    }, 
    filters: {
    
  }
}
</script>