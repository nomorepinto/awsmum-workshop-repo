import NoteCard from "@/components/NoteCard";
import type { Note } from "@/lib/types";

type NoteListProps = {
  notes: Note[];
  onEdit: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
};

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-slate-500">
        No notes yet. Add your first note above.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
