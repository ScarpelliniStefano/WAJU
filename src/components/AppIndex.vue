<template>
  <v-sheet :dark="darkMode" :light="!darkMode" id="body">
    <v-sheet
      :dark="darkMode"
      :light="!darkMode"
      elevation="10"
      name="c1"
      class="divheader"
      style="height: 50px; padding-y: 0 25px"
    >
      <v-row>
        <v-col cols="4">
          <h1 id="title" class="display-2 noselect font-weight-bold">{{ TITLE }}</h1>
        </v-col>

        <v-col class="d-flex justify-center align-center">
          <v-spacer />
          <h4 class="noselect" style="color: var(--border-color); margin-right: 12px">
            {{ this.tip }}
          </h4>
          <v-icon
            v-if="!send.selected"
            @mouseover="tip = TIP_EXE_COMMAND_WIZARD"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px"
            id="execute"
            large
            :dark="darkMode"
            :light="!darkMode"
            @click="showSheet('send')"
          >
            {{ BTN_SEND_OFF }}
          </v-icon>
          <v-icon
            v-if="send.selected"
            @mouseover="tip = TIP_EXE_COMMAND_WIZARD"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px; color: var(--border-color)"
            id="execute"
            large
            @click="hideSheet('send')"
          >
            {{ BTN_SEND_ON }}
          </v-icon>

          <v-badge
            :value="rec.newMessages"
            color="red darken-2"
            overlap
            class="noselect"
          >
          <v-icon
            v-if="!rec.selected"
            @mouseover="tip = TIP_SAVE_UNDO"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px"
            large
            :dark="darkMode"
            :light="!darkMode"
            @click="showSheet('rec')"
          >
            {{ BTN_RECEIVE_OFF }}
          </v-icon>
          </v-badge>

          <v-icon
            v-if="rec.selected"
            @mouseover="tip = TIP_SAVE_UNDO"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px; color: var(--border-color)"
            id="SaveBack"
            large
            @click="hideSheet('rec')"
          >
            {{ BTN_RECEIVE_ON }}
          </v-icon>

          <v-badge
            v-if="!log.selected"
            :content="arrayLog.newMessages"
            :value="arrayLog.newMessages"
            color="red darken-2"
            overlap
            class="noselect"
          >
          <v-icon
            v-if="!log.selected"
            @mouseover="tip = TIP_LOG"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px"
            large
            :dark="darkMode"
            :light="!darkMode"
            @click="showSheet('log')"
          >
            {{ BTN_LOG_OFF }}
          </v-icon>
          </v-badge>

          <v-icon
            @mouseover="tip = TIP_LOG"
            @mouseleave="tip = ''"
            v-if="log.selected"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px; color: var(--border-color)"
            large
            @click="hideSheet('log')"
          >
            {{ BTN_LOG_ON }}
          </v-icon>

          <v-icon
            v-if="!btm.selected"
            @mouseover="tip = TIP_CONFIG_COLL"
            @mouseleave="tip = ''"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px"
            large
            :dark="darkMode"
            :light="!darkMode"
            @click="showSheet('btm')"
          >
            {{ BTN_CONFIG_COLL_OFF }}
          </v-icon>

          <v-icon
            @mouseover="tip = TIP_CONFIG_COLL"
            @mouseleave="tip = ''"
            v-if="btm.selected"
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px; color: var(--border-color)"
            large
            @click="hideSheet('btm')"
          >
            {{ BTN_CONFIG_COLL_ON }}
          </v-icon>

          <v-icon
            left
            style="margin-left: 12px; margin-top: 7px; margin-bottom: 7px; color: var(--border-color)"
            large
            @click="settings = true"
            @mouseover="tip = TIP_SETTINGS"
            @mouseleave="tip = ''"
          >
            {{ BTN_SETTINGS }}
          </v-icon>
        </v-col>
      </v-row>
      <v-bottom-sheet v-model="settings" :dark="darkMode" :light="!darkMode">
        <v-sheet class="text-center" height="175px" min-width="700px">
          <v-btn
            class="mt-6"
            text
            color="var(--border-color)"
            @click="settings = !settings"
          >
            <span>{{ BTN_SPAN_SETTINGS }}</span>
          </v-btn>
          <Settings
            @set-main-color="setMainColor"
            @set-theme-color="setThemeColor"
            :darkMode="darkMode"
          >
          </Settings>
        </v-sheet>
      </v-bottom-sheet>

      <v-row justify="center">
        <v-dialog
          v-model="firstDialog"
          persistent
          max-width="500"
          :dark="darkMode"
          :light="!darkMode"
        >
          <v-card>
            <v-card-title class="text-h5">
              {{ FIRST_DIALOG.DIALOG_TITLE }}
            </v-card-title>
            <v-card-text>
              {{ FIRST_DIALOG.DIALOG_TEXT_FIRST }}
              <br />
              {{ FIRST_DIALOG.DIALOG_TEXT_SECOND }}
              <br />
              {{ FIRST_DIALOG.DIALOG_TEXT_THIRD }}
              <br />
              {{ FIRST_DIALOG.DIALOG_TEXT_FOURTH }}
              <br />
              {{ FIRST_DIALOG.DIALOG_TEXT_FIFTH }}
              <br />
              <br />
              {{FIRST_DIALOG.DIALOG_COOKIES}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="var(--border-color)" text @click="setFirstDialog()">
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-sheet>
    <VueDragResize
      :key="rec.idRecChange"
      :min-width="400"
      :min-height="500"
      :w="rec.width"
      :h="rec.height"
      :z="rec.posz"
      :x="rec.posx"
      :y="rec.posy"
      v-if="rec.selected && $vuetify.breakpoint.mdAndUp"
      dragHandle=".topbar"
      style="position: absolute"
      @click="changeOrder('rec', true)"
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
        :darkMode="darkMode"
        :reconnectSended="isReconnectedAndSended"
        @click-back-index="sendBck()"
        @long-click="longClickEvent($event)"
        @save-istruction="saveIstructions($event)"
        @set-z-click="setZ"
        @close-rec="hideSheet('rec')"
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
      v-if="send.selected && $vuetify.breakpoint.mdAndUp"
      dragHandle=".topbar"
      style="position: absolute"
      @click="changeOrder('send', true)"
      :onDrag="onDragStopSend"
      :onResize="onResizeStopSend"
      @dragstop="onModSend"
      @resizestop="onModSend"
      :resizable="send.resizable"
      :draggable="send.draggable"
    >
      <bar-send
        :darkMode="darkMode"
        :bgcolor="contColor"
        :rapporto="send.width / send.height"
        :browser="browserName"
        :width="send.width"
        :height="send.height"
        :textRec="textToCommand"
        :disable="disBtn"
        :randomNumberString="randomNumber"
        :engineCrash="isCrashed"
        :serviceCrash="isWebCrashed"
        @click-send="sendMsg($event)"
        @long-click="longClickEvent($event)"
        @open-wizard="openWizard()"
        @set-z-click="setZ"
        @close-send="hideSheet('send')"
        @send-text="sendText()"
        @share-text="shareText"
        :textShare="send.textShare"
      ></bar-send>
    </VueDragResize>

    <VueDragResize
      :min-width="600"
      :min-height="300"
      :w="log.width"
      :h="log.height"
      v-if="log.selected && $vuetify.breakpoint.mdAndUp"
      drag-handle=".topbar"
      :z="log.posz"
      style="position: absolute"
      @click="changeOrder('log', true)"
      :x="log.posx"
      :y="log.posy"
      :onDrag="onDragStopLog"
      :onResize="onResizeStopLog"
      @dragstop="onModLog"
      @resizestop="onModLog"
    >
      <bar-log
        :bgcolor="contColor"
        :browser="browserName"
        :height="log.height"
        :width="log.width"
        :darkMode="darkMode"
        :rapporto="log.width / log.height"
        @set-z-click="setZ"
        @close-log="hideSheet('log')"
        @resetCounter="resetCounter"
        :arrayLog="arrayLog"
      >
      </bar-log>
    </VueDragResize>

    <VueDragResize
      :min-width="400"
      :min-height="400"
      :w="btm.width"
      :h="btm.height"
      v-if="btm.selected && $vuetify.breakpoint.mdAndUp"
      drag-handle=".topbar"
      :z="btm.posz"
      style="position: absolute"
      @click="changeOrder('btm', true)"
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
        :darkMode="darkMode"
        :timerId="timerId"
        :longClicked="isLongClick"
        :engineCrash="isCrashed"
        :serviceCrash="isWebCrashed"
        :reconnectSended="isReconnectedAndSended"
        @file-upload-index="sendConfigFile($event)"
        @click-ir="sendIRList()"
        @click-tc="sendIRTempCol()"
        @click-irc="sendIRSelCol($event)"
        @click-back-index="sendBck()"
        @upload-config="uploadConfig()"
        @set-z-click="setZ"
        @close-btm="hideSheet('btm')"
        @save-status="saveStatus($event)"
        @long-click="longClickEvent($event)"
        :bottomText="received"
        :tempPresent="btm.tempPresent"
      >
      </bottom-bar>
    </VueDragResize>

    <v-snackbar v-model="wizardAlert" elevation="5" :dark="darkMode" :light="!darkMode">
      Wizard forwarded an istruction

      <template v-slot:action="{ attrs }">
        <v-btn
          color="var(--border-color)"
          text
          v-bind="attrs"
          @click="wizardAlert = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="wizardAlertHint"
      elevation="5"
      :dark="darkMode"
      :light="!darkMode"
      timeout="4000"
      max-width="70%"
    >
      <p class="v-snack__content">{{ lblPopup }}</p>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="var(--border-color)"
          text
          v-bind="attrs"
          @click="wizardAlertHint = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>

    <v-container
      v-if="$vuetify.breakpoint.smAndDown"
      name="c2"
      id="main-container"
      class="pt-3"
      fluid
    >
      <v-row class="text-center" align="center">
        <v-col v-if="send.selected" :key="1" :cols="12" :sm="12">
          <bar-send
            :bgcolor="contColor"
            :rapporto="send.widthSm / send.heightSm"
            :browser="browserName"
            :height="send.heightSm"
            :width="send.widthSm"
            :disable="disBtn"
            :textRec="textToCommand"
            @send-text="sendText()"
            :textChange="send.textSend"
            :randomNumberString="randomNumber"
            :darkMode="darkMode"
            :engineCrash="isCrashed"
            :serviceCrash="isWebCrashed"
            @click-send="sendMsg($event)"
            @long-click="longClickEvent($event)"
            @open-wizard="openWizard()"
            @set-z-click="setZ"
            @close-send="hideSheet('send')"
            @share-text="shareText"
            :textShare="send.textShare"
          ></bar-send>
        </v-col>
        <v-col v-if="log.selected" class="" :key="2" :cols="12" :sm="12">
          <bar-log
            @resetCounter="resetCounter"
            :bgcolor="contColor"
            :browser="browserName"
            :height="log.heightSm"
            :width="log.widthSm"
            :rapporto="log.widthSm / log.heightSm"
            @set-z-click="setZ"
            @close-log="hideSheet('log')"
            :darkMode="darkMode"
            :arrayLog="arrayLog"
          >
          </bar-log>
        </v-col>
        <v-col v-if="rec.selected" class="" :key="3" :cols="12" :sm="12">
          <bar-rec
            :bgcolor="contColor"
            :rapporto="rec.widthSm / rec.heightSm"
            :browser="browserName"
            :width="rec.widthSm"
            :height="rec.heightSm"
            :recText="textRec"
            :recArr="arrRec"
            :darkMode="darkMode"
            :reconnectSended="isReconnectedAndSended"
            @click-back-index="sendBck()"
            @long-click="longClickEvent($event)"
            @save-istruction="saveIstructions($event)"
            @set-z-click="setZ"
            @close-rec="hideSheet('rec')"
          ></bar-rec>
        </v-col>
        <v-col v-if="btm.selected" class="" id="third" :key="4" :cols="12" :sm="12">
          <bottom-bar
            :bgcolor="contColor"
            :browser="browserName"
            :height="btm.heightSm"
            :width="btm.widthSm"
            :rapporto="btm.widthSm / btm.heightSm"
            :darkMode="darkMode"
            :timerId="timerId"
            :longClicked="isLongClick"
            :engineCrash="isCrashed"
            :serviceCrash="isWebCrashed"
            :reconnectSended="isReconnectedAndSended"
            @file-upload-index="sendConfigFile($event)"
            @click-ir="sendIRList()"
            @click-tc="sendIRTempCol()"
            @click-irc="sendIRSelCol($event)"
            @click-back-index="sendBck()"
            @long-click="longClickEvent($event)"
            @upload-config="uploadConfig()"
            @set-z-click="setZ"
            @close-btm="hideSheet('btm')"
            :bottomText="received"
            :tempPresent="btm.tempPresent"
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
import Settings from "./IndexSettings.vue";
import VueDragResize from "vue-draggable-resizable";
import lang from "../env/lang.en";
import ReconnectingWebSocket from "reconnecting-websocket";
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

//var sended = false;


export var connect = () => {};
export var disconnect = () => {};


import BarRec from "./IndexReceive.vue";
import BarSend from "./IndexSend.vue";
import BottomBar from "./IndexConfigurationCollection.vue";
import BarLog from "./IndexLog.vue";
import icon from "../env/icon";


export default {
  name: "IndexPage",

  components: {
    BarRec,
    BarSend,
    BarLog,
    BottomBar,
    Settings,
    VueDragResize,
  },
  data() {
    return {
      browserName: "",
      connection: null,
      connectionPage: null,
      isCrashed: false,
      isWebCrashed: false,
      isReconnectedAndSended: false,
      textRec: "",
      arrRec: [],
      counterRec: 0,
      disBtn: false,
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

      bgColor: "",
      contColor: "",
      darkMode: false,
      outlined: false,

      tip: "",
      firstDialog: true,

      firstTimeError: false,

      showWizard: false,
      textWizard: "",
      randomNumber: "",

      rec: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 500,
        posz: 0,
        idRecChange: 124,
        selected: false,
        //Aggiunta per questioni legate al passaggio da visualizzazione pc a quella tablet
        widthSm: 500,
        heightSm: 400,
        newMessages: false
      },

      send: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 400,
        posz: 0,
        idSendChange: 122,
        selected: false,
        //Aggiunta per questioni legate al passaggio da visualizzazione pc a quella tablet
        widthSm: 500,
        heightSm: 400,

        textShare: "",
      },

      btm: {
        posx: 4,
        posy: 60,
        width: 400,
        height: 400,
        posz: 0,
        idBtmChange: 123,
        selected: false,
        //Aggiunta per questioni legate al passaggio da visualizzazione pc a quella tablet
        widthSm: 500,
        heightSm: 400,
        tempPresent:false,
        justWarnNewIR:false
      },

      log: {
        posx: 4,
        posy: 60,
        width: 600,
        height: 300,
        posz: 0,
        idLogChange: 123,
        selected: false,
        //Aggiunta per questioni legate al passaggio da visualizzazione pc a quella tablet
        widthSm: 500,
        heightSm: 400,
      },

      textToCommand: "",
      wizardAlert: false,

      //LABEL
      TITLE: lang.INDEX.TITLE,
      TIP_SETTINGS: lang.INDEX.TIP_SETTINGS,
      TIP_CONFIG_COLL: lang.INDEX.TIP_CONFIG_COLL,
      TIP_LOG: lang.INDEX.TIP_LOG,
      TIP_SAVE_UNDO: lang.INDEX.TIP_SAVE_UNDO,
      TIP_EXE_COMMAND_WIZARD: lang.INDEX.TIP_EXE_COMMAND_WIZARD,
      BTN_SPAN_SETTINGS: lang.INDEX.BTN_SPAN_SETTINGS,
      FIRST_DIALOG: {
        DIALOG_TITLE: lang.INDEX.DIALOG.DIALOG_TITLE,
        DIALOG_TEXT_FIRST: lang.INDEX.DIALOG.DIALOG_TEXT_FIRST,
        DIALOG_TEXT_SECOND: lang.INDEX.DIALOG.DIALOG_TEXT_SECOND,
        DIALOG_TEXT_THIRD: lang.INDEX.DIALOG.DIALOG_TEXT_THIRD,
        DIALOG_TEXT_FOURTH: lang.INDEX.DIALOG.DIALOG_TEXT_FOURTH,
        DIALOG_TEXT_FIFTH: lang.INDEX.DIALOG.DIALOG_TEXT_FIFTH,
        DIALOG_COOKIES: lang.INDEX.DIALOG.DIALOG_COOKIES
      },

      //ICON
      BTN_SETTINGS: icon.INDEX.BTN_SETTINGS,
      BTN_CONFIG_COLL_OFF: icon.INDEX.BTN_CONFIG_COLL_OFF,
      BTN_CONFIG_COLL_ON: icon.INDEX.BTN_CONFIG_COLL_ON,
      BTN_LOG_OFF: icon.INDEX.BTN_LOG_OFF,
      BTN_LOG_ON: icon.INDEX.BTN_LOG_ON,
      BTN_RECEIVE_OFF: icon.INDEX.BTN_RECEIVE_OFF,
      BTN_RECEIVE_ON: icon.INDEX.BTN_RECEIVE_ON,
      BTN_SEND_OFF: icon.INDEX.BTN_SEND_OFF,
      BTN_SEND_ON: icon.INDEX.BTN_SEND_ON,

      //longClick
      isLongClick: false,
      timerId: -1,
      lblPopup: "",
      wizardAlertHint: false,
      chooseTitle:'',

      //Array Log
      arrayLog: {
        logs: [],
        newLogs: 0,
        logs_engine: [],
        newLogsEngine: 0,
        logs_parser: [],
        newLogsParser: 0,
        logs_io: [],
        newLogsIO: 0,
        tabActive: null,
        newMessages: 0,
      },
    };
  },
  watch: {
    wizardAlert: function (newVal) {
      this.changeIcon(newVal);
    },
  },
  created() {
    //ADD Commenti
    this.setTheme();
    this.setColor();
    this.setDialog();
    this.setStartWidth();
  },
  mounted() {
    this.getBrowser();
    window.addEventListener("resize", this.setPositions);
    this.startServer();
    this.loadSettings();
    this.setConnection();
  },
  methods: {
    /**
     * Genera un messaggio di log
     * @param {String} Msg Messaggio in arrivo
     * @param {String} tMsg Tipo di messaggio
     * @param {String} cMsg Categoria del messaggio 
     */
    newLog(Msg, tMsg, cMsg) {
      var l = null;
      switch (cMsg) {
        case "Default":
          l = new LogMessage(Msg, tMsg, this.arrayLog.logs.length + 1);
          if (this.arrayLog.tabActive !== "Default" || !this.log.selected) {
            this.arrayLog.newLogs += 1;
            this.arrayLog.newMessages += 1;
          }
          this.arrayLog.logs.push(l);
          break;
        case "Engine":
          l = new LogMessage(Msg, tMsg, this.arrayLog.logs_engine.length + 1);
          if (this.arrayLog.tabActive !== "Engine" || !this.log.selected) {
            this.arrayLog.newLogsEngine += 1;
            this.arrayLog.newMessages += 1;
          }
          this.arrayLog.logs_engine.push(l);
          break;
        case "Parser":
          l = new LogMessage(Msg, tMsg, this.arrayLog.logs_parser.length + 1);
          if (this.arrayLog.tabActive !== "Parser" || !this.log.selected) {
            this.arrayLog.newLogsParser += 1;
            this.arrayLog.newMessages += 1;
          }
          this.arrayLog.logs_parser.push(l);
          break;
        case "IO":
          l = new LogMessage(Msg, tMsg, this.arrayLog.logs_io.length + 1);
          if (this.arrayLog.tabActive !== "IO" || !this.log.selected) {
            this.arrayLog.newLogsIO += 1;
            this.arrayLog.newMessages += 1;
          }
          this.arrayLog.logs_io.push(l);
          break;
        default:
          l = new LogMessage(Msg, tMsg, this.arrayLog.logs.length + 1);
          if (this.arrayLog.tabActive !== "Default" || !this.log.selected) {
            this.arrayLog.newLogs += 1;
            this.arrayLog.newMessages += 1;
          }
          this.arrayLog.logs.push(l);
      }
    },
    /**
     * Resetta il contatore dei nuomi messaggi di log
     * @param {String} cat Categoria dei messaggi aperti
     */
    resetCounter(cat) {
      this.arrayLog.tabActive = (cat === undefined) | null ? "Default" : cat;
      switch (cat) {
        case "Default":
          this.arrayLog.newMessages -= this.arrayLog.newLogs;
          this.arrayLog.newLogs = 0;
          break;
        case "Engine":
          this.arrayLog.newMessages -= this.arrayLog.newLogsEngine;
          this.arrayLog.newLogsEngine = 0;
          break;
        case "Parser":
          this.arrayLog.newMessages -= this.arrayLog.newLogsParser;
          this.arrayLog.newLogsParser = 0;
          break;
        case "IO":
          this.arrayLog.newMessages -= this.arrayLog.newLogsIO;
          this.arrayLog.newLogsIO = 0;
          break;
      }
    },
    /**
     * Cambia ordine dei componenti sull'asse z
     * @param {String} comp Componente cliccato
     * @param {Boolean} actv Verifica che lo strumento sia stato abilitato o disabilitato
     */
    changeOrder(comp, actv) {
      var orderComponent = new Map();
      orderComponent.set("send", this.send.posz);
      orderComponent.set("rec", this.rec.posz);
      orderComponent.set("btm", this.btm.posz);
      orderComponent.set("log", this.log.posz);

      const vOld = orderComponent.get(comp);

      if (actv === true) {
        orderComponent.set(comp, 4);
      } else {
        orderComponent.set(comp, 0);
      }

      for (var [key, value] of orderComponent) {
        if (key !== comp && value !== 0) {
          if (actv === true) {
            if (value > vOld) {
              orderComponent.set(key, value - 1);
            }
          } else {
            if (value < vOld) orderComponent.set(key, value + 1);
          }
        }
      }

      this.send.posz = orderComponent.get("send");
      this.rec.posz = orderComponent.get("rec");
      this.btm.posz = orderComponent.get("btm");
      this.log.posz = orderComponent.get("log");

      this.setCookie("send-z", this.send.posz, 30);
      this.setCookie("rec-z", this.rec.posz, 30);
      this.setCookie("btm-z", this.btm.posz, 30);
      this.setCookie("log-z", this.log.posz, 30);
    },
    /**
     * Imposta la connessione con Engine
     */
    setConnection() {
      this.connection = new ReconnectingWebSocket(
        "ws://" + process.env.VUE_APP_ENGINE_SERVER
      );
      /**
       * Elenco di azioni che effettua quando si riceve un messaggio
       */
      this.connection.onmessage = (message) => {
        const text = message.data;
        if (text.includes("##BEGIN-ERROR##")) {
          const startE = text.indexOf("##BEGIN-ERROR##") + "##BEGIN-ERROR##".length;
          const endE = text.lastIndexOf("##END-ERROR##");
          this.changeErrLog(
            "#@ERR-LOGS@#" + timeString(text.substring(startE, endE)) + "#@END-ERR-LOGS@#"
          );
        } else if (text.includes("##BEGIN-PARSER-ERROR##")) {
          const startE = text.indexOf("##BEGIN-PARSER-ERROR##") + "##BEGIN-PARSER-ERROR##".length;
          const endE = text.lastIndexOf("##END-PARSER-ERROR##");
          let textToWrite=text.substring(startE, endE).split(/##END SUB-MESSAGE##[\n]?/g).filter(elem => elem!=="");
          
          //console.log(text.substring(startE, endE))
          //console.log(textToWrite)
          this.arrayLog.logs_parser=[];
          textToWrite.forEach((element)=>{
            this.changeErrLog(
            "#@ERR-LOGS@#" +
              timeString(element) +
              "#@END-ERR-LOGS@#",
            "Parser",false
          );
          })
          
        } else if (text.includes("##BEGIN-IO-WARNING##")) {
          const startE = text.indexOf("##BEGIN-IO-WARNING##") + "##BEGIN-IO-WARNING##".length;
          const endE = text.lastIndexOf("##END-IO-WARNING##");
          let textToWrite=text.substring(startE, endE).split(/##END SUB-WARNING##[\n]?/g).filter(elem => elem!=="");
          textToWrite.forEach((element)=>{
            this.changeWarnLog(
            "#@LOGS@#" +
              timeString(element) +
              "#@END-LOGS@#",
            "IO"
          );
          })
          
        } else if (text.includes("##BEGIN-WARNING-MESSAGE##")) {
          const startE = text.indexOf("##BEGIN-WARNING-MESSAGE##") + "##BEGIN-WARNING-MESSAGE##".length;
          const endE = text.lastIndexOf("##END-WARNING-MESSAGE##");
          let textToWrite=text.substring(startE, endE).split(/##END SUB-WARNING##[\n]?/g).filter(elem => elem!=="");
          textToWrite.forEach((element)=>{
            this.changeWarnLog(
            "#@LOGS@#" +
              timeString(element) +
              "#@END-LOGS@#",
            "Engine"
          );
          })
          
        } else if (text.includes("##ACK##")) {
          this.arrRec.pop();
          this.changeLog(
            "#@LOGS@#" +
              timeString(lang.INDEX.LOG_MESSAGES.BACKTRACK_DONE) +
              "#@END-LOGS@#",
            "Default"
          );
        } else if (text.includes("##BEGIN-COLLECTION##")) {
          const startE =
            text.indexOf("##BEGIN-COLLECTION##") + "##BEGIN-COLLECTION##".length + 1;
          const endE = text.lastIndexOf("##END-COLLECTION##");
          this.changeIRTree(
            "#@TREE-DRAW@#" + text.substring(startE, endE) + "#@END-TREE-DRAW@#"
          );
          this.changeLog(
            "#@LOGS@#" + timeString(lang.INDEX.LOG_MESSAGES.TREE_OPENED.replace("${title}",this.chooseTitle)) + "#@END-LOGS@#",
            "Default"
          );
        } else if (text.includes("##BEGIN-IR-LIST##")) {
          const startE = text.indexOf("##BEGIN-IR-LIST##") + "##BEGIN-IR-LIST##".length;
          const endE = text.lastIndexOf("##END-IR-LIST##");
          this.changeIRList(
            "#@IR-LIST@#" + text.substring(startE, endE) + "#@END-IR-LIST@#"
          );
          
        } else if (text.includes("##SUCCESS##")) {
          this.changeLog(
            "#@LOGS@#" + timeString(lang.INDEX.LOG_MESSAGES.JOB_DONE) + "#@END-LOGS@#",
            "Default"
          );
        } else if (text.includes("##BEGIN-PROCESS##")) {
          const startP =
            text.indexOf("##BEGIN-PROCESS##") + "##BEGIN-PROCESS##".length + 1;
          const endP = text.indexOf("##END-PROCESS##");
          
          this.textRec = text.substring(startP, endP);
          if (text.substring(startP, endP).length > 0) {
            this.textToCommand = this.textRec;
            this.arrRec = this.fromTextRecToArrRec(this.textRec);
            if(!this.rec.selected) this.rec.newMessages = true
            this.sendIRList();
          }
          this.disBtn = false;
          //disconnect();
        } else if (text.includes("##BEGIN-SERVER-CONF##")) {
          const startE =
            text.indexOf("##BEGIN-SERVER-CONF##") + "##BEGIN-SERVER-CONF##".length + 1;
          const endE = text.lastIndexOf("##END-SERVER-CONF##");
          this.changeConfig(text.substring(startE, endE));
          this.firstTimeError = false;
          this.isCrashed = false;
          this.changeLog(
            "#@LOGS@#" +
              timeString(lang.INDEX.LOG_MESSAGES.ENGINE_CONNECTED) +
              "#@END-LOGS@#",
            "Default"
          );
        }
      };

      /**
       * Azione che si effettua quando si chiude la connessione
       */
      this.connection.onclose = () => {
        if (!this.isCrashed) {
          this.changeErrLog(
            "#@ERR-LOGS@#" +
              timeString(lang.INDEX.LOG_MESSAGES.CONNECTION_ENGINE_CRASHED) +
              "\n#@END-ERR-LOGS@#"
          );
          this.isCrashed = true;
          this.isReconnectedAndSended = false;
        }
      };
      /**
       * Azione che si effettua quando si è in presenza di un errore
       */
      this.connection.onerror = (message) => {
        if (!this.firstTimeError) {
          this.changeErrLog(
            "#@ERR-LOGS@#" +
              timeString(message) +
              "\n#@END-ERR-LOGS@#"
          );
          this.firstTimeError = true;
          this.isReconnectedAndSended = false;
        }
      };
    },
    /**
     * @deprecated
     * Ottiene il browser su cui si sta eseguendo l'applicativo
     */
    getBrowser() {
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
    },
    /**
     * Inizializza le dimensioni iniziali delle schede in caso di modalità Portable
     */
    setStartWidth() {
      if (window.innerWidth < 960 && window.innerWidth >= 700) {
        this.send.widthSm = window.innerWidth - 12;
        this.rec.widthSm = window.innerWidth - 12;
        this.log.widthSm = window.innerWidth - 12;
        this.btm.widthSm = window.innerWidth - 12;
      }
    },
    /**
     * Inizializza il form di introduzione, nel caso di primo avvio
     */
    setDialog() {
      if (!this.getCookie("firstDialog")) {
        this.setCookie("firstDialog", "true", 30);
      }
      this.firstDialog = this.getCookie("firstDialog") === "true";
    },
    /**
     * Inizializza il colore dei componenti
     */
    setColor() {
      this.mainColor = this.getCookie("main-color");
      if (!this.mainColor) {
        this.mainColor = "document-color";
        this.setCookie("main-color", "document-color", 30);
      }
      document.documentElement.classList.add(this.mainColor);
    },
    /**
     * Inizializza il tema dell'applicativo
     */
    setTheme() {
      this.themeColor = this.getCookie("theme-color");
      if (this.themeColor === null) {
        this.themeColor = "theme-light";
        this.setCookie("theme-color", "theme-light", 30);
        this.darkMode = false;
      }
      if (this.themeColor === "theme-light") {
        this.darkMode = false;
      } else if (this.themeColor === "theme-dark") {
        this.darkMode = true;
      }
      document.documentElement.classList.add(this.themeColor);
    },
    /**
     * Cambia l'icona della tab.
     * @param {Boolean} newVal Verifica che sia stato inserito un nuovo valore
     */
    changeIcon(newVal) {
      var link =
        document.querySelector("link[rel*='icon']") || document.createElement("link");
      link.rel = "icon";
      if (newVal === true) {
        link.href = window.location.origin + "/wizardAlert.ico";
      } else {
        link.href = window.location.origin + "/favicon.ico";
      }
      document.getElementsByTagName("head")[0].appendChild(link);
    },
    /**
     * Inizializza tutti gli attributi dei singoli componenti mediante cookies.
     */
    loadSettings() {
      this.btm.posx =
        this.getCookie("btm-x") === null ? 4 : parseInt(this.getCookie("btm-x"));
      this.btm.posy =
        this.getCookie("btm-y") === null ? 60 : parseInt(this.getCookie("btm-y"));
      this.btm.width =
        this.getCookie("btm-w") === null ? 400 : parseInt(this.getCookie("btm-w"));
      this.btm.height =
        this.getCookie("btm-h") === null ? 400 : parseInt(this.getCookie("btm-h"));
      this.btm.selected =
        this.getCookie("btm-v") === null ? false : this.getCookie("btm-v") === "true";
      this.btm.posz =
        this.getCookie("btm-z") === null ? 0 : parseInt(this.getCookie("btm-z"));

      this.rec.posx =
        this.getCookie("rec-x") === null ? 4 : parseInt(this.getCookie("rec-x"));
      this.rec.posy =
        this.getCookie("rec-y") === null ? 60 : parseInt(this.getCookie("rec-y"));
      this.rec.width =
        this.getCookie("rec-w") === null ? 400 : parseInt(this.getCookie("rec-w"));
      this.rec.height =
        this.getCookie("rec-h") === null ? 500 : parseInt(this.getCookie("rec-h"));
      this.rec.selected =
        this.getCookie("rec-v") === null ? false : this.getCookie("rec-v") === "true";
      this.rec.posz =
        this.getCookie("rec-z") === null ? 0 : parseInt(this.getCookie("rec-z"));

      this.send.posx =
        this.getCookie("send-x") === null ? 4 : parseInt(this.getCookie("send-x"));
      this.send.posy =
        this.getCookie("send-y") === null ? 60 : parseInt(this.getCookie("send-y"));
      this.send.width =
        this.getCookie("send-w") === null ? 400 : parseInt(this.getCookie("send-w"));
      this.send.height =
        this.getCookie("send-h") === null ? 400 : parseInt(this.getCookie("send-h"));
      this.send.selected =
        this.getCookie("send-v") === null ? false : this.getCookie("send-v") === "true";
      this.send.posz =
        this.getCookie("send-z") === null ? 0 : parseInt(this.getCookie("send-z"));

      this.log.posx =
        this.getCookie("log-x") === null ? 4 : parseInt(this.getCookie("log-x"));
      this.log.posy =
        this.getCookie("log-y") === null ? 60 : parseInt(this.getCookie("log-y"));
      this.log.width =
        this.getCookie("log-w") === null ? 600 : parseInt(this.getCookie("log-w"));
      this.log.height =
        this.getCookie("log-h") === null ? 300 : parseInt(this.getCookie("log-h"));
      this.log.selected =
        this.getCookie("log-v") === null ? false : this.getCookie("log-v") === "true";
      this.log.posz =
        this.getCookie("log-z") === null ? 0 : parseInt(this.getCookie("log-z"));
    },
    /**
     * Imposta a falso la condizione di primo avvio
     */
    setFirstDialog() {
      this.firstDialog = false;
      this.setCookie("firstDialog", "false", 30);
    },
    /**
     * Copia il testo scritto nell'area di testo della scheda di esecuzione.
     * @param {String} text Testo scritto
     */
    shareText(text) {
      this.send.textShare = text;
    },
    /**
     * Imposta i limiti della pagina
     */
    setPositions() {
      if (this.send.posx + this.send.width > document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth - this.send.width - 5 > 4) {
          this.send.posx = document.documentElement.clientWidth - this.send.width - 5;
        }
      }

      if (this.rec.posx + this.rec.width > document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth - this.rec.width - 5 > 4) {
          this.rec.posx = document.documentElement.clientWidth - this.rec.width - 5;
        }
      }

      if (this.log.posx + this.log.width > document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth - this.log.width - 5 > 4) {
          this.log.posx = document.documentElement.clientWidth - this.log.width - 5;
        }
      }

      if (this.btm.posx + this.btm.width > document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth - this.btm.width - 5 > 4) {
          this.btm.posx = document.documentElement.clientWidth - this.btm.width - 5;
        }
      }

      this.setStartWidth();
    },
    /**
     * Mostra il componente selezionato
     * @param {String} component Componente selezionato
     */
    showSheet(component) {
      switch (component) {
        case "send":
          this.send.selected = true;
          this.setCookie("send-v", "true", 30);
          break;
        case "rec":
          this.rec.selected = true;
          this.rec.newMessages = false;
          this.setCookie("rec-v", "true", 30);
          break;
        case "btm":
          this.btm.selected = true;
          this.setCookie("btm-v", "true", 30);
          break;
        case "log":
          this.log.selected = true;
          this.resetCounter("Default");
          this.setCookie("log-v", "true", 30);
          break;
        default:
          alert("Comando non riconosciuto");
      }
      this.changeOrder(component, true);
    },
    /**
     * Nasconde il componente selezionato
     * @param {String} component Componente selezionato
     */
    hideSheet(component) {
      switch (component) {
        case "send":
          this.send.selected = false;
          this.setCookie("send-v", "false", 30);
          break;
        case "rec":
          this.rec.selected = false;
          this.setCookie("rec-v", "false", 30);
          break;
        case "btm":
          this.btm.selected = false;
          this.setCookie("btm-v", "false", 30);
          break;
        case "log":
          this.log.selected = false;
          this.setCookie("log-v", "false", 30);
          break;
        default:
          alert("Comando non riconosciuto");
      }
      this.changeOrder(component, false);
    },
    /**
     * Genera un codice
     * @param {Number} passwordLength Lunghezza del codice da generare.
     * @returns Codice generato
     */
    generatePassword(passwordLength) {
      var numberChars = "0123456789";
      var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var lowerChars = "abcdefghijklmnopqrstuvwxyz";
      var allChars = numberChars + upperChars + lowerChars;
      var randPasswordArray = Array(passwordLength);
      randPasswordArray[0] = numberChars;
      randPasswordArray[1] = upperChars;
      randPasswordArray[2] = lowerChars;
      randPasswordArray = randPasswordArray.fill(allChars, 3);
      return this.shuffleArray(
        randPasswordArray.map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
      ).join("");
    },
    /**
     * Mischia l'array contenente vari caratteri
     * @param {Array} array Array con i caratteri
     * @returns Array mischiato
     */
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    /**
     * Inserisci nel log avviso di temporary collection changed e facoltativamente ir list update.
     * @param {Boolean} IRChange segnala se inserire anche log di aggiornamento ir list.
     */
    signalIRAndTempChange(IRChange=false){
      if(!this.btm.justWarnNewIR){
        let stringLog=''
        if(IRChange){
          stringLog=lang.INDEX.LOG_MESSAGES.IR_LIST_UPDATED +
                        ", " +
                        lang.INDEX.LOG_MESSAGES.TEMP_UPDATED
        }else{
          stringLog=lang.INDEX.LOG_MESSAGES.TEMP_UPDATED
        }
        this.changeLog(
          "#@LOGS@#" +
            timeString(stringLog) +
            "#@END-LOGS@#",
          "Default"
        );
        this.btm.justWarnNewIR=true;
      }
    },
    /**
     * Genera un array di istruzioni da un testo.
     * @param {String} textReceived Testo con le istruzioni.
     * @returns Array con le istruzioni.
     */
    fromTextRecToArrRec(textReceived) {
      var arrIstr = [];
      this.counterRec = 0;
      var arrTest = textReceived.split(/##END INSTRUCTION###[\n]?/g).filter(elem => elem!=="");
      this.textRec="";
      this.btm.justWarnNewIR=false;
      this.btm.tempPresent=true;
      arrTest.forEach((element) => {
        if (!element.startsWith("\n")) {
          element = "\n" + element;
        }
        if (element.startsWith("\n")) {
          element = element.slice(1, element.length);
        }
        if (element.endsWith("\n")) {
          element = element.slice(0, element.length - 1);
          this.textRec+= element.slice(0, element.length - 1)+";\n";
        }
        if (element.match(/GET COLLECTION/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". GET COLLECTION",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/SAVE AS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". SAVE AS",
            value: element,
          });
          this.signalIRAndTempChange(true)
        } /*else if (element.match(/SPATIAL JOIN OF COLLECTIONS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". SPATIAL JOIN OF COLLECTIONS",
            value: element,
          });
        } */else if (element.match(/JOIN OF COLLECTIONS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". JOIN OF COLLECTIONS",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/FILTER/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". FILTER",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/GROUP/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". GROUP",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/EXPAND/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". EXPAND",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/MERGE COLLECTIONS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". MERGE COLLECTIONS",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/INTERSECT COLLECTIONS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". INTERSECT COLLECTIONS",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/SUBTRACT COLLECTIONS/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". SUBTRACT COLLECTIONS",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/USE DB/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". USE DB",
            value: element,
          });
        } else if (element.match(/TRAJECTORY MATCHING/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". TRAJECTORY MATCHING",
            value: element,
          });
          this.signalIRAndTempChange()
        } else if (element.match(/CREATE_FO/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". CREATE FUZZY OPERATOR",
            value: element,
          });
        } else if (element.match(/CREATE_JF/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". CREATE JAVASCRIPT FUNCTION",
            value: element,
          });
        } else if (element.match(/GET DICTIONARY/gi)) {
          arrIstr.push({
            name: this.counterRec + 1 + ". GET DICTIONARY",
            value: element,
          });
        }
        this.counterRec += 1;
      });
      return arrIstr;
    },
    /**
     * Richiama la funzione changeOrder
     * @param {String} tipo Componente selezionato
     */
    setZ(tipo) {
      this.changeOrder(tipo, true);
    },
    /**
     * Imposta gli attributi di Rec in modo sincrono nella fase di resize
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     * @param {Number} width Largezza componente
     * @param {Number} height Altezza componente
     */
    onResizeStopRec(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.rec.posx = x;
      this.rec.posy = y;
      this.rec.width = width;
      this.rec.height = height;
      this.setZ("rec");
    },
    /**
     * Imposta gli attributi di Rec in modo sincrono nella fase di drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
    onDragStopRec(x, y) {
      this.rec.posx = x;
      this.rec.posy = y;
      this.setZ("rec");
    },
    /**
     * Imposta gli attributi di Rec in modo sincrono nelle fasi di resize e drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
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

      this.setCookie("rec-x", this.rec.posx, 30);
      this.setCookie("rec-y", this.rec.posy, 30);
      this.setCookie("rec-w", this.rec.width, 30);
      this.setCookie("rec-h", this.rec.height, 30);
    },
    /**
     * Imposta gli attributi di Send in modo sincrono nella fase di resize
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     * @param {Number} width Largezza componente
     * @param {Number} height Altezza componente
     */
    onResizeStopSend(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.send.posx = x;
      this.send.posy = y;
      this.send.width = width;
      this.send.height = height;
      this.setZ("send");
    },
    /**
     * Imposta gli attributi di Send in modo sincrono nella fase di drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
    onDragStopSend(x, y) {
      this.send.posx = x;
      this.send.posy = y;
      this.setZ("send");
    },
    /**
     * Imposta gli attributi di Send in modo sincrono nelle fasi di resize e drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
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

      this.setCookie("send-x", this.send.posx, 30);
      this.setCookie("send-y", this.send.posy, 30);
      this.setCookie("send-w", this.send.width, 30);
      this.setCookie("send-h", this.send.height, 30);
    },
    /**
     * Imposta gli attributi di Btm in modo sincrono nella fase di resize
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     * @param {Number} width Largezza componente
     * @param {Number} height Altezza componente
     */
    onResizeStopBtm(handle, x, y, width, height) {
      // eslint-disable-line no-unused-vars
      this.btm.posx = x;
      this.btm.posy = y;
      this.btm.width = width;
      this.btm.height = height;
      this.setZ("btm");
    },
    /**
     * Imposta gli attributi di Btm in modo sincrono nella fase di drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
    onDragStopBtm(x, y) {
      this.btm.posx = x;
      this.btm.posy = y;
      this.setZ("btm");
    },
    /**
     * Imposta gli attributi di Btm in modo sincrono nelle fasi di resize e drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
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

      this.setCookie("btm-x", this.btm.posx, 30);
      this.setCookie("btm-y", this.btm.posy, 30);
      this.setCookie("btm-w", this.btm.width, 30);
      this.setCookie("btm-h", this.btm.height, 30);
    },
    /**
     * Imposta gli attributi di Log in modo sincrono nella fase di resize
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     * @param {Number} width Largezza componente
     * @param {Number} height Altezza componente
     */
    onResizeStopLog(handle, x, y, width, height) {
      this.log.posx = x;
      this.log.posy = y;
      this.log.width = width;
      this.log.height = height;
      this.setZ("log");
    },
    /**
     * Imposta gli attributi di Log in modo sincrono nella fase di drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
    onDragStopLog(x, y) {
      this.log.posx = x;
      this.log.posy = y;
      this.setZ("log");
    },
    /**
     * Imposta gli attributi di Log in modo sincrono nelle fasi di resize e drag
     * @param {Number} x Posizione relativa all'esse x
     * @param {Number} y Posizione relativa all'esse y
     */
    onModLog(x, y) {
      if (x < 4) {
        this.log.posx = 4;
      } else {
        this.log.posx = x;
      }
      if (y < 60) {
        this.log.posy = 60;
      } else {
        this.log.posy = y;
      }

      this.setCookie("log-x", this.log.posx, 30);
      this.setCookie("log-y", this.log.posy, 30);
      this.setCookie("log-w", this.log.width, 30);
      this.setCookie("log-h", this.log.height, 30);
    },
    /**
     * Invia un messaggio per segnalare il cambio di colore
     */
    signalChangeColor() {
      this.connectionPage.send("CHANGE_COLOR###" + this.mainColor);
    },
    /**
     * Imposta il colore principale del documento HTML
     * @param {String} color Colore selezionato 
     */
    setMainColor(color) {
      document.documentElement.classList.replace(this.mainColor, color);
      this.mainColor = color;
      this.setCookie("main-color", color, 30);
      this.signalChangeColor();
    },
    /**
     * Imposta il tema principale del documento HTML
     * @param {String} theme Tema selezionato
     */
    setThemeColor(theme) {
      document.documentElement.classList.replace(this.themeColor, theme);
      this.themeColor = theme;
      if (theme == "theme-dark") {
        this.darkMode = true;
      } else {
        this.darkMode = false;
      }
      this.setCookie("theme-color", theme, 30);
      this.signalChangeColor();
    },
    /**
     * Imposta un generico cookie
     * @param {String} name Nome del cookie
     * @param {String} value Valore del cookie inserito
     * @param {Number} daysToLive Giorni di mantenimento del cookie
     */
    setCookie(name, value, daysToLive) {
      var cookie = name + "=" + encodeURIComponent(value);
      if (typeof daysToLive === "number") {
        cookie += ";SameSite=Lax; max-age=" + daysToLive * 24 * 60 * 60;
        document.cookie = cookie;
      }
    },
    /**
     * Ottiene il valore del cookie considerato
     * @param {String} name Nome del cookie selezionato
     */
    getCookie(name) {
      var cookieArr = document.cookie.split(";");
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    },
    /**
     * Cambia la configurazione in ingresso
     * @param {String} textToChange Configurazione
     */
    changeConfig(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.received.textConf = JSONInPrettyFormat;
      } else {
        this.received.textConf = textToChange;
      }
    },
    /**
     * Cambia la collezione del documento
     * @param {String} textToChange Collezione
     */
    changeIRTree(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.generatePage(JSONInPrettyFormat);
      } else {
        let startE = textToChange.indexOf("#@TREE-DRAW@#") + "#@TREE-DRAW@#".length;
        let endE = textToChange.indexOf("###");
        let title = textToChange.substring(startE, endE);
        this.chooseTitle=title;
        if (title == "~~CurrentDoc~Alias~~") title = "Temporary Collection";
        startE = endE + '  { "documents" : '.length;
        endE = textToChange.lastIndexOf("#@END-TREE-DRAW@#") - 3;
        let textConv = textToChange.substring(startE, endE);
        textConv = textConv
          .replace(/POINT /g, '{\n\t\t"type" : "POINT",\n\t\t"coordinates":"')
          .replaceAll(")", ')"\n\t}');
        this.generatePage(title, textConv);
      }
    },
    /**
     * Cambia la lista delle collezioni
     * @param {String} textToChange Lista delle collezioni
     */
    changeIRList(textToChange) {
      if (textToChange.startsWith("{")) {
        var parseJSON = JSON.parse(textToChange);
        var JSONInPrettyFormat = JSON.stringify(parseJSON, undefined, 4);
        this.received.listIRCol = JSONInPrettyFormat;
      } else {
        this.received.listIRCol = [];
        const startE = textToChange.indexOf("IRList") + 'IRList":'.length;
        const endE = textToChange.lastIndexOf("#@END-IR-LIST@#") - 2;
        var textChanged = textToChange.substring(startE, endE);
        var json_data = JSON.parse(textChanged);
        for (var i in json_data) this.received.listIRCol.push(json_data[i]);
      }
    },
    /**
     * Genera la pagina per la visione della collezione
     * @param {String} title Titolo della collezione
     * @param {String} textToSend Collezione
     */
    generatePage(title, textToSend) {
      let dateGen = new Date();
      let millis = dateGen.getTime();
  
      this.connectionPage.send(
        "SAVE###" +
          "textTree_" +
          millis +
          "###" +
          JSON.stringify({
            datetime: dateGen.toISOString(),
            name: title,
            tree: textToSend,
          })
      );
      this.received.errorConfig = "";
      sessionStorage.setItem(
        "textTree_" + millis,
        JSON.stringify({ datetime: dateGen.toISOString(), name: title })
      );
      let routeData = this.$router.resolve({
        name: "StaticTree",
        query: { id: millis, idUser: this.randomNumber },
      });
      setTimeout(function () {
        window.open(routeData.href, "_blank");
      }, 1000);
      //};
    },
    /**
     * Inizializza la connessione con il servizio
     */
    startServer() {
      
      this.randomNumber = this.generatePassword(50);
      this.connectionPage = new WebSocket(
        "ws://" + window.location.hostname +":"+process.env.VUE_APP_WEB_SOCKET_SERVER_PORT,
        this.randomNumber
      );
      this.connectionPage.onopen = () => {
        this.changeLog(
          "#@LOGS@#" +
            timeString(lang.INDEX.LOG_MESSAGES.WEB_SOCKET_SERVER_CONNECTED) +
            "#@END-LOGS@#",
          "Default"
        );
        this.isWebCrashed=false;
      };
      this.connectionPage.onclose = () => {
        this.changeErrLog(
          "#@ERR-LOGS@#" +
            timeString(lang.INDEX.LOG_MESSAGES.WEB_SOCKET_SERVER_DISCONNECTED) +
            "#@END-ERR-LOGS@#",
          "Default"
        );
        this.isWebCrashed=true;
      };
      this.connectionPage.onerror = () => {
        this.changeErrLog(
          "#@ERR-LOGS@#" +
            timeString(lang.INDEX.LOG_MESSAGES.WEB_SOCKET_SERVER_ERROR) +
            "#@END-ERR-LOGS@#"
        );
      };
      this.connectionPage.onmessage = ({ data }) => {
        let command = data.split("###")[0];
        if (command == "WIZARD") {
          if (data.split("###")[1] == this.randomNumber) {
            let typeUpdate = data.split("###")[2];
            this.textWizard = data.split("###")[3];
            this.textToCommand =
              typeUpdate + "###" + this.textWizard + "###" + Date.now();
            this.wizardAlert = true;
          }
        }
      };
    },
    /**
     * Inserisce un nuovo messaggio di log relativo ad un errore
     * @param {String} textToChange Testo del messaggio
     * @param {String} cat Categoria del messaggio
     * @param {Boolean} alert Abilita un alert
     */
    changeErrLog(textToChange, cat,alert) {
      const startE = textToChange.indexOf("#@ERR-LOGS@#") + "#@ERR-LOGS@#".length;
      const endE = textToChange.lastIndexOf("#@END-ERR-LOGS@#");
      this.newLog(textToChange.substring(startE, endE), "ERR", cat);
      this.received.textLog += textToChange.substring(startE, endE);
      if(alert || alert===null) alert(textToChange.substring(startE, endE));
    },
    /**
     * Inserisce un nuovo messaggio di log relativo ad un warn
     * @param {String} textToChange Testo del messaggio
     * @param {String} cat Categoria del messaggio
     */
    changeWarnLog(textToChange, cat) {
      const startE = textToChange.indexOf("#@WARN-LOGS@#") + "#@WARN-LOGS@#".length;
      const endE = textToChange.lastIndexOf("#@END-WARN-LOGS@#");
      this.newLog(textToChange.substring(startE, endE), "WARN", cat);
      this.received.textLog += textToChange.substring(startE, endE);
    },
    /**
     * Inserisce un nuovo messaggio di log
     * @param {String} textToChange Testo del messaggio
     * @param {String} cat Categoria del messaggio
     */
    changeLog(textToChange, cat) {
      const startE = textToChange.indexOf("#@LOGS@#") + "#@LOGS@#".length;
      const endE = textToChange.lastIndexOf("#@END-LOGS@#");
      this.newLog(textToChange.substring(startE, endE), "LOG", cat);
      this.received.textLog += textToChange.substring(startE, endE);
    },
    /**
     * Invia una richiesta di configurazione
     * @param {String} textSend NUova configurazione
     */
    sendConfigFile(textSend) {
      if (textSend.length > 0) {
        this.connection.send(
          "##ADD-SERVER-CONF##\n" + textSend + "\n##ADD-SERVER-CONF##"
        );
      }
    },
    /**
     * Apre una finestra di caricamento per una nuova configurazione
     */
    uploadConfig() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        document.getElementById("file_config").click();
      }
    },
    /**
     * Invia l'istruzione di BackTrack
     */
    sendBck() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        this.connection.send("##BACKTRACK##");
      }
    },
    /**
     * Invia l'istruzione per ottenere la collezione temporanea
     */
    sendIRTempCol() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        this.connection.send("##GET-TEMPORARY-COLLECTION##");
      }
    },
    /**
     * Invia l'istruzione per ottenere la collezione selezionata
     * @param {String} selectedItem Collezione selezionata
     */
    sendIRSelCol(selectedItem) {
      if (selectedItem != "") {
        this.connection.send(
          "##GET-IR-COLLECTION##\n" + selectedItem + "\n##END-IR-COLLECTION##"
        );
      }
    },
    /**
     * Invia l'istruzione per ottenere la lista delle collezioni
     */
    sendIRList() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        this.connection.send("##GET-IR-LIST##");
      }
    },
    /**
     * Apre lo strumento di wizard in una nuova tab
     */
    openWizard() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        let routeData = this.$router.resolve({
          name: "Wizard",
          query: {
            id: this.randomNumber,
          },
        });
        setTimeout(function () {
          window.open(routeData.href, "_blank");
        }, 50);
      }
    },
    /**
     * Salva le istruzioni eseguite
     * @param {String} textToSave Istruzioni da salvare
     */
    saveIstructions(textToSave) {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        let filename = textToSave.split("##SAVE####")[0];
        let text = textToSave.split("##SAVE####")[1];
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }
    },
    /**
     * Invia un messaggio all'Engine
     * @param {String} textSend Istruzioni da eseguire
     */
    sendMsg(textSend) {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        if (textSend.length > 0) {
          this.connection.send("##BEGIN-PROCESS##\n" + textSend + "\n##END-PROCESS##");
          this.isReconnectedAndSended = true;
        }
      }
    },
    
    /**
     * Apre un suggerimento sulla base di una pressione duratura
     * @param {String} stringMessage Avviso o suggerimento da mostrare
     */
    longClickEvent(stringMessage) {
      let message = stringMessage.split("###")[1];
      this.wizardAlertHint = false;
      this.lblPopup = message;
      this.wizardAlertHint = true;
    },
  },
};
</script>

<style scoped>
::v-deep .col > span.v-badge > span.v-badge__wrapper > span.v-badge__badge{
  inset: auto auto calc(100% - 22px) calc(100% - 16px) !important
}
#title {
  display: inline-block;
  justify-content: center;
  margin-left: 8px;
  color: var(--border-color);
}
#settings {
  text-align: right;
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
  width: 120px;
  background-color: var(--border-color);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  left: 50%;
  margin-left: -180px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.btnstyle {
  border-radius: 4px;
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

:root {
  --border-color: #0b77b8;
  --bg-color: #0b77b8;
  --textarea-color: black;
}

:root.document-color {
  --border-color: #0b77b8;
  --bg-color: #0b77b8;
  --textarea-color: black;
}

:root.red {
  --border-color: #d50000;
  --bg-color: #d50000;
  --textarea-color: red;
}

:root.pink {
  --border-color: #c51162;
  --bg-color: #c51162;
  --textarea-color: pink;
}

:root.cyan {
  --border-color: #00b8d4;
  --bg-color: #00b8d4;
  --textarea-color: cyan;
}

:root.teal {
  --border-color: #00bfa5;
  --bg-color: #00bfa5;
  --textarea-color: teal;
}

:root.green {
  --border-color: #00c853;
  --bg-color: #00c853;
  --textarea-color: green;
}

:root.light-green {
  --border-color: #64dd17;
  --bg-color: #64dd17;
  --textarea-color: light-green;
}

:root.amber {
  --border-color: #ffab00;
  --bg-color: #ffab00;
  --textarea-color: amber;
}

:root.orange {
  --border-color: #ff6d00;
  --bg-color: #ff6d00;
  --textarea-color: orange;
}

:root.deep-orange {
  --border-color: #dd2c00;
  --bg-color: #dd2c00;
  --textarea-color: deep-orange;
}

:root.theme-light {
  --bg-theme-color: #fdfdfd;
  --bg-div-color: #ffffff;
}

:root.theme-dark {
  --bg-theme-color: #1e1e1e;
  --bg-div-color: #1e1e1e;
}

.topbar {
  height: 30px;
  border-color: var(--border-color);
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  color: #fff;
}

.moderndesign {
  color: var(--border-color);
}

.v-text-field__details {
  display: none;
}

.v-input__slot {
  margin-bottom: 0px;
}

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
  width: 3px;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  left: -3px;
  cursor: w-resize;
}
.handle-mr {
  width: 3px;
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
