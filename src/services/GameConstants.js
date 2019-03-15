/* Las constantes del juego */
const GameConstants = {
    Levels: {
        LEVEL1: 'Level1',
        LEVEL2: 'Level2',
        LEVEL3: 'Level3'
    },
    Sound: {
        LEVEL1_LOLO_FINDBRACELET: 'LEVEL1_LOLO_findBracelet',
        LOLO_BIEN_LO_HEMOS_CONSEGUIDO: 'LOLO_Bien_lo_hemos_conseguido',
        CAVEBATS: 'CaveBats',
        DANIELA_JUMP: 'soundJump',
        DANIELA_AUCH: 'danielaAuch'
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
            KEY: 'bracelet',
            OBJECT_NAME: 'Bracelet',
            OBJECT_ID: 'positionEnd'
        },
        Daniela: {
            KEY: 'daniela'
        }
    },
    Textures: {
        BG_LEVEL1: 'bg_Level1'
    },
    Anims: {
        BATS: 'bat_move',
        WHEEL: 'wheel_move',
        BRACELET: 'bracelet_move',
        Daniela: {
            IDLE: 'daniela_idle',
            WALK: 'daniela_walk',
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
    // TODO: Remover a su respectivo sitio cuando tengamos i18ln
    Texts: {
        BUSCAR_PULSERA: 'Daniela, tienes que buscar la Pulsera mágica.',
        VIDAS: 'Vidas: ',
        CONSEGUIDO: 'Bien!! Lo hemos Conseguido!!'
    },
    Tiles: {
        CAVE_STONE: 'caveStones'
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