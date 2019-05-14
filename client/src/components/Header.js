import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';


class Header extends Component {

        signOut = () => {
            this.props.signOut();
        }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <Link to="/" className="navbar-brand">Mern-V</Link>
            

        
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
            </ul>
            <ul className="nav navbar ml-auto">
                { !this.props.isAuth 
                ?  [<li className="nav-item" key="signup">
                        <Link to="/signup" href="" className="nav-link text-white"> Sign Up</Link>
                    </li>,
                    <li className="nav-item" key="signin">
                        <Link to="/signin" href="" className="nav-link text-white"> Sign In</Link>
                    </li>]                
                :
                null
               } 
               
               { this.props.isAuth 
               ?  
                <li className="nav-item">
                   <Link to="/" className="nav-link text-white" onClick={this.signOut}> Sign Out</Link>
                </li> 
               : null}
               

               
            </ul>
        
      </nav>
    )
  }
}

const mapStateToProps = (state)=>{
    return {
  
      isAuth: state.auth.isAuthenticated
                  
    }
  }

export default connect(mapStateToProps, actions)(Header); 