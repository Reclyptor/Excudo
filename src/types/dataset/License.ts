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

export const nextLicenseID = (licenses?: License[]) => {
    return 1 + (licenses || [])
        .reduce((prev: number, curr: License) => Math.max(prev, curr.id), 0);
};