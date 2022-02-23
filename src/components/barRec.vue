<template>
    <div id="recDiv" class="divstyle" >
        <div class="topbar" @click="$emit('set-z-click', 'rec')">
            <h4 class="noselect" style="float:left; margin-left: 5px">Response</h4>
            <v-icon color="white" style="float: right;" v-on:click="closeWindow()">mdi-close</v-icon>
        </div>
        <v-container class="containerstyle" style="border-radius: 3px;" fluid>
          <v-row align="center" >
          <v-col
            class="py-0"
                :key="1.1"
                cols="12"
                :sm="10"
                :md="12"
                :lg="12"
                :xl="12">
                <v-data-table 
                    class="tastyle pt-0 mt-0"
                    no-resize
                    name="input-7-1"
                    :rows="parseInt((height-134)/28)"
                    :items="recArray"
                    color="black"
                    id="ta_rec" 
                    hide-default-header
                    hide-default-footer
                    :expanded.sync="expanded"
                    :headers="recHeaders"
                    item-key="name"
                    
                    show-expand>
                    
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                           <v-textarea no-resize v-model="item.value"></v-textarea>
                        </td>
                    </template>
                </v-data-table>
                <!--<v-textarea
                    class="tastyle pt-0 mt-0"
                    no-resize
                    name="input-7-1"
                    :rows="parseInt((height-134)/28)"
                    v-model="recText"
                    color="black"
                    id="ta_rec" >
                </v-textarea>-->
            </v-col>
            <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
              <v-btn
                class="tooltip btnstyle"
                id="btn_back"
                style="
                  border-radius: 4px;
                  border-style: solid;
                  border-width: 1px;
                "
                tile
                :disabled="this.isDisabled"
                fab
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
    </v-container>
    <v-container
      :class="bgcolor"
      v-if="rapporto >= 3 / 2 && rapporto < 3"
      class="containerstyle"
      style="border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;"
      fluid
    >
      <v-row align="center">
        <v-col
          class="py-0"
          :key="1.11"
          cols="12"
          :sm="10"
          :md="10"
          :lg="10"
          :xl="10"
        >
          <v-textarea
            readonly
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="
              browser == 'firefox'
                ? parseInt((height - 54) / 28)
                : parseInt((height - 54) / 28)
            "
            v-model="recText"
            color="black"
            id="ta_rec"
          >
          </v-textarea>
        </v-col>
        <v-col :key="1.21" cols="12" :sm="2" :md="2" :lg="2" :xl="2">
          <v-row align="center" class="text-center">
            <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_save"
                style="
                  border-radius: 4px;
                  border-style: solid;
                  border-width: 1px;
                "
                tile
                large
                :disabled="this.isDisabled"
                fab
                depressed
                elevation="2"
                raised
                @click="download('script', recText)"
              >
                <v-icon>mdi-content-save-outline</v-icon>
                <span class="tooltiptext">Save the response</span>
              </v-btn>
            </v-col>
            <v-col cols="6" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_back"
                style="
                  border-radius: 4px;
                  border-style: solid;
                  border-width: 1px;
                "
                large
                tile
                :disabled="this.isDisabled"
                fab
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="py-0"
          key="colonna_inutile"
          cols="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <v-sheet
            elevation="0"
            :color="bgcolor"
            :height="
              browser == 'firefox'
                ? height - 54 - parseInt((height - 54) / 28) * 28 + 5
                : browser == 'chrome'
                ? height - 54 - parseInt((height - 54) / 28) * 28 + 22
                : height - 54 - parseInt((height - 54) / 28)
            "
          >
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      :class="bgcolor"
      v-if="rapporto >= 3"
      class="containerstyle"
      style="border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;"
      fluid
    >
      <v-row align="center">
        <v-col
          class="py-0"
          :key="1.11"
          cols="12"
          :sm="11"
          :md="11"
          :lg="11"
          :xl="11"
        >
          <v-textarea
            readonly
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="
              browser == 'firefox'
                ? parseInt((height - 54) / 28)
                : parseInt((height - 54) / 28)
            "
            v-model="recText"
            color="black"
            id="ta_rec"
          >
          </v-textarea>
        </v-col>
        <v-col :key="1.21" cols="12" :sm="1" :md="1" :lg="1" :xl="1">
          <v-row align="center" class="text-center">
            <v-col cols="6" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_save"
                style="
                  border-radius: 4px;
                  border-style: solid;
                  border-width: 1px;
                "
                tile
                x-large
                :disabled="this.isDisabled"
                fab
                depressed
                elevation="2"
                raised
                @click="download('script', recText)"
              >
                <v-icon>mdi-content-save-outline</v-icon>
                <span class="tooltiptext">Save the response</span>
              </v-btn>
            </v-col>
            <v-col cols="6" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_back"
                style="
                  border-radius: 4px;
                  border-style: solid;
                  border-width: 1px;
                "
                x-large
                tile
                :disabled="this.isDisabled"
                fab
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="py-0"
          key="colonna_inutile"
          cols="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <v-sheet
            elevation="0"
            :color="bgcolor"
            :height="
              browser == 'firefox'
                ? height - 54 - parseInt((height - 54) / 28) * 28 + 5
                : browser == 'chrome'
                ? height - 54 - parseInt((height - 54) / 28) * 28 + 22
                : height - 54 - parseInt((height - 54) / 28)
            "
          >
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

    export default {
    name : 'barRec',
    data: () => ({
        isDisabled: true,
        expanded: [],
        recHeaders: [
          {
            text: 'ISTRUCTION TYPE',
            sortable: false,
            value: 'name',
          }
        ],
        recArray: [
          {
            name: "USE DB",
            value: "USE DB INFORMATION_2021 ON SERVER MongoDB 'http://127.0.0.1:27017';"
          },
          {
            name: "GET COLLECTION",
            value: "GET COLLECTION FROM WEB 'https://www.dati.lombardia.it/resource/nf78-nj6b.json?$limit=1000000&$where=storico<>'S'';"
          },
          {
            name: "EXPAND",
            value: "EXPAND\nUNPACK\nWITH ARRAY .data\nARRAY .data\nTO .sensor\nDROP OTHERS ;"
          },
          {
            name: "FILTER",
            value: "FILTER\nCASE"+"\n"+
                    "WHERE WITH .sensor.item.idsensore , .sensor.item.provincia , .sensor.item.tipologia"+"\n"+
                    "AND .sensor.item.provincia = 'MI'"+"\n"+
                    "AND .sensor.item.tipologia = 'Radiazione Globale'"+"\n"+
                    "GENERATE {"+"\n"+
                    ".stationName : .sensor.item.nomestazione ,"+"\n"+
                    ".province : .sensor.item.provincia ,"+"\n"+
                    ".latitude : TO_FLOAT (.sensor.item.lat) ,"+"\n"+
                    ".longitude : TO_FLOAT (.sensor.item.lng) ,"+"\n"+
                    ".altitude : TO_FLOAT (.sensor.item.quota) ,"+"\n"+
                    ".sensorId : .sensor.item.idsensore ,"+"\n"+
                    ".sensorType : 'Global Radiation' ,"+"\n"+
                    ".sensorUnit : .sensor.item.unit_dimisura"+"\n"+
                    "}"+"\n"+
                    "WHERE WITH .sensor.item.idsensore , .sensor.item.provincia , .sensor.item.tipologia"+"\n"+
                    "AND .sensor.item.provincia = 'MI'"+"\n"+
                    "AND .sensor.item.tipologia = 'Precipitazione'"+"\n"+
                    "GENERATE {"+"\n"+
                    ".stationName : .sensor.item.nomestazione ,"+"\n"+
                    ".province : .sensor.item.provincia ,"+"\n"+
                    ".latitude : TO_FLOAT (.sensor.item.lat) ,"+"\n"+
                    ".longitude : TO_FLOAT (.sensor.item.lng) ,"+"\n"+
                    ".altitude : TO_FLOAT (.sensor.item.quota) ,"+"\n"+
                    ".sensorId : .sensor.item.idsensore ,"+"\n"+
                    ".sensorType : 'Rain Precipitation' ,"+"\n"+
                    ".sensorUnit : .sensor.item.unit_dimisura"+"\n"+
                    "}"+"\n"+
                    "DROP OTHERS ;"
          },
        ]
    }),
    props : {
        recText : String,
        height: Number,
        width: Number
    },
    watch: {
        recText: function(oldVal, newVal){
            if(oldVal != newVal){
                if(newVal.length > 0){
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            }
        }

  },
  mounted() {
  },
  methods: {
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
    closeWindow() {
      this.$emit("close-rec");
    },
    maximizeWindow() {
      this.$emit("maximize-rec");
    },
    Enabled() {
      this.isDisabled = true;
    },
    isEnabled() {
      return this.isDisabled;
    },
    download(filename, text) {
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
    },
  },
};
</script>

<style scoped>
#recDiv {
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}
</style>