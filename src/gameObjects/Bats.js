class Bats extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // this.scene = scene;

        // create our enemies from the sprite array
        this.createBats(scene, spriteArray);
        this.startBat();
    }

    createBats(scene, spriteArray) {
        spriteArray.map((sprite) => {
            this.add(sprite);
        });
    }

    startBat() {
        this.children.iterate((bat) => {
            bat.body.setAllowGravity(false);
            // bat.body.collideWorldBounds = true;
            bat.body.setSize(16, 16);
            bat.setScale(1.25);
            this.move((Phaser.Math.Between(0, 1) ? 'left' : 'right'), bat);
        });
    }

    update() {
        this.children.iterate((bat) => {
            if(bat.body.velocity.x === 0) {
                this.move((Phaser.Math.Between(0, 1) ? 'left' : 'right'), bat);
            }
            if (bat.body.blocked.right) {
                this.move('left', bat);
            } else if (bat.body.blocked.left) {
                this.move('right', bat);
            }
        });
    }

    move(dir, bat) {
        if (dir === 'right') {
            bat.body.setVelocityX(100);
            bat.flipX = false;
        } else if (dir === 'left') {
            bat.body.setVelocityX(-100);
            bat.flipX = true;
        }
    }
}

export default Bats;