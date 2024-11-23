import icon from '../assets/images/icon-left-font.png';
import '../styles/Banner.css';

function Banner() {
  const title = "";
  return (
    <div className='site_name'>
      
      <h1>{title}</h1>
      <img src={icon} alt='Groupomania' className='g-icon' />
    </div>)
}

export default Banner