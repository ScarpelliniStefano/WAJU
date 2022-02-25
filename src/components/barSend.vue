<template>
    <v-sheet elevation="17" id="recDiv" class="divstyle">
        <v-sheet style="border-bottom: 1px solid #dddddd;background-color: var(--bg-div-color); border-top-left-radius: 3px;border-top-right-radius: 3px;" elevation="14" class="topbar" @click="$emit('set-z-click', 'rec')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 5px">Command</h4>
        <v-icon color="red darken-4" style="float: right" v-on:click="closeWindow()"
            >mdi-close</v-icon>
        <v-icon class="moderndesign" style="float: right; color: #FFD700;" v-on:click="maximizeWindow()"
            >mdi-window-maximize</v-icon>
        </v-sheet>
        <v-container style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;" v-if="rapporto < 3/2" class="containerstyle" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="12"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12">
                    <v-sheet id="div_send" :height="height-136" contenteditable></v-sheet>
                </v-col>
                <v-col :key="1.2" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <v-row align="center" class="text-center">
                        <v-col>
                            <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="overlay = !overlay;">
                                <v-icon color="white">mdi-auto-fix</v-icon>
                                <span style="color: white">Wizard</span>
                            </v-btn>
                            <v-overlay absolute opacity="0.9" :value="overlay" color="white">
                                <v-btn class="btnstyle" color="orange lighten-2" @click="overlay = false">
                                    Close Wizard
                                </v-btn>
                            </v-overlay>
                        </v-col>
                        <v-col>
                            <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="sendMessage()">
                                <v-icon color="white">mdi-play</v-icon>
                                <span style="color: white">Execute</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="rapporto >= 3/2 && rapporto < 11/4" class="containerstyle" fluid>
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
                            <v-btn large class="tooltip btnstyle" tile style="color: white;background-color: var(--border-color);" fab depressed elevation="5" raised @click="sendMessage()">
                                <v-icon color="white" large>mdi-play</v-icon>
                                <span class="tooltiptext">Execute</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <v-btn large class="tooltip btnstyle" tile style="color: white;background-color: var(--border-color);" fab depressed elevation="5" raised @click="overlay = !overlay;">
                                <v-icon color="white" large>mdi-auto-fix</v-icon>
                                <span style="z-index: 0" class="tooltiptext">Wizard</span>
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
        <v-container v-if="rapporto >= 11/4" class="containerstyle" fluid>
            <v-row align="center">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    :cols="10">
                    <v-sheet id="div_send" :height="height-56" contenteditable></v-sheet>
                </v-col>
                    <v-col :key="1.2" :cols="2">
                        <v-row align="center">
                            <v-col>
                                <v-sheet :height="(height-80)/2">
                                    <v-btn :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -40%); " fab depressed elevation="5" @click="sendMessage()">
                                        <v-icon color="white">mdi-play</v-icon>
                                        Execute
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col>
                                <v-sheet :height="(height-80)/2">
                                    <v-btn :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -60%); " fab depressed elevation="5" @click="overlay = !overlay;">
                                        <v-icon color="white">mdi-auto-fix</v-icon>
                                        Wizard
                                    </v-btn>
                                </v-sheet>
                            </v-col>
                        </v-row>
                    </v-col>
            </v-row>
        </v-container>
    </v-sheet>
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
            this.textSend = "";
            var x = document.getElementById("div_send").querySelectorAll("div")
            x.forEach(element =>{
                element.appendChild(document.createTextNode (" "));
            }); 
            x = document.getElementById("div_send");
            this.textSend += x.textContent + "\n\r";
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

    #div_send{
        background-color: #e9e9e9; 
        overflow-y: auto; 
        position: relative;
        border-radius: 4px;
    }

    @media screen and (min-width: 1264px) and (max-width: 1903px){
        #div_send{
            font-size: 14px;
        }
    }

    @media screen and (min-width: 1904px){
        #div_send{
            font-size: 24px;
        }
    }
    

</style>
