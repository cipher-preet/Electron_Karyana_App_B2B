import { useGetUserAdditionalProfileDetailsQuery } from "@/redux/services/BuidHomeApi";
import "./ShopInfoPage.css";
import { useParams } from "react-router-dom";

const ShopInfoPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetUserAdditionalProfileDetailsQuery(
    id!,
  );
  if (isLoading) {
    return <div className="loading">Loading shop information...</div>;
  }

  if (isError) {
    return <div className="error">Error loading shop information.</div>;
  }
  const shopData = data?.data;

  return (
    <div className="shop-page">
      <div className="page-header">
        <div>
          <h1>{shopData.shopName}</h1>
          <p className="subtitle">Shop Profile Overview</p>
        </div>
        <span className="badge">{shopData.Type}</span>
      </div>

      <div className="section-grid">
        <div className="section-card">
          <h3>Basic Information</h3>

          <div className="field">
            <span>Owner Name</span>
            <strong>{shopData.ownerName}</strong>
          </div>

          <div className="field">
            <span>Phone Number</span>
            <strong>+{shopData.phone}</strong>
          </div>

          <div className="field">
            <span>Address</span>
            <strong>{shopData.address}</strong>
          </div>

          <div className="field">
            <span>Date of Birth</span>
            <strong>{new Date(shopData.dateofbirth).toDateString()}</strong>
          </div>
        </div>

        <div className="section-card">
          <h3>Business Details</h3>

          <div className="field">
            <span>Shop Tenure</span>
            <strong>{shopData.tenureOfShop}</strong>
          </div>

          <div className="field">
            <span>Daily Sales</span>
            <strong>{shopData.Dailysales}</strong>
          </div>

          <div className="field">
            <span>Monthly Sales</span>
            <strong>{shopData.Monthlysales}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoPage;
