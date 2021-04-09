import {combineReducers} from "redux";
import datasetReducer from "./Dataset";

const rootReducer = combineReducers({
    dataset: datasetReducer
});

export default rootReducer;