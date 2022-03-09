<template>
  <indexC />
</template>

<script>
  import indexC from '../components/index'

  export default {
    name: 'Home',
    created(){
      document.title = 'Home - JCOUI Web'
    },
    components: {
      indexC,
    },
  }
</script>
