// // import { Pin, EllipsisVertical, Pencil, Trash } from "lucide-react"
// // import Notes from "./Notes"

// // export default function NoteCard(){

// //     return(
// //         <>
// //         <main className="w-full h-screen mx-auto p-5 flex flex-col ">

// //             <div className="flex flex-col">
// //                 {/** header */}
// //                 <div className="w-full flex justify-between shrink-0">
// //                     <div className="flex flex-col">

// //                         <div className="flex gap-10">
// //                             <h1 className="text-2xl font-bold">
// //                                 Learning React
// //                             </h1>
// //                             <div className="flex justify-center items-center bg-[#cbb6f0ce] w-20 rounded-3xl">
// //                                 <Pin className="text-blue-500 w-4" />
// //                                 <p className="text-blue-500 text-sm">Pinned</p>
// //                             </div>

// //                         </div>
// //                         <div className="flex gap-8">
// //                             <h5 className=" text-slate-400 ">
// //                                 Sep 29,2026
// //                             </h5>
// //                             <div className="text-slate-400">
// //                                 Last Edited 10:30am
// //                             </div>
// //                         </div>

// //                     </div>
// //                     <div className="flex gap-8">
// //                         <button className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center ">
// //                             <Pencil  size={15}/>

// //                         </button>
// //                         <button className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center">
// //                             <Trash size={15} />

// //                         </button>
// //                         <button className="w-8 h-8 rounded border border-slate-300 flex items-center justify-center">
// //                             <EllipsisVertical size={15} strokeWidth={1.75} />

// //                         </button>
// //                     </div>


// //                 </div>

// //                 {/**main content */}
// //                 <div className="w-full flex-1 overflow-y-auto">
// //                     <Notes/>

// //                 </div>

// //             </div>


// //         </main>
// //         </>
// //     )
// // }


// import { useState } from "react";
// import { Pin, EllipsisVertical, Pencil, Trash, Archive, ArchiveRestore } from "lucide-react";
// import Notes from "./Notes";
// import type { NoteItem } from "./type";
// import EditNote from "./EditNote";

// interface NoteCardProps {
//     activeData?: NoteItem;
//     onTogglePin?: (note: NoteItem) => void;
//     onToggleArchive?: (note: NoteItem) => void;
//     onUpdateNote?: (updated: NoteItem) => void;
//     onDeleteNote?: (id: string | number) => void;
// }

// export default function NoteCard({
//     activeData,
//     onUpdateNote,
//     onDeleteNote,
//     onTogglePin,
//     onToggleArchive,
// }: NoteCardProps) {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isEditOpen, setIsEditOpen] = useState(false);

//     if (!activeData) {
//         return (
//             <div className="w-full h-full flex items-center justify-center p-5 text-slate-400">
//                 <p>Select a note to view its details.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full h-full flex flex-col p-5 overflow-hidden">
//             {/* Header Section */}
//             <div className="w-full flex justify-between items-start shrink-0 mb-6">
//                 <div className="flex flex-col gap-1">
//                     <div className="flex items-center gap-4">
//                         <h1 className="text-2xl font-bold text-slate-900">
//                             {activeData.title}
//                         </h1>

//                         {/* Interactive Pin Button */}
//                         <button
//                             onClick={() => onTogglePin?.(activeData)}
//                             className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${activeData.isPinned
//                                     ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
//                                     : "hidden"
//                                 }`}
//                         >
//                             <Pin
//                                 className={`w-3.5 h-3.5 ${activeData.isPinned ? "fill-indigo-700 text-indigo-700" : ""
//                                     }`}
//                             />
//                             <span className="text-xs font-semibold">
//                                 {activeData.isPinned ? "Pinned" : "Pin Note"}
//                             </span>
//                         </button>
//                     </div>

//                     <div className="flex items-center gap-4 text-xs text-slate-400">
//                         <span>{activeData.date}</span>
//                         <span>•</span>
//                         <span>Last Edited 10:30am</span>
//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => setIsEditOpen(true)}
//                         className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
//                         title="Edit Note"
//                     >
//                         <Pencil size={15} />
//                     </button>
//                     <button
//                         onClick={() => activeData.id && onDeleteNote?.(activeData.id)}
//                         className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
//                         title="Delete Note"
//                     >
//                         <Trash size={15} />
//                     </button>

//                     {/* Three-Dot Menu with Dropdown */}
//                     <div className="relative">
//                         <button
//                             onClick={() => setMenuOpen((prev) => !prev)}
//                             className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
//                             title="More Options"
//                         >
//                             <EllipsisVertical size={15} strokeWidth={1.75} />
//                         </button>

//                         {menuOpen && (
//                             <>
//                                 {/* Backdrop to close menu when clicking outside */}
//                                 <div
//                                     className="fixed inset-0 z-10"
//                                     onClick={() => setMenuOpen(false)}
//                                 />

//                                 {/* Dropdown Options */}
//                                 <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
//                                     {/* Pin Option */}
//                                     <button
//                                         onClick={() => {
//                                             onTogglePin?.(activeData);
//                                             setMenuOpen(false);
//                                         }}
//                                         className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left"
//                                     >
//                                         <Pin
//                                             size={14}
//                                             className={
//                                                 activeData.isPinned
//                                                     ? "text-indigo-600 fill-indigo-600"
//                                                     : "text-slate-500"
//                                             }
//                                         />
//                                         <span>
//                                             {activeData.isPinned ? "Unpin Note" : "Pin Note"}
//                                         </span>
//                                     </button>

//                                     {/* Archive Option */}
//                                     <button
//                                         onClick={() => {
//                                             onToggleArchive?.(activeData);
//                                             setMenuOpen(false);
//                                         }}
//                                         className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left"
//                                     >
//                                         {activeData.isArchived ? (
//                                             <>
//                                                 <ArchiveRestore size={14} className="text-slate-500" />
//                                                 <span>Unarchive Note</span>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Archive size={14} className="text-slate-500" />
//                                                 <span>Archive Note</span>
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Scrollable Content Area */}
//             <div className="w-full flex-1 min-h-0 overflow-y-auto no-scrollbar pr-2">
//                 <Notes data={activeData} />
//             </div>

//             {/* Render Edit Note Modal */}
//             <EditNote
//                 isOpen={isEditOpen}
//                 note={activeData}
//                 onClose={() => setIsEditOpen(false)}
//                 onSave={(updatedNote) => {
//                     onUpdateNote?.(updatedNote);
//                 }}
//             />
//         </div>
//     );
// }



// import { useState } from "react";
// import { Pin, EllipsisVertical, Pencil, Trash, Archive, ArchiveRestore } from "lucide-react";
// import Notes from "./Notes";
// import type { NoteItem } from "./type";
// import EditNote from "./EditNote";

// interface NoteCardProps {
//   activeData?: NoteItem;
//   onTogglePin?: (note: NoteItem) => void;
//   onToggleArchive?: (note: NoteItem) => void;
//   onUpdateNote?: (updated: NoteItem) => void;
//   onDeleteNote?: (id: string | number) => void;
// }

// export default function NoteCard({
//   activeData,
//   onUpdateNote,
//   onDeleteNote,
//   onTogglePin,
//   onToggleArchive,
// }: NoteCardProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   if (!activeData) {
//     return (
//       <div className="w-full h-full flex items-center justify-center p-5 text-slate-400">
//         <p>Select a note to view its details.</p>
//       </div>
//     );
//   }

//   const handleDelete = () => {
//     if (activeData.id !== undefined) {
//       onDeleteNote?.(activeData.id);
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col p-5 overflow-hidden">
//       {/* Header Section */}
//       <div className="w-full flex justify-between items-start shrink-0 mb-6">
//         <div className="flex flex-col gap-1">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-bold text-slate-900">
//               {activeData.title}
//             </h1>

//             {/* Pin Toggle Badge/Button */}
//             <button
//               type="button"
//               onClick={() => onTogglePin?.(activeData)}
//               className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
//                 activeData.isPinned
//                   ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
//                   : "bg-slate-100 text-slate-500 hover:bg-slate-200"
//               }`}
//               title={activeData.isPinned ? "Unpin Note" : "Pin Note"}
//               aria-label={activeData.isPinned ? "Unpin Note" : "Pin Note"}
//             >
//               <Pin
//                 className={`w-3.5 h-3.5 ${
//                   activeData.isPinned ? "fill-indigo-700 text-indigo-700" : "text-slate-400"
//                 }`}
//               />
//               <span className="text-xs font-semibold">
//                 {activeData.isPinned ? "Pinned" : "Pin"}
//               </span>
//             </button>
//           </div>

//           <div className="flex items-center gap-2 text-xs text-slate-400">
//             <span>{activeData.date}</span>
//             {activeData.lastEdited && (
//               <>
//                 <span>•</span>
//                 <span>Last Edited {activeData.lastEdited}</span>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={() => setIsEditOpen(true)}
//             className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
//             title="Edit Note"
//             aria-label="Edit Note"
//           >
//             <Pencil size={15} />
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
//             title="Delete Note"
//             aria-label="Delete Note"
//           >
//             <Trash size={15} />
//           </button>

//           {/* Dropdown Menu */}
//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => setMenuOpen((prev) => !prev)}
//               className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
//               title="More Options"
//               aria-label="More Options"
//             >
//               <EllipsisVertical size={15} strokeWidth={1.75} />
//             </button>

//             {menuOpen && (
//               <>
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       onTogglePin?.(activeData);
//                       setMenuOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
//                   >
//                     <Pin
//                       size={14}
//                       className={
//                         activeData.isPinned
//                           ? "text-indigo-600 fill-indigo-600"
//                           : "text-slate-500"
//                       }
//                     />
//                     <span>
//                       {activeData.isPinned ? "Unpin Note" : "Pin Note"}
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       onToggleArchive?.(activeData);
//                       setMenuOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors text-left cursor-pointer"
//                   >
//                     {activeData.isArchived ? (
//                       <>
//                         <ArchiveRestore size={14} className="text-slate-500" />
//                         <span>Unarchive Note</span>
//                       </>
//                     ) : (
//                       <>
//                         <Archive size={14} className="text-slate-500" />
//                         <span>Archive Note</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full flex-1 min-h-0 overflow-y-auto no-scrollbar pr-2">
//         <Notes data={activeData} />
//       </div>

//       {/* Edit Modal */}
//       <EditNote
//         isOpen={isEditOpen}
//         note={activeData}
//         onClose={() => setIsEditOpen(false)}
//         onSave={(updatedNote) => {
//           onUpdateNote?.(updatedNote);
//         }}
//       />
//     </div>
//   );
// }

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