import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DrinkEntry from "@/models/DrinkEntry";

const seedData = [
  { person: "Alice", drinkType: "tea", date: new Date(), quantity: 2 },
  { person: "Bob", drinkType: "coffee", date: new Date(), quantity: 1 },
  { person: "Charlie", drinkType: "tea", date: new Date(), quantity: 3 },
  {
    person: "Alice",
    drinkType: "coffee",
    date: new Date(Date.now() - 86400000),
    quantity: 1,
  },
  {
    person: "Bob",
    drinkType: "tea",
    date: new Date(Date.now() - 86400000),
    quantity: 2,
  },
];

export async function POST(req: NextRequest) {
  await dbConnect();
  await DrinkEntry.deleteMany({});
  const entries = await DrinkEntry.insertMany(seedData);
  return NextResponse.json(entries, { status: 201 });
}
