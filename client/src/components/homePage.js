import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/home.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js';
import ForgetPwd from './layout/ForgetPwd.js';
import Navs from './layout/Navs.js';
import Content from './homepage/Content.js';
import Footer from './layout/Footer.js';

export default class homePage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main className="clearfix home-body">
          <ForgetPwd />
          <Login />
          <Navs />
          <Content />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
