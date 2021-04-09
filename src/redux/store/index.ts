import {Dataset} from "../../types/dataset/Dataset";
import rootReducer from "../reducer";
import {createStore} from "redux";

export interface State {
    dataset?: Dataset;
}

const storeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, storeEnhancer);

export default store;