
import icon from '../assets/images/icon-left-font.png';
import '../styles/Banner.css';

function Banner() {
  const title = "An App to Interect with Our Colleagues";
  return (
    <div className='site_name'>
      <img src={icon} alt='Groupomania' className='g-icon' />
      <h1 className='bnr-title'>{title}</h1>
    </div>)
}

export default Banner