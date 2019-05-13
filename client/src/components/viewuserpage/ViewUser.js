import React from 'react';
import { getUser } from '../../actions/userAction.js';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ViewUser extends React.Component {
  componentDidMount() {
    console.log(this.props.id);
    this.props.getUser(this.props.id);
  }

  render() {
    const user  = this.props.user.user;
    // if (isLoading) return <div className='loading'><Loading /></div>;
    // if(allItems.history.length === 0)  return <h2>You have no activity...</h2>;
    return (
        <div className="content" style={{marginTop: '20px'}}>
          <div className="cart">
              <div>
                <h2>User Information</h2>
                  <table className="table table-hover checkout">
                    <tbody>
                      <tr>
                        <th className="text-center">Username</th>
                        <th className="text-center">Questions</th>
                        <th className="text-center">Answers</th>
                        <th className="text-center">Comment</th>
                        <th className="text-center">Rating</th>
                      </tr>
                      <tr>
                        <th className="text-center">{user._doc.username}</th>
                        <th className="text-center">{user.question}</th>
                        <th className="text-center">{user.answer}</th>
                        <th className="text-center">{user.comment}</th>
                        <th className="text-center">{user.rating}</th>
                      </tr>
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
    );
  }
};

ViewUser.propTypes = {
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, {getUser})(ViewUser);
