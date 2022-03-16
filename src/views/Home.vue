<template>
  <indexC />
</template>

<script>
  import indexC from '../components/AppIndex'

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
