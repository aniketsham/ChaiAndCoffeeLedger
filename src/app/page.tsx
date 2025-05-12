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

function getMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${d.getMonth() + 1}`;
}
function getMonthName(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}
function isInMonth(dateStr: string, year: number, month: number) {
  const d = new Date(dateStr);
  return d.getFullYear() === year && d.getMonth() === month;
}

export default function Home() {
  const [entries, setEntries] = useState<DrinkEntry[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<{
    year: number;
    month: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
      });
  }, []);

  // Find all unique months in the data
  const monthSet = new Set<string>();
  entries.forEach((e) => monthSet.add(getMonthKey(e.date)));
  const months = Array.from(monthSet)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return {
        year,
        month: month - 1,
        label: new Date(year, month - 1).toLocaleString(undefined, {
          month: "long",
          year: "numeric",
        }),
      };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);

  // Default to current month
  useEffect(() => {
    if (months.length && selectedMonth === null) {
      setSelectedMonth({ year: months[0].year, month: months[0].month });
    }
  }, [months, selectedMonth]);

  // Stats: previous month and current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const prevMonthStats = { tea: 0, coffee: 0 };
  const monthStats = { tea: 0, coffee: 0 };
  entries.forEach((e) => {
    const d = new Date(e.date);
    if (d.getFullYear() === prevYear && d.getMonth() === prevMonth) {
      prevMonthStats.tea += e.tea ?? 0;
      prevMonthStats.coffee += e.coffee ?? 0;
    }
    if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
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

  // Filter entries for the selected month
  const filteredEntries = selectedMonth
    ? entries.filter((e) =>
        isInMonth(e.date, selectedMonth.year, selectedMonth.month)
      )
    : entries;

  // Calculate total cost for the selected month
  const selectedMonthStats = { tea: 0, coffee: 0 };
  if (selectedMonth) {
    entries.forEach((e) => {
      if (isInMonth(e.date, selectedMonth.year, selectedMonth.month)) {
        selectedMonthStats.tea += e.tea ?? 0;
        selectedMonthStats.coffee += e.coffee ?? 0;
      }
    });
  }
  const totalCost =
    selectedMonthStats.tea * 10 + selectedMonthStats.coffee * 15;

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
        <StatsDashboard pMonths={prevMonthStats} month={monthStats} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">
              Total Cost (
              {selectedMonth
                ? months.find(
                    (m) =>
                      m.year === selectedMonth.year &&
                      m.month === selectedMonth.month
                  )?.label
                : ""}
              )
            </h2>
            <div className="text-3xl font-bold text-green-700">
              ₹{totalCost}
            </div>
            <div className="text-gray-600 mt-1 text-sm">
              Tea: ₹10 each, Coffee: ₹15 each
            </div>
          </div>
        </div>
        <DrinkSummaryChart
          labels={chartLabels}
          teaData={teaData}
          coffeeData={coffeeData}
        />
        <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            {months.map((m) => (
              <button
                key={m.label}
                className={`px-3 py-1 rounded ${
                  selectedMonth &&
                  m.year === selectedMonth.year &&
                  m.month === selectedMonth.month
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() =>
                  setSelectedMonth({ year: m.year, month: m.month })
                }
              >
                {m.label}
              </button>
            ))}
          </div>
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
              {filteredEntries.map((entry) => {
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
