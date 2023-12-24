/* eslint-disable jsx-a11y/anchor-is-valid */
import './Subscription.scss';
import React, { useState } from 'react';

const Subscription = () => {
  const [card1Blured, setCard1Blured] = useState(false);
  const [card2Blured, setCard2Blured] = useState(false);
  const [card3Blured, setCard3Blured] = useState(false);

  const handleOnMouseEnter = (index: number) => {
    switch (index) {
      case 1:
        setCard1Blured(false);
        setCard2Blured(true);
        setCard3Blured(true);
        break;
      case 2:
        setCard1Blured(true);
        setCard2Blured(false);
        setCard3Blured(true);
        break;
      case 3:
        setCard1Blured(true);
        setCard2Blured(true);
        setCard3Blured(false);
        break;
    }
  };

  const handleMouseOut = () => {
    setCard1Blured(false);
    setCard2Blured(false);
    setCard3Blured(false);
  };

  return (
    <>
      <div className="container">
        <div className={`card ${card1Blured ? 'blured' : ''}`} onMouseEnter={() => handleOnMouseEnter(1)} onMouseLeave={handleMouseOut}>
          <div className="circle">
            <h2>Weekly</h2>
          </div>
          <div className="content">
            <h2>2$</h2>
            <p className="subp">
              <p>Basic plan:</p> *Unlimited streaming <br />
              *Download your favorite movies <br />
              *Stream in high definition
            </p>
            <div className="subscribe-btn">
              <a href="#">Subscribe</a>
            </div>
          </div>
        </div>
        <div className={`card ${card2Blured ? 'blured' : ''}`} onMouseEnter={() => handleOnMouseEnter(2)} onMouseLeave={handleMouseOut}>
          <div className="circle">
            <h2>Monthly</h2>
          </div>
          <div className="content">
            <h2>8$</h2>
            <p className="subp">
              <p>Premium Plan:</p> *You can watch it device <br />
              *Highest audio and video quality <br />
              *Ad free experience
            </p>
            <a href="#">Subscribe</a>
          </div>
        </div>
        <div className={`card ${card3Blured ? 'blured' : ''}`} onMouseEnter={() => handleOnMouseEnter(3)} onMouseLeave={handleMouseOut}>
          <div className="circle">
            <h2>Yearly</h2>
          </div>
          <div className="content">
            <h2>40$</h2>
            <p className="subp">
              <p>Platinum plan:</p> *12 months validity <br />
              *Availability of HBO exclusive content <br />
              *Free TATA IPL live streaming
            </p>
            <a href="#">Subscribe</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subscription;
