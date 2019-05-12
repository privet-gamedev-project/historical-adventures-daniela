import Daniela from "../player/Daniela.js";
import Lolo from "../gameObjects/Lolo.js";
import GameConstants from "../services/GameConstants.js";
import FlyingEnemy from "../gameObjects/FlyingEnemy.js";
import FloorEnemy from "../gameObjects/FloorEnemy.js";
import ExtraPoints from "../gameObjects/ExtraPoints.js";
import Invisible from "../gameObjects/Invisible.js";


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
        //Variables accesibles desde una clase hija
        this.map = null;
        this.bg = null;
        this.lolo = null;
        this.daniela = null;
        this.bats = [];
        this.bees = [];
        this.wheels = [];
        this.crocodiles = [];
        this.snails = [];
        this.sodas = [];
        this.donuts = [];
        this.enemyGroups = {};
        this.extraPoints = [];
        this.extraPointsGroup;
        this.levelTiles = [];
        this.levelLayers = [];
        this.textHealth;
    }

    /**
     * Precarga el {@link GameConstants.Levels.UI}
     *
     * Imprime por consola la escena actual.
     */
    preload() {
        console.log(this.key);
        this.scene.launch(GameConstants.Levels.UI,{scene:this.key});
    }

    /**
     *  Busca a el objeto {@lnk Daniela} en el mapa y crea el personaje en la escena actual. Además, añade los evenos necesarios para el control de {@link Daniela}.
     *  Si no había un mapa inicializado previamente, éste se creará en función a {@link GameConstants.Levels} del constructor inicial.
     *
     * @param costume - Imagen del sprite que mostrará el personaje {Daniela} . (Default = {GameConstants.Sprites.Daniela.KEY})
     * @param createLolo - Condición por la cual creará al personaje lolo automáticamente (Default = true)
     * @param createMap - Condicion para crear el mapa si previamente no se ha llamado a {@method createMap()}
     * @param cameraFollow - Inidica si la camara seguirá a Daniela o no (default = true).
     */
    createDaniela(costume = GameConstants.Sprites.Daniela.KEY, createLolo = true, createMap = true, cameraFollow = true) {
        //Establece nivel actual el último nivel jugado
        this.DB = store.get(GameConstants.DB.DBNAME);
        this.DB.currentLevel = this.key;
        store.set(GameConstants.DB.DBNAME, this.DB);

        //Crea el mapa
        if (createMap) {
            this.createMap();
        }

        //Busca el objeto daniela en el map
        this.map.findObject(GameConstants.Sprites.Daniela.KEY, (d) => {
            if (d.type === GameConstants.Sprites.Daniela.KEY) {
                //Crear Daniela
                this.daniela = new Daniela({
                    scene: this,
                    x: d.x,
                    y: d.y,
                    key: costume
                }).setScale(2);
                this.daniela.on(GameConstants.Events.GAME_OVER, () => {
                    this.changeScene(this.daniela.scene, GameConstants.Levels.MENU, 2000);
                });
                //Evento paso de Nivel
                this.daniela.on(GameConstants.Events.LEVEL_FINISHED, () => {
                    this.showScores();
                });

                //Evento de Vuelve al Menu    
                this.registry.events.on(GameConstants.Events.MENU, () => {
                    this.changeScene(this.daniela.scene, GameConstants.Levels.MENU, 0);
                });

                //Eventos de Controles
                this.registry.events.on('controlLeftON', () => {
                    this.daniela.animControl.left = true;
                });

                this.registry.events.on('controlLeftOFF', () => {
                    this.daniela.animControl.left = false;
                });

                this.registry.events.on('controlRightON', () => {
                    this.daniela.animControl.right = true;
                });

                this.registry.events.on('controlRightOFF', () => {
                    this.daniela.animControl.right = false;
                });

                this.registry.events.on('controlJumpON', () => {
                    this.daniela.animControl.jump = true;
                });

                this.registry.events.on('controlJumpOFF', () => {
                    this.daniela.animControl.jump = false;
                });

                this.registry.events.on('controlDownON', () => {
                    this.daniela.animControl.down = true;
                });

                this.registry.events.on('controlDownOFF', () => {
                    this.daniela.animControl.down = false;
                });

                if (createLolo) {
                    this.createLoloNormal(this.daniela);
                }
                return this.daniela;
            } else {
                console.error("No se ha encontrado a daniela en el tilemap");
            }
        });

        if (cameraFollow) {
            this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
            this.cameras.main.startFollow(this.daniela);
        }

    }

    /**
     * Crea el personaje del Loro LOLO que sigue a Daniela. Por defecto, este personaje se crea al llamar a {@method createDaniela()},
     * por lo que no es necesario llamar a esta funcion si se ha usado la anterior.
     *
     * @param daniela - Objetivo a seguir. (Default {@link Daniela})
     * @returns {Lolo}
     */
    createLoloNormal(daniela = this.daniela) {
        this.lolo = new Lolo({
            scene: this,
            x: daniela.x - 50,
            y: daniela.y - 50,
            key: GameConstants.Sprites.Lolo_Normal.KEY
        }).setScale(1);
        this.daniela.followedBy(this.lolo);
        return this.lolo;
    }

    /**
     * Crea el objeto tilemap a partir de la key de la escena obtenida del constructor. Añade los límites a la escena en función del tamaño del mapa.
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
     * Busca en el mapa los enemigos en función del nombre de la capa y genera el grupo de objetos idénticos.
     *
     * @param objectName - Nombre de la capa en Tiled
     * @param objectId - Nombre del objeto.
     * @param spriteKey - Referencia a la imagen del sprite
     *
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createEnemies(objectName, objectId, spriteKey) {
        return this.map.createFromObjects(objectName, objectId, {
            key: spriteKey
        });
    }

    /**
     * Examina el conjunto de capas de enemigos de una escena {@Link GameConstants.Enemies_Layers} para crearlos en su
     * grupo correspondiente. Añadirá por defecto overlap con dicho grupo.
     *
     * @param enemyLayerLevel - Nombre de la capa en Tiled donde buscará los enemigos.
     * @param overlapWithDaniela - Activará el overlap con {@Link Daniela} y el grupo de enemigos. (Default = true)
     */
    findAndLoadEnemiesFromMap(enemyLayerLevel, overlapWithDaniela = true) {
        Object.keys(enemyLayerLevel).forEach(enemy => {
            switch (enemyLayerLevel[enemy]) {
                case GameConstants.Sprites.Bats.OBJECT_NAME:
                    this.bats = this.createEnemies(GameConstants.Sprites.Bats.OBJECT_NAME, GameConstants.Sprites.Bats.OBJECT_ID, GameConstants.Sprites.Bats.KEY);
                    this.enemyGroups.batsGroup = new FlyingEnemy(this.physics.world, this, [], this.bats);
                    this.anims.play(GameConstants.Anims.BATS, this.bats);
                    break;
                case GameConstants.Sprites.Wheel.OBJECT_NAME:
                    this.wheels = this.createEnemies(GameConstants.Sprites.Wheel.OBJECT_NAME, GameConstants.Sprites.Wheel.OBJECT_ID, GameConstants.Sprites.Wheel.KEY);
                    this.enemyGroups.wheelsGroup = new FloorEnemy(this.physics.world, this, [], this.wheels, 100);
                    this.anims.play(GameConstants.Anims.WHEEL, this.wheels);
                    break;
                case GameConstants.Sprites.Bees.OBJECT_NAME:
                    this.bees = this.createEnemies(GameConstants.Sprites.Bees.OBJECT_NAME, GameConstants.Sprites.Bees.OBJECT_ID, GameConstants.Sprites.Bees.KEY);
                    this.enemyGroups.beesGroup = new FlyingEnemy(this.physics.world, this, [], this.bees);
                    this.enemyGroups.beesGroup.children.iterate(b => b.setScale(1));
                    this.anims.play(GameConstants.Anims.BEES, this.bees);
                    break;
                case GameConstants.Sprites.Snails.OBJECT_NAME:
                    this.snails = this.createEnemies(GameConstants.Sprites.Snails.OBJECT_NAME, GameConstants.Sprites.Snails.OBJECT_ID, GameConstants.Sprites.Snails.KEY);
                    this.enemyGroups.snailsGroup = new FloorEnemy(this.physics.world, this, [], this.snails, 100);
                    this.enemyGroups.snailsGroup.children.iterate(s => s.setScale(1));
                    this.anims.play(GameConstants.Anims.SNAILS, this.snails);
                    break;
                case GameConstants.Sprites.Soda.OBJECT_NAME:
                    this.sodas = this.createEnemies(GameConstants.Sprites.Soda.OBJECT_NAME, GameConstants.Sprites.Soda.OBJECT_ID, GameConstants.Sprites.Soda.KEY);
                    this.enemyGroups.sodasGroup = new FlyingEnemy(this.physics.world, this, [], this.sodas);
                    this.enemyGroups.sodasGroup.children.iterate(s => s.setScale(1));
                    this.anims.play(GameConstants.Anims.SODAS, this.sodas);
                    break;
                case GameConstants.Sprites.Donut.OBJECT_NAME:
                    this.donuts = this.createEnemies(GameConstants.Sprites.Donut.OBJECT_NAME, GameConstants.Sprites.Donut.OBJECT_ID, GameConstants.Sprites.Donut.KEY);
                    this.enemyGroups.donutsGroup = new FloorEnemy(this.physics.world, this, [], this.donuts, 75);
                    this.enemyGroups.donutsGroup.children.iterate(d => d.setScale(1));
                    this.anims.play(GameConstants.Anims.DONUT, this.donuts);
                    break;
                case GameConstants.Sprites.Crocodile.OBJECT_NAME:
                    this.crocodiles = this.createEnemies(GameConstants.Sprites.Crocodile.OBJECT_NAME, GameConstants.Sprites.Crocodile.OBJECT_ID, GameConstants.Sprites.Crocodile.KEY);
                    this.enemyGroups.crocodilesGroup = new FlyingEnemy(this.physics.world, this, [], this.crocodiles);
                    this.enemyGroups.crocodilesGroup.children.iterate(c => {
                        c.setScale(1);
                        c.body.setSize(90, 16)
                    });
                    this.anims.play(GameConstants.Anims.CROCODILE, this.crocodiles);
                    break;
                case GameConstants.Sprites.Dinowater.OBJECT_NAME:
                    this.dinowaters = this.createEnemies(GameConstants.Sprites.Dinowater.OBJECT_NAME, GameConstants.Sprites.Dinowater.OBJECT_ID, GameConstants.Sprites.Dinowater.KEY);
                    this.enemyGroups.dinowatersGroup = new FloorEnemy(this.physics.world, this, [], this.dinowaters, 40);
                    this.anims.play(GameConstants.Anims.DINOWATER, this.dinowaters);
                    break;
                case GameConstants.Sprites.Dinobird.OBJECT_NAME:
                    this.dinobirds = this.createEnemies(GameConstants.Sprites.Dinobird.OBJECT_NAME, GameConstants.Sprites.Dinobird.OBJECT_ID, GameConstants.Sprites.Dinobird.KEY);
                    this.enemyGroups.dinobirds = new FlyingEnemy(this.physics.world, this, [], this.dinobirds);
                    this.anims.play(GameConstants.Anims.DINOBIRD, this.dinobirds);
                    break;
                default:
                    console.warn("La capa de enemigos " + enemyLayerLevel[enemy] + " no se en cuentra entre los disponibles. Añádela al switch para poder usarla.");
            }

            if (overlapWithDaniela) {
                Object.keys(this.enemyGroups).forEach(enemyGroup => {
                    this.physics.add.overlap(this.daniela, this.enemyGroups[enemyGroup], () => {
                        this.daniela.enemyCollision();
                    });

                });
            }
        });
        console.log("Se han creado los siguientes grupos de enemigos:");
        console.log(this.enemyGroups);
    }

    /**
     * Busca rectángulos transparentes en la capa dada y genera colisiones con el jugador y enemigos.
     *
     * @param layerName - Nombre de la capa en Tiled
     * @param objectName - Nombre del objeto en Tiled
     * @param hitDaniela - Condición por la cual hará overlap con daniela y restará vida (Default = false).
     * @param collisionWithEnemies - Condición por la cual hará collider con los enemigos y estos se comportarán según su lógica de colisiones (Default = false)
     *
     * @returns {Phaser.Physics.Arcade.StaticGroup}
     */
    findTransparentObjects(layerName, objectName, hitDaniela = false, collisionWithEnemies = false) {
        let group = this.physics.add.staticGroup();
        this.map.findObject(layerName, obj => {
            if (obj.name === objectName) {
                group.add(new Invisible(this, obj.x, obj.y, obj.width, obj.height, obj.type));
            }
        });
        if (hitDaniela) {
            this.physics.add.overlap(this.daniela, group, () => {
                this.daniela.enemyCollision();
            });
        }
        if (collisionWithEnemies) {
            Object.keys(this.enemyGroups).forEach(enemyGroup => {
                this.physics.add.collider(group, this.enemyGroups[enemyGroup]);
            });
        }
        return group;
    }

    /**
     * Busca en el mapa los elementos de la capa {@link GameConstants.Sprites.ExtraPoint.OBJECT_NAME} necesarios para la puntuación.
     *
     * @param spriteKey - Nombre del sprite que usara este objeto. (Default = {@link GameConstants.Sprites.ExtraPoint.KEY})
     */
    createCoins(spriteKey = GameConstants.Sprites.ExtraPoint.KEY) {
        this.extraPoints = this.createEnemies(GameConstants.Sprites.ExtraPoint.OBJECT_NAME, GameConstants.Sprites.ExtraPoint.OBJECT_ID, spriteKey);
        this.extraPointsGroup = new ExtraPoints(this.physics.world, this, [], this.extraPoints);
        this.anims.play(GameConstants.Anims.EXTRAPOINT, this.extraPoints);
        this.physics.add.overlap(this.daniela, this.extraPointsGroup, function (player, object) {
            this.daniela.collectExtraPoints(this.extraPointsGroup, object);
        }, null, this);
        //  console.log(this.extraPoints);
        //  console.warn(this.extraPointsGroup)
    }

    /**
     * Crea el background en función de la textura recibida como parámetro.
     *
     * @param texture - Key del Background en {@link GameConstants.Textures}
     * @param x - Posición X inicial del Background
     * @param y - Posición Y inicial del Background
     * @param width - Ancho del Background (default = 2560)
     * @param height - Alto del Background (default = 1400)
     * @param scale - Array con valores x e y para el escalado del Background
     * @param scale.x - Escalado horizontal del Background (default = 0)
     * @param scale.y - Escalado horizontal del Background (default = 0)
     * @param origin - Array con valores x e y para empezar a pintar el Background
     * @param origin.x - Valor horizontal desde el que empieza a pintar el Background. Rango de 0 a 1 siendo 0 el valor más a la izquierda en pantalla (default = 0)
     * @param origin.y - Valor vertical desde el que empieza a pintar el Background. Rango de 0 a 1 siendo 0 el valor más a la izquierda en pantalla (default = 0)
     *
     */
    createBackground(texture, x = 0, y = 0, width = 2560, height = 1400, scale = {
        x: 0,
        y: 0
    }, origin = {
        x: 0,
        y: 0
    }) {
        this.bg = this.add.tileSprite(x, y, width, height, texture).setOrigin(origin.x, origin.y).setScale(scale.x, scale.y);
    }

    /**
     * Crea el background repetitivo en función de la textura recibida como parámetro.
     *
     * @param texture - Key del Background en {@link GameConstants.Textures}
     * @param x - Posición X inicial del Background
     * @param y - Posición Y inicial del Background
     * @param scale - Array con valores x e y para el escalado del Background
     * @param scale.x - Escalado horizontal del Background (default = 0)
     * @param scale.y - Escalado horizontal del Background (default = 0)
     * @param origin - Array con valores x e y para empezar a pintar el Background
     * @param origin.x - Valor horizontal desde el que empieza a pintar el Background. Rango de 0 a 1 siendo 0 el valor más a la izquierda en pantalla (default = 0)
     * @param origin.y - Valor vertical desde el que empieza a pintar el Background. Rango de 0 a 1 siendo 0 el valor más a la izquierda en pantalla (default = 0)
     *
     */
    createRepeatedBackground(texture, x = 0, y = 0, scale = {
        x: 1,
        y: 1
    }, origin = {
        x: 0,
        y: 0
    }) {
        this.bg = this.add.tileSprite(x, y, this.map.widthInPixels, this.map.heightInPixels, texture).setOrigin(origin.x, origin.y).setScale(scale.x, scale.y);
    }

    /**
     * Método para la creación de capas de "Mundo" de forma dinámica. Por defecto, éstas harán collision con los objetos de la escena.
     *
     * @param tileSet - Nombre del Tile {@Link GameConstants.Tiles} a generar. Corresponde al nombre que se le ha dado al tileset en Tiled.
     * @param dynamicLayer - Nombre de la capa en Tiled
     * @param collisionWithPlayerAndEnemies - Colisiones con enemigos y jugador (Default = true)
     *
     * @returns Phaser.Tilemaps. DynamicTilemapLayer
     */
    paintLayerAndCreateCollision(tileSet, dynamicLayer = GameConstants.Layers.WORLD, collisionWithPlayerAndEnemies = true) {        
        this.levelTiles[this.levelTiles.length] = this.map.addTilesetImage(tileSet);
        let level = this.levelTiles[this.levelTiles.length - 1];
        this.levelLayers[this.levelLayers.length] = this.map.createDynamicLayer(dynamicLayer, level, 0, 0);
        let levelLayer = this.levelLayers[this.levelLayers.length - 1];
        levelLayer.setCollisionByExclusion([-1]);
        if (collisionWithPlayerAndEnemies) {
            this.physics.add.collider(this.daniela, levelLayer);
            Object.keys(this.enemyGroups).forEach(enemyGroup => {
                this.physics.add.collider(this.enemyGroups[enemyGroup], levelLayer);
            });
        }
        return levelLayer;
    }

    /**
     * Genera el texto para las vidas
     *
     * @param x - Posición horizontal
     * @param y - Posición vertical
     * @param font - Fuente para las letras
     * @param toTranslate - Texto básico ("Vidas")
     * @param scrollFactor
     * @param depth
     */
    createHealthText(x = 20, y = 20, font = 'pixel', toTranslate = 'COMMONTEXT.LIVES', scrollFactor = 0, depth = 3) {
        //Text Health
        this.textHealth = this.add.dynamicBitmapText(x, y, font, this.TG.tr(toTranslate));
        this.textHealth.setScrollFactor(scrollFactor);
        this.textHealth.setDepth(depth);
        this.textHealth.setText(this.TG.tr(toTranslate) + this.daniela.health)
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
            this.levelTiles = [];
            scene.physics.pause();
            this.time.addEvent({
                delay: miliseconds,
                callback: () => {
                    //Quitamos el UI si existe            
                    if (this.scene.get("UI")) {
                        this.scene.get("UI").scene.stop();
                    }
                    scene.cameras.main.fade(700, 0, 0, 0);
                    scene.cameras.main.on('camerafadeoutcomplete', () => {
                        //if next level is in the menu levels
                        //and if is menu main and don't come from these 
                        //then stop music
                        console.log((target!=GameConstants.Levels.LEVELSELECT && 
                            target!=GameConstants.Levels.SCORES &&
                            target!=GameConstants.Levels.SETTINGSLEVEL && 
                            target!=GameConstants.Levels.CREDITS) &&
                            (target==GameConstants.Levels.MENU && 
                                (scene.key!=GameConstants.Levels.LEVELSELECT && 
                                scene.key!=GameConstants.Levels.SCORES &&
                                scene.key!=GameConstants.Levels.SETTINGSLEVEL &&
                                scene.key!=GameConstants.Levels.CREDITS)
                            ));

                        if ( 
                            ( (target!=GameConstants.Levels.LEVELSELECT && 
                            target!=GameConstants.Levels.SCORES &&
                            target!=GameConstants.Levels.SETTINGSLEVEL && 
                            target!=GameConstants.Levels.CREDITS) &&
                            (target==GameConstants.Levels.MENU && 
                                (scene.key!=GameConstants.Levels.LEVELSELECT && 
                                scene.key!=GameConstants.Levels.SCORES &&
                                scene.key!=GameConstants.Levels.SETTINGSLEVEL &&
                                scene.key!=GameConstants.Levels.CREDITS)
                            )) || (scene.key==GameConstants.Levels.LEVELSELECT && target!=GameConstants.Levels.MENU) 
                            || (target==GameConstants.Levels.INTROSTORY)
                            ) {
                            scene.sound.stopAll();
                        }

                        scene.scene.stop();
                        scene.scene.start(target, {from:scene.key});
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
    addEventForMusic(music, loop = false, delay = 0) {
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (this.DB.sound) {
            this.time.addEvent({
                delay: delay,
                callback: () => {
                    music.play();
                    music.setLoop(loop);
                },
                callbackScope: this
            });
        }
    }

    /**
     * Crea los objetos {@Link Lianas} disponibles en el mapa.
     *
     * @returns {*|Phaser.GameObjects.Sprite[]|Phaser.GameObjects.Sprite[]}
     */
    createLianas() {
        return this.map.createFromObjects(GameConstants.Sprites.Lianas.OBJECT_NAME, GameConstants.Sprites.Lianas.OBJECT_ID, {
            key: GameConstants.Sprites.Lianas.KEY
        });
    }

    createEndOfLianas() {
        return this.map.createFromObjects(GameConstants.Sprites.EndOfLianas.OBJECT_NAME, GameConstants.Sprites.EndOfLianas.OBJECT_ID, {
            key: GameConstants.Sprites.EndOfLianas.KEY
        });
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

    showScores() {
        this.daniela.scene.physics.pause();

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;

        //Ceros a la izquiera de la puntuacion
        const score = Phaser.Utils.String.Pad(parseInt(this.daniela.secondsLevel * this.daniela.health) + this.daniela.extraPoints, 6, '0', 1);

        //Num de estrellas
        //Estrella 1 Si 3 Vidas
        const star1show = this.daniela.health === 3;
        //Estrella 2 Si ExtraPoint > 30 
        const star2show = this.daniela.extraPoints >= 30;
        //Estrella 3 Si Segundos > 420
        const star3show = this.daniela.secondsLevel >= 480;

        let numstars = 0;
        if (star1show) numstars++;
        if (star2show) numstars++;
        if (star3show) numstars++;

        //Graba en BD local Store
        //TODO: Guardar maxLevel
        // Preparar Gestion generalizada para todos los level
        this.DB = store.get(GameConstants.DB.DBNAME);
        this.DB.currentLevel = this.key;
        if (score > this.DB.worlds[this.key].score) {
            this.DB.worlds[this.key].score = score;
        }
        if (numstars > this.DB.worlds[this.key].stars) {
            this.DB.worlds[this.key].stars = numstars;
        }
        this.DB.worlds[this.key].completed = true;
        store.set(GameConstants.DB.DBNAME, this.DB);

        //SCORES
        const scoreLabel = this.daniela.scene.add.dynamicBitmapText(this.width / 2 - 100, (this.height / 2) - 150, 'pixel', 'SCORE:' + score, 24)
            .setScrollFactor(0).setDepth(10).setTint(0xFFFF00);

        this.LevelUpmusic = this.sound.add(GameConstants.Sound.SOUNDS.LEVELUP);
        this.LevelUpmusic.play();


        //STARTS
        //TODO: Cada estrella en función de los retos
        for (let i = 1; i <= 3; i++) {
            let star = this.add.image((this.width / 2) - 300, this.height + 100, GameConstants.Sprites.Star.KEY)
                .setScrollFactor(0).setDepth(10).setOrigin(0).setAlpha(numstars >= i ? 1 : 0.3);
            this.tweens.add({
                targets: star,
                x: 200 * i,
                y: '-= ' + ((this.height / 2) + 200),
                duration: 500,
                ease: 'Power3'
            });
        }

        const menuLabel = this.daniela.scene.add.dynamicBitmapText((this.width / 2) - 100, (this.height) - 200, 'pixel', 'MENU', 24).setScrollFactor(0).setDepth(10).setTint(0xFFFF00);
        menuLabel.setInteractive();
        menuLabel.on('pointerdown', () => {
            this.changeScene(this.daniela.scene, GameConstants.Levels.MENU, 0);
        });

        const nextLevelLabel = this.daniela.scene.add.dynamicBitmapText((this.width / 2) + 100, (this.height) - 200, 'pixel', 'NEXT', 24).setScrollFactor(0).setDepth(10).setTint(0xFFFF00);
        nextLevelLabel.setInteractive();

        nextLevelLabel.on('pointerdown', () => {
            this.changeScene(this.daniela.scene, this.daniela.scene.target, 500);
        });

    }

}

export default BasicScene;