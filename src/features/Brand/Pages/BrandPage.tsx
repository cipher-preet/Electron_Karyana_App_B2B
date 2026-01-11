import React, { useEffect, useState } from "react";
import "../../Units/Pages/UnitPages.css";
import BrandModal from "../Components/BrandModal";
import Brandcard from "../Components/Brandcard";
import { useGetBrandsForDashboardQuery } from "@/redux/services/UnitBrandApi";

interface brand {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const BrandPage = () => {
  const { data, isLoading, error } = useGetBrandsForDashboardQuery();

  const [Brand, setBrand] = useState<brand[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editBrand, setEditBrand] = useState<brand | null>(null);

  useEffect(() => {
    if (data) {
      const brandArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setBrand(brandArray);
    }
  }, [data]);

  const toggleUnitStatus = (_id: string) => {
    setBrand((prev) =>
      prev.map((brand) =>
        brand._id === _id ? { ...brand, isActive: !brand.isActive } : brand
      )
    );
  };

  if (isLoading) return <div>Loading brands...</div>;
  if (error) return <div>Failed to load brands</div>;

  return (
    <div className="unit-page">
      <div className="unit-header">
        <h2>Brand</h2>
        <button className="unit-add-btn" onClick={() => setOpenModal(true)}>
          + Add Brand
        </button>
      </div>
      <div className="unit-grid">
        {Brand.length === 0 ? (
          <div>No units found</div>
        ) : (
          Brand.map((Brand) => (
            <Brandcard
              key={Brand._id}
              brand={Brand}
              onEdit={() => {
                setEditBrand(Brand);
                setOpenModal(true);
              }}
              onStatusToggle={() => toggleUnitStatus(Brand._id)}
            />
          ))
        )}
      </div>

      {openModal && (
        <BrandModal
          initialData={editBrand}
          onClose={() => {
            setOpenModal(false);
            setEditBrand(null);
          }}
          onSave={(payload) => {
            console.log("Unit saved:", payload);
          }}
        />
      )}
    </div>
  );
};

export default BrandPage;
