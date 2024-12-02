import Banner from "../components/Banner";
import YourPost from "./YourPost";

function Home() {
  return (
    <div>
      <Banner />
      <cart>
        <YourPost />
      </cart>
    </div> 
  );
}

export default Home;