<template>
            
            <v-container fluid >
                <v-row>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" label="field of matching" v-model="fieldMatch"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" label="field of wrt" v-model="fieldWrt"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" label="id of threshold" v-model="idThreshold"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field :rules="[rules.required,rules.counterFields]" label="numeric of threshold" v-model="numThreshold"></v-text-field>
                    </v-col>
                </v-row>
                <v-checkbox color="var(--bg-color)" v-model="whereMatching" label="do you want to set where conditions of matching?"></v-checkbox>
                <v-textarea :rules="[rules.required,rules.counterFields]" v-if="whereMatching" label="where conditions" rows="1" v-model="whereMatchingText"></v-textarea>
                <v-text-field :rules="[rules.required,rules.counterFields]" label="field of destination" v-model="fieldInto"></v-text-field>
                <v-checkbox color="var(--bg-color)" v-model="addingToInput" label="do you want to add field to input?"></v-checkbox>
                <v-text-field :rules="[rules.required,rules.counterFields]" v-if="addingToInput" label="field to add to input" v-model="addingToInputText"></v-text-field>
                <v-checkbox color="var(--bg-color)" v-model="minSimilarity" label="do you want to set min similarity?"></v-checkbox>
                <v-text-field :rules="[rules.required,rules.counterFields]" v-if="minSimilarity" label="min similarity numeric" v-model="minSimilarityText"></v-text-field>
            </v-container>
</template>

<script>

export default {
    props:{
        mypartmatchIndex: String
    },
    
   data () {
      return {
        valueStringMatching:'',
        fieldMatch:'',
        fieldWrt:'',
        idThreshold:'',
        numThreshold:'',
        whereMatching:false,
        whereMatchingText:'',
        fieldInto:'',
        addingToInput:false,
        addingToInputText:'',
        minSimilarity:false,
        minSimilarityText:'',
        rules: {
          required: value => !!value || 'Required.',
          counterFields: value => value!="" ? this.refreshStringMatch() : false,
        }
      }
    },
    
     watch:{
        
        whereMatching:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },
        addingToInput:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },
        minSimilarity:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.refreshStringMatch();
            }
        },

    },
    methods:{
        refreshStringMatch(){
            this.valueStringMatching=this.mypartmatchIndex+"##\nMATCHING ";
            if(this.fieldMatch!="")
                this.valueStringMatching+=this.fieldMatch + " ";
            if(this.fieldWrt!="")
                this.valueStringMatching+="WRT "+ this.fieldWrt + " \n";
            if(this.idThreshold!="")
                this.valueStringMatching+="THRESHOLD ("+ this.idThreshold + ") ";
            if(this.numThreshold!="")
                this.valueStringMatching+=""+ this.numThreshold + " \n";
            if(this.whereMatchingText!="" && this.whereMatching)
                this.valueStringMatching+="WHERE "+ this.whereMatchingText+ " \n";
            if(this.fieldInto!="")
                this.valueStringMatching+="INTO "+ this.fieldInto+ " \n";
            if(this.addingToInputText!="" && this.addingToInput)
                this.valueStringMatching+="ADDING "+ this.addingToInputText+ " TO INPUT\n";
            if(this.minSimilarityText!="" && this.minSimilarity)
                this.valueStringMatching+="MIN SIMILARITY "+ this.minSimilarityText+ " \n";
            this.valueStringMatching=this.valueStringMatching.substring(0,this.valueStringMatching.length-1)
            this.$emit('changeValueMatch', this.valueStringMatching);
            return true;
        }
    },
    created(){
        this.valString=this.mypartmatchIndex+"##\nMATCHING ";
        this.$emit('changeValueMatch', this.valString);
    }
}
</script>

<style>

</style>