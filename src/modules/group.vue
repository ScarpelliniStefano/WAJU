<template>
  <v-sheet>
        
            <v-row v-for="collect in collectionsPartitions" :key="collect.index">
                <partition-clause :mypartitionIndex="collect.index" v-on:changeValue="changeText($event)"/>
            </v-row>
            <br>
            <v-btn
                    fab
                    dark 
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
                    @click="checkMinus()" 
                    color="var(--bg-color)"
                >
                <v-icon dark>
                    mdi-minus
                </v-icon>
                </v-btn>
        <v-container
                class="px-0"
                fluid
            >
                <v-radio-group v-model="radioGroup" row>
                <v-radio
                    :key=1
                    label="keep others"
                    value="KEEP OTHERS"
                ></v-radio>
                <v-radio
                    :key=2
                    label="drop others"
                    value="DROP OTHERS"
                ></v-radio>
                 <v-radio
                    :key=3
                    label="none"
                    value="NONE"
                ></v-radio>
                </v-radio-group>
        </v-container>
  </v-sheet>
</template>

<script>
import partitionClause from "./submodules/partitionClause.vue";
export default {
    
    props:{
        maincol: String
    },
    components:{
        partitionClause
    },
   data () {
      return {
        valueString:';',
        radioGroup:'NONE',
        valueArr:[''],
        collectionsPartitions:[
            {
                index:1,
                stringa:"1##"
            }
        ]
      }
    },
    
    
     watch:{
        radioGroup:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal=="KEEP OTHERS"){
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    this.valueString+="\nKEEP OTHERS ";
                }else if(newVal=="DROP OTHERS"){
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    
                    this.valueString+="\nDROP OTHERS ";
                }else{
                    if(oldVal=="KEEP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nKEEP OTHERS"));
                    else if(oldVal=="DROP OTHERS")
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf("\nDROP OTHERS"));
                    else
                        this.valueString=this.valueString.substring(0,this.valueString.indexOf(" ;"));
                    this.valueString+="";
                }
            }
            this.$emit('changeValue', this.valueString+" ;");
        }
    },
    methods:{
        checkMinus(){
            if(this.collectionsPartitions.length>1){
                this.collectionsPartitions.pop()
                this.valueArr.pop()
            }
            this.counterText(this.valueArr.length);
        },
        setPlus(){
            this.collectionsPartitions.push({
                index:this.collectionsPartitions.length+1,
                stringa:(this.collectionsPartitions.length+1)+"##"
            })
            this.valueArr.push('');
        },
        changeText(str){
            let id=Number(str.split("##")[0])-1;
            this.collectionsPartitions[id].stringa=str;
            this.valueArr[id]=str.split("##")[1];
            if(this.valueString.includes("\nKEEP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nKEEP OTHERS ";
            }else if(this.valueString.includes("\nDROP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="\nDROP OTHERS ";
            }else{
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
            }
            this.$emit('changeValue', this.valueString+" ;");
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(this.collectionsPartitions[i].stringa);
            }
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