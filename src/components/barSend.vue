<template>
    <div id="sendDiv" class="divstyle">
        <v-container class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center"
            class="grow">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="12"
                    :sm="10"
                    :md="12"
                    :lg="12"
                    :xl="12">
                    <v-textarea
                        class="tastyle"
                        style="font-size: 16px;"
                        no-resize
                        rows="13"
                        justify="center"
                        height="100%"
                        name="input-7-1"
                        label="Comando"
                        v-model.lazy="textSend"
                        hint="Inserisci il comando"
                        id="ta_send" 
                        placeholder="Comando">
                    </v-textarea>
                </v-col>
                <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                    <v-row align="center" justify="center" class="text-center">
                        <v-col>
                            <v-btn class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab large depressed elevation="2" raised @click="$emit('click-send', textSend);">
                                <v-icon large>mdi-play</v-icon>
                                <span class="tooltiptext">Execute command</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn class="tooltip btnstyle" tile style="border-radius: 4px; border-style: solid; border-width: 1px; " fab large depressed elevation="2" raised @click="overlay = !overlay; $emit('click-send', textSend);">
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
