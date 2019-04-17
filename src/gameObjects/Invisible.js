const TILE_SIZE = 32;
const CENTER = TILE_SIZE / 2;
class Invisible extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, type, fillColor = null, fillAlpha = null) {
        super(scene, x + CENTER * width / TILE_SIZE, y + CENTER * height / TILE_SIZE, width, height, fillColor, fillAlpha);
    }
}

export default Invisible;