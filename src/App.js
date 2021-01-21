import logo from "./images/mercado-libre.png";
import "./App.css";
import React, { Component } from "react";
import Search from "./component/search/search";
import ResultSeach from "./component/resultSearch/resultSearch";
import DetailsProductComponent from "./component/detailProduct/deatilProductComponent";
import BreadcrumbView from "./component/breadcrum/breadcrum";
import { connect } from "react-redux";
import UpdateTitleHeader from "./store/fiture/responseSearch/actions";
import ParameterSend from "./store/fiture/parameterSearchSend/actions";
import DetailsProduct from "./store/fiture/responseDetailProduct/actions";
import ParameterDetailProduct from "./store/fiture/parameterDetailProduct/actions";
import StepMenu from "./store/fiture/step/action";
import ChangeBreadcrum from "./store/fiture/parmeterHandlerBreadcrum/actions";
import FirmApi from "./store/fiture/firmApi/actions";
import { firmApi } from "./store/fiture/firmApi/reducer";
import { changeBreadcrum } from "./store/fiture/parmeterHandlerBreadcrum/reducer";
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
  async componentDidMount() {
    const requestFirmApi = {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    };
    const fetchResponseFirmApi = await fetch(
      "http://localhost:8001/firmApi",
      requestFirmApi
    );
    const response = await fetchResponseFirmApi.json();
    console.log(response);
    this.props.FirmApi(response);
  }
  async componentDidUpdate() {
    const {
      status,
      StatusRequestSearch,
      data,
      breadcrum,
      ParameterSend,
      parmeterProduct,
      ParameterDetailProduct,
    } = this.props;

    if (status !== true) {
      StatusRequestSearch(true);
      console.log();
      console.log("Paso por aqui", breadcrum);
      if (data !== null || breadcrum !== null) {
        ParameterSend(null);

        const myHeaders = new Headers();
        const Authorization = "Bearer " + this.props.firmapi.token;
        console.log("Authorization", Authorization);
        myHeaders.append("Authorization", Authorization);
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
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

        const myHeaders = new Headers();
        const Authorization = "Bearer " + this.props.firmapi.token;
        console.log("Authorization", Authorization);
        myHeaders.append("Authorization", Authorization);
        myHeaders.append("Content-Type", "application/json");
        const requestOptionsDetail = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
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
    const { title } = this.props;
    let BreadcrumbData = [
      {
        id: "",
        label: "",
      },
    ];
    if (title !== "") {
      if (title.categories != null) {
        BreadcrumbData.shift();
        title.categories.forEach((element) => {
          BreadcrumbData.push({
            id: element,
            label: element,
          });
        });
      }
    }
    return (
      <div className="App">
        <section className="container">
          <div className="content">
            <img src={logo} className="App-logo " alt="logo" />
            <Search />
          </div>
        </section>
        <section className="section-breadcrumbData">
          <BreadcrumbView items={BreadcrumbData} />
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
    breadcrum: changeBreadcrum(state),
    firmapi: firmApi(state),
  };
};

export default connect(mapStateToProps, {
  UpdateTitleHeader,
  ParameterSend,
  StatusRequestSearch,
  DetailsProduct,
  ParameterDetailProduct,
  StepMenu,
  ChangeBreadcrum,
  FirmApi,
})(App);
