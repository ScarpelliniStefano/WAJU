<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`collection ${collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`db ${collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`alias ${collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
            <v-checkbox color="var(--bg-color)" v-model="addFields" label="add fields?"></v-checkbox>
            <v-row  v-for="collect in fieldsAddColl" :key="collect.index">
                    <v-col>
                    <v-textarea :rules="[rules.counter]" v-if="addFields" label="non fuzzy function" rows="1" v-model="collect.nonFuzzyF"></v-textarea>
                    </v-col>
                    <v-col>
                    <v-text-field :rules="[rules.counter]" v-if="addFields" label="fieldReference" v-model="collect.fieldRef"></v-text-field>
                    </v-col>
                </v-row>
                <v-container v-if="addFields">
                <v-btn
                    fab
                    dark 
                    small
                    @click="setPlus()" 
                    color="var(--bg-color)"
                >
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark 
                    small
                    @click="checkMinus()" 
                    color="var(--bg-color)"
                >
                <v-icon dark>
                    mdi-minus
                </v-icon>
                </v-btn>
                </v-container>
        
            <case-clause v-on:changeValue="changeValue($event)"/>
            <v-checkbox color="var(--bg-color)" v-model="removeDup" label="Remove duplicates?"></v-checkbox>
        </v-container>
  </v-sheet>
</template>

<script>
import caseClause from "./submodules/caseClause.vue";
export default {
    
    props:{
        maincol: String
    },
    components:{
        caseClause
    },
   data () {
      return {
        valueString:';',
        valueArr:['',''],
        removeDup: false,
        addFields:false,
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
        stringVett:['','','','',''],
        fieldsAddColl:[{index:"1f",nonFuzzyF:'',fieldRef:''}],
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
                    this.valueString=this.valueString.substring(0,this.valueString.length-1)+" REMOVE DUPLICATES;"
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf(" REMOVE DUPLICATES;"))+";";
                }
            }
            this.$emit('changeValue', this.valueString);
        },
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
        changeValue(string){
            let valueCopy=this.valueString;
            if(valueCopy.includes("REMOVE DUPLICATES;")){
                this.valueString=" "+string.split("#$#")[0]+" REMOVE DUPLICATES";
            }else{
                this.valueString=" " + string.split("#$#")[0];
            }
            this.valueString+=";";
            this.$emit('changeValue', this.valueString);
        },
        checkMinus(){
            if(this.fieldsAddColl.length>1){
                this.fieldsAddColl.pop()
            }
            this.changeFieldsAddColl();
        },
        setPlus(){
            this.fieldsAddColl.push({
                index:this.fieldsAddColl.length+1,
                nonFuzzyF:'',
                fieldRef:''
            })
            this.changeFieldsAddColl();
        },
        counterText(value){
            this.stringVett[2]='';
            this.fieldsAddColl.forEach(element=>{
                this.stringVett[2]+=element.nonFuzzyF + " AS "+element.fieldRef+", ";
            })
            this.stringVett[2]=this.stringVett[2].substring(0,this.stringVett[2].length-2);
            return value.length>-1;
        }
    },
    created(){
        this.valueString+="\n"+this.radioGroup+" ;";
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>