import {combineReducers} from 'redux'

import userReducer from "./user.reducer";
import addressReducer from "./address.reducer";
import allCodeReducer from "./all-code.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  address: addressReducer,
  allCode: allCodeReducer

})

export default rootReducer;