import React from 'react';
import { getShoppingHistory } from '../../actions/accountsAction.js';
import Item from './Item.js';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ShoppingHistory extends React.Component {
  componentDidMount() {
    this.props.getShoppingHistory(this.props.account.token);
  }

  render() {
    const allItems  = this.props.account;
    console.log(allItems);
    // if (isLoading) return <div className='loading'><Loading /></div>;
    if(allItems.history.length === 0) return <h2>You have not bought something yet...</h2>;
    return (
        <div className="container-mini">
          <div className="cart">
              <div>
                <h2>Your Shopping History</h2>
                  <table className="table table-hover checkout">
                    <tbody>
                      <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Qty.</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Total</th>
                        <th className="text-right">Status</th>
                      </tr>
                      {allItems.history.map((item, index) => (
                        <Item key={index} item={item} className="fade-exit"/>
                      ))}
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
    );
  }
};

ShoppingHistory.propTypes = {
  getShoppingHistory: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: state.account
})

export default connect(mapStateToProps, {getShoppingHistory})(ShoppingHistory);
