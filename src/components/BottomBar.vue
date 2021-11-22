<template>
<div id="btmDiv">
  <v-container>
    <v-row class="grow" align="center" justify="center">
      <v-col cols="12" sm="10" md="10" lg="12" xl="12">
        <!--<v-card id="card" elevation="2" class="pa-3 fill-height" flat>-->
          <v-textarea v-if="log" readonly style="font-size: 16px;" no-resize rows="13"
            justify="center" height="100%" name="log-text" label="Logs" v-model="bottomText.textLog" hint="Log"
            id="ta_send" placeholder="Log">
          </v-textarea>
          <!--<v-textarea
          readonly
            v-if="error"
            style="font-size: 16px;"
            no-resize
            rows="13"
            justify="center"
            height="100%"
            name="logerror-text"
            label="Error"
            v-model="bottomText.textLogError"
            hint="Error"
            id="ta_errlog" 
            placeholder="Error">
          </v-textarea>-->
          <v-textarea
            readonly
            v-if="conf"
            style="font-size: 16px;"
            no-resize
            rows="13"
            justify="center"
            height="100%"
            name="conf-text"
            label="Configuration"
            v-model="bottomText.textConf"
            hint="Configuration"
            id="ta_conf" 
            placeholder="Log">
          </v-textarea>
          <div v-if="ispectstate" v-bind:style={height:heightMax}>

              <v-subheader>IR LIST</v-subheader>
              <v-select
                v-model="selectedItem"
                :items="bottomText.listIRCol"
                label="IR collections"
                dense
                solo
                width="210px"></v-select>
            
           
            <div id="treeView">
              <v-row>
                
                <v-col cols="12" sm="10" md="10" lg="12" xl="12">
                  <div class="box">
                  <json-view 
                          rootKey="documents" 
                          align="left" 
                          :key="numDepth" 
                          :max-depth=numDepth 
                          :data="bottomText.textIRTreeCol"
                          />
                  </div>
                </v-col>
                
                <v-col cols="12" sm="2" md="2" lg="12" xl="12">
                  <div id="treeViewBtn" align="center">
                    <ul class="list_inside">
                      
                      <li>
                        <v-btn elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" id="btn_tc" fab tile :disabled=(!irPressed||isEmptyList) @click="numDepth=1; $emit('click-tc');">
                          <v-icon color="grey">mdi-page-last</v-icon>
                        </v-btn>
                      </li>
                      <li>
                        <v-btn elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" id="btn_irc" fab tile :disabled=(!irPressed||!isSelected) @click="numDepth=1; $emit('click-irc',selectedItem);">
                          <v-icon color="grey">mdi-sitemap-outline</v-icon>
                        </v-btn>
                      </li>
                       <template v-if="!isDisable">
                      <li>
                        <v-btn elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" fab tile :disabled=(!irPressed) @click="download('TreeColl',bottomText.textIRTreeCol);">
                          <v-icon color="grey">mdi-content-save-outline</v-icon>
                        </v-btn>
                      </li>
                      <li>
                        <v-btn elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" fab tile :disabled=(!irPressed) @click=setDepth()>
                          <v-icon color="grey">mdi-circle-expand</v-icon>
                        </v-btn>
                      </li>
                       </template>
                    </ul>
                  </div>
               </v-col>
              </v-row>
            </div>
          </div>
        <!--</v-card>-->
      </v-col>
      <v-col cols="12" sm="2" md="2" lg="12" xl="12">
        <v-row >
          <ul class="list">
            <li>
              <v-btn class="btn" id="btn_log" large tile fab v-on:click="setLog()" >
                <v-icon large color="black">mdi-code-tags</v-icon> 
              </v-btn>
            </li>
            <!--<li>
              <v-btn large tile fab v-on:click="setError()">
              <v-icon large color="red">mdi-alert-circle-outline</v-icon>
            </v-btn>
            </li>-->
            <li>
              <div>
                <input type="file" id="file_config" v-on:change="loadFile()" style="display:none;"/>
                <v-btn elevation="0" id="btn_upload" style="z-index: 20001;" fab x-small v-on:click="uploadConf()">
                  <v-icon small color="black">mdi-upload</v-icon>
                </v-btn>
                <v-btn elevation="2" tile id="btn_config" large fab v-on:click="setConf()">
                  <v-icon large>mdi-wrench</v-icon>
                </v-btn>
              </div>
            </li>
            <li>
              <div>
                
                <v-btn elevation="2" id="btn_ir" tile large fab @click="irPressed=true; setIR(); $emit('click-ir');">
                  <v-icon large color="blue">mdi-file-find-outline</v-icon>
                </v-btn>
              </div>
            </li>
          </ul>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { JSONView } from "vue-json-component";
  export default {
  name : 'bottomBar',
  components : {
    "json-view": JSONView
  },
  props : {
      bottomText : Object
  },
  data: () => ({
    value: 1, 
    heightMax: 0,
    log: true,
    error: false,
    conf: false,
    ispectstate: false,
    irPressed: false,
    selectedItem: "",
    numDepth: 1
  }),
  computed: {
    isDisable() {
      return this.bottomText.textIRTreeCol==='';
    },
    isEmptyList() {
      return this.bottomText.listIRCol.length<1;
    },
    isSelected() {
      return this.selectedItem!=="";
    },
  },
  methods: {
    setDepth() {
      this.numDepth=this.numDepth<2 ? 10 : 1;
    },
    async loadFile(){
      var file = document.getElementById("file_config").files[0];
      if(file){
        var reader = new FileReader();
        const app = this;
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          app.sendFileConf(evt.target.result);
        }
      }
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
    sendFileConf(filetext){
      this.$emit('file-upload-index', filetext);
    },
    setLog(){
      if(!this.log){
        this.log = true,
        this.error = false,
        this.conf = false,
        this.ispectstate = false
      }
    },
    setError(){
      if(!this.error){
        this.log = false,
        this.error = true,
        this.conf = false,
        this.ispectstate = false
      }
    },
    setConf(){
      if(!this.conf){
        this.log = false,
        this.error = false,
        this.conf = true,
        this.ispectstate = false
      }
    },
    setIR(){
      if(!this.conf){
        //Aggiungere settaggio dell'altezza
        this.heightMax = document.getElementById("col-ta-send").clientHeight - 24;
        this.log = false,
        this.error = false,
        this.conf = false,
        this.ispectstate = true
      }
    },
    uploadConf(){
      this.setConf();
      document.getElementById("file_config").click();
    }
  }
}
</script>

<style scoped>
  #btmDiv{
    height: 100%;
    background-color: white;
    border-radius: 4px;
    border-style: solid;
    border-color: navy;
    border-width: 1px;
  }

  .btn {
    border-radius: 4px;
    border-style: solid;
    border-color: navy;
    border-width: 1px;
  }

  .list {
  /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
  }

  /* (B) LIST ITEMS */
  .list li{
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%; /* Auto spacing */
  }

  .list_inside {
  /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
  }

  /* (B) LIST ITEMS */
  .list_inside li{
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%; /* Auto spacing */
  }

  @media screen and (max-width: 960px) and (min-width: 600px){
  /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
  .list { flex-wrap: wrap; margin-top: -122px;} 
  /* (C2) 2 ITEMS PER ROW */
  .list li { width: 100%; }

  .list_inside { flex-wrap: wrap; margin-top: -10px;} 

  .list_inside li { width: 100%; }
  }

  @media screen and (max-width: 1248px) and (min-width: 960px){
    /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
    .list { flex-wrap: wrap; margin-top: -122px;} 
    /* (C2) 2 ITEMS PER ROW */
    .list li { width: 100%; }

    .list_inside { flex-wrap: wrap; margin-top: -10px;} 

    .list_inside li { width: 100%; }
  }

  .tarea-bottom{
    background-color: white;
  }

  div.box
  {
    height:178px !important; height /**/: 200px;
    padding: 4px;
    overflow:auto;
}

  #btn_upload{
    position: absolute;
    margin-left: -15px;
    margin-top: -15px;
    border-style: solid;
    border-color: navy;
    border-width: 1px;
  }

  #btn_config{
    border-radius: 4px;
    border-style: solid;
    border-color: navy;
    border-width: 1px;
  }

  #btn_ir{
    border-radius: 4px;
    border-style: solid;
    border-color: navy;
    border-width: 1px;
  }
  
</style>