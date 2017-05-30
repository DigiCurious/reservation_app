import React, {Component} from 'react';

class SearchBar extends Component{
  constructor (props){
    super(props);
      
    this.state = {filterText: ""};
  }
  
  render(){
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.filterText}
          onChange={event => this.setState(event.target.value)}
        />
      </form>
    );
  }
}

export default SearchBar;