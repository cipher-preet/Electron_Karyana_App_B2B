import "./UnitCard.css";

export interface Unit {
  _id: string;
  name: string;
  shortName: string;
  baseUnit: string;
  multiplier: number;
  isActive: boolean;
}

interface UnitCardProps {
  unit: Unit;
  onEdit: () => void;
  onStatusToggle: () => void;
}

const UnitCard: React.FC<UnitCardProps> = ({
  unit,
  onEdit,
  onStatusToggle,
}) => {
  return (
    <article className="unit-card">
      <div className="unit-icon" aria-hidden="true">
        {unit.shortName?.charAt(0)?.toUpperCase() || "U"}
      </div>

      <div className="unit-card-content">
        <div className="unit-card-header">
          <div>
            <h3 title={unit.name}>{unit.name}</h3>
            <p title={unit.shortName}>Short name: {unit.shortName || "-"}</p>
          </div>

          <span className={`unit-status ${unit.isActive ? "active" : "inactive"}`}>
            {unit.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="unit-meta-grid">
          <div>
            <span>Base Unit</span>
            <strong>{unit.baseUnit || "-"}</strong>
          </div>
          <div>
            <span>Multiplier</span>
            <strong>{unit.multiplier ?? "-"}</strong>
          </div>
        </div>

        <div className="unit-card-footer">
          <label className="unit-switch">
            <input
              type="checkbox"
              checked={unit.isActive}
              onChange={onStatusToggle}
              aria-label={`Turn ${unit.name} ${unit.isActive ? "off" : "on"}`}
            />
            <span className="unit-switch-slider" />
            <small>{unit.isActive ? "On" : "Off"}</small>
          </label>

          <button className="unit-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    </article>
  );
};

export default UnitCard;
