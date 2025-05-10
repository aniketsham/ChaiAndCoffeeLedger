"use client";
import React, { useEffect, useState } from "react";
import StatsDashboard from "@/components/StatsDashboard";
import DrinkSummaryChart from "@/components/DrinkSummaryChart";
// import ThemeToggle from "@/components/ThemeToggle"; // Uncomment if implemented

export interface DrinkEntry {
  _id?: string;
  tea: number;
  coffee: number;
  date: string;
}

function getToday(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
function getMonth(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  );
}

export default function Home() {
  const [entries, setEntries] = useState<DrinkEntry[]>([]);

  useEffect(() => {
    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
      });
  }, []);

  // Calculate stats
  const todayStats = { tea: 0, coffee: 0 };
  const monthStats = { tea: 0, coffee: 0 };
  entries.forEach((e) => {
    if (getToday(e.date)) {
      todayStats.tea += e.tea ?? 0;
      todayStats.coffee += e.coffee ?? 0;
    }
    if (getMonth(e.date)) {
      monthStats.tea += e.tea ?? 0;
      monthStats.coffee += e.coffee ?? 0;
    }
  });

  // Prepare chart data (last 7 days)
  const chartLabels: string[] = [];
  const teaData: number[] = [];
  const coffeeData: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    chartLabels.push(label);
    let tea = 0,
      coffee = 0;
    entries.forEach((e) => {
      const ed = new Date(e.date);
      if (
        ed.getFullYear() === d.getFullYear() &&
        ed.getMonth() === d.getMonth() &&
        ed.getDate() === d.getDate()
      ) {
        tea += e.tea ?? 0;
        coffee += e.coffee ?? 0;
      }
    });
    teaData.push(tea);
    coffeeData.push(coffee);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* <ThemeToggle /> */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">☕ Office Drinks Dashboard</h1>
        <p className="text-gray-600">
          Track tea and coffee consumption in your office, live!
        </p>
      </header>
      <main className="max-w-3xl mx-auto flex flex-col gap-6">
        <StatsDashboard today={todayStats} month={monthStats} />
        <DrinkSummaryChart
          labels={chartLabels}
          teaData={teaData}
          coffeeData={coffeeData}
        />
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">All Entries</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Tea</th>
                <th className="px-4 py-2 text-left">Coffee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
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
                  <tr key={entry._id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{entry.tea}</td>
                    <td className="px-4 py-2">{entry.coffee}</td>
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">{time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
