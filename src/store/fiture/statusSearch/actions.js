const StatusRequestSearch = (status) => {
  return {
    type: "STATUS_REQUEST_SEARCH",
    payload: status,
  };
};

export default StatusRequestSearch;
