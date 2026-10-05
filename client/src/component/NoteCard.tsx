
import { useState } from "react";
import { Pin, EllipsisVertical, Pencil, Trash, Archive, ArchiveRestore, RotateCcw } from "lucide-react";
import Notes from "./Notes";
import type { NoteItem } from "./type";
import EditNote from "./EditNote";

interface NoteCardProps {
    activeData?: NoteItem;
    onTogglePin?: (note: NoteItem) => void;
    onToggleArchive?: (note: NoteItem) => void;
    onUpdateNote?: (updated: NoteItem) => void;
    onDeleteNote?: (id: string | number) => void;
    onRestoreNote?: (note: NoteItem) => void;
    onPermanentDelete?: (id: string | number) => void;
}

export default function NoteCard({
    activeData,
    onUpdateNote,
    onDeleteNote,
    onTogglePin,
    onToggleArchive,
    onRestoreNote,
    onPermanentDelete,
}: NoteCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    if (!activeData) {
        return (
            <div className="w-full h-full flex items-center justify-center p-5 text-slate-400">
                <p>Select a note to view its details.</p>
            </div>
        );
    }

    const handleDelete = () => {
        if (activeData.id !== undefined) {
            if (activeData.deletedAt) {
                onPermanentDelete?.(activeData.id);
            } else {
                onDeleteNote?.(activeData.id);
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-5 overflow-hidden">
            {/* Header Section */}
            <div className="w-full flex justify-between items-start shrink-0 mb-6">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900">
                            {activeData.title}
                        </h1>

                        {!activeData.deletedAt && (
                            <button
                                type="button"
                                onClick={() => onTogglePin?.(activeData)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${activeData.isPinned
                                    ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                    }`}
                                title={activeData.isPinned ? "Unpin Note" : "Pin Note"}
                            >
                                <Pin
                                    className={`w-3.5 h-3.5 ${activeData.isPinned ? "fill-indigo-700 text-indigo-700" : "text-slate-400"
                                        }`}
                                />
                                <span className="text-xs font-semibold">
                                    {activeData.isPinned ? "Pinned" : "Pin"}
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{activeData.date}</span>
                        {activeData.lastEdited && (
                            <>
                                <span>•</span>
                                <span>Last Edited {activeData.lastEdited}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {activeData.deletedAt ? (
                        /* Controls for Deleted Note */
                        <>
                            <button
                                type="button"
                                onClick={() => onRestoreNote?.(activeData)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                                <RotateCcw size={14} />
                                <span>Restore Note</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-8 h-8 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer"
                                title="Delete Permanently"
                            >
                                <Trash size={15} />
                            </button>
                        </>
                    ) : (
                        /* Standard Controls */
                        <>
                            {/* Standalone Edit Button (Desktop/Tablet >= md) */}
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(true)}
                                className="hidden lg:flex w-8 h-8 rounded border border-slate-200 items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                title="Edit Note"
                            >
                                <Pencil size={15} />
                            </button>

                            {/* Standalone Delete Button (Desktop/Tablet >= md) */}
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="hidden lg:flex w-8 h-8 rounded border border-slate-200 items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                title="Move to Trash"
                            >
                                <Trash size={15} />
                            </button>

                            {/* Ellipsis Menu */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((prev) => !prev)}
                                    className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                    title="More Options"
                                >
                                    <EllipsisVertical size={15} strokeWidth={1.75} />
                                </button>

                                {menuOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                                            {/* Mobile-only Edit Option (< md) */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditOpen(true);
                                                    setMenuOpen(false);
                                                }}
                                                className="lg:hidden w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                                            >
                                                <Pencil size={14} className="text-slate-500" />
                                                <span>Edit Note</span>
                                            </button>

                                            {/* Mobile-only Move to Trash Option (< md) */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleDelete();
                                                    setMenuOpen(false);
                                                }}
                                                className="lg:hidden w-full flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                                            >
                                                <Trash size={14} />
                                                <span>Move to Trash</span>
                                            </button>

                                            {/* Divider line for mobile items */}
                                            <div className="md:hidden my-1 border-t border-slate-100" />

                                            {/* Pin / Unpin */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onTogglePin?.(activeData);
                                                    setMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                                            >
                                                <Pin
                                                    size={14}
                                                    className={
                                                        activeData.isPinned
                                                            ? "text-indigo-600 fill-indigo-600"
                                                            : "text-slate-500"
                                                    }
                                                />
                                                <span>
                                                    {activeData.isPinned ? "Unpin Note" : "Pin Note"}
                                                </span>
                                            </button>

                                            {/* Archive / Unarchive */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onToggleArchive?.(activeData);
                                                    setMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
                                            >
                                                {activeData.isArchived ? (
                                                    <>
                                                        <ArchiveRestore size={14} className="text-slate-500" />
                                                        <span>Unarchive Note</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Archive size={14} className="text-slate-500" />
                                                        <span>Archive Note</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full flex-1 min-h-0 overflow-y-auto no-scrollbar pr-2">
                <Notes data={activeData} />
            </div>

            {/* Edit Modal */}
            <EditNote
                isOpen={isEditOpen}
                note={activeData}
                onClose={() => setIsEditOpen(false)}
                onSave={(updatedNote) => {
                    onUpdateNote?.(updatedNote);
                }}
            />
        </div>
    );
}