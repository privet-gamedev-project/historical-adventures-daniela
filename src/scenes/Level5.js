import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";


class Level5 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL5
        });
        this.target = GameConstants.Levels.LEVEL6;
    }

    preload() {
        this.scene.launch('UI');
    }
    
    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.DanielaTroglo);

        //HealthText
        this.createHealthText();

         //ExtraPoints        
         this.createCoins();

        //Parallax Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL5);
        
        
        //FX Soundos
        this.objectPickUpSound = this.sound.add(GameConstants.Sound.BONUSLEVEL.FRUITPICKUP);
        this.powerUpSound = this.sound.add(GameConstants.Sound.BONUSLEVEL.POWERUP);   

        //We did it
        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);
        

        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level5);
        //PRIVATE SCENE ELEMENTS
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(20, this.cameras.main.height - 55, GameConstants.Fonts.PIXEL, this.TG.tr('LEVEL5.MAGICFRUIT') ,10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(5);

        //Tilemap
        this.platformlayer=this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS);
        this.platformlayer.visible= false;
        
        //To make collidable only when comes from up the tile 1 and 2 from this Layer
        let x, y, tile;
        for (x = 0; x < this.platformlayer.width; x++) {
            for (y = 1; y < this.platformlayer.height; y++) {                
                tile = this.platformlayer.getTileAt(x, y);                
                if (tile !== null) {                    
                    if (tile.index == 2 || tile.index == 1) {
                        tile.setCollision(false, false, true, false); //right,left,up,down
                    }
                }
            }
        }


        //OBJECTS COLLECTED
        this.objectsCollected = 2;
        this.objectDelay = false;

        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Landscape', false);
        this.ladderLayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Ladder', false);
        this.stepsLayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Steps', false);
        this.stepsLayer.visible= false;
        this.collideLadder = this.physics.add.collider(this.daniela, this.stepsLayer);

        //STEPS NO Collidable
        let tilestep;
        for (x = 0; x < this.stepsLayer.width; x++) {
            for (y = 1; y < this.stepsLayer.height; y++) {                
                tilestep = this.stepsLayer.getTileAt(x, y);                
                if (tilestep !== null) {                    
                    if (tilestep.index == 2 || tilestep.index == 1) {
                        tilestep.setCollision(false, false, false, false); //right,left,up,down
                    }
                }
            }
        }

        this.stepsLayer.alpha=0; 
        this.ladderLayer.alpha=0; 
        this.ladderOn = false;
        


         //MUSIC and AUDIOS
         this.audioLevel5_LOLO_YouWillHaveToCatch_09 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL5.LOLO_TASK);
         this.addEventForMusic(this.audioLevel5_LOLO_YouWillHaveToCatch_09);
         
         this.audioLevel5_DANIELA_ThatFruitLooksSoGood_10 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL5.DANIELA_FRUITS);
         this.addEventForMusic(this.audioLevel5_DANIELA_ThatFruitLooksSoGood_10,false,3000);
         this.audioLevel5_LOLO_InOrderToCatchTheFruit_11 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL5.LOLO_NOTE);
         this.addEventForMusic(this.audioLevel5_LOLO_InOrderToCatchTheFruit_11,false,9000);

 
         //BSO
         this.music = this.sound.add(GameConstants.Sound.LEVEL5.BSO,{volume: 0.4});
         this.addEventForMusic(this.music, true);

        
        //Create LEAVES
        this.leaves = this.map.createFromObjects('Branches', 'leaves', 'woodsbranches');
        this.physics.world.enable(this.leaves);      
        this.leaves.forEach(function(leave) {            
            leave.body.setAllowGravity(false);
            leave.setDepth(4);
            leave.setTexture('woodsbranches','leaves');
        });  
        

        //Create BRANCH1-4
        for (let i=1;i<=4;i++){
            this.branches = this.map.createFromObjects('Branches', 'branch-0'+i, 'woodsbranches');
            this.physics.world.enable(this.branches);      
            this.branches.forEach(function(branch) {            
                branch.body.setAllowGravity(false);
                branch.setDepth(4);                
                branch.setTexture('woodsbranches','branch-0'+i);
            });  
        }

       
        //Add OLD Treee
        //TODO: Something wrong with the hitArea are
        this.map.findObject('Branches', (d) => {
            if (d.type === 'branch-05') {               
                this.dryBranch = this.add.sprite(d.x,d.y,'woodsbranches','branch-05');
                this.dryBranch.flipX=true;
                this.dryBranch.setScale(2);
                this.physics.world.enable(this.dryBranch);
                this.dryBranch.body.setAllowGravity(false);
                this.dryBranch.body.setSize(200,1);                                
            }
        });


      //Add stone
        this.map.findObject('stone', (d) => {
            if (d.type === 'stone') {               
                this.stone = this.add.sprite(d.x,d.y,GameConstants.Sprites.Stone.KEY);                                
                this.physics.world.enable(this.stone);
                this.stone.body.setAllowGravity(false);   
                this.stone.body.setImmovable(true);                                             
                this.anims.play(GameConstants.Anims.STONE, this.stone);                      
            }
        });
        
      //Add stick
      this.map.findObject('stick', (d) => {
        if (d.type === 'stick') {               
            this.stick = this.add.sprite(d.x,d.y,GameConstants.Sprites.Stick.KEY);                                
            this.physics.world.enable(this.stick);
            this.stick.body.setAllowGravity(false);                            
            this.stick.body.setImmovable(true);                                             
            this.anims.play(GameConstants.Anims.STICK, this.stick);                      
        }
        });
    
      //Add MAgicFruit
      this.map.findObject('magicfruit', (d) => {
        if (d.type === 'magicfruit') {               
            this.magicfruit = this.add.sprite(d.x,d.y,GameConstants.Sprites.MagicFruit.KEY);                                
            this.physics.world.enable(this.magicfruit);
            this.magicfruit.body.setAllowGravity(false);                            
            this.magicfruit.body.setImmovable(true);                                             
            this.anims.play(GameConstants.Anims.MAGICFRUIT, this.magicfruit);                      
        }
        });




    //Overlap with Stone
    this.physics.add.overlap(this.daniela,  this.stone, function (player, object) {                

        if (!this.objectDelay) {
            if (this.objectsCollected > 0) this.objectsCollected--;                
            this.objectDelay = true;

            //this.textFruits.setText(this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);

            this.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function () {
                    object.destroy();                    
                }
            });
            
            this.objectPickUpSound.play();   
            

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.objectDelay = false;
                },
                callbackScope: this
            });
        }

    }, null, this);


    //Overlap with Stone
    this.physics.add.overlap(this.daniela,  this.stick, function (player, object) {

        if (!this.objectDelay) {
            if (this.objectsCollected > 0) this.objectsCollected--;                
            this.objectDelay = true;

            //this.textFruits.setText(this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);

            this.tweens.add({
                targets: object,
                y: object.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function () {
                    object.destroy();                    
                }
            });
            
            this.objectPickUpSound.play();   
            

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.objectDelay = false;
                },
                callbackScope: this
            });
        }

    }, null, this);



    //Overlap with DryBranch the Steps and LAder will be visible and active
    this.physics.add.overlap(this.daniela, this.dryBranch, function (player, object) {
        
        //Only if Stone and Stick are collected
        if (this.objectsCollected >= 0){

            if (!this.objectDelay) {                
                this.objectDelay = true;
    
                //this.textFruits.setText(this.TG.tr('LEVEL3.FRUITS') + " " + this.fruitsCollected);
    
                this.tweens.add({
                    targets: object,
                    y: object.y - 100,
                    alpha: 0,
                    duration: 800,
                    ease: "Cubic.easeOut",
                    callbackScope: this,
                    onComplete: function () {
                        object.destroy();                    
                    }
                });
                
                this.powerUpSound.play();   


                //STEPS Collidable from UP        
                for (x = 0; x < this.stepsLayer.width; x++) {
                    for (y = 1; y < this.stepsLayer.height; y++) {                
                        tilestep = this.stepsLayer.getTileAt(x, y);                
                        if (tilestep !== null) {                    
                            if (tilestep.index == 2 || tilestep.index == 1) {
                                tilestep.setCollision(false, false, true, false); //right,left,up,down
                            }
                        }
                    }
                }
                
                //Steps and Ladder Visible
                this.stepsLayer.alpha=1; 
                this.ladderLayer.alpha=1;
                this.ladderOn = true; 
    
                this.time.addEvent({
                    delay: 600,
                    callback: () => {
                        this.objectDelay = false;
                    },
                    callbackScope: this
                });
            }
    
        }

        }, null, this);
        
        this.physics.add.collider(this.daniela, this.magicfruit, () => {
            this.music.stop();
            this.magicfruit.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();            
            this.daniela.nextScene();
        });
        

    let climb = this.findTransparentObjects('Climb', 'Climb');
    let climbout = this.findTransparentObjects('Climb', 'ClimbOut');
        
    this.physics.add.overlap(this.daniela, climb, this.climbArea, null, this);
    this.physics.add.overlap(this.daniela, climbout, this.climbAreaOut, null, this);

    }

        //Ladder climbing
    climbArea(daniela, area){     
        if (this.ladderOn) {
            daniela.x = area.x;
            daniela.body.setAllowGravity(false);
            daniela.isInLiana = true;
            daniela.body.velocity.x = 0;
            daniela.body.velocity.y = 0;
        }
    }
    
    //Ladder out
    climbAreaOut(daniela,area){          
        if (this.ladderOn) {    
            daniela.y -= 150;        
            daniela.isInLiana = false;        
            daniela.body.setAllowGravity(true);
        }
    }

    update(time, delta) {

        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });

        this.stick.rotation += 0.01;
        this.stone.rotation += 0.01;
        this.magicfruit.rotation += 0.01;


    }


}
export default Level5;