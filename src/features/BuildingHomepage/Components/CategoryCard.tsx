import "./CategoryCard.css";

const CategoryCard = ({ name }) => {
  return (
    <div className="category-card">
      <span>{name}</span>
      <button>Add</button>
    </div>
  );
};

export default CategoryCard;
