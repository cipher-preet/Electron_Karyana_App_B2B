import React from "react";
import "./QueryDashboard.css";
import {
  useGetContactinfoQuery,
  useMarkasreadincontactMutation,
  ContactQuery,
} from "@/redux/services/contactusApi";

const QueryDashboard: React.FC = () => {
  const { data, isLoading, isError } = useGetContactinfoQuery();
  const [markAsRead, { isLoading: isUpdating }] =
    useMarkasreadincontactMutation();

  const queries: ContactQuery[] = (data as any)?.data ?? [];

  const handleMarkAction = async (id: string) => {
    try {
      await markAsRead({ queryId: id }).unwrap();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const getBadgeClass = (type: string) => {
    if (type === "Complaint") return "badge complaint";
    if (type === "Inquiry") return "badge inquiry";
    return "badge query";
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError) return <div className="error">Something went wrong.</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Customer Support Requests</h1>
        <p>Manage and resolve customer complaints and inquiries</p>
      </div>

      <div className="table-wrapper">
        <table className="query-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {queries.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="name-cell">
                    <strong>{item.name}</strong>
                    <span>{item.address}</span>
                  </div>
                </td>

                <td>{item.phone}</td>

                <td>
                  <span className={getBadgeClass(item.query)}>
                    {item.query}
                  </span>
                </td>

                <td className="message-cell">{item.message}</td>

                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>
                  {item.isAction ? (
                    <span className="status resolved">Resolved</span>
                  ) : (
                    <span className="status pending">Pending</span>
                  )}
                </td>

                <td>
                  {!item.isAction && (
                    <button
                      className="action-btn"
                      disabled={isUpdating}
                      onClick={() => handleMarkAction(item._id)}
                    >
                      {isUpdating ? "Updating..." : "Mark Resolved"}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {queries.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">
                  No queries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryDashboard;
