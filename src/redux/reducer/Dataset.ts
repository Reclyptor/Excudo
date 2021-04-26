import { Dataset } from "../../types/dataset/Dataset";
import { Info } from "../../types/dataset/Info";
import { License } from "../../types/dataset/License";
import { Image } from "../../types/dataset/Image";
import { Category } from "../../types/dataset/Category";
import { Annotation } from "../../types/dataset/Annotation";
import { Action } from "../action";
import { SET_DATASET } from "../action/Dataset";
import { SET_INFO } from "../action/Info";
import { ADD_IMAGE, DELETE_IMAGE, UPDATE_IMAGE } from "../action/Image";
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../action/Category";
import { ADD_ANNOTATION, DELETE_ANNOTATION, UPDATE_ANNOTATION } from "../action/Annotation";
import infoReducer from "./Info";
import imageReducer from "./Image";
import categoryReducer from "./Category";
import annotationReducer from "./Annotation";
import { ADD_LICENSE, DELETE_LICENSE, UPDATE_LICENSE } from "../action/License";
import licenseReducer from "./License";

const setDataset = (state: Dataset, action: Action<Dataset>): Dataset => {
    return { ...action.payload };
};

const datasetReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case SET_DATASET: return setDataset(state, action as Action<Dataset>);
        case SET_INFO: return infoReducer(state, action as Action<Info>);
        case ADD_LICENSE: return licenseReducer(state, action as Action<License>);
        case DELETE_LICENSE: return licenseReducer(state, action as Action<number>);
        case UPDATE_LICENSE: return licenseReducer(state, action as Action<License>);
        case ADD_IMAGE: return imageReducer(state, action as Action<Image>)
        case DELETE_IMAGE: return imageReducer(state, action as Action<number>)
        case UPDATE_IMAGE: return imageReducer(state, action as Action<Image>)
        case ADD_CATEGORY: return categoryReducer(state, action as Action<Category>)
        case DELETE_CATEGORY: return categoryReducer(state, action as Action<number>)
        case UPDATE_CATEGORY: return categoryReducer(state, action as Action<Category>)
        case ADD_ANNOTATION: return annotationReducer(state, action as Action<Annotation>)
        case DELETE_ANNOTATION: return annotationReducer(state, action as Action<number>)
        case UPDATE_ANNOTATION: return annotationReducer(state, action as Action<Annotation>)
        default: return state;
    }
};

export default datasetReducer;