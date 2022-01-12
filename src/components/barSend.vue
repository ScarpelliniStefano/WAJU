<template>
    <div id="sendDiv" class="divstyle">
        <div class="topbar" v-on:click="$emit('set-z-click', 'send')">
            <h4 class="noselect" style="float:left; margin-left: 5px">Command</h4>
            <v-icon color="white" style="float: right;" v-on:click="closeWindow()">mdi-close</v-icon>
        </div>
        <v-container class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="12"
                    :sm="10"
                    :md="12"
                    :lg="12"
                    :xl="12">
                    <v-sheet :height="height-136">
                        <v-textarea 
                            id="div_send" 
                            contenteditable="true" 
                            style="background-color: #aaaaaa; overflow-y: auto; position: relative">
                        </v-textarea>
                    </v-sheet>
                    <v-textarea
                    text-narrow
                        class="tastyle pt-0 mt-0"
                        style="font-size: 16px;"
                        rows="13"
                        no-resize
                        name="input-7-2"
                        color="black"
                        v-model.lazy="textSend"
                        id="ta_send" >
                    </v-textarea>
                </v-col>
                <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                    <v-row align="center" class="text-center">
                        <v-col>
                            <v-btn class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="$emit('click-send', textSend);">
                                <v-icon>mdi-play</v-icon>
                                <span class="tooltiptext">Execute command</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="overlay = !overlay;">
                                <v-icon large>mdi-auto-fix</v-icon>
                                <span class="tooltiptext">Wizard</span>
                            </v-btn>
                            <v-overlay absolute opacity="0.9" :value="overlay" color="white">
                                <v-btn class="btnstyle" color="orange lighten-2" @click="overlay = false">
                                    Close Wizard
                                </v-btn>
                            </v-overlay>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>

export default {
    name : 'barSend',
    data(){
        return{
            overlay: false,
            textSend: ''
        }
    },
    props:{
        height: Number,
        width: Number
    },
    methods:{
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
      },
      closeWindow(){
          this.$emit('close-send');
      }
    }
   
}
</script>

<style scoped>
    #sendDiv{
        background-color: white;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
    }


</style>
