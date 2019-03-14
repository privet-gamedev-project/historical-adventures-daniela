class Wheels extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // this.scene = scene;

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
            wheel.body.setSize(30, 30);
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
            } else if (wheel.body.blocked.left) {
                this.move('right', wheel);
            }
        });
    }

    move(dir, wheel) {
        if (dir === 'right') {
            wheel.body.setVelocityX(100);
        } else if (dir === 'left') {
            wheel.body.setVelocityX(-100);
        }
    }
}

export default Wheels;