import React, { Component } from "react";
import "./style.css";
import searchIcon from "../../images/seach-icon.svg";
import { connect } from "react-redux";
import ParameterSend from "../../store/fiture/parameterSearchSend/actions";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";
import StatusRequestSearch from "../../store/fiture/statusSearch/actions";
import { statusRequestSearch } from "../../store/fiture/statusSearch/reducer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  handleChange = (event) => {
    this.setState({ data: event.target.value });
  };
  handleAddTodo = () => {
    this.props.ParameterSend(this.state.data);
    this.props.StatusRequestSearch(false);
    this.setState({ data: "" });
  };

  render() {
    return (
      <div className="container-search">
        <input
          className="input-search"
          type="text"
          value={this.state.data}
          placeholder="Nunca dejes de buscar"
          onChange={this.handleChange}
        />
        <button className="button-search" onClick={this.handleAddTodo}>
          <img
            src={searchIcon}
            className="search-icon "
            alt="search-icon"
          ></img>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: parameterSend(state),
    status: statusRequestSearch(state),
  };
};

/*const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitleHeader: () => dispatch(UpdateTitleHeader()),
  };
};*/

export default connect(mapStateToProps, { ParameterSend, StatusRequestSearch })(
  Search
);
