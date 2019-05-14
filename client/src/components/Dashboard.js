import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

 class Dashboard extends Component {

  async componentDidMount() {
    this.props.getDashBoard();
  }


  render() {
    return (
      <div>
        This is dashboard component
        Our Statement from Back end <h2>{this.props.dashboard}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {

    dashboard: state.dash.dashboard
                
  }
}


export default connect(mapStateToProps, actions)(Dashboard);