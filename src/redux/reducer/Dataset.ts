import {Dataset} from "../../types/dataset/Dataset";
import {Action} from "../action";
import {SET_DATASET} from "../action/Dataset";

const setDataset = (state: Dataset, action: Action<Dataset>): Dataset => {
    return { ...action.payload };
};

const datasetReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case SET_DATASET: return setDataset(state, action as Action<Dataset>);
        default: return state;
    }
};

export default datasetReducer;