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
      @click="$emit('set-z-click', 'rec')"
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
        style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px"
        fluid
      >
        <v-row align="center">
          <v-col :cols="dimCols(1)">
            <v-row align="center">
              <v-col class="pa-3" :key="'recKey_middle'" :cols="12">
                <v-sheet
                  :dark="darkMode" :light="!darkMode"
                  id="div_send"
                  :height="height - diffHeight()"
                  style="
                    border: 1px solid var(--border-color);
                    border-radius: 3px;
                    overflow: auto;
                  "
                >
                  <v-data-table
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event"
                    :dark="darkMode" :light="!darkMode"
                    class="tastyle pt-0 mt-0"
                    no-resize
                    name="input-7-1"
                    :rows="parseInt((height - 134) / 28)"
                    :items="recArr"
                    color="black"
                    id="ta_rec"
                    hide-default-header
                    hide-default-footer
                    :expanded.sync="expanded"
                    :headers="recHeaders"
                    item-key="name"
                    show-expand
                    
                  >
                    <template v-slot:expanded-item="{ headers, item }">
                      <td :colspan="headers.length">
                        <p
                          style="
                            white-space: pre-wrap;
                          "
                        >
                          {{ item.value }}
                        </p>
                      </td>
                    </template>
                  </v-data-table>
                </v-sheet>
              </v-col>
              <v-divider v-if="dividerBool()" vertical></v-divider>
              <v-col :key="1.21" cols="12" class="pt-0">
                <v-pagination
                  :dark="darkMode" :light="!darkMode"
                  v-model="page"
                  :length="pageCount"
                  :total-visible="7"
                  color="var(--border-color)"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-col>
          <v-col :key="1.31" :cols="dimCols(2)">
            <v-row align="center" class="text-center">
              <v-col cols="6">
                <v-btn
                  id="btnSave"
                  v-if="ratioMode() === 'small'"
                  :width="(width - 48) / 2"
                  class="tooltip btnstyle"
                  style="color: white; background-color: var(--border-color)"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  :disabled="this.recArr.length == 0"
                  @click="download('script', recText)"
                  @mousedown="addMouseDownEventSave()"
                >
                  <v-icon color="white">{{ BTN_SAVE }}</v-icon>
                  <span v-if="this.recArr.length == 0" style="color: gray">{{
                    BTN_SPAN_SAVE
                  }}</span>
                  <span v-else style="color: white">{{ BTN_SPAN_SAVE }}</span>
                </v-btn>
                <v-sheet
                  v-if="ratioMode() !== 'small'"
                  :dark="darkMode" :light="!darkMode"
                  :height="(height - 80) / 2"
                >
                  <v-btn
                    id="btnSave"
                    v-if="ratioMode() === 'medium'"
                    @mouseenter="changeTitle('Save')"
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
                      transform: translate(0, -45%);
                    "
                    fab
                    depressed
                    elevation="5"
                    :disabled="this.recArr.length == 0"
                    @click="download('script', recText)"
                    @mousedown="addMouseDownEventSave()"
                  >
                    <v-icon color="white" :size="width / 20">{{ BTN_SAVE }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnSave"
                    v-if="ratioMode() === 'big'"
                    :width="width / 6 - 24"
                    x-large
                    class="btnstyle"
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
                    :disabled="this.recArr.length == 0"
                    @click="download('script', recText)"
                    @mousedown="addMouseDownEventSave()"
                  >
                    <v-icon>{{ BTN_SAVE }}</v-icon>
                    <span>{{ BTN_SPAN_SAVE }}</span>
                  </v-btn>
                </v-sheet>
              </v-col>
              <v-col v-if="ratioMode() === 'small'" cols="6">
                <v-btn
                  id="btnBacktrack"
                  :width="(width - 48) / 2"
                  color="var(--border-color)"
                  class="tooltip btnstyle"
                  style="color: white; background-color: var(--border-color)"
                  tile
                  fab
                  depressed
                  elevation="5"
                  raised
                  :disabled="this.recArr.length == 0 || !this.reconnectSended"
                  @click="backtrack()"
                  @mousedown="addMouseDownEventBacktrack()"
                >
                  <v-icon color="white">{{ BTN_BACKTRACK }}</v-icon>
                  <span v-if="this.recArr.length == 0" style="color: gray">{{
                    BTN_SPAN_BACKTRACK
                  }}</span>
                  <span v-else style="color: white">{{ BTN_SPAN_BACKTRACK }}</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="ratioMode() !== 'small'" align="center">
              <v-col>
                <v-sheet :dark="darkMode" :light="!darkMode" :height="(height - 80) / 2">
                  <v-btn
                    id="btnBacktrack"
                    v-if="ratioMode() === 'medium'"
                    @mouseenter="changeTitle('Back Instruction')"
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
                    :disabled="this.recArr.length == 0 || !this.reconnectSended"
                    @click="backtrack()"
                    @mousedown="addMouseDownEventBacktrack()"
                  >
                    <v-icon color="white" :size="width / 20">{{ BTN_BACKTRACK }}</v-icon>
                  </v-btn>
                  <v-btn
                    id="btnBacktrack"
                    v-if="ratioMode() === 'big'"
                    :width="width / 6 - 24"
                    x-large
                    class="btnstyle"
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
                    :disabled="this.recArr.length == 0 || !this.reconnectSended"
                    @click="backtrack()"
                    @mousedown="addMouseDownEventBacktrack()"
                  >
                    <v-icon>{{ BTN_BACKTRACK }}</v-icon>
                    <span>{{ BTN_SPAN_BACKTRACK_UNDO }}</span>
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
  name: "IndexReceive",
  props: {
    recText: String,
    recArr: Array,
    height: Number,
    width: Number,
    browser: String,
    rapporto: Number,
    bgcolor: String,
    darkMode: Boolean,
    reconnectSended:Boolean
  },
  data: () => ({
    isDisabled: true,
    expanded: [],
    page: 1,
    pageCount: 1,
    itemsPerPage: 10,
    recHeaders: [
      {
        text: "ISTRUCTION TYPE",
        sortable: false,
        value: "name",
        defaultTitle: "Response",
        title: "Response",
      },
    ],
    isLongClick: false,

    //LABEL
    TITLE: lang.RECEIVE_COMP.TITLE,
    BTN_SPAN_SAVE: lang.RECEIVE_COMP.BTN_SPAN_SAVE,
    BTN_SPAN_BACKTRACK: lang.RECEIVE_COMP.BTN_SPAN_BACKTRACK,
    BTN_SPAN_BACKTRACK_UNDO: lang.RECEIVE_COMP.BTN_SPAN_BACKTRACK_UNDO,
    HINT_BACKTRACK: lang.RECEIVE_COMP.HINT_BACKTRACK,
    HINT_SAVE: lang.RECEIVE_COMP.HINT_SAVE,

    //ICON
    BTN_SAVE: icon.RECEIVE.BTN_SAVE,
    BTN_BACKTRACK: icon.RECEIVE.BTN_BACKTRACK,
  }),
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
      if (this.rapporto < 3 / 2) return 189.6;
      else return 109.6;
    },
    /**
     * Cambia il titolo con un suggerimento aggiuntivo
     * @param {String} tip Suggerimento
     */
    changeTitle(tip) {
      this.title = this.defaultTitle + " - " + tip;
    },
    /**
     * Ottiene il valore del cookie considerato
     * @param {String} name Nome del cookie selezionato
     */
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
    /**
     * Invia un segnale per la chiusura della scheda
     */
    closeWindow() {
      this.$emit("close-rec");
    },
    /**
     * Invia un segnale di backtrack
     */
    backtrack(){
      if(!this.isLongClick){
        clearTimeout(this.timerId);
        this.$emit('click-back-index')
      }
    },
    /**
     * Invia un segnale per il download delle istruzioni
     */
    download(filename, text) {
      if(!this.isLongClick){
        clearTimeout(this.timerId);
        console.log(text)
        this.$emit("save-istruction", filename + "##SAVE####" + text);
      }
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante Save
     */
    addMouseDownEventSave() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnSave',this.HINT_SAVE);
      };
      this.timerId = setTimeout(fn, 500);
    },
    /**
     * Inizializza un evento legato alla pressione prolungata del pulsante BackTrack
     */
    addMouseDownEventBacktrack() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction('btnBacktrack',this.HINT_BACKTRACK);
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

<style>
#recDiv {
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
}

tr {
  box-shadow: none;
}
</style>
