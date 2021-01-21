const initialState = { parmeterProduct: "" };

export default (state = initialState, action) => {
  if (action.type === "PARAMETER_DETAILPRODUCT") {
    return {
      ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
      parmeterProduct: action.payload,
    };
  }

  return state;
};

export const parameterDetailProduct = (state) =>
  state.parameterDetailProductReducer.parmeterProduct;
