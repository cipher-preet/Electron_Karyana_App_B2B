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
      {/* IMAGE */}
      <div className="category-image">
        {category.image ? (
          <img src={category.image} alt={category.name} />
        ) : (
          <div className="image-placeholder">
            {category.name.charAt(0)}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="category-info">
        <div className="title-row">
          <h4>{category.name}</h4>
          <span className={`status ${category.status.toLowerCase()}`}>
            {category.status}
          </span>
        </div>

        <p className="sub-text">Sub Category</p>
      </div>

      {/* ACTION */}
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
