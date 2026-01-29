import "./ProfileSection.css";

const ProfileSection = () => {
  return (
    <div className="profile-section">
      <div className="profile-left">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="avatar"
        />
        <div>
          <h3>Rafiqul Rahmandasf</h3>
          <p>Team Manager</p>
          <span>Leeds, United Kingdom</span>
        </div>
      </div>

      <button className="edit-btn">Edit</button>
    </div>
  );
};

export default ProfileSection;
