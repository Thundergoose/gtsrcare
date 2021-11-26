import * as types from '../constants/actionTypes';

const initialState = {
  complimentsList: [],
  user_id: null,
  tagsList: [],
  compliment: {},
  error: null
};

const complimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      //set user_id
      return { ...state, user_id: action.payload.user_id, complimentsList: action.payload.complimentsList, tagsList: action.payload.tagsList, compliment: action.payload.compliment };
    case types.LOGOUT:
      //set user_id to null
      return { ...state, user_id: action.payload, error: action.payload };
    case types.LOGIN_ERROR:
      //set error to error message
      //console.log('action payload:', action.payload)
      return { ...state, error: action.payload };
    case types.SIGN_UP:
      //set user_id
      return { ...state, user_id: action.payload.user_id, complimentsList: action.payload.complimentsList, tagsList: action.payload.tagsList, compliment: action.payload.compliment };
    case types.SIGNUP_ERROR:
      //set error to error message
      return { ...state, error: action.payload };
    case types.GET_COMPLIMENT:
      //assign compliment list to the list fetched from get request
    return { ...state, complimentsList: action.payload.complimentsList, compliment: action.payload.compliment };

    case types.POST_COMPLIMENT:
      //add new compliment to compliment list

      const newComplimentsList = [...state.complimentsList]
      newComplimentsList.push(action.payload);
      return { ...state, complimentsList: newComplimentsList };
    case types.PATCH_COMPLIMENT: {
      //update patched compliment in compliment list
      console.log(action.payload)
      const newComplimentsList = [];
      for( const obj of state.complimentsList){
        if(obj.id === action.payload.id) newComplimentsList.push(action.payload)
        else newComplimentsList.push(obj)
      }
      // (state.complimentsList).map((obj) => {
      //   if (obj.id === action.payload.id) {
      //     // console.log(Object.assign({}, action.payload));
      //     return action.payload;
      //   }
      //     // return Object.assign({}, action.payload)}
      //   else return obj;
      // });
      //console.log(newComplimentsList)
      return { ...state, complimentsList: newComplimentsList };
    }
    

    case types.DELETE_COMPLIMENT: {
      //remove deleted compliment from compliment list
      const newComplimentsList = [...state.complimentsList].filter(
        (obj) => obj.id !== action.payload
      );
      return { ...state, complimentsList: newComplimentsList };
    }

    case types.UPDATE_FAVORITE:
      //toggle add/remove from favorites
      console.log('In reducer:', action.payload)
      return { ...state };
    
    default:
      return state;
  }
};
export default complimentReducer;
