<template>
    <v-sheet>
        <get-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET COLLECTION'"/>
        <get-dict v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET DICTIONARY'"/>
        <save-as v-on:changeValue="changeValue($event)" v-if="this.valueString=='SAVE AS'"/>
        <merge-coll :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='MERGE COLLECTIONS'"/>
        <intersect-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='INTERSECT COLLECTIONS'"/>
        <subtract-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='SUBTRACT COLLECTIONS'"/>
        <use-db :maincol="maincol" v-on:changeValue="changeValue($event)" v-if="this.valueString=='USE DB'"/>
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
        useDb
    },
    watch:{
        select:function(newVal, oldVal){
            if(newVal!=oldVal){
                switch (newVal) {
                    case "PRENDI UNA COLLEZIONE":
                        this.valueString="GET COLLECTION"
                        break;
                    case "PRENDI UN DIZIONARIO":
                        this.valueString="GET DICTIONARY"
                        break;
                    case "SALVA LOCALMENTE O IN UN DATABASE":
                        this.valueString="SAVE AS"
                        break;
                    case "UNISCI DUE O PIU' COLLEZIONI":
                        this.valueString="MERGE COLLECTIONS"
                        break;
                    case "INTERSEZIONE DI DUE COLLEZIONI":
                        this.valueString="INTERSECT COLLECTIONS"
                        break;
                    case "SOTTRAZIONE DI DUE COLLEZIONI":
                        this.valueString="SUBTRACT COLLECTIONS"
                        break;
                    case "USA UN DATABASE":
                        this.valueString="USE DB"
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