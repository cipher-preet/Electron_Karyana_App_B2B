import "./TagCards.css";

export interface Tag {
  _id: string;
  name: string;
  isActive: boolean;
}

interface TagsCardProps {
  tag: Tag;
  onEdit: () => void;
  onStatusToggle: () => void;
}

const Tagcard: React.FC<TagsCardProps> = ({ tag, onEdit, onStatusToggle }) => {
  return (
    <article className="tag-card">
      <div className="tag-icon" aria-hidden="true">
        #
      </div>

      <div className="tag-card-content">
        <div className="tag-card-header">
          <div>
            <h3 title={tag.name}>{tag.name}</h3>
            <p>Product discovery tag</p>
          </div>

          <span className={`tag-status ${tag.isActive ? "active" : "inactive"}`}>
            {tag.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="tag-card-footer">
          <label className="tag-switch">
            <input
              type="checkbox"
              checked={tag.isActive}
              onChange={onStatusToggle}
              aria-label={`Turn ${tag.name} ${tag.isActive ? "off" : "on"}`}
            />
            <span className="tag-switch-slider" />
            <small>{tag.isActive ? "On" : "Off"}</small>
          </label>

          <button className="tag-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </article>
  );
};

export default Tagcard;
