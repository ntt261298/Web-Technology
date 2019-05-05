import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {Button} from "reactstrap";

class Detail extends React.Component {

	render() {
		return (
			<div className="content">
				<div className="question-home">
					<div className="head">
						<h3>Nhúng title vào đây</h3>
						<button className="ask-question" >
							<a href="/askQuestion" >
								Ask Question
            </a>
						</button>
					</div>
					<hr />
				</div>
				<div className="detail_question">
					<p>Nhúng text ở phần 'Summarize the problem' khi ask question</p>
					<br />
					<div>
						<pre><code className="c++">void main(){"{"}{"\n"}{"    "}int a,b;{"\n"}{"    "}char dv,chuc,tram;{"\n"}{"    "}clrscr();{"\n"}{"    "}printf("Nhap so bi nhan co 3 chu so a="); scanf("%d",&amp;a);{"\n"}{"    "}printf("Nhap so nhan co 3 chu so b="); scanf("%d",&amp;b);{"\n"}{"    "}dv=b%10;{"\n"}{"    "}chuc=b%100/10;{"\n"}{"    "}tram=b/100;{"\n"}{"    "}printf("\nMo phong phep nhan tay\n\n");{"\n"}{"    "}printf("%20d\n",a);{"\n"}{"    "}printf("%15c%5d\n",'x',b);{"\n"}{"    "}printf("%20s\n","-------");{"\n"}{"    "}printf("%20d\n",a*dv);{"\n"}{"    "}printf("%19d\n",a*chuc);{"\n"}{"    "}printf("%18d\n",a*tram);{"\n"}{"    "}printf("%20s\n","-------");{"\n"}{"    "}printf("%20ld\n",long(a)*b);{"\n"}{"    "}getch();{"\n"}{"}"}{"\n"}</code></pre>
					</div>
					<div>
						<h5>Star Rating</h5>
						<span className="fa fa-star" id="star1" onClick="add(this,1)" />
						<span className="fa fa-star" id="star2" onClick="add(this,2)" />
						<span className="fa fa-star" id="star3" onClick="add(this,3)" />
						<span className="fa fa-star" id="star4" onClick="add(this,4)" />
						<span className="fa fa-star" id="star5" onClick="add(this,5)" />
						<a href="#Nhúng link list câu hỏi" className="detail_lang">(Nhúng ngôn ngữ vào đây)</a>
						<a href="#Nhúng link list câu hỏi" className="detail_lang">C++</a>

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
							<input type="text" placeholder="Input a comment here.." />
							&emsp;
							<input type="text" placeholder="Input some code here.." />
							<Button 
							className="comment_button"
							color="primary"
							onClick={this.toggle}
							style={{ marginBottom: "30px" }}
						>
							Post
            			</Button>
						</div>
					</div>
					{/* new comment */}
					<div className="new_comment">
						{/* build comment */}
						<ul className="user_comment">
							{/* current #{user} avatar */}
							<div className="user_avatar">
								<img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg" />
							</div>{/* the comment body */}<div className="comment_body">
								<p>Nhúng comment user 1 vào đây</p>
							</div>
							{/* comments toolbar */}
							<div className="comment_toolbar">
								{/* inc. date and time */}
								<div className="comment_details">
									<ul>
										<li><i className="fa fa-clock-o" /> 13:94</li>
										<li><i className="fa fa-calendar" /> 04/01/2015</li>
										<li><i className="fa fa-pencil" />
											<span className="user">John Smith</span></li>
									</ul>
								</div>
								{/* inc. share/reply and love */}
								<div className="comment_tools">
									<ul>
										<li><i className="fa fa-share-alt" /></li>
										<li><i className="fa fa-reply" /></li>
										{/* <li><i className="fa fa-heart love" /></li> */}
									</ul>
								</div>
								<div className="rate_comment">
									<span className="fa fa-star" id="star1" onClick="add(this,1)" />
									<span className="fa fa-star" id="star2" onClick="add(this,2)" />
									<span className="fa fa-star" id="star3" onClick="add(this,3)" />
									<span className="fa fa-star" id="star4" onClick="add(this,4)" />
									<span className="fa fa-star" id="star5" onClick="add(this,5)" />
								</div>
							</div>
							{/* start user replies */}
							<li>
								{/* current #{user} avatar */}
								<div className="user_avatar">
									<img src="https://s3.amazonaws.com/uifaces/faces/twitter/manugamero/73.jpg" />
								</div>{/* the comment body */}<div className="comment_body">
									<p /><div className="replied_to"><p><span className="user">John Smith:</span>Nhúng comment user 1 vào đây</p>
									</div>Nhúng câu trả lời cho comment user 1 vào đây<p />
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
										<span className="fa fa-star" id="star1" onClick="add(this,1)" />
										<span className="fa fa-star" id="star2" onClick="add(this,2)" />
										<span className="fa fa-star" id="star3" onClick="add(this,3)" />
										<span className="fa fa-star" id="star4" onClick="add(this,4)" />
										<span className="fa fa-star" id="star5" onClick="add(this,5)" />
									</div>
								</div>
							</li>
						</ul>
					</div>
					{/* new comment */}
					<div className="new_comment">
						{/* build comment */}
						<ul className="user_comment">
							{/* current #{user} avatar */}
							<div className="user_avatar">
								<img src="https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/73.jpg" />
							</div>{/* the comment body */}<div className="comment_body">
								<p>Nhúng comment user 2 vào đây</p>
							</div>
							{/* comments toolbar */}
							<div className="comment_toolbar">
								{/* inc. date and time */}
								<div className="comment_details">
									<ul>
										<li><i className="fa fa-clock-o" /> 13:94</li>
										<li><i className="fa fa-calendar" /> 04/01/2015</li>
										<li><i className="fa fa-pencil" />
											<span className="user">Sarah Walkman</span></li>
									</ul>
								</div>
								{/* inc. share/reply and love */}
								<div className="comment_tools">
									<ul>
										<li><i className="fa fa-share-alt" /></li>
										<li><i className="fa fa-reply" /></li>
										{/* <li><i className="fa fa-heart love" /></li> */}
									</ul>
								</div>
								<div className="rate_comment">
									<span className="fa fa-star" id="star1" onClick="add(this,1)" />
									<span className="fa fa-star" id="star2" onClick="add(this,2)" />
									<span className="fa fa-star" id="star3" onClick="add(this,3)" />
									<span className="fa fa-star" id="star4" onClick="add(this,4)" />
									<span className="fa fa-star" id="star5" onClick="add(this,5)" />
								</div>
							</div>
						</ul>
					</div>
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.question.error,
	token: state.account.token
})

export default connect(mapStateToProps, null)(Detail);
