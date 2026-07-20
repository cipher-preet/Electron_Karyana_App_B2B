import "./BrandModal.css";
import {
  useCreateBrandMutation,
  useEditBrandMutation,
} from "@/redux/services/UnitBrandApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";
import React, { useState } from "react";

interface Brand {
  _id?: string;
  name: string;
  description: string;
  isActive?: boolean;
}

interface BrandModalProps {
  initialData: Brand | null;
  onClose: () => void;
  onSave: (payload: Brand) => void;
}

const BrandModal: React.FC<BrandModalProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [createBrand, { isLoading: creating }] = useCreateBrandMutation();
  const [editBrand, { isLoading: updating }] = useEditBrandMutation();

  const isEditMode = Boolean(initialData?._id);

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const saving = creating || updating;

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setAlertInfo({
        title: "Required Fields Missing",
        message: "Please enter brand name and description before saving.",
        variant: "warning",
      });
      return;
    }

    const payload = {
      ...(isEditMode && initialData?._id ? { _id: initialData._id } : {}),
      name: name.trim(),
      description: description.trim(),
      isActive,
    };

    try {
      const response = isEditMode
        ? await editBrand(payload).unwrap()
        : await createBrand(payload).unwrap();

      onSave(response);
      onClose();
    } catch (err) {
      console.error("Failed to save brand:", err);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while saving the brand.",
        variant: "error",
      });
    }
  };

  return (
    <div className="brand-modal-backdrop">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="brand-modal">
        <div className="brand-modal-header">
          <div>
            <span>Brand Setup</span>
            <h3>{isEditMode ? "Edit Brand" : "Add Brand"}</h3>
          </div>
          <button onClick={onClose} aria-label="Close brand modal">
            X
          </button>
        </div>

        <div className="brand-modal-body">
          <label className="brand-modal-field">
            <span>Brand Name</span>
            <input
              placeholder="Ambe Mart"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="brand-modal-field">
            <span>Description</span>
            <textarea
              placeholder="Short brand description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="brand-modal-status">
            <div>
              <strong>Brand Status</strong>
              <p>Turn this brand on or off for product forms.</p>
            </div>

            <label className="brand-modal-switch">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
              />
              <span className="brand-modal-switch-slider" />
              <small>{isActive ? "On" : "Off"}</small>
            </label>
          </div>
        </div>

        <div className="brand-modal-actions">
          <button className="brand-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="brand-save-btn"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Brand"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
