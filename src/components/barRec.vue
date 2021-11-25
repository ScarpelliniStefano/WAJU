<template>
    <div id="recDiv" class="divstyle" >
        <v-container class="containerstyle" style="border-radius: 3px;" fluid>
            <v-row align="center" class="grow">
            <v-col
                :key="1.1"
                cols="12"
                :sm="10"
                :md="12"
                :lg="12"
                :xl="12"
                >
                <v-textarea
                    class="tastyle"
                    no-resize
                    name="input-7-1"
                    rows="13"
                    row-height="8"
                    label="Response"
                    v-model.lazy="recText"
                    hint="Risposta"
                    id="ta_rec" placeholder="Response" readonly>
                </v-textarea>
            </v-col>
            <v-col
                :key="1.2"
                cols="12"
                :sm="2"
                :md="12"
                :lg="12"
                :xl="12">
                <v-row align="center" justify="center" class="text-center">
                        <v-col>
                            <v-btn class="tooltip btnstyle" id="btn_save" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" tile :disabled="this.isDisabled" fab large depressed elevation="2" raised @click="download('script',recText)">
                                <v-icon large>mdi-content-save-outline</v-icon>
                                <span class="tooltiptext">Save the response</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn class="tooltip btnstyle" id="btn_back" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" tile :disabled="this.isDisabled" fab large @click="$emit('click-back-index');">
                                <v-icon large>mdi-history</v-icon>
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
        recText : String
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
        } 
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