<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" label="collections clause" rows="2" auto-grow v-model="whereClause"></v-textarea>
                <v-checkbox color="var(--bg-color)" v-model="generateSect" label="add a generate section?"></v-checkbox>
                <generate-section v-if="generateSect" v-on:changeValue="changeText($event)"/>
            </v-container>
            
</template>

<script>
import generateSection from './generateSection.vue';
export default {
    props:{
        mywhereIndex: Number
    },
    components:{
        generateSection
    },
   data () {
      return {
        valueString:'',
        whereClause:'',
        generateSection:'',
        generateSect:false,
        stringVett:[{typeClause:'where',value:''},
                    {typeClause:'generate',value:''}
                    ],
        rules: {
            required: value => !!value || 'Required.'
        }
      }
    },
    
     watch:{
        whereClause:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0].value=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        generateSect:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[1].value="";
                else
                    this.stringVett[1].value=this.generateSection;
                this.refreshArr(this.stringVett);
            }
        },
        generateSection:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.generateSection && newVal!="")
                    this.stringVett[1].value=newVal;
                else
                    this.stringVett[1].value="";
            }
            this.refreshArr(this.stringVett);
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString=this.mywhereIndex+"##\nWHERE ";
            if(vettString[0].value!="")
                this.valueString+="\n "+vettString[0].value + " ";
            if(vettString[1].value!="")
                this.valueString+=vettString[1].value + " ";
            this.$emit('changeValue', this.valueString);
        },
        changeText(textToChange){
            this.generateSection=textToChange;
        }
        
    },
    created(){
        this.valueString=this.mywhereIndex+"##\nWHERE ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>