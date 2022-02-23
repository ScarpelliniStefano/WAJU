<template>
  <v-sheet :color="bgColor" id="body">
    <div name="c1" class="divheader" style="height: 50px; padding-y: 0 25px">
      <h1 id="title" class="display-2 font-weight-bold">JCOUIweb</h1>
      <!--<v-speed-dial
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="fab"
        direction="bottom"
        :open-on-hover="false"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>-->
      <v-icon
        id="settings"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        large
        color="white"
        v-on:click="settings = true"
        @mouseover="tip = 'Settings'"
        @mouseleave="tip = ''"
      >
        mdi-cog-outline
      </v-icon>

      <v-icon
        v-if="!selBtm"
        @mouseover="tip = 'Other tools'"
        @mouseleave="tip = ''"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="bottom"
        large
        color="black"
        v-on:click="
          send.posz = 0;
          rec.posz = 0;
          btm.posz = 30;
          selBtm = !selBtm;
        "
      >
        mdi-post-outline
      </v-icon>

      <v-icon
        @mouseover="tip = 'Other tools'"
        @mouseleave="tip = ''"
        v-if="selBtm"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="bottom"
        large
        color="white"
        v-on:click="
          send.posz = 0;
          rec.posz = 0;
          btm.posz = 30;
          selBtm = !selBtm;
        "
      >
        mdi-post
      </v-icon>

      <v-icon
        v-if="!selRec"
        @mouseover="tip = 'Save & Back'"
        @mouseleave="tip = ''"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="SaveBack"
        large
        color="black"
        v-on:click="
          send.posz = 0;
          rec.posz = 30;
          btm.posz = 0;
          selRec = !selRec;
        "
      >
        mdi-content-save-outline
      </v-icon>
      <v-icon
        v-if="selRec"
        @mouseover="tip = 'Save & Back'"
        @mouseleave="tip = ''"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="SaveBack"
        large
        color="white"
        v-on:click="
          send.posz = 0;
          rec.posz = 30;
          btm.posz = 0;
          selRec = !selRec;
        "
      >
        mdi-content-save
      </v-icon>

      <v-icon
        v-if="!selSend"
        @mouseover="tip = 'Execute'"
        @mouseleave="tip = ''"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="execute"
        large
        color="black"
        v-on:click="
          send.posz = 30;
          rec.posz = 0;
          btm.posz = 0;
          selSend = !selSend;
        "
      >
        mdi-play-circle-outline
      </v-icon>
      <v-icon
        v-if="selSend"
        @mouseover="tip = 'Execute'"
        @mouseleave="tip = ''"
        style="
          float: right;
          margin-right: 20px;
          margin-top: 7px;
          margin-bottom: 7px;
        "
        id="execute"
        large
        color="white"
        v-on:click="
          send.posz = 30;
          rec.posz = 0;
          btm.posz = 0;
          selSend = !selSend;
        "
      >
        mdi-play-circle
      </v-icon>

      <h4
        style="float: right; margin-right: 20px; color: white; margin-top: 12px"
      >
        {{ this.tip }}
      </h4>

      <v-dialog
        v-model="settings"
        scrollable
        max-width="400px"
        max-height="400px"
      >
        <v-container>
          <Settings
            v-on:set-main-color="setMainColor"
            v-on:set-theme-color="setThemeColor"
            v-on:set-order="setOrder"
          />
          <v-sheet align="center" color="transparent">
            <v-btn
              align="right"
              max-width="200px"
              color="orange lighten-2"
              v-on:click="settings = false"
            >
              Close settings
            </v-btn>
          </v-sheet>
        </v-container>
      </v-dialog>

      <!--<v-overlay opacity="1" :value="settings" color="white">
        <Settings
          v-on:set-main-color="this.setMainColor"
          v-on:set-theme-color="this.setThemeColor"
          v-on:set-order="this.setOrder"
        />
        <v-btn color="orange lighten-2" v-on:click="settings = false">
          Chiudi Impostazioni
        </v-btn>
      </v-overlay>-->
    </div>
    <VueDragResize
      :key="rec.idRecChange"
      :min-width="400"
      :min-height="400"
      :w="rec.width"
      :h="rec.height"
      :z="rec.posz"
      :x="rec.posx"
      :y="rec.posy"
      v-if="selRec && $vuetify.breakpoint.mdAndUp"
      dragHandle=".topbar"
      style="position: absolute"
      @click="
        rec.posz = 2;
        send.posz = 1;
        btm.posz = 0;
      "
      :onDrag="onDragStopRec"
      :onResize="onResizeStopRec"
      @dragstop="onModRec"
      @resizestop="onModRec"
    >
      <bar-rec
        :bgcolor="contColor"
        :rapporto="rec.width / rec.height"
        :browser="browserName"
        :width="rec.width"
        :height="rec.height"
        :recText="textRec"
        :recArr="arrRec"
        v-on:click-back-index="sendBck()"
        v-on:set-z-click="setZ"
        v-on:close-rec="selRec = !selRec"
        v-on:maximize-rec="maximizeRec"
      ></bar-rec>
    </VueDragResize>
    <VueDragResize
      :key="send.idSendChange"
      :min-width="400"
      :min-height="400"
      :w="send.width"
      :h="send.height"
      :z="send.posz"
      :x="send.posx"
      :y="send.posy"
      v-if="selSend && $vuetify.breakpoint.mdAndUp"
      dragHandle=".topbar"
      style="position: absolute"
      @click="
        rec.posz = 0;
        send.posz = 2;
        btm.posz = 1;
      "
      :onDrag="onDragStopSend"
      :onResize="onResizeStopSend"
      @dragstop="onModSend"
      @resizestop="onModSend"
    >
      <bar-send
        :bgcolor="contColor"
        :rapporto="send.width / send.height"
        :browser="browserName"
        :width="send.width"
        :height="send.height"
        :disable="disBtn"
        v-on:click-send="sendMsg($event)"
        v-on:set-z-click="setZ"
        v-on:close-send="selSend = !selSend"
      ></bar-send>
    </VueDragResize>
    <VueDragResize
      :min-width="400"
      :min-height="400"
      :w="btm.width"
      :h="btm.height"
      v-if="selBtm && $vuetify.breakpoint.mdAndUp"
      drag-handle=".topbar"
      :z="btm.posz"
      style="position: absolute"
      @click="
        rec.posz = 0;
        send.posz = 0;
        btm.posz = 2;
      "
      :x="btm.posx"
      :y="btm.posy"
      :onDrag="onDragStopBtm"
      :onResize="onResizeStopBtm"
      @dragstop="onModBtm"
      @resizestop="onModBtm"
    >
      <bottom-bar
        :bgcolor="contColor"
        :browser="browserName"
        :height="btm.height"
        :width="btm.width"
        :rapporto="btm.width / btm.height"
        v-on:file-upload-index="sendConfigFile($event)"
        v-on:click-ir="sendIRList()"
        v-on:click-tc="sendIRTempCol()"
        v-on:click-irc="sendIRSelCol($event)"
        v-on:click-back-index="sendBck()"
        v-on:set-z-click="setZ"
        v-on:close-btm="selBtm = !selBtm"
        :bottomText="received"
        :arrayLog="arrayLog"
      >
      </bottom-bar>
    </VueDragResize>

    <v-container
      v-if="$vuetify.breakpoint.smAndDown"
      name="c2"
      id="main-container"
      class="colcontainer"
      fluid
    >
      <v-row class="text-center" align="center" align-content="center">
        <v-col v-if="selRec" class="" :key="1" :cols="12" :sm="12">
          <bar-rec
            :bgcolor="contColor"
            :rapporto="1"
            :browser="browserName"
            :width="rec.width"
            :height="rec.height"
            :recText="textRec"
            :recArr="arrRec"
            v-on:click-back-index="sendBck()"
            v-on:set-z-click="setZ"
            v-on:close-rec="selRec = !selRec"
            v-on:maximize-rec="maximizeRec"
          ></bar-rec>
        </v-col>
        <v-col
          v-if="selSend"
          class=""
          :key="2"
          :cols="12"
          :sm="12"
        >
          <bar-send
            :bgcolor="contColor"
            :rapporto="1"
            :browser="browserName"
            :height="send.height"
            :width="send.width"
            :disable="disBtn"
            v-on:click-send="sendMsg($event)"
            v-on:set-z-click="setZ"
            v-on:close-send="selSend = !selSend"
          ></bar-send>
        </v-col>
        <v-col
          v-if="selBtm"
          class=""
          id="third"
          :key="3"
          :cols="12"
          :sm="12"
        >
          <bottom-bar
            :bgcolor="contColor"
            :browser="browserName"
            :height="btm.height"
            :width="btm.width"
            :rapporto="1"
            v-on:file-upload-index="sendConfigFile($event)"
            v-on:click-ir="sendIRList()"
            v-on:click-tc="sendIRTempCol()"
            v-on:click-irc="sendIRSelCol($event)"
            v-on:click-back-index="sendBck()"
            v-on:set-z-click="setZ"
            v-on:close-btm="selBtm = !selBtm"
            :bottomText="received"
            :arrayLog="arrayLog"
          >
          </bottom-bar>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
//import Vue from 'vue'
import { timeString } from "../functions/functionTools";
import Settings from "../components/Settings.vue";
import VueDragResize from "vue-draggable-resizable";
//import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
//'vue-draggable-resizable'
//vue-drag-resize
class LogMessage {
  constructor(Msg, tMsg, idMsg) {
    this.message = Msg;
    this.type = tMsg;
    this.id = idMsg;
  }
  get getMessage() {
    return this.message;
  }
  get getType() {
    return this.type;
  }
}
class ArrayLogMessage {
  constructor() {
    this.logs = [];
  }

  newLog(Msg, tMsg) {
    let l = new LogMessage(Msg, tMsg, this.logs.length + 1);
    this.logs.push(l);
  }

  get allLogs() {
    return this.logs;
  }

  get numberOfLogs() {
    return this.logs.length;
  }
}

var sended = false;
var connected = false;
var preDone = false;

export var connect = () => {};
export var disconnect = () => {};
export var setConnected = () => {
  connected = !connected;
};
export var isConnected = () => {
  return connected;
};
export var setPreDone = () => {
  preDone = !preDone;
};
export var isPreDone = () => {
  return preDone;
};

import BarRec from "./barRec.vue";
import BarSend from "./barSend.vue";
import BottomBar from "./BottomBar.vue";

export default {
  name: "PaginaPrincipale",

  components: {
    BarRec,
    BarSend,
    BottomBar,
    Settings,
    VueDragResize,
  },
  data() {
    return {
      browserName: "",
      connection: null,
      connectionPage: null,
      textRec: "",
      arrRec: [],
      disBtn: false,
      arrayLog: new ArrayLogMessage(),
      settings: false,
      received: {
        textConf: "Configurazione non presente",
        textLog: "",
        textErrLog: "",
        textIRTreeCol: "",
        listIRCol: [],
        errorConfig: "",
      },
      themeColor: "",
      mainColor: "",
      fontColor: "",
      fontSize: 0,

      bgColor: '',
      contColor: '',

      orderBottom: "last",
      orderSend: "first",
      orderRec: "2",

      selRec: false,
      selSend: false,
      selBtm: false,

      tip: "",

      rec: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 400,
        posz: 0,
        idRecChange: 0,
      },

      send: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 400,
        posz: 0,
        idSendChange: 0,
      },

      btm: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 400,
        posz: 0,
        idBtmChange: 0,
      },
    };
  },
  created() {
    //ADD Commenti

    this.themeColor = this.getCookie("theme-color");
    if (!this.themeColor) {
      this.themeColor = "theme-light";
      this.setCookie("theme-color", "theme-light", 30);
    }
    document.documentElement.classList.add("theme-light");

    this.mainColor = this.getCookie("main-color");
    if (!this.mainColor) {
      this.mainColor = "black";
      this.setCookie("main-color", "black", 30);
    }
    document.documentElement.classList.add(this.mainColor);

    this.fontColor = this.getCookie("font-color");
    if (!this.fontColor) {
      this.fontColor = "font-black";
      this.setCookie("font-color", "font-black", 30);
    }
    document.documentElement.classList.add(this.fontColor);

    this.fontSize = this.getCookie("font-size");
    if (!this.fontSize) {
      this.fontSize = 14;
      this.setCookie("font-size", "14", 30);
    }
    document.documentElement.classList.add(this.fontSize);
  },
  mounted() {
    let userAgent = navigator.userAgent;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      this.browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      this.browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      this.browserName = "safari";
    } else if (userAgent.match(/opr\//i)) {
      this.browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      this.browserName = "edge";
    } else {
      this.browserName = "No browser detection";
    }

    this.connection = new WebSocket(
      "ws://" + process.env.VUE_APP_ENGINE_SERVER
    );
    this.connection.onmessage = (message) => {
      const text = message.data;
      if (text.includes("##BEGIN-ERROR##")) {
        const startE =
          text.indexOf("##BEGIN-ERROR##") + "##BEGIN-ERROR##".length;
        const endE = text.lastIndexOf("##END-ERROR##");
        this.changeLog(
          "#@LOGS@#" +
            timeString("ERROR IN JOBS. SEE ERROR LOG BELOW") +
            "#@END-LOGS@#"
        );
        this.changeErrLog(
          "#@ERR-LOGS@#" +
            timeString(text.substring(startE, endE)) +
            "#@END-ERR-LOGS@#"
        );
      } else if (text.includes("##ACK##")) {
        console.log("ACK");
        this.arrRec.pop();
        this.changeLog(
          "#@LOGS@#" + timeString("BACKTRACK DONE") + "#@END-LOGS@#"
        );
      } else if (text.includes("##BEGIN-COLLECTION##")) {
        const startE =
          text.indexOf("##BEGIN-COLLECTION##") +
          "##BEGIN-COLLECTION##".length +
          1;
        const endE = text.lastIndexOf("##END-COLLECTION##");
        this.changeIRTree(
          "#@TREE-DRAW@#" + text.substring(startE, endE) + "#@END-TREE-DRAW@#"
        );
        this.changeLog("#@LOGS@#" + timeString("TREE DREW") + "#@END-LOGS@#");
      } else if (text.includes("##BEGIN-IR-LIST##")) {
        const startE =
          text.indexOf("##BEGIN-IR-LIST##") + "##BEGIN-IR-LIST##".length;
        const endE = text.lastIndexOf("##END-IR-LIST##");
        this.changeIRList(
          "#@IR-LIST@#" + text.substring(startE, endE) + "#@END-IR-LIST@#"
        );
        this.changeLog(
          "#@LOGS@#" + timeString("IR LIST ARRIVED") + "#@END-LOGS@#"
        );
      } else if (text.includes("##SUCCESS##")) {
        console.log("successo");
        this.changeLog("#@LOGS@#" + timeString("JOB DONE") + "#@END-LOGS@#");
      } else if (text.includes("##BEGIN-PROCESS##")) {
        console.log("end messages");
        const startP =
          text.indexOf("##BEGIN-PROCESS##") + "##BEGIN-PROCESS##".length + 1;
        const endP = text.indexOf("##END-PROCESS##");
        this.textRec = text.substring(startP, endP);
        if(text.substring(startP, endP).length>0){
          this.arrRec=this.fromTextRecToArrRec(text.substring(startP, endP));
        }
        this.disBtn = false;
        //disconnect();
      } else if (text.includes("##BEGIN-SERVER-CONF##")) {
        const startE =
          text.indexOf("##BEGIN-SERVER-CONF##") +
          "##BEGIN-SERVER-CONF##".length +
          1;
        const endE = text.lastIndexOf("##END-SERVER-CONF##");
        this.changeConfig(text.substring(startE, endE));
        console.log("config");
        if (!isPreDone()) {
          console.log("disconnect in config");
          //disconnect();
          setPreDone();
        }
      }
    };

    this.connection.onopen = () => {
      if (!isConnected()) {
        //this.changeLog('#@LOGS@#'+timeString('Connection with engine established')+'\n#@END-LOGS@#');
        setConnected();
        console.log("opopen rec");
      }
    };

    this.connection.onclose = () => {
      if (isConnected()) {
        setConnected();
        console.log("disconnect");
      }
    };

    this.connection.onerror = () => {
      if (isConnected) {
        this.changeConfig("Configurazione non presente");
        this.changeLog(
          "#@LOGS@#" +
            timeString("Connection with engine crashed") +
            "\n#@END-LOGS@#"
        );
        setConnected();
      }
    };
    //vm.$on('receivedData',(v)=>{this.textR+=v;})
  },
  methods: {
    fromTextRecToArrRec(textReceived){
      var arrIstr=[];
      var arrTest=textReceived.split(';');
      
      arrTest.forEach(element => {
        if(element.startsWith("\n")){
          element=element.slice(1,element.length)
        }
          if(element.match(/GET COLLECTION/gi)){
            arrIstr.push({
              name: "GET COLLECTION",
              value: element+";"
            })
          }
          else if(element.match(/SAVE AS/gi)){
            arrIstr.push({
              name: "SAVE AS",
              value: element+";"
            })
          }
          else if(element.match(/SPATIAL JOIN OF COLLECTIONS/gi)){
            arrIstr.push({
              name: "SPATIAL JOIN OF COLLECTIONS",
              value: element+";"
            })
          }
          else if(element.match(/JOIN OF COLLECTIONS/gi)){
            arrIstr.push({
              name: "JOIN OF COLLECTIONS",
              value: element+";"
            })
          }
          else if(element.match(/FILTER/gi)){
            arrIstr.push({
              name: "FILTER",
              value: element+";"
            })
          }
          else if(element.match(/GROUP/gi)){
            arrIstr.push({
              name: "GROUP",
              value: element+";"
            })
          }
          else if(element.match(/EXPAND/gi)){
            arrIstr.push({
              name: "EXPAND",
              value: element+";"
            })
          }
          else if(element.match(/MERGE COLLECTIONS/gi)){
            arrIstr.push({
              name: "MERGE COLLECTIONS",
              value: element+";"
            })
          }
          else if(element.match(/INTERSECT COLLECTIONS/gi)){
            arrIstr.push({
              name: "INTERSECT COLLECTIONS",
              value: element+";"
            })
          }
          else if(element.match(/SUBTRACT COLLECTIONS/gi)){
            arrIstr.push({
              name: "SUBTRACT COLLECTIONS",
              value: element+";"
            })
          }
          else if(element.match(/USE DB/gi)){
            arrIstr.push({
              name: "USE DB",
              value: element+";"
            })
          }
          else if(element.match(/TRAJECTORY MATCHING/gi)){
            arrIstr.push({
              name: "TRAJECTORY MATCHING",
              value: element+";"
            })
          }
          else if(element.match(/CREATE_FO/gi)){
            arrIstr.push({
              name: "CREATE FUZZY OPERATOR",
              value: element+";"
            })
          }
          else if(element.match(/CREATE_JF/gi)){
            arrIstr.push({
              name: "CREATE JAVASCRIPT FUNCTION",
              value: element+";"
            })
          }
          else if(element.match(/GET DICTIONARY/gi)){
            arrIstr.push({
              name: "GET DICTIONARY",
              value: element+";"
            })
          }
      });
      return arrIstr;
    },

    setZ(tipo) {
      if (tipo === "rec") {
        this.rec.posz = 2;
        this.send.posz = 0;
        this.btm.posz = 0;
      } else if (tipo === "send") {
        this.rec.posz = 0;
        this.send.posz = 2;
        this.btm.posz = 0;
      } else if (tipo === "btm") {
        this.rec.posz = 0;
        this.send.posz = 0;
        this.btm.posz = 2;
      } else {
        console.log("Comando non riconosciuto");
      }
    },

    onResizeStopRec(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.rec.posx = x;
      this.rec.posy = y;
      this.rec.width = width;
      this.rec.height = height;
      if (this.rec.posz != 2) {
        this.setZ("rec");
      }
    },
    onDragStopRec(x, y) {
      this.rec.posx = x;
      this.rec.posy = y;
      if (this.rec.posz != 2) {
        this.setZ("rec");
      }
    },
    onModRec(x, y) {
      if (x < 4) {
        this.rec.posx = 4;
      } else {
        this.rec.posx = x;
      }
      if (y < 60) {
        this.rec.posy = 60;
      } else {
        this.rec.posy = y;
      }
    },
    maximizeRec() {
      this.rec.posx = 4;
      this.rec.posy = 60;
      this.rec.width = window.innerWidth - 24;
      this.rec.height = window.outerHeight - 50 - 85 - 30;
    },

    onResizeStopSend(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.send.posx = x;
      this.send.posy = y;
      this.send.width = width;
      this.send.height = height;
      if (this.send.posz != 2) {
        this.setZ("send");
      }
    },
    onDragStopSend(x, y) {
      this.send.posx = x;
      this.send.posy = y;
      if (this.send.posz != 2) {
        this.setZ("send");
      }
    },
    onModSend(x, y) {
      if (x < 4) {
        this.send.posx = 4;
      } else {
        this.send.posx = x;
      }
      if (y < 60) {
        this.send.posy = 60;
      } else {
        this.send.posy = y;
      }
    },

    onResizeStopBtm(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.btm.posx = x;
      this.btm.posy = y;
      this.btm.width = width;
      this.btm.height = height;
      if (this.btm.posz != 2) {
        this.setZ("btm");
      }
    },
    onDragStopBtm(x, y) {
      this.btm.posx = x;
      this.btm.posy = y;
      if (this.btm.posz != 2) {
        this.setZ("btm");
      }
    },
    onModBtm(x, y) {
      if (x < 4) {
        this.btm.posx = 4;
      } else {
        this.btm.posx = x;
      }
      if (y < 60) {
        this.btm.posy = 60;
      } else {
        this.btm.posy = y;
      }
    },

    setOrder(ordRec, ordSend, ordBott) {
      this.orderBottom = ordBott;
      this.orderSend = ordSend;
      this.orderRec = ordRec;
    },
    setMainColor(color) {
      document.documentElement.classList.replace(this.mainColor, color);
      this.mainColor = color;
      this.setCookie("main-color", color, 30);
    },
    setThemeColor(theme) {
      document.documentElement.classList.replace(this.themeColor, theme);
      this.themeColor = theme;
      if(theme == 'theme-dark'){
        this.bgColor = 'grey darken-4'
        this.contColor = 'grey darken-3'
      } else {
        this.bgColor = 'grey lighten-5'
        this.contColor = 'white'
      }
      this.setCookie("theme-color", theme, 30);
    },

    setCookie(name, value, daysToLive) {
      // Encode value in order to escape semicolons, commas, and whitespace
      var cookie = name + "=" + encodeURIComponent(value);
      if (typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
        cookie += ";secure; max-age=" + daysToLive * 24 * 60 * 60;
        document.cookie = cookie;
      }
    },
    getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(";");
      // Loop through the array elements
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
        if (name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
        }
      }
      // Return null if not found
      return null;
    },
    changeConfig(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.received.textConf = JSONInPrettyFormat;
      } else {
        this.received.textConf = textToChange;
      }
    },
    changeIRTree(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.generatePage(JSONInPrettyFormat);
      } else {
        console.log(textToChange);
        let startE =
          textToChange.indexOf("#@TREE-DRAW@#") + "#@TREE-DRAW@#".length;
        let endE = textToChange.indexOf("###");
        let title = textToChange.substring(startE, endE);
        if (title == "Filter") title = "Temporary Collection";
        startE = endE + '  { "documents" : '.length;
        endE = textToChange.lastIndexOf("#@END-TREE-DRAW@#") - 3;
        let textConv = textToChange.substring(startE, endE);
        console.log(textConv);
        textConv = textConv
          .replace(/POINT /g, '{\n\t\t"type" : "POINT",\n\t\t"coordinates":"')
          .replaceAll(")", ')"\n\t}');
        this.generatePage(title, textConv);
      }
    },
    changeIRList(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.received.listIRCol = JSONInPrettyFormat;
      } else {
        this.received.listIRCol = [];
        const startE =
          textToChange.indexOf("#@IR-LIST#") +
          "#@IR-LIST@#  ".length +
          '{ 	"total": 2, 	"IRList": '.length;
        const endE = textToChange.lastIndexOf("#@END-IR-LIST@#") - 2;
        var textChanged = textToChange.substring(startE, endE);
        /*.replace('","','\n')*/ var json_data = JSON.parse(textChanged);
        for (var i in json_data) this.received.listIRCol.push(json_data[i]);
      }
    },
    generatePage(title,textToSend){
      let dateGen=new Date();
      let millis=dateGen.getTime();
      this.connectionPage=new WebSocket('ws://localhost:3000');
      this.connectionPage.onerror=()=>{
        this.received.errorConfig="no server available"
      }
      this.connectionPage.onclose = () => {
        this.received.errorConfig="server save/open closed"
      }
      this.connectionPage.onopen = () => {
        console.log(this.connectionPage.readyState)
        this.connectionPage.send('SAVE###'+"textTree_"+millis+"###"+JSON.stringify({datetime: dateGen.toISOString(),name:title,tree:textToSend}));
        this.received.errorConfig=""
        localStorage.setItem("textTree_"+millis,JSON.stringify({datetime: dateGen.toISOString(),name:title}))
        let routeData = this.$router.resolve({name: 'StaticTree',query:{id:millis}});
        console.log(routeData);
        setTimeout(function() {
          window.open(routeData.href, '_blank');
        },1000);
      }
    },
    changeErrLog(textToChange) {
      const startE =
        textToChange.indexOf("#@ERR-LOGS@#") + "#@ERR-LOGS@#".length;
      const endE = textToChange.lastIndexOf("#@END-ERR-LOGS@#");
      this.arrayLog.newLog(textToChange.substring(startE, endE), "ERR");
      this.received.textLog += textToChange.substring(startE, endE);
      alert(textToChange.substring(startE, endE));
    },
    changeLog(textToChange) {
      const startE = textToChange.indexOf("#@LOGS@#") + "#@LOGS@#".length;
      const endE = textToChange.lastIndexOf("#@END-LOGS@#");
      this.arrayLog.newLog(textToChange.substring(startE, endE), "LOG");
      this.received.textLog += textToChange.substring(startE, endE);
    },
    sendConfigFile(textSend) {
      if (isPreDone() && textSend.length > 0) {
        if (isConnected()) {
          console.log("onopen send");
          console.log("Sending data");
          this.connection.send(
            "##ADD-SERVER-CONF##\n" + textSend + "\n##ADD-SERVER-CONF##"
          );
          sended = true;
        } else {
          this.connection.close();
          this.connection = new WebSocket(
            "ws://" + process.env.VUE_APP_ENGINE_SERVER
          );
          if (!sended) {
            this.connection.onopen = () => {
              console.log("onopen send");
              console.log("Sending data");
              this.connection.send(
                "##ADD-SERVER-CONF##\n" + textSend + "\n##ADD-SERVER-CONF##"
              );
              sended = true;
            };
          }
        }
      }
    },
    sendBck() {
      if (isPreDone()) {
        if (isConnected()) {
          this.connection.send("##BACKTRACK##");
          sended = true;
        } else {
          this.connection.close();
          this.connection = new WebSocket(
            "ws://" + process.env.VUE_APP_ENGINE_SERVER
          );
          if (!sended) {
            this.connection.onopen = () => {
              this.connection.send("##BACKTRACK##");
              sended = true;
            };
          }
        }
      }
    },
    sendIRTempCol() {
      if (isPreDone()) {
        if (isConnected()) {
          this.connection.send("##GET-TEMPORARY-COLLECTION##");
          sended = true;
        } else {
          this.connection.close();
          this.connection = new WebSocket(
            "ws://" + process.env.VUE_APP_ENGINE_SERVER
          );
          if (!sended) {
            this.connection.onopen = () => {
              this.connection.send("##GET-TEMPORARY-COLLECTION##");
              sended = true;
            };
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
    sendIRList() {
      if (isPreDone()) {
        if (isConnected()) {
          this.connection.send("##GET-IR-LIST##");
          sended = true;
        } else {
          this.connection.close();
          this.connection = new WebSocket(
            "ws://" + process.env.VUE_APP_ENGINE_SERVER
          );
          if (!sended) {
            this.connection.onopen = () => {
              this.connection.send("##GET-IR-LIST##");
              sended = true;
            };
          }
        }
      }
    },
    sendMsg(textSend) {
      if (isPreDone() && textSend.length > 0) {
        if (isConnected()) {
          console.log("onopen send");
          console.log("Sending data");
          this.connection.send(
            "##BEGIN-PROCESS##\n" + textSend + "\n##END-PROCESS##"
          );
          sended = true;
        } else {
          this.connection.close();
          this.connection = new WebSocket(
            "ws://" + process.env.VUE_APP_ENGINE_SERVER
          );
          if (!sended) {
            this.connection.onopen = () => {
              console.log("onopen send");
              console.log("Sending data");
              this.connection.send(
                "##BEGIN-PROCESS##\n" + textSend + "\n##END-PROCESS##"
              );
              sended = true;
            };
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#title {
  display: inline-block;
  justify-content: center;
  margin-left: 8px;
  color: white;
}
#settings {
  text-align: right;
}
</style>

<style scoped>
#body {
  display: flex;
  flex-flow: column;
  height: 100%;
}
#body .divheader {
  flex: 0 1 auto;
  justify-items: center;
  border-radius: 4px;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 4px;
}

#body .divcontent {
  flex: 1 0 auto;
}
#third {
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
  border-color: var(--border-color);
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

.btnstyle {
  border-color: var(--border-color);
}

.divstyle {
  border-color: var(--border-color);
}

.divheader {
  background-color: var(--bg-color);
}

.tastyle {
  color: var(--textarea-color);
}

.colcontainer {
  background-color: var(--bg-theme-color);
}

.containerstyle {
  background-color: var(--bg-div-color);
}

:root {
  --border-color: #2b2b2b;
  --bg-color: #2b2b2b;
  --textarea-color: black;
}

:root.red {
  --border-color: #d32f2f;
  --bg-color: #d32f2f;
  --textarea-color: red;
}

:root.pink {
  --border-color: #c2185b;
  --bg-color: #c2185b;
  --textarea-color: pink;
}

:root.purple {
  --border-color: #7b1fa2;
  --bg-color: #7b1fa2;
  --textarea-color: purple;
}

:root.deep-purple {
  --border-color: #512da8;
  --bg-color: #512da8;
  --textarea-color: deep-purple;
}

:root.indigo {
  --border-color: #303f9f;
  --bg-color: #303f9f;
  --textarea-color: indigo;
}

:root.blue {
  --border-color: #1976d2;
  --bg-color: #1976d2;
  --textarea-color: blue;
}

:root.light-blue {
  --border-color: #0288d1;
  --bg-color: #0288d1;
  --textarea-color: light-blue;
}

:root.cyan {
  --border-color: #0097a7;
  --bg-color: #0097a7;
  --textarea-color: cyan;
}

:root.teal {
  --border-color: #00796b;
  --bg-color: #00796b;
  --textarea-color: teal;
}

:root.green {
  --border-color: #388e3c;
  --bg-color: #388e3c;
  --textarea-color: green;
}

:root.light-green {
  --border-color: #689f38;
  --bg-color: #689f38;
  --textarea-color: light-green;
}

:root.lime {
  --border-color: #afb42b;
  --bg-color: #afb42b;
  --textarea-color: lime;
}

:root.yellow {
  --border-color: #fbc02d;
  --bg-color: #fbc02d;
  --textarea-color: yellow;
}

:root.amber {
  --border-color: #ffa000;
  --bg-color: #ffa000;
  --textarea-color: amber;
}

:root.orange {
  --border-color: #f57c00;
  --bg-color: #f57c00;
  --textarea-color: orange;
}

:root.deep-orange {
  --border-color: #e64a19;
  --bg-color: #e64a19;
  --textarea-color: deep-orange;
}

:root.brown {
  --border-color: #5d4037;
  --bg-color: #5d4037;
  --textarea-color: brown;
}

:root.blue-grey {
  --border-color: #455a64;
  --bg-color: #455a64;
  --textarea-color: blue-grey;
}

:root.theme-light {
  --bg-theme-color: #fdfdfd;
  --bg-div-color: #ffffff;
}

:root.theme-dark {
  --bg-theme-color: #222222;
  --bg-div-color: #333333;
}

:root.theme-blue {
  --bg-theme-color: #191970;
  --bg-div-color: #0047ab;
}

:root.theme-grey {
  --bg-theme-color: #202020;
  --bg-div-color: #383838;
}

button {
  background-color: transparent;
}

i {
  color: #6a8bb9;
}

div {
  margin: 0px;
  padding: 0px;
}

.topbar {
  height: 30px;
  background-color: var(--border-color);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-style: solid;
  border-color: var(--border-color);
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  color: #fff;
}

.v-text-field__details {
  display: none;
}

.v-input__slot {
  margin-bottom: 0px;
}
</style>

<style>
vdr {
  touch-action: none;
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed black;
}
.handle {
  z-index: -2;
  box-sizing: border-box;
  position: absolute;
  background: #aaaaaa;
  border-radius: 4px;
}
.handle-tl {
  width: 50px;
  height: 50px;
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.handle-tm {
  width: 50px;
  height: 3px;
  top: -3px;
  left: 50%;
  margin-left: -25px;
  cursor: n-resize;
}
.handle-tr {
  width: 50px;
  height: 50px;
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.handle-ml {
  width: 3;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  left: -3px;
  cursor: w-resize;
}
.handle-mr {
  width: 3;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  right: -3px;
  cursor: e-resize;
}
.handle-bl {
  width: 50px;
  height: 50px;
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.handle-bm {
  width: 50px;
  height: 3px;
  bottom: -3px;
  left: 50%;
  margin-left: -25px;
  cursor: s-resize;
}
.handle-br {
  width: 50px;
  height: 50px;
  bottom: -3px;
  right: -3px;
  cursor: se-resize;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>