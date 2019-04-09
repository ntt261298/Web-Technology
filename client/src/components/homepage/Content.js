import React from 'react';
import QuestionList from './QuestionList';

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <QuestionList />
      </div>
    );
  }
}
