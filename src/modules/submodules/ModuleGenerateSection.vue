
<template>
  <v-container fluid>
        <v-container
                class="px-0"
                fluid
            >
            <v-row>
                <v-col cols="3">
                    {{GEOMETRY.LB_GEOMETRY}}
                </v-col>
                <v-col cols="9">
                <v-radio-group v-model="setGeometry" row>
                <v-radio
                    :key=1
                    :label="GEOMETRY.RADIO_GEOMETRY_KEEPING"
                    value="KEEPING GEOMETRY"
                ></v-radio>
                <v-radio
                    :key=2
                    :label="GEOMETRY.RADIO_GEOMETRY_DROPPING"
                    value="DROPPING GEOMETRY"
                ></v-radio>
                <v-radio
                    :key=3
                    :label="GEOMETRY.RADIO_GEOMETRY_SETTING"
                    value="SETTING GEOMETRY"
                ></v-radio>
                </v-radio-group>
                </v-col>
            </v-row>
            </v-container>
            <v-container
                class="px-0"
                fluid
                v-if="setGeometry=='SETTING GEOMETRY'"
            >
            <v-row>
                <v-radio-group v-model="setGeometrySetting" row>
                <v-radio
                        key="1"
                        :label="GEOMETRY.RADIO_GEOMETRY_SETTING_POINT"
                        value="POINT"
                    ></v-radio>
                    <v-radio
                        key="2"
                        :label="GEOMETRY.RADIO_GEOMETRY_SETTING_AGGREGATE"
                        value="AGGREGATE"
                    ></v-radio>
                    <v-radio
                        key="3"
                        :label="GEOMETRY.RADIO_GEOMETRY_SETTING_FIELD"
                        value=" "
                    ></v-radio>
                    <v-radio
                        key="4"
                        :label="GEOMETRY.RADIO_GEOMETRY_SETTING_TO_POLYLINE"
                        value="TO_POLYLINE"
                    ></v-radio>
                    </v-radio-group>
                    <v-row v-if="setGeometrySetting=='POINT'"><v-col>
                    <v-text-field :label="VTXT_GEOMETRY_SETTING_POINT_FIRST_COORDINATE" v-model="textRadioBtn1"></v-text-field>
                    </v-col><v-col>
                    <v-text-field :label="GEOMETRY.TXT_GEOMETRY_SETTING_POINT_SECOND_COORDINATE" v-model="textRadioBtn2"></v-text-field>
                    </v-col></v-row>
                    <v-text-field v-if="setGeometrySetting!='POINT'" :label="GEOMETRY.TXT_GEOMETRY_SETTING_NO_POINT_FIELD" v-model="textRadioBtn1"></v-text-field> 
            </v-row>
            </v-container>
        <v-checkbox color="var(--bg-color)" v-model="fuzzyCheck" :label="CHECK_FUZZY_CHECK"></v-checkbox>
        <v-container style="border-style: inset;" v-if="fuzzyCheck">
        <v-row v-for="collect in collectionsFuzzy" :key="collect.index">
            <v-col>
            <v-text-field :rules="[rules.counter]" :label="TXT_COLL_FUZZY_ID_ISTR" v-model="collect.idFuzzyInstr"></v-text-field>
            </v-col>
            <v-col>
            <v-textarea :rules="[rules.counter]" :label="TXT_COLL_FUZZY_CONDITION" rows="1" v-model="collect.fuzzyInstr"></v-textarea>
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
        <span style="color: white">{{BTN_SPAN_ADD_FUZZY_ISTRUCTION}}</span>
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
        <span style="color: white">{{BTN_SPAN_REMOVE_FUZZY_ISTRUCTION}}</span>
        </v-btn>
        </v-container>
        </v-container>
        <v-checkbox color="var(--bg-color)" v-model="alphaCut" :label="CHECK_ALPHACUT"></v-checkbox>
        <v-container style="border-style: inset;" v-if="alphaCut">
        <v-row v-for="collect in collectionsAlpha" :key="collect.index">
            <v-col>
            <v-text-field :rules="[rules.counterA]" :label="TXT_ALPHACUT_NUMERIC_EXPR" v-model="collect.numericIstr"></v-text-field>
            </v-col>
            <v-col>
            <v-text-field :rules="[rules.counterA]" :label="TXT_ALPHACUT_ID" v-model="collect.idAlpha"></v-text-field>
            </v-col>
        </v-row>
        <v-container>
        <v-btn
            tile fab depressed elevation="5" raised
            dark small
            class="tooltip btnstyle"
            width="220px"
            style="color: white;background-color: var(--bg-color);" 
            @click="setPlusA()" 
        >
        <v-icon color="white">mdi-plus</v-icon>
        <span style="color: white">{{BTN_SPAN_ADD_ALPHACUT}}</span>
        </v-btn>
        &nbsp;&nbsp;
        <v-btn
            tile fab depressed elevation="5" raised
            dark small
            class="tooltip btnstyle"
            width="220px"
            style="color: white;background-color: var(--bg-color);" 
            @click="checkMinusA()" 
        >
        <v-icon color="white">mdi-minus</v-icon>
        <span style="color: white">{{BTN_SPAN_REMOVE_ALPHACUT}}</span>
        </v-btn>
        </v-container>
        </v-container>
        <v-checkbox color="var(--bg-color)" v-model="keepDropFuzzy" :label="CHECK_KEEP_DROP_FUZZY"></v-checkbox>
        <keepDropFuzzySet v-if="keepDropFuzzy" @changeValueKDFS="changeTextKeepDropFuzzy($event)"/>
        <v-checkbox color="var(--bg-color)" v-model="buildAction" :label="CHECK_BUILD_ACTION"></v-checkbox>
        <v-textarea rows=2 v-if="buildAction" color="var(--bg-color)" v-model="textBuild" :rules="[rules.required]" :label="TXT_BUILD_ACTION_FIELD"></v-textarea>
    </v-container>
</template>

<script>
import keepDropFuzzySet from './ModuleKeepDropFuzzySets.vue';
import lang from '../../env/lang.en'
export default {
    components:{
        keepDropFuzzySet
    },
   data () {
      return {
        valueString:'',
        generateGeometry:'KEEPING GEOMETRY',
        setGeometry:'KEEPING GEOMETRY',
        setGeometrySetting:'POINT',
        textRadioBtn1:'',
        textRadioBtn2:'',
        textBuild:'',
        collectionsFuzzy:[{index:'f1',idFuzzyInstr:'',fuzzyInstr:''}],
        collectionsAlpha:[{index:'a1',idAlpha:'',numericIstr:''}],
        alphaCut:false,
        keepDropFuzzy:false,
        fuzzyCheck:false,
        buildAction:false,
        stringVett:[{typeClause:'geometry',value:'KEEPING GEOMETRY'},
                    {typeClause:'checkfuzzy',value:''},
                    {typeClause:'alphacut',value:''},
                    {typeClause:'keepdropfuzzy',value:''},
                    {typeClause:'build',value:''},
                    ]
        ,

        //LABEL
            GEOMETRY:{
                LB_GEOMETRY:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.LB_GEOMETRY,
                RADIO_GEOMETRY_KEEPING:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_KEEPING,
                RADIO_GEOMETRY_DROPPING:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_DROPPING,
                RADIO_GEOMETRY_SETTING:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_SETTING,
                RADIO_GEOMETRY_SETTING_POINT:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_SETTING_POINT,
                RADIO_GEOMETRY_SETTING_AGGREGATE:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_SETTING_AGGREGATE,
                RADIO_GEOMETRY_SETTING_FIELD:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_SETTING_FIELD,
                RADIO_GEOMETRY_SETTING_TO_POLYLINE:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.RADIO_GEOMETRY_SETTING_TO_POLYLINE,
                TXT_GEOMETRY_SETTING_POINT_FIRST_COORDINATE:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.TXT_GEOMETRY_SETTING_POINT_FIRST_COORDINATE,
                TXT_GEOMETRY_SETTING_POINT_SECOND_COORDINATE:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.TXT_GEOMETRY_SETTING_POINT_SECOND_COORDINATE,
                TXT_GEOMETRY_SETTING_NO_POINT_FIELD:lang.WIZARD.SUBMODULES.GENERATE_SECTION.GEOMETRY.TXT_GEOMETRY_SETTING_NO_POINT_FIELD,
            },
            CHECK_FUZZY_CHECK:lang.WIZARD.SUBMODULES.GENERATE_SECTION.CHECK_FUZZY_CHECK,
            TXT_COLL_FUZZY_ID_ISTR:lang.WIZARD.SUBMODULES.GENERATE_SECTION.TXT_COLL_FUZZY_ID_ISTR,
            TXT_COLL_FUZZY_CONDITION:lang.WIZARD.SUBMODULES.GENERATE_SECTION.TXT_COLL_FUZZY_CONDITION,
            BTN_SPAN_ADD_FUZZY_ISTRUCTION:lang.WIZARD.SUBMODULES.GENERATE_SECTION.BTN_SPAN_ADD_FUZZY_ISTRUCTION,
            BTN_SPAN_REMOVE_FUZZY_ISTRUCTION:lang.WIZARD.SUBMODULES.GENERATE_SECTION.BTN_SPAN_REMOVE_FUZZY_ISTRUCTION,
            CHECK_ALPHACUT:lang.WIZARD.SUBMODULES.GENERATE_SECTION.CHECK_ALPHACUT,
            TXT_ALPHACUT_NUMERIC_EXPR:lang.WIZARD.SUBMODULES.GENERATE_SECTION.TXT_ALPHACUT_NUMERIC_EXPR,
            TXT_ALPHACUT_ID:lang.WIZARD.SUBMODULES.GENERATE_SECTION.TXT_ALPHACUT_ID,
            BTN_SPAN_ADD_ALPHACUT:lang.WIZARD.SUBMODULES.GENERATE_SECTION.BTN_SPAN_ADD_ALPHACUT,
            BTN_SPAN_REMOVE_ALPHACUT:lang.WIZARD.SUBMODULES.GENERATE_SECTION.BTN_SPAN_REMOVE_ALPHACUT,
            CHECK_KEEP_DROP_FUZZY:lang.WIZARD.SUBMODULES.GENERATE_SECTION.CHECK_KEEP_DROP_FUZZY,
            CHECK_BUILD_ACTION:lang.WIZARD.SUBMODULES.GENERATE_SECTION.CHECK_BUILD_ACTION,
            TXT_BUILD_ACTION_FIELD:lang.WIZARD.SUBMODULES.GENERATE_SECTION.TXT_BUILD_ACTION_FIELD,

        rules: {
            required: value => !!value || 'Required.',
            counter: value => this.counterText(value),
            counterA: value => this.counterTextA(value),
        }
      }
    },
    
     watch:{
        keepDropFuzzy:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[3].value="";
            }
            this.refreshArr(this.stringVett);
        },
        setGeometry:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!=""){
                    this.generateGeometry=newVal;
                    if(newVal=='SETTING GEOMETRY'){
                        this.generateGeometry+=" ";
                        if(this.setGeometrySetting!=" "){
                            this.generateGeometry+=this.setGeometrySetting;
                        }
                        if(this.setGeometrySetting=='POINT'){
                            this.generateGeometry+=" ("+this.textRadioBtn1+","+this.textRadioBtn2+") ";
                        }else if(this.setGeometrySetting=='AGGREGATE'||this.setGeometrySetting=='TO_POLYLINE'){
                            this.generateGeometry+=" ("+this.textRadioBtn1+") ";
                        }else{
                            this.generateGeometry+=this.textRadioBtn1+" ";
                        }
                    }
                    this.stringVett[0].value=this.generateGeometry;
                }else{
                    this.generateGeometry="";
                    this.stringVett[0].value="";
                }
            }
            this.refreshArr(this.stringVett);
        },
        setGeometrySetting:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.setGeometry=='SETTING GEOMETRY' && newVal!=""){
                    this.generateGeometry=this.setGeometry+" ";
                    if(newVal!=" "){
                        this.generateGeometry+=newVal;
                    }
                    if(newVal=='POINT'){
                        this.generateGeometry+=" ("+this.textRadioBtn1+","+this.textRadioBtn2+") ";
                    }else if(newVal=='AGGREGATE'||this.setGeometrySetting=='TO_POLYLINE'){
                        this.generateGeometry+=" ("+this.textRadioBtn1+") ";
                    }else if(newVal==" "){
                        this.generateGeometry+=this.textRadioBtn1+" ";
                    }
                    this.stringVett[0].value=this.generateGeometry;
                }else{
                    this.generateGeometry=this.setGeometry;
                    this.stringVett[0].value=this.generateGeometry;
                }
            }
            this.refreshArr(this.stringVett);
        },
        textRadioBtn1:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.setGeometry=='SETTING GEOMETRY' && newVal!=""){
                    this.generateGeometry=this.setGeometry+" ";
                    if(this.setGeometrySetting!=" "){
                            this.generateGeometry+=this.setGeometrySetting;
                    }
                    if(this.setGeometrySetting=='POINT'){
                        this.generateGeometry+=" ("+newVal+","+this.textRadioBtn2+") ";
                    }else if(this.setGeometrySetting=='AGGREGATE'||this.setGeometrySetting=='TO_POLYLINE'){
                        this.generateGeometry+=" ("+newVal+") ";
                    }else{
                        this.generateGeometry+=newVal+" ";
                    }
                    this.stringVett[0].value=this.generateGeometry;
                }else{
                    this.generateGeometry=this.setGeometry;
                    this.stringVett[0].value=this.generateGeometry;
                }
            }
            this.refreshArr(this.stringVett);
        },
        textRadioBtn2:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.setGeometry=='SETTING GEOMETRY' && newVal!=""){
                    this.generateGeometry=this.setGeometry+" ";
                    if(this.setGeometrySetting!=" "){
                        this.generateGeometry+=this.setGeometrySetting;
                    }
                    if(this.setGeometrySetting=='POINT'){
                        this.generateGeometry+=" ("+this.textRadioBtn1+","+newVal+") ";
                    }else if(this.setGeometrySetting=='AGGREGATE'||this.setGeometrySetting=='TO_POLYLINE'){
                        this.generateGeometry+=" ("+this.textRadioBtn1+") ";
                    }else{
                        this.generateGeometry+=this.textRadioBtn1+" ";
                    }
                    this.stringVett[0].value=this.generateGeometry;
                }else{
                    this.generateGeometry=this.setGeometry;
                    this.stringVett[0].value=this.generateGeometry;
                }
            }
            this.refreshArr(this.stringVett);
        },
        
        fuzzyCheck:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.stringVett[1].value="";
                    this.collectionsFuzzy=[{index:'f1',idFuzzyInstr:'',fuzzyInstr:''}]
                }   
                this.refreshArr(this.stringVett);
            }
            
        },
        alphaCut:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.stringVett[2].value="";
                    this.collectionsAlpha=[{index:'a1',idAlpha:'',numericIstr:''}]
                }   
                this.refreshArr(this.stringVett);
            }
        },
        buildAction:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal){
                    this.stringVett[4].value="";
                }   
                this.refreshArr(this.stringVett);
            }
        },
        textBuild:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!='' && this.buildAction){
                    this.stringVett[4].value="BUILD {"+newVal+"}";
                }   
                this.refreshArr(this.stringVett);
            }
        },
    },
    methods:{
        refreshArr(vettString){
            this.valueString="\nGENERATE ";
            if(vettString[0].value!=""){
                this.valueString+=vettString[0].value + " ";
            }if(vettString[1].value!="")
                this.valueString+="\n"+vettString[1].value + " ";
            if(vettString[2].value!="")
                this.valueString+="\n"+vettString[2].value + " ";
            if(vettString[3].value!="")
                this.valueString+="\n"+vettString[3].value + " ";
            if(vettString[4].value!="")
                this.valueString+="\n"+vettString[4].value + " ";
            this.$emit('changeValue', this.valueString);
        },
        checkMinus(){
            if(this.collectionsFuzzy.length>1){
                this.collectionsFuzzy.pop()
            }
            this.changeArrCollFuzzy();
        },
        setPlus(){
            if(this.collectionsFuzzy[this.collectionsFuzzy.length-1].idFuzzyInstr!=''
                && this.collectionsFuzzy[this.collectionsFuzzy.length-1].fuzzyInstr!=''){
                this.collectionsFuzzy.push({
                    index:this.collectionsFuzzy.length+1,
                    idFuzzyInstr:'',
                    fuzzyInstr:''
                })
                this.changeArrCollFuzzy();
            }
        },
        checkMinusA(){
            if(this.collectionsAlpha.length>1){
                this.collectionsAlpha.pop()
            }
            this.refreshStringColl();
        },
        setPlusA(){
            if(this.collectionsAlpha[this.collectionsAlpha.length-1].idAlpha!=''
                && this.collectionsAlpha[this.collectionsAlpha.length-1].numericIstr!=''){
                this.collectionsAlpha.push({
                    index:this.collectionsAlpha.length+1,
                    idAlpha:'',
                    numericIstr:''
                })
                this.refreshStringColl();
            }
        },
        refreshStringColl(){
            this.stringVett[2].value="";
            this.stringVett[2].value+="ALPHACUT ";
            this.collectionsAlpha.forEach(element => {
                this.stringVett[2].value+=element.numericIstr+" ON "+element.idAlpha+",\n";
            });
            this.stringVett[2].value=this.stringVett[2].value.substring(0,this.stringVett[2].value.length-2);
            this.refreshArr(this.stringVett)
        },
        counterText(value){
            this.changeArrCollFuzzy();
            return value.length>-1;
        },
        counterTextA(value){
            this.refreshStringColl();
            return value.length>-1;
        },
        changeArrCollFuzzy(){
            this.stringVett[1].value="";
            this.stringVett[1].value+="CHECK FOR "
            this.collectionsFuzzy.forEach(element => {
                this.stringVett[1].value+="FUZZY SET "+element.idFuzzyInstr+" USING "+element.fuzzyInstr+",\n";
            });
            this.stringVett[1].value=this.stringVett[1].value.substring(0,this.stringVett[1].value.length-2);
            this.refreshArr(this.stringVett)
        },
        changeTextKeepDropFuzzy(valueString){
            this.stringVett[3].value=valueString;
            this.refreshArr(this.stringVett)
        }
        
    },
    created(){
        this.valueString="\nGENERATE ";
        this.refreshArr(this.stringVett);
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>