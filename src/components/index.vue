<template>
  <div id="body">
    <div class="divheader">
        <p id="title" class="display-2 font-weight-bold mb-3 mt-4">JCOUIweb</p>
        <v-icon flex id="settings" class="mt-1" x-large color="white">mdi-cog-outline</v-icon>
    </div>
      <v-container id="main-container" class="divcontent grey lighten-5" fluid>
        <v-row class="text-center grow" align="center" justify="center">
          <v-col :key="1" cols="12" :sm="11" :md="6" :lg="4" :xl="6">
              <bar-rec :recText="textRec" v-on:click-back-index="sendBck()"></bar-rec>
          </v-col>
          <v-col :key="2" cols="12" :sm="11" :md="6" :lg="4" :xl="6">
              <bar-send :disable="disBtn" v-on:click-send="sendMsg($event)"></bar-send>
          </v-col>
          <v-col id="third" :key="3" cols="12" :sm="11" :md="12" :lg="4" :xl="12">
              <bottom-bar v-on:file-upload-index="sendConfigFile($event)" 
                v-on:click-ir="sendIRList()" 
                v-on:click-tc="sendIRTempCol()"
                v-on:click-irc="sendIRSelCol($event)" 
                v-on:click-back-index="sendBck()" 
                :bottomText="received">
              </bottom-bar>
          </v-col>
        </v-row>
      </v-container>
  
  </div>
</template>

<style scoped>
  #body{
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  #body .divheader{
    flex: 0 1 auto;
  }

  #body .divcontent{
    flex: 1 0 auto;
  }
  #third{
    position: relative;
  }
</style>

<script>

//import Vue from 'vue'
import { timeString } from '../functions/functionTools';
var sended=false;

//const vm = new Vue();
var connected=false;
var preDone=false;

export var connect = () => {
  //vm.$connect();
}

export var disconnect = () => {
  //vm.$disconnect();
  //vm.$destroy();
}

export var setConnected = () => {
  connected=!connected;
}

export var isConnected = () => {
  return connected;
}

export var setPreDone = () => {
  preDone=!preDone;
}

export var isPreDone = () => {
  return preDone;
}
import BarRec from './barRec.vue'
import BarSend from './barSend.vue'
import BottomBar from './BottomBar.vue'
  export default {
    name: 'PaginaPrincipale',
    
    components : {
      BarRec,
      BarSend,
      BottomBar
    },
      /*
USE DB movie ON SERVER mongo1;
GET COLLECTION movie@movie; 
FILTER CASE WHERE WITH .name	
KEEP OTHERS; 
SAVE AS tempmovie@movie;
	    */
    data() {
      return {
        connection : null,
        textRec : '',
        disBtn : false,
        received: {
          textConf : 'Configurazione non presente',
          textLog : '',
          textErrLog : '',
          textIRTreeCol : '',
          listIRCol : []
        }
      }
    },
    mounted(){
      this.connection = new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
        this.connection.onmessage = (message) => {
            const text=message.data;
            if(text.includes('##BEGIN-ERROR##')){
                const startE=text.indexOf('##BEGIN-ERROR##')+'##BEGIN-ERROR##'.length;
                const endE=text.lastIndexOf('##END-ERROR##');
                this.changeLog('#@LOGS@#'+timeString('ERROR IN JOBS. SEE ERROR LOG BELOW')+'\n#@END-LOGS@#');
                this.changeErrLog('#@ERR-LOGS@#'+ timeString(text.substring(startE,endE))+'#@END-ERR-LOGS@#');
            }else if(text.includes('##ACK##')){
                console.log('ACK');
                this.changeLog('#@LOGS@#'+timeString('BACKTRACK DONE')+'\n#@END-LOGS@#')
            }else if(text.includes('##BEGIN-COLLECTION##')){
                const startE=text.indexOf('##BEGIN-COLLECTION##')+'##BEGIN-COLLECTION##'.length+1;
                const endE=text.lastIndexOf('##END-COLLECTION##');
                this.changeIRTree('#@TREE-DRAW@#'+ text.substring(startE,endE)+'#@END-TREE-DRAW@#');
                this.changeLog('#@LOGS@#'+timeString('TREE DREW')+'\n#@END-LOGS@#')
            }else if(text.includes('##BEGIN-IR-LIST##')){
                const startE=text.indexOf('##BEGIN-IR-LIST##')+'##BEGIN-IR-LIST##'.length;
                const endE=text.lastIndexOf('##END-IR-LIST##');
                this.changeIRList('#@IR-LIST@#'+ text.substring(startE,endE)+'#@END-IR-LIST@#');
                this.changeLog('#@LOGS@#'+timeString('IR LIST ARRIVED')+'\n#@END-LOGS@#')
            }else if(text.includes('##SUCCESS##')){
                console.log('successo');
                this.changeLog('#@LOGS@#'+timeString('JOB DONE')+'\n#@END-LOGS@#')
            }else if(text.includes('##BEGIN-PROCESS##')){
                console.log('end messages');
                const startP=text.indexOf('##BEGIN-PROCESS##')+'##BEGIN-PROCESS##'.length+1;
                const endP=text.indexOf('##END-PROCESS##');
                this.textRec=text.substring(startP,endP);
                this.disBtn=false;
                //disconnect();
            }else if(text.includes('##BEGIN-SERVER-CONF##')){
                const startE=text.indexOf('##BEGIN-SERVER-CONF##')+'##BEGIN-SERVER-CONF##'.length+1;
                const endE=text.lastIndexOf('##END-SERVER-CONF##');
                this.changeConfig(text.substring(startE,endE));
                console.log('config');
                if(!isPreDone()){
                    console.log('disconnect in config');
                    //disconnect();
                    setPreDone();
                }

            }
         };

        this.connection.onopen = () => {
            if(!isConnected()){
                //this.changeLog('#@LOGS@#'+timeString('Connection with engine established')+'\n#@END-LOGS@#');
                setConnected();
                console.log('opopen rec');
            }
        }

        this.connection.onclose = () => {
            if(isConnected()){
                setConnected();
                console.log('disconnect');
            }
         }

         this.connection.onerror = () => {
            if(isConnected){ 
                this.changeConfig('Configurazione non presente');
                this.changeLog('#@LOGS@#'+timeString('Connection with engine crashed')+'\n#@END-LOGS@#');
                setConnected();
            }
         }
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
    },
    methods:{
      changeConfig(textToChange){
        if(textToChange.startsWith('{')){
          var parseJSON = JSON.parse(textToChange);
          var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
          this.received.textConf=JSONInPrettyFormat;
        }else{
          this.received.textConf=textToChange;
        }
      },
      changeIRTree(textToChange){
        if(textToChange.startsWith('{')){
          var parseJSON = JSON.parse(textToChange);
          var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
          this.received.textIRTreeCol=JSONInPrettyFormat;
        }else{
          const startE=textToChange.indexOf('#@TREE-DRAW@#')+'#@TREE-DRAW@#'.length+'{ "documents" : '.length;
          const endE=textToChange.lastIndexOf('#@END-TREE-DRAW@#')-3;
          let textConv=textToChange.substring(startE,endE);
          textConv=textConv.replace(/POINT /g,'{\n\t\t"type" : "POINT",\n\t\t"coordinates":"').replaceAll(")",')"\n\t}');
         // console.log('[\n { \n } , \n'+textToChange.substring(startE,endE));
          this.received.textIRTreeCol= JSON.parse(/*'[\n { \n } , \n'+*/textConv);
        }
      },
      changeIRList(textToChange){
        if(textToChange.startsWith('{')){
          var parseJSON = JSON.parse(textToChange);
          var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
          this.received.listIRCol=JSONInPrettyFormat;
        }else{
          this.received.textIRCol=[];
          const startE=textToChange.indexOf('#@IR-LIST#')+'#@IR-LIST@#  '.length;                          
          const endE=textToChange.lastIndexOf('#@END-IR-LIST@#')-1;
         
          var textChanged=textToChange.substring(startE,endE)
                                      /*.replace('","','\n')*/;
          var json_data=JSON.parse(textChanged);
          json_data=json_data.IRList;
          for(var i in json_data)
            this.received.listIRCol.push(json_data[i]);
        }
      },
      changeErrLog(textToChange){
        const startE=textToChange.indexOf('#@ERR-LOGS@#')+'#@ERR-LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-ERR-LOGS@#');
        this.received.textLog+= textToChange.substring(startE,endE);
        alert(textToChange.substring(startE,endE));
      },
      changeLog(textToChange){
        const startE=textToChange.indexOf('#@LOGS@#')+'#@LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-LOGS@#');
        this.received.textLog+= textToChange.substring(startE,endE);
      },
      sendConfigFile(textSend){
        if(isPreDone() && textSend.length>0){
          if(isConnected()){
            console.log('onopen send');
            console.log('Sending data');
            this.connection.send('##ADD-SERVER-CONF##\n'+textSend+'\n##ADD-SERVER-CONF##');
            sended=true;
          }else{
            this.connection.close();
            this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
            if(!sended){
              this.connection.onopen = () => {
                console.log('onopen send');
                console.log('Sending data');
                this.connection.send('##ADD-SERVER-CONF##\n'+textSend+'\n##ADD-SERVER-CONF##');
                sended=true;
              }
            }
          }
        }
      },
      sendBck(){
        if(isPreDone()){
          if(isConnected()){
            this.connection.send('##BACKTRACK##');
            sended=true;
          }else{
            this.connection.close();
            this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
            if(!sended){
              this.connection.onopen = () => {
                this.connection.send('##BACKTRACK##');
                sended=true;
              }
            }
          }
        }
      },
      sendIRTempCol(){
            if(isPreDone()){
                if(isConnected()){
                        this.connection.send('##GET-TEMPORARY-COLLECTION##');
                        sended=true;
                }else{
                    this.connection.close();
                    this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
                    if(!sended){
                      this.connection.onopen = () => {
                        this.connection.send('##GET-TEMPORARY-COLLECTION##');
                        sended=true;
                      }
                    }
                }
            }
      },
      sendIRSelCol(selectedItem){
            if(isPreDone() && selectedItem!==""){
                if(isConnected()){
                        this.connection.send('##GET-IR-COLLECTION##\n'+selectedItem+"\n##END-IR-COLLECTION##");
                        sended=true;
                }else{
                    this.connection.close();
                    this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
                    if(!sended){
                      this.connection.onopen = () => {
                        this.connection.send('##GET-IR-COLLECTION##\n'+selectedItem+"\n##END-IR-COLLECTION##");
                        sended=true;
                      }
                    }
                }
            }
      },
      sendIRList(){
            if(isPreDone()){
                if(isConnected()){
                        this.connection.send('##GET-IR-LIST##');
                        sended=true;
                }else{
                    this.connection.close();
                    this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
                    if(!sended){
                      this.connection.onopen = () => {
                        this.connection.send('##GET-IR-LIST##');
                        sended=true;
                      }
                    }
                }
            }
      },
      sendMsg(textSend){
            if(isPreDone() && textSend.length>0){
                if(isConnected()){
                    
                        console.log('onopen send');
                        console.log('Sending data');
                        this.connection.send('##BEGIN-PROCESS##\n'+textSend+'\n##END-PROCESS##');
                        sended=true;
                    
                }else{
                    this.connection.close();
                    this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
                    if(!sended){
                      this.connection.onopen = () => {
                        console.log('onopen send');
                        console.log('Sending data');
                        this.connection.send('##BEGIN-PROCESS##\n'+textSend+'\n##END-PROCESS##');
                        sended=true;
                      }
                    }
                }
            }
      }
    }
  }


</script>

<style scoped>
  #title{
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    color: white;
  }
  #settings{
    text-align: right;
  }
  #body{
    background-color: navy;
  }

</style>