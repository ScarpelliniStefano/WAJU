<template>
  <v-sheet>
      <v-checkbox color="var(--bg-color)" v-model="fromWeb" label="dal web?"></v-checkbox>
      <v-sheet v-if="fromWeb">
          <v-text-field :rules="[rules.required]" v-model="url" label="url"/>
      </v-sheet>
      <v-sheet v-if="!fromWeb">
          <v-row>
          <v-col><v-text-field :rules="[rules.required]" v-model="collection" label="collection"/></v-col><v-col><v-text-field v-if="collection!=''" label="db" v-model="db"/></v-col>
          </v-row>
      </v-sheet>
  </v-sheet>
</template>

<script>
export default {
   data () {
      return {
        valueString:'',
        fromWeb: false,
        url:'',
        collection:'',
        db:'',
        rules: {
          required: value => !!value || 'Required.'
        }
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