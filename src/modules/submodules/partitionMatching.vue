<template>
            
            <v-container fluid >
                <!--<v-textarea :rules="[rules.required]" label="conditions" rows="2" auto-grow v-model="orCond"></v-textarea>
                <v-row v-for="collect in collectionsPartMatch" :key="collect.index">
                    <partition-matching :mypartmatchIndex="collect.index" v-on:changeValue="changeTextMatch($event)"/>
                </v-row>
                <br>
                <v-btn
                        fab
                        dark 
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
                        @click="checkMinusPartMatch()" 
                        color="var(--bg-color)"
                    >
                    <v-icon dark>
                        mdi-minus
                    </v-icon>
                    </v-btn>-->
            </v-container>
</template>

<script>

export default {
    props:{
        mypartmatchIndex: String
    },
    
   data () {
      return {
        valueString:'',
        orCond:'',
        stringVett:['',''],
        rules: {
          required: value => !!value || 'Required.'
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

    },
    methods:{
        refreshArr(vettString){
            this.valueString=this.mypartmatchIndex+"##\nMATCHING ";
            if(vettString[0]!="")
                this.valueString+="\n "+vettString[0] + " ";
            if(vettString[1]!="")
                this.valueString+="\n "+vettString[1] + " ";
            this.$emit('changeValueMatch', this.valueString);
        }
    },
    created(){
        
        this.valueString=this.mypartmatchIndex+"##\nMATCHING ";
        this.$emit('changeValueMatch', this.valueString);
    }
}
</script>

<style>

</style>