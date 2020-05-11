import { act } from "react-dom/test-utils";

const userData = (state = {}, action) => {
    console.log("yeh bhi chala kya!!???", action.data, action.type);
    switch(action.type){
        case 'USERLOGGED':
            state ={...state, userData:action.data} ;
            return state;
        default:
            return state;
    };
};

export default userData;
