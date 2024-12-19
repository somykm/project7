import icon from "../assets/images/icon-left-font-monochrome-black.png";
import "../styles/banner.css";

function Banner() {
  return (
      <div className="site_name">
        <img src={icon} alt="Groupomania" className="g-icon" />
        <h1 className="bnr-title">An App to Interect with Our Colleagues</h1>
      </div>
  );
}

export default Banner;
