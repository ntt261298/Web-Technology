import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


class Detail extends React.Component {

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.question.error,
  token: state.account.token
})

export default connect(mapStateToProps, null)(Detail);
