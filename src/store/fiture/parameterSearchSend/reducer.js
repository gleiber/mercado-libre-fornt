const initialState = { data: "" };

export default (state = initialState, action) => {
  if (action.type === "PARAMETER_SEND") {
    return {
      ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
      data: action.payload,
    };
  }

  return state;
};

export const parameterSend = (state) => state.parameterSendReducer.data;
