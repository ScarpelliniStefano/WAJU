<template>
            
            <v-container fluid >
                <v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCond"></v-textarea>
                <v-container fluid>
                <v-row v-for="collect in fieldRefSource" :key="collect.index">
                    <v-text-field :rules="[rules.required,rules.counterSource]" label="fields of source fields" v-model="collect.sourceFields"></v-text-field>
                </v-row>
                </v-container>
                <br>
                <v-btn
                    fab
                    dark 
                    small
                    @click="setPlusFieldRef()" 
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
                    @click="checkMinusFieldRef()" 
                    color="var(--bg-color)"
                >
                    <v-icon dark>
                    mdi-minus
                    </v-icon>
                </v-btn>
                <v-text-field :rules="[rules.required]" label="fields of destination array" v-model="destFields"></v-text-field>
                <v-checkbox color="var(--bg-color)" v-model="dropGroup" label="drop grouping fields?"></v-checkbox>
                <v-checkbox color="var(--bg-color)" v-model="orderSelection" label="order fields?"></v-checkbox>
                <v-container v-if="orderSelection">
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
                        fab
                        dark 
                        small
                        @click="setPlusFieldOrd()" 
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
                        @click="checkMinusFieldOrd()" 
                        color="var(--bg-color)"
                    >
                        <v-icon dark>
                        mdi-minus
                        </v-icon>
                    </v-btn>
                </v-container>
                
                <v-checkbox color="var(--bg-color)" v-model="generateAct" label="generate actions?"></v-checkbox>
                <v-textarea v-if="generateAct" label="generate actions" rows="1" v-model="generateAction"></v-textarea>
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
        generateAct:false,
        dropGroup:false,
        orderSelection:false,
        generateAction:'',
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
        generateAct:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(!newVal)
                    this.stringVett[4]="";
                else
                    this.stringVett[4]=this.generateAction;
                this.refreshArr(this.stringVett);
            }
        },
        generateAction:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.generateAction && newVal!="")
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
                this.valueString+="\nGENERATE "+vettString[4] + " ";
            this.$emit('changeValue', this.valueString);
        },
        setPlusFieldRef(){
            this.fieldRefSource.push({
                index:this.fieldRefSource.length+1,
                sourceFields:''
            })
        },
        setPlusFieldOrd(){
            this.fieldRefOrd.push({
                index:this.fieldRefOrd.length+1,
                fieldsOrder:'',
                order:''
            })
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