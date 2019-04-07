import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js'
import Footer from './layout/Footer.js';
import Reset from './resetpage/Reset.js';
import ForgetPwd from './layout/ForgetPwd.js';
import { Container } from 'reactstrap';

export default class resetPage extends React.Component {
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
            <Reset token={this.props.match.params.token}/>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
