import React from 'react';
var _=require('lodash');
const data=require('../../data/powerdb.js');
const dataSorted=_.sortBy(data,['lab','position'])
const dataGroup=_.groupBy(dataSorted, "lab");
import {Tabs,Tab} from 'react-bootstrap';
import Room from './room';
var tools=require ('./tools')(window.host);

export default class Entry extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={powers:{},online:{}}
  }

  getAll(){
  	tools.getAll().then(_powers=>{
  		// console.log(powers)
  		var powers={};
  		_powers.map(power=>powers[power.mac]=power);
  		this.setState({powers});
  	});
  	tools.getOnline().then(online=>{
  		this.setState({online})
  	})
  }

  componentDidMount() {
  	const me=this;
  	me.getAll();
  	this.token=PubSub.subscribe("refresh",function(){
  		me.getAll();
  	})
  }

  render() {
  	const {powers,online}=this.state;
    return (
    	<div>
    	  <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
    	  	{_.keys(dataGroup).map((room,idx)=><Tab key={room} eventKey={idx} title={room}><Room desks={dataGroup[room]} powers={powers} online={online}/></Tab>)}
  		  </Tabs>
      </div>
    );
  }
}
