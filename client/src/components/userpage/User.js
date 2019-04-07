import React from 'react';
import { getInfor, getShoppingHistory, updateUserInfor } from '../../actions/accountsAction.js';
import Item from './Item.js';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import currency from '../../helpers/currency.js';
import total from '../../helpers/total.js';

class User extends React.Component {
  state = {
      page: 'information',
      selectedDay: '',
      selectedMonth: '',
      selectedYear: '',
      gender: '',
      username: '',
      phone: '',
      address: '',
      pwd: '',
      newpwd: '',
      repwd: '',
      orderId: ''
  }
  componentDidMount() {
    this.props.getShoppingHistory(this.props.account.token);
    this.props.getInfor(this.props.account.token);
    setTimeout(() => {
      const infor = this.props.account.infor;
      if(infor.name) {
        this.setState({
          username: infor.name,
        })
      }
      if(infor.gender) {
        this.setState({
          gerder: infor.gender,
        })
      }
      if(infor.phoneNumber) {
        this.setState({
          phone: infor.phoneNumber,
        })
      }
      if(infor.address) {
        this.setState({
          address: infor.address,
        })
      }
    }, 1000)
  }

  convertDate(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let result = day + '-' + month + '-' + year;
    return result;
  }
  convertNumToStringMonth(num) {
    if(num === '01') return 'January';
    if(num === '02') return 'February';
    if(num === '03') return 'March';
    if(num === '04') return 'April';
    if(num === '05') return 'May';
    if(num === '06') return 'June';
    if(num === '07') return 'July';
    if(num === '08') return 'August';
    if(num === '09') return 'September';
    if(num === '10') return 'October';
    if(num === '11') return 'November';
    if(num === '12') return 'December';
  }
  changePage(infor) {
    this.setState({
        page: infor
    })
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  updateUserInforClick() {
    let birthday = this.state.selectedDay + '-' + this.state.selectedMonth + '-' + this.state.selectedYear;
    this.props.updateUserInfor(this.props.account.token, this.state.username, this.state.phone, this.state.gender, birthday,
                               this.state.address, this.state.pwd, this.state.newpwd, this.state.repwd);
  }
  viewDetail(id) {
    this.setState({
      orderId: id,
      page: 'orderdetail'
    });
  }

  renderStar(rating) {
    let star = [];
    for(let i = 0; i < parseInt(rating); i++) {
      star.push(<span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>)
    };
    if(rating - parseInt(rating)) {
      star.push(<span class="star"><img src="../image/baseline-half-star_rate-18px.svg" alt=""/></span>)
    }
    return star;
  }

  render() {
    const allItems  = this.props.account;
    const userInfor = this.props.account.infor;
    const message = this.props.account.updateErr;
    const page = this.state.page;
    return (
        <div>
        {
            page === 'history' ? (
              <div class="htr-grid-container">

                <div style={{gridRow: '1/5'}}>
                </div>
                <div class="prf-navbar" style={{maxWidth:'100%'}}>
                    <img class="prf-avt" src="../image/account-circle.svg" />
                    <p class="prf-p">{userInfor.name}</p>
                </div>
                { allItems.history.length ? (
                  <React.Fragment>
                    <div class="htr-properties">
                        Order ID
                    </div>
                    <div class="htr-properties">
                        Date
                    </div>
                    <div class="htr-properties">
                        Products
                    </div>
                    <div class="htr-properties">
                        Price
                    </div>
                    <div class="htr-properties" >
                        Status
                    </div>
                    <div></div>
                  </React.Fragment>
                ) : <h2 style={{wordWrap: 'normal', marginTop:'30px', gridColumn: '3/9'}}>You have not bought something yet</h2> }
                <div class="merged-row-1" style={{gridRow: '2/5'}}>
                    <a class="prf-navbar" style={{marginTop: '30px' }} onClick={this.changePage.bind(this, 'information')}>
                        <img src="../image/baseline-person-24px-white.svg" style={{paddingRight: '20px'}}/>
                        Information
                    </a>

                    <a class="prf-navbar" onClick={this.changePage.bind(this, 'history')}>
                        <img src="../image/history.svg" style={{paddingRight: '20px'}}/>
                        History
                    </a>

                    {/* <a class="prf-navbar" href="library.html">
                        <img src="../image/library-books.svg" style={{paddingRight: '20px'}}/>
                        Library
                    </a> */}
                </div>
                { allItems.history.length ? (
                  allItems.history.map((order, index) => (
                    <React.Fragment>
                      <a class="htr-order-id" onClick={this.viewDetail.bind(this, order._id)}>
                          {order._id}
                      </a>
                      <div class="htr-properties-value">
                          {this.convertDate(order.orderDate)}
                      </div>
                      <div class="htr-properties-value">
                          {order.cart.map((item, index) => (
                            <p>{item.name}</p>
                          ))}
                      </div>
                      <div class="htr-properties-value">
                          {currency(total(order.cart))}
                      </div>
                      <div class="htr-properties-value" >
                          {order.status}
                      </div>
                      <div></div>
                    </React.Fragment>
                  ))
                ) : null }
            </div>
          ) : ( page === "orderdetail" ? (
              <div class="prf-grid-container">
                    <div>
                    </div>

                    <div class="prf-navbar" style={{maxWidth:'100%'}}>
                      <img class="prf-avt" src="../image/account-circle.svg" />
                      <p class="prf-p">{userInfor.name}</p>
                    </div>

                    <div class="merged-grid">
                      <p class="merged-grid-text" ></p>
                    </div>


                    <div>
                    </div>

            <div class="merged-row-1">
                <a class="prf-navbar" style={{marginTop: '30px' }} onClick={this.changePage.bind(this, 'information')}>
                    <img src="../image/baseline-person-24px-white.svg" style={{paddingRight: '20px'}}/>
                    Information
                  </a>

                  <a class="prf-navbar" onClick={this.changePage.bind(this, 'history')}>
                    <img src="../image/history.svg" style={{paddingRight: '20px'}}/>
                    History
                  </a>

        {/* <a class="prf-navbar" href="library.html">
            <img src="../image/library-books.svg" style={{paddingRight: '20px'}}/>
            Library
        </a> */}
            </div>

            <div class="prf-grid-detail">
              {allItems.history.map((order, index) => {
                if(order._id === this.state.orderId) return (
                  <React.Fragment>
                    <div class="reveiver">
                      <div class="od-properties-left">Receiver</div>
                      <div class="od-properties-value">{order.email}</div>
                      <div class="od-properties-addr-value">{order.address}</div>
                    </div>
                    <div class="date">
                      <div class="od-properties-left">Date</div>
                      <div class="od-properties-value">{this.convertDate(order.orderDate)}</div>
                    </div>
                    <div class="payment">
                      <div class="od-properties-left">Payment</div>
                      <div class="od-properties-value">Cash</div>
                    </div>
                  </React.Fragment>
                )
              })}

              <div class="list-detail">
                <div class="od-properties-left od-product">Products</div>
                <div class="od-properties-center od-quantity">Quantity</div>
                <div class="od-properties-center od-price">Price</div>
                <div class="od-properties-center od-total">Total</div>
              </div>
              {allItems.history.map((order, index) => {
                if(order._id === this.state.orderId)
                  return order.cart.map((detail, index) => (
                    <div class={`list-detail-item-${index+1}`}>
                        <div class="od-product-item">
                            <div className="book-img-cart">
                              <img src={`https://intense-temple-58166.herokuapp.com/uploads/${detail.bookImage}`}></img>
                            </div>
                            <div className="book-content-cart">
                              <h4>{detail.name }</h4>
                              <p>{ detail.author }</p>
                              {
                                this.renderStar(detail.rating)
                              }
                              <div>
                                <img class="delete-cart"  src="../image/delete.svg"></img>
                                <img src="../image/baseline-add_shopping_cart-24px.svg"></img>
                              </div>
                            </div>
                          </div>
                          <div className="od-quantity-item">
                            ${ detail.count }
                          </div>
                          <div className="od-price-item">
                            ${ detail.price }
                          </div>
                          <div className="od-total-item">
                            ${ detail.price*detail.count }
                          </div>

                    </div>
                  ))
              })}
            </div>
            <div>

            </div>

          </div>
          ) : (
                <div class="prf-grid-container">

        <div>
        </div>

        <div class="prf-navbar" style={{maxWidth:'100%'}}>
            <img class="prf-avt" src="../image/account-circle.svg" />
            <p class="prf-p">{userInfor.name}</p>
        </div>

        <div class="merged-grid">
            <p class="merged-grid-text" >Information</p>
        </div>


        <div>
        </div>

        <div class="merged-row-1">
            <a class="prf-navbar" style={{marginTop: '30px' }} onClick={this.changePage.bind(this, 'information')}>
                <img src="../image/baseline-person-24px-white.svg" style={{paddingRight: '20px'}}/>
                Information
            </a>

            <a class="prf-navbar" onClick={this.changePage.bind(this, 'history')}>
                <img src="../image/history.svg" style={{paddingRight: '20px'}}/>
                History
            </a>

            {/* <a class="prf-navbar" href="library.html">
                <img src="../image/library-books.svg" style={{paddingRight: '20px'}}/>
                Library
            </a> */}
        </div>

        <div class="prf-grid-info">
            <img class="prf-avt2" src="../image/account-circle.svg" />
            <input class="prf-input" type="text" id="prf-full-name" name="username" onChange={this.handleChange.bind(this)} value={userInfor.name}/>


            <div class="prf-properties">Phone number</div>
            <input class="prf-input" type="tel" id="prf-phone-number" name="phone" onChange={this.handleChange.bind(this)} value={this.state.phone}/>

            <div class="prf-properties">Email</div>
            <input class="prf-input" type="email" id="prf-email" value={userInfor.email} disabled/>

            <div class="prf-properties">Gender</div>
            <div>
                <label for="prf-male" class="prf-radio"> Male
                        <input type="radio" id="prf-male" name="gender" onChange={this.handleChange.bind(this)}  value="male" />
                        <span class="check"> </span>
                </label>
                <label for="prf-female" class="prf-radio"> Female
                        <input type="radio" id="prf-female" name="gender" onChange={this.handleChange.bind(this)}  value="female" />
                        <span class="check"> </span>
                </label>
            </div>

            <div class="prf-properties">Date of Birth</div>
            <div>

                <select class="prf-select" id="day-of-birth" name="selectedDay" onChange={this.handleChange.bind(this)}>
                    <option class="prf-option" value="00" disabled selected>{userInfor.birthday ? userInfor.birthday.slice(0, 2) : 'Day'}</option>
                    <option class="prf-option" value="01">01</option>
                    <option class="prf-option" value="02">02</option>
                    <option class="prf-option" value="03">03</option>
                    <option class="prf-option" value="04">04</option>
                    <option class="prf-option" value="05">05</option>
                    <option class="prf-option" value="06">06</option>
                    <option class="prf-option" value="07">07</option>
                    <option class="prf-option" value="08">08</option>
                    <option class="prf-option" value="09">09</option>
                    <option class="prf-option" value="10">10</option>
                    <option class="prf-option" value="11">11</option>
                    <option class="prf-option" value="12">12</option>
                    <option class="prf-option" value="13">13</option>
                    <option class="prf-option" value="14">14</option>
                    <option class="prf-option" value="15">15</option>
                    <option class="prf-option" value="16">16</option>
                    <option class="prf-option" value="17">17</option>
                    <option class="prf-option" value="18">18</option>
                    <option class="prf-option" value="19">19</option>
                    <option class="prf-option" value="20">20</option>
                    <option class="prf-option" value="21">21</option>
                    <option class="prf-option" value="22">22</option>
                    <option class="prf-option" value="23">23</option>
                    <option class="prf-option" value="24">24</option>
                    <option class="prf-option" value="25">25</option>
                    <option class="prf-option" value="26">26</option>
                    <option class="prf-option" value="27">27</option>
                    <option class="prf-option" value="28">28</option>
                    <option class="prf-option" value="29">29</option>
                    <option class="prf-option" value="30">30</option>
                    <option class="prf-option" value="31">31</option>
                </select>

                <select class="prf-select"  id="month-of-birth" name="selectedMonth" onChange={this.handleChange.bind(this)}>
                    <option class="prf-option" value="00" disabled selected>{userInfor.birthday ? this.convertNumToStringMonth(userInfor.birthday.slice(3, 5)) : 'Month'}</option>
                    <option class="prf-option" value="01">January</option>
                    <option class="prf-option" value="02">February</option>
                    <option class="prf-option" value="03">March</option>
                    <option class="prf-option" value="04">April</option>
                    <option class="prf-option" value="05">May</option>
                    <option class="prf-option" value="06">June</option>
                    <option class="prf-option" value="07">July</option>
                    <option class="prf-option" value="08">August</option>
                    <option class="prf-option" value="09">September</option>
                    <option class="prf-option" value="10">October</option>
                    <option class="prf-option" value="11">November</option>
                    <option class="prf-option" value="12">December</option>
                </select>

                <select class="prf-select" id="year-of-birth" name="selectedYear" onChange={this.handleChange.bind(this)}>
                    <option class="prf-option" value="0" disabled selected>{userInfor.birthday ? userInfor.birthday.slice(6, 11) : 'Year'}</option>
                    <option class="prf-option" value="1900">1900</option>
                    <option class="prf-option" value="1901">1901</option>
                    <option class="prf-option" value="1902">1902</option>
                    <option class="prf-option" value="1903">1903</option>
                    <option class="prf-option" value="1904">1904</option>
                    <option class="prf-option" value="1905">1905</option>
                    <option class="prf-option" value="1906">1906</option>
                    <option class="prf-option" value="1907">1907</option>
                    <option class="prf-option" value="1908">1908</option>
                    <option class="prf-option" value="1909">1909</option>
                    <option class="prf-option" value="1910">1910</option>
                    <option class="prf-option" value="1911">1911</option>
                    <option class="prf-option" value="1912">1912</option>
                    <option class="prf-option" value="1913">1913</option>
                    <option class="prf-option" value="1914">1914</option>
                    <option class="prf-option" value="1915">1915</option>
                    <option class="prf-option" value="1916">1916</option>
                    <option class="prf-option" value="1917">1917</option>
                    <option class="prf-option" value="1918">1918</option>
                    <option class="prf-option" value="1919">1919</option>
                    <option class="prf-option" value="1920">1920</option>
                    <option class="prf-option" value="1921">1921</option>
                    <option class="prf-option" value="1922">1922</option>
                    <option class="prf-option" value="1923">1923</option>
                    <option class="prf-option" value="1924">1924</option>
                    <option class="prf-option" value="1925">1925</option>
                    <option class="prf-option" value="1926">1926</option>
                    <option class="prf-option" value="1927">1927</option>
                    <option class="prf-option" value="1928">1928</option>
                    <option class="prf-option" value="1929">1929</option>
                    <option class="prf-option" value="1930">1930</option>
                    <option class="prf-option" value="1931">1931</option>
                    <option class="prf-option" value="1932">1932</option>
                    <option class="prf-option" value="1933">1933</option>
                    <option class="prf-option" value="1934">1934</option>
                    <option class="prf-option" value="1935">1935</option>
                    <option class="prf-option" value="1936">1936</option>
                    <option class="prf-option" value="1937">1937</option>
                    <option class="prf-option" value="1938">1938</option>
                    <option class="prf-option" value="1939">1939</option>
                    <option class="prf-option" value="1940">1940</option>
                    <option class="prf-option" value="1941">1941</option>
                    <option class="prf-option" value="1942">1942</option>
                    <option class="prf-option" value="1943">1943</option>
                    <option class="prf-option" value="1944">1944</option>
                    <option class="prf-option" value="1945">1945</option>
                    <option class="prf-option" value="1946">1946</option>
                    <option class="prf-option" value="1947">1947</option>
                    <option class="prf-option" value="1948">1948</option>
                    <option class="prf-option" value="1949">1949</option>
                    <option class="prf-option" value="1950">1950</option>
                    <option class="prf-option" value="1951">1951</option>
                    <option class="prf-option" value="1952">1952</option>
                    <option class="prf-option" value="1953">1953</option>
                    <option class="prf-option" value="1954">1954</option>
                    <option class="prf-option" value="1955">1955</option>
                    <option class="prf-option" value="1956">1956</option>
                    <option class="prf-option" value="1957">1957</option>
                    <option class="prf-option" value="1958">1958</option>
                    <option class="prf-option" value="1959">1959</option>
                    <option class="prf-option" value="1960">1960</option>
                    <option class="prf-option" value="1961">1961</option>
                    <option class="prf-option" value="1962">1962</option>
                    <option class="prf-option" value="1963">1963</option>
                    <option class="prf-option" value="1964">1964</option>
                    <option class="prf-option" value="1965">1965</option>
                    <option class="prf-option" value="1966">1966</option>
                    <option class="prf-option" value="1967">1967</option>
                    <option class="prf-option" value="1968">1968</option>
                    <option class="prf-option" value="1969">1969</option>
                    <option class="prf-option" value="1970">1970</option>
                    <option class="prf-option" value="1971">1971</option>
                    <option class="prf-option" value="1972">1972</option>
                    <option class="prf-option" value="1973">1973</option>
                    <option class="prf-option" value="1974">1974</option>
                    <option class="prf-option" value="1975">1975</option>
                    <option class="prf-option" value="1976">1976</option>
                    <option class="prf-option" value="1977">1977</option>
                    <option class="prf-option" value="1978">1978</option>
                    <option class="prf-option" value="1979">1979</option>
                    <option class="prf-option" value="1980">1980</option>
                    <option class="prf-option" value="1981">1981</option>
                    <option class="prf-option" value="1982">1982</option>
                    <option class="prf-option" value="1983">1983</option>
                    <option class="prf-option" value="1984">1984</option>
                    <option class="prf-option" value="1985">1985</option>
                    <option class="prf-option" value="1986">1986</option>
                    <option class="prf-option" value="1987">1987</option>
                    <option class="prf-option" value="1988">1988</option>
                    <option class="prf-option" value="1989">1989</option>
                    <option class="prf-option" value="1990">1990</option>
                    <option class="prf-option" value="1991">1991</option>
                    <option class="prf-option" value="1992">1992</option>
                    <option class="prf-option" value="1993">1993</option>
                    <option class="prf-option" value="1994">1994</option>
                    <option class="prf-option" value="1995">1995</option>
                    <option class="prf-option" value="1996">1996</option>
                    <option class="prf-option" value="1997">1997</option>
                    <option class="prf-option" value="1998">1998</option>
                    <option class="prf-option" value="1999">1999</option>
                    <option class="prf-option" value="2000">2000</option>
                    <option class="prf-option" value="2001">2001</option>
                    <option class="prf-option" value="2002">2002</option>
                    <option class="prf-option" value="2003">2003</option>
                    <option class="prf-option" value="2004">2004</option>
                    <option class="prf-option" value="2005">2005</option>
                    <option class="prf-option" value="2006">2006</option>
                    <option class="prf-option" value="2007">2007</option>
                    <option class="prf-option" value="2008">2008</option>
                    <option class="prf-option" value="2009">2009</option>
                    <option class="prf-option" value="2010">2010</option>
                    <option class="prf-option" value="2011">2011</option>
                    <option class="prf-option" value="2012">2012</option>
                    <option class="prf-option" value="2013">2013</option>
                    <option class="prf-option" value="2014">2014</option>
                    <option class="prf-option" value="2015">2015</option>
                    <option class="prf-option" value="2016">2016</option>
                    <option class="prf-option" value="2017">2017</option>
                    <option class="prf-option" value="2018">2018</option>
                </select>

            </div>

            <div class="prf-properties">Address</div>
            <textarea class="prf-address" name="address" onChange={this.handleChange.bind(this)} id="prf-address" rows="4" value={this.state.address}>
            </textarea>

            <div class="prf-properties">Password</div>
            <input class="prf-password" type="password" id="prf-curr-password" name="pwd" onChange={this.handleChange.bind(this)} placeholder="Your current password"/>


            <div class="prf-properties">New password</div>
            <input class="prf-password" type="password" id="prf-new-password" name="newpwd" onChange={this.handleChange.bind(this)} placeholder="Your new password"/>

            <div class="prf-properties">Confirm</div>
            <input class="prf-password" type="password" id="prf-conf-password" name="repwd" onChange={this.handleChange.bind(this)} placeholder="Confirm your new password"/>

            <input class="prf-submit-btn" type="submit" id="prf-submit" name="prf-submit" value="Save" onClick={this.updateUserInforClick.bind(this)}/>
            { message ? (
              <div className="alert alert-danger mt-2" style={{height:'50px', width:'60%', marginTop:'30px'}}>{message}</div>
            ) : null}
        </div>
    </div>
  ))
        }

    </div>
    );
  }
};

User.propTypes = {
  getShoppingHistory: PropTypes.func.isRequired,
  getInfor: PropTypes.func.isRequired,
  updateUserInfor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps, {getInfor, getShoppingHistory, updateUserInfor})(User);
