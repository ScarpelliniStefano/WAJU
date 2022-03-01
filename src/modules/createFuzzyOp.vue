<template>
  <v-sheet>
      <v-container fluid>
            <v-text-field :rules="[rules.required]" label="ID fuzzy operator" v-model="idFuzzyOp"></v-text-field><br>
            <v-container style="border-style: outset;">
            <v-row  v-for="collect in parameterList" :key="collect.index">
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterParam]" label="id parameter" v-model="collect.idParam"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterParam]" label="type of parameter" v-model="collect.typeParam"></v-text-field>
                </v-col>
            </v-row>
            <v-container>
            <v-btn
                fab
                dark 
                small
                @click="setPlusParam()" 
                color="var(--bg-color)"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn
                fab
                dark 
                small
                @click="checkMinusParam()" 
                color="var(--bg-color)"
            >
            <v-icon dark>
                mdi-minus
            </v-icon>
            </v-btn>
            </v-container>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="precondition" label="do you want to set preconditions?"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="precondition" label="precondition" rows="1" v-model="preconditionText"></v-textarea>
            <v-textarea :rules="[rules.required]" label="expression to evaluate" rows="1" v-model="jfExpression"></v-textarea>
            <br>
            <v-container style="border-style: outset;">
            <p align="left">Polyline:</p>
            <v-row  v-for="collect in polylineList" :key="collect.index">
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterPoly]" label="first number" v-model="collect.firstNum"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field :rules="[rules.required,rules.counterPoly]" label="second number" v-model="collect.secondNum"></v-text-field>
                </v-col>
            </v-row>
            <v-container>
            <v-btn
                fab
                dark 
                small
                @click="setPlusPolyline()" 
                color="var(--bg-color)"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn
                fab
                dark 
                small
                @click="checkMinusPolyline()" 
                color="var(--bg-color)"
            >
            <v-icon dark>
                mdi-minus
            </v-icon>
            </v-btn>
            </v-container>
            </v-container>

        </v-container>
  </v-sheet>
</template>

<script>
export default {
    
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
            }
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
        checkMinusParam(){
            if(this.parameterList.length>1){
                this.parameterList.pop()
            }
            this.counterParam(this.parameterList);
        },
        setPlusParam(){
            this.parameterList.push({
                index:(this.parameterList.length+1)+"par",
                idParam:'',
                typeParam:''
            })
        },
        checkMinusPolyline(){
            if(this.polylineList.length>1){
                this.polylineList.pop()
            }
            this.counterPoly(this.polylineList);
        },
        setPlusPolyline(){
            this.polylineList.push({
                index:(this.polylineList.length+1)+"pol",
                firstNum:'',
                secondNum:''
            })
        },
        counterParam(value){
            this.stringVett[0]='';
            this.parameterList.forEach(element=>{
                this.stringVett[0]+=element.idParam + " TYPE "+element.typeParam+", ";
            })
            this.stringVett[0]=this.stringVett[0].substring(0,this.stringVett[0].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
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