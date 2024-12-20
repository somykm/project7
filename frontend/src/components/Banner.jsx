import icon from "../assets/images/icon-left-font-monochrome-black.png";
import "../styles/banner.css";

function Banner() {
  return (
      <div className="banner">
        <img src={icon} alt="Groupomania" className="b-icon" />
        <h1 className="banner-text">An App to Interect with Our Colleagues</h1>
      </div>
  );
}

export default Banner;
