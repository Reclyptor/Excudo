import { Dataset } from "../../types/dataset/Dataset";
import { Annotation, nextAnnotationID } from "../../types/dataset/Annotation";
import { Action } from "../action";
import { ADD_ANNOTATION, DELETE_ANNOTATION, UPDATE_ANNOTATION } from "../action/Annotation";

const addAnnotation = (state: Dataset, action: Action<Annotation>): Dataset => {
    return {
        ...state,
        annotations: [
            ...(state.annotations || []),
            { ...action.payload, id: nextAnnotationID(state.annotations) }
        ]
    };
};

const deleteAnnotation = (state: Dataset, action: Action<number>): Dataset => {
    const annotations: Annotation[] = [ ...(state.annotations || []) ];
    for (let idx = 0; idx < annotations.length; idx++) {
        if (annotations[idx].id === action.payload) {
            return {
                ...state,
                annotations: [ ...annotations.slice(0, idx), ...annotations.slice(idx + 1) ]
            };
        }
    }
    return state;
};

const updateAnnotation = (state: Dataset, action: Action<Annotation>): Dataset => {
    const annotations: Annotation[] = [ ...(state.annotations || []) ];
    for (let idx = 0; idx < annotations.length; idx++) {
        if (annotations[idx].id === action.payload.id) {
            annotations[idx] = action.payload;
        }
    }
    return { ...state, annotations };
};

const annotationReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case ADD_ANNOTATION: return addAnnotation(state, action as Action<Annotation>);
        case DELETE_ANNOTATION: return deleteAnnotation(state, action as Action<number>);
        case UPDATE_ANNOTATION: return updateAnnotation(state, action as Action<Annotation>);
        default: return state;
    }
};

export default annotationReducer;