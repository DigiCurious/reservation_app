import React, {Component} from 'react';
import Item/*, {Category}*/ from './item';

class ItemList extends Component{
    
    constructor(props){
        super(props);
    }
    
  render(){
    
    var titles = [];

    if(this.props.filterText !== ''){
      titles = this.props.items.filter((item) => {return item.title.indexOf(this.props.filterText) > -1});
      }else{
        titles = this.props.items
      }

    console.log(titles);



    var categories = titles.reduce((acc, item) => {
            if(acc[item.category] === undefined){
              acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
    }, {});

    console.log(categories);

    var items = [];

    const list = Object.keys(categories).map((category) => {
        items = categories[category].map((item)=>{
              return(
                <Item
                    time={this.props.time}
                    item={item}
                    onReservation={this.props.onReservation}
                    key={item._id}
                />
              )
            });
            

        console.log(items);

        return(
            <div>
              {items}
            </div>
          );
    });
    
    return (
      <table className = "table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    );
  }
}

export default ItemList;