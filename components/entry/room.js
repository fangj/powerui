import React from 'react';
import Desk from './desk';
import {Grid,Row,Col} from 'react-bootstrap';

export default class Room extends React.Component {
  static propTypes = {
    desks: React.PropTypes.array.isRequired,
    powers: React.PropTypes.object.isRequired,
    online: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
  	const {desks,powers,online}=this.props;
    return (
      <div style={{paddingTop:20}}><Grid><Row>{desks.map(desk=><Col xs={6} md={3} key={desk._id}><Desk desk={desk} power={powers[desk._id]} lastVisit={online[desk._id]}/></Col>)}</Row></Grid></div>
    );
  }
}
