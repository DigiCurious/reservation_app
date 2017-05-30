import React from 'react';

const ReservedItem = (props, {removeReservation}, {reservedItems}) => {
    
    var index = reservedItems.indexOf(ReservedItem);

	return (
	        <div>
	            <tr>
    	            <td>
    			        <i className="glyphicon glyphicon-minus" onClick={() => removeReservation(index)} />
    			    </td>
    				<input  type="hidden"
    				        value={props.item._id}
    				        name="item"
    				        />
    				<td>
    				    <h4>{props.item.title}</h4>
    				</td>
    				<td>
    				    <h4>{props.item.priceHour}</h4>
    				</td>
	            </tr>
		    </div>
		); 
};

export default ReservedItem;