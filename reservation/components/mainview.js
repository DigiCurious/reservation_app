import React, {Component} from 'react';

export default class MainView extends Component{
	render(){
		const items = this.props.items.map(function(item){
			return(
				<li>{item.title}</li>
				);
		})
		return(
		<div>
		<h1> Hello {this.props.name}! </h1>
		<ul> {items} </ul>
		</div>
		);
	}
}
