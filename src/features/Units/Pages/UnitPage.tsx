import React, { useEffect, useState } from "react";
import UnitCard from "../Components/UnitCard";
import UnitModal from "../Components/UnitModal";
import "../Pages/UnitPages.css";
import { useGetUnitsForDashboardQuery } from "@/redux/services/UnitBrandApi";

interface Unit {
  _id: string;
  name: string;
  shortName: string;
  baseUnit: string;
  multiplier: number;
  isActive: boolean;
}

const UnitPage = () => {
  const { data, isLoading, error } = useGetUnitsForDashboardQuery();

  const [units, setUnits] = useState<Unit[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editUnit, setEditUnit] = useState<Unit | null>(null);

  useEffect(() => {
    if (data) {
      const unitArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setUnits(unitArray);
    }
  }, [data]);

  const toggleUnitStatus = (_id: string) => {
    setUnits((prev) =>
      prev.map((unit) =>
        unit._id === _id ? { ...unit, isActive: !unit.isActive } : unit
      )
    );
  };

  if (isLoading) return <div>Loading units...</div>;
  if (error) return <div>Failed to load units</div>;

  return (
    <div className="unit-page">
      <div className="unit-header">
        <h2>Units</h2>
        <button className="unit-add-btn" onClick={() => setOpenModal(true)}>
          + Add Unit
        </button>
      </div>

      <div className="unit-grid">
        {units.length === 0 ? (
          <div>No units found</div>
        ) : (
          units.map((unit) => (
            <UnitCard
              key={unit._id}
              unit={unit}
              onEdit={() => {
                setEditUnit(unit);
                setOpenModal(true);
              }}
              onStatusToggle={() => toggleUnitStatus(unit._id)}
            />
          ))
        )}
      </div>

      {openModal && (
        <UnitModal
          initialData={editUnit}
          onClose={() => {
            setOpenModal(false);
            setEditUnit(null);
          }}
          onSave={(payload) => {
            console.log("Unit saved:", payload);
          }}
        />
      )}
    </div>
  );
};

export default UnitPage;
