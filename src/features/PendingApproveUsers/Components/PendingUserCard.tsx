import "./PendingUserCard.css";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  userId: string;
  shopName: string;
  ownerName: string;
  address: string;
  image?: string;
}

const PendingUserCard = ({
  userId,
  shopName,
  ownerName,
  address,
  image,
}: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <article
      className="pending-user-card"
      onClick={() => navigate(`/pendingusers/${userId}`)}
    >
      <div className="pending-card-top">
        <div className="pending-avatar">
          {image ? (
            <img src={image} alt={`${shopName} avatar`} />
          ) : (
            <span>{shopName?.charAt(0)?.toUpperCase() || "S"}</span>
          )}
        </div>

        <span className="pending-pill">Pending</span>
      </div>

      <div className="pending-card-body">
        <h3 title={shopName}>{shopName || "Unnamed Shop"}</h3>
        <p title={ownerName}>{ownerName || "Owner not available"}</p>
      </div>

      <div className="pending-card-footer">
        <span title={address}>{address || "Address not available"}</span>
        <button type="button">Review</button>
      </div>
    </article>
  );
};

export default PendingUserCard;
