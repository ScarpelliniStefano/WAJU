<template>
  <v-sheet>
            <v-row v-for="collect in collectionsWhere" :key="collect.index">
                <where-case :mywhereIndex="collect.index" v-on:changeValue="changeText($event)"/>
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
                </v-radio-group>
            </v-container>

            
  </v-sheet>
</template>

<script>
import whereCase from "./whereCase.vue";
export default {
    props:{
        maincol: String
    },
    components:{
        whereCase
    },
   data () {
      return {
        valueString:'',
        radioGroup:'KEEP OTHERS',
        valueArr:[''],
        collectionsWhere:[
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
                    console.log(this.valueString)
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("DROP OTHERS"));
                    this.valueString+="KEEP OTHERS ";
                }else{
                    console.log(this.valueString)
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("KEEP OTHERS"));
                     this.valueString+="DROP OTHERS ";
                }
            }
            this.$emit('changeValue', this.valueString);
        }
    },
    methods:{
        checkMinus(){
            if(this.collectionsWhere.length>1){
                this.collectionsWhere.pop()
                this.valueArr.pop()
            }
            this.counterText(this.valueArr.length);
        },
        setPlus(){
            this.collectionsWhere.push({
                index:this.collectionsWhere.length+1,
                stringa:(this.collectionsWhere.length+1)+"##"
            })
            this.valueArr.push('');
        },
        changeText(str){
            let id=Number(str.split("##")[0])-1;
            this.collectionsWhere[id].stringa=str;
            this.valueArr[id]=str.split("##")[1];
            if(this.valueString.includes("KEEP OTHERS")){
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="KEEP OTHERS ";
            }else{
                this.valueString=" ";
                this.valueArr.forEach(element => {
                    this.valueString+=element;
                    this.valueString+=" "
                });
                this.valueString+="DROP OTHERS ";
            }
            this.$emit('changeValue', this.valueString);
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(this.collectionsWhere[i].stringa);
            }
            return value.length>-1;
        }
        
    },
    created(){
        this.valueString="KEEP OTHERS ";
        this.$emit('changeValue', this.valueString);
    }
}
</script>

<style>

</style>