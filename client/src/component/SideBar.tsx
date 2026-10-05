
import {
  Feather, Square,
  //  Plus
} from "lucide-react";
import { menuItems, Taggers } from "./type";
import type { NoteCounts } from "./MainContent";


interface SideBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  counts?: NoteCounts;
  tagCounts?: Record<string, number>;
}

export default function SideBar({
  activeCategory,
  onSelectCategory,
  counts = { all: 0, pinned: 0, archive: 0, trash: 0 },
  tagCounts = {},
}: SideBarProps) {

  // Helper to match menu label to dynamic count
  const getCountForItem = (label: string): number => {
    const key = label.toLowerCase();
    if (key === "all notes" || key === "all") return counts.all;
    if (key === "pinned" || key === "favorites") return counts.pinned;
    if (key === "archive") return counts.archive;
    if (key === "trash") return counts.trash;
    return 0;
  };
  // Helper to get dynamic tag count (case-insensitive fallback)
  const getTagCount = (title: string): number => {
    if (tagCounts[title] !== undefined) return tagCounts[title];

    // Case-insensitive lookup fallback
    const matchedKey = Object.keys(tagCounts).find(
      (key) => key.toLowerCase() === title.toLowerCase()
    );
    return matchedKey !== undefined ? tagCounts[matchedKey] : 0;
  };


  return (
    <aside className="flex flex-col h-full w-full bg-slate-900 text-slate-300 p-4">
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
          <Feather className="w-6 h-6 text-indigo-400" />
          <span className="font-bold text-xl text-white tracking-wide">
            NoteHub
          </span>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors">
          <Square size={18} />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const liveCount = getCountForItem(item.label);
          const isActive = activeCategory.toLowerCase() === item.label.toLowerCase();

          return (
            <button
              key={index}
              onClick={() => onSelectCategory(item.label)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors w-full group cursor-pointer ${isActive
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={
                    isActive
                      ? "text-indigo-400"
                      : "text-slate-400 group-hover:text-white transition-colors"
                  }
                />
                <span className="text-sm">{item.label}</span>
              </div>

              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-md min-w-5 text-center transition-colors ${isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 bg-slate-800 group-hover:bg-slate-700"
                  }`}
              >
                {liveCount}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Tags Section */}
      <div className="flex flex-col gap-2 mt-8">
        <div className="flex items-center justify-between px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          <span>Tags</span>
          {/* for adding new tag if you want */}

          {/* <button className="p-1 hover:bg-slate-800 hover:text-white rounded transition-colors">
            <Plus size={16} />
          </button> */}
        </div>

        <div className="flex flex-col gap-1">
          {Taggers.map((item, index) => {
            const isActive = activeCategory === item.title;
            const liveTagCount = getTagCount(item.title);

            return (
              <button
                key={index}
                onClick={() => onSelectCategory(item.title)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors w-full group cursor-pointer ${isActive
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${item.dotColor}`}
                  />
                  <span className="text-sm">{item.title}</span>
                </div>

                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-md min-w-5 text-center transition-colors ${isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 bg-slate-800 group-hover:bg-slate-700"
                    }`}
                >
                  {liveTagCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}