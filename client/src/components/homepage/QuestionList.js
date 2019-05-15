import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { getQuestions} from '../../actions/questionsAction';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      data: [],
      isLoading: false
    };
    
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  renderStar(rating) {
    let star = [];
    for(let i = 0; i < parseInt(rating); i++) {
      star.push(<span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>)
    };
    if(rating - parseInt(rating)) {
      star.push(<span class="star"><img src="../image/baseline-half-star_rate-18px.svg" alt=""/></span>)
    }
    return star;
  }

  render() {
    const { questions } = this.props.question;
    const { token } = this.props.account;
    return (
      <div className="question-home">
        <div className="head">
          <h3>Questions List</h3>
          <button className="ask-question" >
            {
              token ? (
              <a href="/askQuestion" >
                  Ask Question
              </a>) : (
                <span onClick={() => toastr.error('You must login to ask question')}>Ask Question</span>
              )
            }
            
          </button>
        </div>
        {/* <div className="filter">
          <div></div>
          <ul>
            <li>All</li>
            <li>Hot</li>
            <li>Week</li>
            <li>Month</li>
          </ul>
        </div> */}
        {/* { questions.slice(0, 12).map(({_id, title, category, rating, answers, views}, index) => (
          <div className={`question${index+1}`} key={_id}>
              
          </div>
        )) } */}
        {questions.map((question, index) => (
        <div className={`questions question-${index + 1}`}>
          <div className="info-question">
            <div className="rating">
              <div>{question.rating}</div>
              <div>rating</div>
            </div>
            <div className="answers">
              <div>{question.answers}</div>
              <div>answers</div>
            </div>
            <div className="views">
              <div>{question.views}</div>
              <div>views</div>
            </div>
          </div>
          <div className="content-question">
            <div className="title-question">
              <a href={`/detail/${question._id}`}>
                {question.title}
              </a>
            </div>
            <div className="cate-question">
              {question.category}
            </div>
          </div>
        </div>
        ))}
        
      </div>
    );
  };
}

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  question: state.question,
  account: state.account
})

export default connect(mapStateToProps, {getQuestions})(QuestionList);
