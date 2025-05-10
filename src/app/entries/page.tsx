"use client";
import React, { useEffect, useState } from "react";
import DrinkEntryList from "@/components/DrinkEntryList";
import DrinkEntryForm from "@/components/DrinkEntryForm";

export interface DrinkEntry {
  _id?: string;
  tea: number;
  coffee: number;
  date: string;
}

export default function EntriesPage() {
  const [entries, setEntries] = useState<DrinkEntry[]>([]);
  const [filtered, setFiltered] = useState<DrinkEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<DrinkEntry | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const res = await fetch("/api/entries");
    const data = await res.json();
    setEntries(data);
    setFiltered(data);
    setLoading(false);
  };

  const handleAdd = async (data: DrinkEntry) => {
    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setShowForm(false);
    fetchEntries();
  };

  const handleEdit = (entry: DrinkEntry) => {
    setEditEntry(entry);
    setShowForm(true);
  };

  const handleUpdate = async (data: DrinkEntry) => {
    await fetch("/api/entries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setEditEntry(null);
    setShowForm(false);
    fetchEntries();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/entries?id=${id}`, { method: "DELETE" });
    fetchEntries();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">All Drink Entries</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              setShowForm(true);
              setEditEntry(null);
            }}
          >
            Add Entry
          </button>
        </div>
        {/* Date filter can be added here if needed */}
        {showForm && (
          <div className="mb-4">
            <DrinkEntryForm
              onSubmit={editEntry ? handleUpdate : handleAdd}
              initialData={editEntry || undefined}
            />
            <button
              className="mt-2 text-sm text-gray-500 hover:underline"
              onClick={() => {
                setShowForm(false);
                setEditEntry(null);
              }}
            >
              Cancel
            </button>
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500">No entries found.</div>
        ) : (
          <DrinkEntryList
            entries={filtered}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
