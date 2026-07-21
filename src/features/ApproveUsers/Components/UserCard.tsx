import "./UserCard.css";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  userId: string;
  shopName: string;
  ownerName: string;
  address: string;
  image?: string;
  actualUserId: string;
}

const UserCard = ({
  userId,
  shopName,
  ownerName,
  address,
  image,
  actualUserId,
}: UserCardProps) => {
  const navigate = useNavigate();
  return (
    <article
      className="approved-user-card"
      onClick={() => navigate(`/users/${userId}/${actualUserId}`)}
    >
      <div className="approved-card-top">
        <div className="approved-avatar">
          {image ? (
            <img src={image} alt={`${shopName} avatar`} />
          ) : (
            <span>{shopName?.charAt(0)?.toUpperCase() || "S"}</span>
          )}
        </div>

        <span className="approved-pill">Approved</span>
      </div>

      <div className="approved-card-body">
        <h3 title={shopName}>{shopName || "Unnamed Shop"}</h3>
        <p title={ownerName}>{ownerName || "Owner not available"}</p>
      </div>

      <div className="approved-card-footer">
        <span title={address}>{address || "Address not available"}</span>
        <button type="button">View</button>
      </div>
    </article>
  );
};

export default UserCard;
