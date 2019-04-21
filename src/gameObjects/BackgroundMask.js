let border;
let borderColor;
let backgroundColor;
let backgroundOpacity;
let originX;
let originY;
let width;
let height;

class BackgroundMask {
    constructor(scene, options = {}) {
        border = options.borderSize === undefined ? 1 : options.borderSize;
        borderColor = options.borderColor || 0x000000;
        backgroundColor = options.backgroundColor || 0x000000;
        backgroundOpacity = options.backgroundOpacity === undefined ? 0.85 : options.backgroundOpacity;
        originX = options.originX === undefined ? 0 : options.originX;
        originY = options.originY === undefined ? 0 : options.originY;
        width = options.width === undefined ? 3000 : options.width;
        height = options.height === undefined ? 3000 : options.height;
        
        this.graphic = scene.add.graphics();
        this.graphic.visible = false;
        this.createMask();
    }


    createMask() {
        this.graphic.lineStyle(border, borderColor);
        this.graphic.fillStyle(backgroundColor, backgroundOpacity);
        this.graphic.fillRect(originX, originY, width, height);
    }

    show() {
        this.graphic.visible = true;
    }

    hide(destroy = true) {
        this.graphic.visible = false;
        if (destroy) {
            this.graphic.destroy();
        }
    }

}

export default BackgroundMask;