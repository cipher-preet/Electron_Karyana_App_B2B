import React, { useState } from "react";
import "./BrandPage.css";
import BrandModal from "../Components/BrandModal";
import Brandcard, { Brand } from "../Components/Brandcard";
import {
  useEditBrandMutation,
  useGetBrandsForDashboardQuery,
} from "@/redux/services/UnitBrandApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

const BrandPage = () => {
  const { data, isLoading, error } = useGetBrandsForDashboardQuery();
  const [editBrandMutation] = useEditBrandMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editBrand, setEditBrand] = useState<Brand | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const brands = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const openAddModal = () => {
    setEditBrand(null);
    setOpenModal(true);
  };

  const toggleBrandStatus = async (brand: Brand) => {
    try {
      await editBrandMutation({
        _id: brand._id,
        name: brand.name,
        description: brand.description,
        isActive: !brand.isActive,
      }).unwrap();

      setAlertInfo({
        title: !brand.isActive ? "Brand Enabled" : "Brand Disabled",
        message: `${brand.name} is now ${!brand.isActive ? "active" : "inactive"}.`,
        variant: "success",
      });
    } catch (err) {
      console.error("Failed to update brand status:", err);
      setAlertInfo({
        title: "Status Update Failed",
        message: "Something went wrong while updating the brand status.",
        variant: "error",
      });
    }
  };

  return (
    <div className="brand-page">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="brand-page-header">
        <div>
          <span>Catalog Settings</span>
          <h2>Brands</h2>
          <p>Manage product brands and control whether they appear in product forms.</p>
        </div>

        <button className="brand-add-btn" onClick={openAddModal}>
          <span>+</span>
          Add Brand
        </button>
      </div>

      {isLoading && <div className="brand-state-card">Loading brands...</div>}

      {error && (
        <div className="brand-state-card error">Failed to load brands.</div>
      )}

      {!isLoading && !error && (
        <div className="brand-grid">
          {brands.length === 0 ? (
            <div className="brand-empty-state">
              No brands found. Add one to organize your product catalog.
            </div>
          ) : (
            brands.map((brand) => (
              <Brandcard
                key={brand._id}
                brand={brand}
                onEdit={() => {
                  setEditBrand(brand);
                  setOpenModal(true);
                }}
                onStatusToggle={() => toggleBrandStatus(brand)}
              />
            ))
          )}
        </div>
      )}

      {openModal && (
        <BrandModal
          initialData={editBrand}
          onClose={() => {
            setOpenModal(false);
            setEditBrand(null);
          }}
          onSave={() => {
            setAlertInfo({
              title: editBrand ? "Brand Updated" : "Brand Created",
              message: editBrand
                ? "The brand details have been updated successfully."
                : "The new brand has been created successfully.",
              variant: "success",
            });
          }}
        />
      )}
    </div>
  );
};

export default BrandPage;
