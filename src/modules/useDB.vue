<template>
  <v-sheet>
            <v-row v-for="collect in collections" :key="collect.index">
            <v-col><v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`collection ${collect.index}`"/></v-col>
            <v-col><v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`alias ${collect.index}`" v-model="collect.alias"/></v-col>
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
            <v-checkbox color="var(--bg-color)" v-model="defaultServer" label="usare il server di default?"></v-checkbox>
            <v-row v-if="!defaultServer">
                <v-col><v-text-field :rules="[rules.required]" v-model="server" label="server"/></v-col>
                <v-col><v-text-field v-model="connString" label="connection string"/></v-col>
            </v-row>
  </v-sheet>
</template>

<script>
export default {
    props:{
        maincol: String
    },
   data () {
      return {
        valueString:'',
        valueArr:[''],
        defaultServer: true,
        server:'',
        connString:'',
        collections:[{
            index:1,
            collection: '',
            alias: ''
        }],
        rules: {
          required: value => !!value || 'Required.',
          counter: value => this.counterText(value),
        }
      }
    },
    
     watch:{
        defaultServer:function(newVal,oldVal){
            if(newVal!=oldVal){
                if(newVal){
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("ON")+2);
                    this.valueString+=" DEFAULT SERVER;"
                }else{
                    this.valueString=this.valueString.substring(0,this.valueString.indexOf("ON")+2);
                    this.valueString+=" SERVER "+this.server;
                    if(this.connString!="")
                        this.valueString+=" '"+this.connString+"'";
                    this.valueString+=";";
                }
            }
            this.$emit('changeValue', this.valueString);
        },
        server:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString=this.valueString.substring(0,this.valueString.indexOf("ON")+2);
                this.valueString+=" SERVER "+this.server;
                if(this.connString!="")
                    this.valueString+=" '"+this.connString+"'";
                this.valueString+=";";
            }
            this.$emit('changeValue', this.valueString);
        },
        connString:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.valueString=this.valueString.substring(0,this.valueString.indexOf("ON")+2);
                this.valueString+=" SERVER "+this.server
                if(this.connString!="")
                    this.valueString+=" '"+this.connString+"'";
                this.valueString+=";";
            }
            this.$emit('changeValue', this.valueString);
            
        }
    },
    methods:{
        checkMinus(){
            if(this.collections.length>1){
                this.collections.pop()
                this.valueArr.pop()
            }
            
            this.counterText(this.collections.length);
        },
        setPlus(){
            this.collections.push({
                index:this.collections.length+1,
                collection:'',
                alias:''
            })
            this.valueArr.push('')
        },
        changeText(ind){
            let str= this.valueArr[ind];
            str="";
            if(this.collections[ind].collection!="")
                str=this.collections[ind].collection;
                if(this.collections[ind].alias)
                    str+=" AS "+this.collections[ind].alias;
            this.valueArr[ind]=str;
            this.valueString=" ";
            this.valueArr.forEach(element => {
                this.valueString+=element;
                this.valueString+=", "
            });
            this.valueString=this.valueString.substring(0,this.valueString.length-2);
            this.valueString+=" ON";
            if(this.defaultServer){
                this.valueString+=" DEFAULT SERVER"
            }else{
                this.valueString+=" SERVER "+this.server
                if(this.connString!="")
                    this.valueString+=" '"+this.connString+"'";
            }
            this.valueString+=";"
            this.$emit('changeValue', this.valueString);
        },
        counterText(value){
            for(let i=0;i<this.valueArr.length;i++){ 
                this.changeText(i);
            }
            return value.length>-1;
        }
        
    }
}
</script>

<style>

</style>