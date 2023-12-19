/* eslint-disable jsx-a11y/anchor-is-valid */
import './Subscription.scss';
import React from 'react';

const Subscription = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="circle">
            <h2>Weekly</h2>
          </div>
          <div className="content">
            <h1>3$</h1>
            <p>
              <span>Weekly Movie Digest:</span> A curated list of upcoming movie releases, trending films.
              <br />
              <span>Personalized Recommendations:</span> Customized movie suggestions based on the user's viewing history or
              preferences.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="card">
          <div className="circle">
            <h2>Monthly</h2>
          </div>
          <div className="content">
            <h1>8$</h1>
            <p>
              User Community Access: Entry to a subscriber-only forum or discussion board for movie enthusiasts. <br /> Monthly Movie Challenges:
              activities like movie-watching challenges.{' '}
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="card">
          <div className="circle">
            <h2>Yearly</h2>
          </div>
          <div className="content">
            <h1>20$</h1>
            <p></p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Subscription;
