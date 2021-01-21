import React from "react";
import "./style.css";

import { connect } from "react-redux";
import { parameterSend } from "../../store/fiture/parameterSearchSend/reducer";
import ChangeBreadcrum from "../../store/fiture/parmeterHandlerBreadcrum/actions";
import StatusRequestSearch from "../../store/fiture/statusSearch/actions";

function BreadcrumbView({
  items,
  onClick,
  ChangeBreadcrum,
  StatusRequestSearch,
}) {
  const TOTAL_ITEMS = items.length;
  let itemBreadcrumd = [];

  const onItemClick = (id) => {
    console.log(id);
    ChangeBreadcrum(id);
    StatusRequestSearch(false);
  };

  items.forEach(({ id, label }, index) => {
    itemBreadcrumd.push(
      <div
        className="breadcrumb-item"
        onClick={() => {
          onItemClick(id);
        }}
      >
        {label}
      </div>
    );

    if (index < TOTAL_ITEMS - 1) {
      itemBreadcrumd.push(
        <span className="breadcrumb-item-separator"> &gt; </span>
      );
    }
  });

  return <div className="breadcrumb-container">{itemBreadcrumd}</div>;
}
const mapStateToProps = (state) => {
  return {
    data: parameterSend(state),
  };
};

export default connect(mapStateToProps, {
  ChangeBreadcrum,
  StatusRequestSearch,
})(BreadcrumbView);
