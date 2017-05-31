import React, {Component} from 'react';

class SearchBar extends Component{
  
  render(){
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={(event) => {this.props.onChange(event.target.value)}}
        />
      </form>
    );
  }
}

export default SearchBar;