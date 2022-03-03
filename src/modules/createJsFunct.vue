<template>
  <v-sheet>
      <v-container fluid>
            <v-text-field :rules="[rules.required]" label="ID javascript function" v-model="idJSFunct"></v-text-field>
            <br>
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
                tile fab depressed elevation="5" raised
                dark small
                class="tooltip btnstyle"
                width="200px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlusParam()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">&nbsp;ADD PARAMETER</span>
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
            <span style="color: white">&nbsp;DELETE PARAMETER</span>
            </v-btn>
            </v-container>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="precondition" label="do you want to set preconditions?"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="precondition" label="precondition" rows="1" v-model="preconditionText"></v-textarea>
            <v-textarea :rules="[rules.required]" label="body of function" rows="3" v-model="jsBody"></v-textarea>
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
            idJSFunct:'',
            parameterList:[{index:"1par",idParam:'',typeParam:''}],
            precondition:false,
            preconditionText:'',
            jsBody:'',
            valueString:';',
            stringVett:['',''],
            rules: {
                required: value => !!value || 'Required.',
                counterParam: value => this.counterParam(value)
            }
      }
    },
    
    
     watch:{
        idJSFunct:function(newVal,oldVal){
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
        jsBody:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString="";
            this.valueString+=" "+this.idJSFunct + " ";
            if(vettString[0]!="")
                this.valueString+="\nPARAMETERS "+vettString[0] + " ";
            if(vettString[1]!="" && this.precondition)
                this.valueString+="\nPRECONDITION "+vettString[1] + " ";
            this.valueString+="\nBODY \n"+this.jsBody + " \nEND BODY";
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
            if(this.parameterList[this.parameterList.length-1].idParam!=''
                && this.parameterList[this.parameterList.length-1].typeParam!=''){
                this.parameterList.push({
                    index:(this.parameterList.length+1)+"par",
                    idParam:'',
                    typeParam:''
                })
            }
        },
        counterParam(value){
            this.stringVett[0]='';
            this.parameterList.forEach(element=>{
                this.stringVett[0]+=element.idParam + " TYPE "+element.typeParam+", ";
            })
            this.stringVett[0]=this.stringVett[0].substring(0,this.stringVett[0].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        }
    },
    created(){
        this.valueString=" ;";
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>