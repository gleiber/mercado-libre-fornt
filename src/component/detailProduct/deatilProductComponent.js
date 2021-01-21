import React, { Component } from "react";
import { connect } from "react-redux";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";
import { statusRequestSearch } from "../../store/fiture/statusSearch/reducer";
import { detailsProduct } from "../../store/fiture/responseDetailProduct/reducer";
import ParameterDetailProduct from "../../store/fiture/parameterDetailProduct/actions";
import "./style.css";
class DetailsProductComponent extends Component {
  handleRowClick = (item) => {
    const { ParameterDetailProduct, StatusRequestSearch } = this.props;
    ParameterDetailProduct(item.id);
    StatusRequestSearch(false);
  };
  render() {
    const { detailsProd } = this.props;
    let conditions = "";
    if (detailsProd !== "") {
      if (detailsProd.item !== undefined) {
        if (detailsProd.item.condition === "new") {
          conditions = "Nuevo";
        }
      }
    }
    return (
      <div className="section-detail">
        <div className="content-details">
          <div className="content-section-detail">
            <div className="content-img-detail">
              <img
                src={detailsProd.item.picture}
                alt=""
                className="img-detail "
              />
            </div>
            <div className="content-title">
              <p>{conditions}</p>
              <h2 className="title-detail">{detailsProd.item.title}</h2>
              <span className="price-tag-symbol">$</span>
              <span className="price">{detailsProd.item.price.amount}</span>
              <div className="content-button">
                <button className="button-details">Comprar</button>
              </div>
            </div>
          </div>
          <div>
            <div className="content-descripcion">
              <h2>Descripción del producto</h2>
              <p>{detailsProd.item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: parameterSend(state),
    status: statusRequestSearch(state),
    detailsProd: detailsProduct(state),
  };
};

export default connect(mapStateToProps, {
  ParameterDetailProduct,
})(DetailsProductComponent);
