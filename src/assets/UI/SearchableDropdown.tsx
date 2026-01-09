import React, { useState, useRef, useEffect } from "react";
import "./SearchableDropdown.css";

interface Props {
  label: string;
  items: any[];
  displayKey: string;
  valueKey: string;
  selected: string | null;
  onSelect: (item: any) => void;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<Props> = ({
  label,
  items,
  displayKey,
  valueKey,
  selected,
  onSelect,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef<any>();

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedItem = items.find((i) => i[valueKey] === selected);

  return (
    <div className="dropdown-container" ref={ref}>
      <div
        className={`dropdown-header ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && setOpen(!open)}
      >
        {selectedItem ? selectedItem[displayKey] : label}
      </div>

      {open && !disabled && (
        <div className="dropdown-menu">
          <input
            type="text"
            placeholder="Search..."
            className="dropdown-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="dropdown-list">
            {items
              .filter((x) =>
                (x?.[displayKey] || "")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((item) => (
                <div
                  key={item[valueKey]}
                  className="dropdown-item"
                  onClick={() => {
                    onSelect(item);  // ⭐ FIXED — send object
                    setOpen(false);
                  }}
                >
                  {item[displayKey]}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
