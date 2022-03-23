<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-chip class="ma-2" color="var(--border-color)" label outlined>
          {{ MAIN_COLOR }}
        </v-chip>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn document-color"
          fab
          small
          color="#0b77b8"
          @click="setMainColor('document-color')"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn teal accent-4"
          fab
          small
          @click="setMainColor('teal')"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn amber accent-4"
          fab
          small
          @click="setMainColor('amber')"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn pink accent-3"
          fab
          small
          @click="setMainColor('pink')"
        ></v-btn>
      </v-col>
      <v-divider vertical />
      <v-col cols="2">
        <v-chip class="ma-2" :dark="darkMode" :light="!darkMode" label outlined>
          {{ MAIN_THEME }}
        </v-chip>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn white"
          fab
          small
          @click="setThemeColor('theme-light')"
        ></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          class="theme-btn black"
          fab
          small
          @click="setThemeColor('theme-dark')"
        ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lang from "../env/lang.en";
export default {
  name: "IndexSettings",
  data() {
    return {
      slider: 0,

      //LABEL
      MAIN_COLOR: lang.SETTINGS.MAIN_COLOR,
      MAIN_THEME: lang.SETTINGS.MAIN_THEME,
    };
  },
  props: {
    darkMode: Boolean,
  },
  methods: {
    setMainColor(color) {
      this.$emit("set-main-color", color);
    },
    setThemeColor(theme) {
      this.$emit("set-theme-color", theme);
    },
  },
};
</script>

<style></style>
