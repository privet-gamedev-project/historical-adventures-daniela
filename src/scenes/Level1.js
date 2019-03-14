import Bats from '../gameObjects/Bats.js';
import Wheels from '../gameObjects/Wheels.js';
import SceneManager from "./SceneManager.js";

class Level1 extends SceneManager {
    constructor() {
        super({
            key: 'Level1'
        });
    }

    create() {
        // background
        this.bg = this.add.tileSprite(0, 0, 2560, 1440, 'bg_Level1').setOrigin(0).setScale(0.65);

        //Sounds
        this.soundLEVEL1_LOLO_findBracelet = this.sound.add("LEVEL1_LOLO_findBracelet");
        this.soundLEVEL1_LOLO_findBracelet.play();

        //Wait 2 seconds to play background music
        this.music = this.sound.add('CaveBats');
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.music.play();
                this.music.setLoop(true);
            },
            callbackScope: this
        });


        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add("LOLO_Bien_lo_hemos_conseguido");

        //Text Dialog
        this.textDialog = this.add.text(30, 570, 'Daniela, tienes que buscar la Pulsera mágica.', {
            fontSize: '25px',
            fill: '#ffffff'
        });
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(1);


        //Text Health
        this.textHealth = this.add.text(30, 20, 'Vidas:3', {
            fontSize: '25px',
            fill: '#ffffff'
        });
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(1);


        //bat move
        this.anims.create({
            key: 'bat_move',
            frames: this.anims.generateFrameNumbers('bats', {start: 4, end: 7}),
            frameRate: 5,
            repeat: -1
        });


        //  movewheel animation
        this.anims.create({
            key: 'wheel_move',
            frames: this.anims.generateFrameNumbers('wheel', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        //  bracelet animation
        this.anims.create({
            key: 'bracelet_move',
            frames: this.anims.generateFrameNumbers('bracelet', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        //TODO: se debería pasar los parámetros 'x' e 'y' de forma dinámica en base al mapa y la posición de inicio
        // algo parecido a lo que se hace con los murciélagos y las ruedas
        //Daniela Creation
        this.daniela = super.createDaniela(this, 100, 100);

        //Read Tilemap
        let map = super.createMap();


        //Creating Bats         
        this.bats = map.createFromObjects('Bats', 'Bat', {key: 'bats'});
        this.batsGroup = new Bats(this.physics.world, this, [], this.bats);

        //Creating Wheels         
        this.wheels = map.createFromObjects('Wheels', 'Wheel', {key: 'wheels'});
        this.wheelsGroup = new Wheels(this.physics.world, this, [], this.wheels);

        //Create Bracelet
        this.bracelets = map.createFromObjects('Bracelet', 'positionEnd', {key: 'bracelet'});
        this.physics.world.enable(this.bracelets);
        this.magicbracelet = this.bracelets[0];
        this.magicbracelet.setScale(0.75);
        this.magicbracelet.body.setAllowGravity(false);
        this.anims.play('bracelet_move', this.magicbracelet);


        //Tilemap
        let level1Tile = map.addTilesetImage('caveStones');
        let Level1 = map.createDynamicLayer('World', level1Tile, 0, 0);
        Level1.setCollisionByExclusion([-1]);

        //Colliders
        this.physics.add.collider(this.daniela, Level1);
        this.physics.add.collider(this.batsGroup, Level1);
        this.physics.add.collider(this.wheelsGroup, Level1);
        this.physics.add.overlap(this.daniela, this.magicbracelet, () => {
            this.daniela.nextScene();
            this.scene.pause();
            this.music.stop();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();

            console.log('Daniela encuentra pulsera magica');
        });
        this.physics.add.overlap(this.daniela, this.bats, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con murciélago');
        });
        this.physics.add.overlap(this.daniela, this.wheels, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con ruedas');
        });


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
        this.anims.play('bat_move', this.bats);
        this.anims.play('wheel_move', this.wheels);

    }

    update(time, delta) {
        this.daniela.update(delta);
        this.batsGroup.update();
        this.wheelsGroup.update();

    }
}

export default Level1;