import { Dataset } from "../../types/dataset/Dataset";
import { Info } from "../../types/dataset/Info";
import { Action } from "../action";
import { SET_INFO } from "../action/Info";

const setInfo = (state: Dataset, action: Action<Info>): Dataset => {
    return { ...state, info: action.payload };
};

const infoReducer = (state: Dataset = {}, action: Action<any>): Dataset => {
    switch (action.type) {
        case SET_INFO: return setInfo(state, action as Action<Info>);
        default: return state;
    }
};

export default infoReducer;