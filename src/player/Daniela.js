/**
 * GameObject Daniela
 * @since 0.0.0
 */
class Daniela extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        //Health
        this.health = 3;
        //has been hit by obstacles 
        this.hitDelay = false;

        //Gameover //TODO este parámetro no seria necesario al manejarlo con eventos
        this.gameOver = false;

        //Win
        this.winner = false;

        // Configuración del GameObject
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.bounce = 0.5;
        // this.body.collideWorldBounds = true;
        this.acceleration = 300;
        this.body.maxVelocity.x = 150;
        this.body.maxVelocity.y = 500;

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
        this.anims.play('daniela_idle');
        this.prevAnim = 'idle';
        this.body.setSize(20, 30);
        this.setDepth(1);
        /**
         * Controles externos, se puede usar para animar a Daniela en algún momento.
         * @since 0.0.1
         */
        this.animControl = {
            left: false,
            right: false,
            jump: false
        };

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        //Sounds create
        this.soundJump = this.scene.sound.add("soundJump");
        this.soundDanielaAuch = this.scene.sound.add("danielaAuch");

    }

    update(delta) {
        let control = {
            left: this.cursor.left.isDown || this.animControl.left,
            right: this.cursor.right.isDown || this.animControl.right,
            jump: this.cursor.up.isDown || this.animControl.jump
        }

        // Lógica de movimiento de Daniela
        // Nos permite hacer el salto con peso
        this.jumpTimer -= delta;

        if (control.left) {
            this.moverLeftRight('left');
        } else if (control.right) {
            this.moverLeftRight('right');
        } else if (this.body.blocked.down) {
            // Fricción con el suelo 

            // Anima cuando daniela cae al suelo cuando cae Daniela
            if (this.body.velocity.x > 5 && !this.jumping) {
                this.animation('right', 'daniela_walk');
            } else if (this.body.velocity.x < -5 && !this.jumping) {
                this.animation('left', 'daniela_walk');
            }
            if (Math.abs(this.body.velocity.x) < 10) {
                // Detener por completo cuando la velocidad es menor de 10
                this.animation('idle', 'daniela_idle');
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

    // Métodos usados en la lógica, están separado para mejor orden    
    moverLeftRight(dir) {
        let acceleration = ((dir === 'right') ? 1 : -1) * this.acceleration;
        if (this.body.velocity.y === 0) {
            if (Math.abs(this.body.velocity.x) > 100) {
                this.run(acceleration * this.deceleration * this.friction);
            } else {
                this.run(acceleration);
            }
            this.animation(dir, 'daniela_walk');
        } else {
            // Desacelerar en el aire
            this.run(acceleration);
        }
        this.flipX = ((dir === 'right') ? true : false);
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
        this.animation('jump', 'daniela_idle');


    }

    run(velocity) {
        this.body.setAccelerationX(velocity);
    }

    animation(direction, animation) {
        if (this.prevAnimJump !== direction) {
            this.anims.play(animation);
            if (direction === 'jump') {
                this.soundJump.play();
            }
        }
        this.prevAnimJump = direction;
    }

    loseHealth() {
        this.health--;
        this.scene.textHealth.setText("Vidas:" + this.health);
        console.log("Health  " + this.health);
        if (this.health === 0) {
            this.gameOver = true;
            this.emit('GameOver');
            //console.log(" this.emit('GameOver')");
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
                    delay: 1000,
                    callback: () => {
                        this.hitDelay = false;
                        this.tint = 0xffffff;
                    },
                    callbackScope: this
                });
            }
        }
    }

    nextScene() {
        this.scene.textDialog.setText("Bien!! Lo hemos Conseguido!!");
    }



}
export default Daniela;