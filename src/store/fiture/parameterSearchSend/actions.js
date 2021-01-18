const ParameterSend = (data) => {
  return {
    type: "PARAMETER_SEND",
    payload: data,
  };
};

export default ParameterSend;
