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
    INDEX: Object.freeze({
        TITLE: 'JCOUIweb',
        TIP_SETTINGS: 'Settings',
        TIP_CONFIG_COLL: 'Config. & Collection',
        TIP_LOG: 'Log',
        TIP_SAVE_UNDO: 'Save & BackTrack',
        TIP_EXE_COMMAND_WIZARD: 'Execute a command & Wizard',
        BTN_SPAN_SETTINGS: 'Close'

    }),
    PAGE_TREE: Object.freeze({
        H_TOTAL_ITEM: 'Total item: ',
        H_INITIAL_DOCUMENT: 'Initial Document: ',
        H_FINAL_DOCUMENT: 'Final Document: ',
        SELECT_SIZE: 'Size',
        BTN_SPAN_SAVE_TREE: 'Save Tree...',
        BTN_SPAN_EXPAND: 'Expand'
    }),
    SETTINGS: Object.freeze({
        MAIN_COLOR: 'Main Color',
        MAIN_THEME: 'Main Theme'
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
            },
            FUZZY_OP: {
                TXT_FUZZY_OP: 'Fuzzy operator\'s ID',
                TXT_PARAM_ID: 'Parameter\'s Id',
                TXT_PARAM_TYPE: 'Paramete\'s Type',
                BTN_SPAN_ADD_PARAM: 'Add parameter',
                BTN_SPAN_DEL_PARAM: 'Delete parameter',
                CHECK_SET_PRECOND: 'Do you want to set preconditions?',
                TXT_PRECOND: 'Precondition',
                TXT_EXPR_EVALUATE: 'Expression to evaluate',
                P_POLYLINE: 'Polyline:',
                TXT_FIRST_NUM: 'First Number',
                TXT_SECOND_NUM: 'Second Number',
                BTN_SPAN_ADD_POLY: 'Add polyline coordinates',
                BTN_SPAN_DEL_POLY: 'Delete Polyline Coordinates'
            },
            JS_FUNCT: {
                TXT_FUZZY_OP: 'Javascript function\'s ID',
                TXT_PARAM_ID: 'Parameter\'s Id',
                TXT_PARAM_TYPE: 'Paramete\'s Type',
                BTN_SPAN_ADD_PARAM: 'Add parameter',
                BTN_SPAN_DEL_PARAM: 'Delete parameter',
                CHECK_SET_PRECOND: 'Do you want to set preconditions?',
                TXT_PRECOND: 'Precondition',
                TXT_BODY_FUNCTION: 'Body of Function',
            },
            EXPAND: {
                BTN_SPAN_ADD_UNP_CLAUSE: 'Add Unpack Clause',
                BTN_SPAN_DEL_UNP_CLAUSE: 'Delete Unpack Clause',
                RADIO_KEEP_OTHERS: 'Keep Others',
                RADIO_DROP_OTHERS: 'Drop Others',
                RADIO_NONE: 'none'
            },
            FILTER: {
                CHECK_REMOVE_DUPL: 'Remove Duplicates?'
            },
            GET_COLLECTION: {
                CHECK_FROM_WEB: 'From Web?',
                TXT_URL: 'Url',
                TXT_COLLECTION: 'Collection',
                TXT_DB: 'DB'
            },
            GET_DICTIONARY: {
                TXT_COLLECTION: 'Collection',
                TXT_DB: 'DB',
                TXT_ALIAS: 'Alias'
            },
            GROUP: {
                BTN_SPAN_ADD_PART_CLAUSE: 'Add Partition Clause',
                BTN_SPAN_DEL_PART_CLAUSE: 'Delete Partition Clause',
                RADIO_KEEP_OTHERS: 'Keep Others',
                RADIO_DROP_OTHERS: 'Drop Others',
                RADIO_NONE: 'none'
            }
        },
        SUBMODULES: {
            PARTITION_MATCHING: {
                TXT_FIELD_MATCHING: 'Field of Matching',
                TXT_FIELD_WRT: 'Field of wrt',
                TXT_ID_THRESHOLD: 'Threshold\'s Id',
                TXT_NUMERIC_THRESHOLD: 'Threshold\'s Numeric',
                CHECK_WHERE_COND: 'Do you want to set where conditions of matching?',
                TXT_WHERE_COND: 'Where conditions',
                TXT_FIELD_DEST: 'Destination\s Field',
                CHECK_ADD_FIELD: 'Do you want to add field to input?',
                TXT_ADD_FIELD: 'Field to add',
                CHECK_SET_MIN_SIM: 'Do you want to set min similarity?',
                TXT_MIN_SIM: 'Min similarity numeric'
            },
            TRAJECTORY_PARTITION: {
                TXT_CONDITIONS: 'Conditions',
                BTN_SPAN_ADD: 'Add Matching Partition',
                BTN_SPAN_DELETE: 'Delete Matching Partition',
            },
            UNPACK_CLAUSE: {
                TXT_CONDITIONS: 'Conditions',
                TXT_FIELDS_SRC_ARR: 'Source array\'s field',
                TXT_FIELDS_DEST_ARR: 'Destination array\'s array'
            },
            WHERE_CASE: {
                TXT_COLLECT_CLAUSE: 'Coleections clause',
                CHECK_GEN_SECTION: 'Do you want to add a generate Section?'
            }
        }
    })
})

export default lang