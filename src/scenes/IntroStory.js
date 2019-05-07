import GameConstants from '../services/GameConstants.js';


class IntroStory extends Phaser.Scene {
    constructor() {
        super({key: 'IntroStory'});
    }
    
    preload() {
        console.log('Scene: IntroStory');
        

    }

    create() {
        this.run = false;


        //Music Background
        this.musicBirds = this.sound.add('birds_singing');
        this.musicBirds.play();
        this.musicBirds.setLoop(true);

        //Music Falling
        this.musicFalling = this.sound.add('falling');

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        //Opción de MENU en niveles
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELINTRO.SKIP'));        
        skipButton.setPosition(this.width - skipButton.width - 30, 20);
        skipButton.setInteractive().setDepth(2);

        skipButton.on('pointerdown', () => { 
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {                        
                this.scene.start(GameConstants.Levels.LEVEL1);
            });
            
        });

        //Daniela Running
        //this.bg = this.add.tileSprite(0, 0, this.width, this.height, 'bg_park').setOrigin(0);

       //Background Parallax 
       this.bgparallax=[];
       for(let i=8;i>=1;i--){
        this.bgparallax[i]=this.add.tileSprite(0, 0, this.width, this.height, "layer_0"+i).setOrigin(0);

       }
       
        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("daniela_intro", {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });

                // setting player animation
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("lolo_intro", {
                start: 0,
                end: 5
            }),
            frameRate: 8,
            repeat: -1
        });




       // adding Daniela
       this.player = this.physics.add.sprite(200,325, "daniela_intro");
       this.player.setDepth(2);
       this.player.flipX = true;
       this.player.body.setAllowGravity(false);
       this.player.anims.play("run");

       // adding lolo
       this.lolo = this.physics.add.sprite(130,240, "lolo_intro");
       this.lolo.setDepth(2);
       this.lolo.flipX = true;
       this.lolo.body.setAllowGravity(false);
       this.lolo.anims.play("fly");


       //TEXTOS
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, this.height-50, 'pixel', this.TG.tr('LEVELINTRO.DANIELA_MUM'));                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);
        this.textDialog.setAlpha(0);

        //SOUNDS
        this.sound_LEVELINTRO_WHERE_ARE_YOU = this.sound.add( this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL0.DANIELA_MUM);
        
        this.sound_LEVELINTRO_I_ARRIVE_IN_5MINS = this.sound.add( this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL0.DANIELA_ANSWER);

        //Show texts
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                this.textDialog.setAlpha(1);
                this.sound_LEVELINTRO_WHERE_ARE_YOU.play();
            },
            callbackScope: this
        });
        
        this.textDialog2 = this.add.dynamicBitmapText(30, this.height-50, 'pixel', this.TG.tr('LEVELINTRO.DANIELA_ANSWER'));                
        this.textDialog2.setScrollFactor(0);
        this.textDialog2.setDepth(3);
        this.textDialog2.setAlpha(0);

        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.textDialog.setAlpha(0);
                this.textDialog2.setAlpha(1);
                this.sound_LEVELINTRO_I_ARRIVE_IN_5MINS.play();
            },
            callbackScope: this
        });

        //Time Door
        this.door = this.physics.add.sprite(600,300,'timedoor');
        this.door.body.setImmovable(true);
        this.door.body.setAllowGravity(false);
        this.door.setAlpha(0);
        

        this.time.addEvent({
            delay: 14000,
            callback: () => {                                
                this.textDialog2.setAlpha(0);
            },
            callbackScope: this
        });


        this.time.addEvent({
            delay: 17000,
            callback: () => { 
                this.musicBirds.stop();                                               
                this.textDialog2.setAlpha(0);
                this.door.setAlpha(1);                                
            },
            callbackScope: this
        });

        this.time.addEvent({
            delay: 19000,
            callback: () => {                 
                this.musicFalling.play();               
                this.run = true;
            },
            callbackScope: this
        });

        this.passthedoor = false;
        //Atraviesa la puerta
        this.physics.add.overlap(this.player, this.door, () => {
                if (!this.passthedoor){ 
                    this.passthedoor=true;
                    
                    this.cameras.main.shake(1000);  
                    this.cameras.main.fade(5000, 0, 0, 0);    
                    this.time.addEvent({
                        delay: 700,
                        callback: () => {                                        
                            for (let i=1;i<=8;i++){
                                this.bgparallax[i].setAlpha(0);
                             } 
                        },
                        callbackScope: this
                    });
                   
                
                
                    this.cameras.main.on('camerafadeoutcomplete', () => {
                        this.scene.start(GameConstants.Levels.LEVEL1);            
                    });
                }
        });



    }

    update(time, delta) {        
        //this.bg.tilePositionX += 0.5;

        
        //for(let i=this.bgparallax.length-1;i>=1;i--){
        for (let i=1;i<=8;i++){
            this.bgparallax[i].tilePositionX += (0.80 - (i*0.10));
         } 
        //}

        if (this.run) {
            this.player.setVelocityX(150);
            this.lolo.setVelocityX(150);
        }
       
    }

    runToDoor(){


    }
}

export default IntroStory;
