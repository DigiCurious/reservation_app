import React, {Component} from 'react';
import ReservedItem from './reservedItem';

const ReservationList = (props) => {
        
        var reserved = props.items.map((item) => {
    		  
                return (
    				<ReservedItem
    				removeReservation={props.removeReservation}
    				reservedItems = {props.items}
    				key={item._id}
    				item={item}
                    time={props.time}
                    total={props.total}
                    />
    			);
    	});

        return (
            <form action="/reservation" method="POST">
                <table className = "table">
                    <tbody>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tr>
                            <td>
                                {props.from}
                                <input type="hidden" value={props.from} name="from" />
                            </td>
                            <td>
                                {props.to}
                                <input type="hidden" value={props.to} name="to" />
                            </td>
                        </tr>
                        {reserved}
                        <tr>
                            <td></td><td></td>
                        </tr>
                    </tbody>
                </table>
                <h4>Total: {props.price}</h4>
                <button className="btn btn-block">Confirm</button>
            </form>
            );
        
    };

    
export default ReservationList;