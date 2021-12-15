<template>
    <v-sheet>
        <v-select  v-model="selected" :items="arrayModel"  label="Modules"></v-select>
        <modules :select="this.selected" v-on:changeValue="changeValue($event)"></modules><br>
        <v-textarea disabled v-model="value"/>
    </v-sheet>
</template>

<script>
import modules from '../modules/modules.vue'
export default {
    data:()=> ({
        arrayModel : ['PRENDI UNA COLLEZIONE','PRENDI UN DIZIONARIO'],
        value : '',
        selected : ''
    }),
    components:{
        modules
    },
    methods:{
        changeValue(addText){
            this.value=addText;
        }
    }
}
</script>

<style>

</style>