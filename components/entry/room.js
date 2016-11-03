import React from 'react';
import Desk from './desk';
import {Grid,Row,Col} from 'react-bootstrap';

export default class Room extends React.Component {
  static propTypes = {
    desks: React.PropTypes.array.isRequired,
    powers: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	const {desks,powers}=this.props;
    return (
      <div style={{paddingTop:20}}><Grid><Row>{desks.map(desk=><Col xs={6} md={4} key={desk._id}><Desk desk={desk} power={powers[desk._id]}/></Col>)}</Row></Grid></div>
    );
  }
}
