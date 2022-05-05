<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counterColl]" v-model="collect.collection" :label="`${TXT_COLLECTION_NR+collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`${TXT_DB+collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`${TXT_ALIAS+collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
            <br>
            <v-container>
            <v-container v-for="collect in collectionsPartitions" :key="collect.index" fluid>
            <v-row >
                <trajectory-partition :mytrajectoryPartIndex="collect.index" @changeValueTrajectory="changeTextTrajectory($event)"/>
            </v-row>
            <br v-if="collect.index != Object.keys(collectionsPartitions).length - 1"/>
            </v-container>
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="300px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlus()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">{{BTN_SPAN_ADD_TRAJECTORY_PARTITION}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="300px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinus()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">{{BTN_SPAN_REMOVE_TRAJECTORY_PARTITION}}</span>
            </v-btn>
            </v-container>
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
import lang from '../env/lang.en'
import trajectoryPartition from "./submodules/ModuleTrajectoryPartition.vue";
export default {
    name:"WizardTrajectoryMatching",
    props:{
        maincol: String
    },
    components:{
        trajectoryPartition
    },
   data () {
       
      return {
            collections:[{
                index:1,
                collection: '',
                db: '',
                alias: ''
            },
            {
                index:2,
                collection: '',
                db: '',
                alias: ''
            }],
            valueArr:['',''],
            valueArrTra:[''],
            valueString:';',
            radioGroup:'NONE',
            collectionsPartitions:[
            {
                index:'1part',
                stringa:"1part##"
            }
            ],
            stringVett:['',''],

            //LABEL:
            TXT_COLLECTION_NR: lang.WIZARD.MODULES.TRAJECTORY_MATCHING.TXT_COLLECTION_NR,
            TXT_DB: lang.WIZARD.MODULES.TRAJECTORY_MATCHING.TXT_DB,
            TXT_ALIAS: lang.WIZARD.MODULES.TRAJECTORY_MATCHING.TXT_ALIAS,
            BTN_SPAN_ADD_TRAJECTORY_PARTITION:lang.WIZARD.MODULES.TRAJECTORY_MATCHING.BTN_SPAN_ADD_TRAJECTORY_PARTITION,
            BTN_SPAN_REMOVE_TRAJECTORY_PARTITION:lang.WIZARD.MODULES.TRAJECTORY_MATCHING.BTN_SPAN_REMOVE_TRAJECTORY_PARTITION,
            RADIO_KEEP_OTHERS:lang.WIZARD.MODULES.TRAJECTORY_MATCHING.RADIO_KEEP_OTHERS,
            RADIO_DROP_OTHERS:lang.WIZARD.MODULES.TRAJECTORY_MATCHING.RADIO_DROP_OTHERS,
            RADIO_NONE:lang.WIZARD.MODULES.TRAJECTORY_MATCHING.RADIO_NONE,


            rules: {
                required: value => !!value || 'Required.',
                counter: value => this.counterTextTrajectory(value),
                counterColl: value => this.counterTextColl(value),
            }
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
                this.refreshArr(this.stringVett);
            }
        }
    },
    methods:{
        /**
         * Rimozione di una partizione
         */
        checkMinus(){
            if(this.collectionsPartitions.length>1){
                this.collectionsPartitions.pop()
                this.valueArrTra.pop()
            }
            this.counterTextTrajectory(this.valueArrTra.length);
        },
        /**
         * Introduzione di una nuova partizione
         */
        setPlus(){
            if(this.collectionsPartitions[this.collectionsPartitions.length-1].stringa!=''){
                this.collectionsPartitions.push({
                    index:(this.collectionsPartitions.length+1)+"part",
                    stringa:(this.collectionsPartitions.length+1)+"part##"
                })
                this.valueArrTra.push('');
            }
        },
        /**
         * Riscrittura dell'istruzione dopo modifica di una traiettoria
         * @param {String} ind Indice della traiettoria da modificare
         */
        changeTextTrajectory(str){
            let id=Number(str.split("##")[0].substring(0,str.split("##")[0].length-4))-1;
            this.collectionsPartitions[id].stringa=str;
            this.valueArrTra[id]=str.split("##")[1];
            this.valueArrTra[id]=this.valueArrTra[id].substring(0,this.valueArrTra[id].length-1);
            this.counterTextTrajectory(str.length)
        },
        /**
         * Riscrittura dell'array alla modifica di una traiettoria
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterTextTrajectory(value){
            this.stringVett[1]=''
            this.valueArrTra.forEach(element=>{
                this.stringVett[1]+=element+"\n";
            })
            this.stringVett[1]=this.stringVett[1].substring(0,this.stringVett[1].length-1)
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        /**
         * Riscrittura dell'array alla modifica di un testo
         * @param {String} vettString Array delle varie stringhe
         */
        refreshArr(vettString){
            this.valueString=" ";
            if(vettString[0]!="")
                this.valueString+="\n"+vettString[0] + " ";
            if(vettString[1]!="")
                this.valueString+=vettString[1] + " ";
            if(this.radioGroup!="NONE")
                this.valueString+="\n"+this.radioGroup + " ";
            this.valueString+=";";
            this.$emit('changeValue', this.valueString);
        },
        /**
         * Riscrittura dell'istruzione dopo modifica di una collezione
         * @param {Number} ind Indice della collezione da modificare
         */
        changeText(ind){
            let str= this.valueArr[ind];
            str="";
            
            if(this.collections[ind].collection!="")
                str=this.collections[ind].collection;
                if(this.collections[ind].db!="")
                    str+="@"+this.collections[ind].db;
                if(this.collections[ind].alias)
                    str+=" AS "+this.collections[ind].alias;
            this.valueArr[ind]=str;
            let valTempString=" ";
            this.valueArr.forEach(element => {
                valTempString+=element;
                valTempString+=", "
            });
            valTempString=valTempString.substring(0,valTempString.length-2);
            this.stringVett[0]=valTempString;
            this.refreshArr(this.stringVett);
        },
        /**
         * Riscrittura dell'array alla modifica di una collezione
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterTextColl(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(i);
            }
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