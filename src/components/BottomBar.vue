<template>
<v-sheet elevation="17" id="recDiv" class="divstyle">
    <v-sheet style="border-bottom: 3px solid #dddddd;" elevation="14" class="topbar" @click="$emit('set-z-click', 'btm')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 5px">{{this.textButton}}</h4>
        <v-icon color="red darken-4" style="float: right" v-on:click="closeWindow()">mdi-close</v-icon>
    </v-sheet>
    <v-container class="containerstyle" fluid style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; max-width: 9999px;">
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
                <v-sheet id="div_send" :height="height-136" style="overflow: auto">
                    <v-list class="pa-3">
                        <v-subheader inset>Collections</v-subheader>

                        <v-list-item v-for="coll in bottomText.listIRCol" :key="coll">
                            <v-list-item-avatar>
                                <v-icon style="background-color: var(--border-color)">
                                    mdi-database
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="coll"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon @click="numDepth = 1; $emit('click-irc', coll)">
                                    IR
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <!--
            <v-select
              class="pa-4"
              v-model="selectedItem"
              :items="bottomText.listIRCol"
              label="IR collections" solo></v-select>
            <v-sheet class="py-0" :height="(height - 318)/2">
              <center> <span v-if="this.bottomText.errorConfig!=''" class="label danger">{{this.bottomText.errorConfig}}</span> </center></v-sheet>
            <v-sheet id="treeView">
              <v-row class="py-4">
                <v-col cols="12" sm="10" md="10" lg="12" xl="9">
                  <v-sheet id="treeViewBtn" align="center">
                    <v-row>
                      <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                        <v-btn
                          x-large
                          class="tooltip btnstyle"
                          elevation="0"
                          style="
                            border-radius: 4px;
                            border-style: solid;
                            border-width: 1px;
                          "
                          id="btn_tc"
                          fab
                          tile
                          :disabled="
                            !this.irPressed||
                            this.bottomText.listIRCol.length < 1 ||
                            this.bottomText.listIRCol == undefined
                          "
                          @click="
                            numDepth = 1
                            $emit('click-tc')
                          "
                        >
                          <v-icon color="grey">mdi-page-last</v-icon>
                          <span class="tooltiptext">TC Collection</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-sheet>-->
                </v-sheet>
                <!--</v-card>-->
            </v-col>

            <v-col :cols="12">
                <v-row align="center" class="text-center">
                    <v-col cols="6">
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised v-on:click="setConf()">
                            <v-icon>mdi-wrench</v-icon>
                            Config.
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised @click="
                            irPressed = true
                            setIR()
                            $emit('click-ir')">
                            <v-icon>mdi-file-find-outline</v-icon>
                            IR Request
                        </v-btn>
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
        textButton: 'Configurations',
        listEmpty: true
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
                this.textButton = 'Configuration'
            }
        },
        setIR() {
            if (!this.ispectstate) {
                //Aggiungere settaggio dell'altezza
                this.conf = false,
                    this.ispectstate = true
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
