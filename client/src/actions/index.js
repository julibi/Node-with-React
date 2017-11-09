import axios from 'axios';
import { FETCH_USER } from './types';

  //vanillla javascript redux expects the reducer to
  //immediately update the state
  //so for asyn actions we need a middleware like thunk
  //if not asynv it woud work like in the blogpost-app
export const fetchUser = () => async (dispatch) => {
      const res = await axios.get('/api/current_user');
      dispatch({ type: FETCH_USER, payload: res.data });
};

//same as this even more condensed version
// export const fetchUser = () => async (dispatch) => {
// dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user'); });
// };