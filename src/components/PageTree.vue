<template>
<div id="treeView">
              <v-row >
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div class="box" align="left" justify="left">
                    <center> <h1>{{this.title}}</h1></center>
                   <center> <h3>{{new Date(this.datetime).toLocaleString()}}</h3></center>
                    <br>
                   <center> <h5>Total item:{{this.valTotal}} - Initial document: {{this.valInitial}} - Final document: {{this.valFinal}}</h5></center>
                  </div>
                </v-col> 
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div class="box" align="left" justify="left">
                  <json-view 
                          rootKey="documents" 
                          :key="numDepth" 
                          :max-depth=numDepth 
                          :data="this.textIRTreeCol"
                          />
                  </div>
                </v-col>
                
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div id="treeViewBtn" align="center">
                    <ul class="list_inside">
                      <li v-if="!(this.textIRTreeCol=='' || this.textIRTreeCol == undefined)">
                        <v-btn class="tooltip btnstyle" elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px;" fab tile @click="download('TreeColl',bottomText.textIRTreeCol);">
                          <v-icon color="grey">mdi-content-save-outline</v-icon>
                          <span class="tooltiptext">Save Tree...</span>
                        </v-btn>
                      </li>
                      <li v-if="!(this.textIRTreeCol=='' || this.textIRTreeCol == undefined)">
                        <v-btn class="tooltip btnstyle" elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px;" fab tile @click=setDepth()>
                          <v-icon color="grey">mdi-circle-expand</v-icon>
                          <span class="tooltiptext">Expand</span>
                        </v-btn>
                      </li>
                    </ul>
                  </div>
               </v-col>
              </v-row>
            </div>
</template>
<script>
import { JSONView } from "vue-json-component";
    export default {
    name : 'IRCompTree',
    components: { "json-view": JSONView },
    data: function (){
        return {
            expand: false,
            numDepth: 1,
            textIRTreeCol:'',
            datetime:'',
            title:'',
            valInitial:0,
            valFinal:0,
            valTotal:0,
            connectionPage:null,
        }
    },
    watch:{
      textIRTreeCol:function(newVal, oldVal){
      if(newVal!=oldVal){
        if(newVal=='' || newVal == undefined){
          this.textTreeEmpty=true;
        }else{
          this.textTreeEmpty=false;
        }
      }
      }
    },
    computed: {
        isDisable() {
            return this.irTreeV.length> 0;
        },
    },
    mounted(){
      if(localStorage.getItem("textTree_"+this.$route.query.id)){
        this.connectionPage=new WebSocket('ws://localhost:3000');
        this.connectionPage.onopen = () => {
          this.connectionPage.send('OPEN###'+"textTree_"+this.$route.query.id+"###0,100000");
          
        }
        let jsonData='';
        this.connectionPage.onmessage = (message) => {
          jsonData=JSON.parse(message.data);
          this.datetime=jsonData.datetime;
          this.title=jsonData.name;
          this.valTotal=jsonData.tot;
          this.valInitial=jsonData.initial;
          this.valFinal=jsonData.final;
          console.log(jsonData.tree);
          this.textIRTreeCol=jsonData.tree;
        }
        
      }
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
        }, 
    }
}
</script>

<style scoped>
  #ul_send {
  /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
  }

  /* (B) LIST ITEMS */
  #ul_send li{
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%; /* Auto spacing */
  }
</style>