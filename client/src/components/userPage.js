import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/user.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js';
import ForgetPwd from './layout/ForgetPwd.js';
import Footer from './layout/Footer.js';
import User from './userpage/User.js';

export default class userPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main>
          <Login />
          <ForgetPwd />
          <User />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
