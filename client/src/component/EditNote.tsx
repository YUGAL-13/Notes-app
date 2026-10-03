import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import type { NoteItem } from "./type";

interface EditNoteProps {
  isOpen: boolean;
  note: NoteItem | null;
  onClose: () => void;
  onSave: (updatedNote: NoteItem) => void;
}

// Preset tag suggestions derived from the old category options
const PRESET_TAGS = [
  "Work",
  "Personal",
  "Ideas",
  "Learning",
];

// Color cycles for tag pills to match the UI preview
const TAG_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-purple-100 text-purple-700",
];

export default function EditNote({
  isOpen,
  note,
  onClose,
  onSave,
}: EditNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Sync internal form state whenever a new note is passed in
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");

      // Combine intro, bullets, or notes list into unified text area content
      let fullContent = note.content || "";
      if (!fullContent && note.intro) {
        fullContent = `${note.intro}\n\n`;
        if (note.bullets) {
          fullContent += note.bullets.map((b) => `• ${b}`).join("\n");
        }
        if (note.notesList) {
          fullContent +=
            `\n\nNotes:\n` +
            note.notesList.map((n, i) => `${i + 1}. ${n}`).join("\n");
        }
      }
      setContent(fullContent);

      // Safely ensure tags is always an array
      setTags(Array.isArray(note.tags) ? note.tags : []);
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddTag = (tagToAdd?: string) => {
    const targetTag = (tagToAdd || newTag).trim().replace(/,/g, "");
    if (targetTag && !tags.includes(targetTag)) {
      setTags([...tags, targetTag]);
      if (!tagToAdd) setNewTag("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-commit any unsaved text currently in the tag input
    const finalTags = [...tags];
    const pendingTag = newTag.trim().replace(/,/g, "");
    if (pendingTag && !finalTags.includes(pendingTag)) {
      finalTags.push(pendingTag);
    }

    onSave({
      ...note,
      title,
      content,
      // Clear legacy structured fields so content takes precedence
      intro: undefined,
      bullets: undefined,
      notesList: undefined,
      tags: finalTags,
    });

    setNewTag("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      {/* Modal Dialog Container */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Edit Note</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Note title..."
              required
            />
          </div>

          {/* Content Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Content
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y leading-relaxed"
              placeholder="Write your content here..."
            />
          </div>

          {/* Tags Field with Preset Options */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-800">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl border border-slate-200 min-h-12 bg-white">
              {tags.map((tag, index) => {
                const colorClass =
                  TAG_COLORS[index % TAG_COLORS.length];
                return (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })}

              {/* Tag Input & Add Button */}
              <div className="flex-1 flex items-center min-w-35 gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder={
                    tags.length === 0 ? "Add tag (Press Enter or comma)..." : "Add tag..."
                  }
                  className="w-full bg-transparent text-sm text-slate-700 outline-none px-1"
                />
                {newTag.trim() && (
                  <button
                    type="button"
                    onClick={() => handleAddTag()}
                    className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors shrink-0"
                    title="Add Tag"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Add Preset Tag Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-medium text-slate-400 mr-1">
                Quick Add:
              </span>
              {PRESET_TAGS.map((preset) => {
                const isSelected = tags.includes(preset);
                return (
                  <button
                    key={preset}
                    type="button"
                    disabled={isSelected}
                    onClick={() => handleAddTag(preset)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer"
                    }`}
                  >
                    + {preset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-colors text-sm"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}