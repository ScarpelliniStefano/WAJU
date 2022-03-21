<template>
  <v-sheet>
      <v-container fluid>
      <v-checkbox color="var(--bg-color)" v-model="fromWeb" :label="CHECK_FROM_WEB"></v-checkbox>
      <v-sheet v-if="fromWeb">
          <v-text-field :rules="[rules.required]" v-model="url" :label="TXT_URL"/>
      </v-sheet>
      <v-sheet v-if="!fromWeb">
          <v-row>
          <v-col><v-text-field :rules="[rules.required]" v-model="collection" :label="TXT_COLLECTION"/></v-col>
          <v-col><v-text-field v-if="collection!=''" :label="TXT_DB" v-model="db"/></v-col>
          </v-row>
      </v-sheet>
      </v-container>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name:"WizardGetCollection",
    data () {
      return {
        valueString:'',
        fromWeb: false,
        url:'',
        collection:'',
        db:'',
        rules: {
          required: value => !!value || 'Required.'
        },

        //LABEL
        CHECK_FROM_WEB: lang.WIZARD.MODULES.GET_COLLECTION.CHECK_FROM_WEB,
        TXT_URL: lang.WIZARD.MODULES.GET_COLLECTION.TXT_URL,
        TXT_COLLECTION: lang.WIZARD.MODULES.GET_COLLECTION.TXT_COLLECTION,
        TXT_DB: lang.WIZARD.MODULES.GET_COLLECTION.TXT_DB
      }
    },
    watch:{
        fromWeb:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal)
                    this.valueString=" FROM WEB "+this.url+";"
                else{
                    if(this.db!="" && this.collection!="")
                        this.valueString=" "+this.collection+"@"+this.db+";"
                    else
                        this.valueString=" "+this.collection+";"
                }
                this.$emit('changeValue', this.valueString);
            }
        },
        url:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString=" FROM WEB "+newVal+";";
                this.$emit('changeValue', this.valueString);
            }
        },
        collection:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.db!="" && newVal!="")
                    this.valueString=" "+newVal+"@"+this.db+";"
                else
                        this.valueString=" "+newVal+";";
                this.$emit('changeValue', this.valueString);
            }
        },
        db:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!="")
                    this.valueString=" "+this.collection+"@"+newVal+";";
                else
                    this.valueString=" "+this.collection+";";
                this.$emit('changeValue', this.valueString);
            }
        }
    }
}
</script>

<style>

</style>