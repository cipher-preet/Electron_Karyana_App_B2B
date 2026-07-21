import { useEffect, useState } from "react";
import UserCard from "../Components/UserCard";
import "./UserGrid.css";
import { useGetUserOProfileCardInDashboardQuery } from "../../../redux/services/BuidHomeApi";

const ApproveUserPage = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<any[]>([]);
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching, isError } =
    useGetUserOProfileCardInDashboardQuery({ cursor });
  useEffect(() => {
    if (!data?.data?.users?.length) return;

    if (cursor !== undefined && cursor === lastCursor) return;

    setUsers((prev) => {
      const existingIds = new Set(prev.map((u) => u._id));
      const newUsers = data.data.users.filter(
        (u: any) => !existingIds.has(u._id),
      );

      return [...prev, ...newUsers];
    });

    setLastCursor(cursor);
  }, [data, cursor]);

  useEffect(() => {
    return () => {
      setUsers([]);
      setCursor(undefined);
      setLastCursor(undefined);
    };
  }, []);

  return (
    <div className="approved-users-page">
      <div className="approved-users-header">
        <div>
          <span>Customers</span>
          <h2>Approved Shops</h2>
          <p>Browse verified shop accounts and open their complete profile activity.</p>
        </div>

        <div className="approved-users-count">
          <strong>{users.length}</strong>
          <small>Approved profiles</small>
        </div>
      </div>

      <div className="approved-summary-grid">
        <div className="approved-summary-item">
          <span>Directory Status</span>
          <strong>{isFetching ? "Refreshing" : "Ready"}</strong>
        </div>
        <div className="approved-summary-item">
          <span>Next Page</span>
          <strong>{data?.data?.hasNextPage ? "Available" : "Complete"}</strong>
        </div>
        <div className="approved-summary-item">
          <span>Profile Access</span>
          <strong>{users.length > 0 ? "Open" : "Empty"}</strong>
        </div>
      </div>

      {isLoading && users.length === 0 && (
        <div className="approved-state-card">Loading user profiles...</div>
      )}

      {isError && (
        <div className="approved-state-card error">
          Error loading user profiles.
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="approved-state-card">
          No approved users found right now.
        </div>
      )}

      {!isError && users.length > 0 && (
        <div className="approved-user-grid">
          {users.map((user: any) => (
            <UserCard
              key={user._id}
              userId={user._id}
              actualUserId={user.userId}
              shopName={user.shopName}
              ownerName={user.ownerName}
              address={user.address}
              image={user.image}
            />
          ))}
        </div>
      )}

      {data?.data?.hasNextPage && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            disabled={isFetching}
            onClick={() => setCursor(data.data.nextCursor)}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ApproveUserPage;
