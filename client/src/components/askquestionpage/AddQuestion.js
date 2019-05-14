import React from "react";
import { Link } from "react-router-dom";
import toastr from 'toastr';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addQuestion } from '../../actions/questionsAction';


class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      text: '',
      Content: null,
      code: '',
      title: '',
      problem: '',
      language: 'java'
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Display err when server can't add question
    if (prevProps.error !== this.props.error) {
      toastr.error('Fail to ask question')
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = event => {
    const { title, problem, code, language } = this.state;
    if(!title.trim()) {
      toastr.error('Title must not be empty');
    };
    if(!problem.trim()) {
      toastr.error('Problem must not be empty');
    };

    this.props.addQuestion(title, problem, code, language, this.props.token);
    this.toggle();
  };

  onChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <br />
        <h3>
          <center>Tell us about your question</center>
        </h3>
        <h5>
          <center>Your description gives people the information they need to help you answer your question.</center>
        </h5>
        <hr />
        <br />
        <Form>
          <FormGroup>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <div className="row">
                <label htmlFor="title">Title <span className="req">*</span></label><br />
                <input type="text" name="title" id="title" className="txt" tabIndex={1} required onChange={event => this.onChange(event)} />
              </div>
              <hr />
              <div className="row">
                <label htmlFor="problem">Summarize the problem<span className="req">*</span></label><br />
                <input type="text" name="problem" id="problem" className="txt" tabIndex={2} required onChange={event => this.onChange(event)}/>
              </div>
              <hr />

              <div className="row">
                <label htmlFor="language">Programming language<span className="req">*</span></label><br />
                <select name="language" id="language" className="txt" tabIndex={3} onChange={event => this.onChange(event)}>
                  <option value="java">Java</option>
                  <option value="javascript">Javascript</option>
                  <option value="php">Php</option>
                  <option value="html">Html</option>
                  <option value="css">Css</option>
                  <option value="xml">Xml</option>
                  <option value="csharp">C#</option>
                  <option value="c">C/C++</option>
                  <option value="python">Python</option>
                  <option value="swift">Swift</option>
                  <option value="go">Go</option>
                  <option value="haskell">Haskell</option>
                  <option value="assembly">Assembly</option>
                  <option value="ruby">Ruby</option>
                </select>
              </div>
              <hr />


              <div className="row">
                <label htmlFor="code">Show some code </label>
                <textarea name="code" id="code" className="txtarea" tabIndex={5} required defaultValue={""} onChange={event => this.onChange(event)} />
              </div>
              <hr />


            </Col>
          </FormGroup>

          <center>
            <Button
              className="delete-button"
              color="primary"
              onClick={this.toggle}
              style={{ marginBottom: "30px" }}
            >
            Post Your Question
            </Button>
          </center>
          <Modal
            backdropClassName="back-drop"
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Note</ModalHeader>
            <ModalBody>Are you sure you want to submit this question?</ModalBody>
            <ModalFooter>
            <Link to="/" style={{ color: "white" }}>
              <Button color="primary" onClick={this.handleSubmit}>
                
                  OK
                
              </Button>{" "}
              </Link>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.question.error,
  token: state.account.token
})

export default connect(mapStateToProps, { addQuestion })(AddQuestion);
