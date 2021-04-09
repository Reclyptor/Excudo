export interface License {
    id: number;
    name: string;
    url: string;
}

export class License implements License {
    constructor(license: License) {
        Object.assign(this, license);
    }
}