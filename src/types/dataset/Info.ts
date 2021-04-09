export interface Info {
    description: string;
    url: string;
    version: string;
    year: string;
    contributor: string;
    date_created: string;
}

export class Info implements Info {
    constructor(info: Info) {
        Object.assign(this, info);
    }
}