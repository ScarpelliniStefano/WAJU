<template>
  <v-sheet>
      <v-container fluid>
          <v-row>
            <v-col><v-text-field :rules="[rules.required]" v-model="collection" :label="TXT_COLLECTION"/></v-col>
            <v-col><v-text-field :rules="[rules.required]" v-if="collection!=''" :label="TXT_DB" v-model="db"/></v-col>
            <v-col><v-text-field :rules="[rules.required]" v-if="collection!=''" :label="TXT_ALIAS" v-model="alias"/></v-col>
          </v-row>
      </v-container>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name:"WizardGetDictionary",
   data () {
      return {
        valueString:'',
        alias:'',
        collection:'',
        db:'',
        rules: {
          required: value => !!value || 'Required.'
        },

        //LABEL
        TXT_COLLECTION: lang.WIZARD.MODULES.GET_DICTIONARY.TXT_COLLECTION,
        TXT_DB: lang.WIZARD.MODULES.GET_DICTIONARY.TXT_DB,
        TXT_ALIAS: lang.WIZARD.MODULES.GET_DICTIONARY.TXT_ALIAS
      }
    },
    watch:{
        alias:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+this.collection;
                    if(this.db!="")
                        this.valueString+="@"+this.db;
                    if(this.alias!="")
                        this.valueString+=" AS "+newVal;
                }
                this.valueString+=" ;"
                this.$emit('changeValue', this.valueString);
            }
        },
        collection:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+newVal
                    if(this.db!="")
                        this.valueString+="@"+this.db;
                    if(this.alias!="")
                        this.valueString+=" AS "+this.alias;
                }
                this.valueString+=" ;";
                this.$emit('changeValue', this.valueString);
            }
        },
        db:function(newVal,oldVal){
           if(newVal!=oldVal){
               this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+this.collection
                    if(this.db!="")
                        this.valueString+="@"+newVal;
                    if(this.alias!="")
                        this.valueString+=" AS "+this.alias;
                }
                this.valueString+=" ;";
                this.$emit('changeValue', this.valueString);
            }
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