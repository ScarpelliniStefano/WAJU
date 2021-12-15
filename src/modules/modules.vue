<template>
    <v-sheet height="200px" width="600px">
        <get-coll v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET COLLECTION'"/>
        <get-dict v-on:changeValue="changeValue($event)" v-if="this.valueString=='GET DICTIONARY'"/>
    </v-sheet>
</template>

<script>
import getColl from "./getCollection.vue";
import getDict from "./getDictionary.vue";
export default {
    data:()=>({
        valueString:''
    }),
    props:{
        select : String
    },
    components:{
        getColl,
        getDict
    },
    watch:{
        select:function(newVal, oldVal){
            if(newVal!=oldVal){
                if(newVal=="PRENDI UNA COLLEZIONE"){
                    this.valueString="GET COLLECTION"
                    
                }else if(newVal=="PRENDI UN DIZIONARIO"){
                    this.valueString="GET DICTIONARY"
                }
                this.changeValue('');
            }
        }
    },
    methods:{
        changeValue(addText){
            this.$emit('changeValue', this.valueString+addText);
        }
    }
    
}
</script>

<style>

</style>