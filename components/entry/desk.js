import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap';
var tools=require ('./tools')(window.host);

export default class Desk extends React.Component {
  static propTypes = {
    desk: React.PropTypes.object.isRequired,
    power:React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.toggle=this.toggle.bind(this);
  }

  render() {
  	const {desk,power}=this.props;
  	var bsStyle="default";
  	if(power){
  		bsStyle=(power.status==="ON")?"success":"danger";
  	}
    return (
      <Jumbotron style={{textAlign:"center"}}><h1>{desk.position}</h1><Button bsSize="large" block bsStyle={bsStyle} onClick={this.toggle}>&nbsp;</Button></Jumbotron>
    );
  }

  toggle(){
  	const {desk,power}=this.props;
  	const mac=desk._id;
  	//取得当前状态
  	var status="ON";
  	if(power&&power.status==="OFF"){
  		status="OFF";
  	}
  	//置反状态
  	status=(status==="ON")?"OFF":"ON";
  	tools.setCommand({mac,status}).then(_=>{
  		console.log("refresh")
  		PubSub.publish("refresh");
  	})
  }
}
