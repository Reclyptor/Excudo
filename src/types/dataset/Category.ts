export interface Category {
    id: number;
    name: string;
    supercategory: string;
}

export class Category implements Category {
    constructor(category: Category) {
        Object.assign(this, category);
    }
}