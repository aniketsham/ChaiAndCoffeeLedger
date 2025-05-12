import React from "react";

interface StatsDashboardProps {
  pMonths: { tea: number; coffee: number };
  month: { tea: number; coffee: number };
}

export default function StatsDashboard({
  pMonths,
  month,
}: StatsDashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">
          Previous Month&apos;s Stats
        </h2>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {pMonths.tea}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Tea</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {pMonths.coffee}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Coffee</div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">This Month</h2>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{month.tea}</div>
            <div className="text-gray-600 dark:text-gray-300">Tea</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {month.coffee}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Coffee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
