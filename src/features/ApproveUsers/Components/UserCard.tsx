import "./UserCard.css";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
}

const UserCard = ({ name, email, role }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <div className="avatar">{name.charAt(0)}</div>
      </div>

      <h3 className="user-name">{name}</h3>
      <p className="user-email">{email}</p>

      <div className="card-footer">
        <span className="role">{role}</span>
      </div>
    </div>
  );
};

export default UserCard;
