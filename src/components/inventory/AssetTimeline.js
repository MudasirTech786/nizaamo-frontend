"use client";

export default function AssetTimeline({
  logs = [],
}) {
  if (!logs.length) {
    return (
      <div className="text-sm text-gray-500">
        No activity found
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {logs.map((log) => (
        <div
          key={log.id}
          className="relative border-l-2 border-gray-300 pl-4"
        >
          <div className="font-medium capitalize">
            {log.action.replace("_", " ")}
          </div>

          {log.notes && (
            <div className="text-sm text-gray-600">
              {log.notes}
            </div>
          )}

          <div className="text-xs text-gray-400">
            {new Date(
              log.created_at
            ).toLocaleString()}
          </div>

          {log.user && (
            <div className="text-xs text-gray-500">
              {log.user}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}