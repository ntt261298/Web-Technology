import React from 'react';
import { Button } from 'reactstrap';
import currency from '../../helpers/currency.js';
import { connect } from 'react-redux';
import { removeFromCart } from '../../actions/cartAction';

class CartItem extends React.Component {
  onDeleteItem(id) {
    this.props.removeFromCart(id)
  }

  render() {
    const item = this.props.item;
    return (
      <tr>
        <td className="text-center">
          <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={this.onDeleteItem.bind(this, item.id)}
            >
            &times;
          </Button>
        </td>
        <td className="text-center">{this.props.index + 1}</td>
        <td className="text-center">{item.name}</td>
        <td className="text-center">{item.count}</td>
        <td className="text-right price">{currency(item.price)}</td>
        <td className="text-right price">{currency(item.count * item.price)}</td>
      </tr>
    );
  }
}


export default connect(null, {removeFromCart})(CartItem);
