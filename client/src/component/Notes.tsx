// import { Plus } from "lucide-react";
import type { NoteItem } from "./type";

interface NotesProps {
  data?: NoteItem;
}

export default function Notes({ data }: NotesProps) {
  if (!data) return null;

  const TAG_COLORS = [
    "bg-yellow-100 text-yellow-700",
    "bg-rose-100 text-rose-700",
    "bg-purple-100 text-purple-700",
    "bg-teal-100 text-teal-700",
    "bg-blue-100 text-blue-700",
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-sky-100 text-sky-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-orange-100 text-orange-700",
    "bg-violet-100 text-violet-700",
    "bg-cyan-100 text-cyan-700",
    "bg-lime-100 text-lime-700",
    "bg-pink-100 text-pink-700",
    "bg-slate-100 text-slate-700",
  ];

  const getTagColor = (tagName: string) => {
    let hash = 0;
    for (let i = 0; i < tagName.length; i++) {
      hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % TAG_COLORS.length;
    return TAG_COLORS[index];
  };

  return (
    <div className="max-w-2xl p-6 font-sans text-gray-800">
      {/* Intro Text */}
      {data.intro && (
        <p className="mb-4 text-base">{data.intro}</p>
      )}

      {/* Unordered List (Bullets) */}
      {data.bullets && data.bullets.length > 0 && (
        <ul className="pl-6 mb-8 space-y-1 text-base list-disc marker:text-black">
          {data.bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {/* Ordered Notes Section */}
      {data.notesList && data.notesList.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-bold">Notes:</h2>
          <ol className="pl-5 mb-10 space-y-2 text-base list-decimal marker:text-gray-500">
            {data.notesList.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ol>
        </>
      )}

      {/* Standard Paragraph Content */}
      {data.content && (
        <p className="mb-10 text-base whitespace-pre-wrap">{data.content}</p>
      )}

      {/* Tags Section */}
      <div className="flex flex-wrap items-center gap-3">
        {data.tags && data.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-4 py-1.5 text-sm font-medium rounded-full ${getTagColor(tag)}`}
          >
            {tag}
          </span>
        ))}

        {/* Add Tag Button */}
        {/* <button className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-slate-400 bg-slate-50 hover:bg-slate-200">
          <Plus size={16} strokeWidth={2.5} />
        </button> */}
      </div>
    </div>
  );
}