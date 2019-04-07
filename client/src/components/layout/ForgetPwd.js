import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input, Button} from 'reactstrap';
import { toggleForget } from '../../actions/itemsAction';
import { sendEmail } from '../../actions/accountsAction';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ForgetPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.props.toggleForget();
  }


  onSubmitEmail(e) {
    e.preventDefault();
    this.props.sendEmail(this.state.email);
    this.setState({
      email: ''
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const emailMessage = this.props.account.emailErr;
    return (
      <div>
        <Modal isOpen={this.props.item.forgetModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Verify by your email</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Email: </Label>
                <Input type="text" name="email" placeholder="Your email..." onChange={this.onChange} />
                <Button onClick={this.onSubmitEmail.bind(this)}  color="primary" style={{marginTop: '1rem'}} block>Submit</Button>
              </FormGroup>
              { emailMessage.length > 0 ? (
                <div style={{marginTop: '20px'}} className="alert alert-danger">{emailMessage}</div>
              ) : null}
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ForgetPwd.propTypes = {
  toggleForget: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  item: state.item,
  account: state.account
})

export default connect(mapStateToProps, { toggleForget, sendEmail })(ForgetPwd);
