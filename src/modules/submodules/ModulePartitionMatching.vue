<template>
            
            <v-container fluid >
                <v-row>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" :label="TXT_FIELD_MATCHING" v-model="fieldMatch"/>
                    </v-col>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" :label="TXT_FIELD_WRT" v-model="fieldWrt"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" :label="TXT_ID_THRESHOLD" v-model="idThreshold"/>
                    </v-col>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" :label="TXT_NUMERIC_THRESHOLD" v-model="numThreshold"/>
                    </v-col>
                </v-row>
                <v-checkbox color="var(--bg-color)" v-model="whereMatching" :label="CHECK_WHERE_COND"></v-checkbox>
                <v-textarea :rules="[rules.required,rules.counterFields]" v-if="whereMatching" :label="TXT_WHERE_COND" rows="1" v-model="whereMatchingText"/>
                <v-text-field :rules="[rules.required,rules.counterFields]" :label="TXT_FIELD_DEST" v-model="fieldInto"/>
                <v-checkbox color="var(--bg-color)" v-model="addingToInput" :label="CHECK_ADD_FIELD"></v-checkbox>
                <v-text-field :rules="[rules.required,rules.counterFields]" v-if="addingToInput" :label="TXT_ADD_FIELD" v-model="addingToInputText"/>
                <v-checkbox color="var(--bg-color)" v-model="minSimilarity" :label="CHECK_SET_MIN_SIM"></v-checkbox>
                <v-text-field :rules="[rules.required,rules.counterFields]" v-if="minSimilarity" :label="TXT_MIN_SIM" v-model="minSimilarityText"/>
            </v-container>
</template>

<script>
import lang from '../../env/lang.en'
export default {
    name:"ModulePartitionMatching",
    props:{
        mypartmatchIndex: String
    },
    
   data () {
      return {
        valueStringMatching:'',
        fieldMatch:'',
        fieldWrt:'',
        idThreshold:'',
        numThreshold:'',
        whereMatching:false,
        whereMatchingText:'',
        fieldInto:'',
        addingToInput:false,
        addingToInputText:'',
        minSimilarity:false,
        minSimilarityText:'',
        rules: {
          required: value => !!value || 'Required.',
          counterFields: value => value!="" ? this.refreshStringMatch() : false,
        },

        //LABEL
        TXT_FIELD_MATCHING: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_FIELD_MATCHING,
        TXT_FIELD_WRT: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_FIELD_WRT,
        TXT_ID_THRESHOLD: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_ID_THRESHOLD,
        TXT_NUMERIC_THRESHOLD: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_NUMERIC_THRESHOLD,
        CHECK_WHERE_COND: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.CHECK_WHERE_COND,
        TXT_WHERE_COND: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_WHERE_COND,
        TXT_FIELD_DEST: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_FIELD_DEST,
        CHECK_ADD_FIELD: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.CHECK_ADD_FIELD,
        TXT_ADD_FIELD: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_ADD_FIELD,
        CHECK_SET_MIN_SIM: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.CHECK_SET_MIN_SIM,
        TXT_MIN_SIM: lang.WIZARD.SUBMODULES.PARTITION_MATCHING.TXT_MIN_SIM
      }
    },
    
     watch:{
        /**
         * WATCH: modifica della clausola where
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        whereMatching:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },
        /**
         * WATCH: modifica della presenza di aggiunta a un input
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        addingToInput:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },
        /**
         * WATCH: modifica della minima similarità
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        minSimilarity:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },

    },
    methods:{
        /**
         * Riscrittura dell'array di matching
         * @returns true
         */
        refreshStringMatch(){
            this.valueStringMatching=this.mypartmatchIndex+"##\nMATCHING ";
            if(this.fieldMatch!="")
                this.valueStringMatching+=this.fieldMatch + " ";
            if(this.fieldWrt!="")
                this.valueStringMatching+="WRT "+ this.fieldWrt + " \n";
            if(this.idThreshold!="")
                this.valueStringMatching+="THRESHOLD ("+ this.idThreshold + ") ";
            if(this.numThreshold!="")
                this.valueStringMatching+=""+ this.numThreshold + " \n";
            if(this.whereMatchingText!="" && this.whereMatching)
                this.valueStringMatching+="WHERE "+ this.whereMatchingText+ " \n";
            if(this.fieldInto!="")
                this.valueStringMatching+="INTO "+ this.fieldInto+ " \n";
            if(this.addingToInputText!="" && this.addingToInput)
                this.valueStringMatching+="ADDING "+ this.addingToInputText+ " TO INPUT\n";
            if(this.minSimilarityText!="" && this.minSimilarity)
                this.valueStringMatching+="MIN SIMILARITY "+ this.minSimilarityText+ " \n";
            this.valueStringMatching=this.valueStringMatching.substring(0,this.valueStringMatching.length-1)
            this.$emit('changeValueMatch', this.valueStringMatching);
            return true;
        }
    },
    created(){
        this.valString=this.mypartmatchIndex+"##\nMATCHING ";
        this.$emit('changeValueMatch', this.valString);
    }
}
</script>

<style>

</style>