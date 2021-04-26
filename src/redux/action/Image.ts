import { Image } from "../../types/dataset/Image";
import { Action } from "./index";

export const ADD_IMAGE = "ADD_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";

export const addImage = (image: Image): Action<Image> => {
    return {
        type: ADD_IMAGE,
        payload: image
    };
};

export const deleteImage = (id: number): Action<number> => {
    return {
        type: DELETE_IMAGE,
        payload: id
    };
};

export const updateImage = (image: Image): Action<Image> => {
    return {
        type: UPDATE_IMAGE,
        payload: image
    };
};