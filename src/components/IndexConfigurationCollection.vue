<template>
  <v-sheet :dark="darkMode" :light="!darkMode" elevation="17" id="recDiv" class="divstyle">
    <v-sheet
      :dark="darkMode" :light="!darkMode"
      elevation="14"
      class="topbar"
      @click="$emit('set-z-click', 'btm')"
    >
      <h4 class="noselect moderndesign header_topbar">{{ TITLE }}</h4>
      <v-icon color="red darken-4" class="icon_topbar" @click="closeWindow()"
        >mdi-close</v-icon
      >
    </v-sheet>
    <v-sheet id="sheet_container" :dark="darkMode" :light="!darkMode">
      <v-container id="container" fluid>
        <v-row align="center" class="text-center">
          <v-col v-if="conf" :cols="dimCols(1)">
            <v-textarea
              class="pb-2"
              readonly
              outlined
              :dark="darkMode" :light="!darkMode"
              id="div_send"
              :height="height - diffHeightConf()"
              no-resize
              color="var(--border-color)"
              v-model="bottomText.textConf"
            ></v-textarea>
            <input type="file" id="file_config" @change="loadFile()" />
            <v-btn block height="32px" @click="uploadConf()" :disabled="engineCrash">
              <v-icon small left>{{ BTN_UPLOAD_CONFIG }}</v-icon>
              <span>{{ BTN_SPAN_UPLOAD }}</span>
            </v-btn>
          </v-col>
          <v-col v-if="ispectstate" :cols="dimCols(1)">
            <v-sheet :dark="darkMode" :light="!darkMode" id="div_send" :height="height - diffHeightColl()">
              <v-list :dark="darkMode" :light="!darkMode" class="pa-0">
                <template v-for="(coll, index) in bottomText.listIRCol">
                <v-list-item :key="coll">
                  <template>
                  <v-list-item-avatar>
                    <v-icon style="background-color: var(--border-color)" color="white">
                      {{ LIST_IR_ITEM }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="coll"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      :disabled="!reconnectSended || serviceCrash"
                      icon
                      outlined
                      @click="
                        numDepth = 1;
                        $emit('click-irc', coll);
                      "
                      color="var(--border-color)"
                    >
                      <span>IR</span>
                    </v-btn>
                  </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < bottomText.listIRCol.length - 1"
                  :key="index"
                ></v-divider>
                </template>
              </v-list>
            </v-sheet>
            <v-btn
              class="tooltip btnstyle"
              block
              height="32px"
              :disabled="
                !this.irPressed ||
                (this.bottomText.listIRCol.length < 1 ||
                this.bottomText.listIRCol == undefined ) && !tempPresent
                || !reconnectSended || serviceCrash
              "
              @click="
                numDepth = 1;
                $emit('click-tc');
              "
            >
              <v-icon small left>{{ BTN_TEMP_COLLECTION }}</v-icon>
              {{ BTN_TEMPORARY_COLL }}
            </v-btn>
          </v-col>
          <v-divider v-if="dividerBool()" vertical></v-divider>
          <v-col :cols="dimCols(2)">
            <v-row align="center">
              <v-col :cols="dimColsBtn()">
                <v-btn
                  id="btnConfig"
                  v-if="ratioMode() === 'small'"
                  :width="width / 2 - 24"
                  class="tooltip btnstyle"
                  style="color: white; background-color: var(--border-color)"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  @click="setConf()"
                  @mousedown="addMouseDownEventConfig()"
                >
                  <v-icon small>{{ BTN_CONFIGURATION }}</v-icon>
                  <span>{{ BTN_SPAN_CONFIG_SHORT }}</span>
                </v-btn>
                <v-sheet
                  v-if="ratioMode() !== 'small'"
                  :dark="darkMode" :light="!darkMode"
                  :height="(height - 80) / 2"
                >
                  <v-btn
                    id="btnConfig"
                    v-if="ratioMode() === 'medium'"
                    @mouseenter="changeTitle(BTN_SPAN_CONFIG_FULL)"
                    @mouseleave="title = defaultTitle"
                    :width="width / 6 - 24"
                    :height="width / 6 - 24"
                    class="tooltip btnstyle"
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -45%);
                    "
                    tile
                    fab
                    depressed
                    elevation="5"
                    raised
                    @click="setConf()"
                    @mousedown="addMouseDownEventConfig()"
                  >
                    <v-icon :size="width / 20">{{ BTN_CONFIGURATION }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnConfig"
                    v-if="ratioMode() === 'big'"
                    @mouseenter="changeTitle(BTN_SPAN_COLL_FULL)"
                    @mouseleave="title = defaultTitle"
                    :width="width / 6 - 24"
                    class="tooltip btnstyle"
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -40%);
                    "
                    tile
                    fab
                    depressed
                    elevation="5"
                    raised
                    @click="setConf()"
                    @mousedown="addMouseDownEventConfig()"
                  >
                    <v-icon small>{{ BTN_CONFIGURATION }}</v-icon>
                    <span>{{ BTN_SPAN_CONFIG_SHORT }}</span>
                  </v-btn>
                </v-sheet>
              </v-col>
              <v-col :cols="dimColsBtn()">
                <v-btn
                  id="btnCollections"
                  v-if="ratioMode() === 'small'"
                  :disabled="engineCrash"
                  :width="width / 2 - 24"
                  class="tooltip btnstyle"
                  style="color: white; background-color: var(--border-color)"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  @click="
                    irPressed = true;
                    setIR();
                    $emit('click-ir');
                  "
                  @mousedown="addMouseDownEventCollection()"
                >
                  <v-icon small>{{ BTN_IR_COLLECTIONS }}</v-icon>
                  <span>{{ BTN_SPAN_IR_REQUEST }}</span>
                </v-btn>
                <v-sheet
                  v-if="ratioMode() !== 'small'"
                  :dark="darkMode" :light="!darkMode"
                  :height="(height - 80) / 2"
                >
                  <v-btn
                    id="btnCollections"
                    v-if="ratioMode() === 'medium'"
                    :disabled="engineCrash"
                    @mouseenter="changeTitle(BTN_SPAN_COLL_FULL)"
                    @mouseleave="title = defaultTitle"
                    :width="width / 6 - 24"
                    :height="width / 6 - 24"
                    class="tooltip btnstyle"
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -55%);
                    "
                    tile
                    fab
                    depressed
                    elevation="5"
                    raised
                    @click="
                      irPressed = true;
                      setIR();
                      $emit('click-ir');
                    "
                    @mousedown="addMouseDownEventCollection()"
                  >
                    <v-icon :size="width / 20">{{ BTN_IR_COLLECTIONS }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnCollections"
                    v-if="ratioMode() === 'big'"
                    :disabled="engineCrash"
                    @mouseenter="changeTitle(BTN_SPAN_CONFIG_FULL)"
                    @mouseleave="title = defaultTitle"
                    :width="width / 6 - 24"
                    class="tooltip btnstyle"
                    style="
                      color: white;
                      background-color: var(--border-color);
                      position: relative;
                      top: 50%;
                      transform: translate(0, -60%);
                    "
                    tile
                    fab
                    depressed
                    elevation="5"
                    raised
                    @click="
                      irPressed = true;
                      setIR();
                      $emit('click-ir');
                    "
                    @mousedown="addMouseDownEventCollection()"
                  >
                    <v-icon small>{{ BTN_IR_COLLECTIONS }}</v-icon>
                    <span>{{ BTN_SPAN_COLL_SHORT }}</span>
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
import icons from "../env/icon";
export default {
  name: "IndexConfigurationCollection",
  components: {},
  props: {
    bottomText: Object,
    height: Number,
    width: Number,
    browser: String,
    rapporto: Number,
    darkMode: Boolean,
    outlined: Boolean,
    longClicked: Boolean,
    timerId: Number,
    engineCrash:Boolean,
    serviceCrash:Boolean,
    reconnectSended:Boolean,
    tempPresent:Boolean
  },
  data: () => ({
    value: 1,
    heightMax: 0,
    error: false,
    conf: true,
    ispectstate: false,
    irPressed: false,
    selectedItem: -1,
    numDepth: 1,
    textButton: "Configuration",
    listEmpty: true,
    defaultTitle: "Configuration",
    title: "Configuration",
    isLongClick: false,
    timerIdData: null,

    //LABEL
    TITLE: lang.CONFIG_COLL_COMP.CONFIG.TITLE,
    BTN_SPAN_UPLOAD: lang.CONFIG_COLL_COMP.CONFIG.BTN_SPAN_UPLOAD,
    BTN_SPAN_CONFIG_SHORT: lang.CONFIG_COLL_COMP.BTN_SPAN_CONFIG_SHORT,
    BTN_SPAN_COLL_SHORT: lang.CONFIG_COLL_COMP.BTN_SPAN_COLL_SHORT,
    BTN_SPAN_CONFIG_FULL: lang.CONFIG_COLL_COMP.BTN_SPAN_CONFIG_FULL,
    BTN_SPAN_COLL_FULL: lang.CONFIG_COLL_COMP.BTN_SPAN_COLL_FULL,
    BTN_TEMPORARY_COLL: lang.CONFIG_COLL_COMP.COLLECTION.BTN_SPAN_TEMPORARY_COLLECTION,
    BTN_SPAN_IR_REQUEST: lang.CONFIG_COLL_COMP.BTN_SPAN_IR_REQUEST,
    HINT_CONFIG: lang.CONFIG_COLL_COMP.HINT_CONFIG,
    HINT_COLLECTIONS: lang.CONFIG_COLL_COMP.HINT_COLLECTIONS,

    //ICON
    BTN_CONFIGURATION: icons.CONFIG_COLL.BTN_CONFIG,
    BTN_IR_COLLECTIONS: icons.CONFIG_COLL.BTN_IR,
    BTN_UPLOAD_CONFIG: icons.CONFIG_COLL.BTN_UPLOAD,
    LIST_IR_ITEM: icons.CONFIG_COLL.LIST_IR_ITEM,
    BTN_TEMP_COLLECTION: icons.CONFIG_COLL.BTN_TEMP_COLLECTION,
  }),
  watch: {
    bottomText: function (newVal, oldVal) {
      if (newVal.listIRCol != oldVal.listIRCol) {
        if (newVal.listIRCol.length < 1 || newVal.listIRCol == undefined) {
          this.listEmpty = true;
        } else {
          this.listEmpty = false;
        }
      }
    },
  },
  mounted() {
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
     * Ritorna la dimensione dei pulsanti basandosi sul rapporto
     * @returns Dimensione del pulsante
     */
    dimColsBtn() {
      if (this.rapporto < 3 / 2) return 6;
      else return 12;
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
    ratioMode(valRapporto) {
      if(valRapporto==null){
        valRapporto=this.rapporto;
      }
      if (valRapporto < 3 / 2) return "small";
      else if (valRapporto >= 3 / 2 && valRapporto < 5 / 2) return "medium";
      else return "big";
    },
    /**
     * Ritorna l'altezza del componente di configurazione
     * @returns Altezza componente
     */
    diffHeightConf() {
      if (this.rapporto < 3 / 2) return 176;
      else return 96;
    },
    /**
     * Ritorna l'altezza del componente delle collezioni
     * @returns Altezza componente
     */
    diffHeightColl() {
      if (this.rapporto < 3 / 2) return 168;
      else return 88;
    },
    /**
     * Aggiunge un suggerimento nel titolo del componente
     * @param {String} tip Suggerimento del componente selezionato
     */
    changeTitle(tip) {
      if (tip !== this.textButton) {
        this.title = this.defaultTitle + " > " + tip;
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
      this.$emit("close-btm");
    },
    /**
     * @async
     * Carica in modo asincrono il file delle configurazioni
     */
    async loadFile() {
      var file = document.getElementById("file_config").files[0];
      if (file) {
        var reader = new FileReader();
        const app = this;
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          app.sendFileConf(evt.target.result);
        };
      }
    },
    /**
     * Invia il testo della configurazione
     * @param {String} filetext Configurazione
     */
    sendFileConf(filetext) {
      this.$emit("file-upload-index", filetext);
    },
    /**
     * Seleziona il componente di configurazione
     */
    setConf() {
      if (!this.isLongClick) {
        clearTimeout(this.timerIdData);
        if (!this.conf) {
          (this.conf = true), (this.ispectstate = false);
          this.title = "Configuration";
          this.defaultTitle = "Configuration";
          this.TITLE = lang.CONFIG_COLL_COMP.CONFIG.TITLE;
          this.textButton = "Configuration";
        }
      }
    },
    /**
     * Seleziona il componente delle collezioni
     */
    setIR() {
      if (!this.isLongClick) {
        clearTimeout(this.timerIdData);
        if (!this.ispectstate) {
          (this.conf = false), (this.ispectstate = true);
          this.title = "IR Collection";
          this.defaultTitle = "IR Collection";
          this.TITLE = lang.CONFIG_COLL_COMP.COLLECTION.TITLE;
          this.textButton = "IR Collection";
        }
      }
    },
    /**
     * Carica la configurazione
     */
    uploadConf() {
      this.setConf();
      this.$emit("upload-config");
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante Config
     */
    addMouseDownEventConfig() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnConfig',this.HINT_CONFIG);
      };
      this.timerIdData = setTimeout(fn, 500);
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante Collection
     */
    addMouseDownEventCollection() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnCollection',this.HINT_COLLECTIONS);
      };
      this.timerIdData = setTimeout(fn, 500);
    },
    /**
     * Apre un suggerimento sulla base di una pressione duratura
     * @param {String} id Identificativo del compomente premuto
     * @param {String} msg Avviso o suggerimento da mostrare
     */
    longClickFunction(id,msg){
      this.isLongClick = true
      clearTimeout(this.timerIdData)
      this.$emit("long-click", id + "###" + msg);
    }
  },
};
</script>

<style scoped>
.topbar {
  border-bottom: 1px solid #dddddd;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.header_topbar {
  float: left;
  margin-left: 10px;
  margin-top: 2px;
}

.icon_topbar {
  float: right;
  margin-right: 5px;
  margin-top: 2px;
}

#sheet_container {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

#container {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  max-width: 99999px;
}

#file_config {
  display: none;
}

::v-deep #div_send {
  margin-top: 0px;
  line-height: 1.25rem;
  overflow: auto;
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
</style>
