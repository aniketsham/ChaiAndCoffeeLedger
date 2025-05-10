import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import DrinkEntry from "@/models/DrinkEntry";

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const filter: Record<string, unknown> = {};
  if (date) filter.date = { $eq: new Date(date) };
  const entries = await DrinkEntry.find(filter).sort({ date: -1 });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  // Only allow tea, coffee, date
  const entry = await DrinkEntry.create({
    tea: data.tea ?? 0,
    coffee: data.coffee ?? 0,
    date: data.date ?? new Date(),
  });
  return NextResponse.json(entry, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const { _id, ...update } = data;
  const entry = await DrinkEntry.findByIdAndUpdate(
    _id,
    {
      tea: update.tea ?? 0,
      coffee: update.coffee ?? 0,
      date: update.date ?? new Date(),
    },
    { new: true }
  );
  return NextResponse.json(entry);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  await DrinkEntry.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
