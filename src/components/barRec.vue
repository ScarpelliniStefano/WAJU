<template>
  <div id="recDiv" class="divstyle">
    <div class="topbar" @click="$emit('set-z-click', 'rec')">
      <h4 class="noselect" style="float: left; margin-left: 5px">Response</h4>
      <v-icon color="white" style="float: right" v-on:click="closeWindow()"
        >mdi-close</v-icon
      >
      <v-icon color="white" style="float: right" v-on:click="maximizeWindow()"
        >mdi-window-maximize</v-icon
      >
    </div>
    <v-container
      :class="bgcolor"
      v-if="rapporto < 3 / 2"
      class="containerstyle"
      style="border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;"
      fluid
    >
      <v-row align="center">
        <v-col
          class="py-0"
          :key="1.1"
          cols="12"
          :sm="10"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <v-textarea
            readonly
            class="tastyle pt-0 mt-0"
            no-resize
            name="input-7-1"
            :rows="
              browser == 'firefox'
                ? parseInt((height - 134) / 28)
                : parseInt((height - 134) / 28)
            "
            v-model="recText"
            color="black"
            id="ta_rec"
          >
          </v-textarea>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.mdOnly" class="py-0">
          <v-sheet
            elevation="0"
            :color="bgcolor"
            :height="
              browser == 'firefox'
                ? height - 134 - parseInt((height - 134) / 28) * 28 + 5
                : browser == 'chrome'
                ? height - 134 - parseInt((height - 134) / 28) * 28 + 22
                : height - 134 - parseInt((height - 134) / 28)
            "
          >
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
                  border-style: solid;
                  border-width: 1px;
                "
                tile
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
  name: "barRec",
  data: () => ({
    isDisabled: true,
  }),
  props: {
    recText: String,
    height: Number,
    width: Number,
    browser: String,
    rapporto: Number,
    bgcolor: String
  },
  watch: {
    recText: function (oldVal, newVal) {
      if (oldVal != newVal) {
        if (newVal.length > 0) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    },
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