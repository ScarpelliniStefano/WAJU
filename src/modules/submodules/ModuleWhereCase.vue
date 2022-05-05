<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" :label="TXT_COLLECT_CLAUSE" rows="2" auto-grow v-model="whereClause"/>
                <v-checkbox color="var(--bg-color)" v-model="generateSect" :label="CHECK_GEN_SECTION"></v-checkbox>
                <generate-section v-if="generateSect" @changeValue="changeText($event)"/>
            </v-container>
            
</template>

<script>
import generateSection from './ModuleGenerateSection.vue';
import lang from '../../env/lang.en'
export default {
    name:"ModuleWhereCase",
    props:{
        mywhereIndex: Number
    },
    components:{
        generateSection
    },
   data () {
      return {
        valueString:'',
        whereClause:'',
        generateSection:'',
        generateSect:false,
        stringVett:[{typeClause:'where',value:''},
                    {typeClause:'generate',value:''}
                    ],
        rules: {
            required: value => !!value || 'Required.'
        },

        TXT_COLLECT_CLAUSE: lang.WIZARD.SUBMODULES.WHERE_CASE.TXT_COLLECT_CLAUSE,
        CHECK_GEN_SECTION: lang.WIZARD.SUBMODULES.WHERE_CASE.CHECK_GEN_SECTION
      }
    },
    
     watch:{
         /**
         * WATCH: modifica della clausola where
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        whereClause:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0].value=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        /**
         * WATCH: modifica della presenza della sezione di generazione
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        generateSect:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[1].value="";
                else
                    this.stringVett[1].value=this.generateSection;
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
                    this.stringVett[1].value=newVal;
                else
                    this.stringVett[1].value="";
            }
            this.refreshArr(this.stringVett);
        },
    },
    methods:{
        /**
         * Riscrittura dell'array alla modifica di una where cause
         * @param {String} vettStringPart Array delle where clause
         */
        refreshArr(vettString){
            this.valueString=this.mywhereIndex+"##\nWHERE ";
            if(vettString[0].value!="")
                this.valueString+="\n "+vettString[0].value + " ";
            if(vettString[1].value!="")
                this.valueString+=vettString[1].value + " ";
            this.$emit('changeValue', this.valueString);
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
        this.valueString=this.mywhereIndex+"##\nWHERE ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>