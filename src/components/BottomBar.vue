<template>
<v-sheet elevation="17" id="recDiv" class="divstyle">
    <v-sheet style="border-bottom: 1px solid #dddddd;background-color: var(--bg-div-color); border-top-left-radius: 3px;border-top-right-radius: 3px;" elevation="14" class="topbar" @click="$emit('set-z-click', 'btm')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 10px; margin-top:2px">{{this.title}}</h4>
        <v-icon color="red darken-4" style="float: right; margin-right:5px; margin-top: 2px" v-on:click="closeWindow()">mdi-close</v-icon>
    </v-sheet>
    <v-container v-if="rapporto < 3/2" class="containerstyle" fluid style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; max-width: 99999px;">
        <v-row align="center">
            <v-col v-if="conf" :cols="12">
                <v-textarea class="tastyle pt-0 mt-0" readonly style="padding-bottom: 8px; font-size: 14px;" no-resize :rows="parseInt((height - 193) / 28)" height="100%" name="conf-text" v-model="bottomText.textConf" id="ta_conf"></v-textarea>
                <input type="file" id="file_config" v-on:change="loadFile()" style="display: none;" />
                <v-btn block height="32px" v-on:click="uploadConf()">
                    <v-icon small>mdi-upload
                    </v-icon>
                    Upload configuration
                </v-btn>
            </v-col>
            <v-col v-if="conf" class="py-0" :cols="12">
                <v-sheet class="py-0" elevation="0" color="white" :height="height - 193 - parseInt((height - 193) / 28) * 28"></v-sheet>
            </v-col>
            <v-col v-if="ispectstate" cols="12">
                <v-sheet id="div_send" :height="height-192" style="overflow: auto">
                    <v-list class="pa-0">

                        <v-list-item v-for="coll in bottomText.listIRCol" :key="coll">
                            <v-list-item-avatar>
                                <v-icon style="background-color: var(--border-color)" color="white">
                                    mdi-database
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="coll"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="numDepth = 1; $emit('click-irc', coll)" color="var(--border-color)">
                                    IR
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>
            <v-col v-if="ispectstate" cols="12">
                <v-btn class="tooltip btnstyle" block height="32px" :disabled="!this.irPressed||this.bottomText.listIRCol.length < 1 ||this.bottomText.listIRCol == undefined"
                    @click="numDepth = 1; $emit('click-tc')">
                    <v-icon>mdi-page-last</v-icon>
                    Temporary Collection
                </v-btn>
            </v-col>
            <v-col :cols="12">
                <v-row align="center" class="text-center">
                    <v-col cols="6">
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised v-on:click="setConf()">
                            <v-icon small>mdi-wrench</v-icon>
                            Config.
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="
                            irPressed = true
                            setIR()
                            $emit('click-ir')">
                            <v-icon small>mdi-file-find-outline</v-icon>
                            IR Request
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="rapporto >= 3/2 && rapporto < 5/2" class="containerstyle" fluid style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; max-width: 99999px;">
        <v-row align="center">
            <v-col v-if="conf" :cols="10">
                <v-textarea class="tastyle pt-0 mt-0" readonly style="padding-bottom: 8px; font-size: 14px;" no-resize :rows="parseInt((height - 112) / 28)" height="100%" name="conf-text" v-model="bottomText.textConf" id="ta_conf"></v-textarea>
                <input type="file" id="file_config" v-on:change="loadFile()" style="display: none;" />
                <v-btn block height="32px" v-on:click="uploadConf()">
                    <v-icon small>mdi-upload
                    </v-icon>
                    Upload configuration
                </v-btn>
            </v-col>
            <v-col v-if="ispectstate" cols="10" class="pr-0">
                <v-sheet id="div_send" :height="height-112" style="overflow: auto">
                    <v-list class="pa-0">

                        <v-list-item v-for="coll in bottomText.listIRCol" :key="coll">
                            <v-list-item-avatar>
                                <v-icon style="background-color: var(--border-color)" color="white">
                                    mdi-database
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="coll"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="numDepth = 1; $emit('click-irc', coll)" color="var(--border-color)">
                                    IR
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-sheet>
                <v-col v-if="ispectstate" class="pr-0">
                    <v-btn class="tooltip btnstyle" block height="32px" :disabled="!this.irPressed||this.bottomText.listIRCol.length < 1 ||this.bottomText.listIRCol == undefined"
                        @click="numDepth = 1; $emit('click-tc')">
                        <v-icon>mdi-page-last</v-icon>
                        Temporary Collection
                    </v-btn>
                </v-col>
            </v-col>
            <v-col :cols="2">
                <v-row align="center" class="text-center">
                    <v-col cols="12">
                        <v-sheet :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('Configuration')" @mouseleave="title = defaultTitle" :width="width/6 - 36" :height="width/6 - 36" class="tooltip btnstyle" style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " tile fab depressed elevation="5" raised v-on:click="setConf()">
                                <v-icon :size="width/20">mdi-wrench</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col cols="12">
                        <v-sheet :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('IR Collection')" @mouseleave="title = defaultTitle" :width="width/6 - 36" :height="width/6 - 36" class="tooltip btnstyle" style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -55%); " tile fab depressed elevation="5" raised @click="
                                irPressed = true
                                setIR()
                                $emit('click-ir')">
                                <v-icon :size="width/20">mdi-file-find-outline</v-icon>
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
    name: 'barRec',
    components: {},
    props: {
        bottomText: Object,
        height: Number,
        width: Number,
        browser: String,
        rapporto: Number,
        darkMode: Boolean,
        outlined: Boolean
    },
    data: () => ({
        value: 1,
        heightMax: 0,
        error: false,
        conf: true,
        ispectstate: false,
        irPressed: false,
        selectedItem: -1,
        numDepth: 1,
        textButton: 'Configuration',
        listEmpty: true,
        defaultTitle: 'Configuration',
        title: 'Configuration'
    }),
    created() {},
    mounted() {},
    watch: {
        bottomText: function (newVal, oldVal) {
            console.log(newVal.listIRCol)
            if (newVal.listIRCol != oldVal.listIRCol) {
                if (newVal.listIRCol.length < 1 || newVal.listIRCol == undefined) {
                    this.listEmpty = true;
                } else {
                    this.listEmpty = false;
                }
            }
        }
    },
    methods: {
        changeTitle(tip) {
            if (tip !== this.textButton){
                this.title = this.defaultTitle + ' > ' + tip
            }
        },
        getCookie(name) {
            // Split cookie string and get all individual name=value pairs in an array
            var cookieArr = document.cookie.split(';')
            // Loop through the array elements
            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split('=')
                /* Removing whitespace at the beginning of the cookie name
                  and compare it with the given string */
                if (name == cookiePair[0].trim()) {
                    // Decode the cookie value and return
                    return decodeURIComponent(cookiePair[1])
                }
            }
            // Return null if not found
            return null
        },
        closeWindow() {
            this.$emit('close-btm');
        },
        async loadFile() {
            var file = document.getElementById('file_config').files[0]
            if (file) {
                var reader = new FileReader()
                const app = this
                reader.readAsText(file, 'UTF-8')
                reader.onload = function (evt) {
                    app.sendFileConf(evt.target.result)
                }
            }
        },
        sendFileConf(filetext) {
            this.$emit('file-upload-index', filetext);
        },
        setConf() {
            if (!this.conf) {
                this.conf = true,
                this.ispectstate = false
                this.title = 'Configuration'
                this.defaultTitle = 'Configuration'
                this.textButton = 'Configuration'
            }
        },
        setIR() {
            if (!this.ispectstate) {
                this.conf = false,
                this.ispectstate = true
                this.title = 'IR Collection'
                this.defaultTitle = 'IR Collection'
                this.textButton = 'IR Collection'
            }
        },
        uploadConf() {
            this.setConf()
            document.getElementById('file_config').click()
        },
    },
}
</script>

<style scoped>
.label {
    color: white;
    padding: 8px;
}

.success {
    background-color: #04AA6D;
}

/* Green */
.info {
    background-color: #2196F3;
}

/* Blue */
.warning {
    background-color: #ff9800;
}

/* Orange */
.danger {
    background-color: #f44336;
}

/* Red */
.other {
    background-color: #e7e7e7;
    color: black;
}

/* Gray */

#btmDiv {
    height: 100%;
    background-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

#span {
    bottom: 30px;
}

.btn {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

.list {
    /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
    bottom: 0;
    padding: 0;
    margin: 0;
}

/* (B) LIST ITEMS */
.list li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%;
    /* Auto spacing */
}

.list_inside {
    /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
    /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
}

/* (B) LIST ITEMS */
.list_inside li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%;
    /* Auto spacing */
}

#ul_send {
    /* (A1) FLEXIBLE BOX */
    display: inherit;
    width: 100%;
    height: 16px;
    /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
}

/* (B) LIST ITEMS */
#ul_send li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 1px;
    background: transparent;
    width: 100%;
    /* Auto spacing */
}

#ul_send>li>p {
    margin-bottom: 0px;
}

@media screen and (max-width: 1263px) and (min-width: 600px) {

    /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
    .list {
        flex-wrap: wrap;
        margin-top: -122px;
    }

    /* (C2) 2 ITEMS PER ROW */
    .list li {
        width: 100%;
    }

    /*.list_inside { flex-wrap: wrap; margin-top: -10px;} 

    .list_inside li { width: 100%; }*/
}

@media screen and (min-width: 1904px) {

    /* (C1) ALLOW LIST ITEMS TO WRAP TO NEW ROW */
    .list {
        flex-wrap: wrap;
        margin-top: -122px;
    }

    /* (C2) 2 ITEMS PER ROW */
    .list li {
        width: 100%;
    }

    /*.list_inside { flex-wrap: wrap; margin-top: -10px;} 

    .list_inside li { width: 100%; }*/
}

.tarea-bottom {
    background-color: white;
}

div.box {
    padding: 4px;
    overflow: auto;
}

#btn_upload {
    position: absolute;
    margin-left: -15px;
    margin-top: -15px;
    border-style: solid;
    border-width: 1px;
}

#btn_config {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

#btn_ir {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}
</style>
