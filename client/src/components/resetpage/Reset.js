import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { resetPassword } from '../../actions/accountsAction';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Reset extends React.Component {
  state = {
    password: '',
    repassword: ''
  }

  onChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitClick(e) {
    const password = this.state.password;
    const repassword = this.state.repassword;
    e.preventDefault();
    this.props.resetPassword(this.props.token, password, repassword);
  }

  render() {
    const resetMessage = this.props.account.resetErr;
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" onChange={this.onChanged.bind(this)} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="repassword">Repassword</Label>
              <Input type="password" name="repassword" onChange={this.onChanged.bind(this)}/>
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={this.onSubmitClick.bind(this)}>Submit</Button>
        { resetMessage.length > 0 ? (
          <div style={{marginTop: '20px'}} className="alert alert-danger">{resetMessage}</div>
        ) : null}
      </Form>
    );
  }
}

Reset.propTypes = {
  resetPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  account: state.account,
})

export default connect(mapStateToProps, { resetPassword })(Reset);
