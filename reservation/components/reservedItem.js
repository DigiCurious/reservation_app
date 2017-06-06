import React from 'react';

const ReservedItem = (props) => {

    var index = props.reservedItems.indexOf(props.item);
    var price = props.item.priceHour * props.time;

	return (
            <tr>
                <td><i className="glyphicon glyphicon-minus" onClick = {() => props.removeReservation(index, price)} />{" " + props.item.title}</td>
                <td><input type="hidden" value={props.item._id} name="id" />{props.item.priceHour * props.time}</td>
            </tr>
	); 
};

export default ReservedItem;