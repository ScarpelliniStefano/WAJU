<template>
    <v-container>
        <v-row align="center">
            <v-col cols="2">
                {{MAIN_COLOR}}
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn red accent-4" fab small v-on:click="setMainColor('red')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn pink accent-3" fab small v-on:click="setMainColor('pink')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn document-color" fab small color="#0b77b8" v-on:click="setMainColor('document-color')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn teal accent-4" fab small v-on:click="setMainColor('teal')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn amber accent-4" fab small v-on:click="setMainColor('amber')"></v-btn>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col cols="2">
                {{MAIN_THEME}}
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn white" fab small v-on:click="setThemeColor('theme-light')"></v-btn>
            </v-col>
            <v-col cols="1">
                <v-btn class="theme-btn black" fab small v-on:click="setThemeColor('theme-dark')"></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name: 'SettingsComp',
    data(){
        return{
            slider: 0,

            //LABEL
            MAIN_COLOR: lang.SETTINGS.MAIN_COLOR,
            MAIN_THEME: lang.SETTINGS.MAIN_THEME
        }
    },
    props:{
        darkMode: Boolean
    },
    methods: {
        setMainColor(color){
            this.$emit("set-main-color", color);
        },
        setThemeColor(theme){
            this.$emit("set-theme-color", theme);
        },
    }
}
</script>

<style>

</style>