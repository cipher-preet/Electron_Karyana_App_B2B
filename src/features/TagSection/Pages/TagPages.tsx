import "../../Units/Pages/UnitPages.css";
import { useEffect, useState } from "react";
import { useGetallTagsForDashboardQuery } from "@/redux/services/UnitBrandApi";
import Tagcard from "../Compoonents/TagCards";
import TagModal from "../Compoonents/TagModal";

interface Tags {
  _id: string;
  name: string;
  isActive: boolean;
}

const TagPages = () => {
  const { data, isLoading, error } = useGetallTagsForDashboardQuery();

  const [Tags, setTags] = useState<Tags[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editTags, setEditTags] = useState<Tags | null>(null);

  useEffect(() => {
    if (data) {
      const TagArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setTags(TagArray);
    }
  }, [data]);

  const toggleUnitStatus = (_id: string) => {
    setTags((prev) =>
      prev.map((brand) =>
        brand._id === _id ? { ...brand, isActive: !brand.isActive } : brand,
      ),
    );
  };

  if (isLoading) return <div>Loading Tags...</div>;
  if (error) return <div>Failed to load Tags</div>;

  return (
    <div className="unit-page">
      <div className="unit-header">
        <h2>Tags</h2>
        <button className="unit-add-btn" onClick={() => setOpenModal(true)}>
          + Add Tags
        </button>
      </div>
      <div className="unit-grid">
        {Tags.length === 0 ? (
          <div>No Tags found</div>
        ) : (
          Tags.map((Tags) => (
            <Tagcard
              key={Tags._id}
              Tag={Tags}
              onEdit={() => {
                setEditTags(Tags);
                setOpenModal(true);
              }}
              onStatusToggle={() => toggleUnitStatus(Tags._id)}
            />
          ))
        )}
      </div>

      {openModal && (
        <TagModal
          initialData={editTags}
          onClose={() => {
            setOpenModal(false);
            setEditTags(null);
          }}
          onSave={(payload) => {
            console.log("Unit saved:", payload);
          }}
        />
      )}
    </div>
  );
};

export default TagPages;
