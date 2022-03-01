<template>
  <v-sheet elevation="17" id="recDiv" class="divstyle">
    <v-sheet style="border-bottom: 3px solid #dddddd;" elevation="14" class="topbar" @click="$emit('set-z-click', 'rec')">
      <h4 class="noselect moderndesign" style="float: left; margin-left: 5px">Response</h4>
      <v-icon color="red darken-4" style="float: right" v-on:click="closeWindow()"
        >mdi-close</v-icon
      >
    </v-sheet>
    <v-container
      :class="bgcolor"
      v-if="rapporto < 3 / 2"
      class="containerstyle"
      style="border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;"
      fluid
    >
      <v-row align="center">
        <v-col
          :key="1.1"
          cols="12"
          :sm="10"
          :md="12"
          :lg="12"
          :xl="12"
        >
        <v-sheet :height="height-136" style="overflow: auto">   
        <v-data-table 
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="parseInt((height-134)/28)"
            :items="recArr"
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
                <p>{{item.value}}</p>
                </td>
            </template>
        </v-data-table>
        </v-sheet>   
        </v-col>
        <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
          <v-row align="center" class="text-center">
            <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
              <v-btn
                class="tooltip btnstyle"
                id="btn_save"
                style="
                  border-radius: 4px;
                "
                tile
                :disabled="this.recArr.length==0"
                fab
                depressed
                elevation="10"
                raised
                @click="download('script', recText)"
              >
                <v-icon>mdi-content-save-outline</v-icon>
                <span class="tooltiptext">Save the response</span>
              </v-btn>
            </v-col>
            <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
              <v-btn
                class="tooltip btnstyle"
                id="btn_back"
                style="border-radius: 4px;"
                tile
                elevation="10"
                :disabled="this.recArr.length==0"
                fab
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      :class="bgcolor"
      v-if="rapporto >= 3 / 2 && rapporto < 11/4"
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
          <v-sheet :height="height-32" style="overflow: auto">
              <v-data-table 
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="parseInt((height-134)/28)"
            :items="recArr"
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
                <p>{{item.value}}</p>
                </td>
            </template>
        </v-data-table>
        </v-sheet>
        </v-col>
        <v-col :key="1.21" cols="12" :sm="2" :md="2" :lg="2" :xl="2">
          <v-row align="center" class="text-center">
            <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_save"
                style="border-radius: 4px;"
                tile
                large
                :disabled="this.recArr.length==0"
                fab
                depressed
                elevation="10"
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
                style="border-radius: 4px;"
                large
                tile
                elevation="10"
                :disabled="this.recArr.length==0"
                fab
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      :class="bgcolor"
      v-if="rapporto >= 11/4"
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

        <v-sheet :height="height-32" style="overflow: auto">
            <v-data-table 
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="parseInt((height-134)/28)"
            :items="recArr"
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
                <p>{{item.value}}</p>
                </td>
            </template>
        </v-data-table>
        </v-sheet>
        </v-col>
        <v-col :key="1.21" cols="12" :sm="1" :md="1" :lg="1" :xl="1">
          <v-row align="center" class="text-center">
            <v-col cols="6" :sm="12" :md="12" :lg="12" :xl="12">
              <v-btn
                class="tooltip btnstyle"
                id="btn_save"
                style="
                  border-radius: 4px;
                "
                tile
                x-large
                :disabled="this.recArr.length==0"
                fab
                depressed
                elevation="10"
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
                "
                x-large
                tile
                :disabled="this.recArr.length==0"
                fab
                elevation="10"
                @click="$emit('click-back-index')"
              >
                <v-icon>mdi-history</v-icon>
                <span class="tooltiptext">Backtrack</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
export default {
  name: "barRec",
  data: () => ({
    isDisabled: true,
      expanded:[],
      recHeaders: [
        {
          text: 'ISTRUCTION TYPE',
          sortable: false,
          value: 'name',
        }
      ]
       
  }),
  props: {
    recText: String,
    recArr: Array,
    height: Number,
    width: Number,
    browser: String,
    rapporto: Number,
    bgcolor: String
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

<style>
#recDiv {
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}
</style>