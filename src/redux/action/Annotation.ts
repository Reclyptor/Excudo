import { Annotation } from "../../types/dataset/Annotation";
import { Action } from "./index";

export const ADD_ANNOTATION = "ADD_ANNOTATION";
export const DELETE_ANNOTATION = "DELETE_ANNOTATION";
export const UPDATE_ANNOTATION = "UPDATE_ANNOTATION";

export const addAnnotation = (annotation: Annotation): Action<Annotation> => {
    return {
        type: ADD_ANNOTATION,
        payload: annotation
    };
};

export const deleteAnnotation = (id: number): Action<number> => {
    return {
        type: DELETE_ANNOTATION,
        payload: id
    };
};

export const updateAnnotation = (annotation: Annotation): Action<Annotation> => {
    return {
        type: UPDATE_ANNOTATION,
        payload: annotation
    };
};