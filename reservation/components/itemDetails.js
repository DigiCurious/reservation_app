import React from 'react'

const Item = (props) => {

	var price = props.item.priceHour * props.time;

    return (
      <div>
        <h4>props.selected.title</h4>
      </div>
    );
  }

export default ItemDetails;