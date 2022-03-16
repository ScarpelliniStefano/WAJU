<template>
    <v-sheet>
        <get-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET COLLECTION'"/>
        <get-dict v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET DICTIONARY'"/>
        <save-as v-on:changeValue="changeValue($event)" v-if="this.valueString=='SAVE AS'"/>
        <merge-coll :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='MERGE COLLECTIONS'"/>
        <intersect-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='INTERSECT COLLECTIONS'"/>
        <subtract-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='SUBTRACT COLLECTIONS'"/>
        <use-db :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='USE DB'"/>
        <filter-clause :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='FILTER'"/>
        <expand-clause :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='EXPAND'"/>
        <group-clause :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='GROUP'"/>
        <join-coll-clause :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='JOIN OF COLLECTIONS'"/>
        <create-fuzzy-op :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='CREATE FUZZY OPERATOR'"/>
        <create-javascript-function :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='CREATE JAVASCRIPT FUNCTION'"/>
        <trajectory-match :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='TRAJECTORY MATCHING'"/>
    </v-sheet>
</template>

<script>
import getColl from "./getCollection.vue";
import getDict from "./getDictionary.vue";
import saveAs from "./saveAs.vue";
import mergeColl from "./mergeCollections.vue";
import intersectColl from "./intersectCollections.vue";
import subtractColl from "./subtractCollections.vue";
import useDb from "./useDB.vue";
import filterClause from "./filter.vue";
import expandClause from "./expand.vue";
import groupClause from "./group.vue";
import joinCollClause from "./joinColl.vue";
import createFuzzyOp from "./createFuzzyOp.vue";
import createJavascriptFunction from "./createJsFunct.vue"
import trajectoryMatch from "./trajectoryMatch.vue";

import lang from '../env/lang.en'

export default {
    data:()=>({
        valueString:'',

        //LABEL
        SEL_GET_COLL:lang.WIZARD.SPECIFICATION.SEL_GET_COLL,
        SEL_GET_DICT:lang.WIZARD.SPECIFICATION.SEL_GET_DICT,
        SEL_SAVE_AS:lang.WIZARD.SPECIFICATION.SEL_SAVE_AS,
        SEL_MERGE_COLL:lang.WIZARD.SPECIFICATION.SEL_MERGE_COLL,
        SEL_INTERSECT_COLL:lang.WIZARD.SPECIFICATION.SEL_INTERSECT_COLL,
        SEL_SUBTRACT_COLL:lang.WIZARD.SPECIFICATION.SEL_SUBTRACT_COLL,
        SEL_USE_DB:lang.WIZARD.SPECIFICATION.SEL_USE_DB,
        SEL_FILTER:lang.WIZARD.SPECIFICATION.SEL_FILTER,
        SEL_EXPAND:lang.WIZARD.SPECIFICATION.SEL_EXPAND,
        SEL_GROUP:lang.WIZARD.SPECIFICATION.SEL_GROUP,
        SEL_JOIN:lang.WIZARD.SPECIFICATION.SEL_JOIN,
        SEL_FUZZY_OP:lang.WIZARD.SPECIFICATION.SEL_FUZZY_OP,
        SEL_JS_FUNCTION:lang.WIZARD.SPECIFICATION.SEL_JS_FUNCTION,
        SEL_TRAJECTORY_MATCHING:lang.WIZARD.SPECIFICATION.SEL_TRAJECTORY_MATCHING
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
        changeValue(addText){
            this.$emit('changeValue', this.indice+"##"+this.valueString+addText);
        }
    }
    
}
</script>

<style>

</style>