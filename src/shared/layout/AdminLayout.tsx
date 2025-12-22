import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header/Header";
import "./layout.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-root">
      <Sidebar collapsed={collapsed} onToggle={setCollapsed} />

      <div className={`main-area ${collapsed ? "collapsed" : ""}`}>
        <Header collapsed={collapsed} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
