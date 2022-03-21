<template>
<v-sheet :dark="darkMode" elevation="17" id="recDiv" class="divstyle">
    <v-sheet :dark="darkMode" style="border-bottom: 1px solid #dddddd;border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;" elevation="14" class="topbar" @click="$emit('set-z-click', 'log')">
        <h4 class="noselect moderndesign" style="float: left; margin-left: 10px; margin-top:2px">
            {{ TITLE }}
        </h4>
        <v-icon color="red darken-4" style="float: right; margin-right:5px; margin-top: 2px" @click="closeWindow()">
            mdi-close
        </v-icon>
    </v-sheet>
    <v-sheet :dark="darkMode" style="border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
        <v-container class="ma-0 containerstyle" style="border-radius: 3px; width: 100%; max-width: 99999px">
            <v-row class="py-0" align="center">
                <v-col class="pa-0" cols="12">
                    <v-sheet :dark="darkMode" class="pa-3" :height="height - 32" id="boxLog">
                        <ul readonly style="font-size: 16px" height="100%" name="log-text" label="Logs" id="ul_send">
                            <li :key="log.id" v-for="log in arrayLog.logs">
                                <p v-if="log.type === 'LOG'" style="font-family: Consolas; color: var(--border-color)">
                                    {{ log.message }}
                                </p>
                                <p v-if="log.type !== 'LOG'" style="font-family: Consolas; color: red">
                                    {{ log.message }}
                                </p>
                                <v-divider></v-divider>
                            </li>
                        </ul>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</v-sheet>
</template>

<script>
import lang from '../env/lang.en'
export default {
    name: "IndexLog",
    components: {},
    props: {
        arrayLog: Object,
        height: Number,
        width: Number,
        darkMode: Boolean
    },
    data: () => ({
        value: 1,
        heightMax: 0,
        log: true,
        error: false,
        conf: false,
        selectedItem: -1,
        numDepth: 1,
        listEmpty: true,

        //LABEL
        TITLE: lang.LOG_COMP.TITLE
    }),
    created() {},
    mounted() {},
    watch: {},
    methods: {
        closeWindow() {
            this.$emit("close-log");
        },
    }
};
</script>

<style scoped>
.label {
    color: white;
    padding: 8px;
}

.success {
    background-color: #04aa6d;
}

/* Green */
.info {
    background-color: #2196f3;
}

/* Blue */
.warning {
    background-color: #ff9800;
}

/* Orange */
.danger {
    background-color: #f44336;
}

/* Red */
.other {
    background-color: #e7e7e7;
    color: black;
}

/* Gray */

#btmDiv {
    height: 100%;
    background-color: white;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

#btn_log {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

#span {
    bottom: 30px;
}

.btn {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
}

.list {
    display: flex;
    width: 100%;
    height: 88px;
    bottom: 0;
    padding: 0;
    margin: 0;
}

.list li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%;
}

.list_inside {
    display: flex;
    width: 100%;
    height: 88px;
    padding: 0;
    margin: 0;
}

.list_inside li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 10px;
    background: #ffffff00;
    width: 100%;
}

#ul_send {
    display: inherit;
    width: 100%;
    height: 16px;
    padding: 0;
    margin: 0;
}

/* (B) LIST ITEMS */
#ul_send li {
    list-style-type: none;
    box-sizing: border-box;
    padding: 1px;
    background: transparent;
    width: 100%;
}

#ul_send>li>p {
    padding-bottom: 4px;
    margin-bottom: 0px;
}

@media screen and (max-width: 1263px) and (min-width: 600px) {
    .list {
        flex-wrap: wrap;
        margin-top: -122px;
    }

    .list li {
        width: 100%;
    }
}

@media screen and (min-width: 1904px) {
    .list {
        flex-wrap: wrap;
        margin-top: -122px;
    }

    .list li {
        width: 100%;
    }
}

.tarea-bottom {
    background-color: white;
}

div.box {
    padding: 4px;
    overflow: auto;
}

#boxLog {
    overflow: auto;
}
</style>
