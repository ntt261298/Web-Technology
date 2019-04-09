import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/config.css';
import './App.css';
import homePage from './components/homePage.js';
import detailPage from './components/detailPage.js';
import searchPage from './components/searchPage.js';
import userPage from './components/userPage.js';
import resetPage from './components/resetPage.js';
import {Redirect, BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { toggleLogin } from './actions/questionsAction';
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route {...rest} render={(props) =>
    (
      !token
        ? <Redirect to="/cart"/>
        : <Component {...props} />
    )
  } />
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={homePage} />
          <Route path="/detail/:id" exact component={detailPage}/>
          <Route path="/search/:type/:name" exact component={searchPage}/>
          <Route path="/reset/:token" exact component={resetPage}/>
           <PrivateRoute
             path='/user'
             exact component={userPage}
             token={this.props.account.token}
            />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps, { toggleLogin })(App);
