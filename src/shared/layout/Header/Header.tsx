import "./Header.css";

const Header = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <header className={`header ${collapsed ? "collapsed" : ""}`}>
      <h2 className="header_heading">Dashboard</h2>
      <div className="user">Admin</div>
    </header>
  );
};

export default Header;
