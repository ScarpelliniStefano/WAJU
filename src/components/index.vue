<template>
  <div id="body">
    <center><h1 class="display-2 font-weight-bold mb-3">
            JCOUIweb 
     </h1></center>
  <v-container>
    <v-row class="text-center">
      <!--<v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col> -->
      
      <v-col class="mb-4">
        
        <bar-rec :recText="textRec"></bar-rec>
        <bar-send v-on:click-send="sendMsg($event)"></bar-send>
      </v-col><v-col>
        <bottom-bar v-on:click-ir-index="sendIRTempCol()" v-on:click-back-index="sendBck()"  :bottomText="received"></bottom-bar>
        </v-col>
    </v-row>
  </v-container>
  
  </div>
</template>

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
        received: {
          textConf : 'Configurazione non presente',
          textLog : '',
          textErrLog : '',
          textIRTempCol : ''
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
                this.changeErrLog('#@ERR-LOGS@#'+ timeString(text.substring(startE,endE))+'#@END-ERR-LOGS@#');
                this.changeLog('#@LOGS@#'+timeString('ERROR IN JOBS. SEE ERROR LOG')+'\n#@END-LOGS@#')
            }else if(text.includes('##BEGIN-COLLECTION##')){
                const startE=text.indexOf('##BEGIN-COLLECTION##')+'##BEGIN-COLLECTION##'.length;
                const endE=text.lastIndexOf('##BEGIN-COLLECTION##');
                this.changeIRTree('#@TREE-DRAW@#'+ timeString(text.substring(startE,endE))+'#@END-TREE-DRAW@#');
                this.changeLog('#@LOGS@#'+timeString('TREE DREW')+'\n#@END-LOGS@#')
            }else if(text.includes('##SUCCESS##')){
                console.log('successo');
                this.changeLog('#@LOGS@#'+timeString('JOB DONE')+'\n#@END-LOGS@#')
            }else if(text.includes('##BEGIN-PROCESS##')){
                console.log('end messages');
                const startP=text.indexOf('##BEGIN-PROCESS##')+'##BEGIN-PROCESS##'.length;
                const endP=text.indexOf('##END-PROCESS##');
                this.textRec=text.substring(startP,endP);
                //disconnect();
            }else if(text.includes('##BEGIN-SERVER-CONF##')){
                const startE=text.indexOf('##BEGIN-SERVER-CONF##')+'##BEGIN-SERVER-CONF##'.length;
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
          this.received.textIRTempCol=JSONInPrettyFormat;
        }else{
          this.received.textIRTempCol=textToChange;
        }
      },
      changeErrLog(textToChange){
        const startE=textToChange.indexOf('#@ERR-LOGS@#')+'#@ERR-LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-ERR-LOGS@#');
        this.received.textErrLog+= textToChange.substring(startE,endE);
        alert(textToChange.substring(startE,endE));
      },
      changeLog(textToChange){
        const startE=textToChange.indexOf('#@LOGS@#')+'#@LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-LOGS@#');
        this.received.textLog+= textToChange.substring(startE,endE);
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
                        this.connection.send('##GET-IR-COLLECTION##');
                        sended=true;
                }else{
                    this.connection.close();
                    this.connection=new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
                    if(!sended){
                      this.connection.onopen = () => {
                        this.connection.send('##GET-IR-COLLECTION##');
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
