import { FETCH_USER } from '../actions/types';
//state null "we don't know yet what to return"
//state false "no the user is not  logged in"
//state User model "ok logged in"
export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}