//----------------------------------localStorage logic------------------------------------------ 

// import type { NoteItem } from "../component/type";

// const STORAGE_KEY = "notehub_notes";

// // Helper functions for LocalStorage management
// const getStoredNotes = (): NoteItem[] => {
//   const data = localStorage.getItem(STORAGE_KEY);
//   if (!data) {
//     const initialNotes: NoteItem[] = [];
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(initialNotes));
//     return initialNotes;
//   }
//   try {
//     return JSON.parse(data) as NoteItem[];
//   } catch (error) {
//     console.error("Error parsing notes from localStorage:", error);
//     return [];
//   }
// };

// const saveStoredNotes = (notes: NoteItem[]): void => {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
// };

// export const noteService = {
//   /**
//    * Fetch all notes from LocalStorage
//    */
//   getAll: async (): Promise<NoteItem[]> => {
//     return getStoredNotes();
//   },

//   /**
//    * Fetch a single note by ID
//    */
//   getById: async (id: string | number): Promise<NoteItem> => {
//     const notes = getStoredNotes();
//     const note = notes.find((n) => String(n.id) === String(id));
//     if (!note) {
//       throw new Error(`Note with ID ${id} not found.`);
//     }
//     return note;
//   },

//   /**
//    * Create a new note and save to LocalStorage
//    */
//   create: async (newNoteData: Partial<NoteItem>): Promise<NoteItem> => {
//     const notes = getStoredNotes();

//     const newNote: NoteItem = {
//       id: Date.now().toString(),
//       title: newNoteData.title || "Untitled Note",
//       label: newNoteData.label || "General Note",
//       content: newNoteData.content || "",
//       date:
//         newNoteData.date ||
//         new Date().toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         }),
//       isPinned: newNoteData.isPinned || false,
//       tags: newNoteData.tags || [],
//     };

//     const updatedNotes = [newNote, ...notes];
//     saveStoredNotes(updatedNotes);
//     return newNote;
//   },

//   /**
//    * Update an existing note by ID in LocalStorage
//    */
//   update: async (
//     id: string | number,
//     updatedFields: Partial<NoteItem>
//   ): Promise<NoteItem> => {
//     const notes = getStoredNotes();
//     let updatedNoteResult: NoteItem | null = null;

//     const updatedNotes = notes.map((note) => {
//       if (String(note.id) === String(id)) {
//         updatedNoteResult = { ...note, ...updatedFields };
//         return updatedNoteResult;
//       }
//       return note;
//     });

//     if (!updatedNoteResult) {
//       throw new Error(`Note with ID ${id} not found.`);
//     }

//     saveStoredNotes(updatedNotes);
//     return updatedNoteResult
//   },

//   /**
//    * Toggle the pinned state of a note
//    */
//   togglePin: async (id: string | number, isPinned: boolean): Promise<NoteItem> => {
//     return noteService.update(id, { isPinned });
//   },

//   /**
//    * Delete a note by ID from LocalStorage
//    */
//   delete: async (id: string | number): Promise<{ message: string }> => {
//     const notes = getStoredNotes();
//     const filteredNotes = notes.filter((n) => String(n.id) !== String(id));
//     saveStoredNotes(filteredNotes);
//     return { message: "Deleted successfully" };
//   },
// };

//-----------------------backend api fetch------------------------------------- 

import type { NoteItem } from "../component/type";

// Fallback to localhost if environment variable is not defined
const API_BASE_URL =
  import.meta.env.VITE_API_URL;

/**
 * Generic helper to handle response status and JSON parsing
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `API Error (${response.status}): ${errorText || response.statusText}`
    );
  }
  return response.json();
}

export const noteService = {
  /**
   * GET /api/notes - Fetch all notes
   */
  getAll: async (): Promise<NoteItem[]> => {
    const res = await fetch(API_BASE_URL);
    return handleResponse<NoteItem[]>(res);
  },

  /**
   * GET /api/notes/:id - Fetch a single note by ID
   */
  getById: async (id: string | number): Promise<NoteItem> => {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse<NoteItem>(res);
  },

  /**
   * POST /api/notes - Create a new note
   */
  create: async (newNoteData: Partial<NoteItem>): Promise<NoteItem> => {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNoteData),
    });
    return handleResponse<NoteItem>(res);
  },

  /**
   * PUT /api/notes/:id - Update an existing note
   */
  update: async (
    id: string | number,
    updatedFields?: Partial<NoteItem>
  ): Promise<NoteItem> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });
    return handleResponse<NoteItem>(res);
  },

  /**
   * Toggle pinned status (delegates to update)
   */
  togglePin: async (
    id: string | number,
    isPinned: boolean
  ): Promise<NoteItem> => {
    return noteService.update(id, { isPinned });
  },

  /**
   * DELETE /api/notes/:id - Delete a note
   */
  delete: async (id: string | number): Promise<{ message: string }> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return handleResponse<{ message: string }>(res);
  },

  moveToTrash: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/${id}/trash`, {
      method: "PATCH",
    });
    return handleResponse<NoteItem>(res);
  },

  // Restore from trash
  restoreFromTrash: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/${id}/restore`, {
      method: "PATCH",
    });
    return handleResponse<NoteItem>(res);
  },
};