// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Dummy in-memory DB for rapid testing
// let notes = [
//   { id: '1', title: 'Learning React', isPinned: true }
// ];

// // READ
// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

// // CREATE
// app.post('/api/note', (req, res) => {
//   const newNote = { id: Date.now().toString(), ...req.body };
//   notes.push(newNote);
//   res.status(201).json(newNote);
// });

// // UPDATE (e.g. toggle pin or edit text)
// app.put('/api/notes/:id', (req, res) => {
//   const { id } = req.params;
//   notes = notes.map(n => n.id === id ? { ...n, ...req.body } : n);
//   res.json({ message: 'Updated successfully' });
// });

// // DELETE
// app.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params;
//   notes = notes.filter(n => n.id !== id);
//   res.json({ message: 'Deleted successfully' });
// });

// app.get('/', (req, res) => {
//   res.send('NoteHub API is running...');
// });

// app.listen(5000, () => console.log('Server running on port 5000'));




// import express from 'express';
// import cors from 'cors';
// import fs from 'fs';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const FILE_PATH = './notes.json';

// // Helper to read notes
// const getNotes = () => {
//   if (!fs.existsSync(FILE_PATH)) return [];
//   const data = fs.readFileSync(FILE_PATH, 'utf-8');
//   return JSON.parse(data || '[]');
// };

// // Helper to write notes
// const saveNotes = (notes: any[]) => {
//   fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
// };

// // READ
// app.get('/api/notes', (req, res) => {
//   res.json(getNotes());
// });

// // CREATE
// app.post('/api/notes', (req, res) => {
//   const notes = getNotes();
//   const newNote = { id: Date.now().toString(), ...req.body };
//   notes.push(newNote);
//   saveNotes(notes);
//   res.status(201).json(newNote);
// });

// // DELETE
// app.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params;
//   const notes = getNotes().filter((n: any) => n.id !== id);
//   saveNotes(notes);
//   res.json({ message: 'Deleted successfully' });
// });

// // UPDATE (e.g. toggle pin or edit text)
// app.put('/api/notes/:id', (req, res) => {
//   const { id } = req.params;
//   const notes:any[] = getNotes().map(n => n.id === id ? { ...n, ...req.body,id:n.id } : n);
//   saveNotes(notes);
//   res.json({ message: 'Updated successfully' });
// });

// // API Route / Controller: Move to Trash
// app.patch("/api/notes/:id/trash", async (req, res) => {
//   const note = await getNotes.findByIdAndUpdate(
//     req.params.id,
//     {
//       isTrash: true,
//       deletedAt: new Date(), // Starts the 30-day clock
//     },
//     { new: true }
//   );
//   res.json(note);
// });

// // API Route / Controller: Restore from Trash
// app.patch("/api/notes/:id/restore", async (req, res) => {
//   const note = await Note.findByIdAndUpdate(
//     req.params.id,
//     {
//       isTrash: false,
//       deletedAt: null, // Resets timestamp on restore
//     },
//     { new: true }
//   );
//   res.json(note);
// });


// app.listen(5000, () => console.log('Server running on port 5000'));

import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = './notes.json';

interface NoteItem {
  id: string;
  title?: string;
  content?: string;
  isPinned?: boolean;
  isArchived?: boolean;
  isTrash?: boolean;
  deletedAt?: string | null;
  [key: string]: any;
}

// Helper to read notes
const getNotes = (): NoteItem[] => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data || '[]');
};

// Helper to write notes
const saveNotes = (notes: NoteItem[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(notes, null, 2));
};

// READ ALL
app.get('/api/notes', (req, res) => {
  res.json(getNotes());
});

// CREATE
app.post('/api/notes', (req, res) => {
  const notes = getNotes();
  const newNote: NoteItem = {
    id: Date.now().toString(),
    isPinned: false,
    isArchived: false,
    isTrash: false,
    deletedAt: null,
    ...req.body,
  };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
});

// DELETE (PERMANENT)
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const notes = getNotes();
  const filteredNotes = notes.filter((n) => n.id !== id);
  saveNotes(filteredNotes);
  res.json({ message: 'Deleted successfully' });
});

// UPDATE
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const notes = getNotes();
  let updatedNote: NoteItem | null = null;

  const updatedNotes = notes.map((n) => {
    if (n.id === id) {
      const updated: NoteItem = { ...n, ...req.body, id: n.id };
      updatedNote = updated;
      return updated;
    }
    return n;
  });

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  saveNotes(updatedNotes);
  res.json(updatedNote);
});

// MOVE TO TRASH
app.patch('/api/notes/:id/trash', (req, res) => {
  const { id } = req.params;
  const notes = getNotes();
  let updatedNote: NoteItem | null = null;

  const updatedNotes = notes.map((n) => {
    if (n.id === id) {
      updatedNote = {
        ...n,
        isTrash: true,
        deletedAt: new Date().toISOString(),
      };
      return updatedNote;
    }
    return n;
  });

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  saveNotes(updatedNotes);
  res.json(updatedNote);
});

// RESTORE FROM TRASH
app.patch('/api/notes/:id/restore', (req, res) => {
  const { id } = req.params;
  const notes = getNotes();
  let updatedNote: NoteItem | null = null;

  const updatedNotes = notes.map((n) => {
    if (n.id === id) {
      updatedNote = {
        ...n,
        isTrash: false,
        deletedAt: null,
      };
      return updatedNote;
    }
    return n;
  });

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  saveNotes(updatedNotes);
  res.json(updatedNote);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});