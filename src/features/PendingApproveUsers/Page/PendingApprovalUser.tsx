import { useGetPendingUserProfileCardInDashboardSectionQuery } from "@/redux/services/BuidHomeApi";
import { useEffect, useState } from "react";
import PendingUserCard from "../Components/PendingUserCard";

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

  if (isLoading && users.length === 0) {
    return <div className="loading">Loading user profiles...</div>;
  }

  if (isError) {
    return <div className="error">Error loading user profiles.</div>;
  }

  return (
    <div className="page-container">
      <div className="user-grid">
        {data?.data?.users?.map((user: any) => (
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
