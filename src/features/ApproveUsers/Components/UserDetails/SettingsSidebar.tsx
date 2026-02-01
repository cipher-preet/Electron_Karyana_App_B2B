import { NavLink, useParams } from "react-router-dom";
import "./SettingsSidebar.css";

const menu = [
  { label: "Shop Info", path: "" },
  { label: "Order Info ", path: "orderInfo" },
  { label: "Cart Info", path: "cartInfo" },
];

const SettingsSidebar = () => {
  const { id } = useParams();

  return (
    <div className="settings-sidebar">
      {menu.map((item) => (
        <NavLink
          key={item.label}
          to={`/users/${id}/${item.path}`}
          end={item.path === ""}
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          {item.label}
        </NavLink>
      ))}

      <div className="delete">Delete Account</div>
    </div>
  );
};

export default SettingsSidebar;
