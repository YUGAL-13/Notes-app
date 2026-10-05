
import type { NoteItem } from "./type";
// import {Listings} from "./type";
import { Pin } from "lucide-react";

interface NoteListProps {
  notes?: NoteItem[];
  selectedNote?: NoteItem;
  onSelectNote?: (note: NoteItem) => void;
  categoryTitle?: string;
}

export default function NoteList({
  notes = [],
  categoryTitle,
  selectedNote,
  onSelectNote,
}: NoteListProps) {
  // Float pinned notes to the top of the list
  const sortedNotes = [...notes].sort(
    (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
  );

  return (
    <div className="h-full flex flex-col p-2 overflow-hidden">
      {/* 1. Fixed Header */}
      <div className="shrink-0 flex flex-col gap-0.5 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">{categoryTitle}</h2>
        <p className="text-sm text-slate-500">{notes.length} notes</p>
      </div>

      {/* 2. Scrollable Note Items Area */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-2 flex flex-col gap-2">
        {sortedNotes.map((item, index) => {
          const isActive = selectedNote
            ? selectedNote.title === item.title
            : index === 0;

          return (
            <div
              key={item.id || item.title || index}
              onClick={() => onSelectNote?.(item)}
              className={`w-full p-3 rounded-lg border transition-all cursor-pointer flex justify-between items-start group ${isActive
                ? "border-slate-300 bg-slate-100 shadow-sm"
                : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                }`}
            >
              {/* Note Summary Info */}
              <div className="flex flex-col gap-1 pr-2 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base text-slate-800 leading-tight truncate">
                    {item.title}
                  </h3>
                  {item.isPinned && (
                    <Pin className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600 shrink-0" />
                  )}
                </div>
                <p className="font-medium text-xs text-slate-400">{item.date}</p>
                <p className="text-sm text-slate-500 line-clamp-1">{item.label}</p>
              </div>

              {/* Item Action Menu */}
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-slate-200 rounded transition-opacity shrink-0"
              >
                <EllipsisVertical size={18} className="text-slate-500" />
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}