import React, {Component} from 'react';
import Item from './item';

class ItemList extends Component{
    
    constructor(props){
        super(props);
    }
    
  render(){
    var items = [];
    var lastCategory = null;
    items = this.props.items.map(function(item) {
      if (item.title.indexOf(this.props.filterText) === -1) {
        return;
      }
      if (item.category !== lastCategory) {
        return <Category category={item.category} key={item.category} />;
      }
        lastCategory = item.category;
        return <Item
                item={item}
                key={item.title}
                onReservation = {this.props.onReservation}
                />;
    }.bind(this));
    
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
  }
}

export default ItemList;