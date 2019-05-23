import GameConstants from "../services/GameConstants.js";

class Lolo extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.normal_anim);


        // Configuración del GameObject
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

      

        //Para evitar que salga del mundo            
        this.body.setCollideWorldBounds(true);

        
        // Animación inicial
        if (config.normal_anim){            
            this.anims.play(GameConstants.Anims.LOLO.NORMAL_FLY);        
        }else{
            this.anims.play(GameConstants.Anims.LOLO.TROGLODITA_FLY);        
        }
        this.body.setSize(20, 30);
        this.setDepth(3);

        this.body.setAllowGravity(false);
        this.flipX=true;

    }

    
}
export default Lolo;