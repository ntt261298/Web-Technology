import React from 'react';
import SlideImg from './SlideImg.js';
import BookList from './BookList.js';

export default class Content extends React.Component {
  render() {
    return (
      <div className="content">
        {/* <SlideImg /> */}
        <BookList />
      </div>
    );
  }
}
