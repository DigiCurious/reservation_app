import React, {Component} from 'react';
import ReservedItem from 'reservedItem';

const ReservationList = (props) => {
        
        const Items = props.reservedItems.map((item) => {
    		return (
    				<ReservedItem
    				removeReservation={props.removeReservation}
    				reservedItems = {props.reservedItems}
    				key={item._id}
    				item={item} />
    			);
    	});
        
        return (
            <form action="/reservation" method="POST">
                <table className="table">
                    <tr>
                        <th>Pick-Up Time
                        </th>
                        <th>Return Time
                        </th>
                    </tr>
                    <tr>
                        <td>{props.from}
                        <input class="form-control" type="hidden" value={props.from} name="from" />
                        </td>
                        <td>{props.to}
                        <input class="form-control" type="hidden" value={props.to} name="to" />
                        </td>
                    </tr>
                    <tbody>{Items}</tbody>
                </table>
                <button className="btn btn-block"> Confirm Reservation </button>
            </form>
            );
    };

    
export default ReservationList;