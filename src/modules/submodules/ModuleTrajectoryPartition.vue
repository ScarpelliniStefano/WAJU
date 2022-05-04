<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" :label="TXT_CONDITIONS" rows="2" auto-grow v-model="orCondPart"/>
                <br>
                <v-container v-for="collect in collectionsPartMatch" :key="collect.index" fluid >
                <v-row style="border-style: inset;">
                    <partition-matching :mypartmatchIndex="collect.index" @changeValueMatch="changeTextMatch($event)"/>
                </v-row>
                <br v-if="collect.index != collectionsPartMatch.length - 1"/>
                </v-container>
                
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="250px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlusPartMatch()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">&nbsp;{{BTN_SPAN_ADD}}</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="250px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinusPartMatch()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">&nbsp;{{BTN_SPAN_DELETE}}</span>
                </v-btn>
                
                
            </v-container>
</template>

<script>
import partitionMatching from "./ModulePartitionMatching.vue";
import lang from '../../env/lang.en'
export default {
    name:"ModuleTrajectoryPartition",
    props:{
        mytrajectoryPartIndex: String
    },
    components:{
        partitionMatching
    },
    
    data () {
      return {
        valueStringPart:'',
        orCondPart:'',
        stringVettPart:['',''],
        valueArrPartMatch:[''],
        collectionsPartMatch:[
            {
                index:'1pm',
                stringaPM:"1pm##"
            }
        ],
        rules: {
          required: value => !!value || 'Required.'
        },

        //LABEL
        TXT_CONDITIONS: lang.WIZARD.SUBMODULES.TRAJECTORY_PARTITION.TXT_CONDITIONS,
        BTN_SPAN_ADD: lang.WIZARD.SUBMODULES.TRAJECTORY_PARTITION.BTN_SPAN_ADD,
        BTN_SPAN_DELETE: lang.WIZARD.SUBMODULES.TRAJECTORY_PARTITION.BTN_SPAN_DELETE,
      }
    },
    
     watch:{
        
        orCondPart:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVettPart[0]=newVal;
            }
            
            this.refreshArrPart(this.stringVettPart);
        },

    },
    methods:{
        /**
         * Riscrittura dell'array alla modifica di una partizione
         * @param {String} vettStringPart Array delle trajectory partition 
         */
        refreshArrPart(vettStringPart){
            this.valueStringPart=this.mytrajectoryPartIndex+"##\nPARTITION ";
            if(vettStringPart[0]!="")
                this.valueStringPart+="\n"+vettStringPart[0] + " ";
            if(vettStringPart[1]!="")
                this.valueStringPart+=vettStringPart[1] + " ";
            
            this.$emit('changeValueTrajectory', this.valueStringPart);
        },
        /**
         * Rimozione di una partition matching
         */
        checkMinusPartMatch(){
            if(this.collectionsPartMatch.length>1){
                this.collectionsPartMatch.pop()
                this.valueArrPartMatch.pop()
            }
            this.counterTextMatch(this.valueArrPartMatch.length);
        },
        /**
         * Introduzione di una partition matching
         */
        setPlusPartMatch(){
            if(this.collectionsPartMatch[this.collectionsPartMatch.length-1].stringaPM!=''){
                this.collectionsPartMatch.push({
                    index:(this.collectionsPartMatch.length+1)+"pm",
                    stringaPM:(this.collectionsPartMatch.length+1)+"pm##"
                })
                this.valueArrPartMatch.push('');
            }
        },
        /**
         * Modifica di una partition matching
         * @param {String} str Stringa contenente le modifiche
         */
        changeTextMatch(str){
            let id=Number(str.split("##")[0].substring(0,str.split("##")[0].length-2))-1;
            this.collectionsPartMatch[id].stringaPM=str; 
            this.valueArrPartMatch[id]=str.split("##")[1];
            this.counterTextMatch(this.valueArrPartMatch.length);
        },
        /**
         * Riscrittura dell'array alla modifica di un partition matching
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterTextMatch(value){
            this.stringVettPart[1]=''
            this.valueArrPartMatch.forEach(element=>{
                this.stringVettPart[1]+=element;
            })
            this.refreshArrPart(this.stringVettPart);
            return value.length>-1;
        },
    },
    created(){
        this.valueStringPart=this.mytrajectoryPartIndex+"##\nPARTITION ";
        this.$emit('changeValueTrajectory', this.valueStringPart);
    }
}
</script>

<style>

</style>