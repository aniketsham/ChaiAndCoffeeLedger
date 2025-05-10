import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DrinkEntry from "@/models/DrinkEntry";

const seedData = [
  { tea: 2, coffee: 1, date: new Date() },
  { tea: 3, coffee: 0, date: new Date(Date.now() - 86400000) },
  { tea: 0, coffee: 2, date: new Date(Date.now() - 2 * 86400000) },
];

export async function POST() {
  await dbConnect();
  await DrinkEntry.deleteMany({});
  const entries = await DrinkEntry.insertMany(seedData);
  return NextResponse.json(entries, { status: 201 });
}
