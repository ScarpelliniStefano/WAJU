<template>
  <v-sheet>
        <v-container fluid>
            <v-container fluid v-for="collect in collectionsPartitions" :key="collect.index">
                <partition-clause :mypartitionIndex="collect.index" @changeValue="changeText($event)"/>
            </v-container>
            <br>
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="250px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlus()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_ADD_PART_CLAUSE}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="250px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinus()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">&nbsp;{{BTN_SPAN_DEL_PART_CLAUSE}}</span>
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
                    value="NONE"
                ></v-radio>
                </v-radio-group>
        </v-container>
        </v-container>
  </v-sheet>
</template>

<script>
import partitionClause from "./submodules/ModulePartitionClause.vue";
import lang from '../env/lang.en'
export default {
    name:"WizardGroup",
    props:{
        maincol: String
    },
    components:{
        partitionClause
    },
   data () {
      return {
        valueString:';',
        radioGroup:'NONE',
        valueArr:[''],
        collectionsPartitions:[
            {
                index:1,
                stringa:"1##"
            }
        ],

        //LABEL
        BTN_SPAN_ADD_PART_CLAUSE: lang.WIZARD.MODULES.GROUP.BTN_SPAN_ADD_PART_CLAUSE,
        BTN_SPAN_DEL_PART_CLAUSE: lang.WIZARD.MODULES.GROUP.BTN_SPAN_DEL_PART_CLAUSE,
        RADIO_KEEP_OTHERS: lang.WIZARD.MODULES.GROUP.RADIO_KEEP_OTHERS,
        RADIO_DROP_OTHERS: lang.WIZARD.MODULES.GROUP.RADIO_DROP_OTHERS,
        RADIO_NONE: lang.WIZARD.MODULES.GROUP.RADIO_NONE
      }
    },
    
    
     watch:{
         /**
         * WATCH: modifica della groupOption relativa a keep other/drop other
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
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
         * Rimozione di una partizione
         */
        checkMinus(){
            if(this.collectionsPartitions.length>1){
                this.collectionsPartitions.pop()
                this.valueArr.pop()
            }
            this.counterText(this.valueArr.length);
        },
        /**
         * Introduzione di una nuova partizione
         */
        setPlus(){
            if(this.collectionsPartitions[this.collectionsPartitions.length-1].stringa!=''){
                this.collectionsPartitions.push({
                    index:this.collectionsPartitions.length+1,
                    stringa:(this.collectionsPartitions.length+1)+"##"
                })
                this.valueArr.push('');
            }
        },
        /**
         * Riscrittura dell'istruzione dopo modifica di un valore
         * @param {String} str Stringa con partizione da modificare
         */
        changeText(str){
            let id=Number(str.split("##")[0])-1;
            this.collectionsPartitions[id].stringa=str;
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
         * Riscrittura dell'array alla modifica di un partizione
         * @param {String} value partizione
         * @returns lunghezza valore passato
         */
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(this.collectionsPartitions[i].stringa);
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