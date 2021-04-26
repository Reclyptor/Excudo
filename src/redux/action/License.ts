import { License } from "../../types/dataset/License";
import { Action } from "./index";

export const ADD_LICENSE = "ADD_LICENSE";
export const DELETE_LICENSE = "DELETE_LICENSE";
export const UPDATE_LICENSE = "UPDATE_LICENSE";

export const addLicense = (license: License): Action<License> => {
    return {
        type: ADD_LICENSE,
        payload: license
    };
};

export const deleteLicense = (id: number): Action<number> => {
    return {
        type: DELETE_LICENSE,
        payload: id
    };
};

export const updateLicense = (license: License): Action<License> => {
    return {
        type: UPDATE_LICENSE,
        payload: license
    };
};