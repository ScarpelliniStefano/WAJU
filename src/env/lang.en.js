const lang = Object.freeze({
    SEND_COMP: Object.freeze({
        TITLE: 'Command',
        BTN_SPAN_EXECUTE: 'Execute',
        BTN_SPAN_WIZARD: 'Wizard',
    }),
    RECEIVE_COMP: Object.freeze({
        TITLE: 'Response',
        BTN_SPAN_SAVE: 'Save',
        BTN_SPAN_BACKTRACK: 'Backtrack',
        BTN_SPAN_BACKTRACK_UNDO: 'Undo'
    }),
    CONFIG_COLL_COMP: Object.freeze({
        CONFIG: Object.freeze({
            TITLE: 'Configuration',
            BTN_SPAN_UPLOAD: 'Upload Configuration',
        }),
        COLLECTION: Object.freeze({
            TITLE: 'Collection',
            BTN_SPAN_TEMPORARY_COLLECTION: 'Temporary Collection',
        }),
        BTN_SPAN_CONFIG_SHORT: 'Config.',
        BTN_SPAN_CONFIG_FULL: 'Configuration',
        BTN_SPAN_COLL_SHORT: 'IR Coll.',
        BTN_SPAN_COLL_FULL: 'IR Collections',
        BTN_SPAN_IR_REQUEST: 'IR Request'
    }),
    LOG_COMP: Object.freeze({
        TITLE: 'Log'
    }),
    WIZARD: Object.freeze({
        MODULES: {
            SAVE_AS: {
                TXT_COLLECTION: 'Collection\'s name',
                CHECK_SAVE_DB: 'Do you want to save the collection in database?',
                TXT_DATABASE: 'Database\'s name'
            },
            USE_DB: {
                TXT_COLLECTION_NR: 'Collection #',
                TXT_ALIAS: 'Alias #',
                CHECK_DEFAULT_SERVER: 'Do you want to use default server?',
                TXT_SERVER_NAME: 'Server\'s name',
                TXT_CONNECTION: 'Connection\'s string'
            }
        }
    })
})

export default lang