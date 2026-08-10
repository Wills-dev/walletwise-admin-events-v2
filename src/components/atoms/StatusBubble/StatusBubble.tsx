const StatusBubble = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    Upcoming: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    inactive: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    Ongoing: "text-blue-400 bg-blue-500/10 border border-blue-500/20",
    Completed: "text-green-400 bg-green-500/10 border border-green-500/20",
    Approved: "text-green-600 bg-green-500/10 border border-green-500/20",
    Pending: "text-yellow-600 bg-yellow-500/10 border border-yellow-500/20",
    Rejected: "text-red-500 bg-red-500/10 border border-red-500/20",
  };

  return (
    <div
      className={`rounded-full px-3 py-1 text-center w-fit min-w-32 whitespace-nowrap text-sm ${
        statusStyles[status] || "text-red-400 bg-red-50"
      }`}
    >
      {status}
    </div>
  );
};

export default StatusBubble;
