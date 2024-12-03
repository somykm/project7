function Cart({ caption, image, date }) {
  <div style={{ display: "flex", flexDirection: "-moz-initial", padding: 15 }}>
    <textarea>{caption}</textarea>
    <img src={image} alt="" height={100} width={100} />
    <span>{date}</span>
  </div>;
}

export default Cart;
