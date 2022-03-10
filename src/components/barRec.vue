<template>
<v-sheet :dark="darkMode" elevation="17" id="recDiv" class="divstyle">
    <v-sheet :dark="darkMode" style="border-bottom: 1px solid #dddddd;" elevation="14" class="topbar" @click="$emit('set-z-click', 'rec')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 10px; margin-top:2px">Response</h4>
        <v-icon color="red darken-4" style="float: right; margin-right:5px; margin-top: 2px" v-on:click="closeWindow()">mdi-close</v-icon>
    </v-sheet>
    <v-sheet :dark="darkMode">
    <v-container v-if="rapporto < 3 / 2" style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;" fluid>
        <v-row align="center">
            <v-col :key="1.1" cols="12" :sm="10" :md="12" :lg="12" :xl="12">
                <v-sheet :height="height-136" style="overflow: auto">
                    <v-data-table dense :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event"
                    class="tastyle pt-0 mt-0" 
                    no-resize 
                    name="input-7-1" 
                    :rows="parseInt((height-134)/28)" 
                    :items="recArr" 
                    color="black" 
                    id="ta_rec" 
                    hide-default-header 
                    hide-default-footer 
                    :expanded.sync="expanded" 
                    :headers="recHeaders" 
                    item-key="name" 
                    show-expand>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                <p style="padding-bottom: 8px; padding-top: 8px; margin-bottom: 0px">{{item.value}}</p>
                            </td>
                        </template>
                    </v-data-table>
                </v-sheet>
            </v-col>
            <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                <v-row align="center" class="text-center">
                    <v-col>
                        <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :total-visible="7"
                        color="var(--border-color)"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                    ></v-pagination>
                    </v-col>
                </v-row>
            </v-col>
            <v-col :key="1.3" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                <v-row align="center" class="text-center">
                    <v-col>
                        <v-btn :width="(width-100)/2" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised :disabled="this.recArr.length==0" @click="download('script', recText)">
                            <v-icon color="white">mdi-content-save-outline</v-icon>
                            <span v-if="this.recArr.length==0" style="color: gray">Save</span>
                            <span v-else style="color: white">Save</span>
                        </v-btn>
                    </v-col>
                    <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
                        <v-btn :width="(width-100)/2" color="var(--border-color)" class="tooltip btnstyle" style="color: white;background-color: var(--border-color);" tile fab depressed elevation="5" raised :disabled="this.recArr.length==0" @click="$emit('click-back-index')">
                            <v-icon color="white">mdi-history</v-icon>
                            <span v-if="this.recArr.length==0" style="color: gray">BackTrack</span>
                            <span v-else style="color: white">BackTrack</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    </v-sheet>
    <v-sheet>
    <v-container v-if="rapporto >= 3 / 2 && rapporto < 5/2" style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;" fluid>
        <v-row align="center">
        <v-col cols="10">
            <v-row align="center">
                <v-col class="py-0" :key="'recKey_middle'" :cols='10'>
                    <v-sheet :dark="darkMode" id="div_send" :height="height-56" style="overflow: auto">
                        <v-data-table :dark="darkMode" :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event" class="tastyle pt-0 mt-0" no-resize name="input-7-1" :rows="parseInt((height-134)/28)" :items="recArr" color="black" id="ta_rec" hide-default-header hide-default-footer :expanded.sync="expanded" :headers="recHeaders" item-key="name" show-expand>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        <p>{{item.value}}</p>
                                    </td>
                                </template>
                            </v-data-table>
                        </v-sheet>
                    </v-col>
                    <v-col :key="1.21" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                        <v-row align="center" class="text-center">
                            <v-col>
                                <v-pagination :dark="darkMode"
                                v-model="page"
                                :length="pageCount"
                                :total-visible="7"
                                color="var(--border-color)"
                                prev-icon="mdi-menu-left"
                                next-icon="mdi-menu-right"
                            ></v-pagination>
                            </v-col>
                        </v-row>
                    </v-col>
            </v-row>
        </v-col>
            <v-col :key="1.31" cols="2">
                <v-row align="center">
                    <v-col>
                        <v-sheet :dark="darkMode" :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('Save')" @mouseleave="title = defaultTitle" :width="width/6 - 36" :height="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " fab depressed elevation="5" :disabled="this.recArr.length==0" @click="download('script', recText)">
                                <v-icon color="white" :size="width/20">mdi-content-save-outline</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <v-sheet :dark="darkMode" :height="(height-80)/2">
                            <v-btn @mouseenter="changeTitle('Back Instruction')" @mouseleave="title = defaultTitle" :width="width/6 - 36" :height="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -55%); " fab depressed elevation="5" :disabled="this.recArr.length==0" @click="$emit('click-back-index')">
                                <v-icon color="white" :size="width/20">mdi-history</v-icon>
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    </v-sheet>
    <v-container v-if="rapporto >= 5/2" style="border-bottom-left-radius: 3px;border-bottom-right-radius: 3px;" fluid>
        <v-row align="center">
            <v-col cols="10">
            <v-row align="center">
            <v-col class="py-0" :key="1.11" cols="12">
                <v-sheet :dark="darkMode" id="div_send" :height="height-56" style="overflow: auto">
                    <v-data-table :page.sync="page" :items-per-page="itemsPerPage" @page-count="pageCount = $event" :dark="darkMode" class="tastyle pt-0 mt-0" no-resize name="input-7-1" :rows="parseInt((height-134)/28)" :items="recArr" color="black" id="ta_rec" hide-default-header hide-default-footer :expanded.sync="expanded" :headers="recHeaders" item-key="name" show-expand>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                <p>{{item.value}}</p>
                            </td>
                        </template>
                    </v-data-table>
                </v-sheet>
            </v-col>
             <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                <v-row align="center" class="text-center">
                    <v-col>
                        <v-pagination
                        v-model="page"
                        :length="pageCount"
                        :total-visible="7"
                        color="var(--border-color)"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                    ></v-pagination>
                    </v-col>
                </v-row>
            </v-col>
            </v-row>
            </v-col>
            <v-col :key="1.3" :cols="2">
                <v-row align="center">
                    <v-col>
                        <v-sheet :dark="darkMode" :height="(height-80)/2">
                            <v-btn :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " fab depressed elevation="5" :disabled="this.recArr.length==0" @click="download('script', recText)">
                                <v-icon>mdi-content-save-outline</v-icon>
                                SAVE
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col>
                        <v-sheet :dark="darkMode" :height="(height-80)/2">
                            <v-btn :width="width/6 - 36" x-large class="tooltip btnstyle" tile style="color: white; background-color: var(--border-color); position: relative; top:50%; transform: translate(0, -45%); " fab depressed elevation="5" :disabled="this.recArr.length==0" @click="download('script', recText)">
                                <v-icon>mdi-history</v-icon>
                                BACKTRACK
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
    name: "barRec",
    data: () => ({
        isDisabled: true,
        expanded: [],
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        recHeaders: [{
            text: 'ISTRUCTION TYPE',
            sortable: false,
            value: 'name',
            defaultTitle: 'Response',
            title: 'Response'
        }]

    }),
    props: {
        recText: String,
        recArr: Array,
        height: Number,
        width: Number,
        browser: String,
        rapporto: Number,
        bgcolor: String
    },
    mounted() {},
    methods: {
        changeTitle(tip) {
            this.title = this.defaultTitle + " - " + tip
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
            this.$emit("close-rec");
        },
        Enabled() {
            this.isDisabled = true;
        },
        isEnabled() {
            return this.isDisabled;
        },
        download(filename, text) {
            var element = document.createElement("a");
            element.setAttribute(
                "href",
                "data:text/plain;charset=utf-8," + encodeURIComponent(text)
            );
            element.setAttribute("download", filename);

            element.style.display = "none";
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
    },
};
</script>

<style>
#recDiv {
    background-color: white;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
}

tr {
  box-shadow: none;
}
</style>
