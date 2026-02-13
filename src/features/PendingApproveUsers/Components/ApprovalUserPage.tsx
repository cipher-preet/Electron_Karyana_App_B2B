import "./ApprovalUserPage.css";
import { useParams } from "react-router-dom";
import {
  useGetUserAdditionalProfileDetailsQuery,
  useApproveshopMutation,
} from "@/redux/services/BuidHomeApi";

type ShopData = {
  _id: string;
  shopName: string;
  ownerName: string;
  address: string;
  dateofbirth: string;
  Type: string;
  tenureOfShop: string;
  Dailysales: string;
  Monthlysales: string;
  documents: string;
  phone: number;
};

const ApprovalUserPage = () => {
  const { id } = useParams();
  const {
    data: ShopDetail,
    isLoading: loading,
    isError,
  } = useGetUserAdditionalProfileDetailsQuery(id!);

  const data = ShopDetail?.data;

  const [approveShop, { isLoading }] = useApproveshopMutation();

  const handleApprove = async () => {
    try {
      await approveShop(data._id).unwrap();

      alert("Shop approved successfully");
    } catch (error: any) {
      alert(error?.data?.message || "Failed to approve shop");
    }
  };

  const handleReject = () => {
    alert("Reject flow coming soon ");
  };

  if (loading || isError) {
    return <div>Loading data </div>;
  }

  return (
    <div className="approval-wrapper">
      <div className="approval-header">
        <div>
          <h1>Shop Verification</h1>
          <p>Review and verify submitted shop details</p>
        </div>

        <span className="status-badge pending">Pending</span>
      </div>

      <div className="approval-layout">
        <div className="glass-card">
          <Section title="Shop Information">
            <Info label="Shop Name" value={data.shopName} />
            <Info label="Shop Type" value={data.Type} />
            <Info label="Tenure" value={data.tenureOfShop} />
            <Info label="Address" value={data.address} />
          </Section>

          <Divider />

          <Section title="Owner Information">
            <Info label="Owner Name" value={data.ownerName} />
            <Info label="Phone" value={`+${data.phone}`} />
            <Info
              label="Date of Birth"
              value={new Date(data.dateofbirth).toLocaleDateString()}
            />
          </Section>

          <Divider />

          <Section title="Business Metrics">
            <Info label="Daily Sales" value={data.Dailysales} />
            <Info label="Monthly Sales" value={data.Monthlysales} />
          </Section>
        </div>

        <div className="glass-card sticky-card">
          <h3 className="section-title">Verification Document</h3>
          <div className="document-frame">
            <img src={data.documents} alt="Verification Document" />
          </div>
          <p className="doc-hint">Ensure the document is clear and valid</p>
        </div>
      </div>

      <div className="approval-actions">
        <button className="btn btn-ghost" onClick={handleReject}>
          Reject
        </button>
        <button
          className="btn btn-primary"
          onClick={handleApprove}
          disabled={isLoading}
        >
          {isLoading ? "Approving..." : "Approve"}
        </button>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="info-section">
    <h3 className="section-title">{title}</h3>
    <div className="info-grid">{children}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="info-item">
    <span className="info-label">{label}</span>
    <span className="info-value">{value}</span>
  </div>
);

const Divider = () => <div className="divider" />;

export default ApprovalUserPage;
