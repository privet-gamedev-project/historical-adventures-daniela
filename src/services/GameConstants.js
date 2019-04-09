/* Las constantes del juego */
const GameConstants = {
    Levels: {
        MENU: 'Menu',
        SETTINGSLEVEL: 'SettingsLevel',
        LEVELSELECT: 'LevelSelect',
        CREDITS: 'Credits',
        SCORES: 'Scores',
        INTROSTORY: 'IntroStory',
        LEVEL1: 'Level1',
        LEVEL2: 'Level2',
        LEVEL3: 'Level3',
        LEVEL4:'Level4',
        GAMEOVER: 'GameOver'
    },
    Sound: {
        LEVEL1_LOLO_FINDBRACELET: 'LEVEL1_LOLO_findBracelet',
        LOLO_WE_DID_IT: 'LOLO_WE_DID_IT',
        CAVEBATS: 'CaveBats',
        DANIELA_JUMP: 'soundJump',
        DANIELA_AUCH: 'danielaAuch',
        CAVEMAN_BG:'caveManBgSound',
        LEVEL2_LOLO_FINDCLOTHES: 'LEVEL2_LOLO_findClothes',
        LEVELUP : 'levelUp'
    },
    Sprites: {
        Bats: {
            KEY: 'bats',
            ID: 'bat',
            OBJECT_NAME: 'Bats',
            OBJECT_ID: 'Bat'
        },
        Bees: {
            KEY: 'bee',
            ID: 'bee',
            OBJECT_NAME: 'Bees',
            OBJECT_ID: 'Bee'
        },
        Snails: {
            KEY: 'snail',
            ID: 'snail',
            OBJECT_NAME: 'Snails',
            OBJECT_ID: 'Snail'
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
        ExtraPoint: {
            KEY: 'extrapoint'        
        },
        Star:{
            KEY: 'star'
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
        DanielaTroglo: {
            KEY: 'daniela-troglodita'
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
        },
        Lianas: {
            KEY: 'liana',
            ID: 'liana',
            OBJECT_NAME: 'lianasPoints',
            OBJECT_ID: 'liana'
        },
        EndOfLianas: {
            KEY: 'endOfLiana',
            ID: 'endOfLiana',
            OBJECT_NAME: 'lianasPoints',
            OBJECT_ID: 'endOfLiana'
        },
        Crocodile: {
            KEY: 'crocodile',
            ID: 'crocodile',
            OBJECT_NAME: 'crocodiles',
            OBJECT_ID: 'crocodile'
        }
    },
    Textures: {
        BG_MENU: 'bg_Menu',
        BG_LEVEL1: 'bg_Level1',
        BG_LEVEL2: 'bg_Level2',
        BG_LEVEL3: 'bg_Level3',
        BG_CREDITS: 'Credits',        
        BG_CREDITS_PAGE2: 'creditsPage2',
        PLATFORM_FOREST: 'platform'
    },
    Anims: {
        BATS: 'bat_move',
        BEES: 'bee_fly',
        SNAILS: 'snail_move',
        WHEEL: 'wheel_move',
        BRACELET: 'bracelet_move',
        EXTRAPOINT: 'extrapoint_rotate',
        CAVEMAN_CLOTHES: 'caveman_clothes_move',
        JOYSTICK: 'joystick_move',
        CROCODILE:'swim',
        Daniela: {
            IDLE: 'daniela_idle',
            WALK: 'daniela_walk',
            DOWN: 'daniela_down',
            CLIMB: 'daniela_climb'
        },
        DanielaTroglo: {
            IDLE: 'daniela-troglodita_idle',
            WALK: 'daniela-troglodita_walk',
            DOWN: 'daniela-troglodita_down',
            CLIMB: 'daniela-troglodita_climb'
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
            IDLE: 'idle',
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
        FOREST_PACK : 'forestPack_32x32',
        GRASS_TILES: 'grasstiles',
        JUNGLE :"jungleTileset",
    },
    Layers: {
        WORLD: 'World'
    },
    Events: {
        GAME_OVER: 'GameOver',
        LEVEL_FINISHED: 'Win',
        MENU: 'Menu'
    }

};

export default GameConstants;