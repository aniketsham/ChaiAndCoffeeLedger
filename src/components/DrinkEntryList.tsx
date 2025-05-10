"use client";

interface DrinkEntryListProps {
  entries: any[];
  onEdit: (entry: any) => void;
  onDelete: (id: string) => void;
}

export default function DrinkEntryList({
  entries,
  onEdit,
  onDelete,
}: DrinkEntryListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Tea</th>
            <th className="px-4 py-2 text-left">Coffee</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const dateObj = new Date(entry.date);
            const date = dateObj.toLocaleDateString();
            const time = dateObj.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <tr
                key={entry._id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2">{entry.tea}</td>
                <td className="px-4 py-2">{entry.coffee}</td>
                <td className="px-4 py-2">{date}</td>
                <td className="px-4 py-2">{time}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    onClick={() => onEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                    onClick={() => onDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
