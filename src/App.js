import logo from "./images/mercado-libre.png";
import "./App.css";
import React, { Component } from "react";
import Search from "./component/search/search";
import ResultSeach from "./component/resultSearch/resultSearch";
import DetailsProductComponent from "./component/detailProduct/deatilProductComponent";
import { connect } from "react-redux";
import UpdateTitleHeader from "./store/fiture/responseSearch/actions";
import ParameterSend from "./store/fiture/parameterSearchSend/actions";
import DetailsProduct from "./store/fiture/responseDetailProduct/actions";
import ParameterDetailProduct from "./store/fiture/parameterDetailProduct/actions";
import StepMenu from "./store/fiture/step/action";
import { selectActiveTitle } from "./store/fiture/responseSearch/reducer";
import { parameterSend } from "./store/fiture/parameterSearchSend/reducer";
import { statusRequestSearch } from "./store/fiture/statusSearch/reducer";
import StatusRequestSearch from "./store/fiture/statusSearch/actions";
import { parameterDetailProduct } from "./store/fiture/parameterDetailProduct/reducer";
import { detailsProduct } from "./store/fiture/responseDetailProduct/reducer";
import { stepMenu } from "./store/fiture/step/reducer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  async componentDidUpdate() {
    const {
      status,
      StatusRequestSearch,
      data,
      ParameterSend,
      parmeterProduct,
      ParameterDetailProduct,
    } = this.props;

    if (status !== true) {
      StatusRequestSearch(true);
      if (data !== null) {
        ParameterSend(null);
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
      }
      if (parmeterProduct !== null) {
        ParameterDetailProduct(null);
        const requestOptionsDetail = {
          headers: { "Content-Type": "application/json" },
          method: "GET",
        };
        const fetchResponseDetail = await fetch(
          "http://localhost:8001/api/items/" + parmeterProduct,
          requestOptionsDetail
        );
        const responseDetail = await fetchResponseDetail.json();
        console.log(" responseDetail", responseDetail);
        this.props.DetailsProduct(responseDetail);
        this.props.StepMenu(2);
      }
    }
  }

  render() {
    console.log(this.props.steps);
    return (
      <div className="App">
        <section className="container">
          <div className="content">
            <img src={logo} className="App-logo " alt="logo" />
            <Search />
          </div>
        </section>
        {this.props.steps === 0 && <section className="inicio"></section>}
        {this.props.steps === 1 && (
          <section className="section-result">
            <ResultSeach />
          </section>
        )}
        {this.props.steps === 2 && (
          <section className="section-result">
            <DetailsProductComponent />
          </section>
        )}
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
    parmeterProduct: parameterDetailProduct(state),
    detailProduct: detailsProduct(state),
    steps: stepMenu(state),
  };
};

export default connect(mapStateToProps, {
  UpdateTitleHeader,
  ParameterSend,
  StatusRequestSearch,
  DetailsProduct,
  ParameterDetailProduct,
  StepMenu,
})(App);
