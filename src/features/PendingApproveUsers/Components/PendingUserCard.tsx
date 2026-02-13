import "../../ApproveUsers/Components/UserCard.css";
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
    <div className="user-card" onClick={() => navigate(`/pendingusers/${userId}`)}>
      <div className="card-header">
        <div className="avatar">
          {image ? (
            <img src={image} alt={`${shopName} avatar`} />
          ) : (
            <div className="placeholder-avatar">{shopName.charAt(0)}</div>
          )}
        </div>
      </div>

      <h3 className="user-name">{shopName}</h3>
      <p className="user-email">{ownerName}</p>

      <div className="card-footer">
        <span className="role">{address}</span>
      </div>
    </div>
  );
};

export default PendingUserCard;
