import lang_en from './lang.en'
import lang_it from './lang.it'

function setLanguage(lang){
    var language = null
    switch(lang){
        case 'en':
            language = lang_en
            break
        case 'it':
            language = lang_it
            break
        default:
            language = lang_en
    }
    return language
}

export default setLanguage