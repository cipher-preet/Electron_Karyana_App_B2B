import { Outlet } from "react-router-dom";
import SettingsSidebar from "./UserDetails/SettingsSidebar";
import "./UserDetailsPage.css";

const UserDetailsPage = () => {
  return (
    <div className="user-details-layout">
      <SettingsSidebar />
      <div className="details-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDetailsPage;
