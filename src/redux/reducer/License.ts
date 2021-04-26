import { Dataset } from "../../types/dataset/Dataset";
import { License, nextLicenseID } from "../../types/dataset/License";
import { Action } from "../action";
import { ADD_LICENSE, DELETE_LICENSE, UPDATE_LICENSE } from "../action/License";

const addLicense = (state: Dataset, action: Action<License>): Dataset => {
    return {
        ...state,
        licenses: [
            ...(state.licenses || []),
            { ...action.payload, id: nextLicenseID(state.licenses) }
        ]
    };
};

const deleteLicense = (state: Dataset, action: Action<number>): Dataset => {
    const licenses: License[] = [ ...(state.licenses || []) ];
    for (let idx = 0; idx < licenses.length; idx++) {
        if (licenses[idx].id === action.payload) {
            return {
                ...state,
                licenses: [ ...licenses.slice(0, action.payload), ...licenses.slice(action.payload + 1) ]
            };
        }
    }
    return state;
};

const updateLicense = (state: Dataset, action: Action<License>): Dataset => {
    const licenses: License[] = [ ...(state.licenses || []) ];
    for (let idx = 0; idx < licenses.length; idx++) {
        if (licenses[idx].id === action.payload.id) {
            licenses[idx] = action.payload;
        }
    }
    return { ...state, licenses };
};

const licenseReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case ADD_LICENSE: return addLicense(state, action as Action<License>);
        case DELETE_LICENSE: return deleteLicense(state, action as Action<number>);
        case UPDATE_LICENSE: return updateLicense(state, action as Action<License>);
        default: return state;
    }
};

export default licenseReducer;