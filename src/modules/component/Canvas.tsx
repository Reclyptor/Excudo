import React, {useEffect, useState} from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import CanvasButtons from "./CanvasButtons";
import { Image } from "../../types/dataset/Image";

type CanvasProps = {
    images: Image[];
};

const Canvas = (props: CanvasProps) => {
    const { selectedObjects, editor, onReady } = useFabricJSEditor()
    const [imageIndex, setImageIndex] = useState<number>(0);

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
    const previousImage = () => setImageIndex((idx: number) => Math.max(0, Math.min(idx - 1, props.images.length - 1)));
    const nextImage = () => setImageIndex((idx: number) => Math.max(0, Math.min(idx + 1, props.images.length - 1)));

    const deleteObjects = () => {
        if ((selectedObjects?.length || 0) > 0) {
            editor?.deleteSelected();
        } else {
            editor?.deleteAll();
        }
    };

    useEffect(() => {
        if (editor?.canvas) {
            const imageSrc = (index: number): string => {
                if (props.images.length > 0) {
                    const idx: number = Math.max(0, Math.min(index, props.images.length - 1));
                    return props.images[idx].coco_url;
                }
                return "";
            };
            editor?.canvas.setBackgroundImage(imageSrc(imageIndex), editor?.canvas.renderAll.bind(editor?.canvas));
        }
    }, [editor?.canvas, imageIndex, props.images]);

    return (
        <div>
            <FabricJSCanvas onReady={init}/>
            <CanvasButtons addRectangle={addRectangle} addCircle={addCircle} deleteObjects={deleteObjects} zoomIn={zoomIn} zoomOut={zoomOut} previousImage={previousImage} nextImage={nextImage} />
        </div>
    );
};

export default Canvas;