import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js'
import Footer from './layout/Footer.js';
import Contact from './contactpage/Contact.js';
import ForgetPwd from './layout/ForgetPwd.js';
import { Container } from 'reactstrap';

export default class contactPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main>
          <Container>
            <Login />
            <ForgetPwd />
            <Contact />
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
