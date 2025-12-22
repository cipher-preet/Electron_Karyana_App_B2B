import { NavLink } from "react-router-dom";
import "./Sidebar.css";

interface Props {
  collapsed: boolean;
  onToggle: (v: boolean) => void;
}

const Sidebar = ({ collapsed, onToggle }: Props) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <span className="brand">LALA</span>

        <button
          className="hamburger"
          onClick={() => onToggle(!collapsed)}
        >
          ☰
        </button>
      </div>

      <nav className="nav">
        <NavItem to="/dashboard" label="Dashboard" collapsed={collapsed} />
        <NavItem to="/products" label="Products" collapsed={collapsed} />
        <NavItem to="/category" label="category" collapsed={collapsed} />
      </nav>
    </aside>
  );
};

const NavItem = ({
  to,
  label,
  collapsed,
}: {
  to: string;
  label: string;
  collapsed: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-item ${isActive ? "active" : ""}`
    }
  >
    {!collapsed && label}
  </NavLink>
);

export default Sidebar;
