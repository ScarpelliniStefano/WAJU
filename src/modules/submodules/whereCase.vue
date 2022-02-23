<template>
  <!--<v-sheet>
            {{this.mywhereIndex}}-->
            <div>
            <v-container>
            <v-row width="90vh">
                <v-col>
                <v-textarea label="collections clause" rows="4" v-model="whereClause"></v-textarea>
                </v-col>
                <!--<v-col>
                    <v-row><v-btn label="OR" v-on:click="orClick(1)">OR</v-btn><v-btn label="CANC OR" v-on:click="orClick(0)">CANC OR</v-btn></v-row>
                    <v-row><v-btn label="AND" v-on:click="andClick(1)">AND</v-btn><v-btn label="CANC AND" v-on:click="andClick(0)">CANC AND</v-btn></v-row>
                    <v-row><v-btn label="NOT" v-on:click="notClick(1)">NOT</v-btn><v-btn label="CANC NOT" v-on:click="notClick(0)">CANC NOT</v-btn></v-row>
                    <v-row><v-btn label="WITH" v-on:click="withClick(1)">WITH</v-btn><v-btn label="CANC WITH" v-on:click="withClick(0)">CAN WITH</v-btn></v-row>
                    <v-row><v-btn label="WITHOUT" v-on:click="withoutClick(1)">WITHOUT</v-btn><v-btn label="CANC WITHOUT" v-on:click="withoutClick(0)">CANC WITHOUT</v-btn></v-row>
                </v-col>-->
            </v-row>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="generateAct" label="generate actions?"></v-checkbox>
            <v-textarea v-if="generateAct" label="generate actions" rows="4" v-model="generateAction"></v-textarea>
            <v-checkbox color="var(--bg-color)" v-model="fuzzyCheck" label="Do you want checks on the fuzzy?"></v-checkbox>
            <v-row  v-for="collect in collectionsFuzzy" :key="collect.index">
                <v-textarea v-if="fuzzyCheck" label="fuzzy check" rows="4" v-model="collect.fuzzyInstr"></v-textarea>
            </v-row>
            <v-checkbox color="var(--bg-color)" v-model="alphaCut" label="Do you want alpha cut?"></v-checkbox>
            <v-textarea v-if="alphaCut" label="alphacut instruction" rows="4" v-model="alphacutText"></v-textarea>
            <v-checkbox color="var(--bg-color)" v-model="keepDropFuzzy" label="Do you want to keep or drop fuzzy sets?"></v-checkbox>
            <keepDropFuzzySet v-if="keepDropFuzzy" v-on:changeValue="changeTextKeepDropFuzzy($event)"/>
            </div>
            
            
  <!--</v-sheet>-->
</template>

<script>
//import orCondition from './orCondition.vue';
//import generateAction from './orCondition.vue';
//import fuzzyCheck from './orCondition.vue';
//import alphacut from './orCondition.vue';
import keepDropFuzzySet from './keepdropFS.vue';
export default {
    props:{
        mywhereIndex: Number
    },
    components:{
        //whereClause : String
        /*orCondition,
        generateAction,
        fuzzyCheck,
        alphacut,*/
        keepDropFuzzySet
    },
   data () {
      return {
        valueString:'',
        whereClause:'',
        generateAction:'',
        collectionsFuzzy:[{index:1,fuzzyInstr:''}],
        alphacutText:'',
        alphaCut:false,
        keepDropFuzzySets:false,
        fuzzyCheck:false,
        generateAct:false,
      }
    },
    
     watch:{
        radioGroup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal==1){
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    this.valueString+="\nKEEP OTHERS ";
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                     this.valueString+="\nDROP OTHERS ";
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
        this.valueString=this.mywhereIndex+"##\nWHERE ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>