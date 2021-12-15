<template>
  <v-sheet>
      <v-sheet>
          <v-row>
          <v-col><v-text-field v-model="collection" label="collection"/></v-col><v-col><v-text-field v-if="collection!=''" label="db" v-model="db"/></v-col><v-col><v-text-field v-if="collection!=''" label="alias" v-model="alias"/></v-col>
          </v-row>
      </v-sheet>
  </v-sheet>
</template>

<script>
export default {
   data () {
      return {
        valueString:'',
        alias:'',
        collection:'',
        db:''
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
                    if(this.alias!="")
                        this.valueString+=" AS "+this.alias;
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
                    if(this.alias!="")
                        this.valueString+=" AS "+this.alias;
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