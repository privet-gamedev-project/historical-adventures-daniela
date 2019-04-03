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
        this.children.iterate((extraPoint) => {
            extraPoint.body.setAllowGravity(false);
            // bat.body.collideWorldBounds = true;
            extraPoint.body.setSize(16, 16);
            extraPoint.setScale(1);
            extraPoint.setDepth(1);                        
        });
    }


    
}

export default ExtraPoints;