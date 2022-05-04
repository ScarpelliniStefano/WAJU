<template>
  <v-sheet>
        <v-container fluid>
            <v-container fluid v-for="collect in collectionsUnpack" :key="collect.index">
                <unpack-clause :myunpackIndex="collect.index" @changeValue="changeText($event)"/>
            </v-container>
            <br>
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="230px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlus()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_ADD_UNP_CLAUSE}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="230px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinus()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_DEL_UNP_CLAUSE}}</span>
            </v-btn>
            <v-container
                fluid
            >
                <v-radio-group v-model="radioGroup" row>
                <v-radio
                    :key=1
                    :label="RADIO_KEEP_OTHERS"
                    value="KEEP OTHERS"
                ></v-radio>
                <v-radio
                    :key=2
                    :label="RADIO_DROP_OTHERS"
                    value="DROP OTHERS"
                ></v-radio>
                 <v-radio
                    :key=3
                    :label="RADIO_NONE"
                    value="NONE"
                ></v-radio>
                </v-radio-group>
            </v-container>
        </v-container>
  </v-sheet>
</template>

<script>
import unpackClause from "./submodules/ModuleUnpackClause.vue";
import lang from '../env/lang.en'
export default {
    name:"WizardExpand",
    props:{
        maincol: String
    },
    components:{
        unpackClause
    },
   data () {
      return {
        valueString:';',
        radioGroup:'NONE',
        valueArr:[''],
        collectionsUnpack:[
            {
                index:1,
                stringa:"1##"
            }
        ],

        //LABEL
        BTN_SPAN_ADD_UNP_CLAUSE: lang.WIZARD.MODULES.EXPAND.BTN_SPAN_ADD_UNP_CLAUSE,
        BTN_SPAN_DEL_UNP_CLAUSE: lang.WIZARD.MODULES.EXPAND.BTN_SPAN_DEL_UNP_CLAUSE,
        RADIO_KEEP_OTHERS: lang.WIZARD.MODULES.EXPAND.RADIO_KEEP_OTHERS,
        RADIO_DROP_OTHERS: lang.WIZARD.MODULES.EXPAND.RADIO_DROP_OTHERS,
        RADIO_NONE: lang.WIZARD.MODULES.EXPAND.RADIO_NONE
      }
    },
    
    
     watch:{
        radioGroup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal=="KEEP OTHERS"){
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    this.valueString+="\nKEEP OTHERS ";
                }else if(newVal=="DROP OTHERS"){
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    
                    this.valueString+="\nDROP OTHERS ";
                }else{
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    else
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf(" ;"));
                    this.valueString+="";
                }
            }
            this.$emit('changeValue', this.valueString+" ;");
        }
    },
    methods:{
        /**
         * Rimozione di un collection unpack
         */
        checkMinus(){
            if(this.collectionsUnpack.length>1){
                this.collectionsUnpack.pop()
                this.valueArr.pop()
            }
            this.counterText(this.valueArr.length);
        },
        /**
         * Introduzione di una nuova collection unpack
         */
        setPlus(){
            if(this.collectionsUnpack[this.collectionsUnpack.length-1].stringa!=''){
                this.collectionsUnpack.push({
                    index:this.collectionsUnpack.length+1,
                    stringa:(this.collectionsUnpack.length+1)+"##"
                })
                this.valueArr.push('');
            }
        },
        /**
         * Riscrittura dell'istruzione dopo modifica di un valore
         * @param {String} str Stringa con collezione da modificare
         */
        changeText(str){
            let id=Number(str.split("##")[0])-1;
            this.collectionsUnpack[id].stringa=str;
            this.valueArr[id]=str.split("##")[1];
            if(this.valueString.includes("\nKEEP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nKEEP OTHERS ";
            }else if(this.valueString.includes("\nDROP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nDROP OTHERS ";
            }else{
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
            }
            this.$emit('changeValue', this.valueString+" ;");
        },
        /**
         * Riscrittura dell'array alla modifica di una collection
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(this.collectionsUnpack[i].stringa);
            }
            return value.length>-1;
        }
    },
    created(){
        this.valueString+="\n"+this.radioGroup+" ;";
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>