import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/user.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js';
import Navs from './layout/Navs';
import ForgetPwd from './layout/ForgetPwd.js';
import Footer from './layout/Footer.js';
import ViewUser from './viewuserpage/ViewUser.js';

export default class viewUserPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main className="detail-body">
          <Login />
          <ForgetPwd />
          <Navs />
          <ViewUser id={this.props.match.params.id}/>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
