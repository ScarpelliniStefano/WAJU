<template>
    <v-container>
        <v-card>
            <v-card-title>
                Main Color
            </v-card-title>
            <v-card-actions>
                <v-container fluid>
                    <v-col>
                <v-btn class="theme-btn red" fab small color="#D32F2F" v-on:click="setMainColor('red')"></v-btn>
                <v-btn class="theme-btn pink" fab small color="#C2185B" v-on:click="setMainColor('pink')"></v-btn>
                <v-btn class="theme-btn purple" fab small color="#7B1FA2" v-on:click="setMainColor('purple')"></v-btn>
                <v-btn class="theme-btn deep-purple" fab small color="#512DA8" v-on:click="setMainColor('deep-purple')"></v-btn>
                <v-btn class="theme-btn indigo" fab small color="#303F9F" v-on:click="setMainColor('indigo')"></v-btn>
                <v-btn class="theme-btn blue" fab small color="#1976D2" v-on:click="setMainColor('blue')"></v-btn>
                    </v-col>
                    <v-col>
                <v-btn class="theme-btn light-blue" fab small color="#0288D1" v-on:click="setMainColor('light-blue')"></v-btn>
                <v-btn class="theme-btn cyan" fab small color="#0097A7" v-on:click="setMainColor('cyan')"></v-btn>
                <v-btn class="theme-btn teal" fab small color="#00796B" v-on:click="setMainColor('teal')"></v-btn>
                <v-btn class="theme-btn green" fab small color="#388E3C" v-on:click="setMainColor('green')"></v-btn>
                <v-btn class="theme-btn light-green" fab small color="#689F38" v-on:click="setMainColor('light-green')"></v-btn>
                <v-btn class="theme-btn lime" fab small color="#AFB42B" v-on:click="setMainColor('lime')"></v-btn>
                    </v-col>
                    <v-col>
                <v-btn class="theme-btn yellow" fab small color="#FBC02D" v-on:click="setMainColor('yellow')"></v-btn>
                <v-btn class="theme-btn amber" fab small color="#FFA000" v-on:click="setMainColor('amber')"></v-btn>
                <v-btn class="theme-btn orange" fab small color="#F57C00" v-on:click="setMainColor('orange')"></v-btn>
                <v-btn class="theme-btn deep-orange" fab small color="#E64A19" v-on:click="setMainColor('deep-orange')"></v-btn>
                <v-btn class="theme-btn brown" fab small color="#5D4037" v-on:click="setMainColor('brown')"></v-btn>
                <v-btn class="theme-btn blue-grey" fab small color="#455A64" v-on:click="setMainColor('blue-grey')"></v-btn>
                    </v-col>
                </v-container>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>
                Theme Color
            </v-card-title>
            <v-card-actions>
                <v-btn class="theme-btn white" fab small v-on:click="setThemeColor('theme-light')"></v-btn>
                <v-btn class="theme-btn black" fab small v-on:click="setThemeColor('theme-dark')"></v-btn>
                <v-btn class="theme-btn blue darken-4" fab small v-on:click="setThemeColor('theme-blue')"></v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title>
                Font Size
            </v-card-title>
            <v-container style="height: 10px;"></v-container>
            <v-card-actions>
                <v-slider
                    v-model="slider"
                    max="50"
                    min="10"
                    thumb-label="always"
                    color="red"
                    ></v-slider>
                    <v-btn>SAVE</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
        
    data(){
        return{
            slider: 0,
            preColor: "",
            classMainColor: ["red","pink","purple","deep-purple","indigo", "blue",
                            "light-blue","cyal","teal","green","light-green","lime",
                            "yellow","amber","orange","deep-orange","brown","blue-grey"],
            classThemeColor: ["theme-light","theme-dark","theme-blue","theme-grey"],
            classFontColor: ["font-white","font-black","font-yellow","font-blue","font-orange","font-red","font-gree"],
            classFontSize: ["fs-11", "fs-12", "fs-13", "fs-14", "fs-15",
                            "fs-16", "fs-17", "fs-18", "fs-19", "fs-20",
                            "fs-21", "fs-22", "fs-23", "fs-24", "fs-25",
                            "fs-26", "fs-27", "fs-28", "fs-29", "fs-30",
                            "fs-31", "fs-32", "fs-33", "fs-34", "fs-35",
                            "fs-36", "fs-37", "fs-38", "fs-39", "fs-40",
                            "fs-41", "fs-42", "fs-43", "fs-44", "fs-45",
                            "fs-46", "fs-47", "fs-48", "fs-49", "fs-50"]
        }
    },
    methods: {
        setMainColor(color){
            this.$emit("set-main-color", color);
        },
        setThemeColor(theme){
            this.$emit("set-theme-color", theme);
        },
        setCookie(name, value, daysToLive) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
        if(typeof daysToLive === "number") {
            /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
            cookie += "; max-age=" + (daysToLive*24*60*60);
            document.cookie = cookie;
          }
      },
      getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(";");
      // Loop through the array elements
      for(var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
          if(name == cookiePair[0].trim()) {
              // Decode the cookie value and return
              return decodeURIComponent(cookiePair[1]);
          }
        }
      // Return null if not found
        return null;
      }
    }
}
</script>

<style>

</style>