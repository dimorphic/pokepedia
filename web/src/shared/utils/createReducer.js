//
//  reducer creator helper to reduce boilerplate ?
//
export default function createReducer(initialState = undefined, actionHandlers = undefined) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];

    // apply reducer if any
    if (reduceFn) {
      return reduceFn(state, action);
    }

    // fallback
    return state;
  };
}
