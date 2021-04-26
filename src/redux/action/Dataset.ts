import { Dataset } from "../../types/dataset/Dataset";
import { Action } from "./index";

export const SET_DATASET = "SET_DATASET";

export const setDataset = (dataset: Dataset): Action<Dataset> => {
    return {
        type: SET_DATASET,
        payload: dataset
    };
};