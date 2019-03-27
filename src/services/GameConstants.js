/* Las constantes del juego */
const GameConstants = {
    Levels: {
        MENU: 'Menu',
        LEVELSELECT: 'LevelSelect',
        INTROSTORY: 'IntroStory',
        LEVEL1: 'Level1',
        LEVEL2: 'Level2',
        LEVEL3: 'Level3',
        GAMEOVER: 'GameOver'
    },
    Sound: {
        LEVEL1_LOLO_FINDBRACELET: 'LEVEL1_LOLO_findBracelet',
        LOLO_BIEN_LO_HEMOS_CONSEGUIDO: 'LOLO_Bien_lo_hemos_conseguido',
        CAVEBATS: 'CaveBats',
        DANIELA_JUMP: 'soundJump',
        DANIELA_AUCH: 'danielaAuch',
        CAVEMAN_BG:'caveManBgSound',
        LEVEL2_LOLO_FINDCLOTHES: 'LEVEL2_LOLO_findClothes'
    },
    Sprites: {
        Bats: {
            KEY: 'bats',
            ID: 'bat',
            OBJECT_NAME: 'Bats',
            OBJECT_ID: 'Bat'
        },
        Wheel: {
            KEY: 'wheel',
            ID: 'wheel',
            OBJECT_NAME: 'Wheels',
            OBJECT_ID: 'Wheel'
        },
        Bracelet: {
            KEY: 'bracelet'        
        },
        Cavemen_Clothes: {
            KEY: 'caveman_clothes'        
        },
        EndLevel: {            
            OBJECT_NAME: 'EndLevel',
            OBJECT_ID: 'positionEnd'
        },
        Daniela: {
            KEY: 'daniela'
        },
        Lolo_Normal:{
            KEY: 'lolo_normal'
        },
        Level_Price:{
            KEY:'coin'
        },
        Fire:{
            KEY:'fire'
        },
        Joystick:{
            KEY: 'joystick'
        }
    },
    Textures: {
        BG_MENU: 'bg_Menu',
        BG_LEVEL1: 'bg_Level1',
        BG_LEVEL2: 'bg_Level2',
        BG_CREDITS: 'bg_Credits',
        PLATFORM_FOREST: 'platform'
    },
    Anims: {
        BATS: 'bat_move',
        WHEEL: 'wheel_move',
        BRACELET: 'bracelet_move',
        CAVEMAN_CLOTHES: 'caveman_clothes_move',
        JOYSTICK: 'joystick_move',
        Daniela: {
            IDLE: 'daniela_idle',
            WALK: 'daniela_walk',
        },
        LOLO: {
            NORMAL_FLY: 'lolo_normal_fly'
        },
        Direction: {
            RIGHT: 'right',
            LEFT: 'left',
            UP: 'up',
            DOWN: 'down',
            JUMP: 'jump',
            IDLE: 'idle'
        }
    },
    UI:{
        VOLUMEON:'volumeOn',
        VOLUMEOFF:'volumeOff'
    },
    // TODO: Remover a su respectivo sitio cuando tengamos i18ln
    Texts: {
        BUSCAR_PULSERA: 'Daniela tienes que buscar la Pulsera magica',
        BUSCAR_ROPA_TROGLODITA: 'Daniela, tienes que buscar la ropa de Troglodita.',
        VIDAS: 'VIDAS ',
        CONSEGUIDO: 'Bien!! Lo hemos Conseguido!!'
    },
    Tiles: {
        CAVE_STONE: 'caveStones',
        FOREST_PACK : 'forestPack_32x32'
    },
    Layers: {
        WORLD: 'World'
    },
    Events: {
        GAME_OVER: 'GameOver',
        LEVEL_FINISHED: 'Win'
    }

};

export default GameConstants;