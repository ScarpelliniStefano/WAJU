<template>
    <div id="recDiv">
        <v-container>
            <v-row>
            <v-col cols="9">
                <v-textarea
                    name="input-7-1"
                    rows="14"
                    row-height="8"
                    label="Response"
                    v-model.lazy="recText"
                    hint="Risposta"
                    id="ta_rec" placeholder="Response" readonly>
                </v-textarea>
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
    created (){
         //eventBus.$on('cambioText',(v)=>{this.textRec += v;});
         
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
    }
}
</script>