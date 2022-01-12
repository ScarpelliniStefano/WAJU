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

export default {
    data:()=>({
        valueString:''
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
        filterClause
    },
    watch:{
        select:function(newVal, oldVal){
            if(newVal!=oldVal){
                switch (newVal) {
                    case "GET A COLLECTION":
                        this.valueString="GET COLLECTION"
                        break;
                    case "GET A DICTIONARY":
                        this.valueString="GET DICTIONARY"
                        break;
                    case "SAVE LOCALLY OR IN A DATABASE":
                        this.valueString="SAVE AS"
                        break;
                    case "MERGE TWO OR MORE COLLECTIONS":
                        this.valueString="MERGE COLLECTIONS"
                        break;
                    case "INTERSECT TWO COLLECTIONS":
                        this.valueString="INTERSECT COLLECTIONS"
                        break;
                    case "SUBTRACT TWO COLLECTIONS":
                        this.valueString="SUBTRACT COLLECTIONS"
                        break;
                    case "USE A DATABASE":
                        this.valueString="USE DB"
                        break;
                     case "FILTER ON FIELD":
                        this.valueString="FILTER"
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