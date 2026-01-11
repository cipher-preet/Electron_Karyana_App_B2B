import { useCreateBrandMutation } from "@/redux/services/UnitBrandApi";
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
  const [createBrand, { isLoading, error }] = useCreateBrandMutation();

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = async () => {
    if (!name || !description) return;
    const payload: Brand = {
      _id: initialData?._id,
      name,
      description,
    };
    try {
      await createBrand(payload).unwrap();
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
          placeholder="Brand Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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

export default BrandModal;
