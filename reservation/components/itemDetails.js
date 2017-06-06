import React from 'react'

const ItemDetails = (props) => {

	var price = props.item.priceHour * props.time;

    return (
      <div>
        <h4>props.selected.title</h4>
      </div>
    );
  }

export default ItemDetails;
