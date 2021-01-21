const initialState = { firmapi: "" };

export default (state = initialState, action) => {
  console.log(action);
  if (action.type === "FIRM_API") {
    return {
      ...state,
      firmapi: action.payload,
    };
  }

  return state;
};

export const firmApi = (state) => state.changeFirmApiReducer.firmapi;
