<template>
    <div id="LogDiv">   
        <v-textarea v-show="expand" filled name="input-7-4" rows="8"
            row-height="2" label="Logs" v-model.lazy="logV" hint="Log" id="ta_log" placeholder="Log" readonly>
        </v-textarea>
        <v-tooltip bottom>
            <template v-slot:activator="{on,attrs}">
                <v-btn fab v-bind="attrs" v-on="on" class="black--text" @click="expand = !expand">
                    <v-icon x-large>mdi-code-tags</v-icon> 
                </v-btn> 
            </template>
            <span>LOG</span>
        </v-tooltip>


        
    </div>
</template>
<script>
    export default {
    name : 'logDiv',
    data(){
        return {
            expand: false
        }
    },
    props : [ 'logV' ],
     created (){
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
    }
}
</script>