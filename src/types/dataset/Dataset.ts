import {Info} from "./Info";
import {License} from "./License";
import {Image} from "./Image";
import {Category} from "./Category";
import {Annotation} from "./Annotation";

export interface Dataset {
    info: Info;
    licenses: License[];
    images: Image[];
    categories: Category[];
    annotations: Annotation[];
}

export class Dataset implements Dataset {
    constructor(dataset: Dataset) {
        Object.assign(this, dataset);
    }
}