<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counterColl]" v-model="collect.collection" :label="`collection ${collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`db ${collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`alias ${collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
            <v-checkbox color="var(--bg-color)" v-model="nonFuzzyFunct" label="non fuzzy functions?"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="nonFuzzyFunct" label="non fuzzy function" rows="1" v-model="nonFuzzyFunctText"></v-textarea>
            <v-container
                class="px-0"
                fluid
            >
            <v-row>
                <v-col cols="3">
                    GEOMETRY:
                </v-col>
                <v-col cols="9">
                <v-radio-group v-model="setGeometry" row>
                <v-radio
                    :key=1
                    label="intersection"
                    value="INTERSECTION"
                ></v-radio>
                <v-radio
                    :key=2
                    label="right"
                    value="RIGHT"
                ></v-radio>
                <v-radio
                    :key=3
                    label="left"
                    value="LEFT"
                ></v-radio>
                <v-radio
                    :key=4
                    label="all"
                    value="ALL"
                ></v-radio>
                </v-radio-group>
                </v-col>
            </v-row>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="addFields" label="add fields?"></v-checkbox>
            <v-row  v-for="collect in fieldsAddColl" :key="collect.index">
                    <v-col>
                    <v-textarea :rules="[rules.required,rules.counter]" v-if="addFields" label="non fuzzy function" rows="1" v-model="collect.nonFuzzyF"></v-textarea>
                    </v-col>
                    <v-col>
                    <v-text-field :rules="[rules.required,rules.counter]" v-if="addFields" label="fieldReference" v-model="collect.fieldRef"></v-text-field>
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
            <v-checkbox color="var(--bg-color)" v-model="setFuzzySets" label="set fuzzy sets?"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="setFuzzySets" label="fuzzy sets" rows="2" v-model="setFuzzySetsText"></v-textarea>
            <v-checkbox color="var(--bg-color)" v-model="caseClauseSel" label="do you want to insert a case clause?"></v-checkbox>
            <case-clause v-if="caseClauseSel" v-on:changeValue="changeValue($event)"/>
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
        nonFuzzyFunct:false,
        addFields:false,
        setFuzzySets:false,
        setFuzzySetsText:'',
        nonFuzzyFunctText:'',
        setGeometry:'INTERSECTION',
        caseClauseSel:false,
        collections:[{
            index:'1coll',
            collection: '',
            db: '',
            alias: ''
        },
        {
            index:'2coll',
            collection: '',
            db: '',
            alias: ''
        }],
        stringVett:['','','','',''],
        fieldsAddColl:[{index:"1f",nonFuzzyF:'',fieldRef:''}],
        rules: {
          required: value => !!value || 'Required.',
          counter: value => this.counterText(value),
          counterColl: value => this.counterTextColl(value),
        }
      }
    },
    
    
     watch:{
        setGeometry:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        removeDup:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        caseClauseSel:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        addFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        setFuzzySets:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        setFuzzySetsText:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[3]=newVal;
                }
                this.refreshArr(this.stringVett);
            }
        },
        nonFuzzyFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        nonFuzzyFunctText:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=newVal;
                }
                this.refreshArr(this.stringVett);
            }
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString="";
            if(vettString[0]!="")
                this.valueString+="\n "+vettString[0] + " ";
            if(vettString[1]!="" && this.nonFuzzyFunct)
                this.valueString+="\nON "+vettString[1] + " ";
            this.valueString+="\nSET GEOMETRY "+this.setGeometry + " ";
            if(vettString[2]!="" && this.addFields)
                this.valueString+="\nADD FIELDS "+vettString[2] + " ";
            if(vettString[3]!="" && this.setFuzzySets)
                this.valueString+="\nSET FUZZY SETS "+vettString[3] + " ";
            if(vettString[4]!="" && this.caseClauseSel)
                this.valueString+="\nCASE "+vettString[4] + " ";
            if(this.removeDup)
                this.valueString+="\nREMOVE DUPLICATES ";
            this.valueString+=";";
            this.$emit('changeValue', this.valueString);
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
            let valTempString=" ";
            this.valueArr.forEach(element => {
                valTempString+=element;
                valTempString+=", "
            });
            valTempString=valTempString.substring(0,valTempString.length-2);
            this.stringVett[0]=valTempString;
            this.refreshArr(this.stringVett);
        },
        changeValue(string){
            this.stringVett[4]=string.split("#$#")[0];
            this.refreshArr(this.stringVett);
        },
        checkMinus(){
            if(this.fieldsAddColl.length>1){
                this.fieldsAddColl.pop()
            }
            this.counterText(this.fieldsAddColl);
        },
        setPlus(){
            this.fieldsAddColl.push({
                index:(this.fieldsAddColl.length+1)+"f",
                nonFuzzyF:'',
                fieldRef:''
            })
        },
        counterText(value){
            this.stringVett[2]='';
            this.fieldsAddColl.forEach(element=>{
                this.stringVett[2]+=element.nonFuzzyF + " AS "+element.fieldRef+", ";
            })
            this.stringVett[2]=this.stringVett[2].substring(0,this.stringVett[2].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        counterTextColl(value){
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