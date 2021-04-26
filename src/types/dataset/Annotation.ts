export interface Annotation {
    id: number;
    image_id: number;
    category_id: number;
    area: number;
    iscrowd: number;
    bbox: number[];
    segmentation: number[];
}

export class Annotation implements Annotation {
    constructor(annotation: Annotation) {
        Object.assign(this, annotation);
    }
}

export const nextAnnotationID = (annotations?: Annotation[]) => {
    return 1 + (annotations || [])
        .reduce((prev: number, curr: Annotation) => Math.max(prev, curr.id), 0);
};