"use client";
import { useState } from "react";
import type { DrinkEntry } from "@/app/entries/page";

interface DrinkEntryFormProps {
  onSubmit: (data: DrinkEntry) => void;
  initialData?: DrinkEntry;
}

export default function DrinkEntryForm({
  onSubmit,
  initialData,
}: DrinkEntryFormProps) {
  const [tea, setTea] = useState<number>(initialData?.tea ?? 0);
  const [coffee, setCoffee] = useState<number>(initialData?.coffee ?? 0);

  return (
    <form
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const now = new Date();
        const date = initialData?.date || now.toISOString();
        onSubmit({ tea, coffee, date, _id: initialData?._id });
      }}
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tea</label>
          <input
            type="number"
            min={0}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            value={tea}
            onChange={(e) => setTea(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Coffee</label>
          <input
            type="number"
            min={0}
            className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            value={coffee}
            onChange={(e) => setCoffee(Number(e.target.value))}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {initialData ? "Update Entry" : "Add Entry"}
      </button>
    </form>
  );
}
