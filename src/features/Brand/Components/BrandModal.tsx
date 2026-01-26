import { useCreateBrandMutation, useEditBrandMutation } from "@/redux/services/UnitBrandApi";
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
  const [createBrand, { isLoading: creating }] =
    useCreateBrandMutation();

  const [EditBrand, { isLoading: updating }] =
    useEditBrandMutation();

  const isEditMode = Boolean(initialData?._id);

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

 const handleSubmit = async () => {
    if (!name || !description) return;

    try {
      let response: Brand;

      if (isEditMode && initialData?._id) {
        response = await EditBrand({
            _id:initialData._id,
            name,
            description,
            isActive: true,
        }).unwrap();
      } else {
        response = await createBrand({
          name,
          description,
          isActive: true,
        }).unwrap();
      }

      onSave(response);
      onClose();
    } catch (err) {
      console.error("Failed to save brand:", err);
    }
  };
  return (
    <div className="unit-modal-backdrop">
      <div className="unit-modal">
        <h3>{isEditMode ? "Edit Brand" : "Add Brand"}</h3>

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
            disabled={creating || updating}
          >
             {creating || updating ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
