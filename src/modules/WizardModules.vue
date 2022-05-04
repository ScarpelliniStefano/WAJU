<template>
    <v-sheet>
        <get-coll @changeValue="changeValue($event)" v-if="this.valueString=='GET COLLECTION'"/>
        <get-dict @changeValue="changeValue($event)" v-if="this.valueString=='GET DICTIONARY'"/>
        <save-as @changeValue="changeValue($event)" v-if="this.valueString=='SAVE AS'"/>
        <merge-coll @changeValue="changeValue($event)" v-if="this.valueString=='MERGE COLLECTIONS'"/>
        <intersect-coll @changeValue="changeValue($event)" v-if="this.valueString=='INTERSECT COLLECTIONS'"/>
        <subtract-coll @changeValue="changeValue($event)" v-if="this.valueString=='SUBTRACT COLLECTIONS'"/>
        <use-db @changeValue="changeValue($event)" v-if="this.valueString=='USE DB'"/>
        <filter-clause @changeValue="changeValue($event)" v-if="this.valueString=='FILTER'"/>
        <expand-clause @changeValue="changeValue($event)" v-if="this.valueString=='EXPAND'"/>
        <group-clause @changeValue="changeValue($event)" v-if="this.valueString=='GROUP'"/>
        <join-coll-clause @changeValue="changeValue($event)" v-if="this.valueString=='JOIN OF COLLECTIONS'"/>
        <create-fuzzy-op @changeValue="changeValue($event)" v-if="this.valueString=='CREATE FUZZY OPERATOR'"/>
        <create-javascript-function @changeValue="changeValue($event)" v-if="this.valueString=='CREATE JAVASCRIPT FUNCTION'"/>
        <trajectory-match @changeValue="changeValue($event)" v-if="this.valueString=='TRAJECTORY MATCHING'"/>
    </v-sheet>
</template>

<script>
import getColl from "./WizardGetCollection.vue";
import getDict from "./WizardGetDictionary.vue";
import saveAs from "./WizardSaveAs.vue";
import mergeColl from "./WizardMergeCollections.vue";
import intersectColl from "./WizardIntersectCollections.vue";
import subtractColl from "./WizardSubtractCollections.vue";
import useDb from "./WizardUseDB.vue";
import filterClause from "./WizardFilter.vue";
import expandClause from "./WizardExpand.vue";
import groupClause from "./WizardGroup.vue";
import joinCollClause from "./WizardJoinCollections.vue";
import createFuzzyOp from "./WizardCreateFuzzyOperator.vue";
import createJavascriptFunction from "./WizardCreateJavaScriptFunction.vue"
import trajectoryMatch from "./WizardTrajectoryMatching.vue";

import lang from '../env/lang.en'

export default {
    name:"WizardModules",
    data:()=>({
        valueString:'',

        //LABEL
        SEL_GET_COLL:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GET_COLL,
        SEL_GET_DICT:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GET_DICT,
        SEL_SAVE_AS:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_SAVE_AS,
        SEL_MERGE_COLL:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_MERGE_COLL,
        SEL_INTERSECT_COLL:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_INTERSECT_COLL,
        SEL_SUBTRACT_COLL:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_SUBTRACT_COLL,
        SEL_USE_DB:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_USE_DB,
        SEL_FILTER:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_FILTER,
        SEL_EXPAND:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_EXPAND,
        SEL_GROUP:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_GROUP,
        SEL_JOIN:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_JOIN,
        SEL_FUZZY_OP:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_FUZZY_OP,
        SEL_JS_FUNCTION:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_JS_FUNCTION,
        SEL_TRAJECTORY_MATCHING:lang.WIZARD.SPECIFICATION.SELECTOR.SEL_TRAJECTORY_MATCHING
    }),
    props:{
        select : String,
        indice : Number,
        maincol: String
    },
    components:{
        getColl,
        getDict,
        saveAs,
        mergeColl,
        intersectColl,
        subtractColl,
        useDb,
        filterClause,
        expandClause,
        groupClause,
        joinCollClause,
        createFuzzyOp,
        createJavascriptFunction,
        trajectoryMatch
    },
    watch:{
        select:function(newVal, oldVal){
            if(newVal!=oldVal){
                switch (newVal) {
                    case this.SEL_GET_COLL:
                        this.valueString="GET COLLECTION"
                        break;
                    case this.SEL_GET_DICT:
                        this.valueString="GET DICTIONARY"
                        break;
                    case this.SEL_SAVE_AS:
                        this.valueString="SAVE AS"
                        break;
                    case this.SEL_MERGE_COLL:
                        this.valueString="MERGE COLLECTIONS"
                        break;
                    case this.SEL_INTERSECT_COLL:
                        this.valueString="INTERSECT COLLECTIONS"
                        break;
                    case this.SEL_SUBTRACT_COLL:
                        this.valueString="SUBTRACT COLLECTIONS"
                        break;
                    case this.SEL_USE_DB:
                        this.valueString="USE DB"
                        break;
                     case this.SEL_FILTER:
                        this.valueString="FILTER"
                        break;
                    case this.SEL_EXPAND:
                        this.valueString="EXPAND"
                        break;
                    case this.SEL_GROUP:
                        this.valueString="GROUP"
                        break;
                    case this.SEL_JOIN:
                        this.valueString="JOIN OF COLLECTIONS"
                        break;
                    case this.SEL_FUZZY_OP:
                        this.valueString="CREATE FUZZY OPERATOR"
                        break;
                    case this.SEL_JS_FUNCTION:
                        this.valueString="CREATE JAVASCRIPT FUNCTION"
                        break;
                    case this.SEL_TRAJECTORY_MATCHING:
                        this.valueString="TRAJECTORY MATCHING"
                        break;
                    default:
                        break;
                }
                this.changeValue('');
            }
        }
    },
    methods:{
        /**
         * Invio del segnale di cambio valore
         * @param {String} addText Testo da cambiare
         */
        changeValue(addText){
            this.$emit('changeValue', this.indice+"##"+this.valueString+addText);
        }
    }
    
}
</script>

<style>

</style>