import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Annotation } from "../../types/dataset/Annotation";
import { Image } from "../../types/dataset/Image";
import CanvasButtons from "./CanvasButtons";
import {Object} from "fabric/fabric-impl";

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 50;

type CanvasProps = {
    images: Image[];
    annotations: Annotation[];
};

const Canvas = (props: CanvasProps) => {
    const { selectedObjects, editor, onReady } = useFabricJSEditor()
    const [imageIndex, setImageIndex] = useState<number>(0);

    const init = (canvas: fabric.Canvas) => {
        canvas.uniformScaling = false;
        onReady(canvas);
    };

    const addRectangle = () => {
        if (editor) {
            const rectangle = new fabric.Rect({
                originX: "left",
                originY: "top",
                fill: "transparent",
                stroke: "#992C7E",
                left: ((editor.canvas.width || 0) - DEFAULT_WIDTH) / 2,
                top: ((editor.canvas.height || 0) - DEFAULT_HEIGHT) / 2,
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT,
                hasBorders: false,
                lockRotation: true,
                strokeUniform: true,
            });
            rectangle.setControlVisible("mtr", false);
            editor.canvas.add(rectangle);
        }
    };

    const addCircle = () => {
        if (editor) {
            const circle = new fabric.Circle({
                originX: "center",
                originY: "center",
                fill: "transparent",
                stroke: "#992C7E",
                left: (editor.canvas.width || 0) / 2,
                top: (editor.canvas.height || 0) / 2,
                radius: 25,
                hasBorders: false,
                lockRotation: true,
                strokeUniform: true,
            });
            circle.setControlVisible("mtr", false);
            editor.canvas.add(circle);
        }
    };

    const zoomIn = () => editor?.zoomIn();
    const zoomOut = () => editor?.zoomOut();
    const normalizeIndex = (idx: number) => Math.max(0, Math.min(idx, props.images.length - 1));
    const previousImage = () => setImageIndex((idx: number) => normalizeIndex(idx - 1));
    const nextImage = () => setImageIndex((idx: number) => normalizeIndex(idx + 1));

    const deleteObjects = () => {
        if ((selectedObjects?.length || 0) > 0) {
            editor?.deleteSelected();
        } else {
            editor?.deleteAll();
        }
    };

    const loadImage = () => {
        if (editor?.canvas && props.images.length > imageIndex) {
            const image: Image = props.images[imageIndex];
            editor.canvas.setWidth(image.width);
            editor.canvas.setHeight(image.height);
            editor.canvas.setBackgroundImage(image.coco_url, editor.canvas.renderAll.bind(editor.canvas));
        }
    };

    const loadAnnotations = () => {
        if (editor?.canvas && props.images.length > imageIndex) {
            editor.canvas.getObjects().forEach((obj: Object) => editor.canvas.remove(obj));
            const image: Image = props.images[imageIndex];
            props.annotations.filter((annotation: Annotation) => annotation.image_id === image.id)
                .filter((annotation: Annotation) => annotation.bbox !== undefined)
                .filter((annotation: Annotation) => annotation.bbox.length === 4)
                .forEach((annotation: Annotation) => {
                    const rectangle = new fabric.Rect({
                        originX: "left",
                        originY: "top",
                        fill: "transparent",
                        stroke: "#992C7E",
                        left: annotation.bbox[0],
                        top: annotation.bbox[1],
                        width: annotation.bbox[2],
                        height: annotation.bbox[3],
                        hasBorders: false,
                        lockRotation: true,
                        strokeUniform: true,
                    });
                    rectangle.setControlVisible("mtr", false);
                    editor?.canvas.add(rectangle);
                });
        }
    };

    useEffect(loadImage, [editor?.canvas, props.images, imageIndex]);
    useEffect(loadAnnotations, [editor?.canvas, props.images, imageIndex, props.annotations]);

    return (
        <div>
            <FabricJSCanvas onReady={init}/>
            <CanvasButtons addRectangle={addRectangle} addCircle={addCircle} deleteObjects={deleteObjects} zoomIn={zoomIn} zoomOut={zoomOut} previousImage={previousImage} nextImage={nextImage} />
        </div>
    );
};

export default Canvas;