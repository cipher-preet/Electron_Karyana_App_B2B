import { useLocation } from "react-router-dom";
import "./Header.css";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/orderdetail": "Orders",
  "/products": "Products",
  "/category": "Categories",
  "/unit": "Units",
  "/brandpage": "Brands",
  "/tags": "Tags",
  "/approveusers": "Approved Users",
  "/pendingapprovaluser": "Pending Users",
  "/buildHomepage": "Homepage Builder",
  "/trendmanagement": "Trend Management",
  "/bannersAndCrouser": "Banners",
  "/contactus": "Contact Us",
};

const Header = ({ collapsed }: { collapsed: boolean }) => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className={`header ${collapsed ? "collapsed" : ""}`}>
      <div>
        <p className="header-eyebrow">Admin Workspace</p>
        <h2 className="header_heading">{pageTitle}</h2>
      </div>

      <div className="header-actions">
        <div className="header-status">Live</div>
        <div className="user">
          <span className="user-avatar">A</span>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

const getPageTitle = (pathname: string) => {
  const match = Object.keys(routeTitles).find((route) =>
    pathname.startsWith(route),
  );

  return match ? routeTitles[match] : "Dashboard";
};

export default Header;
