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
    <div
      className="user-card"
      onClick={() => navigate(`/users/${userId}/${actualUserId}`)}
    >
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

export default UserCard;
