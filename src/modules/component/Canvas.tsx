import React from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import CanvasButtons from "./CanvasButtons";

type CanvasProps = {

};

const Canvas = (_: CanvasProps) => {
    const { selectedObjects, editor, onReady } = useFabricJSEditor()

    const init = (canvas: fabric.Canvas) => {
        canvas.uniformScaling = false;
        onReady(canvas);
    };

    const addRectangle = () => {
        const rectangle = new fabric.Rect({
            originX: "left",
            originY: "top",
            fill: "transparent",
            stroke: "#A4C639",
            left: (editor?.canvas.width || 0) / 2 - 25,
            top: (editor?.canvas.height || 0) / 2 - 25,
            width: 50,
            height: 50,
            hasBorders: false,
            lockRotation: true,
            strokeUniform: true,
        });
        rectangle.setControlVisible("mtr", false);
        editor?.canvas.add(rectangle);
    };

    const addCircle = () => {
        const circle = new fabric.Circle({
            originX: "center",
            originY: "center",
            fill: "transparent",
            stroke: "#A4C639",
            left: (editor?.canvas.width || 0) / 2,
            top: (editor?.canvas.height || 0) / 2,
            radius: 25,
            hasBorders: false,
            lockRotation: true,
            strokeUniform: true,
        });
        circle.setControlVisible("mtr", false);
        editor?.canvas.add(circle);
    };

    const zoomIn = () => editor?.zoomIn();
    const zoomOut = () => editor?.zoomOut();

    const deleteObjects = () => {
        if ((selectedObjects?.length || 0) > 0) {
            editor?.deleteSelected();
        } else {
            editor?.deleteAll();
        }
    };

    return (
        <div>
            <FabricJSCanvas onReady={init}/>
            <CanvasButtons addRectangle={addRectangle} addCircle={addCircle} deleteObjects={deleteObjects} zoomIn={zoomIn} zoomOut={zoomOut}/>
        </div>
    );
};

export default Canvas;