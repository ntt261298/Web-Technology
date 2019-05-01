import React from 'react';
import '../../style/menu.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toggleLogin } from '../../actions/questionsAction';
import { userLogout } from '../../actions/accountsAction';
import { getSearchResults } from '../../actions/searchAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Menu extends React.Component {
  state = {
    search: '',
    searching: false
  }
  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  onLoginClick() {
    this.props.toggleLogin();
  }

  onLogoutClick() {
    this.props.toggleLogin();
    this.props.userLogout(this.props.account.token);
  }

  showResults(e) {
    const val = e.target.value;
    if(val === '') {
      this.setState({
        searching: false
      })
    } else {
      this.setState({
        search: val,
        searching: true
      });
      this.props.getSearchResults('title', val);
    }
  }

  onSearchClick() {
    if(this.state.search !== '') {
      window.location.replace(`/search/name/${this.state.search}`)
    }
  }

  onSearchEnter(e) {
    if(e.key === 'Enter') {
      if(this.state.search !== '') {
        window.location.replace(`/search/name/${this.state.search}`)
      }
    }
  }

  render() {
    const token = this.props.account.token;
    const searching = this.state.searching;
    const results = this.props.search.results;
    console.log(results);
    return (
      <div>
        <div className="header">

        </div>

        <div className="menu">
          <div className="logo">
            <Link to={`/`}>
              <img src="https://images.cooltext.com/5284667.png" className="logo-img" alt="" />
            </Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Find question..." onChange={this.showResults.bind(this)} onKeyPress={this.onSearchEnter.bind(this)} alt=""/>
            <img src="../../image/baseline-search-24px.svg" onClick={this.onSearchClick.bind(this)} alt=""/>
          </div>
          <div className="search-results">
          {
            searching ? (
              results.map(({_id, title}) => (
                <a href={`/search/name/${title}`}>
                    <p  key={_id}>{title}</p>
                </a>
              ))
            ) : null
          }
          </div>

          <div className="option">
            {
              !token ? (
                <div className="user-img">
                  <img src="../../image/baseline-person-24px.svg" onClick={this.onLoginClick} alt=""/>
                </div>
              ) : (
                <UncontrolledDropdown
                  style={{margin:'0 5px'}}
                  >
                  <DropdownToggle caret>
                    <div className="user-img">
                      <img src="../../image/baseline-person-24px.svg" onClick={this.onLoginClick}/>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <Link to='/user'>
                      <DropdownItem>
                        Activities
                      </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.onLogoutClick.bind(this)}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  getSearchResults: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  cart: state.cart,
  item: state.item,
  account: state.account,
  search: state.search
})
export default connect(mapStateToProps, { toggleLogin, userLogout, getSearchResults })(Menu);
