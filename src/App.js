import logo from "./images/mercado-libre.png";
import "./App.css";
import React, { Component } from "react";
import Search from "./component/search/search";
import { connect } from "react-redux";
import UpdateTitleHeader from "./store/fiture/responseSearch/actions";
import { selectActiveTitle } from "./store/fiture/responseSearch/reducer";
import { parameterSend } from "./store/fiture/parameterSearchSend/reducer";
import { statusRequestSearch } from "./store/fiture/statusSearch/reducer";
import StatusRequestSearch from "./store/fiture/statusSearch/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
    this.props = {
      prev_props: this.props.data,
    };
  }

  async componentDidUpdate() {
    if (this.props.status !== true) {
      this.props.StatusRequestSearch(true);

      const requestOptions = {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      };
      const fetchResponse = await fetch(
        "http://localhost:8001/api/items?q=" + this.props.data,
        requestOptions
      );
      const response = await fetchResponse.json();
      console.log(response);
      this.props.UpdateTitleHeader(response);
      //getTags(response);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <img src={logo} className="App-logo " alt="logo" />
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    title: selectActiveTitle(state),
    data: parameterSend(state),
    status: statusRequestSearch(state),
  };
};

export default connect(
  mapStateToProps,
  { UpdateTitleHeader, StatusRequestSearch }
  //{ StatusRequestSearch }
)(App);
