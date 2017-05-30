import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './searchBar';
import ItemList from './itemList';
import ReservationList from './reservationList';

class NewReservation extends Component{
 constructor(props){
     super(props);
     
     this.state = {
      reservedItems: [],
      filterText: ''
     };
    }

 render() {
    return (
    <div>
      <div className="md-col-6">
        <SearchBar
          filterText={this.state.filterText}
        />
        <ItemList
          items={this.props.items}
          filterText={this.state.filterText}
          onReservation = {(item) => this.reservedItems.push(item)}
        />
      </div>
      
      <div className="md-col-6">
        <ReservationList
          items={this.state.reservedItems}
          removeReservation = {(index) => this.reservedItems.splice(index, 1)}
        />
      </div>
    </div>
    );
  }
}

ReactDom.render(<NewReservation />, document.querySelector('.container'));