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
    <div className="unit-card">
      <div className="unit-card-header">
        <h3>{unit.name}</h3>
        <button className="unit-edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className="unit-status-row">
        <span
          className={`status-text ${unit.isActive ? "active" : "inactive"}`}
        >
          {unit.isActive ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          className={`switch-btn ${unit.isActive ? "on" : "off"}`}
          onClick={onStatusToggle}
          aria-pressed={unit.isActive}
          aria-label="Toggle unit status"
        >
          <span className="switch-thumb" />
        </button>
      </div>
      <p className="unit-short">Short Name: {unit.shortName}</p>
      <p className="unit-short">baseUnit: {unit.baseUnit}</p>
      <p className="unit-short">multiplier: {unit.multiplier}</p>
    </div>
  );
};

export default UnitCard;
