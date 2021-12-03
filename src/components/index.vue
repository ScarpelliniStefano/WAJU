<template>
  <div id="body" >
    <container name="c1" class="divheader">
      <v-row align="center">
        <v-col cols="10" align-self="left">
          <h1 id="title" class="display-2 font-weight-bold mb-3 mt-4">JCOUIweb</h1>
        </v-col>
        <v-col cols="2">
          <v-icon style="float:right; margin-right:20px;" id="settings" class="mt-1" x-large color="white" v-on:click="settings = true">mdi-cog-outline</v-icon>
          <v-overlay opacity="1" :value="settings" color="white">
            <Settings v-on:set-main-color="this.setMainColor" v-on:set-theme-color="this.setThemeColor"/>
            <v-btn color="orange lighten-2" v-on:click="settings = false">
                Chiudi Impostazioni
            </v-btn>
          </v-overlay>
        </v-col>
      </v-row>
    </container>
      <v-container name="c2" id="main-container" class="colcontainer" fluid>
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
                :bottomText="received"
                :arrayLog="arrayLog">
              </bottom-bar>
          </v-col>
        </v-row>
      </v-container>
  
  </div>
</template>

<script>

//import Vue from 'vue'
import { timeString } from '../functions/functionTools';
import Settings from '../components/Settings.vue';

class LogMessage{
  constructor(Msg, tMsg, idMsg){
    this.message = Msg;
    this.type = tMsg;
    this.id = idMsg;
  }
  get getMessage(){
    return this.message;
  }
  get getType(){
    return this.type;
  }
}

class ArrayLogMessage{
  constructor(){
    this.logs = [];
  }

  newLog(Msg, tMsg){
    let l = new LogMessage(Msg, tMsg, this.logs.length + 1);
    this.logs.push(l)
  }

  get allLogs(){
    return this.logs
  }

  get numberOfLogs(){
      return this.logs.length
  }
}

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
      BottomBar,
      Settings
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
        connectionPage : null,
        textRec : '',
        disBtn : false,
        arrayLog: new ArrayLogMessage(),
        settings: false,
        received: {
          textConf : 'Configurazione non presente',
          textLog : '',
          textErrLog : '',
          textIRTreeCol : '',
          listIRCol : []
        },
        themeColor: "",
        mainColor: "",
        fontColor: "",
        fontSize: 0
      }
    },
    created(){
      //ADD Commenti
      this.themeColor = this.getCookie("theme-color");
      if(!this.themeColor){
        this.themeColor = "theme-light";
        this.setCookie("theme-color","theme-light",30);
      }
      document.documentElement.classList.add("theme-light");

      this.mainColor = this.getCookie("main-color");
      if(!this.mainColor){
        this.mainColor = "black";
        this.setCookie("main-color","black",30);
      }
      document.documentElement.classList.add(this.mainColor);

      this.fontColor = this.getCookie("font-color");
      if(!this.fontColor){
        this.fontColor = "font-black";
        this.setCookie("font-color", "font-black", 30);
      }
      document.documentElement.classList.add(this.fontColor);

      this.fontSize = this.getCookie("font-size");
      if(!this.fontSize){
        this.fontSize = 14;
        this.setCookie("font-size", "14", 30);
      }
      document.documentElement.classList.add(this.fontSize);
    },
    mounted(){
      this.connection = new WebSocket('ws://'+process.env.VUE_APP_ENGINE_SERVER);
        this.connection.onmessage = (message) => {
            const text=message.data;
            if(text.includes('##BEGIN-ERROR##')){
                const startE=text.indexOf('##BEGIN-ERROR##')+'##BEGIN-ERROR##'.length;
                const endE=text.lastIndexOf('##END-ERROR##');
                this.changeLog('#@LOGS@#'+timeString('ERROR IN JOBS. SEE ERROR LOG BELOW')+'#@END-LOGS@#');
                this.changeErrLog('#@ERR-LOGS@#'+ timeString(text.substring(startE,endE))+'#@END-ERR-LOGS@#');
            }else if(text.includes('##ACK##')){
                console.log('ACK');
                this.changeLog('#@LOGS@#'+timeString('BACKTRACK DONE')+'#@END-LOGS@#')
            }else if(text.includes('##BEGIN-COLLECTION##')){
                const startE=text.indexOf('##BEGIN-COLLECTION##')+'##BEGIN-COLLECTION##'.length+1;
                const endE=text.lastIndexOf('##END-COLLECTION##');
                this.changeIRTree('#@TREE-DRAW@#'+ text.substring(startE,endE)+'#@END-TREE-DRAW@#');
                this.changeLog('#@LOGS@#'+timeString('TREE DREW')+'#@END-LOGS@#')
            }else if(text.includes('##BEGIN-IR-LIST##')){
                const startE=text.indexOf('##BEGIN-IR-LIST##')+'##BEGIN-IR-LIST##'.length;
                const endE=text.lastIndexOf('##END-IR-LIST##');
                this.changeIRList('#@IR-LIST@#'+ text.substring(startE,endE)+'#@END-IR-LIST@#');
                this.changeLog('#@LOGS@#'+timeString('IR LIST ARRIVED')+'#@END-LOGS@#')
            }else if(text.includes('##SUCCESS##')){
                console.log('successo');
                this.changeLog('#@LOGS@#'+timeString('JOB DONE')+'#@END-LOGS@#')
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
      setMainColor(color){
        document.documentElement.classList.replace(this.mainColor, color);
        this.mainColor = color;
        this.setCookie('main-color', color, 30);
      },
      setThemeColor(theme) {
        document.documentElement.classList.replace(this.themeColor, theme);
        this.themeColor = theme;
        this.setCookie('theme-color', theme, 30);
      },


      setCookie(name, value, daysToLive) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
        if(typeof daysToLive === "number") {
            /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
            cookie += ";secure; max-age=" + (daysToLive*24*60*60);
            document.cookie = cookie;
          }
      },
      getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(";");
      // Loop through the array elements
      for(var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
          if(name == cookiePair[0].trim()) {
              // Decode the cookie value and return
              return decodeURIComponent(cookiePair[1]);
          }
        }
      // Return null if not found
        return null;
      },
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
          this.generatePage(JSONInPrettyFormat);
        }else{
          console.log(textToChange);
          let startE=textToChange.indexOf('#@TREE-DRAW@#')+'#@TREE-DRAW@#'.length;
          let endE=textToChange.indexOf('###')
          let title=textToChange.substring(startE,endE);
          if(title=="Filter") title="Temporary Collection";
          startE=endE+'  { "documents" : '.length;
          endE=textToChange.lastIndexOf('#@END-TREE-DRAW@#')-3;
          let textConv=textToChange.substring(startE,endE);
          console.log(textConv);
          textConv=textConv.replace(/POINT /g,'{\n\t\t"type" : "POINT",\n\t\t"coordinates":"').replaceAll(")",')"\n\t}');
          this.generatePage(title,textConv);          
        }
      },

      generatePage(title,textToSend){
        let dateGen=new Date();
        let millis=dateGen.getTime();
        this.connectionPage=new WebSocket('ws://localhost:3000');
        this.connectionPage.onopen = () => {
          this.connectionPage.send('SAVE###'+"textTree_"+millis+"###"+JSON.stringify({datetime: dateGen.toISOString(),name:title,tree:textToSend}));
        }
        localStorage.setItem("textTree_"+millis,JSON.stringify({datetime: dateGen.toISOString(),name:title}))
        let routeData = this.$router.resolve({name: 'StaticTree',query:{id:millis}});
        console.log(routeData);
        window.open(routeData.href, '_blank');
      },
      changeIRList(textToChange){
        if(textToChange.startsWith('{')){
          var parseJSON = JSON.parse(textToChange);
          var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
          this.received.listIRCol=JSONInPrettyFormat;
        }else{
          this.received.listIRCol=[];
          const startE=textToChange.indexOf('#@IR-LIST#')+'#@IR-LIST@#  '.length;
          const endE=textToChange.lastIndexOf('#@END-IR-LIST@#')-1;
          var textChanged=textToChange.substring(startE,endE);
                                      /*.replace('","','\n'):*/
                                      
          var json_data=JSON.parse(textChanged);
          json_data=json_data.IRList;
          for(var i in json_data)
            this.received.listIRCol.push(json_data [i]);
        }
      },
      changeErrLog(textToChange){
        const startE=textToChange.indexOf('#@ERR-LOGS@#')+'#@ERR-LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-ERR-LOGS@#');
        this.arrayLog.newLog(textToChange.substring(startE, endE), "ERR")
        this.received.textLog+= textToChange.substring(startE,endE);
        alert(textToChange.substring(startE,endE));
      },
      changeLog(textToChange){
        const startE=textToChange.indexOf('#@LOGS@#')+'#@LOGS@#'.length;
        const endE=textToChange.lastIndexOf('#@END-LOGS@#');
        this.arrayLog.newLog(textToChange.substring(startE, endE), "LOG" )
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
            if(isPreDone() && selectedItem!=""){
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

</style>

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

<style>
    .tooltip .tooltiptext {
    visibility: hidden;
    background-color: white;
    color: #000;
    text-align: center;
    border-radius: 4px;
    border-color: navy;
    border-style: solid;
    border-width: 1px;
    position: absolute;
    z-index: 1;
    width: 200px;
    padding: 8 0;
    bottom: 50px;
    left: 50%;
    margin-left: -100px;
    align-content: center;
    font-size: 16px;
    }

    .tooltip:hover .tooltiptext {
    visibility: visible;
    }

  .btnstyle{
    border-color: var(--border-color);
  }

  .divstyle{
    border-color: var(--border-color);
  }

  .divheader{
    background-color: var(--bg-color);
  }

  .tastyle{
    color: var(--textarea-color);
  }

  .colcontainer{
    background-color: var(--bg-theme-color);
  }

  .containerstyle{
    background-color: var(--bg-div-color);
  }

  :root{
    --border-color: #000000;
    --bg-color: #2b2b2b;
    --textarea-color: black;
  }

  :root.red{
    --border-color: #D32F2F;
    --bg-color: #D32F2F;
    --textarea-color: red;
  }

  :root.pink{
    --border-color: #C2185B;
    --bg-color: #C2185B;
    --textarea-color: pink;
  }

  :root.purple{
    --border-color: #7B1FA2;
    --bg-color: #7B1FA2;
    --textarea-color: purple;
  }

  :root.deep-purple{
    --border-color: #512DA8;
    --bg-color: #512DA8;
    --textarea-color: deep-purple;
  }

  :root.indigo{
    --border-color: #303F9F;
    --bg-color: #303F9F;
    --textarea-color: indigo;
  }

  :root.blue{
    --border-color: #1976D2;
    --bg-color: #1976D2;
    --textarea-color: blue;
  }

  :root.light-blue{
    --border-color: #0288D1;
    --bg-color: #0288D1;
    --textarea-color: light-blue;
  }

  :root.cyan{
    --border-color: #0097A7;
    --bg-color: #0097A7;
    --textarea-color: cyan;
  }

  :root.teal{
    --border-color: #00796B;
    --bg-color: #00796B;
    --textarea-color: teal;
  }

  :root.green{
    --border-color: #388E3C;
    --bg-color: #388E3C;
    --textarea-color: green;
  }

  :root.light-green{
    --border-color: #689F38;
    --bg-color: #689F38;
    --textarea-color: light-green;
  }

  :root.lime{
    --border-color: #AFB42B;
    --bg-color: #AFB42B;
    --textarea-color: lime;
  }

    :root.yellow{
    --border-color: #FBC02D;
    --bg-color: #FBC02D;
    --textarea-color: yellow;
  }

  :root.amber{
    --border-color: #FFA000;
    --bg-color: #FFA000;
    --textarea-color: amber;
  }

  :root.orange{
    --border-color: #F57C00;
    --bg-color: #F57C00;
    --textarea-color: orange;
  }

  :root.deep-orange{
    --border-color: #E64A19;
    --bg-color: #E64A19;
    --textarea-color: deep-orange;
  }

  :root.brown{
    --border-color: #5D4037;
    --bg-color: #5D4037;
    --textarea-color: brown;
  }

  :root.blue-grey{
    --border-color: #455A64;
    --bg-color: #455A64;
    --textarea-color: blue-grey;
  }

  :root.theme-light{
    --bg-theme-color: #fdfdfd;
    --bg-div-color: #ffffff;
  }

  :root.theme-dark{
    --bg-theme-color: #222222;
    --bg-div-color: #333333;
  }

  :root.theme-blue{
    --bg-theme-color: #191970;
    --bg-div-color: #0047AB;
  }

  :root.theme-grey{
    --bg-theme-color: #202020;
    --bg-div-color: #383838;
  }

</style>