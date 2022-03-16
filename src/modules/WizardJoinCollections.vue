<template>
  <v-sheet>
      <v-container fluid>
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col><v-text-field :rules="[rules.required,rules.counterColl]" v-model="collect.collection" :label="`${TXT_COLLECTION_NR + collect.index}`"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`${TXT_DB + collect.index}`" v-model="collect.db"/></v-col>
                <v-col><v-text-field :rules="[rules.counterColl]" v-if="collect.collection!=''" :label="`${TXT_ALIAS + collect.index}`" v-model="collect.alias"/></v-col>
            </v-row>
            <v-checkbox color="var(--bg-color)" v-model="spatialFunct" :label="SPATIAL_FUNCTION.CHECK_SPATIAL_FUNCTION"></v-checkbox>
            <v-container
                class="px-0"
                fluid
                v-if="spatialFunct"
            >
            <v-row>
                <v-col cols="3">
                   {{SPATIAL_FUNCTION.LB_GEO_SPATIAL_FUNCT}}
                </v-col>
                <v-col cols="5">
                <v-radio-group v-model="spatialFunctText" row>
                <v-radio
                    key='1spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_DISTANCE"
                    value="DISTANCE"
                ></v-radio>
                <v-radio
                    key='2spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_AREA"
                    value="AREA"
                ></v-radio>
                <v-radio
                    key='3spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_ORIENTATION"
                    value="ORIENTATION"
                ></v-radio>
                <v-radio
                    key='4spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_INCLUDED"
                    value="INCLUDED"
                ></v-radio>
                <v-radio
                    key='5spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_MEET"
                    value="MEET"
                ></v-radio>
                <v-radio
                    key='6spf'
                    :label="SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_INTERSECT"
                    value="INTERSECT"
                ></v-radio>
                </v-radio-group>
                </v-col>
                <v-col cols="4">
                    <v-select
                        v-if="spatialFunctText=='ORIENTATION' || spatialFunctText=='INCLUDED'"
                        :items="itemsLeftRightSpFunct"
                        :label="SPATIAL_FUNCTION.SEL_LEFT_RIGHT_SP_FUNCT"
                        v-model="leftRightSpFunct"
                    ></v-select>
                    <v-checkbox color="var(--bg-color)" v-if="spatialFunctText=='ORIENTATION'" v-model="setCompNumSpfunct" :label="SPATIAL_FUNCTION.CHECK_ID_NUMBER"></v-checkbox>
                    <v-text-field :rules="[rules.required]" v-if="spatialFunctText=='DISTANCE' || spatialFunctText=='AREA' || (spatialFunctText=='ORIENTATION' && setCompNumSpfunct)" v-model="idSpFunct" :label="`${SPATIAL_FUNCTION.TXT_ID_SP_FUNCT+spatialFunctText}`"/>
                    <v-checkbox color="var(--bg-color)" v-if="spatialFunctText=='DISTANCE' || spatialFunctText=='AREA'" v-model="setCompNumSpfunct" :label="SPATIAL_FUNCTION.CHECK_SET_COMP_NUM_SP_FUNCT"></v-checkbox>
                     <v-select
                        v-if="setCompNumSpfunct &&
                        (spatialFunctText=='DISTANCE' || spatialFunctText=='AREA')"
                        :items="itemschoiceSpFunct"
                        :label="SPATIAL_FUNCTION.SEL_CHOICE_SP_FUNCT"
                        v-model="choiceSpFunct"
                    ></v-select>
                    <v-text-field :rules="[rules.required]" v-if="((spatialFunctText=='DISTANCE' || spatialFunctText=='AREA') && setCompNumSpfunct) || (spatialFunctText=='ORIENTATION' && setCompNumSpfunct)" v-model="numSpFunct" :label="`${SPATIAL_FUNCTION.TXT_NUM_SP_FUNCT+spatialFunctText}`"/>
                </v-col>
            </v-row>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="setGeometry" :label="GEOMETRY.CHECK_GEOMETRY"></v-checkbox>
            <v-container
                class="px-0"
                fluid
                v-if="setGeometry"
            >
            <v-row>
                <v-col cols="3">
                    {{GEOMETRY.LB_GEOMETRY}}
                </v-col>
                <v-col cols="9">
                <v-radio-group v-model="setGeometryVal" row>
                <v-radio
                    :key=1
                    :label="GEOMETRY.RADIO_GEOMETRY_INTERSECTION"
                    value="INTERSECTION"
                ></v-radio>
                <v-radio
                    :key=2
                    :label="GEOMETRY.RADIO_GEOMETRY_RIGHT"
                    value="RIGHT"
                ></v-radio>
                <v-radio
                    :key=3
                    :label="GEOMETRY.RADIO_GEOMETRY_LEFT"
                    value="LEFT"
                ></v-radio>
                <v-radio
                    :key=4
                    :label="GEOMETRY.RADIO_GEOMETRY_ALL"
                    value="ALL"
                ></v-radio>
                </v-radio-group>
                </v-col>
            </v-row>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="addFields" :label="CHECK_ADD_FIELDS"></v-checkbox>
            <v-container style="border-style: outset;" v-if="addFields">
            <v-row  v-for="collect in fieldsAddColl" :key="collect.index">
                    <v-col>
                    <v-textarea :rules="[rules.required,rules.counter]" v-if="addFields" :label="TXT_ADD_FIELD_NON_FUZZY_FUNCT" rows="1" v-model="collect.nonFuzzyF"></v-textarea>
                    </v-col>
                    <v-col>
                    <v-text-field :rules="[rules.required,rules.counter]" v-if="addFields" :label="TXT_ADD_FIELD_FIELD_REF" v-model="collect.fieldRef"></v-text-field>
                    </v-col>
                </v-row>
                <v-container>
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlus()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">{{BTN_SPAN_ADD_FIELD_REF}}</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinus()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">{{BTN_SPAN_REMOVE_FIELD_REF}}</span>
                </v-btn>
                </v-container>
            </v-container>
            <v-checkbox color="var(--bg-color)" v-model="setFuzzySets" :label="CHECK_FUZZY_SETS"></v-checkbox>
            <v-textarea :rules="[rules.required]" v-if="setFuzzySets" :label="TXT_FUZZY_SETS" rows="2" v-model="setFuzzySetsText"></v-textarea>
            <v-checkbox color="var(--bg-color)" v-model="caseClauseSel" :label="CHECK_CASE_CLAUSE"></v-checkbox>
            <case-clause v-if="caseClauseSel" @changeValue="changeValue($event)"/>
            <v-checkbox color="var(--bg-color)" v-model="removeDup" :label="CHECK_REMOVE_DUPLICATES"></v-checkbox>
        </v-container>
  </v-sheet>
</template>

<script>
import caseClause from "./submodules/ModuleCaseClause.vue";
import lang from '../env/lang.en'

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
        spatialFunct:false,
        addFields:false,
        setFuzzySets:false,
        setFuzzySetsText:'',
        spatialFunctText:'INTERSECT',
        idSpFunct:'',
        choiceSpFunct:'=',
        numSpFunct:'',
        leftRightSpFunct:'LEFT',
        itemsLeftRightSpFunct:['LEFT','RIGHT'],
        itemschoiceSpFunct:['=','!=','<','>','<=','>='],
        setCompNumSpfunct:false,
        setGeometry:false,
        setGeometryVal:'INTERSECTION',
        caseClauseSel:false,
        collections:[{
            index:'1',
            collection: '',
            db: '',
            alias: ''
        },
        {
            index:'2',
            collection: '',
            db: '',
            alias: ''
        }],
        stringVett:['','','','',''],
        fieldsAddColl:[{index:"1f",nonFuzzyF:'',fieldRef:''}],

        //LABEL
        TXT_COLLECTION_NR: lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_COLLECTION_NR,
        TXT_DB: lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_DB,
        TXT_ALIAS: lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_ALIAS,
        SPATIAL_FUNCTION:{
            CHECK_SPATIAL_FUNCTION:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.CHECK_SPATIAL_FUNCTION,
            LB_GEO_SPATIAL_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.LB_GEO_SPATIAL_FUNCT,
            RADIO_SPATIAL_FUNCT_DISTANCE:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_DISTANCE,
            RADIO_SPATIAL_FUNCT_AREA:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_AREA,
            RADIO_SPATIAL_FUNCT_ORIENTATION:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_ORIENTATION,
            RADIO_SPATIAL_FUNCT_INCLUDED:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_INCLUDED,
            RADIO_SPATIAL_FUNCT_MEET:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_MEET,
            RADIO_SPATIAL_FUNCT_INTERSECT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.RADIO_SPATIAL_FUNCT_INTERSECT,
            SEL_LEFT_RIGHT_SP_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.SEL_LEFT_RIGHT_SP_FUNCT,
            CHECK_ID_NUMBER:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.CHECK_ID_NUMBER,
            TXT_ID_SP_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.TXT_ID_SP_FUNCT,
            CHECK_SET_COMP_NUM_SP_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.CHECK_SET_COMP_NUM_SP_FUNCT,
            TXT_NUM_SP_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.TXT_NUM_SP_FUNCT,
            SEL_CHOICE_SP_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.SPATIAL_FUNCTION.SEL_CHOICE_SP_FUNCT
        },
        GEOMETRY:{
            CHECK_GEOMETRY:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.CHECK_GEOMETRY,
            LB_GEOMETRY:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.LB_GEOMETRY,
            RADIO_GEOMETRY_INTERSECTION:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.RADIO_GEOMETRY_INTERSECTION,
            RADIO_GEOMETRY_RIGHT:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.RADIO_GEOMETRY_RIGHT,
            RADIO_GEOMETRY_LEFT:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.RADIO_GEOMETRY_LEFT,
            RADIO_GEOMETRY_ALL:lang.WIZARD.MODULES.JOIN_COLLECTION.GEOMETRY.RADIO_GEOMETRY_ALL
        },
        CHECK_ADD_FIELDS:lang.WIZARD.MODULES.JOIN_COLLECTION.CHECK_ADD_FIELDS,
        TXT_ADD_FIELD_NON_FUZZY_FUNCT:lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_ADD_FIELD_NON_FUZZY_FUNCT,
        TXT_ADD_FIELD_FIELD_REF:lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_ADD_FIELD_FIELD_REF,
        BTN_SPAN_ADD_FIELD_REF:lang.WIZARD.MODULES.JOIN_COLLECTION.BTN_SPAN_ADD_FIELD_REF,
        BTN_SPAN_REMOVE_FIELD_REF:lang.WIZARD.MODULES.JOIN_COLLECTION.BTN_SPAN_REMOVE_FIELD_REF,
        CHECK_FUZZY_SETS:lang.WIZARD.MODULES.JOIN_COLLECTION.CHECK_FUZZY_SETS,
        TXT_FUZZY_SETS:lang.WIZARD.MODULES.JOIN_COLLECTION.TXT_FUZZY_SETS,
        CHECK_CASE_CLAUSE:lang.WIZARD.MODULES.JOIN_COLLECTION.CHECK_CASE_CLAUSE,
        CHECK_REMOVE_DUPLICATES:lang.WIZARD.MODULES.JOIN_COLLECTION.CHECK_REMOVE_DUPLICATES,

        rules: {
          required: value => !!value || 'Required.',
          counter: value => this.counterText(value),
          counterColl: value => this.counterTextColl(value),
        }
      }
    },
    
    
     watch:{
        setGeometryVal:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
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
        spatialFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshArr(this.stringVett);
            }
        },
        spatialFunctText:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=newVal;
                    if(newVal=='DISTANCE'|| newVal=='AREA'){
                        this.stringVett[1]+=" ("+this.idSpFunct+") ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=this.choiceSpFunct+" "+this.numSpFunct;
                    }else if(newVal=='ORIENTATION'){
                        this.leftRightSpFunct='LEFT'
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+" ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=", "+this.idSpFunct+":"+this.numSpFunct;
                        this.stringVett[1]+=") ";
                    }else if(newVal=='INCLUDED'){
                        console.log('hi')
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+") ";
                    }
                }
                this.refreshArr(this.stringVett);
            }
        },
        
        idSpFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=this.spatialFunctText;
                    if(this.spatialFunctText=='DISTANCE'|| this.spatialFunctText=='AREA'){
                        this.stringVett[1]+=" ("+newVal+") ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=this.choiceSpFunct+" "+this.numSpFunct;
                    }else if(this.spatialFunctText=='ORIENTATION'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+" ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=", "+newVal+":"+this.numSpFunct;
                        this.stringVett[1]+=") ";
                    }else if(this.spatialFunctText=='INCLUDED'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+") ";
                    }
                }
                this.refreshArr(this.stringVett);
            }
        },
        leftRightSpFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=this.spatialFunctText;
                    if(this.spatialFunctText=='DISTANCE'|| this.spatialFunctText=='AREA'){
                        this.stringVett[1]+=" ("+this.idSpFunct+") ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=this.choiceSpFunct+" "+this.numSpFunct;
                    }else if(this.spatialFunctText=='ORIENTATION'){
                        this.stringVett[1]+=" ("+newVal+" ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=", "+this.idSpFunct+":"+this.numSpFunct;
                        this.stringVett[1]+=") ";
                    }else if(this.spatialFunctText=='INCLUDED'){
                        this.stringVett[1]+=" ("+newVal+") ";
                    }
                }
                this.refreshArr(this.stringVett);
            }
        },
        choiceSpFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=this.spatialFunctText;
                    if(this.spatialFunctText=='DISTANCE'|| this.spatialFunctText=='AREA'){
                        this.stringVett[1]+=" ("+this.idSpFunct+") ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=this.choiceSpFunct+" "+this.numSpFunct;
                    }else if(this.spatialFunctText=='ORIENTATION'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+" ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=", "+this.idSpFunct+":"+this.numSpFunct;
                        this.stringVett[1]+=") ";
                    }else if(this.spatialFunctText=='INCLUDED'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+") ";
                    }
                }
                this.refreshArr(this.stringVett);
            }
        },
        numSpFunct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.stringVett[1]=this.spatialFunctText;
                    if(this.spatialFunctText=='DISTANCE'|| this.spatialFunctText=='AREA'){
                        this.stringVett[1]+=" ("+this.idSpFunct+") ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=this.choiceSpFunct+" "+newVal;
                    }else if(this.spatialFunctText=='ORIENTATION'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+" ";
                        if(this.setCompNumSpfunct) this.stringVett[1]+=", "+this.idSpFunct+":"+newVal;
                        this.stringVett[1]+=") ";
                    }else if(this.spatialFunctText=='INCLUDED'){
                        this.stringVett[1]+=" ("+this.leftRightSpFunct+") ";
                    }
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
            if(vettString[1]!="" && this.spatialFunct)
                this.valueString+="\nON GEOMETRY "+vettString[1] + " ";
            if(this.setGeometry)
            this.valueString+="\nSET GEOMETRY "+this.setGeometryVal + " ";
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
            if(this.fieldsAddColl[this.fieldsAddColl.length-1].nonFuzzyF!=''
                && this.fieldsAddColl[this.fieldsAddColl.length-1].fieldRef!=''){
                this.fieldsAddColl.push({
                    index:(this.fieldsAddColl.length+1)+"f",
                    nonFuzzyF:'',
                    fieldRef:''
                })
            }
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
        this.refreshArr(this.stringVett);
        this.stringVett[1]=this.spatialFunctText;
        this.$emit('changeValue', this.valueString);
    }
    
}
</script>

<style>

</style>