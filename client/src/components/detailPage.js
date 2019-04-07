import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/config.css';
import '../style/detail.css';
import Menu from './layout/Menu.js';
import Navs from './layout/Navs.js';
import Login from './layout/Login.js';
import ForgetPwd from './layout/ForgetPwd.js';
import BookDetail from './detailpage/BookDetail.js';
import Footer from './layout/Footer.js';

export default class detailPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main className="clearfix detail-body">
            <Login />
            <ForgetPwd />
            <Navs />
            <BookDetail id={this.props.match.params.id}/>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
