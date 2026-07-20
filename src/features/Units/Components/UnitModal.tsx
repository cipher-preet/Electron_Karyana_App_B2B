import React, { useState } from "react";
import "./UnitModal.css";
import {
  useCreateUnitMutation,
  useEditUnitMutation,
} from "@/redux/services/UnitBrandApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

export interface unitData {
  _id?: string;
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
  const isEditMode = Boolean(initialData?._id);

  const [createUnit, { isLoading: creating }] = useCreateUnitMutation();
  const [editUnit, { isLoading: updating }] = useEditUnitMutation();

  const [name, setName] = useState(initialData?.name || "");
  const [shortName, setShortName] = useState(initialData?.shortName || "");
  const [baseUnit, setBaseUnit] = useState(initialData?.baseUnit || "");
  const [multiplier, setMultiplier] = useState<number | null>(
    initialData?.multiplier ?? null,
  );
  const [isActive, setIsActive] = useState<boolean>(
    initialData?.isActive ?? true,
  );
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const saving = creating || updating;

  const handleSubmit = async () => {
    if (!name.trim() || !shortName.trim()) {
      setAlertInfo({
        title: "Required Fields Missing",
        message: "Please enter unit name and short name before saving.",
        variant: "warning",
      });
      return;
    }

    const payload = {
      ...(isEditMode && initialData?._id ? { _id: initialData._id } : {}),
      name: name.trim(),
      shortName: shortName.trim(),
      baseUnit: baseUnit.trim(),
      multiplier,
      isActive,
    };

    try {
      const response = isEditMode
        ? await editUnit(payload).unwrap()
        : await createUnit(payload).unwrap();

      onSave(response);
      onClose();
    } catch (err) {
      console.error("Failed to save unit:", err);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while saving the unit.",
        variant: "error",
      });
    }
  };

  return (
    <div className="unit-modal-backdrop">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="unit-modal">
        <div className="unit-modal-header">
          <div>
            <span>Measurement Unit</span>
            <h3>{isEditMode ? "Edit Unit" : "Add Unit"}</h3>
          </div>
          <button onClick={onClose} aria-label="Close unit modal">
            X
          </button>
        </div>

        <div className="unit-modal-body">
          <div className="unit-modal-grid">
            <label className="unit-modal-field">
              <span>Unit Name</span>
              <input
                placeholder="Kilogram"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="unit-modal-field">
              <span>Short Name</span>
              <input
                placeholder="kg"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
              />
            </label>

            <label className="unit-modal-field">
              <span>Base Unit</span>
              <input
                placeholder="gram"
                value={baseUnit}
                onChange={(e) => setBaseUnit(e.target.value)}
              />
            </label>

            <label className="unit-modal-field">
              <span>Multiplier</span>
              <input
                type="number"
                placeholder="1000"
                value={multiplier ?? ""}
                onChange={(e) =>
                  setMultiplier(
                    e.target.value === "" ? null : Number(e.target.value),
                  )
                }
              />
            </label>
          </div>

          <div className="unit-modal-status">
            <div>
              <strong>Unit Status</strong>
              <p>Turn this unit on or off for product forms.</p>
            </div>

            <label className="unit-modal-switch">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
              />
              <span className="unit-modal-switch-slider" />
              <small>{isActive ? "On" : "Off"}</small>
            </label>
          </div>
        </div>

        <div className="unit-modal-actions">
          <button className="unit-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="unit-save-btn"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Unit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitModal;
