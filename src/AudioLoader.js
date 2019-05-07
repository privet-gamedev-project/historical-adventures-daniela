class AudioLoader extends Phaser.Scene {
    constructor() {
        super('AudioLoader');
    }

    preload() {
        console.log('AudioLoader :D');

        let currentLanguage = this.TG.getActualLang();

        console.log(currentLanguage);
        
        
        
        //Level 0/Intro
        this.loadAudio(currentLanguage + "_Level0_MOTHER_WhereAreYou_01");
        this.loadAudio(currentLanguage + "_Level0_DANIELA_5Mins_02");

        //Level 1
        this.loadAudio(currentLanguage + "_Level1_LOLO_MagicBracelet_03");

        //Level 2
        this.loadAudio(currentLanguage + "_Level2_DANIELA_WhereDidYouGetThat_05");
        this.loadAudio(currentLanguage + "_Level2_LOLO_ToBeAbleToContinue_06");
        this.loadAudio(currentLanguage + "_Level2_LOLO_LookWhatIHaveFound_13");
        this.loadAudio(currentLanguage + "_Level2_LOLO_LookForTheMap_14");
        this.loadAudio(currentLanguage + "_Level2_LOLO_YouHaveToFindTheLever_15");

        //Level 3
        this.loadAudio(currentLanguage + "_Level3_DANIELA_WhatAProblem_07");
        this.loadAudio(currentLanguage + "_Level3_LOLO_YouHaveToGiveMammoth_08");

        //Level 4

        //Level 5
        this.loadAudio(currentLanguage + "_Level5_LOLO_YouWillHaveToCatch_09");
        this.loadAudio(currentLanguage + "_Level5_DANIELA_ThatFruitLooksSoGood_10");
        this.loadAudio(currentLanguage + "_Level5_LOLO_InOrderToCatchTheFruit_11");

        //Level 6
        this.loadAudio(currentLanguage + "_Level6_DANIELA_OhIBurntMyself_12");
        this.loadAudio(currentLanguage + "_Level6_LOLO_GetAllTheObjects_17");

        //Level All
        this.loadAudio(currentLanguage + "_LevelAll_DANIELA_WeDidIt_04");
        this.loadAudio(currentLanguage + "_LevelAll_LOLO_RecoverOnleLife_16");

        this.load.path = './assets/';

        //BONUS LEVEL
        this.load.audio("lolo_auch", "sounds/pain.mp3");
        this.load.audio("coinpickup", "sounds/coinpickup.mp3");

        //SOUNDS

        //https://freesound.org/people/DCPoke/sounds/387978/
        this.load.audio("birds_singing", "sounds/backgrounds/birds-singing.mp3");
        
        //https://freesound.org/people/ChrisButler99/sounds/367988/
        this.load.audio("falling", "sounds/backgrounds/falling.mp3");
        
        this.load.audio("soundJump", "sounds/jump.mp3");
        this.load.audio("danielaAuch", "sounds/Daniela_Auch.ogg");
        this.load.audio("CaveBats", "sounds/backgrounds/CaveBats.mp3");
        this.load.audio("levelUp", "sounds/backgrounds/LevelUp.ogg");

        /*
        https://opengameart.org/content/cave-bats
        Copyright/Attribution Notice: 
        Please credit music by Dan Knoflicek
        */
        //this.load.audio("caveManBgSound", "sounds/backgrounds/caveManBgSound.mp3");
        // the audio above throws errors
        this.load.audio("caveManBgSound", "sounds/backgrounds/birds-singing.mp3");

    } 

    loadAudio(audioName) {

        this.load.path = './assets/';
        this.load.audio(audioName, "sounds/dialogs/" + audioName + ".ogg");
    }
}
export default AudioLoader;