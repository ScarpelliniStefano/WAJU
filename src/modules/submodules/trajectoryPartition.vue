<template>
            
            <v-container fluid style="border-style: outset;">
                <v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCondPart"></v-textarea>
                <br>
                
                <v-row v-for="collect in collectionsPartMatch" :key="collect.index">
                    <v-container style="border-style: inset;">
                    <partition-matching :mypartmatchIndex="collect.index" v-on:changeValueMatch="changeTextMatch($event)"/>
                    </v-container>
                    <br>
                </v-row>
                <br>
                
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="250px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="setPlusPartMatch()" 
                >
                <v-icon color="white">mdi-plus</v-icon>
                <span style="color: white">&nbsp;ADD MATCHING PARTITION</span>
                </v-btn>
                &nbsp;&nbsp;
                <v-btn
                    tile fab depressed elevation="5" raised
                    dark small
                    class="tooltip btnstyle"
                    width="250px"
                    style="color: white;background-color: var(--bg-color);" 
                    @click="checkMinusPartMatch()" 
                >
                <v-icon color="white">mdi-minus</v-icon>
                <span style="color: white">&nbsp;DELETE MATCHING PARTITION</span>
                </v-btn>
                
                
            </v-container>
</template>

<script>
import partitionMatching from "./partitionMatching.vue";
export default {
    props:{
        mytrajectoryPartIndex: String
    },
    components:{
        partitionMatching
    },
    
    data () {
      return {
        valueStringPart:'',
        orCondPart:'',
        stringVettPart:['',''],
        valueArrPartMatch:[''],
        collectionsPartMatch:[
            {
                index:'1pm',
                stringaPM:"1pm##"
            }
        ],
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    },
    
     watch:{
        
        orCondPart:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.stringVettPart[0]=newVal;
            }
            
            this.refreshArrPart(this.stringVettPart);
        },

    },
    methods:{
        refreshArrPart(vettStringPart){
            this.valueStringPart=this.mytrajectoryPartIndex+"##\nPARTITION ";
            if(vettStringPart[0]!="")
                this.valueStringPart+="\n"+vettStringPart[0] + " ";
            if(vettStringPart[1]!="")
                this.valueStringPart+=vettStringPart[1] + " ";
            
            this.$emit('changeValueTrajectory', this.valueStringPart);
        },
        checkMinusPartMatch(){
            if(this.collectionsPartMatch.length>1){
                this.collectionsPartMatch.pop()
                this.valueArrPartMatch.pop()
            }
            this.counterTextMatch(this.valueArrPartMatch.length);
        },
        setPlusPartMatch(){
            if(this.collectionsPartMatch[this.collectionsPartMatch.length-1].stringaPM!=''){
                this.collectionsPartMatch.push({
                    index:(this.collectionsPartMatch.length+1)+"pm",
                    stringaPM:(this.collectionsPartMatch.length+1)+"pm##"
                })
                this.valueArrPartMatch.push('');
            }
        },
        changeTextMatch(str){
            let id=Number(str.split("##")[0].substring(0,str.split("##")[0].length-2))-1;
            this.collectionsPartMatch[id].stringaPM=str; 
            this.valueArrPartMatch[id]=str.split("##")[1];
            this.counterTextMatch(this.valueArrPartMatch.length);
        },
        counterTextMatch(value){
            this.stringVettPart[1]=''
            this.valueArrPartMatch.forEach(element=>{
                this.stringVettPart[1]+=element;
            })
            this.refreshArrPart(this.stringVettPart);
            return value.length>-1;
        },
    },
    created(){
        this.valueStringPart=this.mytrajectoryPartIndex+"##\nPARTITION ";
        this.$emit('changeValueTrajectory', this.valueStringPart);
    }
}
</script>

<style>

</style>