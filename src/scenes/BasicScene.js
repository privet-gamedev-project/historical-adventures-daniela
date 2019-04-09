import Daniela from "../player/Daniela.js";
import Lolo from "../gameObjects/Lolo.js";
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
    createDaniela(scene, x, y, spriteKey) {

        //Establece nivel actual el último nivel jugado
        this.DB = store.get('gamedata');        
        this.DB.currentLevel = this.key;        
        store.set('gamedata', this.DB);

        //Crear Daniela
        this.daniela = new Daniela({
            scene: scene,
            x: x,
            y: y,
            key:  spriteKey
        }).setScale(2);
        this.daniela.on(GameConstants.Events.GAME_OVER, e => {
            this.changeScene(this.daniela.scene, GameConstants.Levels.MENU, 2000);
        });
        //Evento paso de Nivel
        this.daniela.on(GameConstants.Events.LEVEL_FINISHED, e => {
            this.showScores(this.daniela);            
        });

        //Evento de Vuelve al Menu    
        this.registry.events.on(GameConstants.Events.MENU, e => {
            this.changeScene(this.daniela.scene,GameConstants.Levels.MENU, 0);
        });

        //Eventos de Controles
        this.registry.events.on('controlLeftON', e => {
            this.daniela.animControl.left = true;
        });

        this.registry.events.on('controlLeftOFF', e => {
            this.daniela.animControl.left = false;
        });

        this.registry.events.on('controlRightON', e => {
            this.daniela.animControl.right = true;
        });

        this.registry.events.on('controlRightOFF', e => {
            this.daniela.animControl.right = false;
        });

        this.registry.events.on('controlJumpON', e => {
            this.daniela.animControl.jump = true;
        });

        this.registry.events.on('controlJumpOFF', e => {
            this.daniela.animControl.jump = false;
        });



        return this.daniela;
    }

    /**
     * Crea el personaje del Loro LOLO. 
     * Que sigue a Daniela
     * 
     * @param scene     
     * @param daniela
     * @returns Lolo
     */
    createLoloNormal(scene, daniela) {
        this.lolo = new Lolo({
            scene: scene,
            x: daniela.x - 50,
            y: daniela.y - 50,
            key: GameConstants.Sprites.Lolo_Normal.KEY
        }).setScale(1);


        return this.lolo;
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
        //Los bordes del mundo serán las dimensiones del mapa cargado
        this.physics.world.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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
     * @miliseconds miliseconds
     */
    // TODO: Implementar scene.scene.transition
    changeScene(scene, target, miliseconds) {
        if (scene) {
            scene.physics.pause();
            this.time.addEvent({
                delay: miliseconds,
                callback: () => {
                    //Quitamos el UI si existe            
                    if (scene.UIScene) {
                        scene.UIScene.scene.stop();
                    };
                    scene.cameras.main.fade(700, 0, 0, 0);
                    scene.cameras.main.on('camerafadeoutcomplete', () => {                        
                        scene.sound.stopAll();
                        scene.scene.stop();
                        scene.scene.start(target);
                    });
                },
                callbackScope: this
            });
        }
    }

    /**
     * Añade un evento para reproducir la música creada en la escena con un delay por defecto de 2 segundos.
     * 
     * @param music
     * @param delay (milliseconds)
     */
    addEventForMusic(music, delay = 2000) {
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
    createBats(spriteKey) {
        return this.map.createFromObjects(GameConstants.Sprites.Bats.OBJECT_NAME, GameConstants.Sprites.Bats.OBJECT_ID, {
            key: spriteKey 
        });
    }

    /**
     * Crea el/los GameObject correspondiente a Wheels en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createWheels(spriteKey) {
        return this.map.createFromObjects(GameConstants.Sprites.Wheel.OBJECT_NAME, GameConstants.Sprites.Wheel.OBJECT_ID, {
            key: spriteKey
        });
    }

    
    createExtraPoints(spriteKey) {
        return this.map.createFromObjects('ExtraPoints', 'extrapoint', {
            key: spriteKey
        });
    }
        /**
     * Crea el/los GameObject correspondiente al nivel 4 en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createLianas(){
        return this.map.createFromObjects(GameConstants.Sprites.Lianas.OBJECT_NAME, GameConstants.Sprites.Lianas.OBJECT_ID, {key: GameConstants.Sprites.Lianas.KEY});
    }
    createEndOfLianas(){
        return this.map.createFromObjects(GameConstants.Sprites.EndOfLianas.OBJECT_NAME, GameConstants.Sprites.EndOfLianas.OBJECT_ID, {key: GameConstants.Sprites.EndOfLianas.KEY});
    }
    createCrocodile(){
        return this.map.createFromObjects(GameConstants.Sprites.Crocodile.OBJECT_NAME, GameConstants.Sprites.Crocodile.OBJECT_ID, {key: GameConstants.Sprites.Crocodile.KEY});
    }

    /**
     * Crea el/los GameObject correspondiente a EndLevelObject en base al mapa que se ha cargado con la escena actual.
     * 
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createEndLevelObject(objectKey) {
        return this.map.createFromObjects(GameConstants.Sprites.EndLevel.OBJECT_NAME, GameConstants.Sprites.EndLevel.OBJECT_ID, {
            key: objectKey
        });
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
    createAnimation(animationName, start = 0, end = 10, frameRate = 24, repeat = -1) {
        switch (animationName) {
            // case GameConstants.Anims.BRACELET:
            //     this.anims.create({
            //         key: GameConstants.Anims.BRACELET,
            //         frames: this.anims.generateFrameNumbers(GameConstants.Sprites.Bracelet.KEY, {start: start, end: end}),
            //         frameRate: frameRate,
            //         repeat: repeat
            //     });
            //     break;
            default:
                console.error("El nombre de la animación no es válido o no se ha definido aún.")
        }
    }

    showScores(){        
        this.daniela.scene.physics.pause();

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;
        
        //Ceros a la izquiera de la puntuacion
        const score = Phaser.Utils.String.Pad(parseInt(this.daniela.secondsLevel*this.daniela.health) + this.daniela.extraPoints , 6, 0, 1);
        
        
        
        
        //Num de estrellas
        //Estrella 1 Si 3 Vidas
        const star1show = (this.daniela.health==3)?true:false;
        //Estrella 2 Si ExtraPoint > 30 
        const star2show = (this.daniela.extraPoints>=30)?true:false;
        //Estrella 3 Si Segundos > 420
        const star3show = (this.daniela.secondsLevel>=480)?true:false;

        let numstars = 0;
        if (star1show) numstars++;
        if (star2show) numstars++;
        if (star3show) numstars++;

        //Graba en BD local Store
        //TODO: Guardar maxLevel
        // Preparar Gestion generalizada para todos los level
        //this.DB = store.get('gamedata');        
        this.DB.currentLevel = this.key;        
        this.DB.worlds[this.key].score = score;
        this.DB.worlds[this.key].stars = numstars;
        this.DB.worlds[this.key].completed = true;
        store.set('gamedata', this.DB);

        //SCORES
        const scoreLabel = this.daniela.scene.add.dynamicBitmapText(this.width/2-100, (this.height/2)-150, 'pixel', 'SCORE:' + score,24)
            .setScrollFactor(0).setDepth(10).setTint(0xFFFF00);               
        
        this.LevelUpmusic = this.sound.add(GameConstants.Sound.LEVELUP);
        this.LevelUpmusic.play();

        
        //STARTS
        //TODO: Cada estrella en función de los retos        
        const star1 = this.add.image((this.width/2)-300, this.height+100 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0.3);      

        if (numstars>=1) star1.setAlpha(1);         
        
        const tween = this.tweens.add({
            targets: star1,
            x: '+=100',
            y: '-= ' + ((this.height/2)+200) ,
            duration: 500,
            ease: 'Power3'
        });


        const star2 = this.add.image((this.width/2), this.height+100 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0.3);              

        if (numstars>=2) star2.setAlpha(1);        
        
        const tween2 = this.tweens.add({
            targets: star2,
            x: '+=0',
            y: '-= ' + ((this.height/2)+200) ,
            duration: 500,
            ease: 'Power3'
        });

        const star3 = this.add.image((this.width/2)+300, this.height+100 , GameConstants.Sprites.Star.KEY)
            .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(0.3);              
        
        if (numstars>=3) star3.setAlpha(1);         
        
        const tween3 = this.tweens.add({
            targets: star3,
            x: '-=100',
            y: '-= ' + ((this.height/2)+200) ,
            duration: 500,
            ease: 'Power3'
        });



        const menuLabel = this.daniela.scene.add.dynamicBitmapText((this.width/2)-100, (this.height)-200, 'pixel', 'MENU' ,24).setScrollFactor(0).setDepth(10).setTint(0xFFFF00);        
        menuLabel.setInteractive();
        menuLabel.on('pointerdown', () => { 
            this.changeScene(this.daniela.scene,GameConstants.Levels.MENU, 0);
        });

        const nextLevelLabel = this.daniela.scene.add.dynamicBitmapText((this.width/2)+100, (this.height)-200, 'pixel', 'NEXT' ,24).setScrollFactor(0).setDepth(10).setTint(0xFFFF00);        
        nextLevelLabel.setInteractive();

        nextLevelLabel.on('pointerdown', () => { 
            this.changeScene(this.daniela.scene, this.daniela.scene.target, 500);
        });
        
    }

}

export default BasicScene;