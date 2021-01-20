const StepMenu = (status) => {
  return {
    type: "STEP",
    payload: status,
  };
};

export default StepMenu;
