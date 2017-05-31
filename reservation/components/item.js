import React, {Component} from 'react';

const Item = (props) => {

	var price = props.item.priceHour * props.time;

    return (
      <tr>
        <td><i className="glyphicon glyphicon-plus" onClick = {() => props.onReservation(props.item, price)} /></td>
        <td>{props.item.title}</td>
        <td>{props.item.priceHour}</td>
      </tr>
    );
  }


// const Category = (props) => {
    
//    return (<tr><th>{props.item.category}</th></tr>);

    
// };

export default Item;
//export {Category}; 