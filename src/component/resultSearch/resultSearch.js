import React, { Component } from "react";
import { connect } from "react-redux";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";
import { statusRequestSearch } from "../../store/fiture/statusSearch/reducer";
import StatusRequestSearch from "../../store/fiture/statusSearch/actions";
import ParameterSend from "../../store/fiture/parameterSearchSend/actions";
import StepMenu from "../../store/fiture/step/action";
import { selectActiveTitle } from "../../store/fiture/responseSearch/reducer";
import ParameterDetailProduct from "../../store/fiture/parameterDetailProduct/actions";
import "./style.css";
class ResultSeach extends Component {
  handleRowClick = (item) => {
    console.log(item.id);
    const {
      ParameterDetailProduct,
      StatusRequestSearch,
      StepMenu,
    } = this.props;
    ParameterDetailProduct(item.id);
    StatusRequestSearch(false);
    //StepMenu(2);
  };
  renderTableData() {
    console.log(this.props.title);
    const { title } = this.props;
    if (this.props.title !== "") {
      if (this.props.title.items.length > 0) {
        const arryCampeign = [];
        let shiping = "";
        let conditions = "";
        for (const item of title.items) {
          if (item.free_shipping === true) {
            shiping = "Envío gratis";
          }
          if (item.condition == "new") {
            conditions = "Nuevo";
          }
          arryCampeign.push({
            id: item.id,
            picture: item.picture,
            price: item.price.amount,
            title: item.title,
            freeShiping: shiping,
            condition: conditions,
          });
        }
        return arryCampeign.map((item, index) => {
          const { id, picture, price, title, freeShiping, condition } = item; //destructuring
          return (
            <tr key={id} onClick={this.handleRowClick.bind(this, item)}>
              <td>
                <img src={picture} className="img-List " />
              </td>
              <td>
                <div className="content-List">
                  <span class="price-tag-symbol">$</span>
                  <span class="price">{price}</span>
                  <h2 className="title-List">{title}</h2>
                  <p className="shiping">{freeShiping}</p>
                </div>
              </td>
              <td className="condition">{condition}</td>
            </tr>
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="section-List">
        <table id="students">
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: parameterSend(state),
    status: statusRequestSearch(state),
    title: selectActiveTitle(state),
  };
};

export default connect(mapStateToProps, {
  ParameterSend,
  StatusRequestSearch,
  ParameterDetailProduct,
  StepMenu,
})(ResultSeach);
