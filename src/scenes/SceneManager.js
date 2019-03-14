import Daniela from "../player/Daniela.js";

/**
 * SceneObject SceneManager
 *
 * Clase dedicada a optimizar y reducir el código necesario por cada escena que se cree. Se desarrollarán los métodos
 * y eventos necesaros para cambiar de escenas, así como para la creación de elementos triviales como el personaje
 * principal {Daniela}, el tilemap {Tilemap}, etc..
 * @since 0.0.0
 */
class SceneManager extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.key = key.key;

    }

    /**
     * Método adaptado según la esctructura del proyecto. Si no se van a hacer cambios en la escena es mejor no
     * hacer override.
     *
     * Imprime por consola la escena actual.
     */
    preload() {
        console.log(this.key);
    }

    /**
     * Crea el personaje en la escena actual y añade el Listener para el evento GameOver. Este evento lo producirá
     * el pesonaje cuando el contador de vidas llegue a 0.
     *
     * @param scene
     * @param x
     * @param y
     * @returns Daniela
     */
    createDaniela(scene, x, y) {
        this.daniela = new Daniela({scene: scene, x: x, y: y, key: 'daniela'}).setScale(2);
        this.daniela.addListener('GameOver', e => {
            this.reboot(this.daniela.scene);
        });
        return this.daniela;
    }

    /**
     * Crea el objeto tilemap a partir de la key de la escena obtenida del constructor
     * @returns {Phaser.Tilemaps.Tilemap}
     */
    createMap() {
        return this.make.tilemap({key: this.key});
    }

    //TODO: Cuando esten el resto de escenas se manejara por aqui cual se quiere cargar
    reboot(scene) {
        scene.sound.stopAll(); //Reinicia los sonidos
        scene.scene.restart(); //Reinicia el resto de elementos
    }
}

export default SceneManager;