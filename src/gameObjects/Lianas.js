class Lianas extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        this.scene = scene;

        // create our enemies from the sprite array
        this.createLianas(scene, spriteArray);
    }
    createLianas(scene, spriteArray) {
        
        spriteArray.map((sprite) => {
            this.add(sprite);

            this.configureLianasBodys(sprite,spriteArray);
        });
        
    }
    configureLianasBodys(liana,spriteArray){        
        this.scene.physics.world.enable(liana);        
     
        liana.body.setAllowGravity(false);
        liana.body.setSize(1,liana.height);
        liana.isAFalseLiana=false;
        if(Phaser.Math.Between(0, 3)>1){
            liana.isAFalseLiana=true;
        }
    

    }
}

export default Lianas;