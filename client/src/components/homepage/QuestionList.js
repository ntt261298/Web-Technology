import React from 'react';
/*import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';*/
import { connect } from 'react-redux';
import { getQuestions} from '../../actions/questionsAction';
import { PropTypes } from 'prop-types';

import { Link } from 'react-router-dom';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      data: [],
      isLoading: false
    };
    
  }

  fetchAdmind = () => {
    this.setState({
      isLoading: true
    });
    fetch("http://192.168.1.16:8080/api/home/law/getall", {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          data: response,          
          isLoading: false
        });
      });
  };
  componentDidMount() {
    this.fetchAdmind();
    
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
    return (
      <div className="question-home">
        <div className="head">
          <h2>Top Questions</h2>
          <button className="ask-question" >
            <a href="/askQuestion" >
                Ask Question
            </a>
          </button>
        </div>
        <div className="filter">
          <div></div>
          <ul>
            <li>Interesting</li>
            <li>Hot</li>
            <li>Week</li>
            <li>Month</li>
          </ul>
        </div>
        {/* { questions.slice(0, 12).map(({_id, title, category, rating, answers, views}, index) => (
          <div className={`question${index+1}`} key={_id}>
              
          </div>
        )) } */}
        {this.state.data.map((item) => (
        <div className="questions question-1">
          <div className="info-question">
            <div className="rating">
              <div>{item.rate}</div>
              <div>rating</div>
            </div>
            <div className="answers">
              <div>{item.answer}</div>
              <div>answers</div>
            </div>
            <div className="views">
              <div>{item.view}</div>
              <div>views</div>
            </div>
          </div>
          <div className="content-question">
            <div className="title-question">
              {item.question}
            </div>
            <div className="cate-question">
              {item.program}
            </div>
          </div>
        </div>
        ))}
        <div className="questions question-1">
          <div className="info-question">
            <div className="rating">
              <div>4.5</div>
              <div>rating</div>
            </div>
            <div className="answers">
              <div>0</div>
              <div>answers</div>
            </div>
            <div className="views">
              <div>12</div>
              <div>views</div>
            </div>
          </div>
          <div className="content-question">
            <div className="title-question">
              There is “utf8' codec can't decode byte 0xcd in position” when import module
            </div>
            <div className="cate-question">
              python
            </div>
          </div>
        </div>
      </div>
    );
  };
}

BookList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  question: state.question
})

export default connect(mapStateToProps, {getQuestions})(BookList);
