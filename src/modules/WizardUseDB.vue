<template>
<v-sheet>
    <v-row align="center">
        <v-col cols="12">
            <v-row v-for="collect in collections" :key="collect.index">
                <v-col cols="5">
                    <v-text-field :rules="[rules.required,rules.counter]" v-model="collect.collection" :label="`${TXT_COLLECTION_NR + collect.index}`" />
                </v-col>
                <v-col cols="5">
                    <v-text-field :rules="[rules.counter]" v-if="collect.collection!=''" :label="`${TXT_ALIAS + collect.index}`" v-model="collect.alias" />
                </v-col>
                <v-col cols="1">
                    <v-btn icon color="red" @click="checkMinusCopy(collect.index)">
                        <v-icon dark>mdi-minus</v-icon>
                    </v-btn>
                </v-col>
                <v-col v-if="checkLast(collect.index)" cols="1">
                    <v-btn icon color="green" @click="setPlus()">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-checkbox color="var(--bg-color)" v-model="defaultServer" :label="CHECK_DEFAULT_SERVER"></v-checkbox>
    <v-row v-if="!defaultServer">
        <v-col>
            <v-text-field :rules="[rules.required]" v-model="server" :label="TXT_SERVER_NAME" />
        </v-col>
        <v-col>
            <v-text-field v-model="connString" :label="TXT_CONNECTION"/>
        </v-col>
    </v-row>
</v-sheet>
</template>

<script>
import {delDoubleArrayViaIndex} from '../functions/functionTools';
import lang from '../env/lang.en'
export default {
    name:"WizardUseDB",
    props: {
        maincol: String
    },
    data() {
        return {
            valueString: '',
            valueArr: [''],
            defaultServer: true,
            server: '',
            connString: '',
            collections: [{
                index: 1,
                collection: '',
                alias: ''
            }],
            rules: {
                required: value => !!value || 'Required.',
                counter: value => this.counterText(value),
            },

            //LABEL
            TXT_COLLECTION_NR: lang.WIZARD.MODULES.USE_DB.TXT_COLLECTION_NR,
            TXT_ALIAS: lang.WIZARD.MODULES.USE_DB.TXT_ALIAS,
            CHECK_DEFAULT_SERVER: lang.WIZARD.MODULES.USE_DB.CHECK_DEFAULT_SERVER,
            TXT_SERVER_NAME: lang.WIZARD.MODULES.USE_DB.TXT_SERVER_NAME,
            TXT_CONNECTION: lang.WIZARD.MODULES.USE_DB.TXT_CONNECTION,
        }
    },

    watch: {
        defaultServer: function (newVal, oldVal) {
            if (newVal != oldVal) {
                if (newVal) {
                    this.valueString = this.valueString.substring(0, this.valueString.indexOf("ON") + 2);
                    this.valueString += " DEFAULT SERVER;"
                } else {
                    this.valueString = this.valueString.substring(0, this.valueString.indexOf("ON") + 2);
                    this.valueString += " SERVER " + this.server;
                    if (this.connString != "")
                        this.valueString += " '" + this.connString + "'";
                    this.valueString += ";";
                }
            }
            this.$emit('changeValue', this.valueString);
        },
        server: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.valueString = this.valueString.substring(0, this.valueString.indexOf("ON") + 2);
                this.valueString += " SERVER " + this.server;
                if (this.connString != "")
                    this.valueString += " '" + this.connString + "'";
                this.valueString += ";";
            }
            this.$emit('changeValue', this.valueString);
        },
        connString: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.valueString = this.valueString.substring(0, this.valueString.indexOf("ON") + 2);
                this.valueString += " SERVER " + this.server
                if (this.connString != "")
                    this.valueString += " '" + this.connString + "'";
                this.valueString += ";";
            }
            this.$emit('changeValue', this.valueString);

        }
    },
    methods: {
        checkMinus() {
            if (this.collections.length > 1) {
                this.collections.pop()
                this.valueArr.pop()
            }

            this.counterText(this.collections.length);
        },
        checkLast(index) {
            return index == this.collections[this.collections.length - 1].index;
        },
        checkMinusCopy(index) {
            if (this.collections.length > 1) {
                delDoubleArrayViaIndex(this.collections, this.valueArr, index);
            }
            this.counterText(this.collections.length);
        },
        setPlus() {
            if (this.collections[this.collections.length - 1].collection != '') {
                this.collections.push({
                    index: this.collections.length + 1,
                    collection: '',
                    alias: ''
                })
                this.valueArr.push('')
            }
        },
        changeText(ind) {
            let str = this.valueArr[ind];
            str = "";
            if (this.collections[ind].collection != "")
                str = this.collections[ind].collection;
            if (this.collections[ind].alias)
                str += " AS " + this.collections[ind].alias;
            this.valueArr[ind] = str;
            this.valueString = " ";
            this.valueArr.forEach(element => {
                this.valueString += element;
                this.valueString += ", "
            });
            this.valueString = this.valueString.substring(0, this.valueString.length - 2);
            this.valueString += " ON";
            if (this.defaultServer) {
                this.valueString += " DEFAULT SERVER"
            } else {
                this.valueString += " SERVER " + this.server
                if (this.connString != "")
                    this.valueString += " '" + this.connString + "'";
            }
            this.valueString += ";"
            this.$emit('changeValue', this.valueString);
        },
        counterText(value) {
            for (let i = 0; i < this.valueArr.length; i++) {
                this.changeText(i);
            }
            return value.length > -1;
        }

    }
}
</script>

<style>

</style>
