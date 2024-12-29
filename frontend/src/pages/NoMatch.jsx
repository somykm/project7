import FourAndFour from "../assets/images/fourAndFour.png";
function NoMatch() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <img src={FourAndFour} alt="Page cannot be found!"></img>
      <h2>404: Page Not Found</h2>
      <p>This page cannot be found.</p>
    </div>
  );
}

export default NoMatch;
