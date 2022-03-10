<template>
<v-sheet :dark="darkMode" elevation="17" id="recDiv" class="divstyle">
    <v-sheet :dark="darkMode" style="border-bottom: 1px solid #dddddd; border-top-left-radius: 3px;border-top-right-radius: 3px;" elevation="14" class="topbar" @click="$emit('set-z-click', 'send')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 10px; margin-top:2px">{{title}}</h4>
        <v-icon color="red darken-4" style="float: right; margin-right:5px; margin-top: 2px" v-on:click="closeWindow()">mdi-close</v-icon>
    </v-sheet>
    <v-sheet :dark="darkMode" style="border-top-left-radius: 3px; border-top-right-radius: 3px;">
        <v-container style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;" v-if="rapporto < 3/2" fluid>
            <v-row align="center">
                <v-col :key="1.1" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <v-textarea outlined :dark="darkMode" id="div_send" :height="height - 136" no-resize color="var(--border-color)" v-model="textSend"></v-textarea>
                </v-col>
                <v-col :key="1.2" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <v-row align="center" class="text-center">
                        <v-col>
                            <v-btn :dark="darkMode" :width="(width-100)/2" color="var(--border-color)" class="tooltip btnstyle" style="color: white;" tile fab depressed elevation="5" raised @click="openWizard()">
                                <v-icon>mdi-auto-fix</v-icon>
                                <span>Wizard</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn :dark="darkMode" :loading="exec" :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="sendMessageArr()">
                                <v-icon color="white">mdi-play</v-icon>
                                <span style="color: white">Execute</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="rapporto >= 3/2 && rapporto < 5/2" fluid style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;">
            <v-row align="center">
                <v-col :cols='10'>
                    <v-textarea outlined :dark="darkMode" id="div_send" :height="height - 56" no-resize color="var(--border-color)" v-model="textSend"></v-textarea>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col :cols="2">
                    <v-row align="center">
                        <v-col>
                            <v-sheet :dark="darkMode" :height="(height-80)/2">
                                <v-btn @mouseenter="changeTitle('Execute')" @mouseleave="title = defaultTitle" :loading="exec" :width="width/6 - 24" :height="width/6 - 24" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " fab depressed elevation="5" @click="sendMessageArr()">
                                    <v-icon color="white" :size="width/15">mdi-play</v-icon>
                                </v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <v-sheet :dark="darkMode" :height="(height-80)/2">
                                <v-btn @mouseenter="changeTitle('Wizard')" @mouseleave="title = defaultTitle" :width="width/6 - 24" :height="width/6 - 24" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -55%); " fab depressed elevation="5" @click="openWizard()">
                                    <v-icon color="white" :size="width/20">mdi-auto-fix</v-icon>
                                </v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-if="rapporto >= 5/2" fluid style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;">
            <v-row align="center">
                <v-col :key="1.1" :cols="10">
                    <v-textarea outlined :dark="darkMode" id="div_send" :height="height - 56" no-resize color="var(--border-color)" v-model="textSend"></v-textarea>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col :key="1.2" :cols="2">
                    <v-row align="center">
                        <v-col>
                            <v-sheet :dark="darkMode" :height="(height-80)/2">
                                <v-btn :loading="exec" :width="width/6 - 24" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -40%); " fab depressed elevation="5" @click="sendMessageArr()">
                                    <v-icon color="white">mdi-play</v-icon>
                                    Execute
                                </v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col>
                            <v-sheet :dark="darkMode" :height="(height-80)/2">
                                <v-btn :width="width/6 - 24" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -60%); " fab depressed elevation="5" @click="openWizard()">
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
</v-sheet>
</template>

<script>
export default {
    name: 'barSend',
    data() {
        return {
            overlay: false,
            textSend: '',
            exec: false,
            defaultTitle: 'Command',
            title: 'Command'
        }
    },
    props: {
        height: Number,
        randomNumberString: String,
        width: Number,
        browser: String,
        rapporto: Number,
        textRec: String,
        darkMode: Boolean,
        outlined: Boolean,
        textChange: String
    },
    watch: {
        textRec: function (newVal) {
            this.changeText(newVal)
        },
        textChange: function (newVal) {
            this.textSend = newVal
        }
    },
    mounted() {
        window.addEventListener('resize', this.copyText);
    },
    methods: {
        copyText(){
            if (this.textSend === undefined) this.textSend = ''
            this.$emit('send-text', this.textSend)
        },
        changeText(value){
            var typeUpdate=value.split("###")[0];
            var textWizard=value.split("###")[1];
            if(typeUpdate=="RESET")
              this.textSend = textWizard.replace(/(<([^>]+)>)/ig, '\n')
            if(typeUpdate=="APPEND")
                if(this.textSend.endsWith('\n')) {
                    this.textSend += textWizard.replace(/(<([^>]+)>)/ig, '\n')
                }else{
                    this.textSend += '\n'+textWizard.replace(/(<([^>]+)>)/ig, '\n')
                }
        },
        changeTitle(tip) {
            this.title = this.defaultTitle + " - " + tip
        },
        highlight(newVal) {
            this.exec = true
            //Parole della risposta assegnata 
            var arrResponse = newVal.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
            //Righe del div contenteditable
            var innerHTML = document.getElementById("div_send").innerHTML;
            innerHTML = innerHTML.replace(/(<([^>]+)>)/ig, '</br>').replace(/(?:\r\n|\r|\n)/g, '</br>').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<")
            var arrHTML = innerHTML.split('</br>').filter(element => element.length > 0 & !element.startsWith("<", 0));
            document.getElementById("div_send").innerHTML = ""
            var contResponse = 0
            arrHTML.forEach(element => {
                var arrWORDSofHTML = element.split(" ")
                var check = true;
                var contHTML = 0;
                while (contHTML < arrWORDSofHTML.length && check === false) {
                    if (arrWORDSofHTML[contHTML] !== arrResponse[contResponse]) {
                        check = false;
                    }
                    contHTML++;
                    contResponse++;
                }
                if (check === false) {
                    document.getElementById("div_send").innerHTML += `<div>${element}</div>`
                }
            })
            this.exec = false
        },
        openWizard() {
            let routeData = this.$router.resolve({
                name: 'Wizard',
                query: {
                    id: this.randomNumberString
                }
            });
            console.log(routeData);
            setTimeout(function () {
                window.open(routeData.href, '_blank');
            }, 50);
        },
        /*
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
            this.exec = true
        },
        */
        sendMessageArr() {
            /*
            var innerHTML = document.getElementById("div_send").innerHTML;

            innerHTML = innerHTML.replace(/(<([^>]+)>)/ig, '</br>').replace(/(?:\r\n|\r|\n)/g, '</br>').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ")
            var arrHTML = innerHTML.split('</br>').filter(element => element.length > 0 & !element.startsWith("<", 0));
            console.log(arrHTML)
            arrHTML.forEach(element => {
                this.textSend += element + "\n";
            })

            this.textSend += "\n\r";
            */
            this.$emit('click-send', this.textSend)
        },
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
            this.$emit('close-send');
        }
    }

}
</script>

<style scoped>
#sendDiv {
    background-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

::v-deep #div_send {
    margin-top: 0px;
    line-height: 1.25rem;
}

::v-deep fieldset {
    padding-left: 0px !important;
    z-index: 45 !important;
    border: 1px solid var(--border-color) !important;
    transition-duration: 0ms !important;
}

::v-deep fieldset:hover {
    padding-left: 0px !important;
    z-index: 45 !important;
    border: 1px solid var(--border-color) !important;
    transition-duration: 0ms !important;
}

::v-deep fieldset:focus {
    padding-left: 0px !important;
    z-index: 45 !important;
    border: 1px solid var(--border-color) !important;
    transition-duration: 0ms !important;
}

::v-deep .v-input__slot {
    padding-left: 4px !important;
    padding-right: 14px !important;
    transition-duration: 0ms !important;
}

::v-deep .v-text-field__slot {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
}

@media screen and (max-width: 1263px) {
    #div_send {
        font-size: 14px;
    }
}

@media screen and (min-width: 1264px) and (max-width: 1903px) {
    #div_send {
        font-size: 16px;
    }
}

@media screen and (min-width: 1904px) {
    #div_send {
        font-size: 18px;
    }
}
</style>
