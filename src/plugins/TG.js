class TG extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    init(config) {
        console.log('%c Plugin Translate Gamma cargado ', 'color: white; font-size:15px; background-color: #e14141');
        const those = this;
        this.pluginManager.registerFileType('lang', function () {
            those.upload(this, config);
        });
        this.events = new Phaser.Events.EventEmitter();
       
        // Variables necesarias para el correcto funcionamiento del plugin
        const necessary_vars = ['path', 'disponibleLangs', 'fallbackLang'];
        let all_variables_ok = true;

        necessary_vars.map(key => {
            if (!Object.keys(config).includes(key)) {
                all_variables_ok = false;
                console.error('Te faltó agregar esta configuración en tu config: ', key);
            } else if(all_variables_ok) {
                all_variables_ok = true;
            }
        });

        if(all_variables_ok) {
            this.setVars(config);
        }
    }

    setVars(config) {
        this.spanish_langs = (config.spanishLangs !== undefined && config.spanishLangs.length > 0) ? config.spanishLangs : [];
        this.disponible_langs = config.disponibleLangs;
        const lang_storage = localStorage.getItem('lang_game');
        this.fallback_lang = config.fallbackLang;
        // Detección automática del idioma solo si no se encuentra local_storage
        this.actual_lang = (lang_storage !== null) ? lang_storage : this.getDeviceLang();
        this.lang_cache = null;
    }

    getActualLang() {
        return this.actual_lang;
    }

    getDeviceLang() {
        const device_lang = navigator.language.split('-')[0];
        // Detectamos los distintos idiomas de españa
        const filter_device_lang = this.spanish_langs.indexOf(device_lang) !== -1 ? 'es' : device_lang;
        const lang = (this.disponible_langs.includes(filter_device_lang)) ? filter_device_lang : this.fallback_lang;

        return lang;
    }

    setLang(lang) {
        if (this.disponible_langs.includes(lang)) {
            this.actual_lang = lang;
            this.lang_cache = this.game.cache.json.get(lang);
            localStorage.setItem('lang_game', lang);
            this.events.emit('update_change_lang');
        } else {
            console.error('Este idioma (%s) no se incluye en los idiomas seleccionados, que son: %o', lang, this.disponible_langs);
        }
    }

    // Habilitamos la detección del idioma por el dispositivo
    setDefaultLang() {
        this.actual_lang = this.getDeviceLang();
        this.lang_cache = this.game.cache.json.get(this.actual_lang);
        localStorage.removeItem('lang_game');
        this.events.emit('update_change_lang');
    }

    tr(toTranslate, params = null) {
        // Separamos las diferentes rutas para buscar, gracias a esto podemos navegar por el json haciendo "escena.traduccion"
        let keysToTranslate = (toTranslate.replace(']', '')).split(/[.|\[]/g);
        let translate = null;

        // Registramos en el cache para no tener que estar llamando al cache de Phaser siempre
        if (this.lang_cache === null) {
            this.lang_cache = this.game.cache.json.get(this.actual_lang);
        }

        // Se carga del cache de traducción a una variable de traducción para poder navegar por ella y obtener la traducción
        translate = this.lang_cache;
        keysToTranslate.map(key => {
            if (translate[key] === undefined) {
                console.error('La key no existe en tu JSON. Tu key es: %s\n Y estás tratando de traducir al: %s', key, this.actual_lang);
            } else {
                translate = translate[key]
            }
        });

        // Se convierten todos los parámetros
        if (params !== null) {
            translate = JSON.stringify(translate);
            for (let key in params) {
                const regex = new RegExp(`{{[ ]{0,}${key}[ ]{0,}}}`, 'g');
                translate = translate.replace(regex, params[key]);
            }
            translate = JSON.parse(translate);
        }
        return translate;
    }

    // Se tiene que usar config en lugar de this ya que upload usa el scope del uploadManager de Phaser
    upload(loader, config) {
        const mapLang = config.disponibleLangs.map(lang => ({
            key: lang,
            url: `${(loader.path === '') ? '.' : '..'}/${config.path}/${lang}.json`
        }));
        loader.json(mapLang);
    }

    // Eventos
    on(callback) {
        this.events.on('update_change_lang',() => {
            callback(this.actual_lang);
        });
    }

}
export default TG;