<template>
  <v-sheet>
      <v-container fluid>
            <v-text-field :rules="[rules.required]" :label="TXT_FUZZY_OP" v-model="idFuzzyOp"/><br>
            <v-container style="border-style: outset;">
            <v-row  v-for="collect in parameterList" :key="collect.index">
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterParam]" :label="TXT_PARAM_ID" v-model="collect.idParam"/>
                </v-col>
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterParam]" :label="TXT_PARAM_TYPE" v-model="collect.typeParam"/>
                </v-col>
            </v-row>
            <v-container>
            <v-btn
                tile fab depressed elevation="5" raised
                dark small
                class="tooltip btnstyle"
                width="200px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlusParam()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_ADD_PARAM}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark small
                class="tooltip btnstyle"
                width="200px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinusParam()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_DEL_PARAM}}</span>
            </v-btn>
            </v-container>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="precondition" :label="CHECK_SET_PRECOND"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="precondition" :label="TXT_PRECOND" rows="1" v-model="preconditionText"/>
            <v-textarea :rules="[rules.required]" :label="TXT_EXPR_EVALUATE" rows="1" v-model="jfExpression"/>
            <br>
            <v-container style="border-style: outset;">
            <p align="left">{{P_POLYLINE}}</p>
            <v-row  v-for="collect in polylineList" :key="collect.index">
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterPoly]" :label="TXT_FIRST_NUM" v-model="collect.firstNum"/>
                </v-col>
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterPoly]" :label="TXT_SECOND_NUM" v-model="collect.secondNum"/>
                </v-col>
            </v-row>
            <v-container>
            <v-btn
                tile fab depressed elevation="5" raised
                dark small
                class="tooltip btnstyle"
                width="250px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlusPolyline()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_ADD_POLY}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark small
                class="tooltip btnstyle"
                width="250px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinusPolyline()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_DEL_POLY}}</span>
            </v-btn>
            </v-container>
            </v-container>

        </v-container>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name:"WizardCreateFuzzyOperator",
    props:{
        maincol: String
    },
   data () {
      return {
            idFuzzyOp:'',
            parameterList:[{index:"1par",idParam:'',typeParam:''}],
            precondition:false,
            preconditionText:'',
            jfExpression:'',
            polylineList:[{index:"1pol",firstNum:'',secondNum:''}],
            valueString:';',

            stringVett:['','',''],
            rules: {
                required: value => !!value || 'Required.',
                counterParam: value => this.counterParam(value),
                counterPoly: value => this.counterPoly(value),
            },

            //LABEL
            TXT_FUZZY_OP: lang.WIZARD.MODULES.FUZZY_OP.TXT_FUZZY_OP,
            TXT_PARAM_ID: lang.WIZARD.MODULES.FUZZY_OP.TXT_PARAM_ID,
            TXT_PARAM_TYPE: lang.WIZARD.MODULES.FUZZY_OP.TXT_PARAM_TYPE,
            BTN_SPAN_ADD_PARAM: lang.WIZARD.MODULES.FUZZY_OP.BTN_SPAN_ADD_PARAM,
            BTN_SPAN_DEL_PARAM: lang.WIZARD.MODULES.FUZZY_OP.BTN_SPAN_DEL_PARAM,
            CHECK_SET_PRECOND: lang.WIZARD.MODULES.FUZZY_OP.CHECK_SET_PRECOND,
            TXT_PRECOND: lang.WIZARD.MODULES.FUZZY_OP.TXT_PRECOND,
            TXT_EXPR_EVALUATE: lang.WIZARD.MODULES.FUZZY_OP.TXT_EXPR_EVALUATE,
            P_POLYLINE: lang.WIZARD.MODULES.FUZZY_OP.P_POLYLINE,
            TXT_FIRST_NUM: lang.WIZARD.MODULES.FUZZY_OP.TXT_FIRST_NUM,
            TXT_SECOND_NUM: lang.WIZARD.MODULES.FUZZY_OP.TXT_SECOND_NUM,
            BTN_SPAN_ADD_POLY: lang.WIZARD.MODULES.FUZZY_OP.BTN_SPAN_ADD_POLY,
            BTN_SPAN_DEL_POLY: lang.WIZARD.MODULES.FUZZY_OP.BTN_SPAN_DEL_POLY
      }
    },
    
    
     watch:{
        idFuzzyOp:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        precondition:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        preconditionText:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=newVal;
                }
                this.refreshArr(this.stringVett);
            }
        },
        jfExpression:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
    },
    methods:{
        /**
         * Riscrittura dell'array alla modifica di un testo
         * @param {String} vettString Array delle varie stringhe
         */
        refreshArr(vettString){
            this.valueString="";
            this.valueString+=" "+this.idFuzzyOp + " ";
            if(vettString[0]!="")
                this.valueString+="\nPARAMETERS "+vettString[0] + " ";
            if(vettString[1]!="" && this.precondition)
                this.valueString+="\nPRECONDITION "+vettString[1] + " ";
            this.valueString+="\nEVALUATE "+this.jfExpression + " ";
            if(vettString[2]!="")
                this.valueString+="\nPOLYLINE \n["+vettString[2] + "] ";
            this.valueString+=";";
            this.$emit('changeValue', this.valueString);
        },
        /**
         * Rimozione di un parametro
         */
        checkMinusParam(){
            if(this.parameterList.length>1){
                this.parameterList.pop()
            }
            this.counterParam(this.parameterList);
        },
        /**
         * Introduzione di un nuovo parametro
         */
        setPlusParam(){
            if(this.parameterList[this.parameterList.length-1].idParam!=''
                && this.parameterList[this.parameterList.length-1].typeParam!=''){
                this.parameterList.push({
                    index:(this.parameterList.length+1)+"par",
                    idParam:'',
                    typeParam:''
                })
            }
        },
        /**
         * Rimozione di una polilinea
         */
        checkMinusPolyline(){
            if(this.polylineList.length>1){
                this.polylineList.pop()
            }
            this.counterPoly(this.polylineList);
        },
        /**
         * Introduzione di una nuova polilinea
         */
        setPlusPolyline(){
            if(this.polylineList[this.polylineList.length-1].firstNum!=''
                && this.polylineList[this.polylineList.length-1].secondNum!=''){
                this.polylineList.push({
                    index:(this.polylineList.length+1)+"pol",
                    firstNum:'',
                    secondNum:''
                })
            }
        },
        /**
         * Riscrittura dell'array alla modifica di un parametro
         * @param {String} value parametro
         * @returns lunghezza valore passato
         */
        counterParam(value){
            this.stringVett[0]='';
            this.parameterList.forEach(element=>{
                this.stringVett[0]+=element.idParam + " TYPE "+element.typeParam+", ";
            })
            this.stringVett[0]=this.stringVett[0].substring(0,this.stringVett[0].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        /**
         * Riscrittura dell'array alla modifica di un polilinea
         * @param {String} value polilinea
         * @returns lunghezza valore passato
         */
        counterPoly(value){
            this.stringVett[2]='';
            this.polylineList.forEach(element=>{
                this.stringVett[2]+="("+element.firstNum + ","+element.secondNum+"),\n";
            })
            this.stringVett[2]=this.stringVett[2].substring(0,this.stringVett[2].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
    },
    created(){
        this.valueString=" ;";
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>