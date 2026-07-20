import { Category } from "../../../shared/types/types";
import "./CategoryCard.css";

interface Props {
  category: Category;
  mode?: "parent" | "child";
  onEdit: () => void;
  onToggle?: () => void;
  onOpen?: () => void;
}

const CategoryCard: React.FC<Props> = ({
  category,
  mode = "parent",
  onEdit,
  onToggle,
  onOpen,
}) => {
  const isActive = Boolean(category.isActive);

  return (
    <article className="category-card-pro" onClick={() => onOpen?.()}>
      <div className="category-image">
        {category.images ? (
          <img src={category.images} alt={category.name} />
        ) : (
          <div className="category-image-placeholder">
            {category.name?.charAt(0) || "C"}
          </div>
        )}
      </div>

      <div className="category-info">
        <div className="category-title-row">
          <div>
            <h4 title={category.name}>{category.name}</h4>
            <p>{mode === "parent" ? "Parent category" : "Child category"}</p>
          </div>

          <span
            className={`category-status ${isActive ? "active" : "inactive"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="category-card-footer">
          <label
            className="category-switch"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => onToggle?.()}
              aria-label={`Turn ${category.name} ${isActive ? "off" : "on"}`}
            />
            <span className="category-switch-slider" />
            <small>{isActive ? "On" : "Off"}</small>
          </label>

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
      </div>
    </article>
  );
};

export default CategoryCard;
