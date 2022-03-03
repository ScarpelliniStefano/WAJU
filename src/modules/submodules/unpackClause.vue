<template>
  <!--<v-sheet>
            {{this.mywhereIndex}}-->
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCond"></v-textarea>
                <v-text-field :rules="[rules.required]" label="fields of source array" v-model="sourceFields"></v-text-field>
                <v-text-field :rules="[rules.required]" label="fields of destination array" v-model="destFields"></v-text-field>
            </v-container>
            
            
            
  <!--</v-sheet>-->
</template>

<script>
export default {
    props:{
        myunpackIndex: Number
    },
    
   data () {
      return {
        valueString:'',
        orCond:'',
        sourceFields:'',
        destFields:'',
        stringVett:['','',''],
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    },
    
     watch:{
        
        orCond:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        sourceFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[1]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        destFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[2]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString=this.myunpackIndex+"##\nUNPACK ";
            if(vettString[0]!="")
                this.valueString+="\n "+vettString[0] + " ";
            if(vettString[1]!="")
                this.valueString+="\n ARRAY "+vettString[1] + " ";
            if(vettString[2]!="")
                this.valueString+="\n TO "+vettString[2] + " ";
            this.$emit('changeValue', this.valueString);
        }
    },
    created(){
        this.valueString=this.myunpackIndex+"##\nUNPACK ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>