<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collectionsWhere" :key="collect.index">
                <where-case :mywhereIndex="collect.index" @changeValue="changeText($event)"/>
            </v-row>
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
            <span style="color: white">{{BTN_SPAN_ADD_WHERE_CLAUSE}}</span>
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
            <span style="color: white">{{BTN_SPAN_REMOVE_WHERE_CLAUSE}}</span>
            </v-btn>
            <v-container
                class="px-0"
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
                    value=""
                ></v-radio>
                </v-radio-group>
            </v-container>

      </v-container>
  </v-sheet>
</template>

<script>
import whereCase from "./ModuleWhereCase.vue";
import lang from '../../env/lang.en'
export default {
    name:"ModuleCaseClause",
    props:{
        maincol: String
    },
    components:{
        whereCase
    },
   data () {
      return {
        valueString:'',
        radioGroup:'',
        valueArr:[''],
        collectionsWhere:[
            {
                index:1,
                stringa:"1##"
            }
        ],

        //LABEL:
        BTN_SPAN_ADD_WHERE_CLAUSE:lang.WIZARD.SUBMODULES.CASE_CLAUSE.BTN_SPAN_ADD_WHERE_CLAUSE,
        BTN_SPAN_REMOVE_WHERE_CLAUSE:lang.WIZARD.SUBMODULES.CASE_CLAUSE.BTN_SPAN_REMOVE_WHERE_CLAUSE,
        RADIO_KEEP_OTHERS:lang.WIZARD.SUBMODULES.CASE_CLAUSE.RADIO_KEEP_OTHERS,
        RADIO_DROP_OTHERS:lang.WIZARD.SUBMODULES.CASE_CLAUSE.RADIO_DROP_OTHERS,
        RADIO_NONE:lang.WIZARD.SUBMODULES.CASE_CLAUSE.RADIO_NONE,
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
                    else
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\n#$#"));
                    this.valueString+="\nKEEP OTHERS #$#";
                }else if(newVal=="DROP OTHERS"){
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    else
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\n#$#"));
                    this.valueString+="\nDROP OTHERS #$#";
                }else{
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    else
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\n#$#"));
                    this.valueString+="\n#$#";
                }
            }
            this.$emit('changeValue', this.valueString+" ;");
        }
    },
    methods:{
        checkMinus(){
            if(this.collectionsWhere.length>1){
                this.collectionsWhere.pop()
                this.valueArr.pop()
            }
            this.counterText(this.valueArr.length);
        },
        setPlus(){
            if(this.collectionsWhere[this.collectionsWhere.length-1].stringa!=''){
                this.collectionsWhere.push({
                    index:this.collectionsWhere.length+1,
                    stringa:(this.collectionsWhere.length+1)+"##"
                })
                this.valueArr.push('');
            }
        },
        changeText(str){
            let id=Number(str.split("##")[0])-1;
            this.collectionsWhere[id].stringa=str;
            this.valueArr[id]=str.split("##")[1];
            if(this.valueString.includes("\nKEEP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nKEEP OTHERS #$#";
            }else if(this.valueString.includes("\nDROP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nDROP OTHERS #$#";
            }
            else{
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\n#$#";
            }
            this.$emit('changeValue', this.valueString);
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(this.collectionsWhere[i].stringa);
            }
            return value.length>-1;
        }
        
    },
    created(){
        this.valueString="\n"+this.radioGroup+"#$#";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>