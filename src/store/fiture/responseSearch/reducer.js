const initialState = { title: "" };

export default (state = initialState, action) => {
  if (action.type === "UPDATE_TITLE") {
    return {
      ...state,
      title: action.payload,
    };
  }

  return state;
};

export const selectActiveTitle = (state) => state.TitleReducer.title;
