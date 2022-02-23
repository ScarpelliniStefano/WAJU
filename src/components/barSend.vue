<template>
    <div id="sendDiv" class="divstyle">
        <div class="topbar" v-on:click="$emit('set-z-click', 'send')">
            <h4 class="noselect" style="float:left; margin-left: 5px">Command</h4>
            <v-icon color="white" style="float: right;" v-on:click="closeWindow()">mdi-close</v-icon>
            <v-icon color="white" style="float: right;" v-on:click="maximizeWindow()">mdi-window-maximize</v-icon>
        </div>
        <v-container v-if="rapporto < 3/2" class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="12"
                    :sm="12"
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
                <v-col :key="1.2" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <v-row align="center" class="text-center">
                        <v-col>
                            <v-btn class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="sendMessage()">
                                <v-icon large>mdi-play</v-icon>
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
        <v-container v-if="rapporto >= 3/2 && rapporto < 3" class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="10"
                    :sm="10"
                    :md="10"
                    :lg="10"
                    :xl="10">
                    <v-sheet id="div_send" :height="height-56" contenteditable></v-sheet>
                </v-col>
                <v-col :key="1.2" cols="2" :sm="2" :md="2" :lg="2" :xl="2">
                    <v-row align="center" class="text-center">
                        <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <v-btn large class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="sendMessage()">
                                <v-icon large>mdi-play</v-icon>
                                <span class="tooltiptext">Execute command</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <v-btn large class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="overlay = !overlay;">
                                <v-icon large>mdi-auto-fix</v-icon>
                                <span class="tooltiptext">Wizard</span>
                            </v-btn>
                            <v-overlay absolute opacity="0.9" :value="overlay" color="white">
                                <v-btn class="btnstyle" color="orange lighten-2" @click="overlay = false">
                                    Chiudi Wizard
                                </v-btn>
                            </v-overlay>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="rapporto >= 3" class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="11"
                    :sm="11"
                    :md="11"
                    :lg="11"
                    :xl="11">
                    <v-sheet id="div_send" :height="height-56" contenteditable></v-sheet>
                </v-col>
                <v-col :key="1.2" cols="1" :sm="1" :md="1" :lg="1" :xl="1">
                    <v-row align="center" class="text-center">
                        <v-col>
                            <v-btn x-large class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="sendMessage()">
                                <v-icon x-large>mdi-play</v-icon>
                                <span class="tooltiptext">Execute command</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn x-large class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab depressed elevation="2" raised @click="overlay = !overlay;">
                                <v-icon x-large>mdi-auto-fix</v-icon>
                                <span class="tooltiptext">Wizard</span>
                            </v-btn>
                            <v-overlay absolute opacity="0.9" :value="overlay" color="white">
                                <v-btn class="btnstyle" color="orange lighten-2" @click="overlay = false">
                                    Chiudi Wizard
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
        width: Number,
        browser: String,
        rapporto: Number,
        bgcolor: String
    },
    mounted(){
    },
    methods:{
        sendMessage(){
            this.textSend = ""
            var x = document.getElementById("div_send").querySelectorAll("div")
            for (let i = 0; i < x.length; i++) {
                this.textSend += x[i].textContent + "\n";
            }
            this.textSend.slice(-1);
            this.$emit('click-send', this.textSend)
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

    @media screen and (min-width: 1264px) and (max-width: 1903px){
        #div_send{
            background-color: #dddddd; 
            overflow-y: auto; 
            position: relative;
            font-size: 14px;
        }
    }

    @media screen and (min-width: 1904px){
        #div_send{
            background-color: #dddddd; 
            overflow-y: auto; 
            position: relative;
            font-size: 24px;
        }
    }
    

</style>
