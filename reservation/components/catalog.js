import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './searchBar';
import ItemList from './itemList2';
import ItemDetails from './itemDetails';

class Catalog extends Component {
	constructor(props){
		super(props);
	
		this.state = {
	      filterText: '',
	      selected: {}
	     };
    }

render() {
		return (
			    <div>
				      <h1>Catalog</h1>
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
				            filterText={this.state.filterText}
				            reveal = {(div, button) => {
				                                console.log(button);
				                                button.toggleClass("glyphicon glyphicon-chevron-down");
				                                button.toggleClass("glyphicon glyphicon-chevron-up");
				                                div.slideToggle("slow",function(){});
				                                }} //$( "#book" ).slideToggle( "slow", function() {
				            mouseOver = {(item) => {this.setState(selected: item)}}
				            key = {"itemList"}
				          />

				        <div className="col-sm-6">
				            <ItemDetails
				            selected={this.state.selected}
				            />
				        </div>
				      </div>
			    </div>
			    );
}
};

ReactDom.render(<Catalog
                  items = {JSON.parse(window.props.items)}
                  />, document.querySelector('.container'));