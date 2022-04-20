<template>
  <v-sheet :dark="darkMode" :light="!darkMode" height="100%">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="200"></v-progress-circular>
    </v-overlay>
    
    <v-container fluid>
      <v-alert
      v-if="this.error !== ''"
      border="bottom"
      close-text="Close Alert"
      type="warning"
      color="red darken-2"
      dark
    >
      {{ this.error }}
    </v-alert>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-sheet
            rounded
            elevation="10"
            width="100%"
            :dark="darkMode"
            :light="!darkMode"
          >
            <center>
              <h1>{{ this.title }}</h1>
            </center>
            <center>
              <h3>{{ new Date(this.datetime).toLocaleString() }}</h3>
            </center>
            <center>
              <h4>
                {{ H_TOTAL_ITEM + this.valTotal }} -
                {{ H_INITIAL_DOCUMENT + this.valInitial }} -
                {{ H_FINAL_DOCUMENT + this.valFinal }}
              </h4>
            </center>
            <v-row align="center" class="text-center pt-3">
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-select
                  :disabled="valTotal === 0"
                  :dark="darkMode"
                  :light="!darkMode"
                  v-model="size"
                  :items="itemsSize"
                  :label="SELECT_SIZE"
                  dense
                ></v-select>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row align="center" class="text-center">
              <v-col cols="3" class="pl-9">
                <v-btn
                  :disabled="valTotal === 0"
                  :dark="darkMode"
                  :light="!darkMode"
                  id="btnSave"
                  color="var(--border-color)"
                  elevation="2"
                  style="border-radius: 4px"
                  @click="download()"
                  @mousedown="addMouseDownEventSave()"
                  width="100%"
                >
                  <v-icon color="white">{{ BTN_SAVE }}</v-icon>
                  <span style="color: white">{{ BTN_SPAN_SAVE_TREE }}</span>
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-pagination
                  :dark="darkMode"
                  :light="!darkMode"
                  v-model="page"
                  :length="pageCount"
                  :total-visible="7"
                  color="var(--border-color)"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                ></v-pagination>
              </v-col>
              <v-col cols="3" class="pr-9">
                <v-btn
                  :disabled="valTotal === 0"
                  :dark="darkMode"
                  :light="!darkMode"
                  id="btnExpand"
                  color="var(--border-color)"
                  elevation="2"
                  style="border-radius: 4px"
                  @click="setDepth()"
                  @mousedown="addMouseDownEventExpand()"
                  width="100%"
                >
                  <v-icon color="white">{{ BTN_EXPAND }}</v-icon>
                  <span style="color: white">{{ BTN_SPAN_EXPAND }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-sheet
            
            :dark="darkMode"
            :light="!darkMode"
            rounded
            min-height="350px"
            height="calc(55vh)"
            elevation="5"
            id="treeViewer"
            style="overflow: auto"
          ></v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="wizardAlert"
      elevation="5"
      timeout="4000"
      max-width="70%"
      :dark="darkMode"
      :light="!darkMode"
    >
      <p class="v-snack__content">{{ lblPopup }}</p>

      <template v-slot:action="{ attrs }">
        <v-btn
          :dark="darkMode"
          :light="!darkMode"
          color="var(--border-color)"
          text
          v-bind="attrs"
          @click="wizardAlert = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>
<script>
import jsonview from "../plugins/json-view";
import lang from "../env/lang.en";
import icon from "../env/icon";
//import latinize from 'latinize/latinize';

export default {
  name: "AppPageTree",
  //components: { 'json-view': JSONView },
  data: function () {
    return {
      expand: false,
      numDepth: 1,
      textIRTreeCol: "",
      datetime: "",
      title: "",
      valInitial: 0,
      valFinal: 0,
      valTotal: 0,
      connectionPage: null,
      page: 1,
      pageCount: 0,
      size: 25,
      tree: null,
      itemsSize: [5, 10, 15, 25, 50],
      mounted: false,
      overlay: true,
      settings: false,
      themeColor: "",
      mainColor: "",
      fontColor: "",
      fontSize: 0,
      error: "",
      darkMode: false,
      //promise: ''

      //LABEL
      H_TOTAL_ITEM: lang.PAGE_TREE.H_TOTAL_ITEM,
      H_INITIAL_DOCUMENT: lang.PAGE_TREE.H_INITIAL_DOCUMENT,
      H_FINAL_DOCUMENT: lang.PAGE_TREE.H_FINAL_DOCUMENT,
      SELECT_SIZE: lang.PAGE_TREE.SELECT_SIZE,
      BTN_SPAN_SAVE_TREE: lang.PAGE_TREE.BTN_SPAN_SAVE_TREE,
      BTN_SPAN_EXPAND: lang.PAGE_TREE.BTN_SPAN_EXPAND,
      HINT_EXPAND: lang.PAGE_TREE.HINT_EXPAND,
      HINT_SAVE: lang.PAGE_TREE.HINT_SAVE,

      //ICON
      BTN_SAVE: icon.PAGE_TREE.BTN_SAVE,
      BTN_EXPAND: icon.PAGE_TREE.BTN_EXPAND,

      //longClick
      isLongClick: false,
      timerId: null,
      lblPopup: "",
      wizardAlert: false,
    };
  },
  watch: {
    size: function (newVal) {
      if (this.page * newVal > this.valTotal) {
        this.page = 1;
      } else {
        this.changeDimensions();
      }
    },
    page: function () {
      this.changeDimensions();
    },
    textIRTreeCol: function () {
          this.overlay = false;
    },
  },
  computed: {
    isDisable() {
      return this.irTreeV.length > 0;
    },
  },
  created() {
    document.title = this.title + "- JCOUI Web";

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

    this.mainColor = this.getCookie("main-color");
    if (!this.mainColor) {
      this.mainColor = "black";
      this.setCookie("main-color", "document-color", 30);
    }
    document.documentElement.classList.add(this.mainColor);
  },
  mounted() {
    this.setConnection();
  },
  methods: {
    changeColor() {
      document.documentElement.classList.remove(this.mainColor);
      this.mainColor = this.getCookie("main-color");
      if (!this.mainColor) {
        this.mainColor = "document-color";
      }
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
    sendMessage() {
      this.connectionPage.send(
        "OPEN###" +
          "textTree_" +
          this.$route.query.id +
          "###" +
          (this.page - 1) +
          "," +
          this.size
      );
    },
    changeDimensions() {
      this.sendMessage();
    },
    calculatePageSize() {
      if (this.valTotal === 0) {
        this.pageCount = 1;
      } else if (this.valTotal % this.size != 0) {
        this.pageCount = Number(Math.floor(this.valTotal / this.size + 1));
      } else {
        this.pageCount = Number((this.valTotal / this.size).toFixed());
      }
    },
    setMainColor(color) {
      document.documentElement.classList.replace(this.mainColor, color);
      this.mainColor = color;
      this.setCookie("main-color", color, 30);
    },
    setThemeColor(theme) {
      document.documentElement.classList.replace(this.themeColor, theme);
      this.themeColor = theme;
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
    maxDimSize() {
      if (this.valTotal > 1000) return 1000;
      else return this.valTotal;
    },
    setConnection() {
      if (localStorage.getItem("textTree_" + this.$route.query.id)) {
        //const ip="localhost";
        this.connectionPage = new WebSocket(
          "ws://" + window.location.hostname +":"+process.env.VUE_APP_WEB_SOCKET_SERVER_PORT, this.$route.query.idUser + '###' + this.$route.query.id
        );
        if (this.connectionPage.readyState != 1) {
          this.overlay = false;
        }
        this.connectionPage.onclose = () => {
          this.error = "server save/open closed";
        };
        this.connectionPage.onopen = () => {
          this.sendMessage();
        };
        let jsonData = null;
        this.connectionPage.onmessage = (message) => {
          //console.log('sono qui')
          if (message == "SERVER CLOSED") {
            this.error = "server save/open closed";
          } else if (message.data.split("###")[0] == "CHANGE_COLOR") {
            this.changeColor();
          } else {
            jsonData = JSON.parse(message.data);
            this.datetime = jsonData.datetime;
            this.title = jsonData.name;
            this.valTotal = jsonData.tot;
            this.itemsSize = [5];
            if (this.valTotal > 5) {
              this.itemsSize.push(10);
            }
            if (this.valTotal > 10) {
              this.itemsSize.push(15);
            }
            if (this.valTotal > 15) {
              this.itemsSize.push(25);
            }
            if (this.valTotal > 25) {
              this.itemsSize.push(50);
            }
            if (this.valTotal > 50) {
              this.itemsSize.push(100);
            }
            if (this.valTotal > 100) {
              this.itemsSize.push(200);
            }
            this.valInitial = jsonData.initial;
            this.valFinal = jsonData.final;
            if (!this.mounted) {
              this.mounted = true;
              if (this.valTotal < 25) this.size = this.valTotal;
              else this.size = 25;
            }
            this.overlay=false;
            console.log(this.overlay)
            this.tree = jsonview.createWithInitial(
              jsonData.tree,
              this.valInitial + 1,
              this.darkMode
            );
            
            document.getElementById("treeViewer").innerHTML = "";
            jsonview.render(this.tree, document.querySelector("#treeViewer"));
            jsonview.expandDepth(this.tree, this.numDepth);
            this.textIRTreeCol = jsonData.tree;
            this.calculatePageSize();
            document.title = this.title + " | JCOUI Web";
          }
        };
      }
    },
    setDepth() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        if (this.numDepth < 2) jsonview.expand(this.tree);
        else {
          jsonview.collapse(this.tree);
          jsonview.expandDepth(this.tree, 1);
        }
        this.numDepth = this.numDepth < 2 ? 10 : 1;
      }
    },
    download() {
      if (!this.isLongClick) {
        clearTimeout(this.timerId);
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:application/json," +
            encodeURIComponent(
              '{ \n "documents" : \n ' +
                //latinize(String(JSON.stringify(this.textIRTreeCol, null, "\t")).replace('Â','').replace('Â',''))
                String(JSON.stringify(this.textIRTreeCol, null, "\t"))
                  .replace("Â", "")
                  .replace("Â", "") +
                "\n}"
            )
        );
        element.setAttribute("download", this.title + ".json");

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }
    },

    addMouseDownEventSave() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction(this.HINT_SAVE);
      };
      this.timerId = setTimeout(fn, 500);
    },
    addMouseDownEventExpand() {
      this.isLongClick = false;
      var fn = () => {
        this.longClickFunction(this.HINT_EXPAND);
      };
      this.timerId = setTimeout(fn, 500);
    },
    longClickFunction(msg) {
      this.isLongClick = true;
      clearTimeout(this.timerId);
      this.wizardAlert = true;
      this.lblPopup = msg;
    },
  },
};
</script>

<style scoped>
.label {
  color: white;
  padding: 8px;
}

.success {
  background-color: #04aa6d;
} /* Green */
.info {
  background-color: #2196f3;
} /* Blue */
.warning {
  background-color: #ff9800;
} /* Orange */
.danger {
  background-color: #f44336;
} /* Red */
.other {
  background-color: #e7e7e7;
  color: black;
} /* Gray */
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
.list li {
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;
  background: #ffffff00;
  width: 100%; /* Auto spacing */
}

.list_inside {
  /* (A1) FLEXIBLE BOX */
  display: flex;
  width: 20%;
  height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
  padding: 0;
  margin: 0;
}

/* (B) LIST ITEMS */
.list_inside li {
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;
  background: #ffffff00;
  width: 100%; /* Auto spacing */
}

div.boxInfo {
  border-style: double;
  border-width: 7px;
  border-color: cyan;
}

#title {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
  color: white;
}
#settings {
  text-align: right;
}

#treeView .divheader {
  flex: 0 1 auto;
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
  --border-color: #000000;
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

#body {
  display: flex;
  flex-flow: column;
  height: 100%;
}
#body .divheader {
  flex: 0 1 auto;
}

#body .divcontent {
  flex: 1 0 auto;
}
#third {
  position: relative;
}
</style>

<style scoped>
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
.box {
  overflow-y: scroll; /* Add the ability to scroll */
  height: 70vh;
  border-style: solid;
  border-color: cadetblue;
}

.darkBG {
  background-color: #000;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.box::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.box {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
