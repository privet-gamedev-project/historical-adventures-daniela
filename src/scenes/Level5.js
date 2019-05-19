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

        //Parallax Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL5);
        
        //BSO
        this.music = this.sound.add(GameConstants.Sound.BONUSLEVEL.BSO, {volume: 0.5});
        this.addEventForMusic(this.music,true);


        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level5);
        //PRIVATE SCENE ELEMENTS
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //ExtraPoints        
        //this.createCoins();
        //HealthText
        //this.createHealthText();
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


        
        this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Landscape', false);
        this.ladderLayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Ladder', false);
        this.stepsLayer = this.paintLayerAndCreateCollision(GameConstants.Tiles.WOODS, 'Steps', false);
        this.stepsLayer.visible= false;
        this.collideLadder = this.physics.add.collider(this.daniela, this.stepsLayer);

        //STEPS Collidable from UP
        let tilestep;
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

        


        //PRIVATE SCENE ELEMENTS
        /*let wall =  this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK, 'Wall');
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);
        */

        //MUSIC and AUDIOS
        /*this.audioLevel2_LOLO_LookWhatIHaveFound_13 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL2.LOLO_ANSWER);
        this.addEventForMusic(this.audioLevel2_LOLO_LookWhatIHaveFound_13);
        this.audioLevel2_LOLO_YouHaveToFindTheLever_15 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL2.LOLO_TASK);
        this.addEventForMusic(this.audioLevel2_LOLO_YouHaveToFindTheLever_15,false,10000);
        this.music = this.sound.add(GameConstants.Sound.SOUNDS.CAVEBATS);
        this.addEventForMusic(this.music,true,15000);
        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);
        */
        
        //Text Dialog
        /*this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, this.TG.tr('LEVEL2.FINDCLOTHES') + "\n\n" + this.TG.tr('LEVEL2.FINDLEVER'),10 );
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);*/

        

        //Create Branches and Leaves
        /*this.cavemanclothes = this.createEndLevelObject(GameConstants.Sprites.Cavemen_Clothes.KEY);        
        this.physics.world.enable(this.cavemanclothes);
        this.cavemanclothe = this.cavemanclothes[0];
        this.cavemanclothe.setScale(2.75);
        this.cavemanclothe.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.CAVEMAN_CLOTHES, this.cavemanclothe);*/
        
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
        this.map.findObject('Branches', (d) => {
            if (d.type === 'branch-05') {               
                this.dryBranch = this.add.image(d.x,d.y,'woodsbranches','branch-05');
                this.dryBranch.flipX=true;
                this.dryBranch.setScale(2.5);
                this.physics.world.enable(this.dryBranch);
                this.dryBranch.body.setAllowGravity(false);
                this.dryBranch.body.setSize(150,2);                                
            }
        });


      //Add stone
        this.map.findObject('stone', (d) => {
            if (d.type === 'stone') {               
                this.stone = this.add.image(d.x,d.y,'stone');                                
                this.physics.world.enable(this.stone);
                this.stone.body.setAllowGravity(false);                                
                //this.anims.play(GameConstants.Anims.STICK, this.stone);                      
            }
        });
        
      //Add stick
      this.map.findObject('stick', (d) => {
        if (d.type === 'stick') {               
            this.stick = this.add.image(d.x,d.y,'stick');                                
            this.physics.world.enable(this.stick);
            this.stick.body.setAllowGravity(false);                            
            //this.anims.play(GameConstants.Anims.STICK, this.stone);                      
        }
    });
    


        this.physics.add.overlap(this.daniela, this.dryBranch, function (player, object) {
            object.destroy();
        });
        
        //this.anims.play(GameConstants.Anims.JOYSTICK, this.joystick);*/

        //Wall collider        
        /*this.physics.add.collider(this.daniela, this.joystick, () => {
            this.joystick.destroy();
            wall.setCollisionByExclusion([0]);
            wall.alpha=0;
        });

        this.physics.add.collider(this.daniela, this.cavemanclothe, () => {
            this.music.stop();
            this.cavemanclothe.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();            
            this.daniela.nextScene();
        });*/

       /* this.physics.add.overlap(this.daniela, this.ladderLayer,()=>{
            //daniela.x = liana.x;
            this.daniela.isInLiana = true;
            this.daniela.body.velocity.x = 0;
    
            
            this.daniela.body.setAllowGravity(false);
            this.daniela.body.velocity.y = 0;
            
        });*/

    }

    update(time, delta) {

        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });



    }


}
export default Level5;