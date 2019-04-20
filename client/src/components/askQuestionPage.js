import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/askquestion.css';
import Menu from './layout/Menu.js';
import Login from './layout/Login.js';
import ForgetPwd from './layout/ForgetPwd.js';
import AddQuestion from './askquestionpage/AddQuestion.js';
import Footer from './layout/Footer.js';    

export default class askQuestionPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Menu />
        </header>
        <main className="clearfix ask-question-body">
          <ForgetPwd />
          <Login />
          <AddQuestion />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
