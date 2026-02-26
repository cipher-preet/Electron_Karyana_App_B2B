import {
  useCreateTagMutation,
  useEditTagsMutation,
} from "@/redux/services/UnitBrandApi";
import React, { useState } from "react";

interface Tags {
  _id: string;
  name: string;
  isActive: boolean;
}

interface TagsCardProps {
  initialData: Tags | null;
  onClose: () => void;
  onSave: (payload: Tags) => void;
}

const TagModal: React.FC<TagsCardProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [createBrand, { isLoading: creating }] = useCreateTagMutation();

  const [EditBrand, { isLoading: updating }] = useEditTagsMutation();

  const isEditMode = Boolean(initialData?._id);

  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = async () => {
    if (!name) return;

    try {
      let response: Tags;

      if (isEditMode && initialData?._id) {
        response = await EditBrand({
          _id: initialData._id,
          name,
          isActive: true,
        }).unwrap();
      } else {
        response = await createBrand({
          name,
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

export default TagModal;
