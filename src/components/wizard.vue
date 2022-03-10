<template>
    <v-sheet>
      <center>
        <v-sheet v-for="modulo in modulesData" :key="modulo.index" elevation="2" width="90%">
            <v-select  v-model="modulo.selected" :items="arrayModel"  label="Modules"></v-select>
            <modules :select="modulo.selected" :maincol="mainColor" :indice="modulo.index" v-on:changeValue="changeValue($event)"></modules><br>
        </v-sheet> 
        <br>
        <v-btn
            tile fab depressed elevation="5" raised
            dark large
            class="tooltip btnstyle"
            width="200px"
            style="color: white;background-color: var(--bg-color);" 
            @click="setPlus()" 
        >
          <v-icon color="white">mdi-plus</v-icon>
          <span style="color: white">&nbsp;ADD MODULE</span>
        </v-btn>
        &nbsp;&nbsp;
        <v-btn
            tile fab depressed elevation="5" raised
            dark large
            class="tooltip btnstyle"
            width="200px"
            style="color: white;background-color: var(--bg-color);" 
            @click="checkMinus()" 
        >
          <v-icon color="white">mdi-minus</v-icon>
          <span style="color: white">&nbsp;DELETE MODULE</span>
        </v-btn>
      
        <v-textarea readonly v-model="valueString"/>
        <br>
        <v-btn
            tile fab depressed elevation="5" raised
            dark large
            class="tooltip btnstyle"
            width="300px"
            style="color: white;background-color: var(--bg-color);" 
            @click="transferMessage('RESET')" 
        >
          <v-icon color="white">mdi-send</v-icon>
          <span style="color: white">&nbsp;RESET & SEND MESSAGE</span>
        </v-btn>&nbsp;&nbsp;
        <v-btn
            tile fab depressed elevation="5" raised
            dark large
            class="tooltip btnstyle"
            width="200px"
            style="color: white;background-color: var(--bg-color);" 
            @click="transferMessage('APPEND')" 
        >
          <v-icon color="white">mdi-send</v-icon>
          <span style="color: white">&nbsp;APPEND MESSAGE</span>
        </v-btn>
      </center>
    </v-sheet>
</template>

<script>
import modules from '../modules/modules.vue'
export default {
    data:()=> ({
        modulesData:[{
            index:1,
            selected:'',
            value:''
        }],
        numberWizard:'',
        mainColor: "black",
        colHex:"",
        arrayModel : ['USE A DATABASE',
                      'GET A COLLECTION',
                      'GET A DICTIONARY',
                      'SAVE LOCALLY OR IN A DATABASE',
                      'MERGE TWO OR MORE COLLECTIONS',
                      'INTERSECT TWO COLLECTIONS',
                      'SUBTRACT TWO COLLECTIONS',
                      'FILTER ON FIELD',
                      'EXPAND COLLECTIONS',
                      'GROUP COLLECTIONS',
                      'JOIN OF COLLECTIONS',
                      'SPATIAL JOIN',
                      'CREATE FUZZY OPERATOR',
                      'CREATE JAVASCRIPT FUNCTION',
                      'TRAJECTORY MATCHING'
                      ],
        valueString : ''
    }),
    components:{
        modules
    },
    created(){
      document.title = 'Wizard - JCOUI Web'
        this.changeColor();
        this.connectionPage=new WebSocket('ws://localhost:3000');
        this.connectionPage.onmessage = (data) =>{
            console.log(data.data)
            if(data.data.split('###')[0]=="CHANGE_COLOR"){ 
              this.changeColor();
            }
        }
       
    },
    mounted(){
      console.log(this.$route.query.id)
      this.numberWizard=this.$route.query.id
    },
    methods:{
        changeColor(){
            document.documentElement.classList.remove(this.mainColor);
            this.mainColor = this.getCookie("main-color");
            if (!this.mainColor) {
              this.mainColor = "black";
            }
            console.log(this.mainColor);
            document.documentElement.classList.add(this.mainColor);
        },
        getCookie(name) {
            // Split cookie string and get all individual name=value pairs in an array
            var cookieArr = document.cookie.split(";");
            // Loop through the array elements
            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                /* Removing whitespace at the beginning of the cookie name
                and compare it with the given string */
                if (name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
                }
            }
            // Return null if not found
            return null;
        },
        changeValue(addText){
            let indiceScript=Number(addText.substring(0,addText.indexOf("##")));
            this.modulesData[indiceScript-1].value=addText.substring(addText.indexOf("##")+2,addText.length);
            this.refresh();
        },
        refresh(){
            this.valueString="";
            this.modulesData.forEach((element)=>{
                this.valueString+=element.value+"\r\n";
            })
        },
        checkMinus(){
            if(this.modulesData.length>1){
                this.modulesData.pop()
            }
            this.refresh();
        },
        setPlus(){
            this.modulesData.push({
                index:this.modulesData.length+1,
                selected:'',
                value:''
            })
        },
        transferMessage(type){
          this.connectionPage.send("WIZARD###"+this.numberWizard+"###"+type+"###"+this.valueString);
          
        }
    }
}
</script>

<style scoped>



:root {
  --border-color: #2b2b2b;
  --bg-color: #2b2b2b;
  --textarea-color: black;
}

:root.red {
  --border-color: #d32f2f;
  --bg-color: #d32f2f;
  --textarea-color: red;
}

:root.pink {
  --border-color: #c2185b;
  --bg-color: #c2185b;
  --textarea-color: pink;
}

:root.purple {
  --border-color: #7b1fa2;
  --bg-color: #7b1fa2;
  --textarea-color: purple;
}

:root.deep-purple {
  --border-color: #512da8;
  --bg-color: #512da8;
  --textarea-color: deep-purple;
}

:root.indigo {
  --border-color: #303f9f;
  --bg-color: #303f9f;
  --textarea-color: indigo;
}

:root.document-color {
  --border-color: #0b77b8;
  --bg-color: #0b77b8;
  --textarea-color: blue;
}

:root.blue {
  --border-color: #1976d2;
  --bg-color: #1976d2;
  --textarea-color: blue;
}

:root.light-blue {
  --border-color: #0288d1;
  --bg-color: #0288d1;
  --textarea-color: light-blue;
}

:root.cyan {
  --border-color: #0097a7;
  --bg-color: #0097a7;
  --textarea-color: cyan;
}

:root.teal {
  --border-color: #00796b;
  --bg-color: #00796b;
  --textarea-color: teal;
}

:root.green {
  --border-color: #388e3c;
  --bg-color: #388e3c;
  --textarea-color: green;
}

:root.light-green {
  --border-color: #689f38;
  --bg-color: #689f38;
  --textarea-color: light-green;
}

:root.lime {
  --border-color: #afb42b;
  --bg-color: #afb42b;
  --textarea-color: lime;
}

:root.yellow {
  --border-color: #fbc02d;
  --bg-color: #fbc02d;
  --textarea-color: yellow;
}

:root.amber {
  --border-color: #ffa000;
  --bg-color: #ffa000;
  --textarea-color: amber;
}

:root.orange {
  --border-color: #f57c00;
  --bg-color: #f57c00;
  --textarea-color: orange;
}

:root.deep-orange {
  --border-color: #e64a19;
  --bg-color: #e64a19;
  --textarea-color: deep-orange;
}

:root.brown {
  --border-color: #5d4037;
  --bg-color: #5d4037;
  --textarea-color: brown;
}

:root.blue-grey {
  --border-color: #455a64;
  --bg-color: #455a64;
  --textarea-color: blue-grey;
}

:root.theme-light {
  --bg-theme-color: #fdfdfd;
  --bg-div-color: #ffffff;
}

:root.theme-dark {
  --bg-theme-color: #222222;
  --bg-div-color: #333333;
}

:root.theme-blue {
  --bg-theme-color: #191970;
  --bg-div-color: #0047ab;
}

:root.theme-grey {
  --bg-theme-color: #202020;
  --bg-div-color: #383838;
}
</style>