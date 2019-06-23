class LianasEnd extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // this.scene = scene;

        // create our enemies from the sprite array
        this.createLianas(scene, spriteArray);
    }
    createLianas(scene, spriteArray) {
        
        spriteArray.map((sprite) => {
            this.add(sprite);

            this.configureLianasEnd(sprite,spriteArray);
        });
        
    }
    configureLianasEnd(liana,spriteArray){
        this.scene.physics.world.enable(liana);
        liana.body.setAllowGravity(false);
        liana.body.setSize(1,1);
        liana.alpha=0;
    }
}

export default LianasEnd;