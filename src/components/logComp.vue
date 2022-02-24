<template>
    <v-sheet elevation="17" id="recDiv" class="divstyle">
    <v-sheet style="border-bottom: 3px solid #dddddd;" elevation="14" class="topbar" @click="$emit('set-z-click', 'rec')">
      <h4 class="noselect moderndesign" style="float: left; margin-left: 5px">{{this.textButton}}</h4>
      <v-icon color="red darken-4" style="float: right" v-on:click="closeWindow()"
        >mdi-close</v-icon
      >
      <v-icon class="moderndesign" style="float: right; color: #FFD700;" v-on:click="maximizeWindow()"
        >mdi-window-maximize</v-icon
      >
    </v-sheet>
    <v-container class="containerstyle" style="border-radius: 3px;">
      <v-row class="py-0" align="center">
        <v-col class="py-0" cols="12" sm="10" md="10" lg="12" xl="12">
          <v-col
            class="py-1"
            v-if="log"
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
          >
            <v-sheet class="py_0 containerstyle" :height="height - 120">
              <v-sheet :height="height - 120" id="boxLog">
                <ul
                  readonly
                  style="font-size: 16px;"
                  height="100%"
                  name="log-text"
                  label="Logs"
                  id="ul_send"
                >
                  <li
                    class="containerstyle"
                    :key="log.id"
                    v-for="log in arrayLog.logs"
                  >
                    <p
                      v-if="log.type == 'LOG'"
                      style="background-color: #ffffff; color: blue;"
                    >
                      {{ log.message }}
                    </p>
                    <p v-else style="background-color: #ffffff; color: red;">
                      {{ log.message }}
                    </p>
                  </li>
                </ul>
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    </v-sheet>
</template>

<script>
export default {
  name: 'barRec',
  components: {},
  props: {
    arrayLog: Object,
    bottomText: Object,
    height: Number,
    width: Number,
  },
  data: () => ({
    value: 1,
    heightMax: 0,
    log: true,
    error: false,
    conf: false,
    ispectstate: false,
    irPressed: false,
    selectedItem: -1,
    numDepth: 1,
    textButton: 'Log',
    listEmpty: true
  }),
  created() {
    /*this.isDisable();
    this.isEmptyList();
    this.isSelected();*/
  },
  mounted() {
    /*this.isDisable();
    this.isEmptyList();
    this.isSelected();*/
  },
  watch:{
    bottomText:function(newVal, oldVal){
      if(newVal.listIRCol!=oldVal.listIRCol){
        if(newVal.listIRCol.length<1 || newVal.listIRCol == undefined){
          this.listEmpty=true;
        }else{
          this.listEmpty=false;
        }
      }
    }
  },
  methods: {
    getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(';')
      // Loop through the array elements
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=')
        /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
        if (name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1])
        }
      }
      // Return null if not found
      return null
    },
    closeWindow(){
      this.$emit('close-btm');
    },
    maximizeWindow(){
      this.$emit('maximize-btm');
    },
    async loadFile() {
      var file = document.getElementById('file_config').files[0]
      if (file) {
        var reader = new FileReader()
        const app = this
        reader.readAsText(file, 'UTF-8')
        reader.onload = function (evt) {
          app.sendFileConf(evt.target.result)
        }
      }
    },
    sendFileConf(filetext){
      this.$emit('file-upload-index', filetext);
    },
    setLog() {
      if (!this.log) {
        (this.log = true),
          (this.error = false),
          (this.conf = false),
          (this.ispectstate = false)
        this.textButton = 'Log'
      }
    },
    setConf() {
      if (!this.conf) {
        (this.log = false),
          (this.error = false),
          (this.conf = true),
          (this.ispectstate = false)
        this.textButton = 'Configuration'
      }
    },
    setIR() {
      if (!this.ispectstate) {
        //Aggiungere settaggio dell'altezza
        this.heightMax = this.height - 112
        ;(this.log = false),
          (this.error = false),
          (this.conf = false),
          (this.ispectstate = true)
        this.textButton = 'IR Collection'
      }
    },
    uploadConf() {
      this.setConf()
      document.getElementById('file_config').click()
    },
  },
}
</script>

<style scoped>
.label {
  color: white;
  padding: 8px;
}

.success {background-color: #04AA6D;} /* Green */
.info {background-color: #2196F3;} /* Blue */
.warning {background-color: #ff9800;} /* Orange */
.danger {background-color: #f44336;} /* Red */
.other {background-color: #e7e7e7; color: black;} /* Gray */

#btmDiv {
  height: 100%;
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

#btn_log {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

#span {
  bottom: 30px;
}

.btn {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

.list {
  /* (A1) FLEXIBLE BOX */
  display: flex;
  width: 100%;
  height: 88px;
  bottom: 0;
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
  width: 100%;
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

#ul_send {
  /* (A1) FLEXIBLE BOX */
  display: inherit;
  width: 100%;
  height: 16px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
  padding: 0;
  margin: 0;
}

/* (B) LIST ITEMS */
#ul_send li {
  list-style-type: none;
  box-sizing: border-box;
  padding: 1px;
  background: transparent;
  width: 100%; /* Auto spacing */
}

@media screen and (max-width: 1263px) and (min-width: 600px) {
  /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
  .list {
    flex-wrap: wrap;
    margin-top: -122px;
  }
  /* (C2) 2 ITEMS PER ROW */
  .list li {
    width: 100%;
  }

  /*.list_inside { flex-wrap: wrap; margin-top: -10px;} 

    .list_inside li { width: 100%; }*/
}

@media screen and (min-width: 1904px) {
  /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
  .list {
    flex-wrap: wrap;
    margin-top: -122px;
  }
  /* (C2) 2 ITEMS PER ROW */
  .list li {
    width: 100%;
  }

  /*.list_inside { flex-wrap: wrap; margin-top: -10px;} 

    .list_inside li { width: 100%; }*/
}

.tarea-bottom {
  background-color: white;
}

div.box {
  padding: 4px;
  overflow: auto;
}

#boxLog {
  overflow: auto;
}

#btn_upload {
  position: absolute;
  margin-left: -15px;
  margin-top: -15px;
  border-style: solid;
  border-width: 1px;
}

#btn_config {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

#btn_ir {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}
</style>