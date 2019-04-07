import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { getBooks } from '../../actions/itemsAction';
import { addToCart } from '../../actions/cartAction';
import { getComment, addComment } from '../../actions/commentAction';
import { PropTypes } from 'prop-types';
import uuid from 'uuid';

class BookDetail extends React.Component {
  state = {
    qty: 1,
    active1: 'active',
    active2: '',
    rating: 3,
    comment: '',
    message: '',
    box: 1,
    box1: 'active-box',
    box2: '',
    box3: '',
    box4: '',
    box5: ''
  }
  componentDidMount() {
    this.props.getBooks();
    this.props.getComment();
  }

  onMinusQtyClick() {
    const qty = this.state.qty;
    if(qty === 1) return;
    this.setState({
      qty: qty - 1
    })
  }

  onAddQtyClick() {
    this.setState({
      qty: this.state.qty + 1
    })
  }

  onAddToCartClick(id, name, price, bookImage, author, rating) {
    this.props.addToCart(uuid(), id, this.state.qty, name, price, bookImage, author, rating);
  }

  active1() {
    if(this.state.active1) return;
    this.setState({
      active1: 'active',
      active2: ''
    })
  }

  active2() {
    if(this.state.active2) return;
    this.setState({
      active2: 'active',
      active1: ''
    })
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

  pickRating(rating) {
    let star = [];
    let i = 1;
    for(i; i <= rating; i++) {
      star.push(<span key={i}><img class="star-static" onClick={this.setRating.bind(this)} name={i} src="../image/baseline-star_rate-18px.svg" alt=""/></span>)
    };
    for(i; i <= 5; i++) {
      star.push(<span key={i}><img class="star-static" onClick={this.setRating.bind(this)} name={i} src="../image/baseline-star_rate-18px-gray.svg" alt=""/></span>)
    };
    return star;
  }

  setRating(e) {
    e.preventDefault();
    this.setState({
      rating: e.target.name
    })
  }

  onChanged(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCommentSubmit(_id, token) {
    if(!token) {
      this.setState({
        message: 'You must login to comment'
      })
    } else {
      this.setState({
        message: ''
      });
      this.props.addComment(token, _id, this.state.comment, this.state.rating);
    }
  }

  onComment(message) {
    if(message) {
      return <div className="alert alert-danger mt-2">{message}</div>
    }
    return null;
  }

  getCommentTime(fromTime, toTime) {
    let from = new Date(fromTime);
    let to = new Date();
    let differenceTravel = to.getTime() - from.getTime();
    let seconds = Math.floor(differenceTravel / 1000);
    if(seconds < 60) {
      return seconds + ` seconds ago`;
    } else if(60 <= seconds && seconds < 3600) {
      return Math.floor(seconds/60) + ` minutes ago`;
    } else if(3600 <= seconds && seconds< 86400) {
      return Math.floor(seconds/3600) + ` hours ago`;
    } else if(86400 <= seconds && seconds < 2592000) {
      return Math.floor(seconds/86400) + ` days ago`;
    } else return Math.floor(seconds/2592000) + ` months ago`;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  setBoxComment(value) {
    switch (value) {
      case '1': {
        this.setState({
          box: 1,
          box1: 'active-box', box2: '', box3: '', box4: '', box5: ''
        });
        break;
      }
      case '2': {
        this.setState({
          box: 2,
          box1: '', box2: 'active-box', box3: '', box4: '', box5: ''
        });
        break;
      }
      case '3': {
        this.setState({
          box: 3,
          box1: '', box2: '', box3: 'active-box', box4: '', box5: ''
        });
        break;
      }
      case '4': {
        this.setState({
          box: 4,
          box1: '', box2: '', box3: '', box4: 'active-box', box5: ''
        });
        break;
      }
      case '5': {
        this.setState({
          box: 5,
          box1: '', box2: '', box3: '', box4: '', box5: 'active-box'
        });
        break;
      }
      case 'left': {
        if(this.state.box === 1) break;
        this.setState({
          box: this.state.box -1,
          box1: '', box2: '', box3: '', box4: '', box5: ''
        });
        switch (this.state.box) {
          case 2:
            this.setState({
              box1: 'active-box'
            })
            break;
          case 3:
            this.setState({
              box2: 'active-box'
            })
            break;
          case 4:
            this.setState({
              box3: 'active-box'
            })
            break;
          case 5:
            this.setState({
              box4: 'active-box'
            })
            break;
          default:

        }
        break;
      }
      case 'right': {
        if(this.state.box === 5) break;
        this.setState({
          box: this.state.box + 1,
          box1: '', box2: '', box3: '', box4: '', box5: ''
        });
        switch (this.state.box) {
          case 1:
            this.setState({
              box2: 'active-box'
            })
            break;
          case 2:
            this.setState({
              box3: 'active-box'
            })
            break;
          case 3:
            this.setState({
              box4: 'active-box'
            })
            break;
          case 4:
            this.setState({
              box5: 'active-box'
            })
            break;
          default:

        }
        break;
      };
      default:
        break;
    };
    return;
  }

  render() {
    const token = this.props.account.token;
    const { books } = this.props.book;
    const { comment } = this.props.comment;
    const opts = {
     height: '390',
     width: '640',
     playerVars: {
       autoplay: 1
     }
   };
    return (
      <div class="main-content">
        { books.map(({_id, name, author, price, bookImage, rating, category, des, company, contentImage, videoId}) => {if(_id === this.props.id) return (
            <div>
              <div class="book-direct">
                <span>{category}</span>
                <img src="../image/baseline-chevron_right-24px.svg" alt=""/>
                <span>{name}</span>
              </div>
              <div class="book-infor">
                <div class="book-slide">
                  {this.state.active1 ? (
                    <img class="image-slide" style={{textAlign: 'center'}} src={`https://intense-temple-58166.herokuapp.com/uploads/${bookImage}`} alt=""/>
                  ) : (
                    <img class="image-slide" style={{textAlign: 'center'}} src={`https://intense-temple-58166.herokuapp.com/uploads/${contentImage}`} alt=""/>
                  )}
                  <div class="circle">
                    <span class={`${this.state.active1} circle-slide`}  onClick={this.active1.bind(this)}></span>
                    <span class={`${this.state.active2} circle-slide`} onClick={this.active2.bind(this)}></span>
                  </div>
                </div>
                <div class="book-detail">
                  <h2>{name}</h2>
                  {
                    this.renderStar(rating)
                  }
                  <h5>{author}</h5>
                  <h1>${price}</h1>
                  <div class="change-account">
                    <div class="option">
                      <img class="minus" src="../image/minus.svg" onClick={this.onMinusQtyClick.bind(this)} alt=""/>
                      <span>{this.state.qty}</span>
                      <img class="plus" src="../image/plus.svg" onClick={this.onAddQtyClick.bind(this)} alt=""/>
                    </div>
                    <div class="add-cart">
                      <img src="../image/baseline-add_shopping_cart-24px.svg" onClick={this.onAddToCartClick.bind(this, _id, name, price, bookImage, author, rating)} alt=""/>
                    </div>
                  </div>
                  <p class="detail-infor">{des.slice(0, 200)}...</p>
                  </div>
                </div>

                { videoId ? (
                  <div>
                    <h1>Review</h1>
                    <YouTube
                      videoId={videoId}
                      opts={opts}
                      onReady={this._onReady}
                    />
                  </div>
                ) : null }

          <div class="comment-nav">
            <input type="text" name="comment" placeholder="Your comment about this book..." class="comment-input" onChange={this.onChanged.bind(this)}/>
            <input type="submit" value="SEND" class="comment-button" onClick={this.onCommentSubmit.bind(this, _id, token)}/>
          </div>
          <div class="star-center">
            { this.pickRating(this.state.rating) }
          </div>
          { this.onComment(this.state.message)}
          {
            comment.slice((this.state.box - 1)*5, this.state.box*5).map(({name, bookID, comment, rating, date}, index) => {if(bookID === _id) return(
              <div class="comment">
                <div class="user user-1">
                  <img src="../image/account-circle.svg" alt=""/>
                  <h4>{ name }</h4>
                  <p>{ this.getCommentTime(date, Date()) }</p>
                </div>
                <div class="comment-detail">
                  <div>
                    { this.renderStar(rating) }
                  </div>
                  <p>{ comment }</p>
                    <img src="../image/thumb-up.svg" alt=""/>
                    <img src="../image/comment.svg" alt=""/>
                  </div>
                </div>
            )})
          }
          <div class="comment comment-1">
            <div class="user user-1">
              <img src="../image/account-circle.svg" alt=""/>
              <h4>Nguyễn Tiến Trường</h4>
              <p>2 days ago</p>
            </div>
            <div class="comment-detail">
              <div>
                <span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                <span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                <span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                <span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                <span class="star"><img src="../image/baseline-star_rate-18px.svg" alt=""/></span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis veritatis qui
                iste quod placeat, voluptate, dignissimos repudiandae rem unde incidunt quidem dicta
                doloribus in animi, nostrum nulla eum minima sequi ullam numquam iusto eos commodi.
                Praesentium temporibus optio totam. Necessitatibus explicabo, blanditiis impedit, omnis
                illum ducimus molestias. Qui, quod, itaque.</p>
                <img src="../image/thumb-up.svg" alt=""/>
                <img src="../image/comment.svg" alt=""/>
              </div>
            </div>
            <div class="comment comment-2">
              <div class="user user-2">
                <img src="../image/account-circle.svg" alt=""/>
                <h4>Nguyễn Đức Trọng</h4>
                <p>2 days ago</p>
              </div>
              <div class="comment-detail">
                <div>
                  <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                  <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                  <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                  <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                  <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis veritatis qui
                  iste quod placeat, voluptate, dignissimos repudiandae rem unde incidunt quidem dicta
                  doloribus in animi, nostrum nulla eum minima sequi ullam numquam iusto eos commodi.
                  Praesentium temporibus optio totam. Necessitatibus explicabo, blanditiis impedit, omnis
                  illum ducimus molestias. Qui, quod, itaque.</p>
                  <img src="../image/thumb-up.svg" alt=""/>
                  <img src="../image/comment.svg" alt=""/>
                </div>
              </div>
              <div class="comment comment-3">
                <div class="user user-3">
                  <img src="../image/account-circle.svg" alt=""/>
                  <h4>Đoàn Duy Đạt</h4>
                  <p>2 days ago</p>
                </div>
                <div class="comment-detail">
                  <div>
                    <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                    <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                    <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                    <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                    <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis veritatis qui
                    iste quod placeat, voluptate, dignissimos repudiandae rem unde incidunt quidem dicta
                    doloribus in animi, nostrum nulla eum minima sequi ullam numquam iusto eos commodi.
                    Praesentium temporibus optio totam. Necessitatibus explicabo, blanditiis impedit, omnis
                    illum ducimus molestias. Qui, quod, itaque.</p>
                    <img src="../image/thumb-up.svg" alt=""/>
                    <img src="../image/comment.svg" alt=""/>
                  </div>
                </div>
                <div class="comment comment-4">
                  <div class="user user-4">
                    <img src="../image/account-circle.svg" alt=""/>
                    <h4>Trần Thị Hoài</h4>
                    <p>2 days ago</p>
                  </div>
                  <div class="comment-detail">
                    <div>
                      <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                      <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                      <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                      <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                      <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis veritatis qui
                      iste quod placeat, voluptate, dignissimos repudiandae rem unde incidunt quidem dicta
                      doloribus in animi, nostrum nulla eum minima sequi ullam numquam iusto eos commodi.
                      Praesentium temporibus optio totam. Necessitatibus explicabo, blanditiis impedit, omnis
                      illum ducimus molestias. Qui, quod, itaque.</p>
                      <img src="../image/thumb-up.svg" alt=""/>
                      <img src="../image/comment.svg" alt=""/>
                    </div>
                  </div>
                  <div class="comment comment-5">
                    <div class="user user-5">
                      <img src="../image/account-circle.svg" alt=""/>
                      <h4>Nguyễn Văn Huy</h4>
                      <p>1 month ago</p>
                    </div>
                    <div class="comment-detail">
                      <div>
                        <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                        <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                        <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                        <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                        <span><img class="star" src="../image/baseline-star_rate-18px.svg" alt=""/></span>
                      </div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis veritatis qui
                        iste quod placeat, voluptate, dignissimos repudiandae rem unde incidunt quidem dicta
                        doloribus in animi, nostrum nulla eum minima sequi ullam numquam iusto eos commodi.
                        Praesentium temporibus optio totam. Necessitatibus explicabo, blanditiis impedit, omnis
                        illum ducimus molestias. Qui, quod, itaque.</p>
                        <img src="../image/thumb-up.svg" alt=""/>
                        <img src="../image/comment.svg" alt=""/>
                      </div>
                    </div>
                    <div class="numeric">
                      <img src="../image/baseline-chevron_left-24px.svg" alt="" onClick={this.setBoxComment.bind(this, 'left')}/>
                      <img src="../image/page-first.svg" alt="" onClick={this.setBoxComment.bind(this, '1')}/>
                      <span className={`numeric-box ${this.state.box1}`}  onClick={this.setBoxComment.bind(this, '1')}>1</span>
                      <span className={`numeric-box ${this.state.box2}`} onClick={this.setBoxComment.bind(this, '2')}>2</span>
                      <span className={`numeric-box ${this.state.box3}`} onClick={this.setBoxComment.bind(this, '3')}>3</span>
                      <span className={`numeric-box ${this.state.box4}`} onClick={this.setBoxComment.bind(this, '4')}>4</span>
                      <span className={`numeric-box ${this.state.box5}`} onClick={this.setBoxComment.bind(this, '5')}>5</span>
                      <img src="../image/page-last.svg" alt="" onClick={this.setBoxComment.bind(this, '5')}/>
                      <img src="../image/baseline-chevron_right-24px.svg" alt="" onClick={this.setBoxComment.bind(this, 'right')}/>
                    </div>
                    <h1 style={{marginTop: '30px'}}>Suggestions</h1>
                    <div class="suggest-book" style={{width: '80%'}}>
                      {
                        books.slice(0, 4).map(({_id, name, bookImage, rating, price}, index) => (
                          <div class={`book book-${index + 1}`}>
                            <a href={'/detail/' + _id}>
                              <img style={{height: '200px'}} src={`https://intense-temple-58166.herokuapp.com/uploads/${bookImage}`} alt=""/>
                            </a>
                            <h4 style={{fontSize: '16px', textAlign: 'left'}}>{ name }</h4>
                            {
                              this.renderStar(rating)
                            }
                            <span>${price}</span>
                          </div>
                        ))
                      }
                    </div>
                    <h1>Detail Information</h1>
                    <div class="detail">
                      <div class="entity">
                        <ul>
                          <li>Pulisher</li>
                          <li>Author</li>
                          <li>Publishing Company</li>
                          <li>Cover</li>
                          <li>SKU</li>
                        </ul>
                      </div>
                      <div class="infor-entity">
                        <ul>
                          <li>NineBook</li>
                          <li>{author}</li>
                          <li>{company}</li>
                          <li>Soft</li>
                          <li>{_id}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
              )})}
            </div>
    );
  }
}

BookDetail.propTypes = {
  getBooks: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  book: state.book,
  comment: state.comment,
  account: state.account
})


export default connect(mapStateToProps, {getBooks, addToCart, addComment, getComment})(BookDetail);
