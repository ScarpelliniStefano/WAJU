<template>
  <v-app id="body">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  data: () => ({
    //
  }),

  created() {
    document.title = "Loading WAJU...";
  },
};
</script>

<style scoped>
#title {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
  color: white;
}
#settings {
  position: absolute;
  right: 0px;
  align-items: right;
  padding: 10px;
}
#body {
  min-width: 700px;
  min-height: 500px;
  display: flex;
  flex-flow: column;
  height: 100%;
}
</style>

<style>
html {
  height: 100%;
  margin: 0;
  background-color: var(--bg-div-color);
}

.v-snack__content {
  font-size: 2vh;
}
</style>
