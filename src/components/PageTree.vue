
<template>

<div id="treeView">
  <container name="c1" class="divheader">
      <v-row align="center">
        <v-col cols="10" align-self="left">
          <h1 id="title" class="display-2 font-weight-bold mb-3 mt-4">JCOUIweb</h1>
        </v-col>
        <v-col cols="2">
          <v-icon style="float:right; margin-right:20px;" id="settings" class="mt-1" x-large color="white" v-on:click="settings = true">mdi-cog-outline</v-icon>
          <v-overlay opacity="1" :value="settings" color="white">
            <Settings v-on:set-main-color="this.setMainColor" v-on:set-theme-color="this.setThemeColor"/>
            <v-btn color="orange lighten-2" v-on:click="settings = false">
                Chiudi Impostazioni
            </v-btn>
          </v-overlay>
        </v-col>
      </v-row>
    </container>
  <v-overlay  :value="overlay">
    <v-progress-circular
        indeterminate
        size="200"
      ></v-progress-circular>
  </v-overlay>
              <v-row >
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div class="boxInfo" align="left" justify="left">
                    <center> <h1>{{this.title}}</h1></center>
                   <center> <h3>{{new Date(this.datetime).toLocaleString()}}</h3></center>
                    <br>
                   <center> <h5>Total item:{{this.valTotal}} - Initial document: {{this.valInitial}} - Final document: {{this.valFinal}}</h5></center>
                   <v-row cols="12">
                     <v-spacer></v-spacer>
                      <v-col cols="1">
                        <v-text-field
                          v-model="page"
                          label="Page"
                          type="number"
                          min=1
                          :max="(this.valTotal/this.size)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1">
                        <v-text-field
                          v-model="size"
                          label="Size"
                          type="number"
                          min=0
                          :max="this.valTotal"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1">
                        <v-btn
                          elevation="2"
                          @click="changeDimension(); overlay=!overlay"
                        >
                        Aggiorna
                        </v-btn>
                      </v-col>
                      <v-spacer></v-spacer>
                   </v-row>
                   <div v-if="this.error!=''">
                  <center> <span class="label danger">{{this.error}}</span> </center>
                   </div>
                  </div>
                </v-col> 
                
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div class="box" align="left" justify="left">
                       
                  <json-view 
                          rootKey="documents" 
                          :key="numDepth" 
                          :max-depth=numDepth 
                          :data="this.textIRTreeCol"
                          />
                  </div>
                </v-col>
                
                <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <div id="treeViewBtn" align="center">
                    <ul class="list_inside">
                      <li v-if="!(this.textIRTreeCol=='' || this.textIRTreeCol == undefined)">
                        <v-btn class="tooltip btnstyle" elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px;" fab tile @click="download('TreeColl',bottomText.textIRTreeCol);">
                          <v-icon color="grey">mdi-content-save-outline</v-icon>
                          <span class="tooltiptext">Save Tree...</span>
                        </v-btn>
                      </li>
                      <li v-if="!(this.textIRTreeCol=='' || this.textIRTreeCol == undefined)">
                        <v-btn class="tooltip btnstyle" elevation="0" style="border-radius: 4px; border-style: solid; border-width: 1px;" fab tile @click=setDepth()>
                          <v-icon color="grey">mdi-circle-expand</v-icon>
                          <span class="tooltiptext">Expand</span>
                        </v-btn>
                      </li>
                    </ul>
                  </div>
               </v-col>
              </v-row>
            </div>
</template>
<script>
import { JSONView } from "vue-json-component";
import Settings from '../components/Settings.vue';
    export default {
    name : 'IRCompTree',
    components: { "json-view": JSONView , Settings},
    data: function (){
        return {
            expand: false,
            numDepth: 1,
            textIRTreeCol:'',
            datetime:'',
            title:'',
            valInitial:0,
            valFinal:0,
            valTotal:0,
            connectionPage:null,
            page:1,
            size:25,
            mounted:false,
            overlay: true,
            settings: false,
            themeColor: "",
            mainColor: "",
            fontColor: "",
            fontSize: 0,
            error:''
        }
    },
    watch:{
      textIRTreeCol:function(newVal, oldVal){
      if(newVal!=oldVal){
        if((newVal=='' || newVal == undefined ) && this.error==''){
          this.textTreeEmpty=true;
          this.overlay=true;
        }else{
          this.textTreeEmpty=false;
          this.overlay=false;
        }
      }
      }
    },
    computed: {
        isDisable() {
            return this.irTreeV.length> 0;
        },
    },
    created(){
      //ADD Commenti
      this.themeColor = this.getCookie("theme-color");
      if(!this.themeColor){
        this.themeColor = "theme-light";
        this.setCookie("theme-color","theme-light",30);
      }
      document.documentElement.classList.add("theme-light");

      this.mainColor = this.getCookie("main-color");
      if(!this.mainColor){
        this.mainColor = "black";
        this.setCookie("main-color","black",30);
      }
      document.documentElement.classList.add(this.mainColor);

      this.fontColor = this.getCookie("font-color");
      if(!this.fontColor){
        this.fontColor = "font-black";
        this.setCookie("font-color", "font-black", 30);
      }
      document.documentElement.classList.add(this.fontColor);

      this.fontSize = this.getCookie("font-size");
      if(!this.fontSize){
        this.fontSize = 14;
        this.setCookie("font-size", "14", 30);
      }
      document.documentElement.classList.add(this.fontSize);
    },
    mounted(){
      this.changeDimension();
      
    },
    methods:{
            setMainColor(color){
        document.documentElement.classList.replace(this.mainColor, color);
        this.mainColor = color;
        this.setCookie('main-color', color, 30);
      },
      setThemeColor(theme) {
        document.documentElement.classList.replace(this.themeColor, theme);
        this.themeColor = theme;
        this.setCookie('theme-color', theme, 30);
      },


      setCookie(name, value, daysToLive) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
        if(typeof daysToLive === "number") {
            /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
            cookie += ";secure; max-age=" + (daysToLive*24*60*60);
            document.cookie = cookie;
          }
      },
      getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(";");
      // Loop through the array elements
      for(var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");
          /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
          if(name == cookiePair[0].trim()) {
              // Decode the cookie value and return
              return decodeURIComponent(cookiePair[1]);
          }
        }
      // Return null if not found
        return null;
      },
        changeDimension(){
          
          console.log(this.page+" "+this.size);
          if(localStorage.getItem("textTree_"+this.$route.query.id)){
            this.connectionPage=new WebSocket('ws://localhost:3000');
            if(this.connectionPage.readyState!=1){
              this.overlay=false;
            }
            this.connectionPage.onclose = () => {
              this.error="server save/open closed"
            }
            this.connectionPage.onopen = () => {
              this.connectionPage.send('OPEN###'+"textTree_"+this.$route.query.id+"###"+(this.page-1)+","+this.size);
            }
            let jsonData='';
            this.connectionPage.onmessage = (message) => {
              if(message=="SERVER CLOSED"){
                this.error="server save/open closed"
              }else{
                jsonData=JSON.parse(message.data);
                this.datetime=jsonData.datetime;
                this.title=jsonData.name;
                this.valTotal=jsonData.tot;
                this.valInitial=jsonData.initial;
                this.valFinal=jsonData.final;
                if(!this.mounted){
                  this.mounted=true;
                  if(this.valTotal<25)this.size=this.valTotal
                  else this.size=25;
                }
                console.log(jsonData.tree);
                this.textIRTreeCol=jsonData.tree;
            }
            }
          }
        },
         setDepth() {
            this.numDepth=this.numDepth<2 ? 10 : 1;
          },
        download(filename) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:application/json,' + encodeURIComponent('{ \n "documents" : \n ' + JSON.stringify( this.irTreeV , null, '\t') + '\n}'));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        }, 
    }
}
</script>

<style scoped>

.label {
  color: white;
  padding: 8px;
}

.success {background-color: #04AA6D;} /* Green */
.info {background-color: #2196F3;} /* Blue */
.warning {background-color: #ff9800;} /* Orange */
.danger {background-color: #f44336;} /* Red */
.other {background-color: #e7e7e7; color: black;} /* Gray */
  .list {
  /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 100%;
    height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
  }

  /* (B) LIST ITEMS */
  .list li{
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%; /* Auto spacing */
  }

  .list_inside {
  /* (A1) FLEXIBLE BOX */
    display: flex;
    width: 20%;
    height: 88px;
  /* (A2) REMOVE DEFAULT INDENTATIONS */
    padding: 0;
    margin: 0;
  }

  /* (B) LIST ITEMS */
  .list_inside li{
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%; /* Auto spacing */
  }

  div.box{
    border-style:solid;
    border-color:cadetblue;
  }

  div.boxInfo{
    border-style:double;
    border-color:cyan;
  }

  #title{
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    color: white;
  }
  #settings{
    text-align: right;
  }

  #treeView .divheader{
    flex: 0 1 auto;
  }

  .divheader{
    background-color: var(--bg-color);
  }

  .tastyle{
    color: var(--textarea-color);
  }

  .colcontainer{
    background-color: var(--bg-theme-color);
  }

  .containerstyle{
    background-color: var(--bg-div-color);
  }

  :root{
    --border-color: #000000;
    --bg-color: #2b2b2b;
    --textarea-color: black;
  }

  :root.red{
    --border-color: #D32F2F;
    --bg-color: #D32F2F;
    --textarea-color: red;
  }

  :root.pink{
    --border-color: #C2185B;
    --bg-color: #C2185B;
    --textarea-color: pink;
  }

  :root.purple{
    --border-color: #7B1FA2;
    --bg-color: #7B1FA2;
    --textarea-color: purple;
  }

  :root.deep-purple{
    --border-color: #512DA8;
    --bg-color: #512DA8;
    --textarea-color: deep-purple;
  }

  :root.indigo{
    --border-color: #303F9F;
    --bg-color: #303F9F;
    --textarea-color: indigo;
  }

  :root.blue{
    --border-color: #1976D2;
    --bg-color: #1976D2;
    --textarea-color: blue;
  }

  :root.light-blue{
    --border-color: #0288D1;
    --bg-color: #0288D1;
    --textarea-color: light-blue;
  }

  :root.cyan{
    --border-color: #0097A7;
    --bg-color: #0097A7;
    --textarea-color: cyan;
  }

  :root.teal{
    --border-color: #00796B;
    --bg-color: #00796B;
    --textarea-color: teal;
  }

  :root.green{
    --border-color: #388E3C;
    --bg-color: #388E3C;
    --textarea-color: green;
  }

  :root.light-green{
    --border-color: #689F38;
    --bg-color: #689F38;
    --textarea-color: light-green;
  }

  :root.lime{
    --border-color: #AFB42B;
    --bg-color: #AFB42B;
    --textarea-color: lime;
  }

    :root.yellow{
    --border-color: #FBC02D;
    --bg-color: #FBC02D;
    --textarea-color: yellow;
  }

  :root.amber{
    --border-color: #FFA000;
    --bg-color: #FFA000;
    --textarea-color: amber;
  }

  :root.orange{
    --border-color: #F57C00;
    --bg-color: #F57C00;
    --textarea-color: orange;
  }

  :root.deep-orange{
    --border-color: #E64A19;
    --bg-color: #E64A19;
    --textarea-color: deep-orange;
  }

  :root.brown{
    --border-color: #5D4037;
    --bg-color: #5D4037;
    --textarea-color: brown;
  }

  :root.blue-grey{
    --border-color: #455A64;
    --bg-color: #455A64;
    --textarea-color: blue-grey;
  }

  :root.theme-light{
    --bg-theme-color: #fdfdfd;
    --bg-div-color: #ffffff;
  }

  :root.theme-dark{
    --bg-theme-color: #222222;
    --bg-div-color: #333333;
  }

  :root.theme-blue{
    --bg-theme-color: #191970;
    --bg-div-color: #0047AB;
  }

  :root.theme-grey{
    --bg-theme-color: #202020;
    --bg-div-color: #383838;
  }

    #body{
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  #body .divheader{
    flex: 0 1 auto;
  }

  #body .divcontent{
    flex: 1 0 auto;
  }
  #third{
    position: relative;
  }
</style>

<style>
    .tooltip .tooltiptext {
    visibility: hidden;
    background-color: white;
    color: #000;
    text-align: center;
    border-radius: 4px;
    border-color: navy;
    border-style: solid;
    border-width: 1px;
    position: absolute;
    z-index: 1;
    width: 200px;
    padding: 8 0;
    bottom: 50px;
    left: 50%;
    margin-left: -100px;
    align-content: center;
    font-size: 16px;
    }

    .tooltip:hover .tooltiptext {
    visibility: visible;
    }

  .btnstyle{
    border-color: var(--border-color);
  }

  .divstyle{
    border-color: var(--border-color);
  }

  .divheader{
    background-color: var(--bg-color);
  }

  .tastyle{
    color: var(--textarea-color);
  }

  .colcontainer{
    background-color: var(--bg-theme-color);
  }

  .containerstyle{
    background-color: var(--bg-div-color);
  }

</style>