export interface Image {
    id: number;
    license: number;
    file_name: string;
    coco_url: string;
    height: number,
    width: number,
    date_captured: string;
    flickr_url: string;
}

export class Image implements Image {
    constructor(image: Image) {
        Object.assign(this, image);
    }
}