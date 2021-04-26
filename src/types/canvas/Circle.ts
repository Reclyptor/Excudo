import {fabric} from "fabric";

export interface CircleOptions extends fabric.ICircleOptions {
    id: number;
}

export const createCircle = (id: number, x: number, y: number, r: number): fabric.Circle => {
    const circle = new fabric.Circle({
        id: id,
        originX: "center",
        originY: "center",
        fill: "transparent",
        stroke: "#992C7E",
        left: x,
        top: y,
        radius: r,
        hasBorders: false,
        lockRotation: true,
        strokeUniform: true,
    } as CircleOptions);
    circle.setControlVisible("mtr", false);
    return circle;
};
