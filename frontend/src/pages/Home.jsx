import Banner from "../components/Banner";
import styled from 'styled-components';
import colors from '../styles/colors'
const StyledLink =styled.div`
padding:2px;
color:${colors.pimary};
font-size:14px;
background-color:${colors.secondary};
`

function Home() {
  return (
    <StyledLink>
      <Banner />
    </StyledLink> 
  );
}

export default Home;