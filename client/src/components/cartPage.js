import React from 'react';
import '../style/cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js';
import Navs from './layout/Navs.js';
import ForgetPwd from './layout/ForgetPwd.js';
import Footer from './layout/Footer.js';
import Cart from './cartpage/Cart.js';
import { Container } from 'reactstrap';

export default class cartPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main>
          <Login />
          <ForgetPwd />
          <div className="main-cart">
            <Navs />
            <Cart />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
