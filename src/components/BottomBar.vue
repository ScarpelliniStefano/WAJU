<template>
  <div>
    <log-c :logV="bottomText.textLog"></log-c>
    <v-spacer/>
    <err-log-c :errV="bottomText.textErrLog"></err-log-c>
    <v-spacer/>
    <config-c :confV="bottomText.textConf"></config-c> 
    <v-spacer/>
    <backtrack-c v-on:click-back="$emit('click-back-index');"></backtrack-c>
    <ir-coll-c 
      v-on:click-ir="$emit('click-ir-index');"
      v-on:click-tc="$emit('click-tc-index');"
      v-on:click-irc="$emit('click-irc-index',$event);" 
      :irTreeV="bottomText.textIRTreeCol"
      :irV="bottomText.textIRCol"></ir-coll-c>
  </div>
</template>
<script>
import ConfigC from './configComp.vue';
import ErrLogC from './errLogComp.vue';
import LogC from './logComp.vue';
import BacktrackC from './backComp.vue';
import IrCollC from './IRCollComp.vue';
    export default {
    name : 'bottomBar',
    components : {
      ConfigC,
      ErrLogC,
      LogC,
      BacktrackC,
      IrCollC,
    },
    props : {
        bottomText : Object
    },
    data: () => ({ value: 1 }),
    created (){
         //eventBus.$on('cambioText',(v)=>{this.textRec += v;});
         
         //vm.$on('receivedData',(v)=>{this.textR+=v;})
    }
}
</script>