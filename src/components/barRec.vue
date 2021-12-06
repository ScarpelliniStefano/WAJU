<template>
    <div id="recDiv" class="divstyle" >
        <div class="topbar" @click="$emit('set-z-click', 'rec')">
            <h4 class="noselect" style="float:left; margin-left: 5px">Response</h4>
            <v-icon color="white" style="float: right;" v-on:click="closeWindow()">mdi-close</v-icon>
        </div>
        <v-container class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center" >
            <v-col
            class="py-0"
                :key="1.1"
                cols="12"
                :sm="10"
                :md="12"
                :lg="12"
                :xl="12">
                <v-textarea
                    class="tastyle pt-0 mt-0"
                    no-resize
                    name="input-7-1"
                    :rows="parseInt((height-134)/28)"
                    v-model="recText"
                    color="black"
                    id="ta_rec" >
                </v-textarea>
            </v-col>
            <v-col class="py-0">
                <v-sheet elevation="0" color="white" :height="(height-134) - parseInt((height-134)/28) * 28 + 5"></v-sheet>
            </v-col>
            <v-col
                :key="1.2"
                cols="12"
                :sm="2"
                :md="12"
                :lg="12"
                :xl="12">
                <v-row align="center" class="text-center" >
                        <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
                            <v-btn class="tooltip btnstyle" id="btn_save" style="border-radius: 4px; border-style: solid; border-width: 1px;" tile :disabled="this.isDisabled" fab depressed elevation="2" raised @click="download('script',recText)">
                                <v-icon>mdi-content-save-outline</v-icon>
                                <span class="tooltiptext">Save the response</span>
                            </v-btn>
                        </v-col>
                        <v-col cols="6" :sm="12" :md="6" :lg="6" :xl="6">
                            <v-btn class="tooltip btnstyle" id="btn_back" style="border-radius: 4px; border-style: solid; border-width: 1px;" tile :disabled="this.isDisabled" fab  @click="$emit('click-back-index');">
                                <v-icon>mdi-history</v-icon>
                                <span class="tooltiptext">Backtrack</span>
                            </v-btn>
                        </v-col>
                    </v-row>
            </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>

    export default {
    name : 'barRec',
    data: () => ({
        isDisabled: true
    }),
    props : {
        recText : String,
        height: Number,
        width: Number
    },
    watch: {
        recText: function(oldVal, newVal){
            if(oldVal != newVal){
                if(newVal.length > 0){
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            }
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
        closeWindow(){
          this.$emit('close-rec');
        },
        Enabled(){
            this.isDisabled = true;
        },
        isEnabled(){
            return this.isDisabled;
        },
        download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
    } 
}
</script>

<style scoped>

    #recDiv{
        background-color: white;
        border-radius: 4px;
        border-style: solid;
        border-width: 1px;
    }



</style>