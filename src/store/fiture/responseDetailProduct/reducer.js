const initialState = { detailsProd: "" };

export default (state = initialState, action) => {
  if (action.type === "DETAILS_PRODUCT") {
    return {
      ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
      detailsProd: action.payload,
    };
  }

  return state;
};

export const detailsProduct = (state) =>
  state.detailsProductReducer.detailsProd;
