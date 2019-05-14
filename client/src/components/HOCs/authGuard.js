import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OriginalComponent) => {

        class MixedComponent extends Component {

            checkAuth() {
                if(!this.props.isAuth && !this.props.jwtToken){
                    this.props.history.push('/');                    
                } 
            }
            
            componentDidMount() {
                 // Whether user is authed
                 this.checkAuth();
            }

            componentDidUpdate() {
                this.checkAuth();
            }
            
            
            render() {
                return <OriginalComponent {...this.props }/>;
            }
        }

        const mapStateToProps = (state)=>{
            return {
          
              isAuth: state.auth.isAuthenticated,
              jwtToken: state.auth.token
                          
            }
          }

        return connect(mapStateToProps,null)(MixedComponent);
}
