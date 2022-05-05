<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`${TXT_COLLECTION_NR + collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`${TXT_DB + collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`${TXT_ALIAS + collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
            <br>
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="200px"
                style="color: white;background-color: var(--bg-color);" 
                @click="setPlus()" 
            >
            <v-icon color="white">mdi-plus</v-icon>
            <span style="color: white">{{BTN_SPAN_ADD_COLLECTION}}</span>
            </v-btn>
            &nbsp;&nbsp;
            <v-btn
                tile fab depressed elevation="5" raised
                dark
                class="tooltip btnstyle"
                width="200px"
                style="color: white;background-color: var(--bg-color);" 
                @click="checkMinus()" 
            >
            <v-icon color="white">mdi-minus</v-icon>
            <span style="color: white">{{BTN_SPAN_REMOVE_COLLECTION}}</span>
            </v-btn>
            <v-checkbox v-model="removeDup" color="var(--bg-color)" :label="CHECK_REMOVE_DUPLICATES"></v-checkbox>
      </v-container>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'

export default {
    name:"WizardMergeCollections",
   data () {
      return {
        valueString:'',
        valueArr:['',''],
        removeDup: false,
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

        //LABEL
        TXT_COLLECTION_NR: lang.WIZARD.MODULES.MERGE_COLLECTION.TXT_COLLECTION_NR,
        TXT_DB: lang.WIZARD.MODULES.MERGE_COLLECTION.TXT_DB,
        TXT_ALIAS: lang.WIZARD.MODULES.MERGE_COLLECTION.TXT_ALIAS,
        BTN_SPAN_ADD_COLLECTION:lang.WIZARD.MODULES.MERGE_COLLECTION.BTN_SPAN_ADD_COLLECTION,
        BTN_SPAN_REMOVE_COLLECTION:lang.WIZARD.MODULES.MERGE_COLLECTION.BTN_SPAN_REMOVE_COLLECTION,
        CHECK_REMOVE_DUPLICATES:lang.WIZARD.MODULES.MERGE_COLLECTION.CHECK_REMOVE_DUPLICATES,

        rules: {
          required: value => !!value || 'Required.',
          counter: value => this.counterText(value),
        }
      }
    },
    watch:{
        /**
         * WATCH: modifica della checkbox relativa alla rimozione dei duplicati
         * @param {String} newVal Nuovo valore
         * @param {String} oldVal Vecchio valore
         */
        removeDup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal){
                    this.valueString=this.valueString.substring(0,this.valueString.length-1);
                    this.valueString+=" REMOVE DUPLICATES ;"
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.length-(" REMOVE DUPLICATES ;".length));
                    this.valueString+=" ;"
                }
            }
            this.$emit('changeValue', this.valueString);
        }
    },
    methods:{
        /**
         * Rimozione di un collezione
         */
        checkMinus(){
            if(this.collections.length>2){
                this.collections.pop()
                this.valueArr.pop()
            }
            this.counterText(this.collections.length)
        },
        /**
         * Introduzione di una nuova collezione
         */
        setPlus(){
            if(this.collections[this.collections.length-1].collection!=''){
                this.collections.push({
                    index:this.collections.length+1,
                    collection:'',
                    db:'',
                    alias:''
                })
                this.valueArr.push('')
            }
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
            this.valueString=" ";
            this.valueArr.forEach(element => {
                this.valueString+=element;
                this.valueString+=", "
            });
            this.valueString=this.valueString.substring(0,this.valueString.length-2);
            if(this.removeDup){
                    this.valueString=this.valueString.substring(0,this.valueString.length);
                    this.valueString+=" REMOVE DUPLICATES"
            }
            this.valueString+=" ;"
            this.$emit('changeValue', this.valueString);
        },
        /**
         * Riscrittura dell'array alla modifica di una collezione
         * @param {String} value Valore da modificare
         * @returns lunghezza valore passato
         */
        counterText(value){
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