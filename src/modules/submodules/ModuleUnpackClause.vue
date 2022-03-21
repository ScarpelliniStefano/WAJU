<template>
  <!--<v-sheet>
            {{this.mywhereIndex}}-->
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" :label="TXT_CONDITIONS" rows="1" auto-grow v-model="orCond"/>
                <v-text-field :rules="[rules.required]" :label="TXT_FIELDS_SRC_ARR" v-model="sourceFields"/>
                <v-text-field :rules="[rules.required]" :label="TXT_FIELDS_DEST_ARR" v-model="destFields"/>
            </v-container>
            
            
            
  <!--</v-sheet>-->
</template>

<script>
import lang from '../../env/lang.en'
export default {
    name:"ModuleUnpackClause",
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
        },

        //LABEL
        TXT_CONDITIONS: lang.WIZARD.SUBMODULES.UNPACK_CLAUSE.TXT_CONDITIONS,
        TXT_FIELDS_SRC_ARR: lang.WIZARD.SUBMODULES.UNPACK_CLAUSE.TXT_FIELDS_SRC_ARR,
        TXT_FIELDS_DEST_ARR: lang.WIZARD.SUBMODULES.UNPACK_CLAUSE.TXT_FIELDS_DEST_ARR
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