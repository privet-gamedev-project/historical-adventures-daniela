class FloorEnemy extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray, speed) {
        super(world, scene, children);
        // this.scene = scene;
        this.speed=speed;
        // create our enemies from the sprite array
        this.createWheels(scene, spriteArray);
        this.startWheel();
        
    }

    createWheels(scene, spriteArray) {
        spriteArray.map((sprite) => {
            this.add(sprite);
        });
    }

    startWheel() {
        this.children.iterate((wheel) => {
            //wheel.body.setSize(30, 30);
            wheel.body.setCollideWorldBounds(true);
            wheel.setDepth(1);
            this.move((Phaser.Math.Between(0, 1) ? 'left' : 'right'), wheel);
        });
    }

    update() {
        this.children.iterate((wheel) => {
            if(wheel.body.velocity.x === 0) {
                this.move((Phaser.Math.Between(0, 1) ? 'left' : 'right'), wheel);
            }
            if (wheel.body.blocked.right) {
                this.move('left', wheel); 
                wheel.flipX=false;               
            } else if (wheel.body.blocked.left) {
                this.move('right', wheel);
                wheel.flipX=true;
            }
        });
    }

    move(dir, wheel) {                
        if (dir === 'right') {
            wheel.body.setVelocityX(this.speed);
        } else if (dir === 'left') {
            wheel.body.setVelocityX(this.speed*-1);
        }
    }
}

export default FloorEnemy;