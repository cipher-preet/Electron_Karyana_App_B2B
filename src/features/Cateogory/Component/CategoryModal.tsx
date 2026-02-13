import React, { useState } from "react";
import { Category } from "../../../shared/types/types";
import "./CategoryModal.css";
import {
  useCreateChildCategoryMutation,
  useCreateParentCategoryMutation,
  useEditChildCategoryMutation,
  useEditParentCategoryMutation,
} from "@/redux/services/productsApi";
import ConfirmAlert from "@/assets/UI/ConfirmAlert/ConfirmAlert";

interface Props {
  category: Category | null;
  parentOptions: Category[];
  onClose: () => void;
  formName?: "parentCategory" | "childCategory";
  parentId?: string;
}

const CategoryModal: React.FC<Props> = ({
  category,
  parentOptions,
  onClose,
  formName,
  parentId,
}) => {
  const isChild = formName === "childCategory";

  const [name, setName] = useState(category?.name || "");

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    category?.images,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [createParentCategory] = useCreateParentCategoryMutation();
  const [createChildCategory] = useCreateChildCategoryMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const isEdit = Boolean(category?._id);

  const [editParentCategory] = useEditParentCategoryMutation();
  const [editChildCategory] = useEditChildCategoryMutation();

  const handleSaveClick = () => {
    setShowConfirm(true);
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleConfirmSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      if (isEdit && category?._id) {
        formData.append("id", category._id);
      }

      if (imageFile) {
        formData.append("images", imageFile);
      }

      if (isChild && !isEdit && parentId) {
        formData.append("parentcategoryId", parentId);
      }

      if (isChild) {
        if (isEdit) {
          await editChildCategory(formData).unwrap();
          console.log("Edit Child Hit");
        } else {
          await createChildCategory(formData).unwrap();
        }
      } else {
        if (isEdit) {
          await editParentCategory(formData).unwrap();
        } else {
          await createParentCategory(formData).unwrap();
        }
      }

      setShowConfirm(false);
      onClose();
    } catch (error) {
      console.error("Category save failed", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="category-modal">
        <div className="modal-header">
          <h3>
            {isEdit
              ? isChild
                ? "Edit Child Category"
                : "Edit Parent Category"
              : isChild
                ? "Add Child Category"
                : "Add Parent Category"}
          </h3>

          <button onClick={onClose}>✕</button>
        </div>

        {/* IMAGE */}
        <div className="image-upload">
          <label>
            {imagePreview ? (
              <img src={imagePreview} alt="preview" />
            ) : (
              <span>Upload Image</span>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageChange(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
          />
        </div>

        <div className="modal-actions">
          <button className="primary-btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      {showConfirm && (
        <ConfirmAlert
          title={isEdit ? "Update Category" : "Create Category"}
          message={
            isEdit
              ? isChild
                ? "Are you sure you want to update this child category?"
                : "Are you sure you want to update this parent category?"
              : isChild
                ? "Are you sure you want to create this child category?"
                : "Are you sure you want to create this parent category?"
          }
          confirmText={isEdit ? "Update" : "Create"}
          cancelText="Cancel"
          onConfirm={handleConfirmSave}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default CategoryModal;
