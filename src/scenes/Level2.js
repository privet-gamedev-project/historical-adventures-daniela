import Bats from '../gameObjects/Bats.js';
import Wheels from '../gameObjects/Wheels.js';
import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import ExtraPoints from '../gameObjects/ExtraPoints.js';


class Level2 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL2
        });
        this.target = GameConstants.Levels.MENU;
    }

    preload() {
        this.scene.launch('UI');
    }


    create() {
        this.UIScene = this.scene.get("UI");
                
        //Read Tilemap
        let map = this.createMap();


        // background repeated with the map size
        this.bg = this.add.tileSprite(0, 0,map.widthInPixels,map.heightInPixels, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1.25);


        //Sounds
        //this.soundLEVEL1_LOLO_findBracelet = this.sound.add(GameConstants.Sound.LEVEL1_LOLO_FINDBRACELET);
        //this.soundLEVEL1_LOLO_findBracelet.play();


        this.music = this.sound.add(GameConstants.Sound.CAVEBATS);
        this.addEventForMusic(this.music);


        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LOLO_WE_DID_IT);
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_ROPA_TROGLODITA.toUpperCase(), 16);                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);


        //Text Health        
        this.textHealth = this.add.dynamicBitmapText(30, 20, 'pixel', GameConstants.Texts.VIDAS);        
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(3);

        //TODO: se debería pasar los parámetros 'x' e 'y' de forma dinámica en base al mapa y la posición de inicio
        // algo parecido a lo que se hace con los murciélagos y las ruedas
        //Daniela Creation
        this.daniela = this.createDaniela(this, 100, 100, GameConstants.Sprites.Daniela.KEY);
        this.lolo = this.createLoloNormal(this, this.daniela);
        this.daniela.followedBy(this.lolo);


        //Creating Bats 
        //TODO: Crear Objeto Generico CreateFlyingObjects para usar la misma lógica 
        //en los niveles que lo necesiten
        this.bats = this.createBats(GameConstants.Sprites.Bees.KEY);
        this.batsGroup = new Bats(this.physics.world, this, [], this.bats); 
        //TODO: Pasar el Scale y el FlipX del Sprite, para evitar cambiarlo aquí
        this.batsGroup.children.iterate((bat) => {
            bat.setScale(1);
        });
        this.anims.play(GameConstants.Anims.BEES, this.bats);

        //Creating Wheels
        //TODO: Crear objeto Generico CreateFloorObjects para usar la misma lógica 
        //en los niveles que lo necesiten         
        this.wheels = this.createWheels(GameConstants.Sprites.Snails.KEY);
        this.wheelsGroup = new Wheels(this.physics.world, this, [], this.wheels,50);
        this.wheelsGroup.children.iterate((wheel) => {
            wheel.setScale(1);
        });    
        this.anims.play(GameConstants.Anims.SNAILS, this.wheels);

        //Create CaveManClothes
        this.cavemanclothes = this.createEndLevelObject(GameConstants.Sprites.Cavemen_Clothes.KEY);        
        this.physics.world.enable(this.cavemanclothes);
        this.cavemanclothe = this.cavemanclothes[0];
        this.cavemanclothe.setScale(2.75);
        this.cavemanclothe.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.CAVEMAN_CLOTHES, this.cavemanclothe);


        //Create Joystick
        this.joysticks = this.map.createFromObjects('ActionButton', 'openwall', GameConstants.Sprites.Joystick.KEY);
        this.physics.world.enable(this.joysticks);
        this.joystick = this.joysticks[0];
        this.joystick.setScale(1.5);
        this.joystick.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.JOYSTICK, this.joystick);

        //ExtraPoints        
        this.extraPoints = this.createExtraPoints(GameConstants.Sprites.ExtraPoint.KEY);
        this.extraPointsGroup = new ExtraPoints(this.physics.world, this, [], this.extraPoints);                         
        this.anims.play(GameConstants.Anims.EXTRAPOINT, this.extraPoints);
        
        //EXtraPoints collisions 
        this.physics.add.overlap(this.daniela, this.extraPointsGroup, function(player, object){
            this.daniela.collectExtraPoints(this.extraPointsGroup, object);
        }, null, this);

        //Tilemap
        let level2Tile = map.addTilesetImage(GameConstants.Tiles.FOREST_PACK);
        let Level2 = map.createDynamicLayer(GameConstants.Layers.WORLD, level2Tile, 0, 0);
        Level2.setCollisionByExclusion([-1]);
        let Level2Landscape = map.createDynamicLayer('Landscape', level2Tile, 0, 0);
        let Wall =  map.createDynamicLayer('Wall', level2Tile, 0, 0);
        Wall.setCollisionByExclusion([-1]);

         //Colliders
        this.colliderWall = this.physics.add.collider(this.daniela, Wall);
        this.colliderWall2 = this.physics.add.collider(this.batsGroup, Wall);
        this.colliderWall3 = this.physics.add.collider(this.wheelsGroup, Wall);
        this.physics.add.collider(this.daniela, this.joystick, () => {
            this.joystick.destroy();   
            this.colliderWall.destroy();         
            this.colliderWall2.destroy();         
            this.colliderWall3.destroy();         
            Wall.alpha=0;   
        });

        
         
        this.physics.add.collider(this.daniela, Level2);
        this.physics.add.collider(this.batsGroup, Level2);
        this.physics.add.collider(this.wheelsGroup, Level2);
        this.physics.add.collider(this.daniela, this.cavemanclothe, () => {
            //this.scene.pause();
            this.music.stop();
            this.cavemanclothe.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();
            console.log('Daniela encuentra pulsera magica');
            this.daniela.nextScene();
        });
        this.physics.add.overlap(this.daniela, this.bats, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con murciélago');
        });
        this.physics.add.overlap(this.daniela, this.wheels, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con ruedas');
        });


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
    }

    update(time, delta) {
        this.daniela.update(time,delta);
        this.batsGroup.update();
        this.wheelsGroup.update();
    }
}
export default Level2;