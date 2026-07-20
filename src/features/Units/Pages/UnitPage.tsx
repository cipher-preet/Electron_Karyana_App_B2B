import React, { useState } from "react";
import UnitCard, { Unit } from "../Components/UnitCard";
import UnitModal from "../Components/UnitModal";
import "../Pages/UnitPages.css";
import {
  useEditUnitMutation,
  useGetUnitsForDashboardQuery,
} from "@/redux/services/UnitBrandApi";
import CustomAlert from "@/assets/UI/CustomAlert/CustomAlert";

const UnitPage = () => {
  const { data, isLoading, error } = useGetUnitsForDashboardQuery();
  const [editUnitMutation] = useEditUnitMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editUnit, setEditUnit] = useState<Unit | null>(null);
  const [alertInfo, setAlertInfo] = useState<{
    title: string;
    message: string;
    variant: "success" | "error" | "warning" | "info";
  } | null>(null);

  const units = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  const openAddModal = () => {
    setEditUnit(null);
    setOpenModal(true);
  };

  const toggleUnitStatus = async (unit: Unit) => {
    try {
      await editUnitMutation({
        _id: unit._id,
        name: unit.name,
        shortName: unit.shortName,
        baseUnit: unit.baseUnit,
        multiplier: unit.multiplier,
        isActive: !unit.isActive,
      }).unwrap();

      setAlertInfo({
        title: !unit.isActive ? "Unit Enabled" : "Unit Disabled",
        message: `${unit.name} is now ${!unit.isActive ? "active" : "inactive"}.`,
        variant: "success",
      });
    } catch (err) {
      console.error("Failed to update unit status:", err);
      setAlertInfo({
        title: "Status Update Failed",
        message: "Something went wrong while updating the unit status.",
        variant: "error",
      });
    }
  };

  return (
    <div className="unit-page">
      {alertInfo && (
        <CustomAlert
          title={alertInfo.title}
          message={alertInfo.message}
          variant={alertInfo.variant}
          onClose={() => setAlertInfo(null)}
        />
      )}

      <div className="unit-page-header">
        <div>
          <span>Catalog Settings</span>
          <h2>Units</h2>
          <p>Manage measurement units used while creating and selling products.</p>
        </div>

        <button className="unit-add-btn" onClick={openAddModal}>
          <span>+</span>
          Add Unit
        </button>
      </div>

      {isLoading && <div className="unit-state-card">Loading units...</div>}

      {error && (
        <div className="unit-state-card error">Failed to load units.</div>
      )}

      {!isLoading && !error && (
        <div className="unit-grid">
          {units.length === 0 ? (
            <div className="unit-empty-state">
              No units found. Add one to keep product setup moving.
            </div>
          ) : (
            units.map((unit) => (
              <UnitCard
                key={unit._id}
                unit={unit}
                onEdit={() => {
                  setEditUnit(unit);
                  setOpenModal(true);
                }}
                onStatusToggle={() => toggleUnitStatus(unit)}
              />
            ))
          )}
        </div>
      )}

      {openModal && (
        <UnitModal
          initialData={editUnit}
          onClose={() => {
            setOpenModal(false);
            setEditUnit(null);
          }}
          onSave={() => {
            setAlertInfo({
              title: editUnit ? "Unit Updated" : "Unit Created",
              message: editUnit
                ? "The unit details have been updated successfully."
                : "The new unit has been created successfully.",
              variant: "success",
            });
          }}
        />
      )}
    </div>
  );
};

export default UnitPage;
