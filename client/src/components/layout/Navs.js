import React from 'react';
import '../../style/nav.css';
import { getCate } from '../../actions/questionsAction';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

class Navs extends React.Component {
  state = {
    btn: '',
    nav: 'close-nav'
  }

  componentDidMount() {
    this.props.getCate()
  }

  showNav() {
    if(!this.state.nav) {
      this.setState({
        btn: '',
        nav: 'close-nav'
      })
    }
    else this.setState({
      btn: 'close-nav',
      nav: ''
    })
  }

  renderStarStatic(rating) {
    let star = [];
    for(let i = 0; i < parseInt(rating); i++) {
      star.push(<span class="star"><img style={{width: '30px', height: '30px'}} src="https://intense-temple-58166.herokuapp.com/image/baseline-star_rate-18px.svg" alt=""/></span>)
    };
    return star;
  }

  render() {
    return (
        <nav className="nav-bar">
          <div className={`menu-btn ${this.state.btn}`} onClick={this.showNav.bind(this)}>
            <div class="btn-line"></div>
            <div class="btn-line"></div>
            <div class="btn-line"></div>
          </div>
          <div className={`nav-content ${this.state.nav}`}>
            <div className={`category ${this.state.nav}`} >
              <h3>PROGRAMMING LANGUAGES</h3>
              <ul>
                {/* {
                  cate.map(({_id, name}) => (
                    <li>
                      <a href={`/search/category/${name}`}>{name}</a>
                    </li>
                  ))
                } */}
                <li><a href="/search/category/php">PHP</a></li>
                <li><a href="/search/category/html">HTML</a></li>
                <li><a href="/search/category/css">CSS</a></li>
                <li><a href="/search/category/xml">XML</a></li>
                <li><a href="/search/category/java">Java</a></li>
                <li><a href="/search/category/javascript">Javascript</a></li>
                <li><a href="/search/category/python">Python</a></li>
                <li><a href="/search/category/swift">Swift</a></li>
                <li><a href="/search/category/go">Go</a></li>
                <li><a href="/search/category/c">C/C++</a></li>
                <li><a href="/search/category/csharp">C#</a></li>
                <li><a href="/search/category/haskell">Haskell</a></li>
                <li><a href="/search/category/assembly">Assembly</a></li>
                <li><a href="/search/category/ruby">Ruby</a></li>              
              </ul>
            </div>
            
            <div className={`${this.state.nav}`}>
              <h3>RATING</h3>
              <ul>
                <li>
                  <a href={`/search/rating/1`}>{this.renderStarStatic(1)}</a>
                </li>
                <li>
                  <a href={`/search/rating/2`}>{this.renderStarStatic(2)}</a>
                </li>
                <li>
                  <a href={`/search/rating/3`}>{this.renderStarStatic(3)}</a>
                </li>
                <li>
                  <a href={`/search/rating/4`}>{this.renderStarStatic(4)}</a>
                </li>
                <li>
                  <a href={`/search/rating/5`}>{this.renderStarStatic(5)}</a>
                </li>
              </ul>
            </div>
          </div>

        </nav>
    );
  }
}

Navs.propTypes = {
  getCate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  question: state.question
})

export default connect(mapStateToProps, { getCate })(Navs);
