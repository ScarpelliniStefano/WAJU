<template>
    <v-sheet>
      <center>
        <v-sheet v-for="modulo in modulesData" :key="modulo.index" elevation="2" width="90%">
            <v-select  v-model="modulo.selected" :items="arrayModel"  label="Modules"></v-select>
            <modules :select="modulo.selected" :maincol="mainColor" :indice="modulo.index" @changeValue="changeValue($event)"></modules><br>
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
            :disabled="disabledBtn"
            class="tooltip btnstyle"
            width="300px"
            id="btnReset"
            style="color: white;background-color: var(--bg-color);" 
            @click="transferMessage('RESET')" 
        >
          <v-icon color="white">mdi-send</v-icon>
          <span style="color: white">&nbsp;RESET & SEND MESSAGE</span>
        </v-btn>&nbsp;&nbsp;
        <v-btn
            tile fab depressed elevation="5" raised
            dark large
            :disabled="disabledBtn"
            class="tooltip btnstyle"
            id="btnAppend"
            width="100mm"
            style="color: white;background-color: var(--bg-color);" 
            @click="transferMessage('APPEND')" 
        >
          <v-icon color="white">mdi-send</v-icon>
          <span style="color: white">&nbsp;APPEND MESSAGE</span>
        </v-btn>
      </center>

        <v-snackbar
        v-model="wizardAlert" elevation="5" light timeout="100000"
        >
            <p class="v-snack__content">{{lblPopupAppend}}</p>

        <template v-slot:action="{ attrs }">
          <v-btn
            color="var(--border-color)"
            text
            v-bind="attrs"
            @click="wizardAlert = false"
          >
            Ok
          </v-btn>
        </template>
      </v-snackbar>
    </v-sheet>
    
</template>
<script>
import modules from '../modules/WizardModules.vue'
import lang from '../env/lang.en'
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
        arrayModel : [lang.WIZARD.SPECIFICATION.SEL_GET_COLL,
                      lang.WIZARD.SPECIFICATION.SEL_GET_DICT,
                      lang.WIZARD.SPECIFICATION.SEL_SAVE_AS,
                      lang.WIZARD.SPECIFICATION.SEL_MERGE_COLL,
                      lang.WIZARD.SPECIFICATION.SEL_INTERSECT_COLL,
                      lang.WIZARD.SPECIFICATION.SEL_SUBTRACT_COLL,
                      lang.WIZARD.SPECIFICATION.SEL_USE_DB,
                      lang.WIZARD.SPECIFICATION.SEL_FILTER,
                      lang.WIZARD.SPECIFICATION.SEL_EXPAND,
                      lang.WIZARD.SPECIFICATION.SEL_GROUP,
                      lang.WIZARD.SPECIFICATION.SEL_JOIN,
                      lang.WIZARD.SPECIFICATION.SEL_FUZZY_OP,
                      lang.WIZARD.SPECIFICATION.SEL_JS_FUNCTION,
                      lang.WIZARD.SPECIFICATION.SEL_TRAJECTORY_MATCHING
                    ],
        valueString : '',
        disabledBtn:true,

        //longClick
        isLongClick:false,
        timerId:'',
        lblPopupAppend:'Transfer the text in the main view, append that to the previuos content in the command view',
        lblPopupReset:'Transfer the text in the main view, cleaning all previuos content in the command view',
        wizardAlert: false,
    }),
    components:{
        modules
    },
    watch:{
      valueString: function(newVal){
        if(newVal!=''){
          this.disabledBtn=false;
        }
      }
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
      this.addMouseOverEvent('btnAppend',this.lblPopupAppend);
      this.addMouseOverEvent('btnReset',this.lblPopupReset);
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
          if(!this.isLongClick)
            this.connectionPage.send("WIZARD###"+this.numberWizard+"###"+type+"###"+this.valueString);
            clearTimeout(this.timerId)
        },
        addMouseOverEvent(idElement,message){
          document.getElementById(idElement).onmousedown = (args) =>{
            this.isLongClick=false;
            this.timerId=setTimeout(() => fn.apply(null, [args]), 500)
          }
        

          var fn = (args) => {
            console.log('onmousedown args', args)
            this.wizardAlert=false;
            this.lblPopup=message;
            this.wizardAlert=true;
            this.isLongClick=true;
          }
        }
        
        
    }
}
</script>

<style scoped>
@media screen and (max-resolution: 70dpi) {
  ::v-deep .v-snack__content {
    font-size: 10px;
  }
}

@media screen and (min-resolution: 71dpi) and (max-resolution: 80dpi) {
  ::v-deep .v-snack__content {
    font-size: 11px;
  }
}

@media screen and (min-resolution: 81dpi) and (max-resolution: 90dpi) {
  ::v-deep .v-snack__content {
    font-size: 12px;
  }
}

@media screen and (min-resolution: 91dpi) and (max-resolution: 95dpi) {
  ::v-deep .v-snack__content {
    font-size: 13px;
  }
}

@media (min-resolution: 96dpi) and (max-resolution: 100dpi) {
  ::v-deep .v-snack__content {
    font-size: 14px;
  }
}

@media screen and (min-resolution: 111dpi) and (max-resolution: 120dpi) {
  ::v-deep .v-snack__content {
    font-size: 15px;
  }
}

@media screen and (min-resolution: 121dpi) and (max-resolution: 130dpi) {
  ::v-deep .v-snack__content {
    font-size: 16px;
  }
}

@media screen and (min-resolution: 131dpi) and (max-resolution: 140dpi) {
  ::v-deep .v-snack__content {
    font-size: 17px;
  }
}

@media screen and (min-resolution: 141dpi) and (max-resolution: 150dpi) {
  ::v-deep .v-snack__content {
    font-size: 18px;
  }
}

@media screen and (min-resolution: 151dpi) {
  ::v-deep .v-snack__content {
    font-size: 20px;
  }
}


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