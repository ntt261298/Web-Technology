import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { getSearchResults } from '../../actions/searchAction';
// import { addToCart} from '../actions/cartAction';
import { PropTypes } from 'prop-types';
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
    const results = this.props.search.results;
    return (
      <div className="book-list">
        { results.slice(0, 12).map(({_id, bookImage, name, author, price, rating, des}, index) => (
          <div className={`book-information book${index+1}`} key={_id}>
              <div className="book-img">
                <a href={'/detail/' + _id}>
                  <img className="image-book" src={`https://intense-temple-58166.herokuapp.com/uploads/${bookImage}`} alt=""/>
                </a>
              </div>
              <div className="book-inf">
                <h2 className="name">{name}</h2>
                {
                  this.renderStar(rating)
                }
                <h5 className="author">{author}</h5>
                <h1 className="name">${price}</h1>
                <p className="detail-infor">{des.slice(0, 100)}...</p>
                </div>
          </div>
        )) }
      </div>
    );
  };
}

SearchResults.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, { getSearchResults })(SearchResults);
