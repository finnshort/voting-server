//generic function that takes any kind of action and its current state, and invokes the core function that matches that action
//this is a reducer!

import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state = INITIAL_STATE, action.entries);
  case 'NEXT':
    return next(state);
  case 'VOTE':
  return state.update('vote',
                      voteState => vote(voteState, action.entry));
  }
  return state;
}
