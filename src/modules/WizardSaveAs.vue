<template>
  <v-sheet>
      <v-container fluid>
          <v-row>
          <v-col><v-text-field :rules="[rules.required]" v-model="collection" :label="TXT_COLLECTION"/></v-col></v-row>
          <v-row>
            <v-col><v-checkbox color="var(--border-color)" v-model="saveInDB" :label="CHECK_SAVE_DB"></v-checkbox></v-col>
          </v-row>
          <v-row>
            <v-col><v-text-field :rules="[rules.required]" v-if="saveInDB" :label="TXT_DATABASE" v-model="db"/></v-col>
          </v-row>
      </v-container>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name:"WizardSaveAs",
   data () {
      return {
        valueString:'',
        alias:'',
        collection:'',
        db:'',
        saveInDB:false,
        rules: {
          required: value => !!value || 'Required.'
        },

        //LABEL
        TXT_COLLECTION: lang.WIZARD.MODULES.SAVE_AS.TXT_COLLECTION,
        CHECK_SAVE_DB: lang.WIZARD.MODULES.SAVE_AS.CHECK_SAVE_DB,
        TXT_DATABASE: lang.WIZARD.MODULES.SAVE_AS.TXT_DATABASE
      }
    },
    watch:{
        /**
         * WATCH: modifica della checkbox di salvataggio in un database o meno della collezione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        saveInDB:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.db="";
                    this.valueString=this.valueString.substring(0,this.collection.indexOf("@"));
                }
                
            }
        },
        /**
         * WATCH: modifica dell'alias della collezione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        alias:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+this.collection;
                    if(this.db!="")
                        this.valueString+="@"+this.db;
                }
                this.valueString+=" ;"
                this.$emit('changeValue', this.valueString);
            }
        },
        /**
         * WATCH: modifica del nome della collezione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        collection:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+newVal
                    if(this.db!="")
                        this.valueString+="@"+this.db;
                }
                this.valueString+=" ;";
                this.$emit('changeValue', this.valueString);
            }
        },
        /**
         * WATCH: modifica del db di provenienza della collezione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        db:function(newVal,oldVal){
           if(newVal!=oldVal){
               this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+this.collection
                    if(this.db!="")
                        this.valueString+="@"+newVal;
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