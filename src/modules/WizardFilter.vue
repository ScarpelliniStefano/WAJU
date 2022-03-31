<template>
  <v-sheet>
      <v-container fluid>
        <case-clause @changeValue="changeValue($event)"/>
        <v-checkbox color="var(--bg-color)" v-model="removeDup" :label="CHECK_REMOVE_DUPL"></v-checkbox>
      </v-container>
  </v-sheet>
</template>

<script>
import caseClause from "./submodules/ModuleCaseClause.vue";
import lang from '../env/lang.en'
export default {
    name:"WizardFilter",
    props:{
        maincol: String
    },
    components:{
        caseClause
    },
   data () {
      return {
        valueString:';',
        removeDup: false,

        //LABEL
        CHECK_REMOVE_DUPL: lang.WIZARD.MODULES.FILTER.CHECK_REMOVE_DUPL
      }
    },
    
    watch:{
        removeDup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal){
                    this.valueString=this.valueString.substring(0,this.valueString.length-2)+" REMOVE DUPLICATES ;"
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf(" REMOVE DUPLICATES ;"))+" ;";
                }
            }
            this.$emit('changeValue', this.valueString);
        }
    },
    methods:{
        changeValue(string){
            let valueCopy=this.valueString;
            if(valueCopy.includes("REMOVE DUPLICATES;")){
                this.valueString=" "+string.split("#$#")[0]+" REMOVE DUPLICATES";
            }else{
                this.valueString=" " + string.split("#$#")[0];
            }
            this.valueString+=" ;";
            this.$emit('changeValue', this.valueString);
        }
    },
    created(){
        this.valueString=" ;";
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>