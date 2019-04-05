

class Crocodiles extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // this.scene = scene;

        // create our enemies from the sprite array
        this.createCrocodiles(scene, spriteArray);
    }
    createCrocodiles(scene, spriteArray) {

        spriteArray.map((sprite) => {
            this.add(sprite);
            this.configureCrocodile(sprite);
        });
    }
    configureCrocodile(crocodile) {
        crocodile.setOrigin(0.5);
        crocodile.body.setAllowGravity(false);
        crocodile.velX=100;
        crocodile.body.setVelocityX(-crocodile.velX);
        crocodile.isGoingLeft=true;
    }
}

export default Crocodiles;