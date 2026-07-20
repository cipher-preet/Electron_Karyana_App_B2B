import "./Brandcard.css";

export interface Brand {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

interface BrandCardProps {
  brand: Brand;
  onEdit: () => void;
  onStatusToggle: () => void;
}

const Brandcard: React.FC<BrandCardProps> = ({
  brand,
  onEdit,
  onStatusToggle,
}) => {
  return (
    <article className="brand-card">
      <div className="brand-icon" aria-hidden="true">
        {brand.name?.charAt(0)?.toUpperCase() || "B"}
      </div>

      <div className="brand-card-content">
        <div className="brand-card-header">
          <div>
            <h3 title={brand.name}>{brand.name}</h3>
            <p title={brand.description}>{brand.description || "No description"}</p>
          </div>

          <span className={`brand-status ${brand.isActive ? "active" : "inactive"}`}>
            {brand.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="brand-card-footer">
          <label className="brand-switch">
            <input
              type="checkbox"
              checked={brand.isActive}
              onChange={onStatusToggle}
              aria-label={`Turn ${brand.name} ${brand.isActive ? "off" : "on"}`}
            />
            <span className="brand-switch-slider" />
            <small>{brand.isActive ? "On" : "Off"}</small>
          </label>

          <button className="brand-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </article>
  );
};

export default Brandcard;
