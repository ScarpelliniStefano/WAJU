<template>
    <div id="sendDiv">
        <v-container fluid>
            <v-row align="center"
            class="grow">
                <v-col
                    id="col-ta-send"
                    :key="1.1"
                    cols="12"
                    :sm="10"
                    :md="12"
                    :lg="12"
                    :xl="12">
                    <v-textarea
                        style="font-size: 16px;"
                        no-resize
                        rows="13"
                        justify="center"
                        height="100%"
                        name="input-7-1"
                        label="Comando"
                        v-model.lazy="textSend"
                        hint="Inserisci il comando"
                        id="ta_send" 
                        placeholder="Comando">
                    </v-textarea>
                </v-col>
                <v-col :key="1.2" cols="12" :sm="2" :md="12" :lg="12" :xl="12">
                    <v-btn tile style="border-radius: 4px; border-style: solid; border-width: 1px; border-color: navy;" fab large depressed elevation="2" raised @click="$emit('click-send', textSend);">
                        <v-icon large>mdi-play</v-icon>
                        <span>EXE</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>

export default {
    name : 'barSend',
    
    data(){
        return{
            textSend: ''
        }
    }
   
}
</script>

<style scoped>
    #sendDiv{
        background-color: white;
        border-radius: 4px;
        border-style: solid;
        border-color: navy;
        border-width: 1px;
        
    }

    .v-btn span{
        display: none;
    }
    .v-btn:hover i{
        display: none;
    }
    .v-btn:hover span{
        display: inline;
    }
</style>
