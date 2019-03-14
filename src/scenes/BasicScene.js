import Daniela from "../player/Daniela.js";
import GameConstants from "../services/GameConstants.js";

/**
 * SceneObject BasicScene
 *
 * Clase dedicada a optimizar y reducir el código necesario por cada escena que se cree. Se desarrollarán los métodos
 * y eventos necesarios para cambiar de escenas, así como para la creación de elementos triviales como el personaje
 * principal {Daniela}, el tilemap {Tilemap}, etc..
 * @since 0.0.0
 */
class BasicScene extends Phaser.Scene {

    constructor(key) {
        super(key);
        this.key = key.key;
        this.map = null;
    }

    /**
     * Método adaptado según la estructura del proyecto. Si no se van a hacer cambios en la escena es mejor no
     * hacer override.
     *
     * Imprime por consola la escena actual.
     */
    preload() {
        console.log(this.key);
    }

    /**
     * Crea el personaje en la escena actual y añade el Listener para el evento Game Over y Level Finished. Estos eventos
     * serán emitidos por el objeto {Daniela}.
     * 
     * @param scene
     * @param x
     * @param y
     * @returns Daniela
     */
    createDaniela(scene, x, y) {
        this.daniela = new Daniela({
            scene: scene,
            x: x,
            y: y,
            key: GameConstants.Sprites.Daniela.KEY
        }).setScale(2);
        this.daniela.on(GameConstants.Events.GAME_OVER, e => {
            this.reboot(this.daniela.scene);
        });
        this.daniela.on(GameConstants.Events.LEVEL_FINISHED, e => {
            this.changeScene(e.scene, e.target);
        });
        return this.daniela;
    }

    /**
     * Crea el objeto tilemap a partir de la key de la escena obtenida del constructor
     * 
     * @returns {Phaser.Tilemaps.Tilemap}
     */
    createMap() {
        this.map = this.make.tilemap({
            key: this.key
        });
        return this.map;
    }

    /**
     * Reinicia una escena parando tanto animaciones como sonidos.
     * 
     * @param scene
     */
    // TODO: Añadir efecto fade de animación o cualquier otra cosa necesaria en un futuro.
    reboot(scene) {
        scene.sound.stopAll(); // Reinicia los sonidos
        scene.scene.restart(); // Reinicia el resto de elementos
    }


    /**
     * Para la escena que esté corriendo e inicia la que se le pase como objetivo.
     * @param scene
     * @param target
     */
    // TODO: Implementar según necesidades futuras.
    changeScene(scene, target) {
        scene.sound.stopAll();
        scene.scene.stop();
        target.scene.start();
    }

    /**
     * Añade un evento para reproducir la música creada en la escena con un delay por defecto de 2 segundos.
     * 
     * @param music
     * @param delay (milliseconds)
     */
    addEventForMusic(music, delay=2000){
        this.time.addEvent({
            delay: delay,
            callback: () => {
                music.play();
                music.setLoop(true);
            },
            callbackScope: this
        });
    }

    /**
     * Crea el/los GameObject correspondiente a Bats en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createBats(){
        return this.map.createFromObjects(GameConstants.Sprites.Bats.OBJECT_NAME, GameConstants.Sprites.Bats.OBJECT_ID, {key: GameConstants.Sprites.Bats.KEY});
    }

    /**
     * Crea el/los GameObject correspondiente a Wheels en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createWheels(){
        return this.map.createFromObjects(GameConstants.Sprites.Wheel.OBJECT_NAME, GameConstants.Sprites.Wheel.OBJECT_ID, {key: GameConstants.Sprites.Wheel.KEY});
    }

    /**
     * Crea el/los GameObject correspondiente a Bracelets en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createBracelets(){
        return this.map.createFromObjects(GameConstants.Sprites.Bracelet.OBJECT_NAME, GameConstants.Sprites.Bracelet.OBJECT_ID, {key: GameConstants.Sprites.Bracelet.KEY});
    }

    /**
     * Crea la animación en función del nombre del objeto que reciba como parámetro.
     * 
     * @param animationName
     * @param start, default = 0
     * @param end, default = 10
     * @param frameRate, default = 24
     * @param repeat, default = -1 (loop)
     */
    // TODO: Añadir futuras animaciones aquí.
    createAnimation(animationName, start=0, end=10, frameRate=24, repeat=-1){
        switch (animationName) {
            case GameConstants.Anims.BATS:
                this.anims.create({
                    key: GameConstants.Anims.BATS,
                    frames: this.anims.generateFrameNumbers(GameConstants.Sprites.Bats.KEY, {start: start, end: end}),
                    frameRate: frameRate,
                    repeat: repeat
                });
                break;
            case GameConstants.Anims.WHEEL:
                this.anims.create({
                    key: GameConstants.Anims.WHEEL,
                    frames: this.anims.generateFrameNumbers(GameConstants.Sprites.Wheel.KEY, {start: start, end: end}),
                    frameRate: frameRate,
                    repeat: repeat
                });
                break;
            case GameConstants.Anims.BRACELET:
                this.anims.create({
                    key: GameConstants.Anims.BRACELET,
                    frames: this.anims.generateFrameNumbers(GameConstants.Sprites.Bracelet.KEY, {start: start, end: end}),
                    frameRate: frameRate,
                    repeat: repeat
                });
                break;
            default:
                console.error("El nombre de la animación no es válido o no se ha definido aún.")
        }
    }
}

export default BasicScene;
