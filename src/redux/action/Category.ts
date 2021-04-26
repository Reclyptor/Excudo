import { Category } from "../../types/dataset/Category";
import { Action } from "./index";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const addCategory = (category: Category): Action<Category> => {
    return {
        type: ADD_CATEGORY,
        payload: category
    };
};

export const deleteCategory = (id: number): Action<number> => {
    return {
        type: DELETE_CATEGORY,
        payload: id
    };
};

export const updateCategory = (category: Category): Action<Category> => {
    return {
        type: UPDATE_CATEGORY,
        payload: category
    };
};