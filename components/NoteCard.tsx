"use client";

import { useState } from "react";
import type { Note } from "@/lib/types";

type NoteCardProps = {
  note: Note;
  onEdit: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
};

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  function handleSave() {
    if (!title.trim()) return;
    onEdit(note.id, title.trim(), content);
    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleSave}
            className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="rounded bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-md">
      <h2 className="text-lg font-semibold">{note.title}</h2>
      <p className="mt-1 whitespace-pre-wrap">{note.content}</p>
      <p className="mt-2 text-xs text-slate-400">
        Updated {new Date(note.updatedAt).toLocaleString()}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
