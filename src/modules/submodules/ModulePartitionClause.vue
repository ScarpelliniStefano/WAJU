<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea class="pb-3" :rules="[rules.required]" :label="TXT_CONDITIONS" rows="1" auto-grow v-model="orCond"/>
                <v-container fluid style="border-style: outset;">
                <v-row v-for="collect in fieldRefSource" :key="collect.index">
                    <v-text-field class="pa-3" :rules="[rules.required,rules.counterSource]" :label="TXT_SOURCE_FIELDS" v-model="collect.sourceFields"/>
                </v-row>
                </v-container>
                <br>
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlusFieldRef()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">{{BTN_SPAN_ADD_SOURCE_FIELDS}}</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinusFieldRef()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">{{BTN_SPAN_REMOVE_SOURCE_FIELDS}}</span>
                </v-btn>
                <v-text-field :rules="[rules.required]" :label="TXT_FIELD_DESTINATION" v-model="destFields"/>
                <v-checkbox color="var(--bg-color)" v-model="dropGroup" :label="CHECK_DROP_GROUPING_FIELDS"></v-checkbox>
                <v-checkbox color="var(--bg-color)" v-model="orderSelection" :label="CHECK_ORDER_FIELDS"></v-checkbox>
                <v-container v-if="orderSelection" style="border-style: outset;">
                    <v-row  v-for="collect in fieldRefOrd" :key="collect.index" >
                        <v-col>
                        <v-text-field :rules="[rules.required,rules.counterOrdT]" :label="TXT_ORDER_FIELDS" v-model="collect.fieldsOrder"/>
                        </v-col>
                        <v-col>
                        <v-container
                                class="pa-0"
                                fluid
                            >
                                <v-radio-group v-model="collect.order" :rules="[rules.counterOrdT]" row>
                                <v-radio
                                    :key=1
                                    :label="RADIO_ORDER_NONE"
                                    value=" "
                                ></v-radio>
                                <v-radio
                                    :key=2
                                    :label="RADIO_ORDER_ASCENDENT"
                                    value="ASC "
                                ></v-radio>
                                <v-radio
                                    :key=3
                                    :label="RADIO_ORDER_DESCENDENT"
                                    value="DESC "
                                ></v-radio>
                                </v-radio-group>
                        </v-container>
                        </v-col>
                    </v-row>
                    <v-btn
                        tile fab depressed elevation="5" raised
                        dark small
                        class="tooltip btnstyle"
                        width="200px"
                        style="color: white;background-color: var(--bg-color);" 
                        @click="setPlusFieldOrd()" 
                    >
                    <v-icon color="white">mdi-plus</v-icon>
                    <span style="color: white">{{BTN_SPAN_ADD_ORDER_FIELDS}}</span>
                    </v-btn>
                    &nbsp;&nbsp;
                    <v-btn
                        tile fab depressed elevation="5" raised
                        dark small
                        class="tooltip btnstyle"
                        width="200px"
                        style="color: white;background-color: var(--bg-color);" 
                        @click="checkMinusFieldOrd()" 
                    >
                    <v-icon color="white">mdi-minus</v-icon>
                    <span style="color: white">{{BTN_SPAN_REMOVE_ORDER_FIELDS}}</span>
                    </v-btn>
                </v-container>
                
                <v-checkbox color="var(--bg-color)" v-model="generateSect" :label="CHECK_GENERATE_SECTION"></v-checkbox>
                <generate-section v-if="generateSect" @changeValue="changeText($event)"/>
            </v-container>
</template>

<script>
import lang from '../../env/lang.en'
import generateSection from './ModuleGenerateSection.vue'

export default {
    name:"ModulePartitionClause",
    props:{
        mypartitionIndex: Number
    },
    components: {
        generateSection
    },
    
   data () {
      return {
        valueString:'',
        orCond:'',
        generateSect:false,
        dropGroup:false,
        orderSelection:false,
        generateSection:'',
        sourceFields:'',
        destFields:'',
        fieldRefSource:[{index:1,sourceFields:''}],
        fieldRefOrd:[{index:1,fieldsOrder:'',order:''}],
        stringVett:['','','','',''],

        //LABEL
        TXT_CONDITIONS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.TXT_CONDITIONS,
        TXT_SOURCE_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.TXT_SOURCE_FIELDS,
        BTN_SPAN_ADD_SOURCE_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.BTN_SPAN_ADD_SOURCE_FIELDS,
        BTN_SPAN_REMOVE_SOURCE_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.BTN_SPAN_REMOVE_SOURCE_FIELDS,
        TXT_FIELD_DESTINATION:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.TXT_FIELD_DESTINATION,
        CHECK_DROP_GROUPING_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.CHECK_DROP_GROUPING_FIELDS,
        CHECK_ORDER_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.CHECK_ORDER_FIELDS,
        TXT_ORDER_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.TXT_ORDER_FIELDS,
        RADIO_ORDER_NONE:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.RADIO_ORDER_NONE,
        RADIO_ORDER_ASCENDENT:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.RADIO_ORDER_ASCENDENT,
        RADIO_ORDER_DESCENDENT:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.RADIO_ORDER_DESCENDENT,
        BTN_SPAN_ADD_ORDER_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.BTN_SPAN_ADD_ORDER_FIELDS,
        BTN_SPAN_REMOVE_ORDER_FIELDS:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.BTN_SPAN_REMOVE_ORDER_FIELDS,
        CHECK_GENERATE_SECTION:lang.WIZARD.SUBMODULES.PARTITION_CLAUSE.CHECK_GENERATE_SECTION,

        rules: {
          required: value => !!value || 'Required.',
          counterSource: value => this.counterTextSource(value),
          counterOrdT: value => this.counterTextOrd(value),
        }
      }
    },
    
     watch:{
        /**
         * WATCH: modifica della condizione or di una where
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        orCond:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica dei campi sorgente
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        sourceFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[1]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica dei campi destinazione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        destFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[2]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica di una group option relativa al drop
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        dropGroup:function(newVal,oldVal){
            if(newVal!=oldVal)
                this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica del slettore di ordinamento
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        orderSelection:function(newVal,oldVal){
            if(newVal!=oldVal)
                this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica della presenza di una sezione di generazione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        generateSect:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[4]="";
                else
                    this.stringVett[4]=this.generateSection;
                this.refreshArr(this.stringVett);
            }
        },
        /**
         * WATCH: modifica della sezione di generazione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        generateSection:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.generateSection && newVal!="")
                    this.stringVett[4]=newVal;
                else
                    this.stringVett[4]="";
            }
            this.refreshArr(this.stringVett);
        }
    },
    methods:{
        /**
         * Riscrittura dell'array
         */
        refreshArr(vettString){
            this.valueString=this.mypartitionIndex+"##\nPARTITION ";
            if(vettString[0]!="")
                this.valueString+="\n "+vettString[0] + " ";
            if(vettString[1]!="")
                this.valueString+="\nBY "+vettString[1] + " ";
            if(vettString[2]!="")
                this.valueString+="\nINTO "+vettString[2] + " ";
            if(this.dropGroup)
                this.valueString+="\nDROP GROUPING FIELDS ";
            if(vettString[3]!="" && this.orderSelection)
                this.valueString+="\nORDER BY "+vettString[3];
            if(vettString[4]!="" && this.generateAct)
                this.valueString+=vettString[4] + " ";
            this.$emit('changeValue', this.valueString);
        },
        /**
         * Introduzione di un source field
         */
        setPlusFieldRef(){
            if(this.fieldRefSource[this.fieldRefSource.length-1].sourceFields!=''){
                this.fieldRefSource.push({
                    index:this.fieldRefSource.length+1,
                    sourceFields:''
                })
            }
        },
        /**
         * Introduzione di un ordine di un campo
         */
        setPlusFieldOrd(){
            if(this.fieldRefOrd[this.fieldRefOrd.length-1].fieldsOrder!='' 
                && this.fieldRefOrd[this.fieldRefOrd.length-1].order!=''){
                this.fieldRefOrd.push({
                    index:this.fieldRefOrd.length+1,
                    fieldsOrder:'',
                    order:''
                })
            }
        },
        /**
         * Rimozione di un source field
         */
        checkMinusFieldRef(){
            if(this.fieldRefSource.length>1){
                this.fieldRefSource.pop()
            }
            this.counterTextSource(this.valueString.length);
        },
        /**
         * Rimozione di un order di un campo
         */
        checkMinusFieldOrd(){
            if(this.fieldRefOrd.length>1){
                this.fieldRefOrd.pop()
            }
            this.counterTextOrd(this.valueString.length);
        },
        /**
         * Riscrittura dell'array alla modifica di un campo source
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterTextSource(value){
            this.stringVett[1]='';
            this.fieldRefSource.forEach(element => {
                this.stringVett[1]+=element.sourceFields+", ";
            });
            this.stringVett[1]=this.stringVett[1].substring(0,this.stringVett[1].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        /**
         * Riscrittura dell'array alla modifica di un order di un campo
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterTextOrd(value){
            
            this.stringVett[3]='';
            this.fieldRefOrd.forEach(element => {
                this.stringVett[3]+=element.fieldsOrder+" "+element.order+", ";
            });
            this.stringVett[3]=this.stringVett[3].substring(0,this.stringVett[3].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        /**
         * Assegnamento di un testo della sezione di generazione
         * @param {String} textToChange Valore da modificare
         */
        changeText(textToChange){
            this.generateSection=textToChange;
        }
    },
    created(){
        this.valueString=this.mypartitionIndex+"##\nPARTITION ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>