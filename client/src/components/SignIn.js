import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


import { signIn, oauthGoogle, oauthFacebook } from '../actions';

 class SignIn extends Component {

    state = {
      email: '',
      password: ''
    }
  handleChange = e => {
    
      this.setState({         
        [e.target.name]: e.target.value        
    });

    
  }

  handleSubmit = async (e) => {    
    e.preventDefault();
  
    await this.props.signIn(this.state);
    
    if(this.props.errorMessage.isAuthenticated){
      this.props.history.push('/dashboard')
    }
    
  }

   responseGoogle = async (res) => {    
    await this.props.oauthGoogle(res.accessToken);
    if(this.props.errorMessage.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  responseFacebook = async (res) => {
    await this.props.oauthFacebook(res.accessToken);
    if(this.props.errorMessage.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  render() {

    const {errorMessage} = this.props.errorMessage;
    const showError = (errorMessage) ? 
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div> : null;

    return (
      <div className="container">
        <form className="form-group"  onSubmit={this.handleSubmit}>
            <h4>SIGN UP</h4>
            { showError }
            <p>
                <input onChange = {this.handleChange}
                    className="form-control"
                    name="email"
                    type="text"
                    id="email"
                    
                />
            </p>
            <p>
                <input onChange = {this.handleChange}
                    className="form-control"
                    name="password"
                    type="password"
                    id="password"
                    
                />
            </p>
            <p>
              <button className = "btn btn-sm btn-block btn-primary" type="submit">Sign In</button>
            </p>          
        </form>
        <hr/>
        <p className="text-center mt-2 mb-2">SIGN IN WITH GOOGLE OR FACEBOOK</p>
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-4">
            <FacebookLogin
              appId="354995155205933"
              textButton= "Facebook"
              fields="name,email,picture"              
              callback={this.responseFacebook}
              cssClass="btn btn-primary" />
            </div>
            <div className="col-4">
            <GoogleLogin
              clientId="777298903819-1tianf9neqq1cpag0ou88huk150end17.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="btn btn-danger"
            />
            </div>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {

    errorMessage: state.auth
                
  }
}

export default connect(mapStateToProps, { signIn, oauthGoogle, oauthFacebook } )(SignIn);