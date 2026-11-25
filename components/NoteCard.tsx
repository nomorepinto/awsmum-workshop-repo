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
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>Updated {new Date(note.updatedAt).toLocaleString()}</p>
      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}
