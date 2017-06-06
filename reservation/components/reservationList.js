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
            <div id="reservation">
                <h4><strong>{props.user.firstname + " " + props.user.lastname}</strong>'s reservation</h4>
                <form action="/reservation" method="POST">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Pick-up</th>
                                <th>Return</th>
                            </tr>
                        </thead>
                        <tbody className="table table-hover">
                            
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
                            <tr>
                                <th>Title</th>
                                <th>Price</th>
                            </tr>
                            {reserved}
                            <tr>
                                <td><strong>Total (VAT 0%)</strong></td><td><strong>{props.price}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>VAT: </strong></td><td><strong>{Math.floor(props.price * 0.24)}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Total: </strong></td><td><strong>{Math.floor(props.price * 1.24)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-block">Confirm</button>
                </form>
            </div>
            );
        
    };

    
export default ReservationList;