<template>
    <v-container>
        <v-row align="center">
            <v-col cols="2">
                Main Color
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn red accent-4" fab small v-on:click="setMainColor('red')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn pink accent-3" fab small v-on:click="setMainColor('pink')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn document-color" fab small color="#0b77b8" v-on:click="setMainColor('document-color')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn teal accent-4" fab small v-on:click="setMainColor('teal')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn amber accent-4" fab small v-on:click="setMainColor('amber')"></v-btn>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="2">
                Main Theme
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn white" fab small v-on:click="setThemeColor('theme-light')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn black" fab small v-on:click="setThemeColor('theme-dark')"></v-btn>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="2">
                Main Style
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn" color="var(--border-color)" fab small v-on:click="setStyle('full')"></v-btn>
            </v-col>
            <v-col cols="1" v-if="!darkMode">
                <v-btn class="theme-btn" :dark="darkMode" style="border-style: solid; border-color: var(--border-color)" fab small v-on:click="setStyle('outlined')"></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
        
    data(){
        return{
            slider: 0
        }
    },
    props:{
        darkMode: Boolean
    },
    methods: {
        setMainColor(color){
            this.$emit("set-main-color", color);
        },
        setThemeColor(theme){
            this.$emit("set-theme-color", theme);
        },
        setStyle(style){
            this.$emit("set-style", style);
        },
        setCookie(name, value, daysToLive) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
        if(typeof daysToLive === "number") {
            /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
            cookie += "; secure; max-age=" + (daysToLive*24*60*60);
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