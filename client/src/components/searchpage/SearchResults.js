import React from 'react';
//import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
// CardSubtitle, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { getSearchResults } from '../../actions/searchAction';
// import { addToCart} from '../actions/cartAction';
import { PropTypes } from 'prop-types';
import toastr from 'toastr';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.getSearchResults(this.props.type, this.props.name);
  }

  renderStar(rating) {
    let star = [];
    for(let i = 0; i < parseInt(rating); i++) {
      star.push(<span class="star"><img src="https://intense-temple-58166.herokuapp.com/image/baseline-star_rate-18px.svg" alt=""/></span>)
    };
    if(rating - parseInt(rating)) {
      star.push(<span class="star"><img src="https://intense-temple-58166.herokuapp.com/image/baseline-half-star_rate-18px.svg" alt=""/></span>)
    }
    return star;
  }

  render() {
    const token = this.props.token;
    const results = this.props.search.results;
    if(!results.length) return (<h2 style={{marginTop: '20px'}} className="content">No question in this category</h2>);
    return (
      <div className="content">
        <div className="head">
          <h3>Category Questions</h3>
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
        {results.map((question, index) => ( 
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

SearchResults.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  search: state.search,
  token: state.account.token,
})

export default connect(mapStateToProps, { getSearchResults })(SearchResults);
