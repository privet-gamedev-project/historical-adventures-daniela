import GameConstants from '../services/GameConstants.js';


class BonusLevel extends Phaser.Scene {
    constructor() {
        super({key: 'BonusLevel'});
    }
    
    preload() {
        console.log('Scene: ');
        

    }

    create() {
        

        this.score = 1;
        this.countDown = 60;
        this.newTime = 1;
        this.enemyIndex = 0;

        this.height = this.cameras.main.height;
        this.width = this.cameras.main.width;        
        //Opción de MENU en niveles
        const skipButton = this.add.dynamicBitmapText(this.width - 100, 20, 'pixel', this.TG.tr('LEVELSELECT.MENU'));        
        skipButton.setInteractive().setDepth(2);

        skipButton.on('pointerdown', () => { 
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {                        
                this.scene.start(GameConstants.Levels.MENU);
            });
            
        });

        
       //Background Parallax 
       this.bgparallax=[];
       for(let i=5;i>=1;i--){
        this.bgparallax[i]=this.add.tileSprite(0, 0, this.width, this.height, "bonus_plx_"+i).setOrigin(0).setScale(2.23);

       }
       

       //coin POOL
               // group with all active coins.
               this.coinGroup = this.add.group({

                // once a coin is removed, it's added to the pool
                removeCallback: function (coin) {
                    try {
                        coin.scene.coinPool.add(coin);
                    } catch (error) {
                        console.log("no coin");
                    }
                }
            });
    
            // coin pool
            this.coinPool = this.add.group({
    
                // once a coin is removed from the pool, it's added to the active coins group
                removeCallback: function (coin) {
                    try {
                        coin.scene.coinGroup.add(coin);
                    } catch (error) {
                        console.log("no coin");
                    }
                }
            });


        //ENEMIES POOL    
        this.enemyGroup = this.add.group({

            // once an enemy is removed, it's added to the pool
            removeCallback: function (enemy) {
                try {
                    enemy.scene.enemyPool.add(enemy);
                } catch (error) {
                    console.log("no enemy");
                }
            }
        });

        this.enemyPool = this.add.group({

            // once an enemy is removed from the pool, it's added to the active enemy group
            removeCallback: function (enemy) {
                try {
                    enemy.scene.enemyGroup.add(enemy);
                } catch (error) {
                    console.log("no enemy");
                }
            }
        });


       //TEXTS        

        //Dialog Text
        this.textDialog = this.add.dynamicBitmapText(30, this.height-50, 'pixel', this.TG.tr('BONUSLEVEL.INSTRUCTIONS'));                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);
        this.textDialog.setAlpha(1);

        //Sounds
        this.pain = this.sound.add(GameConstants.Sound.LOLO_AUCH);
        this.coinpickup = this.sound.add(GameConstants.Sound.COINPICKUP);

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


        this.anims.create({
            key: "hit",
            frames: this.anims.generateFrameNumbers("lolo_intro", {
                start: 6,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });
        

       //PLAYER : LOLO
       // adding lolo
       this.lolo = this.physics.add.sprite(180,240, "lolo_intro");
       this.lolo.setDepth(2);
       this.lolo.flipX = true;       
       this.lolo.anims.play("fly");
       this.lolo.hitDelay = false;
       this.lolo.hitCoin = false;
       this.lolo.health = 5;
       this.lolo.setSize(40,40);


       //Health Text
       this.textHealth = this.add.dynamicBitmapText(20, 20, 'pixel', this.TG.tr("COMMONTEXT.LIVES"));
       this.textHealth.setScrollFactor(0);
       this.textHealth.setDepth(3);
       this.textHealth.setText(this.TG.tr("COMMONTEXT.LIVES") + this.lolo.health);


       //COIN Text
       this.textCoin = this.add.dynamicBitmapText(20, 50, 'pixel', this.TG.tr("BONUSLEVEL.COINS"));
       this.textCoin.setScrollFactor(0);
       this.textCoin.setDepth(3);
       this.textCoin.setText(this.TG.tr("BONUSLEVEL.COINS") + " " + this.score);


       //Time Text
       this.textTime = this.add.dynamicBitmapText(20, 80, 'pixel', this.TG.tr("BONUSLEVEL.TIME"));
       this.textTime.setScrollFactor(0);
       this.textTime.setDepth(3);
       this.textTime.setText(this.TG.tr("BONUSLEVEL.TIME") + " " + this.countDown);


    //Collisions lolog Enemies
    this.physics.add.overlap(this.lolo, this.enemyGroup, this.hitBird, null, this);

    // setting collisions between the player and the coin group
    this.physics.add.overlap(this.lolo, this.coinGroup, function (bird, coin) {
        if (!this.lolo.hitCoin) {
            this.score--;
            this.coinpickup.play();
            this.textCoin.setText(this.TG.tr("BONUSLEVEL.COINS") + " " + this.score);
            
            this.lolo.hitCoin = true;               
        
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 300,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function () {
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                }
            });

            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.lolo.hitCoin = false;
                }
            });

            if (this.score == 0) {
                this.win();
            }

        }

        
        }, null, this);


       this.input.on("pointerdown", this.jump, this);


    }

    jump() {
        this.lolo.setVelocityY(-200);

    }

    
    update(time, delta) {     
        
        
         //Countdown Calcule each second    
         if (this.newTime != parseInt(Math.abs(time / 1000))) {
            this.newTime = parseInt(Math.abs(time / 1000));
            this.countDown--;
            this.textTime.setText(this.TG.tr("BONUSLEVEL.TIME") + " " + this.countDown);
            if (this.countDown == 0) {
                this.gameOver();
            }

            this.addEnemy();

            //each 3 second create a coin
            const remainder = this.newTime % 3;
            if (remainder == 0) {
                this.addCoin();
            }

         }
        
        //Paralax Move
        for (let i=1;i<=5;i++){
            this.bgparallax[i].tilePositionX += (0.60 - (i*0.10));
         } 


        //down bound
        if (this.lolo.y > this.sys.game.config.height) {
            this.lolo.y = this.lolo.y - 30;
            this.lolo.setVelocityY(0);
            this.hitBird();
        }

        //up bound
        if (this.lolo.y < 10) {
            this.lolo.y = this.lolo.y + 30;
            this.lolo.setVelocityY(0);
            this.hitBird();
        }



     // recycling/add enemies
     this.enemyGroup.getChildren().forEach(function (enemy) {
            

        if (enemy.x < -enemy.displayWidth / 2) {
            this.enemyGroup.killAndHide(enemy);
            this.enemyGroup.remove(enemy);
        }

    }, this);


    // recycling/add coins   
    this.coinGroup.getChildren().forEach(function (coin) {

        if (coin.x < -coin.displayWidth / 2) {
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
        }

    }, this);




        
       
    }

    gameOver(){
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {                        
            this.scene.start(GameConstants.Levels.MENU);
        });
    }

    win(){       
        this.physics.pause();        

        //UPDATE DB add one extralifes
        this.DB = store.get(GameConstants.DB.DBNAME);
        let currentExtraLifes = parseInt(this.DB.extralifes);
        this.DB.extralifes = currentExtraLifes + 1;             
        store.set(GameConstants.DB.DBNAME, this.DB);

        //SHOW WIN
        let youWinText = this.add.dynamicBitmapText((this.width / 2), this.height + 100, 'pixel', this.TG.tr('BONUSLEVEL.YOUWIN') , 48).setTint(0xFFFF00);       
            this.tweens.add({
                targets: youWinText,
                x: (this.width / 2) - 250 ,
                y: (this.height / 2)-150,
                duration: 500,
                ease: 'Power3'
            });
        


        //Go to Menu
        this.time.addEvent({
            delay: 2500,
            callback: () => {                    
                this.cameras.main.fade(700, 0, 0, 0);
                this.cameras.main.on('camerafadeoutcomplete', () => {                        
                this.scene.start(GameConstants.Levels.LEVELSELECT);
        });
            }
        });
        
    }



    hitBird() {
        if (!this.lolo.hitDelay) {
            this.lolo.health--;
            this.pain.play();
            if (this.lolo.health == 0) {
                this.gameOver();                
            }
            this.textHealth.setText(this.TG.tr("COMMONTEXT.LIVES") + this.lolo.health);
            this.lolo.hitDelay = true;
            this.lolo.anims.play("hit");
            this.time.addEvent({
                delay: 1000,
                callback: () => {                    
                    this.lolo.anims.play("fly");
                    this.lolo.hitDelay = false;
                }
            });
        }
    }

    addCoin() {

        let coin;
        let posX = this.sys.game.config.width + 100;
        let posY = Phaser.Math.Between(75, this.sys.game.config.height - 75);

        if (this.coinPool.getLength()) {
            coin = this.coinPool.getFirst();
            coin.createSibling = false;
            coin.x = posX;
            coin.y = posY;
            coin.alpha = 1;
            coin.active = true;
            coin.visible = true;
            this.coinPool.remove(coin);
        } else {
            coin = this.physics.add.sprite(posX, posY, GameConstants.Sprites.ExtraPoint.KEY);
            coin.createSibling = false;            
            coin.anims.play(GameConstants.Anims.EXTRAPOINT, this.extraPoints);
            coin.setVelocityX(-200);
            coin.body.allowGravity = false;
            coin.alpha = 1;
            this.coinGroup.add(coin);
        }
    }


    
    addEnemy() {

        let enemyKeyArrays = [GameConstants.Sprites.Bees, GameConstants.Sprites.Dinobird, GameConstants.Sprites.Soda, GameConstants.Sprites.Bats] ;
        let enemyAnimArrays = [GameConstants.Anims.BEES, GameConstants.Anims.DINOBIRD,GameConstants.Anims.SODAS, GameConstants.Anims.BATS];
        let enemyScaleArrays = [1,1.8,1,2];

        let enemy;
        let posX = this.sys.game.config.width;
        let posY = Phaser.Math.Between(75, this.sys.game.config.height - 75);

        if (this.enemyPool.getLength()) {
            enemy = this.enemyPool.getFirst();
            enemy.createSibling = false;
            enemy.x = posX;
            enemy.y = posY;
            enemy.active = true;
            enemy.visible = true;
            this.enemyPool.remove(enemy);
        } else {
            enemy = this.physics.add.sprite(posX, posY, enemyKeyArrays[this.enemyIndex]);
            enemy.createSibling = false;
            enemy.anims.play(enemyAnimArrays[this.enemyIndex]);
            enemy.flipX = true;
            enemy.setVelocityX(-200);
            enemy.setScale(enemyScaleArrays[this.enemyIndex]);
            enemy.body.allowGravity = false;            
            this.enemyGroup.add(enemy);
        }

        this.enemyIndex ++;
        if (this.enemyIndex>3) this.enemyIndex=0;
    }

    
}

export default BonusLevel;
