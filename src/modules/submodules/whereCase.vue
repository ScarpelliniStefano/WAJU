<template>
            
            <v-container fluid style="border-style: outset;">
            
                <v-textarea :rules="[rules.required]" label="collections clause" rows="2" auto-grow v-model="whereClause"></v-textarea>
                <v-checkbox color="var(--bg-color)" v-model="generateAct" label="generate actions?"></v-checkbox>
                <v-textarea v-if="generateAct" label="generate actions" rows="1" v-model="generateAction"></v-textarea>
                <v-checkbox color="var(--bg-color)" v-model="fuzzyCheck" label="Do you want checks on the fuzzy?"></v-checkbox>
                <v-container style="border-style: inset;" v-if="fuzzyCheck">
                <v-row v-for="collect in collectionsFuzzy" :key="collect.index">
                    <v-col>
                    <v-text-field :rules="[rules.counter]" v-if="fuzzyCheck" label="ID istruction" v-model="collect.idFuzzyInstr"></v-text-field>
                    </v-col>
                    <v-col>
                    <v-textarea :rules="[rules.counter]" v-if="fuzzyCheck" label="fuzzy check condition" rows="1" v-model="collect.fuzzyInstr"></v-textarea>
                    </v-col>
                </v-row>
                <v-container>
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlus()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">&nbsp;ADD FUZZY ISTRUCTION</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinus()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">&nbsp;DELETE FUZZY ISTRUCTION</span>
                </v-btn>
                </v-container>
                </v-container>
                <v-checkbox color="var(--bg-color)" v-model="alphaCut" label="Do you want alpha cut?"></v-checkbox>
                <v-container style="border-style: inset;" v-if="alphaCut">
                <v-row v-for="collect in collectionsAlpha" :key="collect.index">
                    <v-col>
                    <v-text-field :rules="[rules.counterA]" v-if="alphaCut" label="numeric expression" v-model="collect.numericIstr"></v-text-field>
                    </v-col>
                    <v-col>
                    <v-text-field :rules="[rules.counterA]" v-if="alphaCut" label="ID" v-model="collect.idAlpha"></v-text-field>
                    </v-col>
                </v-row>
                <v-container>
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlusA()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">&nbsp;ADD ALPHA CUT</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinusA()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">&nbsp;DELETE ALPHA CUT</span>
                </v-btn>
                </v-container>
                </v-container>
                <v-checkbox color="var(--bg-color)" v-model="keepDropFuzzy" label="Do you want to keep or drop fuzzy sets?"></v-checkbox>
                <keepDropFuzzySet v-if="keepDropFuzzy" v-on:changeValueKDFS="changeTextKeepDropFuzzy($event)"/>
            </v-container>
            
</template>

<script>
import keepDropFuzzySet from './keepdropFS.vue';
export default {
    props:{
        mywhereIndex: Number
    },
    components:{
        keepDropFuzzySet
    },
   data () {
      return {
        valueString:'',
        whereClause:'',
        generateAction:'',
        collectionsFuzzy:[{index:'f1',idFuzzyInstr:'',fuzzyInstr:''}],
        collectionsAlpha:[{index:'a1',idAlpha:'',numericIstr:''}],
        alphaCut:false,
        keepDropFuzzy:false,
        fuzzyCheck:false,
        generateAct:false,
        stringVett:[{typeClause:'where',value:''},
                    {typeClause:'generate',value:''},
                    {typeClause:'checkfuzzy',value:''},
                    {typeClause:'alphacut',value:''},
                    {typeClause:'keepdropfuzzy',value:''},
                    ]
        ,
        rules: {
            required: value => !!value || 'Required.',
            counter: value => this.counterText(value),
            counterA: value => this.counterTextA(value),
        }
      }
    },
    
     watch:{
        keepDropFuzzy:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[4].value="";
            }
            this.refreshArr(this.stringVett);
        },
        whereClause:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0].value=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        generateAct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[1].value="";
                else
                    this.stringVett[1].value=this.generateAction;
                this.refreshArr(this.stringVett);
            }
        },
        generateAction:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.generateAction && newVal!="")
                    this.stringVett[1].value=newVal;
                else
                    this.stringVett[1].value="";
            }
            this.refreshArr(this.stringVett);
        },
        
        fuzzyCheck:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.stringVett[2].value="";
                    this.collectionsFuzzy=[{index:'f1',idFuzzyInstr:'',fuzzyInstr:''}]
                }   
                this.refreshArr(this.stringVett);
            }
            
        },
        alphaCut:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.stringVett[3].value="";
                    this.collectionsAlpha=[{index:'a1',idAlpha:'',numericIstr:''}]
                }   
                this.refreshArr(this.stringVett);
            }
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString=this.mywhereIndex+"##\nWHERE ";
            if(vettString[0].value!="")
                this.valueString+="\n "+vettString[0].value + " ";
            if(vettString[1].value!="")
                this.valueString+="\nGENERATE "+vettString[1].value + " ";
            if(vettString[2].value!="")
                this.valueString+="\n"+vettString[2].value + " ";
            if(vettString[3].value!="")
                this.valueString+="\n"+vettString[3].value + " ";
            if(vettString[4].value!="")
                this.valueString+="\n"+vettString[4].value + " ";
            this.$emit('changeValue', this.valueString);
        },
        checkMinus(){
            if(this.collectionsFuzzy.length>1){
                this.collectionsFuzzy.pop()
            }
            this.changeArrCollFuzzy();
        },
        setPlus(){
            if(this.collectionsFuzzy[this.collectionsFuzzy.length-1].idFuzzyInstr!=''
                && this.collectionsFuzzy[this.collectionsFuzzy.length-1].fuzzyInstr!=''){
                this.collectionsFuzzy.push({
                    index:this.collectionsFuzzy.length+1,
                    idFuzzyInstr:'',
                    fuzzyInstr:''
                })
                this.changeArrCollFuzzy();
            }
        },
        checkMinusA(){
            if(this.collectionsAlpha.length>1){
                this.collectionsAlpha.pop()
            }
            this.refreshStringColl();
        },
        setPlusA(){
            if(this.collectionsAlpha[this.collectionsAlpha.length-1].idAlpha!=''
                && this.collectionsAlpha[this.collectionsAlpha.length-1].numericIstr!=''){
                this.collectionsAlpha.push({
                    index:this.collectionsAlpha.length+1,
                    idAlpha:'',
                    numericIstr:''
                })
                this.refreshStringColl();
            }
        },
        refreshStringColl(){
            this.stringVett[3].value="";
            this.collectionsAlpha.forEach(element => {
                this.stringVett[3].value+="ALPHACUT "+element.numericIstr+" ON "+element.idAlpha+"\n";
            });
            this.stringVett[3].value=this.stringVett[3].value.substring(0,this.stringVett[3].value.length-1);
            this.refreshArr(this.stringVett)
        },
        counterText(value){
            this.changeArrCollFuzzy();
            return value.length>-1;
        },
        counterTextA(value){
            this.refreshStringColl();
            return value.length>-1;
        },
        changeArrCollFuzzy(){
            this.stringVett[2].value="";
            this.collectionsFuzzy.forEach(element => {
                this.stringVett[2].value+="CHECK FOR FUZZY SET "+element.idFuzzyInstr+" USING "+element.fuzzyInstr+"\n";
            });
            this.stringVett[2].value=this.stringVett[2].value.substring(0,this.stringVett[2].value.length-1);
            this.refreshArr(this.stringVett)
        },
        changeTextKeepDropFuzzy(valueString){
            this.stringVett[4].value=valueString;
            this.refreshArr(this.stringVett)
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