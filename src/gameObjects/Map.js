export default class Map extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children);
        // create from the sprite array
        this.createMap(scene, spriteArray);
        this.startMaps();


    }

    createMap(scene, spriteArray) {
        spriteArray.map((sprite) => {
            this.add(sprite);
        });
    }

    startMaps() {
        this.children.iterate((map) => {
            map.body.setAllowGravity(false);
            map.body.setSize(64, 64);
            map.setScale(0.75);
            map.setDepth(1);
        });
    }
    
    showMap(number){
        
    }

}