import './FooterPart.scss';
import FBlogo from '../../assets/images/facebook-logo.png';
import footer from '../../assets/images/logo.png';
import instagramLogo from '../../assets/images/Instagram-logo.jpg';
import twitterLogo from '../../assets/images/twitter-logo.png';

const FooterPart: React.FC = () => {
  // Your FooterPart component code
  return (
    <div className="footer-part">
      <div className="left-part">
        <img className="footer-logo" src={footer} alt="Cinema Evolution" />
        <p className="footer-text">
          MovieLand is top of free streaming website,where to watch movies online free.
          <br /> With a big database and great features, we're confident Movies Land is the best free
          <br />
          movies online website in the space that you can't simply miss.
        </p>
      </div>
      <div className="logo-medias">
        <p>Connect us via these social medias</p>
        <div className="logo-medias-flex">
          <a href="https://www.instagram.com/your_username/" target="_blank" rel="noopener noreferrer">
            <img className="all-logos" src={instagramLogo} alt="Instagram Logo" width="50" height="50" />
          </a>
          <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
            <img className="all-logos" src={twitterLogo} alt="Twitter Logo" />
          </a>
          <a
            href="https://www.facebook.com/" // Replace with the actual Facebook page URL
            target="_blank" // Open link in a new tab/window
            rel="noopener noreferrer"
          >
            <img className="all-logos" src={FBlogo} alt="Facebook Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          </a>
        </div>
      </div>
    </div>
  );
};
export default FooterPart;
