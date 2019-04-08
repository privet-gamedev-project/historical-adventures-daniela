 /**
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
    actualLevel: 'Level1',
    worlds: [
        {
            name: 'Level1',
            completed: false,
            score : 0,
            stars: 0
        },
        {
            name: 'Level2',
            completed: false,
            score : 0,
            stars: 0
        },
        {
            name: 'Level3',
            completed: false,
            score : 0,
            stars: 0
        },
        {
            name: 'Level4',
            completed: false,
            score : 0,
            stars: 0
        }
    ],
    skipIntro: true
}

 export default {
     createDB,
     DB
 };