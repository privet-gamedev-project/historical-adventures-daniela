/**
 * GameObject Daniela
 * @since 0.0.0
 */
import GameConstants from "../services/GameConstants.js";

class Daniela extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        this.key = config.key;
        // Health
        this.health = 5;

        this.hitDelay = false;

        //Time
        this.seconds = 1;
        //Maximo tiempo por nivel 600 seg = 10 min
        this.secondsLevel = 600;
        //Extra point recogidas
        this.extraPoints = 0;

        //Animaciones en funcion del Sprite
        if (this.key === GameConstants.Sprites.DanielaTroglo) {
            this.animIDLE = GameConstants.Anims.DanielaTroglo.IDLE;
            this.animDOWN = GameConstants.Anims.DanielaTroglo.DOWN;
            this.animWALK = GameConstants.Anims.DanielaTroglo.WALK;
            this.animCLIMB = GameConstants.Anims.DanielaTroglo.CLIMB;
        } else {
            this.animIDLE = GameConstants.Anims.Daniela.IDLE;
            this.animDOWN = GameConstants.Anims.Daniela.DOWN;
            this.animWALK = GameConstants.Anims.Daniela.WALK;
        }

        // Configuración del GameObject
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.bounce = 0.5;

        this.acceleration = 300;
        this.body.maxVelocity.x = 150;
        this.body.maxVelocity.y = 500;

        //Para evitar que salga del mundo            
        this.body.setCollideWorldBounds(true);

        // Configuraciones extras para el movimiento
        // this.jumpForce = 150;
        this.jumpForce = 350;
        this.jumpTimer = 0;
        this.jumping = false;

        // Se usa para desacelerar el personaje cuando se sueltan los botones.
        this.deceleration = 2;
        // Se usa para cuando el personaje tiene que devolverse.
        this.friction = 10;

        // Animación inicial
        this.anims.play(this.animIDLE);

        this.prevAnim = 'idle';

        if (this.key !== GameConstants.Sprites.DanielaTroglo) {
            this.body.setSize(20, 30);
            this.body.setOffset(6, 2);
        } else {
            this.body.setSize(20, 40);
        }

        this.setDepth(3);

        //Just for level 4 it let us know how Danielas controls are going to work
        this.isInLiana = false;
        /**
         * Controles externos, se puede usar para animar a Daniela en algún momento.
         * @since 0.0.1
         */
        this.animControl = {
            left: false,
            right: false,
            jump: false,
            down: false
        };

        // Control
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.gamepad = null;
        this.scene.input.gamepad.once('down', (pad) => {
            this.gamepad = pad;
            console.log(pad);
        });


        //Sounds create
        this.soundJump = this.scene.sound.add(GameConstants.Sound.DANIELA_JUMP);
        this.soundDanielaAuch = this.scene.sound.add(GameConstants.Sound.DANIELA_AUCH);

        this.lolo = null;
    }

    followedBy(lolo) {
        this.lolo = lolo;
    }

    update(time,delta) {

        //Resta segundos empleados por Daniela en cada Level
        if (this.seconds != parseInt(Math.abs(time / 1000))) {
            this.seconds = parseInt(Math.abs(time / 1000));            
            this.secondsLevel--;            
        }
        

        if (this.lolo) {
            if (this.flipX) {
                this.lolo.flipX = true;
                this.lolo.x += ((this.x - this.lolo.x) * 0.1) - 5;
            } else {
                this.lolo.flipX = false;
                this.lolo.x += ((this.x - this.lolo.x) * 0.1) + 5;
            }
            this.lolo.y += ((this.y - this.lolo.y) * 0.1) - 5;
        }

        let control = {
            left: this.cursor.left.isDown || this.animControl.left || ((this.gamepad !== null) ? this.gamepad.left : false),
            right: this.cursor.right.isDown || this.animControl.right || ((this.gamepad !== null) ? this.gamepad.right : false),
            jump: this.cursor.up.isDown || this.animControl.jump || ((this.gamepad !== null) ? this.gamepad.A : false),
            down: this.cursor.down.isDown || this.animControl.down || ((this.gamepad !== null) ? this.gamepad.down : false)
        }


        // Lógica de movimiento de Daniela
        // Nos permite hacer el salto con peso
        this.jumpTimer -= delta;

        //Call it if Daniela is not in the liana
        if (!this.isInLiana) {
            if (control.down) {
                this.animation(GameConstants.Anims.Direction.DOWN, this.animDOWN);
                if (!this.jumping || this.body.blocked.down) {
                    this.run(((this.body.velocity.x > 0) ? -1 : 1) * this.acceleration + this.deceleration);
                    // this.run(0);
                } else {
                    this.run(0);
                }
            } else {
                if (control.left) {
                    this.moverLeftRight(GameConstants.Anims.Direction.LEFT);
                } else if (control.right) {
                    this.moverLeftRight(GameConstants.Anims.Direction.RIGHT);
                } else if (this.body.blocked.down) {
                    // Fricción con el suelo 

                    // Anima cuando daniela cae al suelo cuando cae Daniela
                    if (this.body.velocity.x > 5 && !this.jumping) {
                        this.animation(GameConstants.Anims.Direction.RIGHT, this.animWALK);
                    } else if (this.body.velocity.x < -5 && !this.jumping) {
                        this.animation(GameConstants.Anims.Direction.LEFT, this.animWALKK);
                    }
                    if (Math.abs(this.body.velocity.x) < 10) {
                        // Detener por completo cuando la velocidad es menor de 10
                        this.animation(GameConstants.Anims.Direction.IDLE, this.animIDLE);
                        this.body.setVelocityX(0);
                        this.run(0);
                    } else {
                        // Si la velocidad es mayor de 10 desacelerar rápido
                        this.run(((this.body.velocity.x > 0) ? -1 : 1) * this.acceleration + this.deceleration);
                    }
                } else if (!this.body.blocked.down) {
                    // Si está en el aire no se acelera más 
                    this.run(0);
                }

                if (control.jump && (!this.jumping || this.jumpTimer > 0)) {
                    this.jump();
                } else if (!control.jump) {
                    // Esto previene los saltos cuando se mantiene presionado
                    this.jumpTimer = -1;
                    if (this.body.blocked.down) {
                        this.jumping = false;
                    }
                }
            }


        } else {
            this.animation(GameConstants.Anims.Direction.CLIMB, this.animCLIMB);
            //Determines how Daniela is going to move in the liana
            if (control.jump && control.left) {
                this.x -= 20;
                this.body.setAllowGravity(true);
                this.body.setVelocityY(-this.jumpForce);
                this.jumping = true;
                this.body.velocity.x = -200;
                this.isInLiana = false;
            } else {
                if (control.jump && control.right) {
                    this.x += 20;
                    this.body.setAllowGravity(true);
                    this.body.setVelocityY(-this.jumpForce);
                    this.jumpTimer = 300;
                    this.jumping = true;
                    this.body.velocity.x = 200;
                    this.isInLiana = false;
                }
            }
            if (control.jump) {
                this.body.velocity.y = -50;
            }
            if (control.down) {
                this.body.velocity.y = 50;
            }

        }
    }
    // Métodos usados en la lógica, están separado para mejor orden    
    moverLeftRight(dir) {
        let acceleration = ((dir === GameConstants.Anims.Direction.RIGHT) ? 1 : -1) * this.acceleration;
        if (this.body.velocity.y === 0) {
            if (Math.abs(this.body.velocity.x) > 100) {
                this.run(acceleration * this.deceleration * this.friction);
            } else {
                this.run(acceleration);
            }
            this.animation(dir, this.animWALK);
        } else {
            // Desacelerar en el aire
            this.run(acceleration);
        }
        this.flipX = (dir === GameConstants.Anims.Direction.RIGHT);
        if (this.lolo) this.lolo.flipX = this.flipX;
    }

    jump() {
        if (!this.body.blocked.down && !this.jumping) {
            return void 0;
        }
        if (this.body.velocity.y < 0 || this.body.blocked.down) {
            this.body.setVelocityY(-this.jumpForce);
        }
        if (!this.jumping) {
            this.jumpTimer = 300;
        }
        this.jumping = true;

        // Animación de salto
        this.animation(GameConstants.Anims.Direction.JUMP, this.animIDLE);

    }

    run(velocity) {
        this.body.setAccelerationX(velocity);
    }

    animation(direction, animation) {
        if (direction === GameConstants.Anims.Direction.DOWN) {
            if (this.key !== GameConstants.Sprites.DanielaTroglo) {
                this.body.setSize(20, 20);
                this.body.setOffset(6, 12);
            } else {
                this.body.setSize(20, 25);
                this.body.setOffset(0, 15);
            }
        } else {
            if (this.key !== GameConstants.Sprites.DanielaTroglo) {
                this.body.setSize(20, 30);
                this.body.setOffset(6, 2);
            } else {
                this.body.setSize(20, 40);
            }

        }

        if (this.prevAnimJump !== direction) {
            this.anims.play(animation);
            if (direction === GameConstants.Anims.Direction.JUMP) {
                this.soundJump.play();
            }
        }
        this.prevAnimJump = direction;
    }

    loseHealth() {
        this.health--;
        this.scene.textHealth.setText(this.scene.TG.tr('COMMONTEXT.LIVES') + this.health);
        if (this.health === 0) {
            this.gameOver = true;
            this.emit(GameConstants.Events.GAME_OVER);
        }
    }

    enemyCollision() {
        if (!this.hitDelay) {
            this.loseHealth();
            this.hitDelay = true;
            this.tint = 0xff9900;
            this.soundDanielaAuch.play();
            if (this.scene) {
                this.scene.time.addEvent({
                    delay: 600,
                    callback: () => {
                        this.hitDelay = false;
                        this.tint = 0xffffff;
                    },
                    callbackScope: this
                });
            }
        }
    }
    //TODO: Quitar las posiciones 100, 100
    waterCollision() {
      /*  if (!this.hitDelay) {
            this.loseHealth();
            this.hitDelay = true;
            this.soundDanielaAuch.play();
            if (this.scene) {
                this.scene.time.addEvent({
                    delay: 600,
                    callback: () => {
                        this.x = 100;
                        this.y = 100;
                        this.hitDelay = false;
                    },
                    callbackScope: this
                });
            }
        }*/
      console.warn("Estoy en el agua :D");
    }

    nextScene() {
        this.scene.textDialog.setText(this.scene.TG.tr('COMMONTEXT.WEDIDIT'));

        this.emit(GameConstants.Events.LEVEL_FINISHED);


    }


    collectExtraPoints(group, object){

        //TODO: OJO Cuenta ptos mientras esta con la colision
        this.extraPoints++;                 

        this.scene.tweens.add({
            targets: object,
            y: object.y - 100,
            alpha: 0,
            duration: 800,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(){
                group.killAndHide(object);
                group.remove(object);                
            }
        });
    }

}
export default Daniela;