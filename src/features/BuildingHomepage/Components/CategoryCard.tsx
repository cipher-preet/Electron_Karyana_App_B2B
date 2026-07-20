import "./CategoryCard.css";

type CategoryCardProps = {
  id: string;
  name: string;
  isActive?: boolean;
  onAdd: (id: string, name: string) => void;
};

const CategoryCard = ({ id, name, isActive, onAdd }: CategoryCardProps) => {
  return (
    <button
      className={`build-home-category-card ${isActive ? "active" : ""}`}
      onClick={() => onAdd(id, name)}
    >
      <span className="build-home-category-icon">{name.charAt(0)}</span>
      <span className="build-home-category-name" title={name}>
        {name}
      </span>
      <small>{isActive ? "Selected" : "Select"}</small>
    </button>
  );
};

export default CategoryCard;
