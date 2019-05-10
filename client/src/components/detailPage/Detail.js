import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import toastr from 'toastr';
import { getQuestion, addView } from '../../actions/questionsAction';
import { addAnswer, getAnswers } from '../../actions/answersAction';

class Detail extends React.Component {
	state = {
		questionRating: 3,
		inputReply: false,
		rating: 3,
		commentText: '',
		commentCode: '',
	}

	componentDidMount() {
		this.props.getQuestion(this.props.id);
		this.props.getAnswers(this.props.id);
		this.props.addView(this.props.id);
	}

	renderStar(rating) {
		let star = [];
		for (let i = 0; i < parseInt(rating); i++) {
			star.push(<span className="fa fa-star checked" />)
		};
		if (rating - parseInt(rating)) {
			star.push(<span className="fa fa-star" />)
		}
		return star;
	}

	renderRating(rating) {
		let star = [];
		let i = 1;
		for (i; i <= rating; i++) {
			star.push(<span className="fa fa-star checked" />)
		};
		for (i; i <= 5; i++) {
			star.push(<span className="fa fa-star" />)
		};
		return star;
	}

	pickRating(rating) {
		let star = [];
		let i = 1;
		
		for (i; i <= rating; i++) {
			star.push(<span key={i} onClick={this.setRating.bind(this)} name={i} className="fa fa-star checked" />)
		};
		for (i; i <= 5; i++) {
			star.push(<span key={i} onClick={this.setRating.bind(this)} name={i} className="fa fa-star" />)
		};
		return star;
	}

	setRating(e) {
		e.preventDefault();
		this.setState({
			rating: e.target.getAttribute('name')
		})
	}

	submitReply() {

	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	addAnswer() {
		const { commentText, commentCode } = this.state;
		if(!commentText.trim()) {
			toastr.error('Comment must not be empty.');
			return;
		}
		this.props.addAnswer(this.props.token, this.props.question.question._id, commentText, commentCode);
		toastr.success('Add successfully');
	}

	getAnswerTime(fromTime, toTime) {
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

	render() {
		const token = this.props.token;
		const { question } = this.props.question;
		const { answer } = this.props.answer;
		console.log(answer);
		return (
			<div className="content">
				<div className="question-home">
					<div className="head">
						<h3>{question.title}</h3>
						<button className="ask-question" >
							{token ? (
								<a href="/askQuestion" >
									Ask Question
            					</a>
							) : (
									<span onClick={() => toastr.error('You must login to ask question')}>Ask Question</span>
								)}
						</button>
					</div>
					<hr />
				</div>
				<div className="detail_question">
					<p>{question.problem}</p>
					<br />
					<div>
						<pre><code className="c++">void main(){"{"}{"\n"}{"    "}int a,b;{"\n"}{"    "}char dv,chuc,tram;{"\n"}{"    "}clrscr();{"\n"}{"    "}printf("Nhap so bi nhan co 3 chu so a="); scanf("%d",&amp;a);{"\n"}{"    "}printf("Nhap so nhan co 3 chu so b="); scanf("%d",&amp;b);{"\n"}{"    "}dv=b%10;{"\n"}{"    "}chuc=b%100/10;{"\n"}{"    "}tram=b/100;{"\n"}{"    "}printf("\nMo phong phep nhan tay\n\n");{"\n"}{"    "}printf("%20d\n",a);{"\n"}{"    "}printf("%15c%5d\n",'x',b);{"\n"}{"    "}printf("%20s\n","-------");{"\n"}{"    "}printf("%20d\n",a*dv);{"\n"}{"    "}printf("%19d\n",a*chuc);{"\n"}{"    "}printf("%18d\n",a*tram);{"\n"}{"    "}printf("%20s\n","-------");{"\n"}{"    "}printf("%20ld\n",long(a)*b);{"\n"}{"    "}getch();{"\n"}{"}"}{"\n"}</code></pre>
					</div>
					<div>
						<h5>Star Rating</h5>
						{this.pickRating(this.state.rating)}
						<a href="#Nhúng link list câu hỏi" className="detail_lang">{question.category}</a>
					</div>
				</div>

				{/* comments container */}
				<div className="comment_block">

					{/* used by #{user} to create a new comment */}
					<div className="create_new_comment">
						{/* current #{user} avatar */}
						<div className="user_avatar">
							<img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg" />
						</div>
						{/* the input field */}
						<div className="input_comment">
							<input type="text" name="commentText" onChange={(e) => this.onChange(e)} placeholder="Input a comment here.." />
							&emsp;
							<input type="text" name="commentCode" onChange={(e) => this.onChange(e)} placeholder="Input some code here.." />
							<Button
								className="comment_button"
								color="primary"
								onClick={() => this.addAnswer()}
								style={{ marginBottom: "30px" }}
							>
								Post
            			</Button>
						</div>
					</div>
					{ answer.map(({answer, code, created_at, name}, index) => (
						<div className="new_comment">
						{/* build comment */}
						<ul className="user_comment">
							{/* current #{user} avatar */}
							<div className="user_avatar">
								<img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg" />
							</div>{/* the comment body */}<div className="comment_body">
								<p>{answer}</p>
								<br />
								{code ? (
									<div>
										<pre><code className={`${question.category}`}>{code}</code></pre>
									</div>
								) : null}
								
							</div>
							{/* comments toolbar */}
							<div className="comment_toolbar">
								{/* inc. date and time */}
								<div className="comment_details">
									<ul>
										<li><i className="fa fa-clock-o" />{ this.getAnswerTime(created_at, Date()) }</li>
										<li><i className="fa fa-pencil" />
											<span className="user">{name}</span></li>
									</ul>
								</div>
								{/* inc. share/reply and love */}
								<div className="comment_tools">
									<ul>
										<li><i className="fa fa-share-alt" /></li>
										<li><i className="fa fa-reply" onClick={() => this.setState({inputReply: !this.state.inputReply})}/></li>
										{/* <li><i className="fa fa-heart love" /></li> */}
									</ul>
								</div>
								<div className="rate_comment">
									{this.pickRating(this.state.rating)}
									{/* <span className="fa fa-star" id="star1" value="1" onClick={(e) => this.pickRating(e)} />
									<span className="fa fa-star" id="star2" value="2" onClick={(e) => this.pickRating(e)} />
									<span className="fa fa-star" id="star3" value="3" onClick={(e) => this.pickRating(e)} />
									<span className="fa fa-star" id="star4" value="4" onClick={(e) => this.pickRating(e)} />
									<span className="fa fa-star" id="star5" value="5" onClick={(e) => this.pickRating(e)} /> */}
								</div>
							</div>
							{ this.state.inputReply ? (
								<div className="input-reply">
									<button onClick={() => this.submitReply()}>Save</button>
									<input type="text" placeholder="Reply here.."/>	
								</div> 
							) : null }
							
							{/* start user replies */}
							<div className="reply">
							<li>
								{/* current #{user} avatar */}
								<div className="user_avatar">
									<img src="https://s3.amazonaws.com/uifaces/faces/twitter/manugamero/73.jpg" />
								</div>
								{/* the comment body */}<div className="comment_body">
									<div className="replied_to">
									Nhúng câu trả lời cho comment user 1 vào đây
									</div>
								</div>
								{/* comments toolbar */}
								<div className="comment_toolbar">
									{/* inc. date and time */}
									<div className="comment_details">
										<ul>
											<li><i className="fa fa-clock-o" /> 14:52</li>
											<li><i className="fa fa-calendar" /> 04/01/2015</li>
											<li><i className="fa fa-pencil" />
												<span className="user">Andrew Johnson</span></li>
										</ul>
									</div>
									{/* inc. share/reply and love */}
									<div className="comment_tools">
										<ul>
											<li><i className="fa fa-share-alt" /></li>
											<li><i className="fa fa-reply" /></li>
											{/* <li><i className="fa fa-heart love">
											<span className="love_amt"> 4</span></i></li> */}
										</ul>
									</div>
									<div className="rate_comment">
										{this.pickRating(this.state.rating)}
									</div>
								</div>
							</li>
							</div>
							
						</ul>
					</div>
					)) }					
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.question.error,
	token: state.account.token,
	question: state.question,
	answer: state.answer,
})

export default connect(mapStateToProps, { getQuestion, addView, addAnswer, getAnswers })(Detail);
