"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";
import type { Note } from "@/lib/types";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotes() {
      const res = await fetch("/api/notes");
      if (res.ok) setNotes(await res.json());
      setLoading(false);
    }
    loadNotes();
  }, []);

  async function handleAdd(title: string, content: string) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const note: Note = await res.json();
      setNotes([note, ...notes]);
    }
  }

  async function handleEdit(id: string, title: string, content: string) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      const updated: Note = await res.json();
      setNotes(notes.map((n) => (n.id === id ? updated : n)));
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Header />
        <NoteForm onSubmit={handleAdd} />
        {loading ? (
          <p>Loading notes...</p>
        ) : (
          <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}
