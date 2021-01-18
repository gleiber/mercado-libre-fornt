import React, { Component } from "react";
import "./style.css";
import searchIcon from "../../images/seach-icon.svg";
import { connect } from "react-redux";
import ParameterSend from "../../store/fiture/parameterSearchSend/actions";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
    //this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ data: event.target.value });
    this.props.ParameterSend(event.target.value);
    //this.props.history.push("/:query");
  };
  closeModal() {
    this.props.ParameterSend("motog");
  }

  render() {
    return (
      <div className="container-search">
        <form className="text">
          <input
            className="input-search"
            type="text"
            placeholder="Nunca dejes de buscar"
            onChange={this.handleChange}
          />
          <button className="button-search" onClick={() => this.closeModal()}>
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
  console.log("entro aqui en el state");
  console.log(state);
  return {
    data: parameterSend(state),
  };
};

/*const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitleHeader: () => dispatch(UpdateTitleHeader()),
  };
};*/

export default connect(mapStateToProps, { ParameterSend })(Search);
