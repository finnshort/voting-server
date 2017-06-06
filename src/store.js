/* If we had a collection of every action that would ever occur in our app, we
// could just call reduce. but in reality actions come in at all different times,
// and we need something to 'store' the state of the application over time.
*/

/* the store is initialized with the reducer function and then we dispatch
// actions to the store:
import {createStore} from 'redux';
const store = createStore(reducer);
// The store will internally use your reducer to apply actions to the current
// state, and save the next state.
store.dispatch({type: 'NEXT'});
// You can get the current state any time:
store.getState();
*/
import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
  console.log("Reducer: " + reducer);
  return createStore(reducer);
}
