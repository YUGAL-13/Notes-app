import { useState, useEffect, useMemo } from "react";
import NoteCard from "./NoteCard";
import NoteList from "./NoteList";
import type { NoteItem } from "./type";
import { noteService } from "../services/NoteService";
import EditNote from "./EditNote";

export interface NoteCounts {
  all: number;
  pinned: number;
  archive: number;
  trash: number;
}

interface MainContentProps {
  activeCategory?: string;
  isCreateOpen?: boolean;
  onCloseCreate?: () => void;
  countLength?: string;
  onCountsChange?: (counts: NoteCounts) => void;
  onTagCountsChange?: (tagCounts: Record<string, number>) => void; // Added prop for tag counts
  searchQuery?: string;
}

const NEW_NOTE_TEMPLATE: NoteItem = {
  title: "",
  label: "General Note",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  content: "",
  tags: [],
};

export default function MainContent({
  activeCategory,
  isCreateOpen = false,
  onCloseCreate,
  onCountsChange,
  onTagCountsChange,
  searchQuery = "",
}: MainContentProps) {
  // 1. Manage full list of notes in state
  const [notes, setNotes] = useState<NoteItem[]>([]);

  // 2. Track currently selected note
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Category Counts
  const allNotesCount = notes.filter((n) => !n.isArchived && !n.isTrash).length;
  const pinnedNotesCount = notes.filter((n) => n.isPinned && !n.isArchived && !n.isTrash).length;
  const archiveCount = notes.filter((n) => n.isArchived && !n.isTrash).length;
  const trashCount = notes.filter((n) => n.isTrash).length;

  // Compute live tag counts (excluding trash notes)
  const tagCounts = useMemo(() => {
    return notes.reduce<Record<string, number>>((acc, note) => {
      if (!note.isArchived && !note.isTrash && note.tags) {
        note.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {});
  }, [notes]);
  const tagCountsKey = JSON.stringify(tagCounts);
  useEffect(() => {
    onTagCountsChange?.(tagCounts);
  }, [tagCountsKey]);

  // Notify parent component when counts update
  useEffect(() => {
    onCountsChange?.({
      all: allNotesCount,
      pinned: pinnedNotesCount,
      archive: archiveCount,
      trash: trashCount,
    });

    onTagCountsChange?.(tagCounts);
  }, [allNotesCount, pinnedNotesCount, archiveCount, trashCount]);

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getAll();
      setNotes(data);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Compute filtered notes based on active category/tag
  const filteredNotes = notes.filter((note) => {
    const category = activeCategory?.toLowerCase().trim() || "all notes";
    const query = searchQuery?.toLowerCase().trim() || "";

    // -------------------------------------------------------------
    // STEP 1: Check Category / View Match
    // -------------------------------------------------------------
    let matchesCategory: boolean;

    if (category === "archive") {
      matchesCategory = Boolean(note.isArchived) && !note.isTrash;
    } else if (category === "trash") {
      matchesCategory = Boolean(note.isTrash);
    } else {
      // For normal views, ignore archived or trashed notes
      if (note.isArchived || note.isTrash) {
        return false;
      }

      if (category === "all notes" || category === "all") {
        matchesCategory = true;
      } else if (category === "pinned" || category === "favorites") {
        matchesCategory = Boolean(note.isPinned);
      } else {
        // Check Tag or Label filter
        const matchesLabel = note.label?.toLowerCase() === category;
        const matchesTag =
          Array.isArray(note.tags) &&
          note.tags.some((tag) => tag.toLowerCase() === category);

        matchesCategory = matchesLabel || matchesTag;
      }
    }

    // If the note doesn't belong in the current view/category, exclude it
    if (!matchesCategory) {
      return false;
    }

    // -------------------------------------------------------------
    // STEP 2: Check Search Query Match (if searchQuery exists)
    // -------------------------------------------------------------
    if (query !== "") {
      const matchesTitle = note.title?.toLowerCase().includes(query) ?? false;
      const matchesContent = note.content?.toLowerCase().includes(query) ?? false;
      const matchesLabel = note.label?.toLowerCase().includes(query) ?? false;
      const matchesTag =
        Array.isArray(note.tags) &&
        note.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesTitle || matchesContent || matchesLabel || matchesTag;
    }

    return true;
  });

  // Clear selection if selected note isn't present in current filtered category
  useEffect(() => {
    const exists = filteredNotes.some((n) => n.id === selectedNote?.id);
    if (!exists) {
      setSelectedNote(null);
    }
  }, [activeCategory, notes]);

  const handleCreateSave = async (newNoteData: NoteItem) => {
    try {
      const created = await noteService.create(newNoteData);
      setNotes((prev) => [created, ...prev]);
      setSelectedNote(created);
    } catch (error) {
      console.error("Failed to create note:", error);
    } finally {
      onCloseCreate?.();
    }
  };

  const handleTogglePin = async (targetNote: NoteItem) => {
    if (!targetNote.id) return;

    const newPinnedStatus = !targetNote.isPinned;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === targetNote.id ? { ...n, isPinned: newPinnedStatus } : n
      )
    );

    if (selectedNote?.id === targetNote.id) {
      setSelectedNote((prev) =>
        prev ? { ...prev, isPinned: newPinnedStatus } : null
      );
    }

    try {
      await noteService.togglePin(targetNote.id, newPinnedStatus);
    } catch (error) {
      console.error("Failed to toggle pin on server:", error);
      loadNotes();
    }
  };

  const handleToggleArchive = async (noteToToggle: NoteItem) => {
    const updatedNote = {
      ...noteToToggle,
      isArchived: !noteToToggle.isArchived,
      isPinned: !noteToToggle.isArchived ? false : noteToToggle.isPinned,
    };

    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );

    try {
      await noteService.update(updatedNote);
    } catch (error) {
      console.error("Failed to update archive status:", error);
      loadNotes();
    }
  };

  const handleMoveToTrash = async (id: string | number) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isTrash: true } : n))
    );
    await noteService.moveToTrash(String(id));
  };

  const handleRestoreNote = async (note: NoteItem) => {
    const id = note.id;
    if (id === undefined) return;

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isTrash: false } : n))
    );
    await noteService.restoreFromTrash(String(id));
  };

  const handleDeleteNote = async (id: string | number) => {
    try {
      await noteService.delete(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleUpdateNote = async (updatedNote: NoteItem) => {
    if (!updatedNote.id) return;

    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );

    setSelectedNote(updatedNote);

    try {
      await noteService.update(updatedNote.id, updatedNote);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-400">
        Loading notes...
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-3 h-full gap-4 min-h-0">
        {/* Left Column: Note List */}
        <div className="col-span-1 h-full min-h-0 border-r border-slate-200 pr-4 overflow-hidden">
          <NoteList
            selectedNote={selectedNote ?? undefined}
            onSelectNote={(note) => setSelectedNote(note)}
            notes={filteredNotes}
            categoryTitle={activeCategory}
          />
        </div>

        {/* Right Column: Active Note Details */}
        <div className="col-span-2 h-full min-h-0 pl-2 overflow-hidden">
          <NoteCard
            activeData={selectedNote ?? undefined}
            onTogglePin={handleTogglePin}
            onDeleteNote={handleMoveToTrash}
            onUpdateNote={handleUpdateNote}
            onToggleArchive={handleToggleArchive}
            onRestoreNote={handleRestoreNote}
            onPermanentDelete={handleDeleteNote}
          />
        </div>
      </div>

      <EditNote
        isOpen={isCreateOpen}
        note={NEW_NOTE_TEMPLATE}
        onClose={() => onCloseCreate?.()}
        onSave={handleCreateSave}
      />
    </div>
  );
}