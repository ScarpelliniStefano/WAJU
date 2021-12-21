<template>
  <v-sheet>
            <v-row v-for="collect in collections" :key="collect.index">
            <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`collection ${collect.index}`"/></v-col>
            <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`db ${collect.index}`" v-model="collect.db"/></v-col>
            <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`alias ${collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
  </v-sheet>
</template>

<script>
export default {
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