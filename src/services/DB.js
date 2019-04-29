 /**
  *  https://github.com/nbubna/store
  *  Permite crear una base de datos por defecto con una semilla inicial.
  *  @param {[{key: String, value: String | Object}, ...]} dbs
  *  @return void
  */
 const createDB = (dbs) =>
     dbs.map((db) =>
         (store.get(db.key) === null) ?
         store.set(db.key, db.value) :
         void 0);

const DB = {
    daniela: {
        costume: 'daniela'
    },
    currentLevel: 'Level1',
    maxLevel: 'Level1', //Last Level achieved
    extralifes : 0,
    sound: true,
    worlds: {
        Level1: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level2: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level3: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level4: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level5: {            
            completed: false,
            score : '000000',
            stars: 0
        },
        Level6: {            
            completed: false,
            score : '000000',
            stars: 0
        }
    },
    skipIntro: true
}

 export default {
     createDB,
     DB
 };