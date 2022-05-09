const lang = Object.freeze({
    SEND_COMP: Object.freeze({
        TITLE: 'Comandi',
        BTN_SPAN_EXECUTE: 'Esegui',
        BTN_SPAN_WIZARD: 'Wizard',
        HINT_EXECUTE: 'Esegui l\'istruzione presente nella sezione di testo',
        HINT_WIZARD: 'Apri un nuovo tab per poter comporre l\'istruzione che si desidera creare.'
    }),
    RECEIVE_COMP: Object.freeze({
        TITLE: 'Risposta',
        BTN_SPAN_SAVE: 'Salva',
        BTN_SPAN_BACKTRACK: 'Indietro',
        BTN_SPAN_BACKTRACK_UNDO: 'Indietro',
        HINT_SAVE: 'Salva le istruzioni presenti nel box',
        HINT_BACKTRACK: 'Annulla l\'ultima istruzione tra quelle eseguite'
    }),
    CONFIG_COLL_COMP: Object.freeze({
        CONFIG: Object.freeze({
            TITLE: 'Configurazione',
            BTN_SPAN_UPLOAD: 'Carica Configurazione',
        }),
        COLLECTION: Object.freeze({
            TITLE: 'Collezioni',
            BTN_SPAN_TEMPORARY_COLLECTION: 'Collezione Temporanea',
        }),
        BTN_SPAN_CONFIG_SHORT: 'Config.',
        BTN_SPAN_CONFIG_FULL: 'Configurazione',
        BTN_SPAN_COLL_SHORT: 'Coll. IR',
        BTN_SPAN_COLL_FULL: 'Collezioni IR',
        BTN_SPAN_IR_REQUEST: 'Richieste IR',
        HINT_CONFIG: 'Visualizza tutte le configurazioni',
        HINT_COLLECTIONS: 'Visualizza tutte le collezioni con la possibilità di osservarle nel dettaglio',
    }),
    LOG_COMP: Object.freeze({
        TITLE: 'Log'
    }),
    INDEX: Object.freeze({
        TITLE: 'JCOUIweb',
        TIP_SETTINGS: 'Impostazioni',
        TIP_CONFIG_COLL: 'Config. & Collezioni',
        TIP_LOG: 'Log',
        TIP_SAVE_UNDO: 'Risposta',
        TIP_EXE_COMMAND_WIZARD: 'Comandi',
        BTN_SPAN_SETTINGS: 'Chiudi',
        DIALOG:{
            DIALOG_TITLE: 'Informazioni',
            DIALOG_TEXT_FIRST: '1. If you hold down a button (except Upload Configuration and Temporary Collection), will appear an explanation of what the button can do.',
            DIALOG_TEXT_SECOND: '2. Settings are updated and saved in real time.',
            DIALOG_TEXT_THIRD: '3. Wizard will be open in a new Tab.',
            DIALOG_TEXT_FOURTH: '4. Every collection will be open in a new Tab.',
            DIALOG_TEXT_FIFTH: '5. From the width of 700px to 960px, tablet mode starts. In this mode, order of components are: [1] Execute & Wizard [2] Log [3] Save & Back [4] Configurations/Collections' 
        },
        LOG_MESSAGES: {
            BACKTRACK_DONE: 'Annullamento eseguito',
            TREE_OPENED: 'Albero aperto',
            IR_LIST_UPDATED: 'Lista collezioni IR aggiornata',
            TEMP_UPDATED: 'Collezione temporanea modificata',
            JOB_DONE: 'Comando eseguito',
            CONNECTION_ENGINE_CRASHED: 'Connessione con Engine fallita',
            WEB_SOCKET_SERVER_CONNECTED: 'Connesso con Web Socket Server',
            WEB_SOCKET_SERVER_DISCONNECTED: 'Disconnesso da Web Socket Server',
            WEB_SOCKET_SERVER_ERROR: 'Errore da parte del Web Socket Server'
        }
        
    }),
    PAGE_TREE: Object.freeze({
        H_TOTAL_ITEM: 'Total item: ',
        H_INITIAL_DOCUMENT: 'Initial Document: ',
        H_FINAL_DOCUMENT: 'Final Document: ',
        SELECT_SIZE: 'Size',
        BTN_SPAN_SAVE_TREE: 'Save Tree...',
        BTN_SPAN_EXPAND: 'Expand',
        HINT_EXPAND:'Expand all documents and fields',
        HINT_SAVE:'Save the documents in a local file'
    }),
    SETTINGS: Object.freeze({
        MAIN_COLOR: 'Main Color',
        MAIN_THEME: 'Main Theme'
    }),
    WIZARD: Object.freeze({
        WARNING:{
            DIALOG_TITLE: 'Warning',
            DIALOG_TEXT: 'If you log out from Homepage or reload it, Wizard will not send any message to the client because Wizard and Homepage are linked.'
            },
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
            },
            INTERSECT_COLLECTION:{
                TXT_COLLECTION_NR: 'Collection #',
                TXT_DB: 'Db #',
                TXT_ALIAS: 'Alias #',
            },
            JOIN_COLLECTION:{
                TXT_COLLECTION_NR: 'Collection #',
                TXT_DB: 'Db #',
                TXT_ALIAS: 'Alias #',
                SPATIAL_FUNCTION:{
                    CHECK_SPATIAL_FUNCTION:'You want to set a geometry spatial function?',
                    LB_GEO_SPATIAL_FUNCT:'GEOMETRY SPATIAL FUNCTION:',
                    RADIO_SPATIAL_FUNCT_DISTANCE:'DISTANCE',
                    RADIO_SPATIAL_FUNCT_AREA:'AREA',
                    RADIO_SPATIAL_FUNCT_ORIENTATION:'ORIENTATION',
                    RADIO_SPATIAL_FUNCT_INCLUDED:'INCLUDED',
                    RADIO_SPATIAL_FUNCT_MEET:'MEET',
                    RADIO_SPATIAL_FUNCT_INTERSECT:'INTERSECT',
                    SEL_LEFT_RIGHT_SP_FUNCT:'Left or right?',
                    CHECK_ID_NUMBER:'Set id and number to it?',
                    TXT_ID_SP_FUNCT:'Id ',
                    CHECK_SET_COMP_NUM_SP_FUNCT:'Set comparation?',
                    TXT_NUM_SP_FUNCT:'Numeric ',
                    SEL_CHOICE_SP_FUNCT:'Comparator'
                },
                GEOMETRY:{
                    CHECK_GEOMETRY:'Set geometry?',
                    LB_GEOMETRY:'GEOMETRY:',
                    RADIO_GEOMETRY_INTERSECTION:'INTERSECTION',
                    RADIO_GEOMETRY_RIGHT:'RIGHT',
                    RADIO_GEOMETRY_LEFT:'LEFT',
                    RADIO_GEOMETRY_ALL:'ALL'
                },
                CHECK_ADD_FIELDS:'Add fields?',
                TXT_ADD_FIELD_NON_FUZZY_FUNCT:'Non fuzzy function',
                TXT_ADD_FIELD_FIELD_REF:'FieldReference',
                BTN_SPAN_ADD_FIELD_REF:' ADD FIELD REFERENCE',
                BTN_SPAN_REMOVE_FIELD_REF:' DELETE FIELD REFERENCE',
                CHECK_FUZZY_SETS:'Set fuzzy sets?',
                TXT_FUZZY_SETS:'Fuzzy sets',
                CHECK_CASE_CLAUSE:'Do you want to insert a case clause?',
                CHECK_REMOVE_DUPLICATES:'Remove duplicates?'
            },
            MERGE_COLLECTION:{
                TXT_COLLECTION_NR: 'Collection #',
                TXT_DB: 'Db #',
                TXT_ALIAS: 'Alias #',
                BTN_SPAN_ADD_COLLECTION:' ADD COLLECTION',
                BTN_SPAN_REMOVE_COLLECTION:' DELETE COLLECTION',
                CHECK_REMOVE_DUPLICATES:'Remove duplicates?'
            },
            SUBTRACT_COLLECTION:{
                TXT_COLLECTION_NR: 'Collection #',
                TXT_DB: 'Db #',
                TXT_ALIAS: 'Alias #',
            },
            TRAJECTORY_MATCHING:{
                TXT_COLLECTION_NR: 'Collection #',
                TXT_DB: 'Db #',
                TXT_ALIAS: 'Alias #',
                BTN_SPAN_ADD_TRAJECTORY_PARTITION:' ADD TRAJECTORY PARTITION',
                BTN_SPAN_REMOVE_TRAJECTORY_PARTITION:' DELETE TRAJECTORY PARTITION',
                RADIO_KEEP_OTHERS:"KEEP OTHERS",
                RADIO_DROP_OTHERS:'DROP OTHERS',
                RADIO_NONE:'NONE'
            }
        },
        SUBMODULES: {
            CASE_CLAUSE:{
                BTN_SPAN_ADD_WHERE_CLAUSE:' ADD WHERE CLAUSE',
                BTN_SPAN_REMOVE_WHERE_CLAUSE:' DELETE WHERE CLAUSE',
                RADIO_KEEP_OTHERS:"KEEP OTHERS",
                RADIO_DROP_OTHERS:'DROP OTHERS',
                RADIO_NONE:'NONE'
            },
            GENERATE_SECTION:{
                GEOMETRY:{
                    LB_GEOMETRY:'GEOMETRY:',
                    RADIO_GEOMETRY_KEEPING:'KEEPING GEOMETRY',
                    RADIO_GEOMETRY_DROPPING:'DROPPING GEOMETRY',
                    RADIO_GEOMETRY_SETTING:'SETTING GEOMETRY',
                    RADIO_GEOMETRY_SETTING_POINT:'POINT',
                    RADIO_GEOMETRY_SETTING_AGGREGATE:'AGGREGATE',
                    RADIO_GEOMETRY_SETTING_FIELD:'Insert a field',
                    RADIO_GEOMETRY_SETTING_TO_POLYLINE:'TO_POLYLINE',
                    TXT_GEOMETRY_SETTING_POINT_FIRST_COORDINATE:'First coordinate',
                    TXT_GEOMETRY_SETTING_POINT_SECOND_COORDINATE:'Second coordinate',
                    TXT_GEOMETRY_SETTING_NO_POINT_FIELD:'Field',
                },
                CHECK_FUZZY_CHECK:'Do you want checks on the fuzzy?',
                TXT_COLL_FUZZY_ID_ISTR:'ID istruction',
                TXT_COLL_FUZZY_CONDITION:'Fuzzy check condition',
                BTN_SPAN_ADD_FUZZY_ISTRUCTION:' ADD FUZZY ISTRUCTION',
                BTN_SPAN_REMOVE_FUZZY_ISTRUCTION:' DELETE FUZZY ISTRUCTION',
                CHECK_ALPHACUT:'Do you want alpha cut?',
                TXT_ALPHACUT_NUMERIC_EXPR:'Numeric expression',
                TXT_ALPHACUT_ID:'ID',
                BTN_SPAN_ADD_ALPHACUT:' ADD ALPHA CUT',
                BTN_SPAN_REMOVE_ALPHACUT:' DELETE ALPHA CUT',
                CHECK_KEEP_DROP_FUZZY:'Do you want to keep or drop fuzzy sets?',
                CHECK_BUILD_ACTION:'Do you want a build action?',
                TXT_BUILD_ACTION_FIELD:'Field to build separed by comma'
            },
            KEEP_DROP_FS:{
                RADIO_DEFUZZIFY:'DEFUZZIFY',
                RADIO_DROPPING_ALL_FS:'DROPPING ALL FUZZY SETS',
                RADIO_KEEPING_ALL_FS:'KEEPING ALL FUZZY SETS',
                RADIO_DROPPING_FUZZY_SETS:'DROPPING FUZZY SETS',
                RADIO_KEEPING_FUZZY_SETS:'KEEPING FUZZY SETS',
                TXT_LIST_ID:'List of ids to keep/drop'
            },
            PARTITION_CLAUSE:{
                TXT_CONDITIONS:'Conditions',
                TXT_SOURCE_FIELDS:'Fields of source fields',
                BTN_SPAN_ADD_SOURCE_FIELDS:' ADD SOURCE FIELD',
                BTN_SPAN_REMOVE_SOURCE_FIELDS:' DELETE SOURCE FIELD',
                TXT_FIELD_DESTINATION:'Fields of destination array',
                CHECK_DROP_GROUPING_FIELDS:'Drop grouping fields?',
                CHECK_ORDER_FIELDS:'Order fields?',
                TXT_ORDER_FIELDS:'Order fields',
                RADIO_ORDER_NONE:'NONE',
                RADIO_ORDER_ASCENDENT:'ASCENDENT',
                RADIO_ORDER_DESCENDENT:'DESCENDENT',
                BTN_SPAN_ADD_ORDER_FIELDS:' ADD ORDER FIELD',
                BTN_SPAN_REMOVE_ORDER_FIELDS:' DELETE ORDER FIELD',
                CHECK_GENERATE_SECTION:'add a generate section?'
            },
            PARTITION_MATCHING: {
                TXT_FIELD_MATCHING: 'Field of Matching',
                TXT_FIELD_WRT: 'Field of wrt',
                TXT_ID_THRESHOLD: 'Threshold\'s Id',
                TXT_NUMERIC_THRESHOLD: 'Threshold\'s Numeric',
                CHECK_WHERE_COND: 'Do you want to set where conditions of matching?',
                TXT_WHERE_COND: 'Where conditions',
                TXT_FIELD_DEST: 'Destination\'s Field',
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
                TXT_COLLECT_CLAUSE: 'Collections clause',
                CHECK_GEN_SECTION: 'Do you want to add a generate Section?'
            }
        },
        SPECIFICATION:{  
            LBL_TITLE:'Wizard - JCOUI Web',
            SEL_TXT_MODULES:'Modules',
            SELECTOR:{
                SEL_GET_COLL:'GET A COLLECTION',
                SEL_GET_DICT:'GET A DICTIONARY',
                SEL_SAVE_AS:'SAVE LOCALLY OR IN A DATABASE',
                SEL_MERGE_COLL:'MERGE TWO OR MORE COLLECTIONS',
                SEL_INTERSECT_COLL:'INTERSECT TWO COLLECTIONS',
                SEL_SUBTRACT_COLL:'SUBTRACT TWO COLLECTIONS',
                SEL_USE_DB:'USE A DATABASE',
                SEL_FILTER:'FILTER ON FIELD',
                SEL_EXPAND:'EXPAND COLLECTIONS',
                SEL_GROUP:'GROUP COLLECTIONS',
                SEL_JOIN:'JOIN OF COLLECTIONS',
                SEL_FUZZY_OP:'CREATE FUZZY OPERATOR',
                SEL_JS_FUNCTION:'CREATE JAVASCRIPT FUNCTION',
                SEL_TRAJECTORY_MATCHING:'TRAJECTORY MATCHING'
            },
            BTN_SPAN_ADD_MODULE:' ADD MODULE',
            BTN_SPAN_REMOVE_MODULE:' DELETE MODULE',
            BTN_SPAN_RESET_SEND:' RESET & SEND MESSAGE',
            BTN_SPAN_APPEND:' APPEND MESSAGE',
            HINT_RESET:'Transfer the text in the main view, cleaning all previuos content in the command view',
            HINT_APPEND:'Transfer the text in the main view, append that to the previuos content in the command view'
        }
    })
})

export default lang