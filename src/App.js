import logo from "./images/mercado-libre.png";
import "./App.css";
import React, { Component } from "react";
import Search from "./component/search/search";
import { connect } from "react-redux";
import UpdateTitleHeader from "./store/fiture/responseSearch/actions";
import { selectActiveTitle } from "./store/fiture/responseSearch/reducer";
import { parameterSend } from "./store/fiture/parameterSearchSend/reducer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    this.props.UpdateTitleHeader("Motorola");
  }

  async componentDidUpdate() {
    console.log("entro aqui en el componentDidUpdate");
    console.log("this.props.parameterSend", this.props.parameterSend.title);
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    };
    const fetchResponse = await fetch(
      "http://localhost:8001/api/items?q=" + this.props.parameterSend.title,
      requestOptions
    );
    const response = await fetchResponse.json();
    console.log(response);
    this.props.UpdateTitleHeader(response);
    //getTags(response);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitleHeader: () => dispatch(UpdateTitleHeader()),
  };
};

export default connect(mapStateToProps, { UpdateTitleHeader })(App);
