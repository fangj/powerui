import React from 'react';
var _=require('lodash');
const data=require('../../data/powerdb.js');
const dataSorted=_.sortBy(data,['lab','position'])
const dataGroup=_.groupBy(dataSorted, "lab");
import {Tabs,Tab} from 'react-bootstrap';

export default class Entry extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<div>
    	  <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
    	  	{_.keys(dataGroup).map(room=><Tab eventKey={room} title={room}><pre>{JSON.stringify(dataGroup[room],null,2)}</pre></Tab>)}
  		  </Tabs>
      </div>
    );
  }
}
