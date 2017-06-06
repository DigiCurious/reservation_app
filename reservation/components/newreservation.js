import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './searchBar.js';
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
    <div>
      <h1>Choose items to book</h1>
      <div className="row">
        <div className="col-sm-6">
          <SearchBar
              filterText= {this.state.filterText}
              onChange = {(term) => {this.setState({filterText: term});}}
            />
        </div>
      </div>
      <div className="row">
          <ItemList
            items={this.props.items}
            time ={this.props.time}
            filterText={this.state.filterText}
            reveal = {(div, button) => {
                                console.log(button);
                                button.toggleClass("glyphicon glyphicon-chevron-down");
                                button.toggleClass("glyphicon glyphicon-chevron-up");
                                div.slideToggle("slow",function(){
                                });
                                }} //$( "#book" ).slideToggle( "slow", function() {
            onReservation = {(item, itemPrice) => {
                                                    price += itemPrice;
                                                    this.setState({totalPrice: price})
                                                    reservationList.push(item);
                                                    this.setState({reservedItems: reservationList});
                                                  }}
            key = {"itemList"}
          />

        <div className="col-sm-6">

            <ReservationList
              user = {this.props.user}
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
    </div>
    );
  }
}



ReactDom.render(<NewReservation
                  user={JSON.parse(window.props.user)}
                  time={window.props.time}
                  to= {window.props.to}
                  from= {window.props.from}
                  items = {JSON.parse(window.props.items)}
                  />, document.querySelector('.container'));