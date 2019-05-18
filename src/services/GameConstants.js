/* Las constantes del juego */
const GameConstants = {
    DB: {
        DBNAME: 'gamedatav0_04'
    },
    Levels: {
        MENU: 'Menu',
        SETTINGSLEVEL: 'SettingsLevel',
        LEVELSELECT: 'LevelSelect',
        CREDITS: 'Credits',
        SCORES: 'Scores',
        BONUSLEVEL: 'BonusLevel',
        INTROSTORY: 'IntroStory',        
        LEVEL1: 'Level1',
        LEVEL2: 'Level2',
        LEVEL3: 'Level3',
        LEVEL4:'Level4',
        LEVEL5:'Level5',
        LEVEL6: 'Level6',
        GAMEOVER: 'GameOver',
        UI: 'UI'
    },
    Sound: {        
        LEVEL0: {
            DANIELA_MUM: 'Level0_MOTHER_WhereAreYou_01',
            DANIELA_ANSWER: 'Level0_DANIELA_5Mins_02',
            BSO: 'LevelIntro_BSO'
        },
        LEVEL1: {
            FINDBRACELET: 'Level1_LOLO_MagicBracelet_03',
            BSO: 'Level1_BSO'
        },
        LEVEL2: {
            DANIELA_QUESTION: 'Level2_DANIELA_WhereDidYouGetThat_05',
            FINDCLOTHES: 'Level2_LOLO_ToBeAbleToContinue_06',
            LOLO_ANSWER: 'Level2_LOLO_LookWhatIHaveFound_13',
            LOLO_NOTE: 'Level2_LOLO_LookForTheMap_14',
            LOLO_TASK: 'Level2_LOLO_YouHaveToFindTheLever_15',
            BSO: 'Level2_BSO'
        },
        Level3: {
            DANIELA_QUESTION: 'Level3_DANIELA_WhatAProblem_07',
            LOLO_ANSWER: 'Level3_LOLO_YouHaveToGiveMammoth_08',
            BSO: 'Level3_BSO'
        },
        Level4: {
            BSO: 'Level4_BSO'
        },
        LEVEL5: {
            LOLO_TASK: 'Level5_LOLO_YouWillHaveToCatch_09',
            DANIELA_FRUITS: 'Level5_DANIELA_ThatFruitLooksSoGood_10',
            LOLO_NOTE: 'Level5_LOLO_InOrderToCatchTheFruit_11',
            BSO: 'Level5_BSO'
        },
        LEVEL6: {
            DANIELA: 'Level6_DANIELA_OhIBurntMyself_12',
            LOLO_TASK: 'Level6_LOLO_GetAllTheObjects_17',
            BSO: 'Level6_BSO'
        },
        LEVELALL: {
            WEDIDIT: 'LevelAll_DANIELA_WeDidIt_04',
            RECOVERONELIFE: 'LevelAll_LOLO_RecoverOnleLife_16'
        },
        BONUSLEVEL: {
            COINPICKUP: 'coinpickup',
            FRUITPICKUP: 'fruitpickup',
            POWERUP: 'powerUp',
            LOLO_AUCH: 'lolo_auch',
            BSO: 'BonusLevel_BSO'
        },
        SOUNDS: {
            CAVEBATS: 'CaveBats',
            DANIELA_JUMP: 'soundJump',
            DANIELA_AUCH: 'danielaAuch',
            LEVELUP : 'levelUp',
            BIRD_SINGING : 'BirdSinging'
        },
        MAIN:{
            BSO: 'Main_BSO'
        }
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
        Soda: {
            KEY: 'soda',
            ID: 'soda',
            OBJECT_NAME: 'Sodas',
            OBJECT_ID: 'Soda'
        },
        Snails: {
            KEY: 'snail',
            ID: 'snail',
            OBJECT_NAME: 'Snails',
            OBJECT_ID: 'Snail'
        },
        Spiders: {
            KEY: 'spider',
            ID: 'spider',
            OBJECT_NAME: 'Spiders',
            OBJECT_ID: 'Spider'
        },
        Mosquitos: {
            KEY: 'mosquito',
            ID: 'mosquito',
            OBJECT_NAME: 'Mosquitos',
            OBJECT_ID: 'Mosquito'
        },
        Wheel: {
            KEY: 'wheel',
            ID: 'wheel',
            OBJECT_NAME: 'Wheels',
            OBJECT_ID: 'Wheel'
        },
        Donut: {
            KEY: 'donut',
            ID: 'donut',
            OBJECT_NAME: 'Donuts',
            OBJECT_ID: 'Donut'
        },
        Bracelet: {
            KEY: 'bracelet'        
        },
        ExtraPoint: {
            KEY: 'extrapoint',
            ID: 'extrapoint',
            OBJECT_NAME: 'ExtraPoints',
            OBJECT_ID: 'extrapoint'
        },
        Star:{
            KEY: 'star'
        },
        Play:{
            KEY: 'play'
        },
        Play2:{
            KEY: 'play2'
        },
        Lock:{
            KEY: 'lock'
        },
        Cavemen_Clothes: {
            KEY: 'caveman_clothes'        
        },
        Mamut: {
            KEY: 'mamut'        
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
            OBJECT_NAME: 'Crocodiles',
            OBJECT_ID: 'Crocodile'
        },
        Dinowater: {
            KEY: 'dinowater',
            ID: 'dinowater',
            OBJECT_NAME: 'Dinowaters',
            OBJECT_ID: 'Dinowater'
        },
        Dinobird: {
            KEY: 'dinobird',
            ID: 'dinobird',
            OBJECT_NAME: 'Dinobirds',
            OBJECT_ID: 'Dinobird'
        },
        Spike: {
            KEY: 'Spike',
        },
        Limit: {
            KEY: 'Limit'
        },
        INVISIBLE: 'invisible',
        PUZZLEPIECE: 'puzzlepiece'
    },
    Enemies_Layers:{
        Level1 : {
            BATS : 'Bats',
            WHEELS: 'Wheels'
        },
        Level2: {
            BEES: 'Bees',
            SNAILS: 'Snails'
        },
        Level3 : {
            SODAS: 'Sodas',
            DONUTS: 'Donuts'
        },
        
        Level4: {
            CROCODILES: 'Crocodiles'
        },
        Level5:{
            Spiders: 'Spiders',
            Mosquitos: 'Mosquitos'
        },
        Level6: {
            DINOWATERS: 'Dinowaters',
            DINOBIRD: 'Dinobirds'
        }
    },
    Textures: {
        BG_MENU: 'bg_Menu',
        BG_LEVEL1: 'bg_Level1',
        BG_LEVEL2: 'bg_Level2',
        BG_LEVEL3: 'bg_Level3',
        BG_LEVEL4:  'bg_Level4',        
        BG_LEVEL5:  'bg_Level5',        
        BG_LEVEL6: 'bg_Level6',
        BG_CREDITS: 'Credits',        
        BG_CREDITS_PAGE2: 'creditsPage2',
        PLATFORM_FOREST: 'platform'
    },
    Anims: {
        BATS: 'bat_move',
        BEES: 'bee_fly',
        SODAS: 'soda_fly',
        SNAILS: 'snail_move',
        SPIDERS: 'spider_move',
        MOSQUITOS: 'mosquito_move',
        WHEEL: 'wheel_move',
        DONUT: 'donut_move',
        BRACELET: 'bracelet_move',
        EXTRAPOINT: 'extrapoint_rotate',
        CAVEMAN_CLOTHES: 'caveman_clothes_move',
        JOYSTICK: 'joystick_move',
        CROCODILE:'swim',
        DINOWATER: 'dinowater_move',
        DINOBIRD: 'dinobird_move',
        MAMUT:{
            SLEEP: 'mamut_sleep',
            HAPPY: 'mamut_happy'
        }, 
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
        },
        MAP: 'map_shine',
        PUZZLEPIECE:'puzzlepiece_move'
    },
    UI:{
        VOLUMEON:'volumeOn',
        VOLUMEOFF:'volumeOff'
    },
    Fonts:{
        PIXEL: 'pixel'  
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
        JUNGLE : 'jungle',
        WOODS: 'woods',
        VOLCANO: 'spritesheet'
    },
    Layers: {
        WORLD: 'World',
        LANDSCAPE: 'Landscape',
        SPIKES: 'Spikes',
        LIMITS: 'Limits'
    },
    Events: {
        GAME_OVER: 'GameOver',
        LEVEL_FINISHED: 'Win',
        MENU: 'Menu'
    },
    Settings: {
        FLAG_ES: 'es_flag',
        FLAG_EN: 'en_flag',
        FLAG_IT: 'it_flag',
        FLAG_DE: 'de_flag'
    }

};

export default GameConstants;