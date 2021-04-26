import { fabric } from 'fabric';

export interface RectangleOptions extends fabric.IRectOptions {
    id: number;
}

export const createRectangle = (id: number, x: number, y: number, w: number, h: number): fabric.Rect => {
    const rectangle = new fabric.Rect({
        id: id,
        originX: "left",
        originY: "top",
        fill: "transparent",
        stroke: "#992C7E",
        left: x,
        top: y,
        width: w,
        height: h,
        hasBorders: false,
        lockRotation: true,
        strokeUniform: true,
    } as RectangleOptions);
    rectangle.setControlVisible("mtr", false);
    return rectangle;
};