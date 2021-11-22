<template>
    <div id="recDiv">
        <v-container fluid>
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
                            <v-btn id="btn_save" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" tile disabled="isDisable" fab large depressed elevation="2" raised @click="download('script',recText)">
                                <v-icon large>mdi-content-save-outline</v-icon>
                                <span>SAVE</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn id="btn_back" style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" tile disabled="isDisable" fab large @click="$emit('click-back-index');">
                                <v-icon large>mdi-history</v-icon>
                                <span>BACK</span>
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
   
    props : {
        recText : String
    },
    computed: {
        isDisable() {
            return this.recText.length> 0;
        }
    },
    methods:{
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
        border-color: navy;
        border-width: 1px;
    }

    .v-btn span{
        display: none;
    }
    .v-btn:hover i{
        display: none;
    }
    .v-btn:hover span{
        display: inline;
    }

</style>