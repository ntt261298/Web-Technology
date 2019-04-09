import React from 'react';
import '../../style/footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="main-footer">
        <div className="team">
          <h3>Design By Group 22</h3>
          <p>Nguyễn Tiến Trường</p>
          <p>Phạm Quang Trung</p>
          <p>Phạm Hiếu Trung</p>
        </div>
      <div className="open-time">
        <h3>Open</h3>
        <p>Every day from 08:00 - 18:00</p>
      </div>
      <div className="payment">
        <h3>Payment</h3>
        <img src="https://intense-temple-58166.herokuapp.com/image/icon visa.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/credit-card.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/bitcoin.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/cast-multiple.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/internet banking account.svg" alt=""/>
      </div>
      <div className="socials">
        <h3>Socials</h3>
        <img src="https://intense-temple-58166.herokuapp.com/image/facebook.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/instagram.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/youtube.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/twitter.svg" alt=""/>
        <img src="https://intense-temple-58166.herokuapp.com/image/pinterest.svg" alt=""/>
      </div>
      <div className="download">
        <h3>Download App</h3>
        <img src="https://intense-temple-58166.herokuapp.com/image/play-store.svg" alt=""/>
          <img src="https://intense-temple-58166.herokuapp.com/image/apple.svg" alt=""/>
          <img src="https://intense-temple-58166.herokuapp.com/image/windows.svg" alt=""/>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <div>
            <img src="https://intense-temple-58166.herokuapp.com/image/gmail.svg" alt=""/><span>/Group 22</span>
          </div>
          <div>
            <img src="https://intense-temple-58166.herokuapp.com/image/phone.svg" alt=""/><span>0999.999.999</span>
          </div>
          <div>
            <img src="https://intense-temple-58166.herokuapp.com/image/baseline-place-24px.svg" alt=""/><span>69 Giải Phóng, Hà Nội</span>
          </div>
        </div>
        <div className="feedback">
          <h3>Feedback</h3>
          <textarea name="name"></textarea>
          <input type="submit" value="send"/>
        </div>
      </div>
    );
  }
}
