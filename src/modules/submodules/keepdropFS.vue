<template>
  <!--<v-sheet>
            {{this.mywhereIndex}}-->
            <div>
                <v-container
                    class="px-0"
                    fluid
                >
                    <v-radio-group v-model="radioFS">
                    <v-radio
                        key="1"
                        label="DEFUZZIFY"
                        value="DEFUZZIFY"
                    ></v-radio>
                    <v-radio
                        key="2"
                        label="DROPPING ALL FUZZY SETS"
                        value="DROPPING ALL FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="3"
                        label="KEEPING ALL FUZZY SETS"
                        value="KEEPING ALL FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="4"
                        label="DROPPING FUZZY SETS"
                        value="DROPPING FUZZY SETS"
                    ></v-radio>
                    <v-radio
                        key="5"
                        label="KEEPING FUZZY SETS"
                        value="KEEPING FUZZY SETS"
                    ></v-radio>
                    </v-radio-group>
                    <v-text-field v-if="radioFS=='DROPPING FUZZY SETS' || radioFS=='KEEPING FUZZY SETS'" label="list of ids to keep/drop" v-model="textRadio"></v-text-field>
                </v-container>
            </div>
            
            
  <!--</v-sheet>-->
</template>

<script>
export default {
   data () {
      return {
        radioFS:'',
        textRadio:''
      }
    },
    
    watch:{
        radioFS:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal!="KEEPING FUZZY SETS" || newVal!="DROPPING FUZZY SETS"){
                    this.$emit('changeValueKDFS', newVal);
                    this.textRadio="";
                }
            }
        },
        textRadio:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(this.radioFS=="KEEPING FUZZY SETS" || this.radioFS=="DROPPING FUZZY SETS"){
                    this.$emit('changeValueKDFS', this.radioFS+ " " + newVal);
                }
            }
        }
    }
        
}
</script>

<style>

</style>