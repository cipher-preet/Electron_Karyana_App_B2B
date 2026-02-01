import "./CategoryCard.css";

type CategoryCardProps = {
  id: string;
  name: string;
  onAdd: (id: string, name: string) => void;
};

const CategoryCard = ({ id, name, onAdd }: CategoryCardProps) => {
  return (
    <div className="category-card">
      <span>{name}</span>
      <button onClick={() => onAdd(id, name)}>Add</button>
    </div>
  );
};

export default CategoryCard;
