const initialState = { breadcrum: "" };

export default (state = initialState, action) => {
  console.log(action);
  if (action.type === "CHANGE_BREADCRUM") {
    return {
      ...state,
      breadcrum: action.payload,
    };
  }

  return state;
};

export const changeBreadcrum = (state) =>
  state.changeBreadcrumReducer.breadcrum;
