import React from 'react';
import '../style/search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login';
import ForgetPwd from './layout/ForgetPwd.js';
import Navs from './layout/Navs.js';
import SearchResults from './searchpage/SearchResults.js';
import Footer from './layout/Footer.js';

export default class searchPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main className="clearfix search-body">
          <Login />
          <ForgetPwd />
          <Navs />
          <SearchResults name={this.props.match.params.name} type={this.props.match.params.type}/>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
