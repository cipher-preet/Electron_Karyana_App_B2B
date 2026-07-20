import {
  useCreateTagMutation,
  useEditTagsMutation,
} from "@/redux/services/UnitBrandApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";
import React, { useState } from "react";
import "./TagModal.css";

interface Tag {
  _id: string;
  name: string;
  isActive: boolean;
}

interface TagsCardProps {
  initialData: Tag | null;
  onClose: () => void;
  onSave: (payload: Tag) => void;
}

const TagModal: React.FC<TagsCardProps> = ({
  onClose,
  onSave,
  initialData,
}) => {
  const [createTag, { isLoading: creating }] = useCreateTagMutation();
  const [editTag, { isLoading: updating }] = useEditTagsMutation();

  const isEditMode = Boolean(initialData?._id);
  const [name, setName] = useState(initialData?.name || "");
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const saving = creating || updating;

  const handleSubmit = async () => {
    if (!name.trim()) {
      setAlertInfo({
        title: "Tag Name Required",
        message: "Please enter a tag name before saving.",
        variant: "warning",
      });
      return;
    }

    const payload = {
      ...(isEditMode && initialData?._id ? { _id: initialData._id } : {}),
      name: name.trim(),
      isActive,
    };

    try {
      const response = isEditMode
        ? await editTag(payload).unwrap()
        : await createTag(payload).unwrap();

      onSave(response);
      onClose();
    } catch (err) {
      console.error("Failed to save tag:", err);
      setAlertInfo({
        title: "Save Failed",
        message: "Something went wrong while saving the tag.",
        variant: "error",
      });
    }
  };

  return (
    <div className="tag-modal-backdrop">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="tag-modal">
        <div className="tag-modal-header">
          <div>
            <span>Tag Setup</span>
            <h3>{isEditMode ? "Edit Tag" : "Add Tag"}</h3>
          </div>
          <button onClick={onClose} aria-label="Close tag modal">
            X
          </button>
        </div>

        <div className="tag-modal-body">
          <label className="tag-modal-field">
            <span>Tag Name</span>
            <input
              placeholder="Trending"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="tag-modal-status">
            <div>
              <strong>Tag Status</strong>
              <p>Turn this tag on or off for product organization.</p>
            </div>

            <label className="tag-modal-switch">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
              />
              <span className="tag-modal-switch-slider" />
              <small>{isActive ? "On" : "Off"}</small>
            </label>
          </div>
        </div>

        <div className="tag-modal-actions">
          <button className="tag-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="tag-save-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save Tag"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagModal;
