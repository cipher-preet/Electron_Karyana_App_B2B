import "./ProductCard.css";

const ProductCard = ({ name, price }) => {
  return (
    <div className="product-card">
      <div className="img" />
      <strong className="product-name">{name}</strong>
      <small className="product-price">₹{price}</small>
      <button className="add-btn">Add</button>
    </div>
  );
};

export default ProductCard;
