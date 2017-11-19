import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';
  //vanillla javascript redux expects the reducer to
  //immediately update the state
  //so for asyn actions we need a middleware like thunk
  //if not asynv it woud work like in the blogpost-app
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

//same as this even more condensed version
// export const fetchUser = () => async (dispatch) => {
// dispatch({ type: FETCH_USER, payload: await axios.get('/api/current_user'); });
// };

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  //this dispatch lets the credits in the Header
  //automatically update by dispatching fetchuser actino
  //after posting via axios
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};