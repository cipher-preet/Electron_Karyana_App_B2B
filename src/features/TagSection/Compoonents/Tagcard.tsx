import "../../Units/Components/unitcard.css";

interface Tags {
  _id: string;
  name: string;
  isActive: boolean;
}

interface TagsCardProps {
  Tag: Tags;
  onEdit: () => void;
  onStatusToggle: () => void;
}

const Tagcard: React.FC<TagsCardProps> = ({ Tag, onEdit, onStatusToggle }) => {
  return (
    <div className="unit-card">
      <div className="unit-card-header">
        <h3>{Tag.name}</h3>
        <button className="unit-edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className="unit-status-row">
        <span className={`status-text ${Tag.isActive ? "active" : "inactive"}`}>
          {Tag.isActive ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          className={`switch-btn ${Tag.isActive ? "on" : "off"}`}
          onClick={onStatusToggle}
          aria-pressed={Tag.isActive}
          aria-label="Toggle unit status"
        >
          <span className="switch-thumb" />
        </button>
      </div>
    </div>
  );
};

export default Tagcard;
