import { Dataset } from "../../types/dataset/Dataset";
import { Image, nextImageID } from "../../types/dataset/Image";
import { Action } from "../action";
import { ADD_IMAGE, DELETE_IMAGE, UPDATE_IMAGE } from "../action/Image";

const addImage = (state: Dataset, action: Action<Image>): Dataset => {
    return {
        ...state,
        images: [
            ...(state.images || []),
            { ...action.payload, id: nextImageID(state.images) }
        ]
    };
};

const deleteImage = (state: Dataset, action: Action<number>): Dataset => {
    const images: Image[] = [ ...(state.images || []) ];
    for (let idx = 0; idx < images.length; idx++) {
        if (images[idx].id === action.payload) {
            return {
                ...state,
                images: [ ...images.slice(0, action.payload), ...images.slice(action.payload + 1) ]
            };
        }
    }
    return state;
};

const updateImage = (state: Dataset, action: Action<Image>): Dataset => {
    const images: Image[] = [ ...(state.images || []) ];
    for (let idx = 0; idx < images.length; idx++) {
        if (images[idx].id === action.payload.id) {
            images[idx] = action.payload;
        }
    }
    return { ...state, images };
};

const imageReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case ADD_IMAGE: return addImage(state, action as Action<Image>);
        case DELETE_IMAGE: return deleteImage(state, action as Action<number>);
        case UPDATE_IMAGE: return updateImage(state, action as Action<Image>);
        default: return state;
    }
};

export default imageReducer;