<template>
  <v-sheet :dark="darkMode" :light="!darkMode" elevation="17" id="recDiv" class="divstyle">
    <v-sheet
      :dark="darkMode" :light="!darkMode"
      style="
        border-bottom: 1px solid #dddddd;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      "
      elevation="14"
      class="topbar"
      @click="$emit('set-z-click', 'send')"
    >
      <h4
        class="noselect moderndesign"
        style="float: left; margin-left: 10px; margin-top: 2px"
      >
        {{ TITLE }}
      </h4>
      <v-icon
        color="red darken-4"
        style="float: right; margin-right: 5px; margin-top: 2px"
        @click="closeWindow()"
        >mdi-close</v-icon
      >
    </v-sheet>
    <v-sheet
      :dark="darkMode" :light="!darkMode"
      style="border-top-left-radius: 3px; border-top-right-radius: 3px"
    >
      <v-container
        fluid
        style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px"
      >
        <v-row align="center">
          <v-col :cols="dimCols(1)">
            <v-textarea
              outlined
              :dark="darkMode" :light="!darkMode"
              id="div_send"
              :height="height - diffHeight()"
              no-resize
              v-model="textSend"
              @keydown="sendMessageKeyboard($event)"
            ></v-textarea>
          </v-col>
          <v-divider v-if="dividerBool()" vertical></v-divider>
          <v-col :cols="dimCols(2)">
            <v-row align="center" class="text-center">
              <v-col cols="6">
                <v-btn
                  id="btnWizard"
                  v-if="ratioMode() === 'small'"
                  :disabled="this.serviceCrash"
                  :dark="darkMode" :light="!darkMode"
                  :width="(width - 48) / 2"
                  color="var(--border-color)"
                  class="tooltip btnstyle"
                  style="color: white"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  @click="openWizard()"
                  v-on:mousedown="addMouseDownEventWizard()"
                >
                  <v-icon>{{ BTN_WIZARD }}</v-icon>
                  <span>{{ BTN_SPAN_WIZARD }}</span>
                </v-btn>
                <v-sheet
                  v-if="ratioMode() !== 'small'"
                  :dark="darkMode" :light="!darkMode"
                  :height="(height - 80) / 2"
                >
                  <v-btn
                    id="btnExecute"
                    v-if="ratioMode() === 'medium'"
                    @mouseenter="changeTitle('Execute')"
                    @mouseleave="title = defaultTitle"
                    :loading="exec"
                    :disabled="this.engineCrash"
                    :width="width / 6 - 24"
                    :height="width / 6 - 24"
                    x-large
                    class="tooltip btnstyle"
                    tile
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -45%);
                    "
                    fab
                    depressed
                    elevation="5"
                    @click="sendMessageArr()"
                    @mousedown="addMouseDownEventExecute()"
                  >
                    <v-icon color="white" :size="width / 15">{{ BTN_EXECUTE }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnExecute"
                    v-if="ratioMode() === 'big'"
                    :disabled="this.engineCrash"
                    :loading="exec"
                    :width="width / 6 - 24"
                    x-large
                    class="tooltip btnstyle"
                    tile
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -40%);
                    "
                    fab
                    depressed
                    elevation="5"
                    @click="sendMessageArr()"
                    @mousedown="addMouseDownEventExecute()"
                  >
                    <v-icon color="white">{{ BTN_EXECUTE }}</v-icon>
                    <span>{{ BTN_SPAN_EXECUTE }}</span>
                  </v-btn>
                </v-sheet>
              </v-col>
              <v-col v-if="ratioMode() === 'small'" cols="6">
                <v-btn
                  id="btnExecute"
                  :dark="darkMode" :light="!darkMode"
                  :disabled="this.engineCrash"
                  :loading="exec"
                  :width="(width - 48) / 2"
                  class="tooltip btnstyle"
                  style="color: white; background-color: var(--border-color)"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  @click="sendMessageArr()"
                  @mousedown="addMouseDownEventExecute()"
                >
                  <v-icon color="white">{{ BTN_EXECUTE }}</v-icon>
                  <span style="color: white">{{ BTN_SPAN_EXECUTE }}</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="ratioMode() !== 'small'" align="center">
              <v-col>
                <v-sheet :dark="darkMode" :light="!darkMode" :height="(height - 80) / 2">
                  <v-btn
                    id="btnWizard"
                    v-if="ratioMode() === 'medium'"
                    :disabled="this.serviceCrash"
                    @mouseenter="changeTitle('Wizard')"
                    @mouseleave="title = defaultTitle"
                    :width="width / 6 - 24"
                    :height="width / 6 - 24"
                    x-large
                    class="tooltip btnstyle"
                    tile
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -55%);
                    "
                    fab
                    depressed
                    elevation="5"
                    @click="openWizard()"
                    @mousedown="addMouseDownEventWizard()"
                  >
                    <v-icon color="white" :size="width / 20">{{ BTN_WIZARD }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnWizard"
                    :disabled="this.serviceCrash"
                    v-if="ratioMode() === 'big'"
                    :width="width / 6 - 24"
                    x-large
                    class="tooltip btnstyle"
                    tile
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -60%);
                    "
                    fab
                    depressed
                    elevation="5"
                    @click="openWizard()"
                    @mousedown="addMouseDownEventWizard()"
                  >
                    <v-icon color="white">{{ BTN_WIZARD }}</v-icon>
                    <span>{{ BTN_SPAN_WIZARD }}</span>
                  </v-btn>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script>
import lang from "../env/lang.en";
import icon from "../env/icon";
export default {
  name: "IndexSend",
  data() {
    return {
      overlay: false,
      textSend: "",
      exec: false,
      defaultTitle: "Command",
      title: "Command",
      //ADD
      timerId: null,
      isLongClick: false,

      //LABEL
      TITLE: lang.SEND_COMP.TITLE,
      BTN_SPAN_EXECUTE: lang.SEND_COMP.BTN_SPAN_EXECUTE,
      BTN_SPAN_WIZARD: lang.SEND_COMP.BTN_SPAN_WIZARD,
      HINT_EXECUTE: lang.SEND_COMP.HINT_EXECUTE,
      HINT_WIZARD: lang.SEND_COMP.HINT_WIZARD,

      //ICON
      BTN_EXECUTE: icon.SEND.BTN_EXECUTE,
      BTN_WIZARD: icon.SEND.BTN_WIZARD,
    };
  },
  props: {
    height: Number,
    randomNumberString: String,
    width: Number,
    browser: String,
    rapporto: Number,
    textRec: String,
    darkMode: Boolean,
    outlined: Boolean,
    textShare: String,
    engineCrash:Boolean,
    serviceCrash:Boolean
  },
  watch: {
    textRec: function (newVal) {
      this.changeText(newVal);
    },
    textSend: function (newVal) {
      this.$emit("share-text", newVal);
    },
    textShare: function (newVal) {
      this.textSend = newVal;
    },
  },
  mounted() {
    this.textSend = this.textShare;
  },
  methods: {
    /**
     * Ritorna la dimensione delle colonne
     * @param {Number} numCol Numero di colonne presenti
     * @returns Dimensione colonna
     */
    dimCols(numCol) {
      if (numCol === 1) {
        if (this.rapporto < 3 / 2) return 12;
        else return 10;
      } else {
        if (this.rapporto < 3 / 2) return 12;
        else return 2;
      }
    },
    /**
     * Indica se è presente un divisiore
     * @returns true/false
     */
    dividerBool() {
      if (this.rapporto < 3 / 2) return false;
      else return true;
    },
    /**
     * Ritorna il rapporto
     * @param {Number} valRapporto Valore del rapporto
     * @returns Rapporto
     */
    ratioMode() {
      if (this.rapporto < 3 / 2) return "small";
      else if (this.rapporto >= 3 / 2 && this.rapporto < 5 / 2) return "medium";
      else return "big";
    },
    /**
     * Ritorna l'altezza del componente
     * @returns Altezza componente
     */
    diffHeight() {
      if (this.rapporto < 3 / 2) return 136;
      else return 56;
    },
    /**
     * Modifica il valore dell'area di testo
     * @param {String} value Testo contenente il messaggio e la modalità di passaggio delle informazioni
     */
    changeText(value) {
      
      if (value.includes('##END INSTRUCTION###')) {
        this.removeOk(value);
      } else {
        var typeUpdate = value.split("###")[0];
        var textWizard = value.split("###")[1];
        if (typeUpdate == "RESET")
          this.textSend = textWizard.replace(/(<([^>]+)>)/gi, "\n");
        if (typeUpdate == "APPEND") {
          if (this.textSend.endsWith("\n") || this.textSend == "") {
            this.textSend += textWizard.replace(/(<([^>]+)>)/gi, "\n");
          } else {
            this.textSend += "\n" + textWizard.replace(/(<([^>]+)>)/gi, "\n");
          }
        }
      }
    },
    /**
     * Invia il messaggio tramite combinazione di tasti
     * @param {KeyboardEvent} event Evento di pressione dei tasti
     */
    sendMessageKeyboard(event){
      // CTRL + invio combo
      if (event.ctrlKey && event.key === "Enter") {
        this.sendMessageArr();
      }
    },
    /**
     * Cancella il testo contenuto nel componente di esecuzione
     * @param {String} newVal valore del testo ricevuto
     */
    removeOk(newVal) {
      this.exec = true;
      //Parole della risposta assegnata
      var arrResponse = newVal.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
      //Righe della textarea
      var arrRowText = this.textSend.split(/(?:\r\n|\r|\n)/g);
      this.textSend = "";
      var contResponse = 0;
      arrRowText.forEach((element) => {
        var arrWORDSofHTML = element.split(" ");
        var check = true;
        var contHTML = 0;
        while (contHTML < arrWORDSofHTML.length && check === false) {
          if (arrWORDSofHTML[contHTML] !== arrResponse[contResponse]) {
            check = false;
          }
          contHTML++;
          contResponse++;
        }
        if (check === false) {
          this.textSend += element;
        }
      });
      this.exec = false;
    },
    
    /**
     * Invio dell'evento di apertura wizard
     */
    openWizard() {
      if(!this.isLongClick){
        clearTimeout(this.timerId)
        this.$emit("open-wizard");
      }
    },
    
    /**
     * Invio dell'evento di invio 
     */
    sendMessageArr() {
      if(!this.isLongClick){
        clearTimeout(this.timerId)
        this.$emit("click-send", this.textSend);
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
     * Invia un segnale per la chiusura della scheda
     */
    closeWindow() {
      this.$emit("close-send");
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante Execute
     */
    addMouseDownEventExecute() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnExecute',this.HINT_EXECUTE);
      };
      this.timerId = setTimeout(fn, 500);
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante Wizard
     */
    addMouseDownEventWizard() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnWizard',this.HINT_WIZARD);
      };
      this.timerId = setTimeout(fn, 500);
    },
    /**
     * Apre un suggerimento sulla base di una pressione duratura
     * @param {String} id Identificativo del compomente premuto
     * @param {String} msg Avviso o suggerimento da mostrare
     */
    longClickFunction(id,msg){
      this.isLongClick = true
      clearTimeout(this.timerId)
      this.$emit("long-click", id + "###" + msg);
    }
  },
};
</script>

<style scoped>
#sendDiv {
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

::v-deep #div_send {
  margin-top: 0px;
  line-height: 1.25rem;
}

::v-deep fieldset {
  padding-left: 0px !important;
  z-index: 45 !important;
  border: 1px solid var(--border-color) !important;
  transition-duration: 0ms !important;
}

::v-deep fieldset:hover {
  padding-left: 0px !important;
  z-index: 45 !important;
  border: 1px solid var(--border-color) !important;
  transition-duration: 0ms !important;
}

::v-deep fieldset:focus {
  padding-left: 0px !important;
  z-index: 45 !important;
  border: 1px solid var(--border-color) !important;
  transition-duration: 0ms !important;
}

::v-deep .v-input__slot {
  padding-left: 4px !important;
  padding-right: 14px !important;
  transition-duration: 0ms !important;
}

::v-deep .v-text-field__slot {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}

@media screen and (max-width: 1263px) {
  #div_send {
    font-size: 14px;
  }
}

@media screen and (min-width: 1264px) and (max-width: 1903px) {
  #div_send {
    font-size: 16px;
  }
}

@media screen and (min-width: 1904px) {
  #div_send {
    font-size: 18px;
  }
}
</style>
