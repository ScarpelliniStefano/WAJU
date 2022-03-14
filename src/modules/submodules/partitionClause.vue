<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCond"></v-textarea>
                <v-container fluid style="border-style: outset;">
                <v-row v-for="collect in fieldRefSource" :key="collect.index">
                    <v-text-field :rules="[rules.required,rules.counterSource]" label="fields of source fields" v-model="collect.sourceFields"></v-text-field>
                </v-row>
                </v-container>
                <br>
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlusFieldRef()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">&nbsp;ADD SOURCE FIELD</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="220px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinusFieldRef()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">&nbsp;DELETE SOURCE FIELD</span>
                </v-btn>
                <v-text-field :rules="[rules.required]" label="fields of destination array" v-model="destFields"></v-text-field>
                <v-checkbox color="var(--bg-color)" v-model="dropGroup" label="drop grouping fields?"></v-checkbox>
                <v-checkbox color="var(--bg-color)" v-model="orderSelection" label="order fields?"></v-checkbox>
                <v-container v-if="orderSelection" style="border-style: outset;">
                    <v-row  v-for="collect in fieldRefOrd" :key="collect.index" >
                        <v-col>
                        <v-text-field :rules="[rules.required,rules.counterOrdT]" label="Order fields" v-model="collect.fieldsOrder"></v-text-field>
                        </v-col>
                        <v-col>
                        <v-container
                                class="px-0"
                                fluid
                            >
                                <v-radio-group v-model="collect.order" :rules="[rules.counterOrdT]" row>
                                <v-radio
                                    :key=1
                                    label="none"
                                    value=" "
                                ></v-radio>
                                <v-radio
                                    :key=2
                                    label="ascendent"
                                    value="ASC "
                                ></v-radio>
                                <v-radio
                                    :key=3
                                    label="descendent"
                                    value="DESC "
                                ></v-radio>
                                </v-radio-group>
                        </v-container>
                        </v-col>
                    </v-row>
                    <br>
                    <v-btn
                        tile fab depressed elevation="5" raised
                        dark small
                        class="tooltip btnstyle"
                        width="200px"
                        style="color: white;background-color: var(--bg-color);" 
                        @click="setPlusFieldOrd()" 
                    >
                    <v-icon color="white">mdi-plus</v-icon>
                    <span style="color: white">&nbsp;ADD ORDER FIELD</span>
                    </v-btn>
                    &nbsp;&nbsp;
                    <v-btn
                        tile fab depressed elevation="5" raised
                        dark small
                        class="tooltip btnstyle"
                        width="200px"
                        style="color: white;background-color: var(--bg-color);" 
                        @click="checkMinusFieldOrd()" 
                    >
                    <v-icon color="white">mdi-minus</v-icon>
                    <span style="color: white">&nbsp;DELETE ORDER FIELD</span>
                    </v-btn>
                </v-container>
                
                <v-checkbox color="var(--bg-color)" v-model="generateSect" label="add a generate section?"></v-checkbox>
                <generate-section v-if="generateSect" v-on:changeValue="changeText($event)"/>
            </v-container>
</template>

<script>

export default {
    props:{
        mypartitionIndex: Number
    },
    
   data () {
      return {
        valueString:'',
        orCond:'',
        generateSect:false,
        dropGroup:false,
        orderSelection:false,
        generateSection:'',
        sourceFields:'',
        destFields:'',
        fieldRefSource:[{index:1,sourceFields:''}],
        fieldRefOrd:[{index:1,fieldsOrder:'',order:''}],
        stringVett:['','','','',''],
        rules: {
          required: value => !!value || 'Required.',
          counterSource: value => this.counterTextSource(value),
          counterOrdT: value => this.counterTextOrd(value),
        }
      }
    },
    
     watch:{
        
        orCond:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[0]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        sourceFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[1]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        destFields:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVett[2]=newVal;
            }
            this.refreshArr(this.stringVett);
        },
        dropGroup:function(newVal,oldVal){
            if(newVal!=oldVal)
                this.refreshArr(this.stringVett);
        },
        orderSelection:function(newVal,oldVal){
            if(newVal!=oldVal)
                this.refreshArr(this.stringVett);
        },
        generateSect:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[4]="";
                else
                    this.stringVett[4]=this.generateSection;
                this.refreshArr(this.stringVett);
            }
        },
        generateSection:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.generateSection && newVal!="")
                    this.stringVett[4]=newVal;
                else
                    this.stringVett[4]="";
            }
            this.refreshArr(this.stringVett);
        }
    },
    methods:{
        refreshArr(vettString){
            this.valueString=this.mypartitionIndex+"##\nPARTITION ";
            if(vettString[0]!="")
                this.valueString+="\n "+vettString[0] + " ";
            if(vettString[1]!="")
                this.valueString+="\nBY "+vettString[1] + " ";
            if(vettString[2]!="")
                this.valueString+="\nINTO "+vettString[2] + " ";
            if(this.dropGroup)
                this.valueString+="\nDROP GROUPING FIELDS ";
            if(vettString[3]!="" && this.orderSelection)
                this.valueString+="\nORDER BY "+vettString[3];
            if(vettString[4]!="" && this.generateAct)
                this.valueString+=vettString[4] + " ";
            this.$emit('changeValue', this.valueString);
        },
        setPlusFieldRef(){
            if(this.fieldRefSource[this.fieldRefSource.length-1].sourceFields!=''){
                this.fieldRefSource.push({
                    index:this.fieldRefSource.length+1,
                    sourceFields:''
                })
            }
        },
        setPlusFieldOrd(){
            if(this.fieldRefOrd[this.fieldRefOrd.length-1].fieldsOrder!='' 
                && this.fieldRefOrd[this.fieldRefOrd.length-1].order!=''){
                this.fieldRefOrd.push({
                    index:this.fieldRefOrd.length+1,
                    fieldsOrder:'',
                    order:''
                })
            }
        },
        checkMinusFieldRef(){
            if(this.fieldRefSource.length>1){
                this.fieldRefSource.pop()
            }
            this.counterTextSource(this.valueString.length);
        },
        checkMinusFieldOrd(){
            if(this.fieldRefOrd.length>1){
                this.fieldRefOrd.pop()
            }
            this.counterTextOrd(this.valueString.length);
        },
        counterTextSource(value){
            this.stringVett[1]='';
            this.fieldRefSource.forEach(element => {
                this.stringVett[1]+=element.sourceFields+", ";
            });
            this.stringVett[1]=this.stringVett[1].substring(0,this.stringVett[1].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        counterTextOrd(value){
            
            this.stringVett[3]='';
            this.fieldRefOrd.forEach(element => {
                this.stringVett[3]+=element.fieldsOrder+" "+element.order+", ";
            });
            this.stringVett[3]=this.stringVett[3].substring(0,this.stringVett[3].length-2);
            this.refreshArr(this.stringVett);
            return value.length>-1;
        },
        changeText(textToChange){
            this.generateSection=textToChange;
        }
    },
    created(){
        this.valueString=this.mypartitionIndex+"##\nPARTITION ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>