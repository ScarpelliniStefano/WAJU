<template>
  <v-sheet>
            {{this.mywhereIndex}}
            <!--<or-condition v-on:changeValue="changeTextOr($event)"/>
            <v-checkbox color="var(--bg-color)" v-model="generateAct" label="generate actions?"></v-checkbox>
            <generate-action v-if="generateAct" v-on:changeValue="changeTextGenerate($event)"/>
            <v-checkbox color="var(--bg-color)" v-model="fuzzySet" label="Do you want checks on the fuzzy?"></v-checkbox>
            <v-row v-for="collect in collectionsWhere" :key="collect.index">
                <fuzzy-check v-if="fuzzySet" v-on:changeValue="changeTextFuzzy($event)"/>
            </v-row>
            <v-checkbox color="var(--bg-color)" v-model="alphaCut" label="Do you want alpha cut?"></v-checkbox>
            <alphacut v-if="alphaCut" v-on:changeValue="changeTextAlphaCut($event)"/>
            <v-checkbox color="var(--bg-color)" v-model="keepDropFuzzy" label="Do you want to keep or drop fuzzy sets?"></v-checkbox>
            <keepDropFuzzySet v-if="keepDropFuzzy" v-on:changeValue="changeTextKeepDropFuzzy($event)"/>-->
  </v-sheet>
</template>

<script>
//import orCondition from './orCondition.vue';
//import generateAction from './orCondition.vue';
//import fuzzyCheck from './orCondition.vue';
//import alphacut from './orCondition.vue';
//import keepDropFuzzySet from './orCondition.vue';
export default {
    props:{
        mywhereIndex: Number
    },
    components:{
        /*orCondition,
        generateAction,
        fuzzyCheck,
        alphacut,
        keepDropFuzzySet*/
    },
   data () {
      return {
        valueString:'',
        generateAct:false,
      }
    },
    
     watch:{
        radioGroup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal==1){
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("DROP OTHERS"));
                    this.valueString+="KEEP OTHERS ";
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("KEEP OTHERS"));
                     this.valueString+="DROP OTHERS ";
                }
            }
            this.$emit('changeValue', this.valueString);
        }
    },
    methods:{
        checkMinus(){
            if(this.collections.length>1){
                this.collections.pop()
                this.valueArr.pop()
            }
            
            this.counterText(this.collections.length);
        },
        setPlus(){
            this.collections.push({
                index:this.collections.length+1,
                collection:'',
                alias:''
            })
            this.valueArr.push('')
        },
        changeTextOr(ind){
            let str= this.valueArr[ind];
            str="";
            if(this.collections[ind].collection!="")
                str=this.collections[ind].collection;
                if(this.collections[ind].alias)
                    str+=" AS "+this.collections[ind].alias;
            this.valueArr[ind]=str;
            this.valueString=" ";
            this.valueArr.forEach(element => {
                this.valueString+=element;
                this.valueString+=", "
            });
            this.valueString=this.valueString.substring(0,this.valueString.length-2);
            this.valueString+=" ON";
            if(this.defaultServer){
                this.valueString+=" DEFAULT SERVER"
            }else{
                this.valueString+=" SERVER "+this.server
                if(this.connString!="")
                    this.valueString+=" '"+this.connString+"'";
            }
            this.valueString+=";"
            this.$emit('changeValue', this.valueString);
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(i);
            }
            return value.length>-1;
        }
        
    },
    created(){
        this.valueString=this.mywhereIndex+"##WHERE ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>