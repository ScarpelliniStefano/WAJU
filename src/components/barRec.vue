<template>
    <div id="recDiv">
        <v-container>
            <v-row>
            <v-col>
                <v-textarea
                    name="input-7-1"
                    rows="14"
                    row-height="7"
                    label="Response"
                    v-model.lazy="recText"
                    hint="Risposta"
                    id="ta_rec" placeholder="Response" readonly>
                </v-textarea>
            </v-col>
            </v-row>
        </v-container>
        <template v-if="isDisable">
            <v-btn depressed elevation="2" raised @click="download('script',recText)"> Save </v-btn>
        </template>

    </div>
</template>
<script>

    export default {
    name : 'barRec',
    
    props : {
        recText : String
    },
    created (){
         //eventBus.$on('cambioText',(v)=>{this.textRec += v;});
         
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
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