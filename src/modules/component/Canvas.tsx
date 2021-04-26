import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Annotation } from "../../types/dataset/Annotation";
import { Image } from "../../types/dataset/Image";
import CanvasButtons from "./CanvasButtons";
import { Object } from "fabric/fabric-impl";
import { createRectangle } from "../../types/canvas/Rectangle";
import { createCircle } from "../../types/canvas/Circle";
import { nextAnnotationID } from "../../types/dataset/Annotation";

const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 50;

type CanvasProps = {
    images: Image[];
    annotations: Annotation[];
    addAnnotation(_: Annotation): void;
};

const Canvas = (props: CanvasProps) => {
    const { selectedObjects, editor, onReady } = useFabricJSEditor()
    const [imageIndex, setImageIndex] = useState<number>(0);

    const nextImage = () => setImageIndex((idx: number) => normalizeIndex(idx + 1));
    const normalizeIndex = (idx: number) => Math.max(0, Math.min(idx, props.images.length - 1));
    const previousImage = () => setImageIndex((idx: number) => normalizeIndex(idx - 1));
    const zoomIn = () => editor?.zoomIn();
    const zoomOut = () => editor?.zoomOut();

    const init = (canvas: fabric.Canvas) => {
        canvas.uniformScaling = false;
        onReady(canvas);
    };

    const addBoundingBox = (annotation: Annotation) => {
        if (editor) {
            const rectangle = createRectangle(
                nextAnnotationID(props.annotations),
                annotation.bbox[0],
                annotation.bbox[1],
                annotation.bbox[2],
                annotation.bbox[3]
            );
            editor.canvas.add(rectangle);
        }
    };

    const addRectangle = () => {
        if (editor) {
            const annotation: Annotation = {
                id: nextAnnotationID(props.annotations),
                image_id: props.images[imageIndex]?.id || 0,
                category_id: 0,
                area: DEFAULT_WIDTH * DEFAULT_HEIGHT,
                iscrowd: 0,
                bbox: [
                    ((editor.canvas.width || 0) - DEFAULT_WIDTH) / 2,
                    ((editor.canvas.height || 0) - DEFAULT_HEIGHT) / 2,
                    DEFAULT_WIDTH,
                    DEFAULT_HEIGHT
                ],
                segmentation: []
            };
            props.addAnnotation(annotation);
        }
    };

    const addCircle = () => {
        if (editor) {
            const circle = createCircle(
                nextAnnotationID(props.annotations),
                (editor.canvas.width || 0) / 2,
                (editor.canvas.height || 0) / 2,
                25
            );
            editor.canvas.add(circle);
        }
    };

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
                .forEach(addBoundingBox);
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