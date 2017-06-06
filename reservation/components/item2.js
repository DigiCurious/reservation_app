import React, {Component} from 'react';

const Item2 = (props) => {

    return (
      <tr>
        <td mouseOver = {() => props.mouseOver(props.item)}>
        {" " + props.item.title}
        </td>
        <td></td>
      </tr>
    );
  }



export default Item2;