import React from 'react';
import { getCart, removeFromCart, updateCart } from '../../actions/cartAction.js';
import { toggleLogin, getBooks } from '../../actions/itemsAction.js';
import Loading from 'react-loading-animation';
import currency from '../../helpers/currency.js';
import total from '../../helpers/total.js';
import CartItem from './CartItem.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Cart extends React.Component {
  state = {
    message: '',
  }
  componentDidMount() {
    this.props.getCart();
    this.props.getBooks();
  }

  deleteItem(id) {
    this.props.removeFromCart(id);
  }

  onMinusQtyClick(id) {
    this.props.updateCart('minus', id);
  }

  onAddQtyClick(id) {
    this.props.updateCart('add', id);
  }

  onCheckoutClick(token) {
    if(!token) {
      this.setState({
        message: 'You must login to checkout'
      })
    } else {
      this.setState({
        message: ''
      })
    }
  }

  onCheckout(message){
    if(message) {
      return <div className="alert alert-danger mt-2">{message}</div>
    }
    return null;
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
    const allcart  = this.props.cart.carts;
    const token = this.props.account.token;
    const { books } = this.props.book;
    // if (isLoading) return <div className='loading'><Loading /></div>;
    // if(allcart.carts.length === 0) return <h2>You have not bought something yet...</h2>;
    return (
      <div className="cart-content">
        <div className="item-content">
          { allcart.map(({id, name, author, bookImage, rating, price, count}, index) => (
            <div className={`product-cart product-cart-${index + 1}`}>
              <div className="book-img-cart">
                <img src={`https://intense-temple-58166.herokuapp.com/uploads/${bookImage}`}></img>
              </div>
              <div className="book-content-cart">
                <h4>{name }</h4>
                <p>{ author }</p>
                {
                  this.renderStar(rating)
                }
                <div>
                  <img class="delete-cart"  src="../image/delete.svg" onClick={this.deleteItem.bind(this, id)}></img>
                  <img src="../image/baseline-add_shopping_cart-24px.svg"></img>
                </div>
              </div>
              <div className="price-cart">
                ${ price }
              </div>
              <div className="change-count-cart">
                <div class="option">
                  <img class="minus" src="../image/minus.svg" onClick={this.onMinusQtyClick.bind(this, id)} alt=""/>
                  <span>{count}</span>
                  <img class="plus" src="../image/plus.svg" onClick={this.onAddQtyClick.bind(this, id)} alt=""/>
                </div>
              </div>

            </div>
          )) }
          {
            allcart.length ? (
              <div>
                <h1 style={{marginTop: '60px'}}>Suggestions</h1>
                <div class="suggest-book">
                  {
                    books.slice(0, 4).map(({_id, name, bookImage, rating, price}, index) => (
                      <div class={`book book-${index + 1}`}>
                        <a href={'/detail/' + _id}>
                          <img style={{height: '150px'}} src={`https://intense-temple-58166.herokuapp.com/uploads/${bookImage}`} alt=""/>
                        </a>
                        <h4 style={{fontSize: '16px', textAlign: 'left'}}>{ name }</h4>
                        {
                          this.renderStar(rating)
                        }
                        <span>${price}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (<h2>Your cart is empty</h2>)
          }
        </div>
      {
        allcart.length ? (
            <div className="total">
              <h1 className="title">Total</h1>
              <h1 className="total-price">${total(allcart)}</h1>
              {
                token ? (
                  <div>
                    <a href='/contact'>
                        <input onClick={this.onCheckoutClick.bind(this, token)}  type="submit" value="Buy" class="buy-button"/>
                    </a>
                    <a href='/contact'>
                      <input onClick={this.onCheckoutClick.bind(this, token)} type="submit" value="Send gift" class="gift-button"/>
                    </a>
                  </div>
                ) : (
                  <div>
                    <input onClick={this.onCheckoutClick.bind(this, token)}  type="submit" value="Buy" class="buy-button"/>
                    <input onClick={this.onCheckoutClick.bind(this, token)} type="submit" value="Send gift" class="gift-button"/>
                  </div>
                )
              }
              { this.onCheckout(this.state.message) }
            </div>
        ) : null
      }

      </div>

     );
  }
};

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cart: state.cart,
  account: state.account,
  book: state.book
})

export default connect(mapStateToProps, {getCart, getBooks, updateCart, removeFromCart, toggleLogin})(Cart);
