<template>
  <v-sheet>
          <v-row>
          <v-col><v-text-field :rules="[rules.required]" v-model="collection" label="collection"/></v-col></v-row>
          <v-row>
            <v-col><v-checkbox color="var(--bg-color)" v-model="saveInDB" label="Do you want to save the collection in a database?"></v-checkbox></v-col>
          </v-row>
          <v-row>
            <v-col><v-text-field :rules="[rules.required]" v-if="saveInDB" label="db" v-model="db"/></v-col>
          </v-row>
  </v-sheet>
</template>

<script>
export default {
   data () {
      return {
        valueString:'',
        alias:'',
        collection:'',
        db:'',
        saveInDB:false,
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    },
    watch:{
        saveInDB:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.db="";
                    this.valueString=this.valueString.substring(0,this.collection.indexOf("@"));
                }
                
            }
        },
        alias:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString="";
                if(this.collection!=""){
                    this.valueString=" "+this.collection;
                    if(this.db!="")
                        this.valueString+="@"+this.db;
                }
                this.valueString+=";"
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
                }
                this.valueString+=";";
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
                }
                this.valueString+=";";
                this.$emit('changeValue', this.valueString);
            }
        }
    }
}
</script>

<style>

</style>