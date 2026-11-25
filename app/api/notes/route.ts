import { NextResponse } from "next/server";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "@/lib/dynamodb";

export async function GET() {
  try {
    // Scan reads every item in the Notes table (fine for a small workshop dataset)
    const result = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    const notes = (result.Items ?? []).sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Failed to load notes:", error);
    return NextResponse.json(
      { error: "Failed to load notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    const now = new Date().toISOString();
    const note = {
      id: crypto.randomUUID(),
      title,
      content: content ?? "",
      createdAt: now,
      updatedAt: now,
    };
    // Put writes the new item into the Notes table keyed by id
    await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: note }));
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
