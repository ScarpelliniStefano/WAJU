<template>
            
            <v-container fluid >
                <v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCondPart"></v-textarea>
                <v-row v-for="collect in collectionsPartMatch" :key="collect.index">
                    <partition-matching :mypartmatchIndex="collect.index" v-on:changeValueMatch="changeTextMatch($event)"/>
                </v-row>
                <br>
                <v-btn
                        fab
                        dark 
                        small
                        @click="setPlusPartMatch()" 
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
                        @click="checkMinusPartMatch()" 
                        color="var(--bg-color)"
                    >
                    <v-icon dark>
                        mdi-minus
                    </v-icon>
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
            this.collectionsPartMatch.push({
                index:(this.collectionsPartMatch.length+1)+"pm",
                stringaPM:(this.collectionsPartMatch.length+1)+"pm##"
            })
            this.valueArrPartMatch.push('');
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