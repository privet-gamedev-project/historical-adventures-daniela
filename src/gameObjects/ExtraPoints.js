class ExtraPoints extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
                
        // create from the sprite array
        this.createExtraPoints(scene, spriteArray);
        this.startExtraPoints();
        
        
    }

    createExtraPoints(scene, spriteArray) {
        spriteArray.map((sprite) => {
            this.add(sprite);
        });
    }

    startExtraPoints() {
        this.scene.physics.world.enable(this.children.entries);
        for (let i=0; i<this.children.entries.length; i++){
            let extraPoint = this.children.entries[i];        
            extraPoint.body.setAllowGravity(false);
            // bat.body.collideWorldBounds = true;
            extraPoint.body.setSize(16, 16);
            extraPoint.setScale(1);
            extraPoint.setDepth(1);                        
        }
    }


    
}

export default ExtraPoints;