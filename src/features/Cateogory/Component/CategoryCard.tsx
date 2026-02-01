import { Category } from "../../../shared/types/types";
import "./CategoryCard.css";

interface Props {
  category: Category;
  onEdit: () => void;
  onOpen?: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, onEdit, onOpen }) => {
  return (
    <div
      className="category-card-pro"
      onClick={() => onOpen && onOpen()}
    >
      <div className="category-image">
        {category.images ? (
          <img src={category.images} alt={category.name} />
        ) : (
          <div className="image-placeholder">
            {category.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="category-info">
        <div className="title-row">
          <h4>{category.name}</h4>
          <span className={`${category.isActive ? "green" : "red"}`}>
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="sub-text">Sub Category</p>
      </div>

      <button
        className="edit-btn-pro"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default CategoryCard;
