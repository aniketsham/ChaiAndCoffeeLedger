"use client";
import { useState } from "react";

interface DrinkEntryFiltersProps {
  people: string[];
  onFilter: (filters: { person: string; date: string }) => void;
}

export default function DrinkEntryFilters({
  people,
  onFilter,
}: DrinkEntryFiltersProps) {
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");

  return (
    <form
      className="flex flex-col sm:flex-row gap-2 items-end mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        onFilter({ person, date });
      }}
    >
      <div>
        <label className="block text-xs font-medium mb-1">Person</label>
        <select
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        >
          <option value="">All</option>
          {people.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1">Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Filter
      </button>
    </form>
  );
}
