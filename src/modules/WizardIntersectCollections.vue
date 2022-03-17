<template>
  <v-sheet>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`${TXT_COLLECTION_NR + collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`${TXT_DB + collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`${TXT_ALIAS + collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
  </v-sheet>
</template>

<script>
import lang from '../env/lang.en'

export default {
    name:"WizardIntersectCollections",
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
        TXT_COLLECTION_NR: lang.WIZARD.MODULES.INTERSECT_COLLECTION.TXT_COLLECTION_NR,
        TXT_DB: lang.WIZARD.MODULES.INTERSECT_COLLECTION.TXT_DB,
        TXT_ALIAS: lang.WIZARD.MODULES.INTERSECT_COLLECTION.TXT_ALIAS,

        rules: {
          required: value => !!value || 'Required.',
          counter: value => this.counterText(value),
        }
      }
    },
    methods:{
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
            this.valueString+=";"
            this.$emit('changeValue', this.valueString);
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(i);
            }
            return value.length>-1;
        }
        
    }
}
</script>

<style>

</style>