import React from 'react';
import {Jumbotron,Button} from 'react-bootstrap';
var tools=require ('./tools')(window.host);
var moment =require('moment');
moment.locale('zh-cn');

export default class Desk extends React.Component {
  static propTypes = {
    desk: React.PropTypes.object.isRequired,
    power:React.PropTypes.object,
    lastVisit:React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.toggle=this.toggle.bind(this);
  }

  render() {
  	const {desk,power,lastVisit}=this.props;
  	var bsStyle="default";
  	if(power){
  		bsStyle=(power.status==="ON")?"success":"danger";
  	}
  	var online=false;
  	if(lastVisit&&(Date.now()-lastVisit)<100000){//100秒没有联系为离线
		online=true;
  	}
  	var style={textAlign:"center"};
  	if(!online){
  		style.backgroundColor="Salmon";
  	}
    return (
      <Jumbotron style={style}>
      <h1>{desk.position}</h1>
      <Button bsSize="large" block bsStyle={bsStyle} onClick={this.toggle}>&nbsp;</Button>
      <h4>{lastVisit?moment(lastVisit).fromNow():"失去联系"}</h4>
      <span>{desk._id}</span>
      </Jumbotron>
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
