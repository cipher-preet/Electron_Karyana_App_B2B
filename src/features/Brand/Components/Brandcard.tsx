import "../../Units/Components/unitcard.css";

interface Brand {
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
    <div className="unit-card">
      <div className="unit-card-header">
        <h3>{brand.name}</h3>
        <button className="unit-edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className="unit-status-row">
        <span
          className={`status-text ${brand.isActive ? "active" : "inactive"}`}
        >
          {brand.isActive ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          className={`switch-btn ${brand.isActive ? "on" : "off"}`}
          onClick={onStatusToggle}
          aria-pressed={brand.isActive}
          aria-label="Toggle unit status"
        >
          <span className="switch-thumb" />
        </button>
      </div>
      <p className="unit-short">Short Name: {brand.description}</p>
    </div>
  );
};

export default Brandcard;
