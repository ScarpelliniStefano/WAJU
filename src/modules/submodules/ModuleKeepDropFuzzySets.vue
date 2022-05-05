<template>
  <!--<v-sheet>
            {{this.mywhereIndex}}-->
            <div>
                <v-container
                    class="px-0"
                    fluid
                >
                    <v-radio-group v-model="radioFS">
                    <v-radio
                        key="1"
                        :label="RADIO_DEFUZZIFY"
                        value="DEFUZZIFY"
                    ></v-radio>
                    <v-radio
                        key="2"
                        :label="RADIO_DROPPING_ALL_FS"
                        value="DROPPING ALL FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="3"
                        :label="RADIO_KEEPING_ALL_FS"
                        value="KEEPING ALL FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="4"
                        :label="RADIO_DROPPING_FUZZY_SETS"
                        value="DROPPING FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="5"
                        :label="RADIO_KEEPING_FUZZY_SETS"
                        value="KEEPING FUZZY SETS"
                    ></v-radio>
                    </v-radio-group>
                    <v-text-field v-if="radioFS=='DROPPING FUZZY SETS' || radioFS=='KEEPING FUZZY SETS'" :label="TXT_LIST_ID" v-model="textRadio"/>
                </v-container>
            </div>
            
            
  <!--</v-sheet>-->
</template>

<script>
import lang from '../../env/lang.en'
export default {
    name:"ModuleKeepDropFuzzySets",
   data () {
      return {
        radioFS:'',
        textRadio:'',

        //LABEL
        RADIO_DEFUZZIFY:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.RADIO_DEFUZZIFY,
        RADIO_DROPPING_ALL_FS:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.RADIO_DROPPING_ALL_FS,
        RADIO_KEEPING_ALL_FS:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.RADIO_KEEPING_ALL_FS,
        RADIO_DROPPING_FUZZY_SETS:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.RADIO_DROPPING_FUZZY_SETS,
        RADIO_KEEPING_FUZZY_SETS:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.RADIO_KEEPING_FUZZY_SETS,
        TXT_LIST_ID:lang.WIZARD.SUBMODULES.KEEP_DROP_FS.TXT_LIST_ID
      }
    },
    
    watch:{
        /**
         * WATCH: modifica del testo del fuzzy set
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        radioFS:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!="KEEPING FUZZY SETS" || newVal!="DROPPING FUZZY SETS"){
                    this.$emit('changeValueKDFS', newVal);
                    this.textRadio="";
                }
            }
        },
        /**
         * WATCH: modifica del testo della radioOption del fuzzy set
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        textRadio:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.radioFS=="KEEPING FUZZY SETS" || this.radioFS=="DROPPING FUZZY SETS"){
                    this.$emit('changeValueKDFS', this.radioFS+ " " + newVal);
                }
            }
        }
    }
        
}
</script>

<style>

</style>