import React, { Component } from "react";
import "./style.css";
import searchIcon from "../../images/seach-icon.svg";
import { connect } from "react-redux";
import ParameterSend from "../../store/fiture/parameterSearchSend/actions";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";
import StatusRequestSearch from "../../store/fiture/statusSearch/actions";
import StepMenu from "../../store/fiture/step/action";
import { statusRequestSearch } from "../../store/fiture/statusSearch/reducer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    this.props.ParameterSend(data);
    this.props.StatusRequestSearch(false);
    this.setState({ data: "" });
    this.props.StepMenu(1);
  };
  handleChange = (event) => {
    const parameterSend = this.removeAccents(event.target.value);
    this.setState({ data: parameterSend });
  };
  handleAddTodo = () => {
    this.props.ParameterSend(this.state.data);
    this.props.StatusRequestSearch(false);
    this.setState({ data: "" });
    this.props.StepMenu(1);
  };

  render() {
    return (
      <div className="container-search">
        <form onSubmit={this.onFormSubmit} className="form-content">
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
        </form>
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

export default connect(mapStateToProps, {
  ParameterSend,
  StatusRequestSearch,
  StepMenu,
})(Search);
