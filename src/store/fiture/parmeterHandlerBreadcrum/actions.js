const ChangeBreadcrum = (breadcrum) => {
  return {
    type: "CHANGE_BREADCRUM",
    payload: breadcrum,
  };
};

export default ChangeBreadcrum;
