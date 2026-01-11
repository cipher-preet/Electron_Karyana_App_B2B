import React, { useState } from "react";
import "./UnitModal.css";
import { useCreateUnitMutation } from "@/redux/services/UnitBrandApi";

export interface unitData {
  _id: string;
  name: string;
  shortName: string;
  baseUnit: string;
  multiplier: number;
  isActive: boolean;
}

export interface UnitSavePayload {
  _id?: string;
  name: string;
  shortName: string;
  baseUnit: string;
  multiplier: number | null;
  isActive: boolean;
}

interface UnitCardProps {
  initialData: unitData | null;
  onClose: () => void;
  onSave: (payload: UnitSavePayload) => void;
}

const UnitModal: React.FC<UnitCardProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [createUnit, { isLoading, error }] = useCreateUnitMutation();

  const [name, setName] = useState(initialData?.name || "");
  const [shortName, setShortName] = useState(initialData?.shortName || "");
  const [baseUnit, setBaseUnit] = useState(initialData?.baseUnit || "");
  const [multiplier, setMultiplier] = useState<number | null>(
    initialData?.multiplier ?? null
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive ?? true
  );

  const handleSubmit = async () => {
    if (!name || !shortName) return;
    const payload: UnitSavePayload = {
      _id: initialData?._id,
      name,
      shortName,
      baseUnit,
      multiplier,
      isActive,
    };

    try {
      await createUnit(payload).unwrap();
      onSave?.(payload);
      onClose();
    } catch (err) {
      console.error("Failed to save unit:", err);
    }
  };

  return (
    <div className="unit-modal-backdrop">
      <div className="unit-modal">
        <h3>{initialData ? "Edit Unit" : "Add Unit"}</h3>

        <input
          placeholder="Unit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Short Name (kg, pcs)"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <input
          placeholder="Base unit"
          value={baseUnit}
          onChange={(e) => setBaseUnit(e.target.value)}
        />
        <input
          placeholder="multiplier"
          value={multiplier ?? ""}
          onChange={(e) =>
            setMultiplier(e.target.value === "" ? null : Number(e.target.value))
          }
        />

        <div className="unit-modal-actions">
          <button className="unit-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="unit-save-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitModal;
