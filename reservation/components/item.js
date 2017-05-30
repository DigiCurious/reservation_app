import React, {Component} from 'react';

const Category = (props) => {
    
      return (<tr><th>{this.props.category}</th></tr>);

    
};

const Item = (onReservation) => {
    return (
      <tr>
        <td><i className="glyphicon glyphicon-plus" onClick = {() => onReservation(this.props.item)} /></td>
        <td>{this.props.title}</td>
        <td>{this.props.priceHour}</td>
      </tr>
    );
  };

export default Item;
export default Category;