<template>
    <div id="ErrLogDiv">
      <v-expand-transition>
        <v-textarea 
            v-show="expand"
            filled
            name="input-7-4"
            rows="8"
            row-height="2"
            label="Errors"
            v-model.lazy="errV"
            hint="Errori"
            id="ta_errlog" placeholder="Errori" readonly>
        </v-textarea>
      </v-expand-transition>
        <v-tooltip bottom color="red">
            <template v-slot:activator="{on,attrs}">
                <v-btn fab v-bind="attrs" v-on="on" @click="expand = !expand" >
                    <v-icon x-large color="red">mdi-alert-circle-outline</v-icon>
                </v-btn>
            </template>
            <span >ERRORS</span>
        </v-tooltip>

      
        
    </div>
</template>
<script>

    export default {
    name : 'errlogDiv',
    data(){
        return {
            expand: false
        }
    },
    props : [ 'errV' ],
     created (){
         
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
    }
}
</script>