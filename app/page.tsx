"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";
import type { Note } from "@/lib/types";

const sampleNotes: Note[] = [
  {
    id: "sample-1",
    title: "Welcome",
    content: "This note is only in memory for now.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);

  function handleAdd(title: string, content: string) {
    const now = new Date().toISOString();
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    setNotes([note, ...notes]);
  }

  function handleEdit(id: string, title: string, content: string) {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, title, content } : n))
    );
  }

  function handleDelete(id: string) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <main>
      <Header />
      <NoteForm onSubmit={handleAdd} />
      <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
