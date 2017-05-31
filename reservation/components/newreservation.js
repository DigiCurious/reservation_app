import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './searchBar';
import ItemList from './itemList';
import ReservationList from './reservationList';
import MainView from './mainview.js'

class NewReservation extends Component{
 constructor(props){
     super(props);
     
     this.state = {
      reservedItems: [],
      filterText: '',
      totalPrice: 0
     };
    }

 render() {

    var reservationList = this.state.reservedItems;
    var price = this.state.totalPrice;

    return (
    <div className="row">
      <div className="col-sm-6">
        <SearchBar
          filterText= {this.state.filterText}
          onChange = {(term) => {this.setState({filterText: term});}}
        />
        <ItemList
          items={this.props.items}
          time ={this.props.time}
          filterText={this.state.filterText}
          onReservation = {(item, itemPrice) => {
                                                  price += itemPrice;
                                                  this.setState({totalPrice: price})
                                                  reservationList.push(item);
                                                  this.setState({reservedItems: reservationList});
                                                }}
          key = {"itemList"}
        />
      </div>

      <div className="col-sm-6">

          <ReservationList
            price = {this.state.totalPrice}
            total={this.props.total}
            time = {this.props.time}
            to = {this.props.to}
            from = {this.props.from}
            items={this.state.reservedItems}
            removeReservation = {(index, reservationPrice) => {
                                      price -= reservationPrice;
                                      this.setState({totalPrice: price})
                                      reservationList.splice(index, 1);
                                      this.setState({reservedItems: reservationList});
                                }}
          />
      </div>
    </div>
    );
  }
}



ReactDom.render(<NewReservation
                  time={window.props.time}
                  to= {window.props.to}
                  from= {window.props.from}
                  items = {JSON.parse(window.props.items)}
                  />, document.querySelector('.container'));