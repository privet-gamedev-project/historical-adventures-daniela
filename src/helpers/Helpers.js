/*
En helpers se hacen funciones de ayuda, una función de ayuda puede ser por ejemplo 
una función que convierta array bi-dimensionales a array de una dimensión.
*/

/**
 *  Para los múltilpes idiomas que hay en España retorna solo español, en caso contrario retornará inglés (se puede modificar para agregar más idiomas)
 *  @return String
 */
const getLang = () => (["ca", "gl", "es", "eu"]
        .indexOf(navigator.language.split('-')[0]) != -1) ?
    "es" :
    "en";

export default {
    getLang
};