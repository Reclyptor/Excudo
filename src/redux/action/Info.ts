import { Info } from "../../types/dataset/Info";
import { Action } from "./index";

export const SET_INFO = "SET_INFO";

export const setInfo = (info: Info): Action<Info> => {
    return {
        type: SET_INFO,
        payload: info
    };
};