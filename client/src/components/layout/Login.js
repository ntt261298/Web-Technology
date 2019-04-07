import React from 'react';
import { Modal} from 'reactstrap';
import { toggleLogin, toggleForget, } from '../../actions/itemsAction';
import { verifyToken, userLogin, userSignup } from '../../actions/accountsAction';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      login: 'active',
      signup: '',
      box: '',
      loginusername: '',
      loginpassword: '',
      signupusername: '',
      signuppassword: '',
      signuprepassword: '',
      signupname: '',
      signupemail: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.verifyToken();
  }

  toggle() {
    this.props.toggleLogin();
  }

  signupClick(e) {
    e.preventDefault();
    this.setState({
      login: '',
      signup: 'active',
      box: 'second-box'
    })
  }

  loginClick(e) {
    e.preventDefault();
    this.setState({
      login: 'active',
      signup: '',
      box: ''
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLoginUsernameChanged(e) {
    this.setState({
      loginusername: e.target.value
    })
  }

  onLoginPasswordChanged(e) {
    this.setState({
      loginpassword: e.target.value
    })
  }

  onSignupUsernameChanged(e) {
    this.setState({
      signupusername: e.target.value
    })
  }

  onSignupPasswordChanged(e) {
    this.setState({
      signuppassword: e.target.value
    })
  }

  onReSignupPasswordChanged(e) {
    this.setState({
      signuprepassword: e.target.value
    })
  }

  onLogin(e) {
    e.preventDefault();
    this.props.userLogin(this.state.loginusername, this.state.loginpassword);
    this.setState({
      loginusername: '',
      loginpassword: '',
      signupusername: '',
      signuppassword: '',
      signuprepassword: '',
    })
  }
onSignupnameChange(e) {
  this.setState({
    signupname: e.target.value
  })
}
onSignupemailChange(e) {
  this.setState({
    signupemail: e.target.value
  })
}
  onSignup(e) {
    e.preventDefault();
    this.props.userSignup(this.state.signupusername, this.state.signupname, this.state.signupemail, this.state.signuppassword, this.state.signuprepassword);
    this.setState({
      signupusername: '',
      signupname: '',
      signupemail: '',
      signuppassword: '',
      signuprepassword: ''
    })
  }

  onForgetClick() {
    this.props.toggleLogin();
    this.props.toggleForget();
  }

  render() {
    const loginMessage = this.props.account.loginErr;
    const signupMessage = this.props.account.signupErr;
    const token = this.props.account.token;
    return (
      <div>
        { !token ? (
          <Modal isOpen={this.props.item.modal} toggle={this.toggle}>
            <div className="panel">
              <ul className={`panel__menu ${this.state.box}`} id="menu">
                <hr />
                <li onClick={this.loginClick.bind(this)}><a href="">Login</a></li>
                <li onClick={this.signupClick.bind(this)}><a href="">SignUp</a></li>
              </ul>
              <div className="panel__wrap">
                <div className={`panel__box ${this.state.login}`} id="signInBox">
                  {
                    (loginMessage.length > 0) ? (<div className="alert alert-danger">{loginMessage}</div>) : null
                  }
                  <label>Username: </label>
                    <input
                      type="text"
                      value={this.state.loginusername}
                      onChange={this.onLoginUsernameChanged.bind(this)}/>
                  <label>Password: </label>
                    <input
                      type="password"
                      value={this.state.loginpassword}
                      onChange={this.onLoginPasswordChanged.bind(this)}/>
                  <input type="submit" style={{marginTop: '1.5rem'}} onClick={this.onLogin.bind(this)}/>
                  <p className="forget" onClick={this.onForgetClick.bind(this)}>forget password</p>
                </div>
                <div className={`panel__box ${this.state.signup}`} id="signUpBox">
                  {
                    (signupMessage.length > 0) ? (<div className="alert alert-danger">{signupMessage}</div>) : null
                  }
                  <label>Username: </label>
                    <input
                      type="text"
                      value={this.state.signupusername}
                      onChange={this.onSignupUsernameChanged.bind(this)}/>
                  <label>Name: </label>
                    <input
                      type="text"
                      value={this.state.signupname}
                      onChange={this.onSignupnameChange.bind(this)}/>
                  <label>Email: </label>
                    <input
                      type="email"
                      value={this.state.signupemail}
                      onChange={this.onSignupemailChange.bind(this)}/>
                  <label>Password: </label>
                    <input
                      type="password"
                      value={this.state.signuppassword}
                      onChange={this.onSignupPasswordChanged.bind(this)}/>
                  <label>Confirm Password: </label>
                    <input
                      type="password"
                      value={this.state.resignuppassword}
                      onChange={this.onReSignupPasswordChanged.bind(this)}/>
                  <input type="submit" style={{marginTop: '1.5rem'}} onClick={this.onSignup.bind(this)}/>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

Login.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  toggleForget: PropTypes.func.isRequired,
  verifyToken: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  userSignup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  item: state.item,
  account: state.account
})

export default connect(mapStateToProps, { toggleLogin, toggleForget, verifyToken, userLogin, userSignup })(Login);
