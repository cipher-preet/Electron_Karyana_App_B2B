import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import "./CategoryModal.css";

interface Props {
  category: Category | null;
  parentOptions: Category[];
  onClose: () => void;
}

const CategoryModal: React.FC<Props> = ({
  category,
  parentOptions,
  onClose,
}) => {
  const [name, setName] = useState(category?.name || "");
  const [parent, setParent] = useState(category?.parentCategory || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    category?.status || "Active"
  );
  const [image, setImage] = useState<string | undefined>(category?.image);

  const handleImageChange = (file: File) => {
    const preview = URL.createObjectURL(file);
    setImage(preview);
  };

  return (
    <div className="modal-overlay">
      <div className="category-modal">
        {/* HEADER */}
        <div className="modal-header">
          <h3>{category?.id ? "Edit Category" : "Add Category"}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="image-upload">
          <label>
            {image ? (
              <img src={image} alt="Category" />
            ) : (
              <span>Upload Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && handleImageChange(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* FORM */}
        <div className="form-group">
          <label>Category Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>

        {parentOptions.length > 0 && (
          <div className="form-group">
            <label>Parent Category</label>
            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">Select parent</option>
              {parentOptions.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="primary-btn">Save Category</button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
