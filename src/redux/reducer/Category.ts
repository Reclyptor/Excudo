import { Dataset } from "../../types/dataset/Dataset";
import { Category, nextCategoryID } from "../../types/dataset/Category";
import { Action } from "../action";
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../action/Category";

const addCategory = (state: Dataset, action: Action<Category>): Dataset => {
    return {
        ...state,
        categories: [
            ...(state.categories || []),
            {...action.payload, id: nextCategoryID(state.categories)}
        ]
    };
};

const deleteCategory = (state: Dataset, action: Action<number>): Dataset => {
    const categories: Category[] = [ ...(state.categories || []) ];
    for (let idx = 0; idx < categories.length; idx++) {
        if (categories[idx].id === action.payload) {
            return {
                ...state,
                categories: [ ...categories.slice(0, action.payload), ...categories.slice(action.payload + 1) ]
            };
        }
    }
    return state;
};

const updateCategory = (state: Dataset, action: Action<Category>): Dataset => {
    const categories: Category[] = [ ...(state.categories || []) ];
    for (let idx = 0; idx < categories.length; idx++) {
        if (categories[idx].id === action.payload.id) {
            categories[idx] = action.payload;
        }
    }
    return { ...state, categories };
};

const categoryReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case ADD_CATEGORY: return addCategory(state, action as Action<Category>);
        case DELETE_CATEGORY: return deleteCategory(state, action as Action<number>);
        case UPDATE_CATEGORY: return updateCategory(state, action as Action<Category>);
        default: return state;
    }
};

export default categoryReducer;