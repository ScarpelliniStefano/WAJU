<template>
  <v-sheet>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`collection ${collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`db ${collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`alias ${collect.index}`" v-model="collect.alias"/></v-col>
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
            <span style="color: white">&nbsp;ADD COLLECTION</span>
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
            <span style="color: white">&nbsp;DELETE COLLECTION</span>
            </v-btn>
            <v-checkbox v-model="removeDup" color="var(--bg-color)" label="remove duplicates?"></v-checkbox>
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
    watch:{
        removeDup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal){
                    this.valueString=this.valueString.substring(0,this.valueString.length-1);
                    this.valueString+=" REMOVE DUPLICATES;"
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.length-(" REMOVE DUPLICATES;".length));
                    this.valueString+=";"
                }
            }
            this.$emit('changeValue', this.valueString);
        }
    },
    methods:{
        checkMinus(){
            if(this.collections.length>2){
                this.collections.pop()
            }
            this.valueArr.pop()
        },
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