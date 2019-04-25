import React from "react";
import { Link } from "react-router-dom";
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


class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isLoading: false,
      text: "",
      Content: null,

    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = event => {
    //event.preventDefault();
    window.location.reload();
    const { text } = this.state;
    this.fetchPost(text);
  };

  fetchPost = () => {
    this.setState({
      isLoading: true
    });
    fetch("http://192.168.1.16:8080/api/home/law/insert", {
      method: "POST",
      body: JSON.stringify({
        Content: this.state.Content,

      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          isLoading: false
        });
      });
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
          <center>Hãy cho chúng tôi biết chi tiết về câu hỏi của bạn</center>
        </h3>
        <h5>
          <center>Mô tả chính xác và chi tiết sẽ giúp mọi người dễ dàng tìm thấy và giải quyết vấn đề của bạn</center>
        </h5>
        <hr />
        <br />
        <Form>
          <FormGroup>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <div className="row">
                <label htmlFor="title">Tiêu đề <span className="req">*</span></label><br />
                <input type="text" name="title" id="title" className="txt" tabIndex={1} required onChange={event => this.onChange(event)} />
              </div>
              <hr />
              <div className="row">
                <label htmlFor="problem">Vấn đề bạn gặp phải<span className="req">*</span></label><br />
                <input type="text" name="problem" id="problem" className="txt" tabIndex={2} required onChange={event => this.onChange(event)}/>
              </div>
              <hr />

              <div className="row">
                <label htmlFor="language">Ngôn ngữ<span className="req">*</span></label><br />
                <select name="language" id="language" className="txt" tabIndex={3} onChange={event => this.onChange(event)}>
                  <option value="java">Java</option>
                  <option value="javascript">Javascript</option>
                  <option value="php">Php</option>
                  <option value="c">C</option>
                </select>
              </div>
              <hr />

              <div className="row">
                <label htmlFor="code">Code </label>
                <textarea name="code" id="code" className="txtarea" tabIndex={4} required defaultValue={""} onChange={event => this.onChange(event)} />
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
              Gửi câu hỏi
            </Button>
          </center>
          <Modal
            backdropClassName="back-drop"
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Note</ModalHeader>
            <ModalBody>Bạn có muốn gửi câu hỏi không?</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit}>
                <Link to="/" style={{ color: "white" }}>
                  OK
                </Link>
              </Button>{" "}
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

export default connect(null, null)(AddQuestion);
