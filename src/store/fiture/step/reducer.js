const initialState = { steps: 0 };

export default (state = initialState, action) => {
  if (action.type === "STEP") {
    return {
      ...state,
      steps: action.payload,
    };
  }

  return state;
};

export const stepMenu = (state) => state.stepMenuReducer.steps;
