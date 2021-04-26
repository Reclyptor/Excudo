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

export const nextCategoryID = (categories?: Category[]) => {
    return 1 + (categories || [])
        .reduce((prev: number, curr: Category) => Math.max(prev, curr.id), 0);
};