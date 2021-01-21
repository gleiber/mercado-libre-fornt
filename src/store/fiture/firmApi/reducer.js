const initialState = { firmapi: "" };

export default (state = initialState, action) => {
  if (action.type === "FIRM_API") {
    return {
      ...state,
      firmapi: action.payload,
    };
  }

  return state;
};

export const firmApi = (state) => state.changeFirmApiReducer.firmapi;
