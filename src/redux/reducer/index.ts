import {State} from "../store";
import {Action} from "../action";

const rootReducer = (state: State = {}, action: Action<any>) => {
    return state;
};

export default rootReducer;