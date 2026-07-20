import "./TagPages.css";
import { useState } from "react";
import {
  useEditTagsMutation,
  useGetallTagsForDashboardQuery,
} from "@/redux/services/UnitBrandApi";
import Tagcard, { Tag } from "../Compoonents/TagCards";
import TagModal from "../Compoonents/TagModal";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

const TagPages = () => {
  const { data, isLoading, error } = useGetallTagsForDashboardQuery();
  const [editTagMutation] = useEditTagsMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const tags = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const openAddModal = () => {
    setEditTag(null);
    setOpenModal(true);
  };

  const toggleTagStatus = async (tag: Tag) => {
    try {
      await editTagMutation({
        _id: tag._id,
        name: tag.name,
        isActive: !tag.isActive,
      }).unwrap();

      setAlertInfo({
        title: !tag.isActive ? "Tag Enabled" : "Tag Disabled",
        message: `${tag.name} is now ${!tag.isActive ? "active" : "inactive"}.`,
        variant: "success",
      });
    } catch (err) {
      console.error("Failed to update tag status:", err);
      setAlertInfo({
        title: "Status Update Failed",
        message: "Something went wrong while updating the tag status.",
        variant: "error",
      });
    }
  };

  return (
    <div className="tag-page">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="tag-page-header">
        <div>
          <span>Catalog Settings</span>
          <h2>Tags</h2>
          <p>Manage product tags used for discovery, filtering, and product grouping.</p>
        </div>

        <button className="tag-add-btn" onClick={openAddModal}>
          <span>+</span>
          Add Tag
        </button>
      </div>

      {isLoading && <div className="tag-state-card">Loading tags...</div>}

      {error && <div className="tag-state-card error">Failed to load tags.</div>}

      {!isLoading && !error && (
        <div className="tag-grid">
          {tags.length === 0 ? (
            <div className="tag-empty-state">
              No tags found. Add one to improve product organization.
            </div>
          ) : (
            tags.map((tag) => (
              <Tagcard
                key={tag._id}
                tag={tag}
                onEdit={() => {
                  setEditTag(tag);
                  setOpenModal(true);
                }}
                onStatusToggle={() => toggleTagStatus(tag)}
              />
            ))
          )}
        </div>
      )}

      {openModal && (
        <TagModal
          initialData={editTag}
          onClose={() => {
            setOpenModal(false);
            setEditTag(null);
          }}
          onSave={() => {
            setAlertInfo({
              title: editTag ? "Tag Updated" : "Tag Created",
              message: editTag
                ? "The tag details have been updated successfully."
                : "The new tag has been created successfully.",
              variant: "success",
            });
          }}
        />
      )}
    </div>
  );
};

export default TagPages;
