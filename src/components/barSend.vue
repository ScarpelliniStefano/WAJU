<template>
    <div id="sendDiv">
        <v-textarea 
          name="input-7-1"
          label="Comando"
          v-model.lazy="textSend"
          rows="10"
          row-height="7"
          hint="Inserisci il comando"
            id="ta_send" placeholder="Comando"></v-textarea>
        <v-btn depressed elevation="2" raised @click="$emit('click-send', textSend);"> Send data </v-btn>

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
