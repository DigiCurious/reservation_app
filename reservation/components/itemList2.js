import React, {Component} from 'react';
import Item/*, {Category}*/ from './item2';

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
                <Item2
                    item={item}
                    mouseOver={this.props.mouseOver}
                    reveal={props.reveal}
                    key={item._id}
                />
              )
            });
            
            console.log(category);

        return(
          <table className="table">
           <thead>
            <tr>
              <td>
                  <i id={category + "ID"} className="glyphicon glyphicon-chevron-up"
                     onClick = {() => { var a = $('#' + category);
                                        var b = $('#' + category + 'ID');
                                      this.props.reveal(a, b)}} />
                  <strong>{" " + category}</strong>
              </td>
            </tr>
           </thead>
            <tbody id={category} className="table table-hover">
          
            <tr>
              <th>Name</th>
              <th>Price/h</th>
            </tr>
           
                {items}
            </tbody>
          </table>
          );
    });
    
    return (
      <div className="col-sm-6">
        {list}
      </div>
    );
  }
}

export default ItemList;