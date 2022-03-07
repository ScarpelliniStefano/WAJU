<template>
<v-sheet elevation="17" id="recDiv" class="divstyle">
    <v-sheet style="border-bottom: 1px solid #dddddd;background-color: var(--bg-div-color); border-top-left-radius: 3px;border-top-right-radius: 3px;" elevation="14" class="topbar" @click="$emit('set-z-click', 'send')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 5px">{{title}}</h4>
        <v-icon color="red darken-4" style="float: right" v-on:click="closeWindow()">mdi-close</v-icon>
    </v-sheet>
    <v-container style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;" v-if="rapporto < 3/2" class="containerstyle" fluid>
        <v-row align="center">
            <v-col :key="1.1" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                <v-sheet id="div_send" :height="height-136" contenteditable></v-sheet>
            </v-col>
            <v-col :key="1.2" cols="12" :sm="12" :md="12" :lg="12" :xl="12">
                <v-row align="center" class="text-center">
                    <v-col>
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="openWizard()">
                            <v-icon color="white">mdi-auto-fix</v-icon>
                            <span style="color: white">Wizard</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn :loading="exec" :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="sendMessageArr()">
                            <v-icon color="white">mdi-play</v-icon>
                            <span style="color: white">Execute</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="rapporto >= 3/2 && rapporto < 5/2" class="containerstyle" fluid style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;">
        <v-row align="center">
            <v-col :key="'send_first_col'" :cols='10'>
                <v-sheet id="div_send" :height="height-56" contenteditable></v-sheet>
            </v-col>
            <v-col :key="'send_second_col'" :cols="2">
                <v-row align="center">
                    <v-col>
                        <v-sheet :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('Execute')" @mouseleave="title = defaultTitle" :loading="exec" :width="width/6 - 36" :height="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " fab depressed elevation="5" @click="sendMessageArr()">
                                <v-icon color="white" :size="width/15">mdi-play</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <v-sheet :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('Wizard')" @mouseleave="title = defaultTitle" :width="width/6 - 36" :height="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -55%); " fab depressed elevation="5" @click="openWizard()">
                                <v-icon color="white" :size="width/20">mdi-auto-fix</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="rapporto >= 5/2" class="containerstyle" fluid style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;">
        <v-row align="center">
            <v-col :key="1.1" :cols="10">
                <v-sheet id="div_send" :height="height-56" contenteditable></v-sheet>
            </v-col>
            <v-col :key="1.2" :cols="2">
                <v-row align="center">
                    <v-col>
                        <v-sheet :height="(height-80)/2">
                            <v-btn :loading="exec" :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -40%); " fab depressed elevation="5" @click="sendMessageArr()">
                                <v-icon color="white">mdi-play</v-icon>
                                Execute
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <v-sheet :height="(height-80)/2">
                            <v-btn :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -60%); " fab depressed elevation="5" @click="openWizard()">
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
        bgcolor: String,
        textRec: String
    },
    watch: {
        textRec: function (newVal) {
            this.highlight(newVal)
        }
    },
    mounted() {},
    methods: {
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
            this.textSend = "";

            var innerHTML = document.getElementById("div_send").innerHTML;

            innerHTML = innerHTML.replace(/(<([^>]+)>)/ig, '</br>').replace(/(?:\r\n|\r|\n)/g, '</br>').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ")
            var arrHTML = innerHTML.split('</br>').filter(element => element.length > 0 & !element.startsWith("<", 0));
            console.log(arrHTML)
            arrHTML.forEach(element => {
                this.textSend += element + "\n";
            })

            this.textSend += "\n\r";
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

#div_send {
    background-color: #e9e9e9;
    overflow-y: auto;
    position: relative;
    border-radius: 4px;
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
