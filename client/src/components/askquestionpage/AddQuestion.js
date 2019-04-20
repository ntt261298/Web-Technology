import React from "react";
import {Link} from "react-router-dom";
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
        <h2>
          <center>Thêm Câu hỏi</center>
        </h2>
        <Form>
          <FormGroup>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Label for="content">Nội dung câu hỏi</Label>
              <Input
                type="textarea"
                id="Content"
                name="Content"
                onChange={event => this.onChange(event)}
              />
            </Col>
          </FormGroup>
          
          <center>
            <Button
              className="delete-button"
              color="primary"
              onClick={this.toggle}
              style={{ marginBottom: "30px" }}
            >
              Submit
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
                <Link to="/"  style={{ color: "white" }}>
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
