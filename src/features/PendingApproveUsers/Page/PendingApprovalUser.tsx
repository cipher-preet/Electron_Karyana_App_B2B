import { useGetPendingUserProfileCardInDashboardSectionQuery } from "@/redux/services/BuidHomeApi";
import { useEffect, useState } from "react";
import PendingUserCard from "../Components/PendingUserCard";
import "./PendingApprovalUser.css";

const PendingApprovalUser = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<any[]>([]);
  const [lastCursor, setLastCursor] = useState<string | undefined>(undefined);

  const { data, isLoading, isFetching, isError } =
    useGetPendingUserProfileCardInDashboardSectionQuery({ cursor });

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
    <div className="pending-users-page">
      <div className="pending-users-header">
        <div>
          <span>Approvals</span>
          <h2>Pending Shop Requests</h2>
          <p>Review seller profiles waiting for account verification.</p>
        </div>

        <div className="pending-users-count">
          <strong>{users.length}</strong>
          <small>Pending profiles</small>
        </div>
      </div>

      <div className="pending-summary-grid">
        <div className="pending-summary-item">
          <span>Queue Status</span>
          <strong>{isFetching ? "Refreshing" : "Ready"}</strong>
        </div>
        <div className="pending-summary-item">
          <span>Next Page</span>
          <strong>{data?.data?.hasNextPage ? "Available" : "Complete"}</strong>
        </div>
        <div className="pending-summary-item">
          <span>Action Needed</span>
          <strong>{users.length > 0 ? "Review" : "None"}</strong>
        </div>
      </div>

      {isLoading && users.length === 0 && (
        <div className="pending-state-card">Loading user profiles...</div>
      )}

      {isError && (
        <div className="pending-state-card error">
          Error loading user profiles.
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="pending-state-card">
          No pending users found right now.
        </div>
      )}

      {!isError && users.length > 0 && (
        <div className="pending-user-grid">
          {users.map((user: any) => (
            <PendingUserCard
              key={user._id}
              userId={user._id}
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

export default PendingApprovalUser;
