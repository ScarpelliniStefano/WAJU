<template>
  <v-sheet class="pt-6" :dark="darkMode" :light="!darkMode" height="100%">
    <center>
      <v-alert
        v-if="this.error !== ''"
        border="bottom"
        close-text="Close Alert"
        type="warning"
        color="red darken-2"
        dark
        width="90%"
      >
        {{ this.error }}
      </v-alert>
      <draggable
        v-model="modulesData"
        group="modules"
        @end="updateItemOrder"
        v-bind="dragOptions"
        :move="checkMove"
      >
        <v-sheet
          v-for="modulo in modulesData"
          class="mb-6"
          :key="modulo.index"
          elevation="2"
          width="90%"
          :dark="darkMode"
          :light="!darkMode"
        >
          <v-row align="center">
            <v-col :cols="modulesData.length>1? 11:12" :class="modulesData.length>1? 'pr-0':'pr-3'">
              <v-select
                class="mx-3"
                filled
                :dark="darkMode"
                :light="!darkMode"
                v-model="modulo.selected"
                :items="arrayModel"
                :label="SEL_TXT_MODULES"
              ></v-select>
            </v-col>
            <v-divider vertical v-if="modulesData.length > 1"/>
            <v-col cols="1" v-if="modulesData.length > 1" class="px-0">
              <v-btn
                color="red darken-2"
                height="56px"
                
                
                @click="removeAt(modulo.index)"
              >
                <v-icon>mdi-delete</v-icon>
                
              </v-btn>
            </v-col>
          </v-row>
          <keep-alive><modules
            :dark="darkMode"
            :light="!darkMode"
            :select="modulo.selected"
            :maincol="mainColor"
            :indice="modulo.index"
            @changeValue="changeValue($event)"
          ></modules></keep-alive>
          
        </v-sheet>
        
      </draggable>

      

      
      <v-btn
        :dark="darkMode"
        :light="!darkMode"
        
        depressed
        elevation="5"
        raised
        large
        class="tooltip btnstyle"
        
        style="color: white; background-color: var(--bg-color)"
        @click="setPlus()"
      >
        <v-icon color="white">mdi-plus</v-icon>
        <span style="color: white">&nbsp;{{ BTN_SPAN_ADD_MODULE }}</span>
      </v-btn>
      &nbsp;&nbsp;
      <v-btn
        
        depressed
        elevation="5"
        raised
        :dark="darkMode"
        :light="!darkMode"
        large
        class="tooltip btnstyle"
        
        style="color: white; background-color: var(--bg-color)"
        @click="checkMinus()"
      >
        <v-icon color="white">mdi-minus</v-icon>
        <span style="color: white">&nbsp;{{ BTN_SPAN_REMOVE_MODULE }}</span>
      </v-btn>

      <v-textarea
        color="var(--border-color)"
        readonly
        outlined
        class="mt-3"
        v-model="valueString"
        :dark="darkMode"
        :light="!darkMode"
        style="width: 90%"
      />
      <br />
      <v-btn
        tile
        fab
        depressed
        elevation="5"
        raised
        :dark="darkMode"
        :light="!darkMode"
        large
        :disabled="disabledBtn"
        class="tooltip btnstyle"
        width="280px"
        id="btnReset"
        style="color: white; background-color: var(--bg-color)"
        @click="transferMessage('RESET')"
      >
        <v-icon color="white">mdi-send</v-icon>
        <span style="color: white">&nbsp;{{ BTN_SPAN_RESET_SEND }}</span> </v-btn
      >&nbsp;&nbsp;
      <v-btn
        tile
        fab
        depressed
        elevation="5"
        raised
        :dark="darkMode"
        :light="!darkMode"
        large
        :disabled="disabledBtn"
        class="tooltip btnstyle"
        id="btnAppend"
        width="220px"
        style="color: white; background-color: var(--bg-color)"
        @click="transferMessage('APPEND')"
      >
        <v-icon color="white">mdi-send</v-icon>
        <span style="color: white">&nbsp;{{ BTN_SPAN_APPEND }}</span>
      </v-btn>
    </center>

    <v-snackbar
      v-model="wizardAlert"
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
          :dark="darkMode"
          :light="!darkMode"
          v-bind="attrs"
          @click="wizardAlert = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center">
      <v-dialog
        v-model="firstDialogWizard"
        persistent
        max-width="500"
        :dark="darkMode"
        :light="!darkMode"
      >
        <v-card>
          <v-card-title class="text-h5 red darken-2">
            <v-icon left color="black"> mdi-alert </v-icon>
            {{ DIALOG_TITLE }}
          </v-card-title>
          <v-card-text class="pt-8">
            {{ DIALOG_TEXT }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" text @click="setFirstDialogWizard()"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-sheet>
</template>
<script>
import modules from "../modules/WizardModules.vue";
import lang from "../env/lang.en";
import draggable from "vuedraggable";

export default {
  name: "AppWizard",
  data: () => ({
    modulesData: [
      {
        index: 0,
        selected: "",
        value: "",
      },
    ],
    firstDialogWizard: true,
    numberWizard: "",
    mainColor: "black",
    themeColor: "",
    darkMode: false,
    colHex: "",
    arrayModel: [
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GET_COLL,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GET_DICT,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_SAVE_AS,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_MERGE_COLL,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_INTERSECT_COLL,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_SUBTRACT_COLL,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_USE_DB,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_FILTER,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_EXPAND,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GROUP,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_JOIN,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_FUZZY_OP,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_JS_FUNCTION,
      lang.WIZARD.SPECIFICATION.SELECTOR.SEL_TRAJECTORY_MATCHING,
    ],
    valueString: "",
    disabledBtn: true,

    //LABEL
    LBL_TITLE: lang.WIZARD.SPECIFICATION.LBL_TITLE,
    SEL_TXT_MODULES: lang.WIZARD.SPECIFICATION.SEL_TXT_MODULES,
    BTN_SPAN_ADD_MODULE: lang.WIZARD.SPECIFICATION.BTN_SPAN_ADD_MODULE,
    BTN_SPAN_REMOVE_MODULE: lang.WIZARD.SPECIFICATION.BTN_SPAN_REMOVE_MODULE,
    BTN_SPAN_RESET_SEND: lang.WIZARD.SPECIFICATION.BTN_SPAN_RESET_SEND,
    BTN_SPAN_APPEND: lang.WIZARD.SPECIFICATION.BTN_SPAN_APPEND,
    HINT_RESET: lang.WIZARD.SPECIFICATION.HINT_RESET,
    HINT_APPEND: lang.WIZARD.SPECIFICATION.HINT_APPEND,
    DIALOG_TITLE: lang.WIZARD.WARNING.DIALOG_TITLE,
    DIALOG_TEXT: lang.WIZARD.WARNING.DIALOG_TEXT,

    //longClick
    isLongClick: false,
    timerId: "",
    lblPopup: "",
    wizardAlert: false,

    randomNumber: "",
    error: "",
  }),
  components: {
    modules,
    draggable,
  },
  watch: {
    valueString: function (newVal) {
      if (newVal != "") {
        this.disabledBtn = false;
      }
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "modules",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  created() {
    if (this.getCookie("firstDialogWizard") === null) {
      this.setCookie("firstDialogWizard", "true", 30);
    }
    this.firstDialogWizard = this.getCookie("firstDialogWizard") === "true";

    this.randomNumber = this.generatePassword(20);

    document.title = this.LBL_TITLE;
    this.changeColor();
    this.connectionPage = new WebSocket(
      "ws://" + process.env.VUE_APP_WEB_SOCKET_SERVER,
      this.$route.query.id + "###" + this.randomNumber
    );
    this.connectionPage.onmessage = (data) => {
      console.log(data.data);
      if (data.data.split("###")[0] === "CHANGE_COLOR") {
        this.changeColor();
      } else if (data.data.split("###")[0] === "CLOSE_HOME") {
        this.error = data.data.split("###")[1];
      }
    };
  },
  mounted() {
    console.log(this.$route.query.id);
    this.numberWizard = this.$route.query.id;
    this.addMouseOverEvent("btnAppend", this.HINT_APPEND);
    this.addMouseOverEvent("btnReset", this.HINT_RESET);
  },
  methods: {
    removeAt(idx) {
      this.modulesData.forEach((item)=> {console.log(item.index)})
      for(var i=idx;i<this.modulesData.length-1;i++){
          this.modulesData[i].selected=this.modulesData[i+1].selected;
          this.modulesData[i].value=this.modulesData[i+1].value;
          console.log(this.modulesData[i])
      } 
      this.modulesData.forEach((item)=> {console.log(item.index)})
      this.modulesData.splice(this.modulesData.length-1, 1);
      this.modulesData.forEach((item)=> {console.log(item.index)})
      this.refresh();
      this.modulesData.forEach((item)=> {console.log(item.index)})
    },
    checkMove: function() {
      //console.log(e);
      //let pastIndex=e.draggedContext.index;
      //let futureIndex=e.draggedContext.futureIndex;
      //this.scambia(this.modulesData,pastIndex,futureIndex);
      //console.log(this.modulesData);
      //this.refresh();
    },
    scambia(T,v,n){
    var x;//variabile ausiliaria
    x=T[n];
    //let index=T[v].index;
    //console.log(index);
    //console.log(x.index);
    T[n]=T[v];
    //console.log(T[n].index);
    //T[n].index=x.index;
    //console.log(T[n].index);
    T[v]=x;
    //console.log(T[v].index);
   // T[v].index=index;
    //console.log(T[v].index);
    },
    updateItemOrder: function(){
      const items=this.modulesData.map(function(item){
        return item;
      });
      console.log(items);
      this.modulesData=items;
      this.refresh();
    },
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
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    setFirstDialogWizard() {
      this.firstDialogWizard = false;
      this.setCookie("firstDialogWizard", "false", 30);
    },
    changeColor() {
      document.documentElement.classList.remove(this.mainColor);
      this.mainColor = this.getCookie("main-color");
      if (!this.mainColor) {
        this.mainColor = "document-color";
      }
      console.log(this.mainColor);
      document.documentElement.classList.add(this.mainColor);

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
    changeValue(addText) {
      console.log(addText)
      let indiceScript = Number(addText.substring(0, addText.indexOf("##")));
      this.modulesData[indiceScript].value = addText.substring(
        addText.indexOf("##") + 2,
        addText.length
      );
      this.refresh();
    },
    refresh() {
      this.valueString = "";
      this.modulesData.forEach((element) => {
        if (element.value !== "") {
          this.valueString += element.value + "\r\n";
        }
      });
    },
    checkMinus() {
      if (this.modulesData.length > 1) {
        this.modulesData.pop();
      }
      this.refresh();
    },
    setPlus() {
      this.modulesData.push({
        index: this.modulesData.length,
        selected: "",
        value: "",
      });
    },
    transferMessage(type) {
      if (!this.isLongClick)
        this.connectionPage.send(
          "WIZARD###" + this.numberWizard + "###" + type + "###" + this.valueString
        );
      clearTimeout(this.timerId);
    },
    addMouseOverEvent(idElement, message) {
      document.getElementById(idElement).onmousedown = (args) => {
        this.isLongClick = false;
        this.timerId = setTimeout(() => fn.apply(null, [args]), 500);
      };

      var fn = (args) => {
        console.log("onmousedown args", args);
        this.wizardAlert = false;
        this.lblPopup = message;
        this.wizardAlert = true;
        this.isLongClick = true;
      };
    },
  },
};
</script>

<style scoped>
::v-deep .v-input__slot{
  padding-left: 0px;
  padding-right: 0px;
}
/*@media screen and (max-height: 600px) {
  ::v-deep .v-snack__content {
    font-size: 14px;
  }
}

@media screen and (min-height: 601px) and (max-height: 900px) {
  ::v-deep .v-snack__content {
    font-size: 18px;
  }
}

@media screen and (min-height: 901px) and (max-height: 1080px) {
  ::v-deep .v-snack__content {
    font-size: 22px;
  }
}

@media screen and (min-height: 1081px) and (max-height: 1260px) {
  ::v-deep .v-snack__content {
    font-size: 25px;
  }
}

@media screen and (min-height: 1261px) and (max-height: 1440px) {
  ::v-deep .v-snack__content {
    font-size: 29px;
  }
}

@media screen and (min-height: 1441px) and (max-height: 1620px) {
  ::v-deep .v-snack__content {
    font-size: 32px;
  }
}

@media screen and (min-height: 1621px) and (max-height: 1800px) {
  ::v-deep .v-snack__content {
    font-size: 35px;
  }
}

@media screen and (min-height: 1801px) and (max-height: 1980px) {
  ::v-deep .v-snack__content {
    font-size: 38px;
  }
}

@media screen and (min-height: 1981px) and (max-height: 2160px) {
  ::v-deep .v-snack__content {
    font-size: 41px;
  }
}


@media screen and (min-height: 2161px) {
  ::v-deep .v-snack__content {
    font-size: 44px;
  }
}*/

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

:root.document-color {
  --border-color: #0b77b8;
  --bg-color: #0b77b8;
  --textarea-color: blue;
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
</style>
