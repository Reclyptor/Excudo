import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Annotation } from "../../types/dataset/Annotation";
import { Image } from "../../types/dataset/Image";
import { Object } from "fabric/fabric-impl";
import { createRectangle } from "../../types/canvas/Rectangle";
import { createCircle } from "../../types/canvas/Circle";
import { nextAnnotationID } from "../../types/dataset/Annotation";
import CanvasButtons from "./CanvasButtons";

const DEFAULT_BBOX_WIDTH = 50;
const DEFAULT_BBOX_HEIGHT = 50;
const DEFAULT_CANVAS_WIDTH = 500;
const DEFAULT_CANVAS_HEIGHT = 500;

type CanvasProps = {
    images: Image[];
    annotations: Annotation[];
    addAnnotation(_: Annotation): void;
    updateAnnotation(_: Annotation): void;
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
            const image: Image = props.images[imageIndex];
            const rectangle = createRectangle(
                nextAnnotationID(props.annotations),
                (Math.min(image.width, DEFAULT_CANVAS_WIDTH) / image.width) * annotation.bbox[0],
                (Math.min(image.width, DEFAULT_CANVAS_WIDTH) / image.width) * annotation.bbox[1],
                (Math.min(image.width, DEFAULT_CANVAS_WIDTH) / image.width) * annotation.bbox[2],
                (Math.min(image.width, DEFAULT_CANVAS_WIDTH) / image.width) * annotation.bbox[3]
            );
            const update = (e: fabric.IEvent) => {
                props.updateAnnotation({
                    ...annotation,
                    bbox: [
                        e.target?.left || ((editor.canvas.width || 0) - DEFAULT_BBOX_WIDTH) / 2,
                        e.target?.top || ((editor.canvas.height || 0) - DEFAULT_BBOX_HEIGHT) / 2,
                        (e.target?.width || DEFAULT_BBOX_WIDTH) * (e.target?.scaleX || 1),
                        (e.target?.height || DEFAULT_BBOX_HEIGHT) * (e.target?.scaleY || 1)
                    ]
                });
            };
            rectangle.on("moved", update);
            rectangle.on("scaled", update);
            editor.canvas.add(rectangle);
        }
    };

    const addRectangle = () => {
        if (editor) {
            const annotation: Annotation = {
                id: nextAnnotationID(props.annotations),
                image_id: props.images[imageIndex]?.id || 0,
                category_id: 0,
                area: DEFAULT_BBOX_WIDTH * DEFAULT_BBOX_HEIGHT,
                iscrowd: 0,
                bbox: [
                    ((editor.canvas.width || 0) - DEFAULT_BBOX_WIDTH) / 2,
                    ((editor.canvas.height || 0) - DEFAULT_BBOX_HEIGHT) / 2,
                    DEFAULT_BBOX_WIDTH,
                    DEFAULT_BBOX_HEIGHT
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

    const isHorizontal = (image: Image) => {
        return image.width > image.height;
    }

    const isVertical = (image: Image) => {
        return image.height > image.width;
    };

    const computeDisplacementX = (image: Image): number => {
        if (isHorizontal(image)) {
            if (image.width > DEFAULT_CANVAS_WIDTH) {
                return 0;
            }
        }
        return ((Math.min(image.width, DEFAULT_CANVAS_WIDTH)) - (computeScaleX(image) * image.width)) / 2;
    };

    const computeDisplacementY = (image: Image): number => {
        return 0;
        // if (isVertical(image)) {
        //     if (image.height > DEFAULT_CANVAS_HEIGHT) {
        //         return 0;
        //     }
        // }
        // return (DEFAULT_CANVAS_HEIGHT - (computeScaleY(image) * image.height)) / 2;
    };

    const computeScaleX = (image: Image): number => {
        if (isHorizontal(image)) {
            if (image.width > DEFAULT_CANVAS_WIDTH) {
                return DEFAULT_CANVAS_WIDTH / image.width
            }
            return 1;
        }
        return DEFAULT_CANVAS_HEIGHT / image.height;
    };

    const computeScaleY = (image: Image): number => {
        if (isVertical(image)) {
            if (image.height > DEFAULT_CANVAS_HEIGHT) {
                return DEFAULT_CANVAS_HEIGHT / image.height;
            }
            return 1;
        }
        return computeScaleX(image);
    };

    const loadImage = () => {
        if (editor?.canvas && props.images.length > imageIndex) {
            const image: Image = props.images[imageIndex];
            editor.canvas.setWidth(Math.min(image.width, DEFAULT_CANVAS_WIDTH));
            editor.canvas.setHeight(DEFAULT_CANVAS_HEIGHT);
            editor.canvas.setBackgroundImage(image.coco_url, editor.canvas.renderAll.bind(editor.canvas), {
                originX: 'left',
                originY: 'top',
                left: computeDisplacementX(image),
                top: computeDisplacementY(image),
                scaleX: computeScaleX(image),
                scaleY: computeScaleY(image)
            });
            console.log(image.coco_url);
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