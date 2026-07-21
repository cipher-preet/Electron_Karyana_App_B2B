import { NavLink } from "react-router-dom";
import { FiMenu, FiSidebar } from "react-icons/fi";
import "./Sidebar.css";

interface Props {
  collapsed: boolean;
  onToggle: (v: boolean) => void;
}

const navItems = [
  { to: "/dashboard", label: "Dashboard", shortLabel: "DB" },
  { to: "/orderdetail", label: "Orders", shortLabel: "OR" },
  { to: "/products", label: "Products", shortLabel: "PR" },
  { to: "/category", label: "Categories", shortLabel: "CA" },
  { to: "/unit", label: "Units", shortLabel: "UN" },
  { to: "/brandpage", label: "Brands", shortLabel: "BR" },
  { to: "/tags", label: "Tags", shortLabel: "TG" },
  { to: "/approveusers", label: "Approved Users", shortLabel: "AU" },
  { to: "/pendingapprovaluser", label: "Pending Users", shortLabel: "PU" },
  { to: "/buildHomepage", label: "Homepage Builder", shortLabel: "HB" },
  { to: "/trendmanagement", label: "Manage Trends", shortLabel: "MT" },
  { to: "/bannersAndCrouser", label: "Banners", shortLabel: "BN" },
  { to: "/contactus", label: "Contact Us", shortLabel: "CU" },
];

const Sidebar = ({ collapsed, onToggle }: Props) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="brand-wrap">
          <div className="brand-mark">K</div>
          {!collapsed && (
            <div>
              <span className="brand">Kariyana</span>
              <span className="brand-subtitle">Admin console</span>
            </div>
          )}
        </div>

        <button
          className="hamburger"
          onClick={() => onToggle(!collapsed)}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {collapsed ? <FiMenu /> : <FiSidebar />}
        </button>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>
    </aside>
  );
};

const NavItem = ({
  to,
  label,
  shortLabel,
}: {
  to: string;
  label: string;
  shortLabel: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    title={label}
  >
    <span className="nav-icon">{shortLabel}</span>
    <span className="nav-label">{label}</span>
  </NavLink>
);

export default Sidebar;
