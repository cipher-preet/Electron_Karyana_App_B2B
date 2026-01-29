import UserCard from "../Components/UserCard";
import "./UserGrid.css";

const users = [
  { name: "Rahul Sharma", email: "rahul@gmail.com", role: "Admin" },
  { name: "Ankit Verma", email: "ankit@gmail.com", role: "User" },
  { name: "Priya Singh", email: "priya@gmail.com", role: "Manager" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
  { name: "Rohit Kumar", email: "rohit@gmail.com", role: "User" },
];

const ApproveUserPage = () => {
  return (
    <div className="page-container">
      <div className="user-grid">
        {users.map((user, i) => (
          <UserCard key={i} {...user} />
        ))}
      </div>
    </div>
  );
};

export default ApproveUserPage;
